// Goldfinch Platform — Mock Data
// Shared between admin console and member portal.

const GF_DATA = {
  brand: {
    name: 'Goldfinch Jewelry',
    legal: 'Goldfinch Group Berhad',
    coNo: '202501030918 (1632330-P)',
    operating: 'Goldfinch Jewelry Sdn Bhd · 1075278-W',
    hq: 'Level 13A, Menara Skymind, Georgetown, Penang',
    tagline: 'Affordable Luxury for Everyone',
    founded: 2012,
    poweredBy: 'ZAC AI Technologies'
  },

  // 67 outlets total: 38 hypermarket + 15 mall + 14 shoplot
  // Top performers shown by default; full list available in selector
  outlets: [
    { code: 'KKT', name: 'Kuala Ketil',           channel: 'shoplot',    host: 'Founding outlet',     state: 'Kedah',    members: 1842 },
    { code: 'MBM', name: 'Mydin Bukit Mertajam',  channel: 'hypermarket',host: 'Mydin',               state: 'Penang',   members: 2184 },
    { code: 'ABG', name: 'AEON BiG Wangsa Maju',  channel: 'hypermarket',host: 'AEON BiG',            state: 'Kuala Lumpur', members: 2041 },
    { code: 'MSJ', name: 'Mydin Subang Jaya',     channel: 'hypermarket',host: 'Mydin',               state: 'Selangor', members: 1892 },
    { code: 'LSP', name: "Lotus's Sungai Petani", channel: 'hypermarket',host: "Lotus's",             state: 'Kedah',    members: 1673 },
    { code: 'EKR', name: 'Econsave Kundang',      channel: 'hypermarket',host: 'Econsave',            state: 'Selangor', members: 1418 },
    { code: 'BJC', name: 'Bukit Jambul Complex',  channel: 'mall',       host: 'Mall',                state: 'Penang',   members: 1320 },
    { code: 'KIP', name: 'KIPMall Bangi',         channel: 'mall',       host: 'Mall',                state: 'Selangor', members: 1180 },
    { code: 'GTJ', name: 'Giant Tampoi JB',       channel: 'hypermarket',host: 'Giant',               state: 'Johor',    members: 1139 },
    { code: 'MMK', name: 'Mayang Mall Kuantan',   channel: 'mall',       host: 'Mall',                state: 'Pahang',   members:  978 },
    { code: 'LPK', name: 'Langkawi Parade',       channel: 'mall',       host: 'Mall',                state: 'Kedah',    members:  812 },
    { code: 'BMK', name: 'Bachang Melaka',        channel: 'shoplot',    host: 'Street-level',        state: 'Melaka',   members:  768 }
  ],

  // Full outlet network for Reports selector (67 outlets summarised by host/channel)
  outletNetwork: {
    totalOutlets: 67,
    byChannel: { hypermarket: 38, mall: 15, shoplot: 14 },
    byHost: [
      { host: 'Mydin',           count: 9 },
      { host: 'Econsave',        count: 7 },
      { host: "Lotus's",         count: 5 },
      { host: 'AEON BiG',        count: 4 },
      { host: 'Giant',           count: 4 },
      { host: 'TF Value-Mart',   count: 3 },
      { host: 'Pasaraya Matahari',count: 3 },
      { host: '@Mart / C-Mart / CS',count: 3 },
      { host: 'Mall (regional)', count: 15 },
      { host: 'Shoplot / street',count: 14 }
    ],
    byState: [
      { state: 'Selangor',   count: 18 },
      { state: 'Kedah',      count: 14 },
      { state: 'Johor',      count:  8 },
      { state: 'Penang',     count:  6 },
      { state: 'Pahang',     count:  4 },
      { state: 'Negeri Sembilan', count: 4 },
      { state: 'Sabah',      count:  3 },
      { state: 'Perak',      count:  3 },
      { state: 'Kuala Lumpur',count: 2 },
      { state: 'Melaka',     count:  2 },
      { state: 'Terengganu', count:  2 },
      { state: 'Perlis',     count:  1 }
    ]
  },

  kpis: {
    totalMembers: 12847,
    newThisWeek: 248,
    activeAtome: 3214,
    newAtomeToday: 12,
    messagesToday: 8920,
    deliveryRate: 94.6
    // §4.1 — no `outstanding`/`overdue`: Goldfinch has no BNPL receivable and no
    // provider feed, so a repayment balance or delinquency count cannot exist.
  },

  // 4-tier model (Entry → Bronze → Silver → Gold). Thresholds CONFIRMED by client (CRM Pending Matters 3.7):
  // Entry 1,000 (welcome grant) · Bronze 2,500 · Silver 7,000 · Gold 15,000 qualifying points.
  // topCategory = product category most frequently purchased; grams999/grams916 = lifetime gold purchased per grade.
  members: [
    { id: 'GF-2026-0048291', name: 'Tan Wei Ming',                ic: '880428-07-5531', phone: '+60 12-345 6789', email: 'weiming.t@gmail.com',   tier: 'gold',   points: 15680, lastPurchase: '2 days ago',  joined: '12 Mar 2024', outlet: 'Mydin Bukit Mertajam',   dob: '28 Apr',  spendYTD: 12800, topCategory: 'Cincin',   grams999: 8.2,  grams916: 42.6 },
    { id: 'GF-2025-0033817', name: 'Siti Aminah binti Hassan',    ic: '790914-08-6624', phone: '+60 13-887 2241', email: 'aminah.h@outlook.com',  tier: 'gold',   points: 22180, lastPurchase: 'Today',       joined: '04 Aug 2023', outlet: 'AEON BiG Wangsa Maju',   dob: '14 Sep',  spendYTD: 18650, topCategory: 'Rantai',   grams999: 28.4, grams916: 31.2 },
    { id: 'GF-2026-0014622', name: 'Lim Mei Ling',                ic: '910211-10-5288', phone: '+60 16-220 8814', email: 'meiling.lim@gmail.com', tier: 'silver', points: 6920,  lastPurchase: '5 days ago',  joined: '22 Jan 2025', outlet: 'Mydin Subang Jaya',      dob: '11 Nov',  spendYTD: 3420,  topCategory: 'Loket',    grams999: 0,    grams916: 18.5 },
    { id: 'GF-2026-0029104', name: 'Aiman Hakim',                 ic: '950202-14-5097', phone: '+60 11-1880 4521',email: 'aiman.h@yahoo.com',     tier: 'bronze', points: 1140,  lastPurchase: '3 wks ago',   joined: '08 Sep 2025', outlet: 'Giant Tampoi JB',        dob: '02 Feb',  spendYTD: 1840,  topCategory: 'Subang',   grams999: 0,    grams916: 8.2 },
    { id: 'GF-2025-0041230', name: 'Devi Sundram',                ic: '850720-08-5142', phone: '+60 19-447 3380', email: 'devi.s@gmail.com',      tier: 'silver', points: 5680,  lastPurchase: '1 day ago',   joined: '17 Nov 2024', outlet: 'AEON BiG Wangsa Maju',   dob: '20 Jul',  spendYTD: 18400, topCategory: 'Gold Bar', grams999: 50.0, grams916: 0 },
    { id: 'GF-2026-0051203', name: 'Nurul Izzati',                ic: '011230-07-0884', phone: '+60 17-558 1230', email: 'nurul.i@gmail.com',     tier: 'entry',  points: 320,   lastPurchase: '1 wk ago',    joined: '02 Mar 2026', outlet: 'Mydin Bukit Mertajam',   dob: '30 Dec',  spendYTD: 640,   topCategory: 'Loket',    grams999: 0,    grams916: 7.2 },
    { id: 'GF-2025-0028841', name: 'Chong Kah Wai',               ic: '870508-07-5419', phone: '+60 12-998 4471', email: 'kwchong@hotmail.com',   tier: 'silver', points: 7120,  lastPurchase: '4 days ago',  joined: '19 Jun 2024', outlet: 'Mydin Bukit Mertajam',   dob: '08 May',  spendYTD: 5240,  topCategory: 'Rantai',   grams999: 0,    grams916: 22.8 },
    { id: 'GF-2024-0009918', name: 'Rajesh Kumar',                ic: '801022-08-5273', phone: '+60 13-227 8841', email: 'rajesh.k@gmail.com',    tier: 'gold',   points: 31450, lastPurchase: '6 days ago',  joined: '05 May 2022', outlet: "Lotus's Sungai Petani",  dob: '22 Oct',  spendYTD: 28400, topCategory: 'Gold Bar', grams999: 150.0,grams916: 12.4 },
    { id: 'GF-2026-0044108', name: 'Farah Wahida',                ic: '030317-01-1226', phone: '+60 18-112 5503', email: 'farah.w@gmail.com',     tier: 'entry',  points: 880,   lastPurchase: '2 wks ago',   joined: '11 Feb 2026', outlet: 'Bachang Melaka',         dob: '17 Mar',  spendYTD: 1240,  topCategory: 'Cincin',   grams999: 0,    grams916: 3.2 },
    { id: 'GF-2025-0038820', name: 'Ng Soon Heng',                ic: '880105-07-5331', phone: '+60 16-880 7745', email: 'shng@gmail.com',        tier: 'bronze', points: 4920,  lastPurchase: '8 days ago',  joined: '28 Aug 2024', outlet: 'Mydin Subang Jaya',      dob: '05 Jan',  spendYTD: 3920,  topCategory: 'Cincin',   grams999: 0,    grams916: 14.6 },
    { id: 'GF-2026-0049501', name: 'Yusoff bin Mohd',             ic: '920612-02-5187', phone: '+60 19-661 2280', email: 'yusoffm@gmail.com',     tier: 'bronze', points: 1450,  lastPurchase: 'Today',       joined: '08 Apr 2026', outlet: 'Kuala Ketil (founding)', dob: '12 Jun',  spendYTD: 2180,  topCategory: 'Subang',   grams999: 0,    grams916: 11.8 },
    { id: 'GF-2024-0015503', name: 'Priya Devi',                  ic: '821029-08-5466', phone: '+60 12-447 8830', email: 'priya.d@gmail.com',     tier: 'gold',   points: 28900, lastPurchase: 'Yesterday',   joined: '14 Apr 2023', outlet: 'Bukit Jambul Complex',   dob: '29 Aug',  spendYTD: 22400, topCategory: 'Rantai',   grams999: 22.4, grams916: 26.0 }
  ],

  // Product categories CONFIRMED · CRM Pending Matters 3.7 — Ring, Bracelet, Earring, Necklace,
  // Anklet, Bangle, Pendant. Bracelet/Bangle/Anklet are grouped as "Gelang" for chart legibility;
  // Gold Bar retained as a separate investment line (not a jewelry category).
  // Product categories. The 7 ACCESSORIES/jewellery categories (CRM Pending Matters 3.7) —
  // the old merged 'Bracelets · Bangles · Anklets' split into three — PLUS Gold Bar, which is its
  // own category but is INVESTMENT, not accessories (client 18 Jul: "gold bar is a category, just
  // not accessories"). `accessory:true` marks the 7 jewellery lines; Gold Bar is `investment:true`.
  productCategories: [
    { key: 'Cincin',   label: 'Rings',      en: 'Ring',     color: '#F2C21A', accessory: true },
    { key: 'Gelang',   label: 'Bracelets',  en: 'Bracelet', color: '#5B91AE', accessory: true },
    { key: 'Subang',   label: 'Earrings',   en: 'Earring',  color: '#0C3A54', accessory: true },
    { key: 'Rantai',   label: 'Necklaces',  en: 'Necklace', color: '#022135', accessory: true },
    { key: 'GelangKaki', label: 'Anklets',  en: 'Anklet',   color: '#6E8CA0', accessory: true },
    { key: 'Bangle',   label: 'Bangles',    en: 'Bangle',   color: '#4A7A96', accessory: true },
    { key: 'Loket',    label: 'Pendants',   en: 'Pendant',  color: '#7E97AA', accessory: true },
    { key: 'Gold Bar', label: 'Gold Bars · Investment', en: 'Investment', color: '#C3D0DA', investment: true },
    { key: 'Silver Bar', label: 'Silver Bars · Investment', en: 'Silver', color: '#A8B3BD', investment: true }
  ],

  // Members by product-category preference (for dashboard trend + breakdown)
  categoryTrend: [
    { key: 'Cincin',     members: 4820, growth7d: '+92', share: 38, revenue: 542000, units: 1240, wow:  6.2 },
    { key: 'Rantai',     members: 3180, growth7d: '+58', share: 25, revenue: 356000, units:  636, wow:  3.4 },
    { key: 'Subang',     members: 1670, growth7d: '+31', share: 13, revenue: 184000, units:  521, wow: -1.8 },
    { key: 'Loket',      members: 1410, growth7d: '+24', share: 11, revenue: 156000, units:  408, wow:  2.1 },
    { key: 'Gelang',     members:  520, growth7d: '+11', share:  4, revenue:  57000, units:  152, wow:  1.1 },
    { key: 'Bangle',     members:  262, growth7d: '+5',  share:  2, revenue:  28000, units:   74, wow:  0.8 },
    { key: 'GelangKaki', members:  238, growth7d: '+3',  share:  2, revenue:  27000, units:   72, wow:  0.6 },
    { key: 'Gold Bar',   members:  747, growth7d: '+24', share:  6, revenue: 128000, units:   92, wow:  8.7 }
  ],

  // Installment plans — financed via the 3 confirmed BNPL providers: Atome, Shopee PayLater, GrabPayLater.
  // invoiceNo links the plan to the originating POS sale (also surfaced in member purchase history).
  atomePlans: [
    { id: 'IP-48291', provider: 'Atome',          invoiceNo: 'INV-MBM-26031842', outlet: 'Mydin Bukit Mertajam',  memberId: 'GF-2026-0048291', customer: 'Tan Wei Ming',             phone: '+60 12-345 6789', item: 'Cincin Emas 916 — Pesona Tiga',           material: 'Emas 916 · 6.2g',   total: 2500,  paid: 1675, monthly: 208.33, paidMonths: 8,  totalMonths: 12, nextDate: '15 May 2026', status: 'ontrack', startDate: 'Sep 2025' },
    { id: 'IP-33817', provider: 'Shopee PayLater',invoiceNo: 'INV-ABG-25021177', outlet: 'AEON BiG Wangsa Maju',  memberId: 'GF-2025-0033817', customer: 'Siti Aminah binti Hassan', phone: '+60 13-887 2241', item: 'Rantai Leher 999.9 — Warisan Malaya',     material: 'Emas 999.9 · 14.8g', total: 12800, paid: 5376, monthly: 416.67, paidMonths: 15, totalMonths: 36, nextDate: '22 May 2026', status: 'ontrack', startDate: 'Feb 2025' },
    { id: 'IP-29104', provider: 'Atome',          invoiceNo: 'INV-GTJ-26020933', outlet: 'Giant Tampoi JB',       memberId: 'GF-2026-0029104', customer: 'Aiman Hakim',              phone: '+60 11-1880 4521', item: 'Subang Emas 916 — Merdeka Charms',        material: 'Emas 916 · 4.1g',   total: 1840,  paid: 460,  monthly: 153.33, paidMonths: 3,  totalMonths: 12, nextDate: '18 May 2026', status: 'scheduled', startDate: 'Feb 2026' },
    { id: 'IP-14622', provider: 'GrabPayLater',   invoiceNo: 'INV-MSJ-24061455', outlet: 'Mydin Subang Jaya',     memberId: 'GF-2026-0014622', customer: 'Lim Mei Ling',             phone: '+60 16-220 8814', item: 'Loket Emas 916 — Pesona Tiga',             material: 'Emas 916 · 8.5g',   total: 3420,  paid: 3150, monthly: 142.50, paidMonths: 22, totalMonths: 24, nextDate: '10 May 2026', status: 'final',   startDate: 'Jun 2024' },
    { id: 'IP-41230', provider: 'Shopee PayLater',invoiceNo: 'INV-ABG-26010288', outlet: 'AEON BiG Wangsa Maju',  memberId: 'GF-2025-0041230', customer: 'Devi Sundram',             phone: '+60 19-447 3380', item: 'Gold Bar 50g — Corporate Series',          material: 'Emas 999.9 · 50g',  total: 18400, paid: 2025, monthly: 511.11, paidMonths: 4,  totalMonths: 36, nextDate: '28 May 2026', status: 'ontrack', startDate: 'Jan 2026' },
    { id: 'IP-44108', provider: 'Atome',          invoiceNo: 'INV-LSP-26020471', outlet: "Lotus's Sungai Petani", memberId: 'GF-2026-0044108', customer: 'Farah Wahida',             phone: '+60 18-112 5503', item: 'Cincin Emas 916 — Bunga Tanjung',          material: 'Emas 916 · 3.2g',   total: 980,   paid: 245,  monthly: 81.67,  paidMonths: 3,  totalMonths: 12, nextDate: '18 May 2026', status: 'ontrack', startDate: 'Feb 2026' },
    { id: 'IP-28841', provider: 'GrabPayLater',   invoiceNo: 'INV-MBM-25010994', outlet: 'Mydin Bukit Mertajam',  memberId: 'GF-2025-0028841', customer: 'Chong Kah Wai',            phone: '+60 12-998 4471', item: 'Rantai Emas 916 — Klasik',                 material: 'Emas 916 · 11.5g',  total: 5680,  paid: 3786, monthly: 236.67, paidMonths: 16, totalMonths: 24, nextDate: '08 May 2026', status: 'ontrack', startDate: 'Jan 2025' },
    { id: 'IP-49501', provider: 'Atome',          invoiceNo: 'INV-KKT-26040612', outlet: 'Kuala Ketil (founding)',memberId: 'GF-2026-0049501', customer: 'Yusoff bin Mohd',          phone: '+60 19-661 2280', item: 'Subang Emas 916 — Pesona Tiga',            material: 'Emas 916 · 2.8g',   total: 1240,  paid: 103,  monthly: 103.33, paidMonths: 1,  totalMonths: 12, nextDate: '12 May 2026', status: 'ontrack', startDate: 'Apr 2026' },
    { id: 'IP-51884', provider: 'Shopee PayLater',invoiceNo: 'INV-BJC-24111503', outlet: 'Bukit Jambul Complex',  memberId: 'GF-2024-0015503', customer: 'Priya Devi',               phone: '+60 12-447 8830', item: 'Rantai Leher 999.9 — Heirloom',            material: 'Emas 999.9 · 22g',  total: 19500, paid: 11700,monthly: 541.67, paidMonths: 18, totalMonths: 36, nextDate: '20 May 2026', status: 'ontrack', startDate: 'Nov 2024' },
    { id: 'IP-52210', provider: 'GrabPayLater',   invoiceNo: 'INV-MSJ-25120820', outlet: 'Mydin Subang Jaya',     memberId: 'GF-2025-0038820', customer: 'Ng Soon Heng',             phone: '+60 16-880 7745', item: 'Cincin Emas 916 — Klasik',                 material: 'Emas 916 · 5.4g',   total: 2180,  paid:  907, monthly: 181.67, paidMonths: 5,  totalMonths: 12, nextDate: '25 May 2026', status: 'ontrack', startDate: 'Dec 2025' },
    { id: 'IP-52401', provider: 'Atome',          invoiceNo: 'INV-LSP-25050918', outlet: "Lotus's Sungai Petani", memberId: 'GF-2024-0009918', customer: 'Rajesh Kumar',             phone: '+60 13-227 8841', item: 'Gold Bar 100g — Investment',               material: 'Emas 999.9 · 100g', total: 38400, paid: 12800,monthly: 1066.67,paidMonths: 12, totalMonths: 36, nextDate: '20 May 2026', status: 'scheduled', startDate: 'May 2025' },
    { id: 'IP-52580', provider: 'Shopee PayLater',invoiceNo: 'INV-MBM-26041203', outlet: 'Mydin Bukit Mertajam',  memberId: 'GF-2026-0051203', customer: 'Nurul Izzati',             phone: '+60 17-558 1230', item: 'Loket Emas 916 — Pesona Tiga',             material: 'Emas 916 · 7.2g',   total: 2880,  paid:  240, monthly: 240.00, paidMonths: 1,  totalMonths: 12, nextDate: '05 Jun 2026', status: 'ontrack', startDate: 'Apr 2026' }
  ],

  // Installment provider split — combined dashboard + per-provider sub-page metrics.
  // Colours follow each provider's brand: Atome yellow, Shopee orange, Grab green.
  installmentProviders: [
    { id: 'atome',  name: 'Atome',          short: 'Atome', activePlans: 1224, avgValue: 2480, color: '#BCD800', tint:'#EAFB52', ink:'#1C1C0E', logo:'assets/atome.png',        logoText: 'atome' },
    { id: 'shopee', name: 'Shopee PayLater',short: 'Shopee',activePlans: 1140, avgValue: 3120, color: '#EE4D2D', tint:'#FDE7E0', ink:'#C2410C', logo:'assets/spaylater-logo_x602.webp',    logoText: 'SPayLater' },
    { id: 'grab',   name: 'GrabPayLater',   short: 'Grab',  activePlans: 850,  avgValue: 3650, color: '#00B14F', tint:'#DBF5E6', ink:'#00803A', logo:'assets/paylaterbyGrab_lockup_original.png', logoText: 'PayLater by Grab' }
  ],

  // Additional providers grouped under the "Others" tab (per 16 Jun client feedback).
  // Tracked via CRM entry like the three primary providers; newly onboarded, plan counts ramping.
  otherProviders: [
    { id: 'boost', name: 'Boost PayFlex', short: 'Boost', activePlans: 0, avgValue: 0, color: '#EE2737', tint:'#FDE3E6', ink:'#B4121F', logo:'assets/paylater-logo-boost.png', whiteBg:true, logoText: 'Boost' },
    { id: 'aeon',  name: 'Aeon Credit',   short: 'Aeon',  activePlans: 0, avgValue: 0, color: '#A6228E', tint:'#F7E2F2', ink:'#7A1568', logo:'assets/aeon.jpeg', whiteBg:true, logoText: 'AEON Credit' }
  ],

  // Points→voucher catalogue — a member redeems points for an in-store voucher. This is
  // REBUILT by engine.js (redemptionLadder) from VOUCHER_LADDER at a flat 100 pts = RM 1, so
  // it can never drift from the engine constant. Left empty here on purpose — engine fills it
  // before first render. RM 25 / 50 / 100 / 200 at 2,500 / 5,000 / 10,000 / 20,000 pts.
  pointsRewards: [],
  // Voucher labels standardised to "RM x OFF" (register 17 Jul). `value` = RM off (numeric);
  // `minSpend` = single-receipt minimum; `states`/`outlets` scope where it can be redeemed
  // (empty/absent = redeemable network-wide). Canonical T&C live in VOUCHER_TERMS (below).
  vouchers: [
    { id: 'V-WEL-0030', title: 'RM 30 OFF · Welcome',  value: 30, minSpend: 300, subtitle: 'First-time member sign-up gift',    tier: 'All Tiers',    expires: '6 months from join', code: 'WELCOME30',  status: 'active',   firstTime: true, terms: 'Minimum spend RM 300 in a single receipt. Valid 6 months from join. Cannot be used to offset the workmanship fee (upah). One per member. Single transaction; unused balance forfeited. Non-transferable, no cash value. Goldfinch Group Berhad reserves the right to amend the terms and conditions without prior notice.' },
    { id: 'V-WMY-1284', title: 'RM 100 OFF',          value: 100, subtitle: 'Pesona Tiga Collection',           tier: 'Silver+',      expires: '30 Jun 2026', code: 'PESONA100',     status: 'active',   memberId: 'GF-2026-0048291' },
    { id: 'V-BDY-0428a', title: 'RM 50 OFF · Birthday', value: 50, subtitle: 'Birthday reward · 1 of 3 (RM 150 total)', tier: 'Birthday', expires: '31 May 2026', code: 'AUTO-BDY-MAY-1', status: 'active', memberId: 'GF-2026-0048291', terms: 'Part of your RM 150 birthday reward (3 × RM 50 vouchers). Auto-issued on your birthday. Valid to 31 May 2026. Cannot be used to offset the workmanship fee (upah). One voucher per transaction; unused balance forfeited. Non-transferable, no cash value. Goldfinch Group Berhad reserves the right to amend the terms and conditions without prior notice.' },
    { id: 'V-BDY-0428b', title: 'RM 50 OFF · Birthday', value: 50, subtitle: 'Birthday reward · 2 of 3 (RM 150 total)', tier: 'Birthday', expires: '31 May 2026', code: 'AUTO-BDY-MAY-2', status: 'active', memberId: 'GF-2026-0048291', terms: 'Part of your RM 150 birthday reward (3 × RM 50 vouchers). Auto-issued on your birthday. Valid to 31 May 2026. Cannot be used to offset the workmanship fee (upah). One voucher per transaction; unused balance forfeited. Non-transferable, no cash value. Goldfinch Group Berhad reserves the right to amend the terms and conditions without prior notice.' },
    { id: 'V-BDY-0428c', title: 'RM 50 OFF · Birthday', value: 50, subtitle: 'Birthday reward · 3 of 3 (RM 150 total)', tier: 'Birthday', expires: '31 May 2026', code: 'AUTO-BDY-MAY-3', status: 'active', memberId: 'GF-2026-0048291', terms: 'Part of your RM 150 birthday reward (3 × RM 50 vouchers). Auto-issued on your birthday. Valid to 31 May 2026. Cannot be used to offset the workmanship fee (upah). One voucher per transaction; unused balance forfeited. Non-transferable, no cash value. Goldfinch Group Berhad reserves the right to amend the terms and conditions without prior notice.' },
    { id: 'V-MDK-7710', title: 'Early Access',        subtitle: 'Merdeka Charms · 7 days early',    tier: 'Gold',         expires: '—',           code: 'MDK-EARLY',     status: 'locked',   memberId: 'GF-2026-0048291' },
    { id: 'V-VIP-1284', title: 'VIP Preview',         subtitle: 'Warisan Malaya · 18 May',          tier: 'Silver + Gold',expires: '18 May 2026', code: 'VIP-WMY-1284',  status: 'active',   memberId: 'GF-2026-0048291' },
    { id: 'V-CNY-0218', title: 'RM 50 OFF · CNY',     value: 50,  subtitle: 'Chinese New Year promo',           tier: 'All Tiers',    expires: '10 Jun 2026', code: 'CNY50-PHC',     status: 'active' },
    { id: 'V-RAY-0428', title: 'RM 200 OFF · Hari Raya', value: 200, subtitle: 'Rantai 916+ purchases',         tier: 'Silver + Gold',expires: '15 Apr 2026', code: 'RAYA200',       status: 'expired', states: ['Selangor','Kuala Lumpur','Penang'] },
    { id: 'V-WIN-0901', title: 'RM 100 OFF · Win-back', value: 100, subtitle: 'Gold tier-maintenance offer',    tier: 'All Tiers',    expires: '31 Jul 2026', code: 'WINBACK100',    status: 'active', winback: true },
    { id: 'V-RYA-0815', title: 'RM 50 OFF · Hari Raya', value: 50, subtitle: 'Aidiladha gift purchase',        tier: 'All Tiers',    expires: '15 Jun 2026', code: 'RAYA50-HJ',     status: 'active',  outlets: ['MBM','ABG'] },
    { id: 'V-USE-2201', title: 'RM 50 OFF · CNY',      value: 50,  subtitle: 'Redeemed on Cincin Emas 916',      tier: 'All Tiers',    expires: '31 Mar 2026', code: 'CNY50-2025',    status: 'used', usedOn: '22 Mar 2026', memberId: 'GF-2026-0048291' },
    { id: 'V-USE-1130', title: 'RM 100 OFF',           value: 100, subtitle: 'Warisan Malaya purchase',          tier: 'Silver + Gold',expires: '30 Nov 2025', code: 'WM100-2025',    status: 'used', usedOn: '14 Nov 2025', memberId: 'GF-2026-0048291' },
    { id: 'V-USE-0902', title: 'RM 50 OFF · Birthday',  value: 50, subtitle: 'Birthday reward · redeemed',        tier: 'Birthday',     expires: '30 Apr 2025', code: 'BDY-2025',      status: 'used', usedOn: '28 Apr 2025', memberId: 'GF-2026-0048291' },
    { id: 'V-EXP-0714', title: 'RM 30 OFF',            value: 30,  subtitle: 'Merdeka Charms · lapsed',          tier: 'All Tiers',    expires: '31 Aug 2025', code: 'MDK30-2025',    status: 'expired', memberId: 'GF-2026-0048291' }
  ],
  // Canonical voucher redemption T&C (CRM Pending Matters 3.7). One source; every voucher
  // without its own bespoke terms shows these.
  voucherTerms: [
    'Cannot be used to offset the workmanship fee (upah).',
    'Must be used in a single transaction.',
    'Any unused balance is forfeited.',
    'Cannot be exchanged for cash.',
    'Valid for 6 months from the date of issue.',
    'Non-transferable.',
    'Goldfinch Group Berhad reserves the right to amend the terms and conditions without prior notice.'
  ],

  activity: [
    { type: 'earn',   label: 'Purchase reward',             date: '14 Apr 2026',  points: 1250, meta: 'Mydin Bukit Mertajam' },
    { type: 'redeem', label: 'Points redeemed · RM 50 voucher', date: '22 Mar 2026',  points: -5000, meta: 'RM 50 OFF · CNY' },
    { type: 'earn',   label: 'Purchase reward',             date: '08 Feb 2026',  points: 920,  meta: 'AEON BiG Wangsa Maju' }
  ],

  // §5.3 — delivery rate (not open/read rate) + single-tick count (likely wrong number).
  campaigns: [
    { name: 'Warisan Malaya — VIP Preview',   sent: '04 May 2026', channel: 'WhatsApp + SMS', audience: 'Silver + Gold',   recipients: 3128, delivered: 98, deliveredSingleTick: 41,  redeem: 18, status: 'sent' },
    { name: 'Pesona Tiga Launch',             sent: '22 Apr 2026', channel: 'WhatsApp',       audience: 'All Tiers',       recipients: 12847,delivered: 97, deliveredSingleTick: 214, redeem: 12, status: 'sent' },
    { name: 'Merdeka Charms Early Access',    sent: '12 Apr 2026', channel: 'WhatsApp',       audience: 'Gold',            recipients: 900,  delivered: 99, deliveredSingleTick: 9,   redeem: 22, status: 'sent' },
    { name: 'Birthday Auto · April',          sent: '01 Apr 2026', channel: 'WhatsApp + SMS', audience: 'Auto · DOB',      recipients: 412,  delivered: 99, deliveredSingleTick: 4,   redeem: 24, status: 'sent' },
    { name: 'Installment due reminders · Auto', sent: 'Continuous', channel: 'WhatsApp + SMS', audience: 'Active installments', recipients: 3214, delivered: 96, deliveredSingleTick: 63, redeem: 8, status: 'auto' },
    { name: 'Win-back · at-risk',         sent: '18 Mar 2026', channel: 'WhatsApp',       audience: 'At-risk',         recipients: 1240, delivered: 94, deliveredSingleTick: 71,  redeem: 6,  status: 'sent' }
  ],

  growthByMonth: [
    { m: 'May 25', v: 4210 },
    { m: 'Jun',    v: 4980 },
    { m: 'Jul',    v: 5640 },
    { m: 'Aug',    v: 6310 },
    { m: 'Sep',    v: 7280 },
    { m: 'Oct',    v: 8120 },
    { m: 'Nov',    v: 8970 },
    { m: 'Dec',    v: 9820 },
    { m: 'Jan 26', v: 10650 },
    { m: 'Feb',    v: 11420 },
    { m: 'Mar',    v: 12180 },
    { m: 'Apr',    v: 12847 }
  ],

  // Chart palette: most series in navy/grey, ONE highlight in brand gold (the leader)
  topCategories: [
    { name: 'Cincin',    value: 2100000, color: '#F2C21A' },  // winner — the single gold highlight
    { name: 'Rantai',    value: 1500000, color: '#022135' },
    { name: 'Subang',    value: 1200000, color: '#0C3A54' },
    { name: 'Loket',     value: 820000,  color: '#7E97AA' },
    { name: 'Gold Bar',  value: 700000,  color: '#C3D0DA' }
  ],

  // 4-tier ladder (Entry → Bronze → Silver → Gold). Thresholds CONFIRMED · CRM Pending Matters 3.7.
  // Points are earned by gold grade (999/916/others), NOT by tier — 'maintain' is the
  // 12-month maintenance spend; 'convert' is the uniform 100 pts = RM 1 redemption rate.
  // Donut/chart colours: navy-grey scale + Gold as the single brand-gold highlight.
  tiers: {
    entry:  { name: 'Entry',  threshold: 1000,  count: 4210, maintain: '—',         convert: '100 pts = RM 1', color: '#C3D0DA' },
    bronze: { name: 'Bronze', threshold: 2500,  count: 5640, maintain: 'RM 300/yr',  convert: '100 pts = RM 1', color: '#0C3A54' },
    silver: { name: 'Silver', threshold: 7000,  count: 2097, maintain: 'RM 600/yr',  convert: '100 pts = RM 1', color: '#7E97AA' },
    gold:   { name: 'Gold',   threshold: 15000, count: 900,  maintain: 'RM 1,000/yr',convert: '100 pts = RM 1', color: '#F2C21A' }
  },

  // Sales data is uploaded manually (POS is not integrated)
  salesUploads: {
    lastRefresh: '01 May 2026, 14:22',
    lastBy: 'Nadia Aziz',
    coveragePeriod: 'Apr 2026 · 67 outlets',
    history: [
      { period: 'Apr 2026', uploaded: '01 May 2026', by: 'Nadia Aziz',   rows: 8420, status: 'processed' },
      { period: 'Mar 2026', uploaded: '02 Apr 2026', by: 'Nadia Aziz',   rows: 8118, status: 'processed' },
      { period: 'Feb 2026', uploaded: '04 Mar 2026', by: 'Hafiz Rahman', rows: 7240, status: 'processed' },
      { period: 'Jan 2026', uploaded: '03 Feb 2026', by: 'Nadia Aziz',   rows: 6928, status: 'processed' },
      { period: 'Dec 2025', uploaded: '02 Jan 2026', by: 'Nadia Aziz',   rows: 9180, status: 'processed' }
    ]
  },

  // Apr 2026 snapshot (latest uploaded month — values reflect uploaded data, not live)
  todaySales: {
    revenue: 84620,
    transactions: 43,
    units: 51,
    avgTicket: 1968,
    vsYesterday: 12.4,
    vsForecast: 6.2,
    // Payment mix (must sum to revenue). BNPL line covers the 3 providers: Atome · Shopee PayLater · GrabPayLater.
    paymentMix: [
      { method: 'Credit Card',           amount: 22480, count: 11 },
      { method: 'Cash',                  amount: 19810, count: 14 },
      { method: 'BNPL · Atome/Shopee/Grab', amount: 26390, count:  9 },
      { method: 'Debit Card',            amount: 15940, count:  9 }
    ]
  },

  // Per-outlet performance today
  outletPerformance: [
    { outlet: 'KLCC',       revenue: 18420, txn: 9, target: 16000, top: 'Cincin 916' },
    { outlet: 'Gurney',     revenue: 15640, txn: 8, target: 14000, top: 'Rantai 916' },
    { outlet: 'Midvalley',  revenue: 13280, txn: 7, target: 12000, top: 'Subang 916' },
    { outlet: 'Queensbay',  revenue: 11420, txn: 6, target: 11000, top: 'Loket 916' },
    { outlet: 'JB City Sq', revenue:  9820, txn: 5, target: 10000, top: 'Cincin 999.9' },
    { outlet: 'Ipoh',       revenue:  6740, txn: 3, target:  8000, top: 'Cincin 916' },
    { outlet: 'Melaka',     revenue:  5480, txn: 3, target:  8000, top: 'Rantai 916' },
    { outlet: 'Kuantan',    revenue:  3820, txn: 2, target:  6000, top: 'Subang 999.9' }
  ],

  // Top SKUs sold today
  topSKUsToday: [
    { sku: 'CN-916-PT-042', name: 'Cincin Pesona Tiga',       material: 'Emas 916', weight: '6.2g',  sold: 4, revenue:  9920 },
    { sku: 'RN-999-WM-118', name: 'Rantai Warisan Malaya',    material: 'Emas 999.9', weight: '14.8g', sold: 2, revenue: 12800 },
    { sku: 'SB-916-MC-007', name: 'Subang Merdeka Charms',    material: 'Emas 916', weight: '4.1g',  sold: 5, revenue:  9200 },
    { sku: 'LK-916-PT-031', name: 'Loket Pesona Tiga',        material: 'Emas 916', weight: '8.5g',  sold: 3, revenue: 10260 },
    { sku: 'CN-916-BT-019', name: 'Cincin Bunga Tanjung',     material: 'Emas 916', weight: '3.2g',  sold: 6, revenue:  5880 },
    { sku: 'GB-999-50-002', name: 'Gold Bar 50g',             material: 'Emas 999.9', weight: '50.0g', sold: 1, revenue: 18400 }
  ],

  // Stock alerts (low / out)
  stockAlerts: [
    { sku: 'CN-916-PT-042', name: 'Cincin Pesona Tiga',    outlet: 'KLCC',      onHand: 2,  min: 5, status: 'low' },
    { sku: 'RN-999-WM-118', name: 'Rantai Warisan Malaya', outlet: 'Gurney',    onHand: 0,  min: 3, status: 'out' },
    { sku: 'SB-916-MC-007', name: 'Subang Merdeka',        outlet: 'Midvalley', onHand: 3,  min: 6, status: 'low' },
    { sku: 'GB-999-50-002', name: 'Gold Bar 50g',          outlet: 'KLCC',      onHand: 1,  min: 4, status: 'low' }
  ],

  // Service jobs (repair / resize / engraving / cleaning)
  serviceJobs: [
    { id: 'SVC-2284', customer: 'Lim Mei Ling',   memberId: 'GF-2026-0014622', item: 'Cincin Emas 916 — Pesona Tiga',  type: 'Resize',    received: '12 May', dueBy: '17 May', outlet: 'Queensbay', status: 'in-progress' },
    { id: 'SVC-2285', customer: 'Rajesh Kumar',   memberId: 'GF-2024-0009918', item: 'Rantai Emas 999.9 — Custom',     type: 'Repair',    received: '13 May', dueBy: '20 May', outlet: 'KLCC',      status: 'in-progress' },
    { id: 'SVC-2286', customer: 'Siti Aminah',    memberId: 'GF-2025-0033817', item: 'Loket Emas 916 — Heirloom',      type: 'Engraving', received: '14 May', dueBy: '16 May', outlet: 'KLCC',      status: 'awaiting' },
    { id: 'SVC-2287', customer: 'Tan Wei Ming',   memberId: 'GF-2026-0048291', item: 'Cincin Emas 916 — Pesona Tiga',  type: 'Cleaning',  received: '15 May', dueBy: '15 May', outlet: 'Gurney',    status: 'ready' },
    { id: 'SVC-2288', customer: 'Devi Sundram',   memberId: 'GF-2025-0041230', item: 'Subang Emas 916 — Klasik',       type: 'Repair',    received: '11 May', dueBy: '14 May', outlet: 'Midvalley', status: 'late' }
  ],

  // Trade-in / buy-back transactions
  tradeIn: {
    todayCount: 6,
    todayWeightG: 84.5,
    todayPayout: 32180,
    avgPremium: 3.2,
    recent: [
      { id: 'TI-0142', customer: 'Yusoff bin Mohd',    weight: 11.8, karat: '916',   payout: 4600, outlet: 'Kuantan',   when: '11:20' },
      { id: 'TI-0143', customer: 'Priya Devi',         weight: 22.4, karat: '999.9', payout: 9530, outlet: 'Midvalley', when: '10:48' },
      { id: 'TI-0144', customer: 'Ng Soon Heng',       weight:  8.1, karat: '916',   payout: 3160, outlet: 'Queensbay', when: '09:55' }
    ]
  },

  // Team / staff for Settings
  team: [
    { name: 'Nadia Aziz',        role: 'HQ Admin',      email: 'nadia.a@goldfinch.my',    outlet: 'HQ · Menara Skymind, Penang', twoFA: true,  lastActive: '5 min ago' },
    { name: 'Hafiz Rahman',      role: 'Store Manager', email: 'hafiz.r@goldfinch.my',    outlet: 'Mydin Bukit Mertajam',         twoFA: true,  lastActive: '1 hr ago' },
    { name: 'Wong Pei Shan',     role: 'Store Manager', email: 'peishan.w@goldfinch.my',  outlet: 'AEON BiG Wangsa Maju',         twoFA: true,  lastActive: '20 min ago' },
    { name: 'Ravi Subramaniam',  role: 'Store Manager', email: 'ravi.s@goldfinch.my',     outlet: 'Mydin Subang Jaya',            twoFA: false, lastActive: '2 days ago' },
    { name: 'Adlina Yusof',      role: 'Cashier',       email: 'adlina.y@goldfinch.my',   outlet: "Lotus's Sungai Petani",        twoFA: false, lastActive: 'just now' },
    { name: 'Tan Boon Lee',      role: 'Cashier',       email: 'boonlee.t@goldfinch.my',  outlet: 'Giant Tampoi JB',              twoFA: true,  lastActive: '3 hr ago' },
    { name: 'Aisyah Mokhtar',    role: 'Cashier',       email: 'aisyah.m@goldfinch.my',   outlet: 'Kuala Ketil (founding)',       twoFA: true,  lastActive: '12 min ago' },
    { name: 'Chong Mei Yee',     role: 'Cashier',       email: 'meiyee.c@goldfinch.my',   outlet: 'Bukit Jambul Complex',         twoFA: true,  lastActive: '45 min ago' }
  ],

  // CRM segments — tier-based only per contract item 7 (advanced segmentation requires CR)
  segments: [
    { id: 'gold',     name: 'Gold tier',                size:  900, growth: '+12',  rule: 'tier = Gold',                color: '#F2C21A' },
    { id: 'silver',   name: 'Silver tier',              size: 2097, growth: '+48',  rule: 'tier = Silver',              color: '#7E97AA' },
    { id: 'bronze',   name: 'Bronze tier',              size: 5640, growth: '+248', rule: 'tier = Bronze',              color: '#0C3A54' },
    { id: 'entry',    name: 'Entry tier',               size: 4210, growth: '+512', rule: 'tier = Entry',               color: '#C3D0DA' },
    { id: 'birthday', name: 'Birthday this month',      size:  412, growth: '—',    rule: 'DOB month = current',        color: '#F59E0B' },
    { id: 'activeIP', name: 'Active installments',      size: 3214, growth: '+12',  rule: 'has open installment plan',  color: '#EC4899' },
    { id: 'dormant180', name: 'At-risk · 180 days',     size:  618, growth: '+62',  rule: 'no purchase in 180 days',    color: '#6B7280' }
  ],

  // CRM tasks / follow-ups assigned to staff
  tasks: [
    { id: 'TK-2031', due: 'Today',     priority: 'high',   assignee: 'Hafiz Rahman',  customer: 'Siti Aminah binti Hassan', memberId: 'GF-2025-0033817', action: 'Call back · Warisan Malaya catalogue enquiry', context: 'Visited Mydin Bukit Mertajam 13 May' },
    { id: 'TK-2034', due: 'Tomorrow',  priority: 'medium', assignee: 'Hafiz Rahman',  customer: 'Tan Wei Ming',             memberId: 'GF-2026-0048291', action: 'Tier upgrade nudge · 1,550 pts to Gold',  context: 'On track · last purchase 13 May' },
    { id: 'TK-2035', due: '17 May',    priority: 'low',    assignee: 'Wong Pei Shan', customer: 'Lim Mei Ling',             memberId: 'GF-2026-0014622', action: 'Win-back outreach · dormant 90d',          context: 'Last purchase 14 Feb · Pesona Tiga buyer' },
    { id: 'TK-2036', due: '18 May',    priority: 'low',    assignee: 'Ravi Subramaniam', customer: 'Aiman Hakim',           memberId: 'GF-2026-0029104', action: 'Payment schedule courtesy reminder · IP-29104', context: 'Final month approaching · reminder is a courtesy, not a debt to Goldfinch' }
  ],

  // Customer-level interactions (CRM timeline) — keyed by memberId
  interactions: {
    'GF-2026-0048291': [
      { when: '08 May, 09:15', channel: 'WhatsApp',  staff: 'Auto',          type: 'campaign', note: 'Mother\'s Day promo · message delivered + read.' },
      { when: '28 Apr, 10:00', channel: 'WhatsApp',  staff: 'Auto',          type: 'system',   note: 'Birthday reward · RM 150 in vouchers issued (3 × RM 50).' },
      { when: '14 Apr, 11:28', channel: 'in-store',  staff: 'Hafiz Rahman',  type: 'purchase', note: 'Loket Pesona Tiga · RM 1,250 · paid CC.' },
      { when: '22 Mar, 13:18', channel: 'in-store',  staff: 'Hafiz Rahman',  type: 'redeem',   note: 'Voucher CNY50-2025 redeemed · RM 50 off.' }
    ],
    'GF-2025-0033817': [
      { when: '10 May, 11:42', channel: 'WhatsApp',  staff: 'Wong Pei Shan', type: 'message',  note: 'Sent VIP preview invitation · replied: interested.' },
      { when: '02 May, 09:30', channel: 'in-store',  staff: 'Wong Pei Shan', type: 'purchase', note: 'Rantai Leher 999.9 deposit · installment plan IP-33817.' }
    ]
  },

  // Audit log
  auditLog: [
    { when: '15 May, 09:42', who: 'Nadia Aziz',    action: 'Uploaded sales data · Apr 2026 (8,420 rows)',  ip: '203.82.•.•' },
    { when: '15 May, 09:15', who: 'Hafiz Rahman',  action: 'Issued voucher VIP-WMY-1284 to GF-2026-0048291', ip: '60.51.•.•' },
    { when: '15 May, 08:58', who: 'Wong Pei Shan', action: 'Mark installment plan IP-33817 as paid (month 16)', ip: '202.188.•.•' },
    { when: '14 May, 17:30', who: 'System',        action: 'Birthday auto-broadcast sent · 412 recipients',  ip: '—' },
    { when: '14 May, 16:12', who: 'Nadia Aziz',    action: 'Approved broadcast "Mother\'s Day Promo"',        ip: '203.82.•.•' }
  ],

  // Loyalty earning rules
  // Earn rules — points accrue by gold grade (999 / 916 / others), same rate for every tier
  // Points accrual by gold grade · CONFIRMED CRM Pending Matters 3.7. Earned on total bill incl. workmanship.
  earnRules: [
    { name: 'Purchase · 999 Pure Gold', basis: 'RM 10 spent',        points: 1,   note: 'RM 1,000 purchase = 100 points' },
    { name: 'Purchase · 916 Gold',      basis: 'RM 5 spent',         points: 1,   note: 'RM 1,000 purchase = 200 points' },
    { name: 'Purchase · Others',        basis: 'RM 2 spent',         points: 1,   note: '875 / 750 etc · RM 1,000 = 500 points' },
    { name: 'Welcome reward',           basis: 'on sign-up',         points: 1000,note: '+ RM 30 voucher · valid 6 months' },
    { name: 'Birthday reward',          basis: 'one-time / year',    points: '—', note: '3 × RM 50 vouchers (RM 150) · auto-issued on DOB' },
    { name: 'Successful referral',      basis: 'RM 2 / g referred',  points: '—', note: 'No cap · paid after friend’s first qualifying purchase · voucher valid 3 months' }
  ],

  // WhatsApp broadcast templates — Goldfinch broadcasts ONLY from these approved templates.
  // Each {{n}} is a per-recipient variable; editors fill the numbered slots and the preview updates live.
  broadcastTemplates: [
    { id:'installment', name:'Installment Reminder', icon:'bell', category:'Transactional', sid:'HX1a2b3c4d…',
      body:'Hi {{1}}, this is a reminder from Goldfinch Jewelry.\nYour {{2}} instalment payment of RM{{3}} is due on {{4}} (in 3 days).\nPayment plan: {{5}} months via {{6}}\nFor assistance, please contact your nearest Goldfinch outlet.',
      vars:[{n:1,label:'Customer name',sample:'Wei Ming'},{n:2,label:'Item',sample:'Cincin Pesona Tiga'},{n:3,label:'Amount due',sample:'208.33'},{n:4,label:'Due date',sample:'15 May 2026'},{n:5,label:'Plan length (months)',sample:'12'},{n:6,label:'Provider',sample:'Atome'}] },
    { id:'points-earned', name:'Points Earned', icon:'coin', category:'Transactional', sid:'HX2b3c4d5e…',
      body:'Hi {{1}}, you earned {{2}} points from your recent purchase at Goldfinch Jewelry!\nTotal points balance: {{3}}\nCurrent tier: {{4}}\nVisit us again soon.',
      vars:[{n:1,label:'Customer name',sample:'Wei Ming'},{n:2,label:'Points earned',sample:'1,250'},{n:3,label:'Total balance',sample:'12,480'},{n:4,label:'Current tier',sample:'Gold'}] },
    { id:'welcome', name:'Membership Welcome', icon:'sparkles', category:'Lifecycle', sid:'HX3c4d5e6f…',
      body:'Welcome to Goldfinch Jewelry, {{1}}!\nYour membership has been activated.\nMembership tier: {{2}}\nPoints balance: 0\nYou earn 1 point for every RM1 spent. Accumulate {{3}} points to reach {{4}} tier.\nYour digital membership card: {{5}}',
      vars:[{n:1,label:'Customer name',sample:'Wei Ming'},{n:2,label:'Tier',sample:'Entry'},{n:3,label:'Points to next',sample:'1,000'},{n:4,label:'Next tier',sample:'Bronze'},{n:5,label:'Card link',sample:'gold.fin/card/48291'}] },
    { id:'birthday', name:'Birthday Reward', icon:'cake', category:'Lifecycle', sid:'HX4d5e6f7g…',
      body:"Happy Birthday, {{1}}! 🎂\nGoldfinch Jewelry is celebrating with you — enjoy {{2}} in birthday vouchers this month (3 × RM 50), our gift for your special day.\nFind them in your Goldfinch Member Portal wallet.",
      vars:[{n:1,label:'Customer name',sample:'Wei Ming'},{n:2,label:'Voucher value',sample:'RM 150'}] },
    { id:'tier-upgrade', name:'Tier Upgrade', icon:'star', category:'Lifecycle', sid:'HX5e6f7g8h…',
      body:"Congratulations {{1}}!\nYou've been upgraded to {{2}} tier at Goldfinch Jewelry!\nYour new benefits:\n• Exclusive {{2}} member promotions & early access\n• {{3}} birthday & tier rewards\nYour current points balance: {{4}}\nThank you for your loyalty.",
      vars:[{n:1,label:'Customer name',sample:'Wei Ming'},{n:2,label:'New tier',sample:'Gold'},{n:3,label:'Perk',sample:'Premium'},{n:4,label:'Points balance',sample:'12,480'}] },
    { id:'winback', name:'Win-Back', icon:'refresh', category:'Re-engagement', sid:'HX6f7g8h9i…',
      body:"Hi {{1}}, we miss you at Goldfinch Jewelry!\nIt's been a while since your last visit. Here's something to welcome you back:\n{{2}} off your next purchase\nOffer valid until: {{3}}\nCome visit us at any Goldfinch outlet. We'd love to see you again.",
      vars:[{n:1,label:'Customer name',sample:'Wei Ming'},{n:2,label:'Offer',sample:'RM 100'},{n:3,label:'Valid until',sample:'31 Jul 2026'}] },
    { id:'points-balance', name:'Points Balance', icon:'coin', category:'Re-engagement', sid:'HX7g8h9i0j…',
      body:'Hi {{1}}, just a reminder that you have {{2}} points sitting in your Goldfinch Jewelry account.\nThat\'s worth approximately RM{{3}} in rewards.\nDon\'t let them expire — visit any Goldfinch outlet to redeem.\nYour tier: {{4}} | Next tier: {{5}} points away',
      vars:[{n:1,label:'Customer name',sample:'Wei Ming'},{n:2,label:'Points',sample:'12,480'},{n:3,label:'RM value',sample:'124'},{n:4,label:'Tier',sample:'Gold'},{n:5,label:'Points to next',sample:'0'}] },
    { id:'promo', name:'General Promo', icon:'bullhorn', category:'Marketing', sid:'HX8h9i0j1k…',
      body:'Hi {{1}},\n{{2}}\nValid: {{3}} to {{4}}\nOutlets: {{5}}\n*Terms and conditions apply. While stocks last.\nReply STOP to unsubscribe.',
      vars:[{n:1,label:'Customer name',sample:'Wei Ming'},{n:2,label:'Promo message',sample:'Enjoy 20% off all 916 gold rings this Raya.'},{n:3,label:'Valid from',sample:'01 Jun 2026'},{n:4,label:'Valid to',sample:'30 Jun 2026'},{n:5,label:'Outlets',sample:'All outlets'}] }
  ],

  // Per-member purchase history (Member Detail "Purchase History" bento + portal).
  // Curated for the primary demo member; other members are synthesised in the CRM from spend.
  purchaseHistory: {
    'GF-2026-0048291': [
      { date: '12 May 2026', item: 'Cincin Emas 916 — Pesona Tiga',   category: 'Cincin',   grade: '916',   grams: 6.2,  invoice: 'INV-MBM-26051284', amount: 2500,  outlet: 'Mydin Bukit Mertajam', payment: 'Atome' },
      { date: '14 Apr 2026', item: 'Loket Emas 916 — Pesona Tiga',    category: 'Loket',    grade: '916',   grams: 3.6,  invoice: 'INV-MBM-26041250', amount: 1250,  outlet: 'Mydin Bukit Mertajam', payment: 'Credit Card' },
      { date: '08 Feb 2026', item: 'Subang Emas 916 — Klasik',        category: 'Subang',   grade: '916',   grams: 2.1,  invoice: 'INV-MBM-26020920', amount: 920,   outlet: 'AEON BiG Wangsa Maju', payment: 'Debit Card' },
      { date: '22 Dec 2025', item: 'Rantai Emas 916 — Klasik',        category: 'Rantai',   grade: '916',   grams: 8.4,  invoice: 'INV-MBM-25123180', amount: 3180,  outlet: 'Mydin Bukit Mertajam', payment: 'Cash' },
      { date: '30 Oct 2025', item: 'Gold Bar 5g — Investment',        category: 'Gold Bar', grade: '999.9', grams: 5.0,  invoice: 'INV-MBM-25101842', amount: 1842,  outlet: 'Mydin Bukit Mertajam', payment: 'Credit Card' },
      { date: '18 Aug 2025', item: 'Cincin Emas 916 — Bunga Tanjung', category: 'Cincin',   grade: '916',   grams: 4.8,  invoice: 'INV-MBM-25081640', amount: 1640,  outlet: 'Mydin Bukit Mertajam', payment: 'Debit Card' },
      { date: '14 Jun 2025', item: 'Loket Emas 916 — Klasik',         category: 'Loket',    grade: '916',   grams: 3.2,  invoice: 'INV-MBM-25061120', amount: 1120,  outlet: 'Mydin Bukit Mertajam', payment: 'Cash' },
      { date: '02 May 2025', item: 'Subang Emas 916 — Pesona Tiga',   category: 'Subang',   grade: '916',   grams: 2.6,  invoice: 'INV-MBM-25050980', amount: 980,   outlet: 'Mydin Bukit Mertajam', payment: 'Atome' },
      { date: '11 Mar 2025', item: 'Gold Bar 10g — Investment',       category: 'Gold Bar', grade: '999.9', grams: 3.2,  invoice: 'INV-MBM-25031180', amount: 1180,  outlet: 'AEON BiG Wangsa Maju', payment: 'Credit Card' },
      { date: '26 Dec 2024', item: 'Cincin Emas 916 — Klasik',        category: 'Cincin',   grade: '916',   grams: 5.1,  invoice: 'INV-MBM-24122080', amount: 2080,  outlet: 'Mydin Bukit Mertajam', payment: 'Cash' },
      { date: '14 Sep 2024', item: 'Rantai Emas 916 — Heirloom',      category: 'Rantai',   grade: '916',   grams: 6.8,  invoice: 'INV-MBM-24092640', amount: 2640,  outlet: 'Mydin Bukit Mertajam', payment: 'Debit Card' },
      { date: '12 Mar 2024', item: 'Cincin Emas 916 — Pesona Tiga',   category: 'Cincin',   grade: '916',   grams: 3.4,  invoice: 'INV-MBM-24031480', amount: 1480,  outlet: 'Mydin Bukit Mertajam', payment: 'Credit Card' }
    ]
  },

  // The "logged in" member for portal demos
  me: {
    id: 'GF-2026-0048291',
    name: 'Tan Wei Ming',
    firstName: 'Wei Ming',
    ic: '880428-07-5531',
    phone: '+60 12-345 6789',
    email: 'weiming.t@gmail.com',
    tier: 'gold',
    // Two pools (client 22 Jul): redeemable is spendable + drops on redemption; status/qualifying is
    // sticky and keeps the tier. Wei Ming has redeemed some — redeemable (8,420) sits BELOW the Gold
    // threshold, but status (16,240 ≥ 15,000) + annual spend keep him Gold. Demonstrates the rule.
    points: 8420,          // redeemable (spendable) — alias; canonical pool fields set below
    nextTier: null,        // Gold is the top tier
    pointsToNext: 0,
    topTier: true,
    pointsThisYear: 16240,
    goldThreshold: 15000,
    dob: '28 Apr',
    birthdayToday: true,   // demo flag: show the birthday greeting state on the portal home
    purchases: 12,
    grams999: 8.2,
    grams916: 42.6,
    // Referral programme — RM 2/g per referral, no cap; paid after friend's first qualifying purchase; voucher valid 3 months.
    // Earned/pending are DERIVED from the referrals[] records (engine.referralTotals) — no stored summary figure.
    referralCode: 'WEIMING-GF26',
    // --- SPEC §1.4 / §2.1: two projections, tier stickiness, dormancy, opt-in ---
    pointsBalance:     8420,   // REDEEMABLE — decremented by redemption; sits BELOW the Gold threshold
    qualifyingPoints:  16240,  // STATUS — never decremented by redemption; ≥ 15,000 keeps Gold
    tierAchievedOn:    '2025-11-02',
    tierExpiresOn:     '2026-11-02',
    lastTransactionOn: '2026-04-18',
    dormant:           false,
    archived:          false,
    optIn: {
      marketing:  { whatsapp: true,  sms: true  },
      reminders:  { whatsapp: true,  sms: false },
      consentLog: [ { channel:'reminders.sms', value:false, ts:'2026-05-02T09:12:00+08:00', source:'member-portal' } ]
    }
  },

  // Referral records (CRM management view). status: pending (signed up) → qualified (first purchase made) → rewarded
  referrals: [
    { id:'RF-2048', referrer:'Tan Wei Ming',      referrerId:'GF-2026-0048291', referee:'Lim Chee Kong',   phone:'+60 12-663 4471', date:'02 May 2026', status:'rewarded',  grams:24, reward:48, voucherExpiry:'02 Aug 2026' },
    { id:'RF-2041', referrer:'Tan Wei Ming',      referrerId:'GF-2026-0048291', referee:'Sarah Abdullah',  phone:'+60 19-220 8841', date:'21 Apr 2026', status:'rewarded',  grams:18, reward:36, voucherExpiry:'21 Jul 2026' },
    { id:'RF-2033', referrer:'Tan Wei Ming',      referrerId:'GF-2026-0048291', referee:'Kavitha Raman',   phone:'+60 16-771 2093', date:'14 Apr 2026', status:'rewarded',  grams:32, reward:64, voucherExpiry:'14 Jul 2026' },
    { id:'RF-2052', referrer:'Tan Wei Ming',      referrerId:'GF-2026-0048291', referee:'Ahmad Firdaus',   phone:'+60 13-908 5521', date:'08 May 2026', status:'qualified', grams:15, reward:30, voucherExpiry:'—' },
    { id:'RF-2053', referrer:'Tan Wei Ming',      referrerId:'GF-2026-0048291', referee:'Hooi Xin Yi',     phone:'+60 11-2098 4417', date:'12 May 2026', status:'pending',   grams:0,  reward:0,  voucherExpiry:'—' },
    { id:'RF-2050', referrer:'Siti Aminah',       referrerId:'GF-2025-0033817', referee:'Nurhaliza Yusof', phone:'+60 17-334 1180', date:'05 May 2026', status:'qualified', grams:15, reward:30, voucherExpiry:'—' },
    { id:'RF-2044', referrer:'Rajesh Kumar',      referrerId:'GF-2024-0009918', referee:'Anand Pillai',    phone:'+60 12-556 7789', date:'28 Apr 2026', status:'rewarded',  grams:50, reward:100,voucherExpiry:'28 Jul 2026' },
    { id:'RF-2039', referrer:'Devi Sundram',      referrerId:'GF-2025-0041230', referee:'Meena Krishnan',  phone:'+60 19-887 3320', date:'19 Apr 2026', status:'pending',   grams:0,  reward:0,  voucherExpiry:'—' },
    { id:'RF-2031', referrer:'Chong Kah Wai',     referrerId:'GF-2025-0028841', referee:'Wong Li Fang',    phone:'+60 16-220 9931', date:'11 Apr 2026', status:'rewarded',  grams:12, reward:24, voucherExpiry:'11 Jul 2026' },
    { id:'RF-2028', referrer:'Priya Devi',        referrerId:'GF-2024-0015503', referee:'Suresh Nair',     phone:'+60 12-447 1102', date:'06 Apr 2026', status:'qualified', grams:22, reward:44, voucherExpiry:'—' },
    { id:'RF-2019', referrer:'Ng Soon Heng',      referrerId:'GF-2025-0038820', referee:'Tan Bee Hoon',    phone:'+60 13-771 4420', date:'29 Mar 2026', status:'rewarded',  grams:8,  reward:16, voucherExpiry:'29 Jun 2026' },
    // High-value referral (> RM200) → sits in the HQ approval queue (approval:'pending'), 3–5 working days.
    { id:'RF-2056', referrer:'Rajesh Kumar',      referrerId:'GF-2024-0009918', referee:'Vikram Menon',    phone:'+60 12-908 6612', date:'11 May 2026', status:'qualified', grams:130, reward:260, approval:'pending', voucherExpiry:'—' }
  ],
  // Referral programme config — one source for every referral figure/rule (CRM Pending Matters 3.7
  // + 16 Jul walkthrough). Reward is held as a VOUCHER (no cash withdrawal yet). Rewards ≤ the
  // auto-approve limit credit instantly; above it they wait on HQ approval. Per-product rates now
  // CONFIRMED via the client Rebate Table (18 Jul) → referralRebateTable below.
  referralProgram: {
    ratePerGram: 2,              // RM per gram — 916 jewellery, confirmed. No cap.
    productRatesConfirmed: true, // gold bar / silver bar / special rates set — see referralRebateTable
    noCap: true,
    voucherValidityMonths: 3,
    heldAsVoucher: true,         // reward issued as a voucher; cash-out is a future phase
    cashOutEnabled: false,
    autoApproveLimit: 200,       // ≤ RM200 instant credit; > RM200 → HQ approval
    approvalDaysText: '3–5 working days'
  },
  // Referral REBATE rate card (client Rebate Table, 18 Jul). 916 jewellery pays per gram; bars &
  // special items pay a FLAT rebate for the weight referred. ❋ = periodically reviewed rate.
  referralRebateTable: {
    note: '916 jewellery is paid per gram. Gold bars, silver bars and special items earn the flat rebate for the weight referred. ❋ rates are reviewed periodically.',
    groups: [
      { type: '福利 / Flash / Special',            rows: [ { weight: 'Any weight', rate: 15 } ] },
      { type: 'Pre-Order / Limited / Special',     rows: [ { weight: '0.5g & 1g', rate: 20 }, { weight: '5g & 10g', rate: 30 }, { weight: '1oz', rate: 50 } ] },
      { type: 'Pre-Order Silver Bar',              rows: [ { weight: '1kg', rate: 100 }, { weight: '1oz', rate: 20, star: true } ] },
      { type: '916 Jewellery',       perGram: 2,   rows: [ { weight: 'per gram', rate: 2, perGram: true } ] },
      { type: 'Daily Goldbar', sub: 'Pamp Fortuna & The Perth Mint', rows: [ { weight: '1g', rate: 15, star: true }, { weight: '2g', rate: 20 }, { weight: '5g', rate: 20 }, { weight: '10g', rate: 30 }, { weight: '20g', rate: 50, star: true }, { weight: '50g', rate: 80, star: true }, { weight: '100g', rate: 100, star: true } ] },
      { type: 'Daily Castbar',                     rows: [ { weight: '50g', rate: 80, star: true }, { weight: '100g', rate: 100 } ] }
    ]
  }
};

/* ------------------------------------------------------------------
   Expand demo data to full scale (deterministic — stable across loads):
   • 67-outlet network (matches outletNetwork.byChannel 38/15/14)
   • design-code catalogue for the Reports search + pagination
   • extra members so lists/filters feel populated
------------------------------------------------------------------- */
(function expandData(){
  // Seeded PRNG so figures stay stable between reloads/screenshots. mulberry32 — the old glibc LCG
  // (seed*1103515245+12345) has severe lattice correlation: with a fixed number of draws per
  // transaction it emitted IDENTICAL invoices on a fixed stride (every 15th sale the same), which
  // read as fake seed data. mulberry32 is well-distributed with no such hyperplane artefact.
  let seed = 20260707 >>> 0;
  const rnd = () => {
    seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const pick = arr => arr[Math.floor(rnd()*arr.length)];
  const between = (a,b) => Math.floor(a + rnd()*(b-a+1));

  // --- Outlets → 67 total (keep the 12 hand-authored, generate the rest) ---
  const hosts = {
    hypermarket: ['Mydin','AEON BiG','Lotus’s','Giant','Econsave','NSK','The Store','Pacific Hypermarket','Sunshine'],
    mall: ['Mall','AEON Mall','Sunway','KIPMall','Parade','Megamall','Central Square'],
    shoplot: ['Street-level','Founding outlet','Town shoplot','Arcade lot']
  };
  const townsByState = {
    'Kedah':['Alor Setar','Sungai Petani','Jitra','Kulim','Pendang','Baling'],
    'Penang':['Bayan Lepas','Butterworth','Air Itam','Nibong Tebal','Balik Pulau','Prai'],
    'Perak':['Ipoh','Taiping','Teluk Intan','Sitiawan','Kampar','Lumut'],
    'Selangor':['Shah Alam','Klang','Kajang','Rawang','Puchong','Semenyih','Banting'],
    'Kuala Lumpur':['Cheras','Setapak','Kepong','Bangsar','Sentul','Wangsa Maju'],
    'Negeri Sembilan':['Seremban','Nilai','Port Dickson','Bahau'],
    'Melaka':['Ayer Keroh','Jasin','Alor Gajah','Masjid Tanah'],
    'Johor':['Johor Bahru','Batu Pahat','Muar','Kluang','Segamat','Kulai','Pontian'],
    'Pahang':['Kuantan','Temerloh','Bentong','Raub','Jerantut'],
    'Terengganu':['Kuala Terengganu','Kemaman','Dungun','Marang'],
    'Kelantan':['Kota Bharu','Pasir Mas','Tanah Merah','Gua Musang'],
    'Perlis':['Kangar','Arau']
  };
  const states = Object.keys(townsByState);
  // target channel counts across all 67
  const existing = GF_DATA.outlets;
  const have = { hypermarket:0, mall:0, shoplot:0 };
  existing.forEach(o => have[o.channel]++);
  const target = GF_DATA.outletNetwork.byChannel; // {hypermarket:38, mall:15, shoplot:14}
  const usedCodes = new Set(existing.map(o=>o.code));
  const mkCode = (name) => {
    let base = name.replace(/[^A-Za-z ]/g,'').split(/\s+/).map(w=>w[0]).join('').toUpperCase().slice(0,3);
    if (base.length < 3) base = (base + name.replace(/[^A-Za-z]/g,'').toUpperCase()).slice(0,3);
    let code = base, n = 1;
    while (usedCodes.has(code)) { code = base.slice(0,2) + (n++); }
    usedCodes.add(code); return code;
  };
  ['hypermarket','mall','shoplot'].forEach(ch => {
    for (let i = have[ch]; i < target[ch]; i++) {
      const state = pick(states);
      const town = pick(townsByState[state]);
      const host = pick(hosts[ch]);
      const name = ch === 'hypermarket' ? `${host} ${town}`
                 : ch === 'mall' ? `${town} ${host}`
                 : `${town} ${host === 'Founding outlet' ? 'Shoplot' : host}`;
      const members = ch === 'hypermarket' ? between(620, 1750)
                    : ch === 'mall' ? between(420, 1200)
                    : between(180, 760);
      GF_DATA.outlets.push({ code: mkCode(name), name, channel: ch, host: (host==='Street-level'||host==='Founding outlet'?host:host), state, members });
    }
  });
  // sort by members desc so the "top" breakdown reads sensibly
  GF_DATA.outlets.sort((a,b)=>b.members-a.members);

  // --- Members → ~440 total (keep the hand-authored hero members, generate the rest).
  //     Every member's tier/points/qualifying/spend/lastPurchase is COMPUTED from the
  //     ledger below (never hand-set). Varied Malay / Chinese / Indian names. ---
  const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const M_MALE=['Ahmad','Mohd','Muhammad','Aiman','Faiz','Hafiz','Iskandar','Zulkifli','Rizal','Amir','Firdaus','Syafiq','Haziq','Danial','Aziz','Hakim','Naim','Ridzuan','Shukri','Azlan','Fadhil','Imran','Khairul'];
  const M_FEM=['Nurul','Siti','Aisyah','Farah','Wan','Nadia','Hana','Syafiqah','Aina','Liyana','Zaharah','Fatimah','Adibah','Balqis','Iman','Sofea','Alya','Khadijah','Maisarah','Izzati','Suraya','Hidayah'];
  const M_LAST=['bin Abdullah','binti Hassan','bin Ismail','binti Rahman','bin Yusof','binti Karim','bin Osman','binti Salleh','bin Razak','binti Aziz','bin Mahmud','binti Zainal','bin Kamarudin','binti Othman'];
  const C_SUR=['Tan','Lim','Lee','Wong','Ng','Chong','Goh','Teoh','Ong','Yeoh','Khoo','Cheah','Low','Chan','Ho','Foo','Sim','Toh','Lau','Tay'];
  const C_GIV=['Wei Ming','Mei Ling','Kah Wai','Soon Heng','Jia Hui','Zhi Hao','Xin Yi','Chee Keong','Li Wen','Yew Meng','Hui Shan','Kok Leong','Pei Shan','Wei Jie','Shu Fen','Jun Kit','Kar Mun','Chin Aik'];
  const I_MALE=['Rajesh','Suresh','Ravi','Anand','Kumar','Vijay','Prakash','Ganesh','Mohan','Arun','Dinesh','Bala','Saravanan','Vimal'];
  const I_FEM=['Priya','Devi','Kavitha','Meena','Latha','Shanti','Anitha','Radha','Uma','Vani','Divya','Nirmala'];
  const I_LAST=['Kumar','Subramaniam','Raj','Nair','Menon','Pillai','a/p Sundram','Krishnan','Muthu','a/l Rajan'];
  const genName = () => { const r = rnd();
    if (r < 0.55) return (rnd()<0.5 ? pick(M_MALE) : pick(M_FEM)) + ' ' + pick(M_LAST);
    if (r < 0.82) return pick(C_SUR) + ' ' + pick(C_GIV);
    return (rnd()<0.5 ? pick(I_MALE) : pick(I_FEM)) + ' ' + pick(I_LAST);
  };
  let _mseq = 52000;
  for (let i = 0; i < 430; i++) {
    const yr = pick(['2022','2023','2024','2025','2025','2026','2026']);
    const name = genName();
    GF_DATA.members.push({
      id: 'GF-' + yr + '-' + String(_mseq++).padStart(7,'0'),
      name,
      ic: String(between(70,99)) + String(between(1,12)).padStart(2,'0') + between(10,14) + '-0' + between(1,9) + '-' + between(1000,9999),
      phone: '+60 1' + between(1,9) + '-' + between(200,999) + ' ' + between(1000,9999),
      email: name.toLowerCase().replace(/[^a-z ]/g,'').trim().replace(/ +/g,'.').slice(0,18) + '@' + pick(['gmail.com','yahoo.com','outlook.com','hotmail.com']),
      tier: 'entry', points: 0, lastPurchase: '—', joined: between(1,28) + ' ' + pick(MONTHS) + ' ' + yr,
      outlet: pick(GF_DATA.outlets).name, dob: between(1,28) + ' ' + pick(MONTHS),
      spendYTD: 0, topCategory: 'Cincin', grams999: 0, grams916: 0, _generated: true
    });
  }

  // --- Design-code catalogue (for Reports search + pagination) ---
  const cat = [
    { p:'CN', label:'Cincin',  en:'Ring' },   { p:'RN', label:'Rantai', en:'Necklace' },
    { p:'SB', label:'Subang',  en:'Earring' },{ p:'LK', label:'Loket',  en:'Pendant' },
    { p:'GL', label:'Gelang',  en:'Bracelet' },{ p:'BN', label:'Bangle', en:'Bangle' },
    { p:'GK', label:'Gelang Kaki', en:'Anklet' },{ p:'GB', label:'Gold Bar', en:'Investment' }
  ];
  const collections = ['Pesona Tiga','Warisan Malaya','Bunga Tanjung','Merdeka Charms','Seri Bulan','Kasih Sayang','Anggun','Permata','Bunga Raya','Cahaya','Intan','Zamrud','Delima','Mutiara','Kencana'];
  // Standard retail catalogue is 916 (22K) and 999.9 (24K). Lower grades (750/375) are
  // supported at key-in (PURITY_OPTS) and accrue at the 'others' 1pt/RM2 band, but aren't
  // part of the headline design catalogue.
  const purities = ['916','999.9'];
  const codeMap = { '916':916, '999.9':999 };
  const cc = {}; // per-prefix counter
  // Map each catalogue prefix → the productCategories KEY the ledger line uses, so a design code's
  // category is the SAME token the loyalty engine + tables key on (no Malay-label/key drift).
  const PREFIX_KEY = { CN:'Cincin', RN:'Rantai', SB:'Subang', LK:'Loket', GL:'Gelang', BN:'Bangle', GK:'GelangKaki', GB:'Gold Bar' };
  const catalogue = [];
  for (let i=0;i<44;i++) {
    const c = pick(cat);
    const purity = c.p==='GB' ? '999.9' : pick(purities);
    cc[c.p] = (cc[c.p]||0)+1;
    const num = String(cc[c.p]).padStart(3,'0');
    const coll = c.p==='GB' ? (pick(['10g','20g','50g','100g'])) : pick(collections);
    const weight = c.p==='GB' ? parseFloat(coll) : +(between(15,140)/10).toFixed(1);
    const sold = c.p==='GB' ? between(1, 4) : between(2, 38);
    const pricePerG = codeMap[purity] === 999 ? 445 : 405;
    const revenue = Math.round(weight * pricePerG * sold);
    catalogue.push({
      sku: `${c.p}-${codeMap[purity]}-${(coll.replace(/[^A-Za-z0-9]/g,'').slice(0,2)||'GD').toUpperCase()}-${num}`,
      name: `${c.label} ${coll}`, category: c.label, catKey: PREFIX_KEY[c.p], grade: purity, en: c.en,
      material: `Emas ${purity}`, weight: `${weight}g`, sold, revenue
    });
  }
  catalogue.sort((a,b)=>b.revenue-a.revenue);
  GF_DATA.designCodes = catalogue;

  /* ==================================================================
     SPEC §1 — the dated ledger. Single source for every sales figure.
     Seeded ⇒ stable across reloads. May 2025 → May 2026, seasonal.
  ================================================================== */
  // Enrich the hand-authored members with the §1.4 fields (tier stickiness, opt-in).
  const iso = d => d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
  const addMonths = (d,n) => { const x=new Date(d); x.setMonth(x.getMonth()+n); return x; };
  GF_DATA.members.forEach((m,i) => {
    const ach = new Date(2025, (i*7)%12, 1 + (i*3)%27);
    m.pointsBalance     = m.pointsBalance     ?? m.points;
    m.qualifyingPoints  = m.qualifyingPoints  ?? Math.round(m.points * 1.35);
    m.tierAchievedOn    = m.tierAchievedOn    ?? iso(ach);
    m.tierExpiresOn     = m.tierExpiresOn     ?? iso(addMonths(ach,12));
    m.lastTransactionOn = m.lastTransactionOn ?? null;
    m.dormant           = m.dormant           ?? false;
    m.archived          = m.archived          ?? false;
    m.optIn             = m.optIn             ?? {
      marketing: { whatsapp: rnd()>0.15, sms: rnd()>0.35 },
      reminders: { whatsapp: rnd()>0.10, sms: rnd()>0.5 },
      consentLog: []
    };
  });

  // Grade pricing (RM/gram) and the accrual rate (mirrors engine.js POINT_RATE — 'others'
  // covers 750/375/bullion at 1 pt/RM2). rate() falls back to the 'others' band for any grade.
  const GRADE_PRICE = { '999.9': 445, '916': 405, '750': 300, '375': 165 };
  const RATE = { '999.9': 10, '916': 5, '750': 2, '375': 2, 'others': 2 };
  const rate = g => RATE[g] || RATE.others;
  const CATS = GF_DATA.productCategories.map(c => c.key || c.label.split(' ·')[0]);
  const memberIds = GF_DATA.members.map(m => m.id);
  const outletCodes = GF_DATA.outlets.map(o => o.code);
  // outlet weight ∝ member base, so busy outlets get more transactions
  const outletWeight = GF_DATA.outlets.map(o => Math.max(1, o.members));
  const weightTotal = outletWeight.reduce((s,w)=>s+w,0);
  const pickOutlet = () => { let r = rnd()*weightTotal; for (let k=0;k<outletCodes.length;k++){ r -= outletWeight[k]; if (r<=0) return outletCodes[k]; } return outletCodes[0]; };
  // Realistic tier spread (Entry heaviest → Gold smallest) via a controlled per-member
  // purchase-count target: most members buy rarely, a steep tail buys often. A shuffled
  // assignment pool then hands txns out in that proportion (no runaway concentration).
  // ~1,500 points per txn ⇒ tier bands map to txn counts: Entry 0-1, Bronze 2-4,
  // Silver 5-9, Gold 28+. Gold members buy heavily (they absorb most of the ledger),
  // which keeps Gold the SMALLEST tier while Entry stays the largest.
  const targetTx = GF_DATA.members.map(m => {
    if (!m._generated) return between(30, 60);               // hero members → Gold
    const r = rnd();
    return r < 0.40 ? between(0,1) : r < 0.68 ? between(2,4) : r < 0.88 ? between(5,9) : between(28,58);
  });
  const memberPool = [];
  GF_DATA.members.forEach((m, idx) => { for (let n = 0; n < targetTx[idx]; n++) memberPool.push(m.id); });
  for (let i = memberPool.length - 1; i > 0; i--) { const j = Math.floor(rnd()*(i+1)); const tmp = memberPool[i]; memberPool[i] = memberPool[j]; memberPool[j] = tmp; }
  let _poolIdx = 0;
  const pickMemberId = () => _poolIdx < memberPool.length ? memberPool[_poolIdx++] : GF_DATA.members[Math.floor(rnd()*13)].id;
  const outletByCode = {}; GF_DATA.outlets.forEach(o => outletByCode[o.code] = o);
  // Seasonal multiplier by calendar month (0=Jan): CNY, Raya, Merdeka, Deepavali peaks.
  const SEASON = [1.45,1.55,1.20,1.35,1.15,0.95,0.90,1.25,1.10,1.30,1.05,1.15];
  const BNPL_PROVIDERS = ['Atome','Shopee PayLater','GrabPayLater','Boost','Aeon Credit'];
  // Weighted pool — the 3 primaries carry ~88% of plans; Boost/Aeon are "newly onboarded, ramping"
  // so they get only a small share (fixes them out-performing a primary after the ledger reconcile).
  const BNPL_POOL = ['Atome','Atome','Atome','Atome','Atome','Atome','Shopee PayLater','Shopee PayLater',
    'Shopee PayLater','Shopee PayLater','Shopee PayLater','GrabPayLater','GrabPayLater','GrabPayLater',
    'GrabPayLater','Boost','Aeon Credit'];
  const VCODES = ['CNY50','RAYA100','WELCOME30','BONUS25','MERDEKA50'];

  // Pro-rata, floored, post-voucher accrual (SPEC §2.7) — precomputed onto the txn.
  const eligibleOf = l => l.goldValue + l.otherCharges;
  const txnPointsSeed = (lines, voucherValue) => {
    const base = lines.reduce((s,l)=>s+eligibleOf(l),0);
    const disc = Math.min(voucherValue||0, base);
    return lines.reduce((sum,l)=>{
      const share = base>0 ? (eligibleOf(l)/base)*disc : 0;
      return sum + Math.floor((l.lineTotal - share) / rate(l.grade));
    }, 0);
  };

  const START = new Date(2025,4,1), END = new Date(2026,4,31);
  const spanDays = Math.round((END-START)/864e5);
  const TARGET = 4200;
  const txns = [];
  const invSeq = {};
  for (let i=0; i<TARGET; i++) {
    // draw a date, then accept/reject by season weight to shape the year
    let day, seasonW;
    do { day = between(0, spanDays); const dt = new Date(START.getTime()+day*864e5); seasonW = SEASON[dt.getMonth()]; } while (rnd() > seasonW/1.55);
    const saleDate = new Date(START.getTime()+day*864e5);
    saleDate.setHours(between(10,20), between(0,59), between(0,59));
    const outletCode = pickOutlet();
    const isWalkIn = rnd() < 0.16;                        // §1.5.2 — walk-in exception path
    const memberId = isWalkIn ? null : pickMemberId();
    const nLines = rnd()<0.6 ? 1 : rnd()<0.85 ? 2 : 3;
    const lines = [];
    for (let j=0;j<nLines;j++) {
      // Draw a real SKU, then derive the line FROM it — a scanned design code carries its own fixed
      // category, grade and weight, so every line is internally consistent (design↔category↔grade↔
      // grams). Non-bars get a small ±8% craft variance around the catalogue weight; bars are exact.
      const design = pick(catalogue);
      const category = design.catKey;
      const isBar = category === 'Gold Bar';
      const grade = design.grade;
      const baseW = parseFloat(design.weight) || 5;
      const grams = isBar ? baseW : +Math.max(1.2, baseW * (0.92 + rnd()*0.16)).toFixed(1);
      const goldValue = Math.round(grams * GRADE_PRICE[grade] * 100)/100;
      const workmanship = isBar ? 0 : Math.round(goldValue * (0.05 + rnd()*0.08) * 100)/100; // upah 5–13%
      const otherCharges = (!isBar && rnd()<0.18) ? between(80,600) : 0;                       // stones/setting
      const lineTotal = Math.round((goldValue + workmanship + otherCharges)*100)/100;
      lines.push({ designCode: design.sku, category, grade, grams, goldValue, workmanship, otherCharges, lineTotal });
    }
    const grossTotal = Math.round(lines.reduce((s,l)=>s+l.lineTotal,0)*100)/100;
    const eligible = lines.reduce((s,l)=>s+eligibleOf(l),0);
    const useVoucher = !isWalkIn && rnd()<0.14;
    const voucherValue = useVoucher ? Math.min(pick([25,50,100,200]), Math.round(eligible*0.5)) : 0;
    const voucherCode = useVoucher ? pick(VCODES) : null;
    const netPaid = Math.round((grossTotal - voucherValue)*100)/100;
    const payRoll = rnd();
    const hasBar = lines.some(l => /bar/i.test(l.category));
    let paymentMethod = payRoll<0.34 ? 'Credit Card' : payRoll<0.60 ? 'Cash' : payRoll<0.74 ? 'Debit Card' : 'BNPL';
    // §4 — gold bars / investment items and big-ticket sales are never on BNPL.
    if (paymentMethod==='BNPL' && (hasBar || grossTotal > 6000)) paymentMethod = 'Credit Card';
    const bnpl = paymentMethod==='BNPL' ? { provider: pick(BNPL_POOL), termMonths: pick([3,6,12]), startDate: iso(saleDate) } : null;
    const pointsAwarded = isWalkIn ? 0 : txnPointsSeed(lines, voucherValue);   // walk-ins earn nothing
    // entry time: keyed at till (≈same time) or end-of-day / monthly upload batch
    const source = rnd()<0.7 ? 'keyed' : 'upload';
    const entered = new Date(saleDate);
    if (source==='upload') { entered.setDate(entered.getDate()+between(1,30)); entered.setHours(between(9,23), between(0,59)); }
    else if (rnd()<0.5) { entered.setHours(21, between(0,59)); }               // EOD batch
    const staffId = 'ST-'+String(between(1,240)).padStart(3,'0');
    invSeq[outletCode] = (invSeq[outletCode]||1000)+1;
    const invoiceNo = `INV-${outletCode}-${String(saleDate.getFullYear()).slice(2)}${String(saleDate.getMonth()+1).padStart(2,'0')}-${invSeq[outletCode]}`;
    txns.push({
      id: `TXN-${saleDate.getFullYear()}-${String(i+1).padStart(6,'0')}`,
      invoiceNo,
      ts: iso(saleDate)+'T'+String(saleDate.getHours()).padStart(2,'0')+':'+String(saleDate.getMinutes()).padStart(2,'0')+':00+08:00',
      enteredAt: iso(entered)+'T'+String(entered.getHours()).padStart(2,'0')+':'+String(entered.getMinutes()).padStart(2,'0')+':00+08:00',
      enteredBy: staffId, source,
      memberId, outletCode, staffId,
      lines, grossTotal, voucherCode, voucherValue, netPaid, paymentMethod, bnpl,
      pointsAwarded, reversed: rnd()<0.01
    });
  }
  txns.sort((a,b)=> a.ts < b.ts ? -1 : a.ts > b.ts ? 1 : 0);
  GF_DATA.transactions = txns;

  /* ---- Compute every member's tier / points / spend / grams / lastPurchase from
          their own non-reversed transactions (SPEC §2 — one ledger, derived figures). ---- */
  const TODAY = new Date(2026, 4, 15);   // demo "today" — pinned to 15 May 2026 so the demo never drifts with the real clock (matches engine NOW + admin DEMO_TODAY_ISO)
  const relTime = ds => { const days = Math.round((TODAY - new Date(ds)) / 864e5);
    return days <= 0 ? 'Today' : days === 1 ? 'Yesterday' : days < 7 ? days + ' days ago'
      : days < 30 ? Math.round(days/7) + ' wk' + (Math.round(days/7)>1?'s':'') + ' ago'
      : days < 365 ? Math.round(days/30) + ' mo ago' : Math.round(days/365) + ' yr ago'; };
  const tierForQ = q => q >= 15000 ? 'gold' : q >= 7000 ? 'silver' : q >= 2500 ? 'bronze' : 'entry';
  const byMember = {};
  txns.forEach(t => { if (t.memberId && !t.reversed) (byMember[t.memberId] = byMember[t.memberId] || []).push(t); });
  const tierCount = { entry:0, bronze:0, silver:0, gold:0 };
  GF_DATA.members.forEach(m => {
    const mt = byMember[m.id] || [];
    const qualifying = mt.reduce((s,t) => s + (t.pointsAwarded || 0), 0);
    const spend = Math.round(mt.reduce((s,t) => s + (t.netPaid || 0), 0));
    const g999 = +mt.reduce((s,t) => s + t.lines.filter(l=>l.grade==='999.9').reduce((a,l)=>a+l.grams,0), 0).toFixed(1);
    const g916 = +mt.reduce((s,t) => s + t.lines.filter(l=>l.grade==='916').reduce((a,l)=>a+l.grams,0), 0).toFixed(1);
    const catCount = {}; mt.forEach(t => t.lines.forEach(l => catCount[l.category] = (catCount[l.category]||0) + 1));
    const topCategory = Object.keys(catCount).sort((a,b)=>catCount[b]-catCount[a])[0] || m.topCategory || 'Cincin';
    const lastTs = mt.map(t=>t.ts).sort().slice(-1)[0];
    m.qualifyingPoints = qualifying;
    m.pointsBalance = Math.round(qualifying * (0.55 + 0.4*rnd()));   // some points already redeemed
    m.points = m.pointsBalance;
    m.spendYTD = spend;
    m.tier = tierForQ(qualifying);
    m.grams999 = g999; m.grams916 = g916; m.topCategory = topCategory;
    m.lastTransactionOn = lastTs ? lastTs.slice(0,10) : m.lastTransactionOn || null;
    m.lastPurchase = lastTs ? relTime(lastTs.slice(0,10)) : 'No purchases';
    m.hasBnpl = mt.some(t => t.bnpl);
    tierCount[m.tier]++;
  });
  // Keep the vanity totals consistent with the seeded, computed member base.
  GF_DATA.kpis.totalMembers = GF_DATA.members.length;
  // Rescale the 12-month growth curve so it ends at the real member base (shape/ YoY kept).
  const _gLast = GF_DATA.growthByMonth[GF_DATA.growthByMonth.length - 1].v || 1;
  const _gFactor = GF_DATA.members.length / _gLast;
  GF_DATA.growthByMonth.forEach(pt => pt.v = Math.round(pt.v * _gFactor));
  GF_DATA.kpis.newThisWeek = GF_DATA.members.filter(m => m.lastTransactionOn && relTime(m.lastTransactionOn).includes('day')).length;
  Object.keys(tierCount).forEach(k => { if (GF_DATA.tiers[k]) GF_DATA.tiers[k].count = tierCount[k]; });

  /* ---- Portal `me` is the SAME person as a members[] entry (GF-2026-0048291). The reconcile above
          only touches members[]; mirror the twin's ledger-derived loyalty figures onto `me` and
          rebuild its purchase history from the SAME ledger the CRM reads — otherwise the two apps
          show one human with 3-4× different points/grams/purchases (data-consistency 22 Jul).
          Presentation-only fields (firstName, birthdayToday, referralCode, email…) are untouched. */
  if (GF_DATA.me) {
    const mid = GF_DATA.me.id;
    const twin = GF_DATA.members.find(m => m.id === mid);
    if (twin) {
      ['tier','points','pointsBalance','qualifyingPoints','spendYTD','grams999','grams916',
       'topCategory','lastTransactionOn','lastPurchase','tierAchievedOn','tierExpiresOn']
        .forEach(k => { if (twin[k] != null) GF_DATA.me[k] = twin[k]; });
      GF_DATA.me.pointsThisYear = twin.qualifyingPoints;
      GF_DATA.me.topTier = twin.tier === 'gold';
      GF_DATA.me.nextTier = twin.tier === 'gold' ? null : twin.tier;
    }
    const led = (GF_DATA.transactions || []).filter(t => t.memberId === mid && !t.reversed)
      .sort((a,b) => a.ts < b.ts ? 1 : -1);
    if (led.length) {
      const oName = {}; GF_DATA.outlets.forEach(o => oName[o.code] = o.name);
      const singular = { GelangKaki:'Gelang Kaki' };
      const MM = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      const fmtd = isoStr => { const d = new Date(isoStr); return isNaN(d.getTime()) ? isoStr : String(d.getDate()).padStart(2,'0')+' '+MM[d.getMonth()]+' '+d.getFullYear(); };
      GF_DATA.purchaseHistory[mid] = led.map(t => {
        const lines = t.lines || [], l0 = lines[0] || {};
        const grams = +lines.reduce((s,l) => s + (l.grams||0), 0).toFixed(1);
        const isBar = l0.category === 'Gold Bar';
        const nm = isBar ? 'Gold Bar · ' + (l0.grade||'999.9')
                         : (singular[l0.category] || l0.category || 'Item') + ' Emas ' + (l0.grade||'916');
        return { date: fmtd((t.ts||'').slice(0,10)), item: nm + (lines.length>1 ? ' +'+(lines.length-1)+' more' : ''),
          category: l0.category || 'Cincin', grade: l0.grade || '916', grams, invoice: t.invoiceNo,
          amount: Math.round(t.netPaid != null ? t.netPaid : (t.grossTotal||0)),
          outlet: oName[t.outletCode] || '', payment: t.bnpl ? (t.bnpl.provider||'BNPL') : (t.paymentMethod||'Cash') };
      });
      GF_DATA.me.purchases = led.length;
    }
  }

  /* ---- §4 installment plans — derived from the BNPL transactions: realistic scale
          (≤ RM6,000, terms 3/6/12), never gold bars, spread of progress. ---- */
  const bnplTxns = txns.filter(t => t.bnpl && t.memberId && !t.reversed)
    .sort((a,b)=> a.ts < b.ts ? 1 : -1);     // newest first
  let _ipseq = 20000;
  GF_DATA.atomePlans = bnplTxns.map(t => {
    const m = GF_DATA.members.find(x => x.id === t.memberId);
    const term = t.bnpl.termMonths, start = new Date(t.ts);
    const elapsed = Math.max(0, Math.min(term, Math.floor((TODAY - start) / (864e5 * 30.44))));
    const line = t.lines[0];
    const catLabel = (GF_DATA.productCategories.find(c => c.key === line.category) || {}).label || line.category;
    // Next scheduled payment = start + (elapsed+1) months, on the same day-of-month as the
    // sale, PER PLAN (from the real sale date + tenure). Blank once the plan has run its term.
    const nd = new Date(start); nd.setMonth(nd.getMonth() + elapsed + 1);
    const nextDue = elapsed >= term ? '' : nd.toISOString().slice(0, 10);
    return {
      id: 'IP-' + (_ipseq++), provider: t.bnpl.provider, invoiceNo: t.invoiceNo,
      outlet: (outletByCode[t.outletCode] || {}).name || t.outletCode,
      memberId: t.memberId, customer: m ? m.name : '—', phone: m ? m.phone : '',
      item: catLabel + ' Emas ' + line.grade, material: 'Emas ' + line.grade + ' · ' + line.grams + 'g',
      total: Math.round(t.grossTotal), paid: Math.round(t.grossTotal * elapsed / term),
      monthly: Math.round(t.grossTotal / term * 100) / 100,
      paidMonths: elapsed, totalMonths: term, termMonths: term,
      startISO: start.toISOString().slice(0, 10),   // machine date (Safari-parseable)
      nextDate: nextDue, status: elapsed >= term ? 'elapsed' : 'scheduled',
      startDate: formatMonthYear(start)
    };
  });
  GF_DATA.kpis.activeAtome = GF_DATA.atomePlans.filter(p => p.paidMonths < p.termMonths).length;
  // Reconcile the provider cards/donut with the real generated plans (no vanity totals).
  const _provCount = {}, _provVal = {};
  GF_DATA.atomePlans.forEach(p => { _provCount[p.provider] = (_provCount[p.provider]||0)+1; _provVal[p.provider] = (_provVal[p.provider]||0)+p.total; });
  const _provName = { atome:'Atome', shopee:'Shopee PayLater', grab:'GrabPayLater', boost:'Boost', aeon:'Aeon Credit' };
  [...(GF_DATA.installmentProviders||[]), ...(GF_DATA.otherProviders||[])].forEach(pr => {
    const nm = _provName[pr.id] || pr.name;
    pr.activePlans = _provCount[nm] || 0;
    pr.avgValue = _provCount[nm] ? Math.round(_provVal[nm]/_provCount[nm]) : 0;
  });

  /* ---- ≥30 broadcasts (sent/scheduled/draft) for the History + Performance tabs. ---- */
  const bcNames = ['Warisan Malaya · VIP Preview','Pesona Tiga Launch','Merdeka Charms Early Access','CNY Imlek Promo','CNY · Reunion Gift Idea','Raya Aidilfitri Collection','Raya Gold Promo','Deepavali Early Access','Year-end Thank You','Mother’s Day Promo','Bunga Tanjung Launch','Seri Bulan Preview','Anggun Collection','Kasih Sayang Valentine','Hari Raya Haji','Wesak Day Offer','Gawai Gold Special','Kaamatan Promo','Bunga Raya National Day','Christmas Gold Gift','New Year Countdown','Awal Muharram','Thaipusam Special','Ponggal Harvest','School Holiday Promo','Anniversary Sale','Flash Weekend Sale','Members-Only Preview','Birthday Bonus Batch','Win-back · At-risk','Installment Reminders · Monthly','Points Expiry Nudge','Tier Upgrade Congrats'];
  const bcAud = ['All Tiers','Silver + Gold','Gold','Bronze + Silver + Gold','Auto · DOB cohort','Active installments','At-risk cohort','Silver + Gold'];
  const bcChan = ['WhatsApp','WhatsApp + SMS','WhatsApp'];
  const _bcMonths = ['31 Dec 2025','08 Jan 2026','29 Jan 2026','08 Feb 2026','18 Feb 2026','01 Mar 2026','12 Mar 2026','22 Mar 2026','01 Apr 2026','12 Apr 2026','22 Apr 2026','01 May 2026','04 May 2026','09 May 2026','18 May 2026','05 Jun 2026'];
  const _T = GF_DATA.tiers;
  const audReach = a => a==='All Tiers' ? _T.entry.count+_T.bronze.count+_T.silver.count+_T.gold.count
    : a==='Silver + Gold' ? _T.silver.count+_T.gold.count
    : a==='Gold' ? _T.gold.count
    : a==='Bronze + Silver + Gold' ? _T.bronze.count+_T.silver.count+_T.gold.count
    : a==='Auto · DOB cohort' ? Math.max(12, Math.round(GF_DATA.members.length/12))
    : a==='Active installments' ? GF_DATA.atomePlans.filter(p=>p.paidMonths<p.termMonths).length
    : a==='At-risk cohort' ? Math.round(GF_DATA.members.length*0.14)
    : GF_DATA.members.length;
  // Reference "today" for the demo clock (keep in sync with the app header, 15 May 2026).
  const _bcToday = 20260515;
  const _bcMonIdx = { Jan:1,Feb:2,Mar:3,Apr:4,May:5,Jun:6,Jul:7,Aug:8,Sep:9,Oct:10,Nov:11,Dec:12 };
  const _bcKey = s => { const m=/(\d{1,2})\s+(\w{3})\s+(\d{4})/.exec(s||''); return m ? (+m[3])*10000+(_bcMonIdx[m[2]]||0)*100+(+m[1]) : 0; };
  GF_DATA.broadcasts = bcNames.map((name, i) => {
    const dateStr = _bcMonths[i % _bcMonths.length];              // 'DD Mon YYYY'
    const isFuture = _bcKey(dateStr) > _bcToday;
    // First 3 are working drafts; the rest are Sent once past, still Scheduled while upcoming —
    // a 'Sent' broadcast can never carry a future date.
    const status = i < 3 ? 'Draft' : (isFuture ? 'Scheduled' : 'Sent');
    const audience = bcAud[i % bcAud.length];
    const recipients = audReach(audience);
    const sent = status === 'Sent';
    return {
      name, audience, channel: bcChan[i % bcChan.length],
      date: (status==='Draft' ? 'Not scheduled' : dateStr + ' · ' + String(8+i%10).padStart(2,'0') + ':00'),
      recipients, status,
      delivered: sent ? 94 + ((i*7) % 6) : null,
      deliveredSingleTick: sent ? Math.max(3, Math.round(recipients * 0.018)) : 0,
      redeem: sent ? (/reminder|installment/i.test(name) ? null : 6 + ((i*5) % 22)) : null
    };
  });

  // Demo dormancy cohort — a handful of long-inactive members (18+ months, zero transactions) so
  // the CRM can surface the Dormant segment. Applied LAST (after transaction generation) so the
  // reset (Entry + purged points + archived) isn't overwritten. Mirrors engine.applyDormancy.
  (function seedDormant(){
    const gen = GF_DATA.members.filter(m => m._generated);
    const idxs = [3, 17, 31, 45, 59, 73];
    idxs.forEach(i => { const m = gen[i % gen.length]; if (!m) return;
      m.lastTransactionOn = '2024-09-15';        // ~20 months before the pinned demo today (15 May 2026)
      m.dormant = true; m.archived = true; m.dormantOn = '2026-03-15';
      m.tier = 'entry'; m.points = 0; m.pointsBalance = 0; m.qualifyingPoints = 0; m.lastPurchase = '—'; m.spendYTD = 0;
    });
  })();

  // Reconcile every member COUNT to the real member base (single source = GF_DATA.members) so the
  // same total shows on every screen. The stale seed had outlet + category counts in the thousands,
  // contradicting the ~442-member reality on the Membership page. Derive them here instead.
  (function reconcileMemberCounts(){
    const members = GF_DATA.members || [];
    const outlets = GF_DATA.outlets || [];
    // Assign every member to exactly ONE outlet object so the per-outlet counts sum to the member
    // base with no double-counting (a few outlet names collide; some members had a stale outlet).
    const byName = {}; outlets.forEach(o => { (byName[o.name] = byName[o.name] || []).push(o); });
    outlets.forEach(o => o.members = 0);
    let rr = 0;
    members.forEach(m => {
      let bucket = byName[m.outlet];
      if (!bucket) { const o = outlets[rr++ % outlets.length]; m.outlet = o.name; bucket = [o]; }  // repoint stale outlet
      const o = bucket[(bucket._i = (bucket._i || 0) + 1) % bucket.length];   // split evenly across same-named twins
      o.members++;
    });
    const byCat = {}; members.forEach(m => { byCat[m.topCategory] = (byCat[m.topCategory]||0) + 1; });
    (GF_DATA.categoryTrend||[]).forEach(c => { c.members = byCat[c.key] || 0; });
    if (GF_DATA.outletNetwork) GF_DATA.outletNetwork.totalMembers = members.length;
  })();
})();

/* ==================================================================
   SPEC §1.5 — ingest primitives (both paths kept). Pure logic over the
   ledger; the New Purchase enrol form and the upload review UI wire to
   these in a later step.
================================================================== */
// §1.5.1 — idempotency key. Unique per sale; dedupes keyed vs uploaded.
const txnKey = t => `${t.outletCode}::${t.invoiceNo}`;

// Partition an incoming upload into new / duplicate / rejected(blank invoice)
// BEFORE anything commits. Never import silently.
function partitionUpload(incoming, existing) {
  existing = existing || GF_DATA.transactions || [];
  const seen = new Set(existing.map(txnKey));
  const out = { new: [], duplicate: [], rejected: [] };
  incoming.forEach(row => {
    if (!row.invoiceNo || !String(row.invoiceNo).trim()) out.rejected.push(row);   // blank invoice → cannot dedupe
    else if (seen.has(txnKey(row))) out.duplicate.push(row);
    else { out.new.push(row); seen.add(txnKey(row)); }
  });
  return out;
}

// §1.5.3 — backdating capped at 7 days; beyond that requires can('edit').
// The permission decision routes through the single gate (components.js can()),
// never a role string literal here.
const BACKDATE_LIMIT_DAYS = 7;
function backdateAllowed(saleDateISO) {
  if (typeof can === 'function' && can('edit')) return true;
  const sale = new Date(saleDateISO), now = new Date();
  if (sale > now) return false;
  return (now - sale) / 864e5 <= BACKDATE_LIMIT_DAYS;
}

// SPEC RULES — expose the data layer on window so the engine, components and
// the acceptance harness (docs/acceptance.js) can reach it. (`const` alone is
// lexical-only and never lands on window.)
if (typeof window !== 'undefined') {
  window.GF_DATA = GF_DATA;
  window.txnKey = txnKey;
  window.partitionUpload = partitionUpload;
  window.backdateAllowed = backdateAllowed;
  window.BACKDATE_LIMIT_DAYS = BACKDATE_LIMIT_DAYS;
}

// Currency formatting
function fmtRM(n) {
  return 'RM ' + n.toLocaleString('en-MY', { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 });
}
function fmtNum(n) { return n.toLocaleString('en-MY'); }
function fmtPct(n) { return n + '%'; }

/* Malaysian date/time — ONE shared formatter for every date on screen.
   Numeric → DD/MM/YYYY (18/04/2026); written → "DD Mon YYYY" (18 Apr 2026);
   time → 24-hour HH:MM (Asia/Kuala_Lumpur is already the ledger standard).
   NB: gfMonthName() is a hoisted function (not a const) so the expandData IIFE,
   which runs earlier in this file and calls formatMonthYear(), never hits a TDZ. */
function gfMonthName(m) { return ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][m-1]; }
function _gfDateParts(input) {
  if (input instanceof Date) return isNaN(input) ? null
    : { y: input.getFullYear(), m: input.getMonth()+1, d: input.getDate(), hh: input.getHours(), mm: input.getMinutes() };
  if (typeof input === 'string') {
    const s = input.match(/^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2}))?/);   // ISO / ledger ts
    if (s) return { y:+s[1], m:+s[2], d:+s[3], hh: s[4]!=null?+s[4]:null, mm: s[5]!=null?+s[5]:null };
  }
  return null;   // already-written or non-parseable → caller passes through
}
function formatDate(input, opts) {
  const p = _gfDateParts(input);
  if (!p) return input == null ? '—' : String(input);
  const pad = n => String(n).padStart(2,'0');
  return (opts && opts.written) ? `${pad(p.d)} ${gfMonthName(p.m)} ${p.y}` : `${pad(p.d)}/${pad(p.m)}/${p.y}`;
}
function formatTime(input) {
  const p = _gfDateParts(input);
  return (!p || p.hh == null) ? '' : `${String(p.hh).padStart(2,'0')}:${String(p.mm).padStart(2,'0')}`;
}
function formatDateTime(input, opts) {
  const d = formatDate(input, opts), t = formatTime(input);
  return t ? `${d} · ${t}` : d;
}
// month-year only, e.g. "Apr 2026" (installment start dates)
function formatMonthYear(input) {
  const p = _gfDateParts(input);
  return p ? `${gfMonthName(p.m)} ${p.y}` : (input == null ? '—' : String(input));
}

// Toast helper
function toast(message, type = 'success') {
  const el = document.createElement('div');
  el.className = 'toast ' + type;
  const icon = type === 'success'
    ? '<svg width="18" height="18" fill="none" stroke="#22C55E" stroke-width="2.5" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>'
    : '<svg width="18" height="18" fill="none" stroke="#F59E0B" stroke-width="2.5" viewBox="0 0 24 24"><path d="M12 9v2m0 4h.01M5 19h14a2 2 0 001.84-2.75L13.74 4a2 2 0 00-3.48 0L3.16 16.25A2 2 0 005 19z"/></svg>';
  el.innerHTML = icon + '<span>' + message + '</span>';
  document.body.appendChild(el);
  // Cashier runs in BM — localise the toast text (whole-phrase + pattern rules) when active.
  if (typeof localizeDOM === 'function') localizeDOM(el);
  setTimeout(() => { el.style.animation = 'fadeOut 0.3s ease forwards'; setTimeout(() => el.remove(), 300); }, 2800);
}

// Tier pill renderer
function tierPill(tier) {
  const label = tier.charAt(0).toUpperCase() + tier.slice(1);
  return `<span class="tier-${tier} text-[10px] tracking-wider px-2.5 py-1 rounded-full">${label.toUpperCase()}</span>`;
}

// Status pill
function statusPill(status) {
  const map = {
    ontrack:  ['On Track',        'status-ontrack'],
    action:   ['Action Needed',   'status-action'],
    final:    ['Final Stretch',   'status-final'],
    paid:     ['Paid',            'status-paid']
  };
  const [label, cls] = map[status] || ['—', ''];
  return `<span class="${cls} text-[10px] px-2.5 py-1 rounded-full">${label}</span>`;
}

// SPEC §4.2 — a BNPL plan has three schedule states only. Goldfinch holds no
// receivable and receives no provider feed, so "overdue"/"paid" cannot exist here.
// Estimated from plan term + start date via engine.planStatus.
function bnplStatusPill(p) {
  const s = (typeof window !== 'undefined' && typeof window.planStatus === 'function')
    ? window.planStatus({ startDate: p.startDate, termMonths: p.totalMonths })
    : 'Scheduled';
  const cls = 'status-neutral';
  return `<span class="${cls} text-[10px] font-medium px-2.5 py-1 rounded-full whitespace-nowrap">${s}</span>`;
}

// Voucher visual identity — each type gets a distinct icon + coloured tile (iOS-Settings style)
function voucherStyle(v) {
  const t = (v.title + ' ' + (v.subtitle || '')).toLowerCase();
  if (/welcome|sign-?up|first/.test(t)) return { icon: 'sparkles', tile: '#0E7C86', glyph: '#FFFFFF' }; // welcome → teal
  if (/bonus|birthday/.test(t))        return { icon: 'cake',     tile: '#7A4FB5', glyph: '#FFFFFF' }; // purple
  if (/vip|early/.test(t))             return { icon: 'starFill', tile: 'var(--gold-grad)', glyph: '#022135' }; // metallic gold
  if (/win-?back|dormant/.test(t))     return { icon: 'refresh',  tile: '#0E9F8E', glyph: '#FFFFFF' }; // teal
  if (/cny|chinese/.test(t))           return { icon: 'tag',      tile: '#D8434A', glyph: '#FFFFFF' }; // red
  if (/raya|merdeka|festival/.test(t)) return { icon: 'gift',     tile: '#2E9A6B', glyph: '#FFFFFF' }; // green
  return { icon: 'percent', tile: '#2F6FED', glyph: '#FFFFFF' };                                       // discount → blue
}

// SVG icons (lucide-style)
const ICONS = {
  dashboard:  '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>',
  refer:      '<svg fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><circle cx="18" cy="5" r="2.6"/><circle cx="6" cy="12" r="2.6"/><circle cx="18" cy="19" r="2.6"/><line x1="8.3" y1="10.6" x2="15.7" y2="6.4"/><line x1="8.3" y1="13.4" x2="15.7" y2="17.6"/></svg>',
  users:      '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>',
  card:       '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>',
  bullhorn:   '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 010 14.14"/><path d="M15.54 8.46a5 5 0 010 7.07"/></svg>',
  send:       '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/></svg>',
  star:       '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  chart:      '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
  settings:   '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>',
  bell:       '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>',
  search:     '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>',
  home:       '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2h-4v-7H9v7H5a2 2 0 01-2-2z"/></svg>',
  gift:       '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"/></svg>',
  wallet:     '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 12V8H6a2 2 0 010-4h12v4"/><path d="M4 6v12a2 2 0 002 2h14v-4"/><path d="M18 12a2 2 0 100 4h4v-4z"/></svg>',
  user:       '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  menu:       '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>',
  x:          '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  chevR:      '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>',
  plus:       '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
  download:   '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
  upload:     '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>',
  filter:     '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>',
  whatsapp:   '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345m-5.446 7.443h-.016c-1.77 0-3.524-.48-5.055-1.38l-.36-.214-3.75.975 1.005-3.645-.239-.375c-.99-1.575-1.516-3.396-1.516-5.26 0-5.445 4.455-9.885 9.942-9.885 2.654 0 5.145 1.035 7.021 2.91 1.875 1.859 2.909 4.35 2.909 6.99-.004 5.444-4.46 9.885-9.935 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.495-8.411"/></svg>',
  check:      '<svg fill="none" stroke="currentColor" stroke-width="3" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>',
  eye:        '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
  cake:       '<svg fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M20 21v-8a2 2 0 00-2-2H6a2 2 0 00-2 2v8"/><path d="M3 16s1.5-1 4.5-1 3 1 4.5 1 1.5-1 4.5-1 3 1 4.5 1"/><path d="M2 21h20"/><path d="M7 8v3M12 8v3M17 8v3"/><path d="M7 3v1.5M12 3v1.5M17 3v1.5"/></svg>',
  mail:       '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 6L2 7"/></svg>',
  coin:       '<svg fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v10"/><path d="M14.6 9.2c-.6-.6-1.6-.9-2.6-.9-1.7 0-3 .9-3 2s1.3 2 3 2 3 .9 3 2-1.3 2-3 2c-1 0-2-.3-2.6-.9"/></svg>',
  sparkles:   '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z"/><path d="M19 14l.7 1.8L21.5 16.5l-1.8.7L19 19l-.7-1.8L16.5 16.5l1.8-.7z"/></svg>',
  lock:       '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>',
  bolt:       '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
  package:    '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M16.5 9.4L7.5 4.21"/><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><path d="M3.27 6.96L12 12.01l8.73-5.05"/><path d="M12 22.08V12"/></svg>',
  receipt:    '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 2v20l2-1.5L8 22l2-1.5L12 22l2-1.5L16 22l2-1.5L20 22V2l-2 1.5L16 2l-2 1.5L12 2l-2 1.5L8 2 6 3.5z"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>',
  globe:      '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>',
  chat:       '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>',
  info:       '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>',
  chevL:      '<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>',
  starFill:   '<svg fill="currentColor" stroke="none" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  tag:        '<svg fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><circle cx="7" cy="7" r="1.4" fill="currentColor" stroke="none"/></svg>',
  clock:      '<svg fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  refresh:    '<svg fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M21 2v6h-6"/><path d="M3 12a9 9 0 0115-6.7L21 8"/><path d="M3 22v-6h6"/><path d="M21 12a9 9 0 01-15 6.7L3 16"/></svg>',
  percent:    '<svg fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><line x1="19" y1="5" x2="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>',
  apple:      '<svg fill="currentColor" stroke="none" viewBox="0 0 24 24"><path d="M16.36 12.78c.02 2.6 2.28 3.46 2.3 3.47-.02.06-.36 1.24-1.2 2.45-.72 1.05-1.47 2.1-2.65 2.12-1.16.02-1.53-.69-2.86-.69-1.32 0-1.74.67-2.83.71-1.14.04-2.01-1.13-2.74-2.18-1.49-2.16-2.63-6.1-1.1-8.76.76-1.32 2.12-2.16 3.6-2.18 1.12-.02 2.17.75 2.86.75.68 0 1.96-.93 3.3-.79.56.02 2.14.23 3.15 1.7-.08.05-1.88 1.1-1.86 3.28zM14.2 4.66c.61-.74 1.02-1.77.91-2.79-.88.04-1.94.59-2.57 1.32-.56.65-1.06 1.7-.92 2.7.98.08 1.98-.5 2.58-1.23z"/></svg>',
  pencil:     '<svg fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4z"/></svg>',
  copy:       '<svg fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>',
  trash:      '<svg fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/><path d="M10 11v6M14 11v6"/></svg>',
  scan:       '<svg fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M3 7V5a2 2 0 012-2h2"/><path d="M17 3h2a2 2 0 012 2v2"/><path d="M21 17v2a2 2 0 01-2 2h-2"/><path d="M7 21H5a2 2 0 01-2-2v-2"/><path d="M7 12h10"/></svg>',
  scale:      '<svg fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M12 3v18"/><path d="M5 21h14"/><path d="M6 8h12"/><path d="M3 13l3-7 3 7a3 3 0 01-6 0z"/><path d="M15 13l3-7 3 7a3 3 0 01-6 0z"/></svg>',
  droplet:    '<svg fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M12 2.7l5.3 5.3a7.5 7.5 0 11-10.6 0z"/></svg>',
  layers:     '<svg fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',
  banknote:   '<svg fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>',
  trendUp:    '<svg fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>',
  sliders:    '<svg fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>',
  building:   '<svg fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01"/></svg>',
  idCard:     '<svg fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><circle cx="8" cy="11" r="2"/><path d="M5 17c0-1.7 1.3-3 3-3s3 1.3 3 3"/><path d="M14 9h5M14 13h5M14 17h3"/></svg>',
  shield:     '<svg fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  grid:       '<svg fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>',
  cart:       '<svg fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>',
  ring:       '<svg fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><circle cx="12" cy="14" r="6"/><path d="M9 5l1.5-2.5h3L15 5"/><path d="M10.5 2.5h3"/></svg>',
  bird:       '<svg fill="currentColor" stroke="none" viewBox="0 0 24 24"><path d="M21 5c-1 0-2 .5-3 1.5C16.5 5 14.5 4.2 12.5 4.4 8 4.8 5 8.5 4 12c-1 .5-2 1.5-2.5 3 1-.5 1.8-.5 2.5-.3C3.5 16.5 3 18 3 20c1.5-1 2.7-2.5 3.5-4 1.5 1 3.5 1.3 5.5.8C16 16 19 12 20 8c.7-.2 1.3-.8 1.5-1.6-.5.2-1 .2-1.5.1.5-.4 1-1 1-1.5z"/></svg>',
  // Actual Goldfinch brand bird — the real gold logo PNG (transparent bg), for tier medallions
  birdLogo:   '<img src="assets/goldfinch-logo-2.png" alt="Goldfinch" style="width:100%;height:100%;object-fit:contain;display:block"/>',
  msgSend:    '<svg fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="M21 11.5a8.5 8.5 0 01-12.2 7.6L3 21l1.9-5.8A8.5 8.5 0 1121 11.5z"/><path d="M16 8.5l-7 4 3 1.6 1.6 3 2.4-8.6z"/></svg>',
  // Standard broadcast / announcement icon (megaphone)
  broadcast:  '<svg fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24"><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>'
};
