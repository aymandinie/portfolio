/* ==================================================================
   Goldfinch — components.js  (SPEC §3)
   Build each component once; every consumer routes through it.
   Exposed on window: Pager, pager (alias), DataTable, DateRange,
   Dialog, SESSION, can.  NavStack/goBack live in member.html (portal).
================================================================== */
(function () {
  'use strict';
  const esc = s => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  // A value safe to drop into  onclick="fn(<HERE>)"  — a single-quoted JS string
  // that is ALSO HTML-attribute safe (double-quoted attr). Fixes JSON.stringify's
  // double-quotes closing the attribute early and apostrophes truncating the JS.
  const jsAttr = v => "'" + String(v == null ? '' : v)
    .replace(/\\/g, '\\\\').replace(/'/g, "\\'")   // JS-string safe (single-quoted)
    .replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')  // HTML-attr safe
    + "'";
  const ICON_PLUS = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>';
  const ICON_SEARCH = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>';

  /* ================================================================
     §3.2 Pager — ONE mode. Fixed slot count (9). Width never changes.
     Signature kept compatible with existing consumers:
       Pager(page, totalPages, navFn, argPrefix='')
     page is 0-indexed. Emits exactly 9 top-level <button type="button">/<span>
     (prev · 7-slot window · next); no nested button/span.
  ================================================================ */
  function Pager(page, totalPages, navFn, argPrefix) {
    argPrefix = argPrefix || '';
    navFn = navFn || 'void 0';
    const total = Math.max(1, totalPages | 0);
    page = Math.max(0, Math.min(page | 0, total - 1));
    const last = total - 1;

    const numBtn = (n) =>
      `<button type="button" onclick="${navFn}(${argPrefix}${n})" ` +
      `class="gf-pg${n === page ? ' is-active' : ''}" aria-label="Page ${n + 1}"` +
      `${n === page ? ' aria-current="page"' : ''}>${n + 1}</button>`;
    const ell = () => `<span class="gf-pg gf-pg-ell" aria-hidden="true">…</span>`;
    const navBtn = (label, target, disabled, dir) =>
      `<button type="button" ${disabled ? 'disabled' : ''} ` +
      `onclick="${disabled ? 'void 0' : navFn + '(' + argPrefix + target + ')'}" ` +
      `class="gf-pg gf-pg-nav gf-pg-${dir}${disabled ? ' is-disabled' : ''}" ` +
      `aria-label="${dir === 'prev' ? 'Previous page' : 'Next page'}">${label}</button>`;

    // FIXED WINDOW — ONE code path. For any given table the strip always renders the
    // SAME number of slots (min(total,7) numbers, ends always pinned, ellipsis marking
    // any skipped run) so its width is constant: the numbers never reflow and ‹Prev /
    // Next› never drift as you page. Small tables show every page (fewer slots), which
    // keeps the pager honest about how many pages exist. No branch on the page count.
    const want = Math.min(total, 7);
    const start = Math.max(0, Math.min(page - ((want - 1) >> 1), total - want));
    const slots = [];
    for (let i = 0; i < want; i++) slots.push(start + i);
    if (slots[0] !== 0) { slots[0] = 0; slots[1] = -1; }                 // pin first, gap → …
    if (slots[want - 1] !== last) { slots[want - 1] = last; slots[want - 2] = -1; }
    const nums = slots.map(n => (n < 0 ? ell() : numBtn(n))).join('');

    return `<nav class="gf-pager" aria-label="Pagination">` +
      navBtn('<span class="gf-pg-ch">‹</span> Prev', page - 1, page <= 0, 'prev') +
      `<span class="gf-pg-nums">${nums}</span>` +
      navBtn('Next <span class="gf-pg-ch">›</span>', page + 1, page >= last, 'next') +
      `</nav>`;
  }

  /* Rows-per-page + "1–25 of N" summary, paired with the pager (§3.2). */
  function pagerBar(page, total, pageSize, navFn, argPrefix, sizeFn) {
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const from = total ? page * pageSize + 1 : 0, to = Math.min(total, (page + 1) * pageSize);
    const sizes = [25, 50, 100].map(s =>
      `<option ${s === pageSize ? 'selected' : ''}>${s}</option>`).join('');
    return `<div class="gf-pagerbar">
      <span class="gf-pager-count">${from.toLocaleString()}–${to.toLocaleString()} of ${total.toLocaleString()}</span>
      ${Pager(page, totalPages, navFn, argPrefix)}
      ${sizeFn ? `<select class="gf-pager-size" aria-label="Rows per page" title="Rows per page" onchange="${sizeFn}(this.value)">${sizes}</select>` : ''}
    </div>`;
  }

  /* ================================================================
     §3.1 DataTable — filter · sort · search · page all compose.
     Headless controller (state + view) that also renders to a mount.
  ================================================================ */
  const DT = {};                       // instance registry so inline handlers reach a table
  let _dtSeq = 0;
  function DataTable(cfg) {
    const id = cfg.id || ('dt' + (++_dtSeq));
    const state = {
      filters: {}, search: '', sort: cfg.defaultSort || null,
      page: 0, pageSize: cfg.pageSize || 25
    };
    const filterDefs = cfg.filters || [];

    const applyFilters = rows => rows.filter(r =>
      Object.entries(state.filters).every(([k, vals]) => {
        if (vals == null || (Array.isArray(vals) && vals.length === 0)) return true;
        const def = filterDefs.find(f => f.key === k) || {};
        if (def.type === 'multi') return vals.includes(r[k]);
        // `includes` — the row value is an ARRAY (e.g. an invoice's design codes); match if
        // any selected value appears in it. Lets one row satisfy a multi-select over a set.
        if (def.type === 'includes') return Array.isArray(r[k]) ? r[k].some(x => vals.includes(x)) : vals.includes(r[k]);
        if (def.type === 'range') return r[k] >= vals[0] && r[k] <= vals[1];
        if (def.type === 'bool') return !!r[k] === !!vals;
        if (def.type === 'date') return (!vals.from || r[k] >= vals.from) && (!vals.to || r[k] <= vals.to);
        return String(r[k]) === String(vals);
      }));
    const applySearch = rows => {
      if (!state.search) return rows;
      const q = state.search.toLowerCase(), keys = cfg.searchKeys || [];
      return rows.filter(r => keys.some(k => String(r[k] == null ? '' : r[k]).toLowerCase().includes(q)));
    };
    const applySort = rows => {
      if (!state.sort) return rows;
      const { key, dir } = state.sort;
      // A column may supply sortValue(row) to sort by something other than the raw cell value
      // (e.g. tier by rank Entry<Bronze<Silver<Gold, not alphabetically).
      const col = (cfg.columns || []).find(c => c.key === key);
      const val = (col && typeof col.sortValue === 'function') ? (r => col.sortValue(r)) : (r => r[key]);
      return [...rows].sort((a, b) => {
        const av = val(a), bv = val(b);
        const c = av < bv ? -1 : av > bv ? 1 : 0;
        return dir === 'desc' ? -c : c;
      });
    };
    const view = () => applySort(applySearch(applyFilters(cfg.rows || [])));

    const api = {
      state,
      rows() { return view(); },
      total() { return view().length; },
      totalPages() { return Math.max(1, Math.ceil(api.total() / state.pageSize)); },
      page(i) { const v = view(); const p = i == null ? state.page : i; return v.slice(p * state.pageSize, (p + 1) * state.pageSize); },
      setFilter(k, vals) { state.filters[k] = vals; state.page = 0; return api.render(); },
      removeFilter(k) { delete state.filters[k]; state.page = 0; return api.render(); },
      clearFilters() { state.filters = {}; state.search = ''; state.page = 0; return api.render(); },
      // toggle one value of a multi filter (checkbox behaviour) — no <select> anywhere
      toggleFilterValue(k, val) {
        const cur = Array.isArray(state.filters[k]) ? state.filters[k].slice() : [];
        const i = cur.indexOf(val);
        if (i >= 0) cur.splice(i, 1); else cur.push(val);
        if (cur.length) state.filters[k] = cur; else delete state.filters[k];
        state.page = 0; return api.render();
      },
      setBoolFilter(k, on) { if (on) state.filters[k] = true; else delete state.filters[k]; state.page = 0; return api.render(); },
      activeFilters() { return Object.entries(state.filters).filter(([, v]) => v != null && !(Array.isArray(v) && !v.length)); },
      setSearch(q) { state.search = q; state.page = 0; return api.render(); },
      setSort(key, dir) { state.sort = { key, dir: dir || 'asc' }; return api.render(); },
      toggleSort(key) {
        const cur = state.sort;
        state.sort = { key, dir: cur && cur.key === key && cur.dir === 'asc' ? 'desc' : 'asc' };
        return api.render();
      },
      currentSort() { return state.sort; },
      setPageSize(n) { state.pageSize = +n || 25; state.page = 0; return api.render(); },
      goToPage(i) { state.page = Math.max(0, Math.min(i | 0, api.totalPages() - 1)); return api.render(); },
      id, render() {
        // Constant height is achieved deterministically in renderHTML() by padding a
        // short page up to page-size with fixed-height spacer rows — the pager never
        // moves and only the row area above it fills. No measured min-height (which
        // jumped and left whitespace on page 1).
        if (cfg.mount) {
          // Preserve focus + caret on the search box across the innerHTML swap, so typing
          // is CONTINUOUS (each keystroke re-renders; without this the input is destroyed
          // and focus is lost after every letter — the "searches after each letter" bug).
          const ae = document.activeElement;
          const keepSearch = ae && cfg.mount.contains(ae) && ae.matches && ae.matches('.gf-dt-search input');
          const caret = keepSearch ? ae.selectionStart : null;
          cfg.mount.innerHTML = renderHTML();
          if (keepSearch) {
            const inp = cfg.mount.querySelector('.gf-dt-search input');
            if (inp) { inp.focus(); try { inp.setSelectionRange(caret, caret); } catch (e) {} }
          }
          // Re-localise after every table re-render (sort/filter/search/paginate) — otherwise
          // interacting with a table reverts its chrome to English under BM.
          if (typeof localizeDOM === 'function') localizeDOM(cfg.mount);
        }
        if (cfg.onRender) cfg.onRender(api);
        return api;
      }
    };
    DT[id] = api;
    const H = `DT['${id}']`;                       // handler prefix for inline onclick

    // labels for a filter value (options may be [{value,label}] or plain values)
    const optLabel = (def, v) => {
      const o = (def.options || []).find(o => (o && o.value !== undefined ? o.value : o) === v);
      return o && o.label !== undefined ? o.label : (o !== undefined ? o : v);
    };
    const filterPills = () => api.activeFilters().map(([k, v]) => {
      const def = filterDefs.find(f => f.key === k) || {};
      const val = def.type === 'bool' ? (def.label || k)
        : Array.isArray(v) ? v.map(x => optLabel(def, x)).join(', ') : optLabel(def, v);
      return `<button type="button" class="gf-dt-pill" onclick="${H}.removeFilter('${k}')">
        <span class="gf-dt-pill-k">${esc(def.label || k)}:</span> ${esc(val)} <span class="gf-dt-pill-x">×</span></button>`;
    }).join('');

    const filterMenu = () => {
      const avail = filterDefs.filter(def => state.filters[def.key] == null);
      if (!avail.length) return '';
      return `<details class="gf-dt-addwrap"><summary class="gf-dt-add" role="button">${ICON_PLUS} Filter</summary>
        <div class="gf-dt-menu">${avail.map(def => {
          if (def.type === 'bool')
            return `<button type="button" class="gf-dt-menu-item" onclick="${H}.setBoolFilter('${def.key}',true); this.closest('details').open=false">${esc(def.label)}</button>`;
          const opts = def.options || [];
          // Long option lists (outlets, design codes…) get a live search box that filters
          // the buttons in place — no need to scroll a wall of 60+ options.
          const searchable = opts.length > 8;
          const search = searchable
            ? `<div class="gf-dt-opt-search"><input type="text" placeholder="Search ${esc((def.label||'').toLowerCase())}…" oninput="const q=this.value.toLowerCase();this.closest('.gf-dt-sub-opts').querySelectorAll('.gf-dt-opt').forEach(function(b){b.style.display=b.dataset.l.indexOf(q)>-1?'':'none'})" onclick="event.stopPropagation()"></div>`
            : '';
          return `<details class="gf-dt-sub"><summary>${esc(def.label)}${searchable?` <span class="gf-dt-sub-n">${opts.length}</span>`:''}</summary><div class="gf-dt-sub-opts">${search}<div class="gf-dt-opt-list">${
            opts.map(o => { const v = o && o.value !== undefined ? o.value : o; const l = o && o.label !== undefined ? o.label : o;
              const arg = (typeof v === 'string') ? jsAttr(v) : JSON.stringify(v);
              return `<button type="button" class="gf-dt-opt" data-l="${esc(String(l).toLowerCase())}" onclick="${H}.toggleFilterValue('${def.key}',${arg})">${esc(l)}</button>`; }).join('')
          }</div></div></details>`;
        }).join('')}</div></details>`;
    };

    function renderHTML() {
      const cols = cfg.columns || [];
      const rows = api.page();
      const sort = state.sort;
      // Fixed layout + explicit <col> widths ⇒ a sort click never reflows columns.
      const colgroup = `<colgroup>${cols.map(c => `<col${c.width ? ` style="width:${c.width}"` : ''}>`).join('')}</colgroup>`;
      const head = `<tr>${cols.map(c => {
        const active = sort && sort.key === c.key;
        // Numeric / action columns declare align:'right' — header AND cells align right (flex,
        // so the global "text-align:left" cell rule can't cancel it). Action buttons then sit
        // flush to the right margin instead of stranded at the left of a wide cell.
        const cls = (c.sortable ? 'gf-th-sort' : '') + (c.align === 'right' ? ' gf-th-r' : '');
        const click = c.sortable ? ` onclick="${H}.toggleSort('${c.key}')"` : '';
        const label = 'label' in c ? esc(c.label) : esc(c.key);
        // Always-on caret in reserved fixed-width space: faint ↕ at rest, solid ↑/↓ when
        // active. State changes colour/glyph only — never inserted/removed (no reflow).
        const caret = c.sortable ? `<span class="gf-caret${active ? ' is-active is-' + sort.dir : ''}" aria-hidden="true"></span>` : '';
        return `<th class="${cls.trim()}"${click}><span class="gf-th-label">${label}</span>${caret}</th>`;
      }).join('')}</tr>`;
      const body = rows.length ? rows.map(r =>
        `<tr${cfg.rowAction ? ` class="gf-row-click" onclick="${H}._rowAction(${jsAttr(String(r[cfg.rowKey || 'id']))})"` : ''}>${cols.map(c => {
          const val = c.render ? c.render(r) : esc(r[c.key]);
          return c.align === 'right' ? `<td><div class="gf-cell-r">${val}</div></td>` : `<td>${val}</td>`;
        }).join('')}</tr>`).join('')
        : `<tr><td colspan="${cols.length}" class="gf-empty">${cfg.emptyState
            ? `<div class="gf-empty-title">${esc(cfg.emptyState.title)}</div><div class="gf-empty-body">${esc(cfg.emptyState.body || '')}</div>`
            : 'Nothing to show'}</td></tr>`;
      // Spacer rows fill a short page up to page-size so the table height — and the pager
      // below it — stay put across pages. Only when the data actually paginates.
      const padN = (rows.length && api.totalPages() > 1) ? Math.max(0, state.pageSize - rows.length) : 0;
      const padHtml = Array.from({ length: padN }, () => `<tr class="pad-row"><td colspan="${cols.length}">&nbsp;</td></tr>`).join('');
      const pills = filterPills();
      const toolbar = `<div class="gf-dt-toolbar">
        ${(cfg.searchKeys && cfg.searchKeys.length) ? `<div class="gf-dt-search"><span class="gf-dt-search-i">${ICON_SEARCH}</span>
          <input type="text" value="${esc(state.search)}" placeholder="${esc(cfg.searchPlaceholder || 'Search…')}" oninput="${H}.setSearch(this.value)"></div>` : ''}
        ${filterMenu()}
        ${pills}
        ${(api.activeFilters().length || state.search) ? `<button type="button" class="gf-dt-clear" onclick="${H}.clearFilters()">Clear all</button>` : ''}
      </div>`;
      const footer = `<div class="gf-dt-footer">${pagerBar(state.page, api.total(), state.pageSize, H + '.goToPage', '', H + '.setPageSize')}</div>`;
      // minWidth (px) keeps dense tables from crushing columns below readability — the
      // .gf-table-scroll wrapper scrolls horizontally instead of clipping numbers / IDs /
      // dates / action buttons. Long free-text still ellipsises gracefully.
      const mw = cfg.minWidth ? ` style="min-width:${+cfg.minWidth}px"` : '';
      return `<div class="gf-datatable" data-component="datatable">${toolbar}
        <div class="gf-table-scroll"><table class="gf-table gf-table-fixed"${mw}>${colgroup}<thead>${head}</thead><tbody>${body}${padHtml}</tbody></table></div>
        ${footer}</div>`;
    }
    api._rowAction = (key) => { const r = (cfg.rows || []).find(x => String(x[cfg.rowKey || 'id']) === String(key)); if (r && cfg.rowAction) cfg.rowAction(r); };
    return api.render();
  }

  /* ================================================================
     §3.3 DateRange — presets as data (7/30/60/90 + custom) + compare.
  ================================================================ */
  const DR = {};                        // DateRange instance registry
  let _drSeq = 0;
  const DateRange = {
    // The ONE period vocabulary — five segments, in this order, everywhere.
    PRESETS: [
      { key: '7d',     label: '7d',     days: 7 },
      { key: '30d',    label: '30d',    days: 30 },
      { key: '60d',    label: '60d',    days: 60 },
      { key: '90d',    label: '90d',    days: 90 },
      { key: 'custom', label: 'Custom', days: null }
    ],
    COMPARE: [
      { key: 'prev', label: 'vs previous period' },
      { key: 'yoy',  label: 'vs same period last year' },
      { key: 'none', label: 'no comparison' }
    ],
    // Prototype "today" — the plain-text window echo is computed relative to this so
    // presets read as real dates (e.g. "Showing Last 30 days · 16 Apr – 15 May 2026").
    REF_TODAY: '2026-05-15',
    // The resolved window, shown ONCE as a quiet dated caption beside the strip.
    // Compact range: elides repeated month/year ("1 – 7 May 2026", "16 Apr – 15 May 2026").
    echoText(inst) {
      const ref = (DateRange.REF_TODAY || '2026-05-15');
      const iso = dt => `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`;
      let from, to;
      if (inst.value === 'custom' && inst.custom && inst.custom.from && inst.custom.to) {
        from = inst.custom.from; to = inst.custom.to;
      } else {
        const d = inst.days() || 30;
        const a = new Date(ref + 'T00:00:00'); a.setDate(a.getDate() - d + 1);
        from = iso(a); to = ref;   // local parts — no UTC day-shift
      }
      const MON = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      const P = s => { const dt = new Date(s + 'T00:00:00'); return { d: dt.getDate(), m: dt.getMonth(), y: dt.getFullYear() }; };
      const a = P(from), b = P(to);
      let r;
      if (a.y === b.y && a.m === b.m) r = `${a.d} – ${b.d} ${MON[b.m]} ${b.y}`;
      else if (a.y === b.y)          r = `${a.d} ${MON[a.m]} – ${b.d} ${MON[b.m]} ${b.y}`;
      else                           r = `${a.d} ${MON[a.m]} ${a.y} – ${b.d} ${MON[b.m]} ${b.y}`;
      const cal = '<svg class="gf-dr-cap-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>';
      return `${cal}<span>${r}</span>`;
    },
    // A live segmented-strip instance. opts: { mount, value, compare, onChange }
    create(opts) {
      const id = 'dr' + (++_drSeq);
      const inst = {
        id, value: opts.value || '30d', custom: opts.custom || null,
        compare: opts.compare ? 'prev' : null,
        days() { const p = DateRange.PRESETS.find(x => x.key === inst.value); return p ? p.days : null; },
        set(key) {
          if (key === 'custom') { DateRange.openPicker(opts.mount, r => { inst.custom = r; inst.value = 'custom'; fire(); }, inst.custom); return; }
          inst.value = key; inst.custom = null; fire();
        },
        setCompare(key) { inst.compare = key; fire(); },
        render() { if (opts.mount) opts.mount.innerHTML = strip(); return inst; }
      };
      DR[id] = inst;
      const H = `DR['${id}']`;
      const fire = () => { inst.render(); if (opts.onChange) opts.onChange(inst); };
      const strip = () => {
        // Segments stay short & uniform — Custom is always just "Custom"; the resolved
        // dates live once, in the caption, so the strip never balloons.
        const segs = DateRange.PRESETS.map(p => {
          const active = inst.value === p.key;
          return `<button type="button" class="gf-seg${active ? ' is-active' : ''}" onclick="${H}.set('${p.key}')">${esc(p.label)}</button>`;
        }).join('');
        const cmp = inst.compare == null ? '' :
          `<div class="gf-seg-strip gf-seg-compare">${DateRange.COMPARE.map(c =>
            `<button type="button" class="gf-seg${inst.compare === c.key ? ' is-active' : ''}" onclick="${H}.setCompare('${c.key}')">${esc(c.label)}</button>`).join('')}</div>`;
        return `<div class="gf-daterange" data-component="daterange"><div class="gf-seg-strip">${segs}</div>${cmp}<span class="gf-dr-cap">${DateRange.echoText(inst)}</span></div>`;
      };
      return inst.render();
    },
    // Two <input type="date"> + preset shortcuts (§3.3). Inputs are PRE-FILLED with the
    // current window so the picker can never Apply an empty range (Safari would otherwise
    // start blank and, if the native pick didn't commit, silently fall back to the preset).
    openPicker(anchorEl, onApply, current) {
      const ref = DateRange.REF_TODAY || '2026-05-15';
      const iso = dt => `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`;
      const d0 = new Date(ref + 'T00:00:00'); d0.setDate(d0.getDate() - 29);
      const fromDef = (current && current.from) ? current.from : iso(d0);
      const toDef   = (current && current.to)   ? current.to   : ref;
      Dialog.open({
        title: 'Custom range',
        body: `
          <label class="gf-field"><span>From</span><input type="date" lang="en-GB" id="gf-dr-from" value="${fromDef}" max="${ref}"></label>
          <label class="gf-field"><span>To</span><input type="date" lang="en-GB" id="gf-dr-to" value="${toDef}" max="${ref}"></label>`,
        actions: [
          { label: 'Cancel', kind: 'ghost', close: true },
          { label: 'Apply', kind: 'gold', onClick: dlg => {
              const from = (dlg.querySelector('#gf-dr-from') || {}).value || '';
              const to   = (dlg.querySelector('#gf-dr-to')   || {}).value || '';
              if (!from || !to) { if (typeof toast === 'function') toast('Pick both a start and end date', 'warn'); return false; }
              if (new Date(from) > new Date(to)) { if (typeof toast === 'function') toast('Start date must be on or before the end date', 'warn'); return false; }
              if (onApply) onApply({ from, to });
              return true;
            } }
        ]
      });
    }
  };

  /* ================================================================
     §7.6 Dialog — own node, role=dialog, aria-modal, focus trap,
     body scroll lock, focus restore, enter/exit animation.
     Replaces every native browser prompt and the shared #planModal.
  ================================================================ */
  let _dlgSeq = 0, _openStack = [], _scrollY = 0, _prevBodyStyle = '';
  const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

  const Dialog = {
    open(opts) {
      opts = opts || {};
      const id = 'gf-dialog-' + (++_dlgSeq);
      const labId = id + '-lab';
      const invoker = document.activeElement;
      const backdrop = document.createElement('div');
      backdrop.className = 'gf-dialog-backdrop overlay-enter';
      backdrop.dataset.dialog = id;
      const actions = (opts.actions || []).map((a, i) =>
        `<button type="button" data-act="${i}" class="${a.kind === 'gold' ? 'btn-gold' : a.kind === 'danger' ? 'btn-danger' : 'btn-ghost'} justify-center">${esc(a.label)}</button>`).join('');
      backdrop.innerHTML =
        `<div role="dialog" aria-modal="true" aria-labelledby="${labId}" tabindex="-1" class="gf-dialog sheet-enter ${opts.size || ''}">
          <div class="gf-dialog-head">
            <h2 id="${labId}" class="gf-dialog-title">${esc(opts.title || '')}</h2>
            <button type="button" class="gf-dialog-x" aria-label="Close" data-close>&times;</button>
          </div>
          <div class="gf-dialog-body">${opts.body || ''}</div>
          ${actions ? `<div class="gf-dialog-actions">${actions}</div>` : ''}
        </div>`;
      document.body.appendChild(backdrop);
      // Modals live outside #pageContent, so route()'s localiser never reaches them — localise
      // the dialog here so the cashier's New-Sale / confirm / notification sheets are BM too.
      if (typeof localizeDOM === 'function') localizeDOM(backdrop);

      // Lock page scroll definitively (overflow:hidden still permits programmatic
      // scrollBy). Pin <body> with position:fixed; restore on the last close.
      if (_openStack.length === 0) {
        _scrollY = window.scrollY || document.documentElement.scrollTop || 0;
        _prevBodyStyle = document.body.getAttribute('style') || '';
        // The scroll container is <html>, which carries a PERMANENT scrollbar
        // (styles.css: `html { overflow-y: scroll; scrollbar-gutter: stable }`). Pinning
        // <body> position:fixed freezes the page but does NOT remove that html scrollbar —
        // so we must NOT add a compensating paddingRight (that double-books the gutter and
        // shoves the background left ~15px the moment a dialog opens on always-show-scrollbar
        // systems, e.g. macOS "Show scroll bars: Always"). The stable gutter already holds
        // the width constant; no compensation is needed.
        document.body.style.position = 'fixed';
        document.body.style.top = `-${_scrollY}px`;
        document.body.style.left = '0';
        document.body.style.right = '0';
        document.body.style.width = '100%';
        document.body.style.overflow = 'hidden';
      }

      const dialog = backdrop.querySelector('[role=dialog]');
      const entry = { id, backdrop, dialog, invoker, onClose: opts.onClose };
      _openStack.push(entry);

      // wire actions / close
      backdrop.addEventListener('click', e => {
        if (e.target === backdrop && opts.dismissable !== false) Dialog.close(id);
        const x = e.target.closest('[data-close]'); if (x) Dialog.close(id);
        const ab = e.target.closest('[data-act]');
        if (ab) {
          const a = opts.actions[+ab.dataset.act];
          const res = a.onClick ? a.onClick(dialog) : true;
          if (a.close || res === true) Dialog.close(id);
        }
      });
      // focus trap + Esc
      entry.keydown = e => {
        if (e.key === 'Escape') { e.preventDefault(); Dialog.close(id); return; }
        if (e.key !== 'Tab') return;
        const f = Array.from(dialog.querySelectorAll(FOCUSABLE)).filter(el => el.offsetParent !== null || el === dialog);
        if (!f.length) { e.preventDefault(); dialog.focus(); return; }
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        else if (!dialog.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
      };
      document.addEventListener('keydown', entry.keydown, true);

      // move focus in
      requestAnimationFrame(() => {
        const target = dialog.querySelector('[autofocus]') || dialog.querySelector(FOCUSABLE) || dialog;
        target.focus();
      });
      if (opts.onOpen) opts.onOpen(dialog);
      return dialog;
    },
    close(id) {
      const idx = id ? _openStack.findIndex(e => e.id === id) : _openStack.length - 1;
      if (idx < 0) return;
      const entry = _openStack.splice(idx, 1)[0];
      document.removeEventListener('keydown', entry.keydown, true);
      entry.dialog.classList.remove('sheet-enter'); entry.dialog.classList.add('sheet-exit');
      entry.backdrop.classList.remove('overlay-enter'); entry.backdrop.classList.add('overlay-exit');
      const done = () => {
        entry.backdrop.remove();
        if (!_openStack.length) {
          document.body.setAttribute('style', _prevBodyStyle);
          window.scrollTo(0, _scrollY);
        }
        if (entry.invoker && entry.invoker.focus) entry.invoker.focus();
        if (entry.onClose) entry.onClose();
      };
      setTimeout(done, 160);
    },
    closeAll() { [..._openStack].reverse().forEach(e => Dialog.close(e.id)); },
    // Drop-in replacement for the native confirmation prompt (named `ask` so no native prompt
    // browser primitive survives anywhere in the app — see §7.6).
    ask(opts) {
      opts = typeof opts === 'string' ? { body: opts } : (opts || {});
      Dialog.open({
        title: opts.title || 'Please confirm',
        body: `<p class="gf-dialog-text">${esc(opts.body || '')}</p>`,
        actions: [
          { label: opts.cancelText || 'Cancel', kind: 'ghost', close: true },
          { label: opts.confirmText || 'Confirm', kind: opts.danger ? 'danger' : 'gold',
            onClick: () => { if (opts.onConfirm) opts.onConfirm(); return true; } }
        ]
      });
    }
  };

  /* ================================================================
     §3.5 Session + can() — one gate. HQ Admin / Store Manager / Cashier.
  ================================================================ */
  // Role names come from window.GF_ROLES — the single role-list literal, declared
  // inline in the page (Q4). Read lazily so nothing here re-quotes a role name and
  // the load order (components before the inline script) doesn't matter.
  const rolesList = () => window.GF_ROLES || [];
  const permMap = () => {
    const R = rolesList();
    // Matrix (Settings ▸ Team ▸ Permissions): Cashier does key-in/upload only — no
    // Dashboard, no Reports, no Vouchers issue/void, no Broadcasts, no Settings.
    // Store Manager adds Dashboard + own-outlet Reports. HQ Admin has everything.
    return {
      [R[0]]: ['view', 'create', 'edit', 'delete', 'settings', 'editCompany', 'upload', 'broadcast', 'adjustPoints', 'issueVoucher', 'dashboard', 'reports'],
      [R[1]]: ['view', 'create', 'upload', 'dashboard', 'reports'],
      [R[2]]: ['view', 'create', 'upload']
    };
  };
  // Defaults to the demo HQ Admin so the CRM renders in (matching the "Nadia Aziz ·
  // HQ · Penang" header). A branded sign-in / role selector wires to this next.
  const SESSION = { signedIn: true, user: 'Nadia Aziz', role: null, outlet: 'HQ · Penang' };
  function can(action) {
    if (SESSION.role == null) SESSION.role = rolesList()[0] || null;   // demo default = first role
    return (permMap()[SESSION.role] || []).includes(action);
  }
  function signIn(role, user, outlet) {
    SESSION.signedIn = true; SESSION.role = role; SESSION.user = user || role; SESSION.outlet = outlet || null;
    return SESSION;
  }
  function signOutCRM() { SESSION.signedIn = false; SESSION.role = null; SESSION.user = null; SESSION.outlet = null; }

  /* ---------- expose ---------- */
  Object.assign(window, {
    Pager, pager: Pager, pagerBar, DataTable, DT, DateRange, DR, Dialog,
    SESSION, can, signIn, signOutCRM, escHtml: esc, jsAttr
  });
  Object.defineProperty(window, 'ROLES',       { configurable: true, get: rolesList });
  Object.defineProperty(window, 'PERMISSIONS', { configurable: true, get: permMap });
})();
