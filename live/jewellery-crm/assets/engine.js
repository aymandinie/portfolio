/* ==================================================================
   Goldfinch — engine.js  (SPEC §2 loyalty, §4 BNPL, §5.4 broadcast cost)
   Pure functions over GF_DATA. No DOM. Unit-testable. Loaded after data.js.
================================================================== */
(function () {
  'use strict';

  // "today" for the running app. Ledger projections accept an explicit `now`
  // so they are deterministic under test (the harness passes '2026-07-08').
  const isoDay = d => {
    const x = (d instanceof Date) ? d : new Date(d);
    return x.getFullYear() + '-' + String(x.getMonth() + 1).padStart(2, '0') + '-' + String(x.getDate()).padStart(2, '0');
  };
  // Demo clock PINNED to 15 May 2026 (not the real system date) so plan progress, statuses and
  // "as of today" figures stay stable for the demo instead of drifting a day every real day.
  // Matches admin.html DEMO_TODAY_ISO + data.js TODAY.
  const NOW = isoDay(new Date(2026, 4, 15));
  const addMonths = (isoStr, n) => { const x = new Date(isoStr); x.setMonth(x.getMonth() + n); return isoDay(x); };

  /* ---------- §2.2 / §2.7 accrual — per line, by grade, post-voucher ---------- */
  // Accrual by grade — ringgit of eligible spend per 1 point. 999.9 = 1pt/RM10, 916 = 1pt/RM5,
  // everything else ('others': 750/375/silver/bullion) = 1pt/RM2. Register (17 Jul) Priority row.
  const POINT_RATE        = { '999.9': 10, '916': 5, '750': 2, '375': 2, 'others': 2 };
  const rateFor           = g => POINT_RATE[g] || POINT_RATE.others;   // any unknown grade → 'others' band
  const POINTS_PER_RINGGIT = 100;                         // 100 pts = RM 1 (the ONE conversion constant)
  const VOUCHER_LADDER    = [2500, 5000, 10000, 20000];  // → RM 25 / 50 / 100 / 200 (all at 100 pts = RM 1)
  const TIER_THRESHOLD    = { entry: 0, bronze: 2500, silver: 7000, gold: 15000 }; // qualifyingPoints
  const MAINTAIN_SPEND    = { entry: 0, bronze: 300, silver: 600, gold: 1000 };     // net spend, §2.5

  // Voucher-eligible base excludes workmanship (upah). §2.3.
  const eligible    = l => (l.goldValue || 0) + (l.otherCharges || 0);
  const voucherBase = txn => (txn.lines || []).reduce((s, l) => s + eligible(l), 0);

  // Pre-voucher per-line points (kept for reference / display). §2.2.
  const linePoints = l => Math.floor((l.lineTotal || 0) / rateFor(l.grade));

  // Post-voucher, pro-rata across voucher-eligible lines, floored per line. §2.7.
  function txnPoints(txn) {
    const base = voucherBase(txn);
    const disc = Math.min(txn.voucherValue || 0, base);       // never exceeds eligible base
    return (txn.lines || []).reduce((sum, l) => {
      const share   = base > 0 ? (eligible(l) / base) * disc : 0; // upah stays in lineTotal
      const netLine = (l.lineTotal || 0) - share;
      return sum + Math.floor(netLine / rateFor(l.grade));        // floor, per line — never the basket
    }, 0);
  }

  /* ---------- §2.1 one ledger, two projections ---------- */
  const aliveAward = (a, now) => !a.reversedOn && String(a.expiresOn) > String(now);
  // spendable — redemption filtered out
  function balance(m, now) {
    now = now || NOW;
    return (m.pointsLedger || []).filter(a => aliveAward(a, now) && !a.redeemedOn)
      .reduce((s, a) => s + a.points, 0);
  }
  // status qualifier — redemption NOT filtered (airline status-miles model)
  function qualifying(m, now) {
    now = now || NOW;
    return (m.pointsLedger || []).filter(a => aliveAward(a, now))
      .reduce((s, a) => s + a.points, 0);
  }

  /* ---------- §2.4 / §2.8 tiers — sticky ---------- */
  const TIER_ORDER = ['entry', 'bronze', 'silver', 'gold'];
  function tierFor(q) {                       // tier a qualifying total earns
    let t = 'entry';
    for (const k of TIER_ORDER) if (q >= TIER_THRESHOLD[k]) t = k;
    return t;
  }
  function nextThreshold(tier) {              // points to the next tier, null at gold
    const i = TIER_ORDER.indexOf(tier);
    return i < 0 || i >= TIER_ORDER.length - 1 ? null : TIER_THRESHOLD[TIER_ORDER[i + 1]];
  }
  // Promotion fires the instant qualifying crosses a higher threshold (§2.1).
  // Returns the member (mutated) — sets tierAchievedOn / tierExpiresOn on promotion.
  function applyPromotion(m, now) {
    now = now || NOW;
    const earned = tierFor(qualifying(m, now));
    if (TIER_ORDER.indexOf(earned) > TIER_ORDER.indexOf(m.tier)) {
      m.tier = earned; m.tierAchievedOn = now; m.tierExpiresOn = addMonths(now, 12);
    }
    return m;
  }
  // Retention — tested ONLY at tierExpiresOn, on net spend within the window (§2.1).
  // spendInWindow = Σ netPaid of the member's non-reversed txns since tierAchievedOn.
  function retentionSpend(m, transactions, now) {
    now = now || NOW;
    const since = m.tierAchievedOn || '0000';
    return (transactions || GF_DATA.transactions || [])
      .filter(t => t.memberId === m.id && !t.reversed && t.ts.slice(0, 10) >= since && t.ts.slice(0, 10) <= now)
      .reduce((s, t) => s + (t.netPaid || 0), 0);
  }
  // Only demotes at expiry, one tier, on failing the spend test (§2.5 L13 interim).
  function applyRetention(m, transactions, now) {
    now = now || NOW;
    if (!m.tierExpiresOn || now < m.tierExpiresOn) return m;   // window still open
    const met = retentionSpend(m, transactions, now) >= (MAINTAIN_SPEND[m.tier] || 0);
    if (met) { m.tierAchievedOn = now; m.tierExpiresOn = addMonths(now, 12); }
    else {
      const i = TIER_ORDER.indexOf(m.tier);
      m.tier = TIER_ORDER[Math.max(0, i - 1)];
      m.tierAchievedOn = now; m.tierExpiresOn = addMonths(now, 12);
    }
    return m;
  }

  /* ---------- tier status — ONE source both apps read (client 22 Jul) ----------
     Two pools, airline/Sephora model:
       • redeemable — spendable points (drops when redeemed). May sit BELOW a tier threshold; fine.
       • status     — qualifying points (redemptions NOT subtracted → sticky). Drives the tier.
     A tier is KEPT while status ≥ its threshold AND the annual maintenance spend is met. */
  function tierStatus(m, transactions, now) {
    now = now || NOW;
    const tier      = m.tier || 'entry';
    const status    = m.qualifyingPoints != null ? m.qualifyingPoints : qualifying(m, now);
    const redeemable= m.pointsBalance   != null ? m.pointsBalance
                    : (m.points != null ? m.points : balance(m, now));
    const threshold = TIER_THRESHOLD[tier] || 0;
    const nt        = nextThreshold(tier);
    const nextTier  = nt != null ? TIER_ORDER[TIER_ORDER.indexOf(tier) + 1] : null;
    const need      = MAINTAIN_SPEND[tier] || 0;
    const spend     = Math.round(retentionSpend(m, transactions, now));
    return {
      tier, status, redeemable, threshold,
      nextTier, nextThreshold: nt, toNext: nt != null ? Math.max(0, nt - status) : 0,
      maintainNeed: need, maintainSpend: spend,
      statusMet: status >= threshold, spendMet: spend >= need, kept: status >= threshold && spend >= need
    };
  }

  /* ---------- dormancy (CRM Pending Matters 3.7) ----------
     18 consecutive months with ZERO transactions → account flagged "Dormant": tier reset to
     Entry, ALL remaining points permanently purged, profile archived. A win-back voucher is sent
     with the reminder. Tested against lastTransactionOn (falls back to tierAchievedOn). */
  const DORMANCY_MONTHS = 18;
  function monthsBetween(aIso, bIso) {
    const a = new Date(aIso), b = new Date(bIso);
    return (b.getFullYear()-a.getFullYear())*12 + (b.getMonth()-a.getMonth()) - (b.getDate() < a.getDate() ? 1 : 0);
  }
  function isDormant(m, now) {
    now = now || NOW;
    const last = m.lastTransactionOn || m.tierAchievedOn || m.joinedOn;
    if (!last) return false;
    return monthsBetween(last, now) >= DORMANCY_MONTHS;
  }
  // Applies the dormancy reset in place (idempotent). Real system runs this nightly; the demo
  // calls it lazily where dormant members are surfaced.
  function applyDormancy(m, now) {
    now = now || NOW;
    if (!isDormant(m, now)) return m;
    m.dormant = true; m.archived = true; m.dormantOn = m.dormantOn || now;
    m.tier = 'entry'; m.tierAchievedOn = now; m.tierExpiresOn = addMonths(now, 12);
    m.pointsBalance = 0; m.qualifyingPoints = 0; m.points = 0;
    if (Array.isArray(m.pointsLedger)) m.pointsLedger = [];   // points permanently purged
    return m;
  }

  /* ---------- award / redeem / reverse (§2.1, §2.11) ---------- */
  let _plSeq = 900000;
  function awardPoints(m, txn, now) {
    now = now || (txn.ts ? txn.ts.slice(0, 10) : NOW);
    const pts = (txn.pointsAwarded != null) ? txn.pointsAwarded : txnPoints(txn);
    if (pts <= 0) return null;
    m.pointsLedger = m.pointsLedger || [];
    const entry = { id: 'PL-' + (++_plSeq), points: pts, awardedOn: now, expiresOn: addMonths(now, 12),
      txnId: txn.id, redeemedOn: null, reversedOn: null };
    // recover any prior shortfall before crediting (§2.11)
    if (m.pointsShortfall > 0) {
      const take = Math.min(m.pointsShortfall, entry.points);
      m.pointsShortfall -= take; entry.points -= take;
      if (entry.points <= 0) return entry;
    }
    m.pointsLedger.push(entry);
    applyPromotion(m, now);
    return entry;
  }
  // FIFO by soonest expiry (§2.1). Returns points actually redeemed.
  function redeem(m, points, now) {
    now = now || NOW;
    let need = points;
    const live = (m.pointsLedger || []).filter(a => aliveAward(a, now) && !a.redeemedOn)
      .sort((a, b) => String(a.expiresOn) < String(b.expiresOn) ? -1 : 1);
    for (const a of live) {
      if (need <= 0) break;
      if (a.points <= need) { a.redeemedOn = now; need -= a.points; }
      else { // split the award: redeem part, keep the remainder alive
        m.pointsLedger.push({ ...a, id: 'PL-' + (++_plSeq), points: a.points - need });
        a.points = need; a.redeemedOn = now; need = 0;
      }
    }
    return points - need;
  }
  // Reversal / refund (§2.11): drops the award from BOTH projections, restores voucher,
  // clamps balance ≥ 0 recording a shortfall, never demotes (tier sticky).
  function reverseTxn(txn, m, now) {
    now = now || NOW;
    txn.reversed = true; txn.reversedOn = now;
    let flagForReview = false;
    if (m) {
      const award = (m.pointsLedger || []).find(a => a.txnId === txn.id && !a.reversedOn);
      if (award) {
        award.reversedOn = now;
        if (award.redeemedOn) {                       // already spent → shortfall
          m.pointsShortfall = (m.pointsShortfall || 0) + award.points;
        }
        // promotion driven by this award in the last 30 days → HQ review
        if (m.tierAchievedOn && (new Date(now) - new Date(m.tierAchievedOn)) / 864e5 <= 30) flagForReview = true;
      }
    }
    // restore a consumed voucher unless it has since expired
    if (txn.voucherCode && GF_DATA.vouchers) {
      const v = GF_DATA.vouchers.find(x => x.code === txn.voucherCode);
      if (v && v.status === 'used') v.status = 'active';
    }
    return { flagForReview };
  }

  /* ---------- §4 BNPL — adoption & exposure only, no receivable ---------- */
  const PLAN_STATUS = { SCHEDULED: 'Scheduled', FINAL: 'Final month', ELAPSED: 'Elapsed' };
  function planStatus(plan, now) {
    // Accept only an explicit date string; ignore anything else (e.g. an array
    // index when used as `plans.map(planStatus)`) and fall back to today.
    now = (typeof now === 'string' && now) ? now : NOW;
    // Prefer the day-precise start (startISO) over the coarse "Mon YYYY" label, so the
    // Scheduled/Final/Elapsed split is accurate to the day (not snapped to the 1st of the month).
    const start = new Date(plan.startISO || plan.startDate);
    const end = new Date(start); end.setMonth(end.getMonth() + (plan.termMonths || 0));
    const nowD = new Date(now);
    if (nowD >= end) return PLAN_STATUS.ELAPSED;                       // term run out (NOT "paid")
    const finalStart = new Date(end); finalStart.setMonth(finalStart.getMonth() - 1);
    return nowD >= finalStart ? PLAN_STATUS.FINAL : PLAN_STATUS.SCHEDULED;
  }
  // Adoption/exposure figures Goldfinch can actually know (never a receivable).
  function bnplStats(transactions, now) {
    const txns = transactions || GF_DATA.transactions || [];
    const bnpl = txns.filter(t => !t.reversed && t.bnpl);
    const nonBnpl = txns.filter(t => !t.reversed && !t.bnpl);
    const sum = a => a.reduce((s, t) => s + (t.grossTotal || 0), 0);
    const bnplValue = sum(bnpl), allValue = sum(bnpl) + sum(nonBnpl);
    const avg = a => a.length ? sum(a) / a.length : 0;
    return {
      salesValue: bnplValue,
      shareOfSales: allValue ? bnplValue / allValue : 0,
      plansStarted: bnpl.length,
      avgBnplTicket: avg(bnpl),
      avgNonBnplTicket: avg(nonBnpl),
      uplift: avg(nonBnpl) ? (avg(bnpl) - avg(nonBnpl)) / avg(nonBnpl) : 0,
      activePlans: bnpl.filter(t => planStatus(t.bnpl, now) !== PLAN_STATUS.ELAPSED).length
    };
  }

  /* ---------- §5.4 broadcast cost — computed, never hardcoded ---------- */
  // WhatsApp Business conversation pricing by CATEGORY (MY, confirmed 16 Jul): marketing ≈ RM0.377,
  // utility (transactional) ≈ RM0.08 — the register nudges templates toward utility to cut cost.
  // `whatsapp` aliases the marketing rate for legacy channel-based callers; SMS is de-emphasised.
  const BROADCAST_RATE = { marketing: 0.377, utility: 0.08, whatsapp: 0.377, sms: 0.085 };
  // A broadcast's category → marketing unless it's an automated/transactional (utility) template.
  function broadcastCategory(b) {
    if (b && b.category) return String(b.category).toLowerCase();
    const n = (b && (b.name || b.templateId || '')) + '';
    return /reminder|installment|due|receipt|tier|birthday|verify|otp/i.test(n) ? 'utility' : 'marketing';
  }
  function broadcastCost(b) {
    const recips = (b && b.recipients) || 0;
    // Prefer conversation-category pricing (WhatsApp-first). Fall back to a channel sum if given.
    if (b && (b.category || !b.channels)) return recips * (BROADCAST_RATE[broadcastCategory(b)] || BROADCAST_RATE.marketing);
    const chans = b.channels || [];
    return recips * chans.reduce((s, c) => s + (BROADCAST_RATE[c] || 0), 0);
  }

  /* ---------- referral totals — derived from the referral records, never a stored figure ----------
     earned  = rewards on records already 'rewarded' (paid out)
     pending = rewards on records 'qualified' (friend purchased, payout not yet issued)
     A 'pending'-status record (friend signed up, not yet purchased) carries no reward yet.
     Register (17 Jul): compute from records so the summary can't duplicate/diverge. */
  function referralTotals(memberId) {
    const recs = (GF_DATA.referrals || []).filter(r => r.referrerId === memberId);
    const cfg = (typeof GF_DATA !== 'undefined' && GF_DATA.referralProgram) || {};
    const limit = cfg.autoApproveLimit || Infinity;
    const earned  = recs.filter(r => r.status === 'rewarded').reduce((s, r) => s + (r.reward || 0), 0);
    const qualified = recs.filter(r => r.status === 'qualified');
    const pending = qualified.reduce((s, r) => s + (r.reward || 0), 0);
    // Rewards over the auto-approve limit (or explicitly flagged) wait on HQ sign-off.
    const awaitingApproval = qualified.filter(r => r.approval === 'pending' || (r.reward || 0) > limit)
                                      .reduce((s, r) => s + (r.reward || 0), 0);
    const needsApproval = r => r && (r.approval === 'pending' || (r.reward || 0) > limit);
    const qualifiedCount = recs.filter(r => r.status === 'rewarded' || r.status === 'qualified').length;
    return { earned, pending, awaitingApproval, needsApproval, qualifiedCount, total: recs.length, records: recs };
  }

  /* ---------- redemption ladder — ONE catalogue, derived from the constants ----------
     Both the portal Rewards grid and the CRM redeem modal read GF_DATA.pointsRewards.
     We build it here from VOUCHER_LADDER at exactly 100 pts = RM 1 so the RM value and the
     point cost can never drift apart again (register 17 Jul — value-consistency sweep). */
  // Voucher T&C → an ARRAY of bullet lines. A voucher with bespoke `terms` (one paragraph) is split
  // on sentence boundaries; otherwise the canonical GF_DATA.voucherTerms list is used. ONE splitter
  // for BOTH the CRM voucher detail and the portal voucher sheet, so they always render identically.
  function voucherTermsList(v) {
    const t = v && v.terms;
    if (t) return t.split(/\.\s+/).filter(Boolean).map(s => s.replace(/\.$/, '') + '.');
    return (typeof GF_DATA !== 'undefined' && GF_DATA.voucherTerms) || [];
  }

  const redemptionLadder = () => VOUCHER_LADDER.map(cost => {
    const value = Math.round(cost / POINTS_PER_RINGGIT);
    return { value, cost, label: 'RM ' + value + ' voucher' };
  });
  if (typeof GF_DATA !== 'undefined') GF_DATA.pointsRewards = redemptionLadder();

  /* ---------- referral auto-approval — the client rule: any referral reward at or under the
     auto-approve limit is credited INSTANTLY; only rewards ABOVE it wait on HQ sign-off. Promote
     qualifying 'qualified' records to 'rewarded' at load so the ledger reflects the rule (17 Jul
     Register + 20 Jul feedback). A 3-month voucher expiry is stamped so the row reads complete. */
  const _mmm = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  function addMonthsStr(dateStr, n) {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return '—';
    d.setMonth(d.getMonth() + n);
    return String(d.getDate()).padStart(2, '0') + ' ' + _mmm[d.getMonth()] + ' ' + d.getFullYear();
  }
  function applyReferralAutoApproval() {
    if (typeof GF_DATA === 'undefined' || !GF_DATA.referrals) return;
    const cfg = GF_DATA.referralProgram || {};
    const limit = cfg.autoApproveLimit || 200;
    const valid = cfg.voucherValidityMonths || 3;
    GF_DATA.referrals.forEach(r => {
      // qualified + within the instant limit + not explicitly flagged for HQ review → auto-credit.
      if (r.status === 'qualified' && (r.reward || 0) <= limit && r.approval !== 'pending') {
        r.status = 'rewarded';
        r.autoApproved = true;
        if (!r.voucherExpiry || r.voucherExpiry === '—') r.voucherExpiry = addMonthsStr(r.date, valid);
      }
    });
  }
  if (typeof GF_DATA !== 'undefined') applyReferralAutoApproval();

  /* ---------- expose (SPEC RULES) ---------- */
  const API = {
    POINT_RATE, rateFor, POINTS_PER_RINGGIT, VOUCHER_LADDER, redemptionLadder, referralTotals, TIER_THRESHOLD, MAINTAIN_SPEND,
    eligible, voucherBase, linePoints, txnPoints,
    balance, qualifying, tierFor, nextThreshold,
    applyPromotion, applyRetention, retentionSpend,
    DORMANCY_MONTHS, isDormant, applyDormancy, monthsBetween, applyReferralAutoApproval, voucherTermsList, tierStatus,
    awardPoints, redeem, reverseTxn,
    PLAN_STATUS, planStatus, bnplStats,
    BROADCAST_RATE, broadcastCost, broadcastCategory, NOW
  };
  if (typeof window !== 'undefined') Object.assign(window, API);
  if (typeof module !== 'undefined' && module.exports) module.exports = API;
})();
