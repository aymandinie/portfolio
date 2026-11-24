/* v34 OPTION B v2 — compact data-vis (v1 counters, bars and waffles, scaled down to info-block size).
   Each [data-viz] tile gets .on when it enters view: CSS fills its bars / waffle, and its [data-count]
   number counts up from 0 to the value written in the HTML. Reduced motion: final state, no animation. */
(function() {
  "use strict";
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  /* fx.js splits [data-chars] headings with a non-breaking-space span between words, which shows as an
     indent at the start of wrapped lines; swap those for plain spaces so long headings wrap cleanly. */
  [].slice.call(document.querySelectorAll("[data-chars] .ch")).forEach(function(c) {
    if (c.textContent === "\u00a0") c.parentNode.replaceChild(document.createTextNode(" "), c);
  });
  var tiles = [].slice.call(document.querySelectorAll("[data-viz]"));
  if (!tiles.length) return;
  [].slice.call(document.querySelectorAll(".fd-w")).forEach(function(w) {
    var n = +w.getAttribute("data-n") || 100, lit = +w.getAttribute("data-lit") || n, h = "";
    for (var i = 0; i < n; i++) h += "<i" + (i < lit ? ' class="l"' : "") + ' style="--k:' + i + '"></i>';
    w.innerHTML = h;
  });
  function fmt(v, dec, group) {
    var s = dec ? v.toFixed(dec) : String(Math.round(v));
    return group ? s.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : s;
  }
  var nums = [].slice.call(document.querySelectorAll("[data-viz] [data-count]"));
  nums.forEach(function(el) {
    el.setAttribute("data-final", el.textContent);
  });
  if (reduced || !("IntersectionObserver" in window)) {
    tiles.forEach(function(t) { t.classList.add("on"); });
    return;
  }
  nums.forEach(function(el) { el.textContent = fmt(0, +(el.getAttribute("data-dec") || 0), el.getAttribute("data-group") === "1"); });
  function count(el) {
    var to = parseFloat(el.getAttribute("data-count")) || 0, dec = +(el.getAttribute("data-dec") || 0);
    var g = el.getAttribute("data-group") === "1", t0 = 0, D = 1600;
    requestAnimationFrame(function step(t) {
      if (!t0) t0 = t;
      var e = Math.min(1, (t - t0) / D);
      el.textContent = e >= 1 ? el.getAttribute("data-final") : fmt(to * (1 - Math.pow(1 - e, 3)), dec, g);
      if (e < 1) requestAnimationFrame(step);
    });
  }
  function fire(t) {
    if (t.classList.contains("on")) return;
    t.classList.add("on");
    [].slice.call(t.querySelectorAll("[data-count]")).forEach(count);
  }
  var io = new IntersectionObserver(function(es) {
    es.forEach(function(en) {
      if (!en.isIntersecting) return;
      io.unobserve(en.target);
      fire(en.target);
    });
  }, { threshold: .2, rootMargin: "0px 0px 10% 0px" });
  tiles.forEach(function(t) { io.observe(t); });
  window.__fdFire = fire;
})();

/* Reveal safety net. v1's reveals (zac.js IntersectionObserver) could be skipped when a section was scrolled
   past quickly, and text resting in the bottom 8% of the screen never revealed. Anything the reader has scrolled
   past is set to its end state at once; anything visible for 0.6s without having revealed is revealed then.
   zac.js still plays the staggered reveal (and replays it) for content that scrolls into view normally. */
(function() {
  "use strict";
  var els = [].slice.call(document.querySelectorAll(".r, .r-scale"));
  var tiles = [].slice.call(document.querySelectorAll("[data-viz]"));
  var queued = false;
  function check() {
    queued = false;
    var vh = innerHeight, now = performance.now();
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      if (el.classList.contains("in")) { el._fdSeen = 0; continue; }
      var r = el.getBoundingClientRect();
      if (r.bottom < vh * .75) { el.classList.add("in"); continue; }
      if (r.top < vh - 6 && r.bottom > 0) {
        if (!el._fdSeen) el._fdSeen = now;
        else if (now - el._fdSeen > 600) el.classList.add("in");
      } else el._fdSeen = 0;
    }
    for (var j = 0; j < tiles.length; j++) {
      if (tiles[j].getBoundingClientRect().top < vh * .92 && window.__fdFire) window.__fdFire(tiles[j]);
    }
  }
  function req() { if (!queued) { queued = true; requestAnimationFrame(check); } }
  addEventListener("scroll", req, { passive: true });
  addEventListener("resize", req);
  addEventListener("load", req);
  setInterval(req, 250);
  req();
})();

/* v2.1 step tabs (Edge "How it works"): click or arrow keys; one panel shown at a time. */
(function() {
  "use strict";
  [].slice.call(document.querySelectorAll("[data-tabs]")).forEach(function(box) {
    var bs = [].slice.call(box.querySelectorAll('[role="tab"]'));
    function pick(i, focus) {
      bs.forEach(function(b, k) {
        var on = k === i, p = document.getElementById(b.getAttribute("aria-controls"));
        b.setAttribute("aria-selected", on ? "true" : "false");
        b.tabIndex = on ? 0 : -1;
        if (p) p.hidden = !on;
      });
      if (focus) bs[i].focus();
    }
    bs.forEach(function(b, i) {
      b.addEventListener("click", function() { pick(i); });
      b.addEventListener("keydown", function(e) {
        var d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
        if (d) { e.preventDefault(); pick((i + d + bs.length) % bs.length, true); }
      });
    });
  });
})();

/* v2.1 Software lifecycle: the line between the seven steps fills as the list scrolls through the screen,
   and each step lights as the fill reaches it. Reduced motion: shown complete. */
(function() {
  "use strict";
  var pipes = [].slice.call(document.querySelectorAll("[data-pipe]"));
  if (!pipes.length) return;
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  function set(el, p) {
    el.style.setProperty("--p", p.toFixed(4));
    var li = el.children, n = li.length;
    for (var i = 0; i < n; i++) li[i].classList.toggle("on", p >= (n > 1 ? i / (n - 1) : 0) - .001);
  }
  if (reduced) { pipes.forEach(function(el) { set(el, 1); }); return; }
  (function loop() {
    var vh = innerHeight;
    pipes.forEach(function(el) {
      var r = el.getBoundingClientRect();
      if (r.bottom < -50 || r.top > vh + 50) { if (r.bottom < -50) set(el, 1); return; }
      /* 0 when the list's top is at 85% of the screen, 1 when its bottom reaches 55% */
      var a = vh * .85, b = vh * .55;
      var p = (a - r.top) / Math.max(1, (a - r.top) + (r.bottom - b));
      set(el, Math.min(1, Math.max(0, p)));
    });
    requestAnimationFrame(loop);
  })();
})();
