/* Goldfinch — UI localisation (English ⇄ Bahasa Melayu).
   Malay terms follow the conventions used in the Malay interfaces of Google, Apple and WhatsApp
   (Utama, Ganjaran, Baucar, Tebus, Tetapan, Peringkat, Ansuran, Pemberitahuan…) — clean, standard,
   widely understood, not literal.
   localizeDOM(root) runs after each render: when GF_LANG==='ms' it localises text nodes +
   placeholder/title/aria-label. For every text node it FIRST tries an exact-match dictionary (MS);
   if that misses it tries an ordered array of PATTERN rules (MP) — [regExp, replacement] where the
   regExp is anchored (^…$) to the trimmed node and the replacement (string with $1/$2… or a function)
   rebuilds the Malay text while preserving embedded DATA (numbers, money, grams, dates, names, codes).
   The FIRST matching pattern wins, so specific composites are listed before generic single-token rules.
   Member/outlet names, campaign/voucher codes, IDs, emails, product SKUs ("X Emas #"), month tokens
   and BNPL brand names (Atome, Shopee PayLater, WhatsApp, QR, CSV, HQ, PDPA…) are never translated. */
(function () {
  var MS = {
    /* ---- nav / sections ---- */
    'Home': 'Utama', 'Card': 'Kad', 'Rewards': 'Ganjaran', 'Refer': 'Rujuk', 'Profile': 'Profil',
    'Dashboard': 'Papan Pemuka', 'Membership': 'Keahlian', 'All Members': 'Semua Ahli',
    'Installments': 'Ansuran', 'Broadcasts': 'Siaran', 'Sales & Reports': 'Jualan & Laporan',
    'Sales records': 'Rekod Jualan', 'Settings': 'Tetapan', 'Vouchers': 'Baucar', 'Referrals': 'Rujukan (Referral)',
    'Referral': 'Rujukan (Referral)', 'Win-back': 'Menang Semula (Win-back)',
    'Tiers & Earn Rules': 'Peringkat (Tier) & Peraturan Mata', 'My Outlet': 'Cawangan Saya',
    'Overview': 'Gambaran Keseluruhan', 'Reports': 'Laporan', 'Company': 'Syarikat', 'Team': 'Pasukan',
    'Integrations': 'Integrasi', 'Outlets': 'Cawangan',

    /* ---- buttons / actions ---- */
    'New Sale': 'Jualan Baharu', 'Add Member': 'Tambah Ahli', 'Save': 'Simpan', 'Save changes': 'Simpan Perubahan',
    'Create voucher': 'Cipta Baucar', 'Cancel': 'Batal', 'Delete': 'Padam', 'Edit': 'Edit', 'View': 'Lihat',
    'Open': 'Buka', 'Close': 'Tutup', 'Back': 'Kembali', 'Search': 'Cari', 'Apply': 'Guna', 'Filter': 'Tapis',
    'Redeem': 'Tebus', 'Claim': 'Tuntut', 'Confirm': 'Sahkan', 'Approve': 'Lulus', 'Export': 'Eksport',
    'Upload CSV': 'Muat Naik CSV', 'Download CSV': 'Muat Turun CSV', 'Add item': 'Tambah Item',
    'Issue Voucher': 'Keluarkan Baucar', 'Issue': 'Keluarkan', 'Redeem Points': 'Tebus Mata',
    'Adjust Points': 'Laras Mata', 'Edit Profile': 'Edit Profil', 'Send': 'Hantar', 'Continue': 'Teruskan',
    'View all': 'Lihat semua', 'View member': 'Lihat Ahli', 'Void / refund': 'Batal / Bayar Balik',
    'Add Member ': 'Tambah Ahli', 'Save sale': 'Simpan Jualan', 'Record sale': 'Rekod Jualan',
    'Edit outlet': 'Edit Cawangan', 'Redeem in-store': 'Tebus di Kedai', 'Claim →': 'Tuntut →',
    'Next': 'Seterusnya', 'Prev': 'Sebelumnya', 'Mark all read': 'Tanda semua dibaca',
    'Scan QR': 'Imbas QR', 'Enrol new': 'Daftar baharu', 'Browse active…': 'Lihat yang aktif…',
    'Sign out': 'Log keluar', 'Back to reports': 'Kembali ke laporan', 'Upload provider data': 'Muat naik data pembekal',
    'View full log': 'Lihat log penuh', 'View rules': 'Lihat peraturan', 'view rate card →': 'lihat kad kadar →',
    'Add item ': 'Tambah Item',

    /* ---- labels / stats ---- */
    'Points': 'Mata', 'Redeemable': 'Boleh Tebus', 'Status': 'Status', 'Balance': 'Baki',
    'Total spend': 'Jumlah Perbelanjaan', 'Total Members': 'Jumlah Ahli', 'Active Members': 'Ahli Aktif',
    'Tier': 'Peringkat (Tier)', 'Member': 'Ahli', 'Members': 'Ahli', 'Customer': 'Pelanggan', 'Customers': 'Pelanggan',
    'Outlet': 'Cawangan', 'Payment': 'Pembayaran', 'Payment Method': 'Kaedah Pembayaran', 'Invoice': 'Invois',
    'Date': 'Tarikh', 'Amount': 'Jumlah', 'Grams': 'Gram', 'Category': 'Kategori', 'Grade': 'Gred',
    'Top Category': 'Kategori Teratas', 'Last Purchase': 'Pembelian Terakhir', 'Last purchase': 'Pembelian terakhir',
    'Spend': 'Perbelanjaan', 'Expires': 'Tamat Tempoh', 'Active': 'Aktif', 'Used': 'Telah Guna',
    'Expired': 'Luput', 'Locked': 'Terkunci', 'Language': 'Bahasa', 'Help & Support': 'Bantuan & Sokongan',
    'Help & support': 'Bantuan & sokongan', 'Personal Info': 'Maklumat Peribadi', 'Purchase History': 'Sejarah Pembelian',
    'Points Activity': 'Aktiviti Mata', 'Points activity': 'Aktiviti mata', 'Message Preferences': 'Keutamaan Mesej',
    'Installment Plans': 'Pelan Ansuran', 'Notifications': 'Pemberitahuan', 'Recent Activity': 'Aktiviti Terkini',
    'Recent Earnings': 'Perolehan Terkini', 'Earned': 'Diperoleh', 'Redeemed': 'Ditebus', 'redeemed': 'ditebus',
    'Description': 'Penerangan', 'Terms': 'Terma', 'Terms & conditions': 'Terma & Syarat', 'Code': 'Kod',
    'Eligible tier': 'Peringkat (Tier) Layak', 'Discount value': 'Nilai Diskaun', 'My Vouchers': 'Baucar Saya',
    'Membership Card': 'Kad Keahlian', 'Your purchases': 'Pembelian Anda', 'Your installments': 'Ansuran Anda',
    'Tier Status': 'Status Peringkat (Tier)', 'Revenue': 'Hasil', 'Transactions': 'Transaksi', 'Avg sale': 'Purata Jualan',
    'Grams sold': 'Gram Terjual', 'Reward': 'Ganjaran', 'Reward due': 'Ganjaran Belum Diberi', 'Rewarded': 'Diberi Ganjaran',
    'Pending join': 'Belum Sertai', 'Referred friend': 'Rakan Dirujuk', 'Referrer': 'Perujuk',
    'Voucher expiry': 'Tamat Baucar', 'Status points': 'Mata Status', 'Redeemable points': 'Mata Boleh Tebus',
    'Claim a reward': 'Tuntut Ganjaran', 'Redeem your points': 'Tebus Mata Anda', 'Settled': 'Selesai',
    'Voided': 'Dibatalkan', 'Points balance': 'Baki Mata', 'Points Balance': 'Baki Mata',
    'How your tier works': 'Cara Peringkat Anda Berfungsi', 'How to redeem in-store': 'Cara Tebus di Kedai',
    'spend on rewards': 'belanja untuk ganjaran', 'keeps your tier': 'kekalkan peringkat',
    'Happy Birthday': 'Selamat Hari Lahir', 'Good afternoon': 'Selamat Petang', 'Good morning': 'Selamat Pagi', 'Good evening': 'Selamat Malam',
    'redeemable points · spendable': 'mata boleh tebus · boleh dibelanja', 'Member profile': 'Profil Ahli',
    'Design code': 'Kod Reka Bentuk', 'Units sold': 'Unit Terjual', 'Material': 'Bahan', 'Voucher detail': 'Butiran Baucar',
    'Frequently asked': 'Soalan Lazim', 'Point conversion': 'Penukaran Mata', 'Full name': 'Nama Penuh',
    'Phone': 'Telefon', 'Email': 'E-mel', 'IC Number': 'No. Kad Pengenalan', 'Joined': 'Menyertai',
    'DOB': 'Tarikh Lahir', 'Design': 'Reka Bentuk', 'Value': 'Nilai', 'Value Off': 'Potongan Nilai',
    'Total': 'Jumlah', 'Item': 'Item', 'Items': 'Item', 'Line total': 'Jumlah baris', 'Gross': 'Kasar',
    'gross / invoice': 'kasar / invois', 'Net paid': 'Bersih dibayar', 'Points awarded': 'Mata diberikan',
    'Entered by': 'Dimasukkan oleh', 'INVOICE NUMBER': 'NOMBOR INVOIS', 'Invoices': 'Invois',
    'Invoice · sales record': 'Invois · rekod jualan', 'SALE DATE / TIME': 'TARIKH / MASA JUALAN',
    'PAYMENT METHOD': 'KAEDAH PEMBAYARAN', 'Paying by': 'Bayar dengan', 'sales records': 'rekod jualan',
    'Grade · Grams': 'Gred · Gram', 'Started': 'Dimulakan', 'Last synced': 'Kemas kini kali akhir',
    'Sale date drives every report. Backdating beyond 7 days needs HQ Admin.': 'Tarikh jualan menentukan setiap laporan. Tarikh lampau melebihi 7 hari perlukan HQ Admin.',
    '— applies to installment (Atome) purchases too. Gold bars default upah 0.': '— turut terpakai untuk pembelian ansuran (Atome). Jongkong emas biasanya tiada upah.',
    'not voucher-eligible': 'tidak layak baucar', 'One voucher per transaction': 'Satu baucar setiap transaksi',
    'scan or type a code · one per transaction': 'imbas atau taip kod · satu setiap transaksi',
    'Term': 'Tempoh', 'Est. instalment': 'Anggaran ansuran', 'Frequency': 'Kekerapan', 'Monthly': 'Bulanan',
    'Atome file': 'Fail Atome', 'Shopee file': 'Fail Shopee', 'Grab file': 'Fail Grab',
    'Interaction Timeline': 'Garis Masa Interaksi', 'Purchase value trend': 'Trend nilai pembelian',
    'Purchase reward': 'Ganjaran pembelian', 'Purchases': 'Pembelian', 'Purchase': 'Pembelian',
    'Active Installment Plans': 'Pelan Ansuran Aktif', 'Gold Tier': 'Peringkat Gold',
    'Status · keeps tier': 'Status · kekalkan peringkat', 'View-only · Cashier': 'Lihat sahaja · Juruwang',
    'Gold Purchased · by grade': 'Emas Dibeli · mengikut gred', 'Gold value': 'Nilai Emas',

    /* ---- outlet / customers / list ---- */
    'All categories': 'Semua Kategori', 'All installments': 'Semua Ansuran', 'All members': 'Semua Ahli',
    'All referrals': 'Semua Rujukan', 'All status': 'Semua Status', 'All years': 'Semua Tahun',
    'all-time': 'sepanjang masa', 'Actions': 'Tindakan', 'Campaign': 'Kempen', 'Pending': 'Menunggu',
    'No purchases': 'Tiada pembelian', 'Has BNPL plan': 'Ada pelan BNPL', 'Yesterday': 'Semalam',
    'Company settings': 'Tetapan Syarikat', 'Dashboard is restricted for your role': 'Papan Pemuka dihadkan untuk peranan anda',
    'Signing you in…': 'Sedang log masuk…', 'Search members, plans, vouchers, outlets…': 'Cari ahli, pelan, baucar, cawangan…',
    'Cashier · Mydin Bukit Mertajam': 'Juruwang · Mydin Bukit Mertajam',
    'members here': 'ahli di sini', 'Active plans': 'Pelan Aktif', 'captured in ledger': 'direkod dalam lejar',
    'BNPL plans originated at this outlet.': 'Pelan BNPL berasal dari cawangan ini.',
    'Members whose home outlet is Mydin Bukit Mertajam.': 'Ahli yang cawangan asalnya Mydin Bukit Mertajam.',
    'MBM · Penang · hypermarket': 'MBM · Penang · pasar raya besar',
    'Mydin Bukit Mertajam · cashier: counter': 'Mydin Bukit Mertajam · juruwang: kaunter',

    /* ---- jewellery categories (standalone labels — SKU names "X Emas #" are left as data) ---- */
    'Rings': 'Cincin', 'Bangle': 'Gelang', 'Bangles': 'Gelang', 'Bracelets': 'Gelang Tangan',
    'Necklaces': 'Rantai Leher', 'Earrings': 'Subang', 'Pendants': 'Loket', 'Anklets': 'Gelang Kaki',
    'Gold Bar': 'Jongkong Emas', 'Gold Bars': 'Jongkong Emas', 'Gold Bars · Investment': 'Jongkong Emas · Pelaburan',
    'Silver Bar': 'Jongkong Perak', 'Silver Bars': 'Jongkong Perak', 'Silver Bars · Investment': 'Jongkong Perak · Pelaburan',
    'Gold bar / bullion': 'Jongkong emas / emas pelaburan',

    /* ---- new sale / purchase modal ---- */
    'Existing member': 'Ahli sedia ada', 'Cash': 'Tunai', 'Credit Card': 'Kad Kredit', 'Debit Card': 'Kad Debit',
    'Other': 'Lain-lain', 'BNPL / Installment': 'BNPL / Ansuran', 'No voucher applied.': 'Tiada baucar digunakan.',
    'One voucher per transaction': 'Satu baucar setiap transaksi', 'not voucher-eligible': 'tidak layak baucar',
    'Workmanship (upah)': 'Upah', 'Upah (workmanship) earns points but is': 'Upah dapat mata tetapi',
    'as the payment method to split this into monthly payments.': 'sebagai kaedah pembayaran untuk membahagikannya kepada bayaran bulanan.',
    'Plan': 'Pelan', 'not enrolled': 'belum daftar',

    /* ---- tiers & earn rules ---- */
    'Earn Rules · Points Accrual': 'Peraturan Mata · Pengumpulan Mata',
    'Points Accrual Matrix · By Gold Grade': 'Matriks Pengumpulan Mata · Mengikut Gred Emas',
    'Purchase · Others': 'Pembelian · Lain-lain', 'Basis': 'Asas', 'Rule': 'Peraturan', 'Note': 'Nota',
    'Qualifies': 'Layak', 'Premium': 'Premium', 'Seasonal': 'Bermusim', 'Early access': 'Akses awal',
    'Early Access': 'Akses Awal', 'VIP events': 'Acara VIP', 'Welcome': 'Selamat Datang',
    'Welcome reward': 'Ganjaran Selamat Datang', 'Birthday': 'Hari Lahir', 'Birthday bonus': 'Bonus Hari Lahir',
    'Birthday reward': 'Ganjaran Hari Lahir', 'Birthday reward · redeemed': 'Ganjaran Hari Lahir · ditebus',
    'Birthday gift': 'Hadiah Hari Lahir', 'Successful referral': 'Rujukan berjaya', 'on sign-up': 'semasa pendaftaran',
    'from date of issue': 'dari tarikh dikeluarkan', 'one-time / year': 'sekali / tahun', 'no limit': 'tiada had',
    'per referral · no limit': 'setiap rujukan · tiada had', 'Flat by weight': 'Tetap mengikut berat',
    'paid after friend’s first qualifying buy': 'dibayar selepas pembelian layak pertama rakan',
    'Auto-issued on DOB · contracted trigger': 'Dikeluarkan auto pada Tarikh Lahir · pencetus kontrak',
    'Customer Referral Programme': 'Program Rujukan Pelanggan', 'Voucher validity': 'Tempoh sah baucar',

    /* ---- vouchers ---- */
    'ACTIVE': 'AKTIF', 'USED': 'TELAH GUNA', 'EXPIRED': 'LUPUT', 'LOCKED': 'TERKUNCI',
    'Voucher': 'Baucar', 'VOUCHER': 'BAUCAR', 'Voucher Pool': 'Kumpulan Baucar', 'Voucher Stats': 'Statistik Baucar',
    'Voucher credit earned': 'Kredit baucar diperoleh', 'Voucher expiring soon': 'Baucar akan luput tidak lama lagi',
    'Vouchers · per week': 'Baucar · setiap minggu', 'Recent Redemptions': 'Penebusan Terkini',
    'Redemption Trend': 'Trend Penebusan', 'Redemption rules': 'Peraturan penebusan', 'Redeemed / Issued': 'Ditebus / Dikeluarkan',
    'Issued': 'Dikeluarkan', 'Policy': 'Dasar', 'When': 'Bila', 'In store': 'Di kedai', 'GIFT': 'HADIAH',
    'Applied at checkout': 'Digunakan semasa pembayaran', 'Member presents': 'Ahli menunjukkan',
    'Cashier enters it': 'Juruwang memasukkannya', 'the voucher QR or code from their app': 'QR atau kod baucar dari aplikasi mereka',
    'in New Sale → Voucher (scan or type)': 'dalam Jualan Baharu → Baucar (imbas atau taip)',
    'First-time member sign-up gift': 'Hadiah pendaftaran ahli kali pertama',
    'Chinese New Year promo': 'Promosi Tahun Baharu Cina', 'Gold tier-maintenance offer': 'Tawaran kekalkan Peringkat Gold',
    'Aidiladha gift purchase': 'Pembelian hadiah Aidiladha', 'Warisan Malaya purchase': 'Pembelian Warisan Malaya',
    'Pesona Tiga Collection': 'Koleksi Pesona Tiga', 'VIP Preview': 'Pratonton VIP', 'Birthday Special': 'Istimewa Hari Lahir',
    'Birthday gift · redeemed': 'Hadiah Hari Lahir · ditebus', 'Merdeka Charms · lapsed': 'Merdeka Charms · tamat tempoh',
    'Only HQ Admin can issue or void vouchers': 'Hanya Admin HQ boleh keluarkan atau batalkan baucar',
    'Cannot be exchanged for cash · non-transferable': 'Tidak boleh ditukar dengan tunai · tidak boleh dipindah milik',
    'Not valid on workmanship (upah)': 'Tidak sah untuk upah',
    'Applies to BNPL / installment purchases too': 'Turut terpakai untuk pembelian BNPL / ansuran',
    'one per transaction, before any BNPL split': 'satu setiap transaksi, sebelum sebarang pecahan BNPL',
    'Points Liability': 'Tanggungan Mata',

    /* ---- referrals ---- */
    'Referral Ledger': 'Lejar Rujukan', 'Total Referrals': 'Jumlah Rujukan', 'Ref ID': 'ID Rujukan',
    'Conversion': 'Penukaran', 'Qualified': 'Layak', 'Qualified · reward due': 'Layak · ganjaran belum diberi',
    'Reward Due': 'Ganjaran Belum Diberi', 'Reward Issued': 'Ganjaran Dikeluarkan', 'HQ approval': 'Kelulusan HQ',
    'Awaiting HQ Approval': 'Menunggu Kelulusan HQ', 'held as voucher': 'disimpan sebagai baucar',
    'signed up → active': 'mendaftar → aktif', 'Rate card': 'Kad Kadar',
    /* referral programme dialog + voucher-only / how-to-redeem messaging */
    'Referral programme': 'Program Rujukan', 'Referral rate card': 'Kad Kadar Rujukan',
    'Jewellery reward': 'Ganjaran barang kemas', '916 jewellery · no cap': 'barang kemas 916 · tiada had',
    'Gold bar / bullion': 'Jongkong emas / emas pelaburan', 'Flat rebate per weight': 'Rebat rata ikut berat',
    'see the referral rate card': 'lihat kad kadar rujukan', 'Qualifies': 'Kelayakan',
    "Referred friend's 1st purchase": 'Pembelian pertama rakan dirujuk', 'Reward form': 'Bentuk ganjaran',
    'In-store voucher only': 'Baucar dalam kedai sahaja', 'cannot be exchanged for cash': 'tidak boleh ditukar dengan tunai',
    'How members redeem': 'Cara ahli menebus', 'At the till, next purchase': 'Di kaunter, pembelian seterusnya',
    'Rewards ▸ voucher QR · one per transaction': 'Ganjaran ▸ QR baucar · satu setiap transaksi',
    'Auto-approval': 'Kelulusan automatik', 'from issue': 'dari tarikh dikeluarkan',
    'Codes': 'Kod', 'One code per member': 'Satu kod setiap ahli',
    'voucher only · no cash': 'baucar sahaja · tiada tunai',
    'Reference only — programme rules are configured by Goldfinch HQ. Referral rewards are voucher-only and cannot be exchanged for cash. Goldfinch Group Berhad reserves the right to amend the terms and conditions without prior notice.': 'Rujukan sahaja — peraturan program ditetapkan oleh HQ Goldfinch. Ganjaran rujukan adalah baucar sahaja dan tidak boleh ditukar dengan tunai. Goldfinch Group Berhad berhak meminda terma dan syarat tanpa notis terlebih dahulu.',

    /* ---- search placeholders / titles / aria-labels / helper text ---- */
    'Key in a new sale': 'Kunci masuk jualan baharu', 'Open invoice': 'Buka invois',
    'Rows per page': 'Baris setiap halaman', 'Filter purchases by year': 'Tapis pembelian mengikut tahun',
    'Signing you in…': 'Sedang log masuk…', 'View rate card': 'Lihat kad kadar', 'Design line': 'Baris reka bentuk',
    'Start typing — members, invoices, plans, design codes, outlets, vouchers, referrals.': 'Mula menaip — ahli, invois, pelan, kod reka bentuk, cawangan, baucar, rujukan.',
    'Scan card, or type phone / IC / member ID…': 'Imbas kad, atau taip telefon / IC / ID ahli…',
    "Scan the voucher QR from the member's phone": 'Imbas QR baucar dari telefon ahli',
    'Search customer, plan ID, invoice, item, or member ID…': 'Cari pelanggan, ID pelan, invois, item, atau ID ahli…',
    'Search material…': 'Cari bahan…', 'Search outlet…': 'Cari cawangan…',
    'Search name, phone, member ID, or IC…': 'Cari nama, telefon, ID ahli, atau IC…',
    'Search referrer or referee…': 'Cari perujuk atau dirujuk…',
    'Search this outlet’s invoices…': 'Cari invois cawangan ini…',
    'Search this outlet’s members…': 'Cari ahli cawangan ini…',
    'Search this outlet’s plans…': 'Cari pelan cawangan ini…',
    'Every invoice rung up at this outlet — open any one for the full breakdown.': 'Setiap invois yang direkod di cawangan ini — buka mana-mana untuk perincian penuh.',
    'Higher-purity gold earns fewer points per RM (higher unit value). Same for every tier.': 'Emas lebih tulen dapat mata lebih sedikit setiap RM (nilai setiap unit lebih tinggi). Sama untuk setiap peringkat.',
    'Members earn a gold-weight reward for every friend they bring in — no cap.': 'Ahli dapat ganjaran ikut berat emas bagi setiap rakan yang dibawa masuk — tiada had.',
    'Points calculated on the total bill including workmanship (upah).': 'Mata dikira atas jumlah bil termasuk upah.',
    'Points earned by gold grade on the total bill including workmanship — same rate for every tier.': 'Mata diperoleh mengikut gred emas atas jumlah bil termasuk upah — kadar sama untuk setiap peringkat.',
    'Estimated from plan term and start date. Goldfinch is paid in full at point of sale and does not receive repayment data from the provider.': 'Dianggarkan daripada tempoh pelan dan tarikh mula. Goldfinch dibayar penuh pada masa jualan dan tidak menerima data bayaran balik daripada pembekal.',
    'Estimated from plan term and start date. Goldfinch is paid in full at point of sale; it does not receive repayment data from the provider.': 'Dianggarkan daripada tempoh pelan dan tarikh mula. Goldfinch dibayar penuh pada masa jualan; ia tidak menerima data bayaran balik daripada pembekal.',

    /* ---- reports / atome / BNPL ---- */
    'Adoption': 'Penggunaan', 'Avg purchase': 'Purata Pembelian', 'Combined': 'Gabungan', 'Custom': 'Tersuai',
    'Elapsed': 'Berlalu', 'Final month': 'Bulan akhir', 'New Plans': 'Pelan Baharu', 'Next scheduled': 'Dijadualkan seterusnya',
    'Others': 'Lain-lain', 'Plans': 'Pelan', 'PLANS': 'PELAN', 'Progress': 'Kemajuan', 'Provider': 'Pembekal',
    'Scheduled': 'Dijadualkan', 'Sales value': 'Nilai jualan', 'SALES VALUE': 'NILAI JUALAN',
    'AVG SALE': 'PURATA JUALAN', 'AVG BNPL SALE': 'PURATA JUALAN BNPL', 'BNPL SALES VALUE': 'NILAI JUALAN BNPL',
    'BNPL SHARE': 'BAHAGIAN BNPL', 'PLANS ON RECORD': 'PELAN DIREKODKAN', 'PLANS STARTED': 'PELAN DIMULAKAN',
    'Plan ID': 'ID Pelan', 'Plan value': 'Nilai pelan', 'Per plan': 'Setiap pelan', 'Plans by Provider': 'Pelan mengikut Pembekal',
    'Plans · Boost & Aeon Credit': 'Pelan · Boost & Aeon Credit', 'Share of all plans': 'Bahagian semua pelan',
    'of gross sales': 'daripada jualan kasar', 'This month': 'Bulan ini', 'This wk': 'Mgu ini',
    'BNPL installment provider': 'Pembekal ansuran BNPL', 'Revenue recognised via BNPL': 'Hasil diiktiraf melalui BNPL',
    'Recognised via Atome': 'Diiktiraf melalui Atome', 'Recognised via Grab': 'Diiktiraf melalui Grab',
    'Recognised via Shopee': 'Diiktiraf melalui Shopee', 'Monthly BNPL sales value recognised (RM)': 'Nilai jualan BNPL bulanan diiktiraf (RM)',
    'Tracked via CRM entry · no live provider API': 'Dijejak melalui kemasukan data CRM · tiada API pembekal langsung',

    /* ---- design page ---- */
    'Design code not found.': 'Kod reka bentuk tidak ditemui.',

    /* ---- notifications / search modal ---- */
    'Search Goldfinch': 'Cari Goldfinch', 'April report ready': 'Laporan April sedia',
    'Member birthday': 'Hari lahir ahli', 'Payment schedule courtesy reminder': 'Peringatan mesra jadual pembayaran',
    'Monthly sales & tier report generated': 'Laporan jualan & peringkat bulanan dijana',
    'Every transaction · grams per gold grade · linked invoices': 'Setiap transaksi · gram mengikut gred emas · invois berkaitan',
    'Voucher credit earned ': 'Kredit baucar diperoleh',

    /* ---- misc long copy ---- */
    '— Elapsed': '— Berlalu', '· choose': '· pilih', '· keyed': '· kunci masuk',
    '· scan or type a code · one per transaction': '· imbas atau taip kod · satu setiap transaksi',
    '(sticky · redemption-safe)': '(kekal · selamat untuk tebus)', 'in-store · Hafiz Rahman': 'di kedai · Hafiz Rahman',
    'Mother’s Day promo · message delivered + read.': 'Promosi Hari Ibu · mesej dihantar + dibaca.',
    'Mother\'s Day promo · message delivered + read.': 'Promosi Hari Ibu · mesej dihantar + dibaca.',
    'WhatsApp · Auto': 'WhatsApp · Auto',

    /* ======================================================================
       ---- portal (member app) — Home · Wallet · Rewards · Refer · Profile ----
       Member-facing loyalty-app copy. Register: standard, warm BM as used by
       Google/Apple/WhatsApp/Grab/Shopee Malay phone UIs. Tier names
       Entry/Bronze/Silver/Gold (+ UPPERCASE) stay English (brand tiers).
       ====================================================================== */
    /* home + marketing rail */
    'For You': 'Untuk Anda', 'Promotions': 'Promosi', 'Marketing': 'Pemasaran', 'Up Next': 'Seterusnya',
    'Next installment': 'Ansuran Seterusnya', 'Amount due': 'Jumlah Perlu Dibayar', 'Due now': 'Perlu Dibayar Sekarang',
    'Tomorrow': 'Esok', 'View plan': 'Lihat Pelan', 'Back to Goldfinch home': 'Kembali ke laman utama Goldfinch',
    'Bella — brand ambassador photo placeholder': 'Bella — pengganti foto duta jenama',
    'Your birthday gift is ready': 'Hadiah hari lahir anda sudah sedia', 'Gold · top tier': 'Gold · peringkat teratas',
    'New arrivals · limited pieces': 'Ketibaan baharu · koleksi terhad', 'Gold Bar · Member Price': 'Jongkong Emas · Harga Ahli',
    'Member-only rate, in-app': 'Harga khas ahli, dalam apl', 'Refer a Friend': 'Rujuk Rakan', 'pts': 'mata',

    /* wallet / membership card */
    'Add to': 'Tambah ke', 'Affordable Luxury for Everyone': 'Kemewahan Mampu Milik untuk Semua',
    'Home outlet': 'Cawangan Asal', 'Member ID': 'ID Ahli', 'Refresh': 'Kemas kini', 'Scan at counter': 'Imbas di Kaunter',
    'Move your phone or drag the card · scan below at any counter': 'Gerakkan telefon atau seret kad · imbas di bawah di mana-mana kaunter',
    'Scannable at any Goldfinch counter — no plastic, no app to install.': 'Boleh diimbas di mana-mana kaunter Goldfinch — tiada kad plastik, tiada apl untuk dipasang.',
    'View membership details': 'Lihat Butiran Keahlian',

    /* profile / account home */
    'Account': 'Akaun', 'Appearance': 'Penampilan', 'LIGHT': 'TERANG', 'DARK': 'GELAP',
    'Light theme · tap to switch': 'Tema terang · ketik untuk tukar', 'Dark theme · tap to switch': 'Tema gelap · ketik untuk tukar',
    'View full benefits': 'Lihat semua faedah', 'Name, phone, email, DOB': 'Nama, telefon, e-mel, tarikh lahir',
    'Every point earned & redeemed': 'Setiap mata diperoleh & ditebus', 'WhatsApp · SMS · Email opt-ins': 'Pilihan WhatsApp · SMS · E-mel',
    'English · BM available': 'English · BM tersedia', 'FAQ, contact Goldfinch': 'Soalan Lazim, hubungi Goldfinch',
    'Refer & Earn': 'Rujuk & Menang', 'Orders': 'Pesanan', 'Spent': 'Dibelanja',

    /* message preferences */
    'Message preferences': 'Keutamaan Mesej', 'Promotions & campaigns': 'Promosi & kempen',
    'New collections, offers & tier rewards': 'Koleksi baharu, tawaran & ganjaran peringkat', 'Offers by text message': 'Tawaran melalui mesej SMS',
    'Payment schedule reminders': 'Peringatan jadual pembayaran', 'Before each installment is due': 'Sebelum setiap ansuran perlu dibayar',
    'Backup reminder by text': 'Peringatan sandaran melalui SMS', 'Account & security': 'Akaun & keselamatan',
    'Purchase & payment receipts': 'Resit pembelian & pembayaran', 'Always on — required for your account': 'Sentiasa aktif — diperlukan untuk akaun anda',
    'Turn these off any time — you’ll still get everything below.': 'Matikan bila-bila masa — anda masih menerima semua yang di bawah.',
    'Keep at least one on so you don’t miss an installment payment.': 'Kekalkan sekurang-kurangnya satu supaya anda tidak terlepas bayaran ansuran.',
    'Your choices are logged with a timestamp. Transactional messages are always sent.': 'Pilihan anda direkodkan dengan cap masa. Mesej transaksi sentiasa dihantar.',

    /* personal info */
    'Personal info': 'Maklumat Peribadi', 'IC number': 'No. Kad Pengenalan', 'Date of birth': 'Tarikh Lahir',
    'Contact us on WhatsApp': 'Hubungi kami di WhatsApp',
    'To change your details, visit any Goldfinch outlet with your IC — our staff will update them for you.': 'Untuk menukar butiran anda, kunjungi mana-mana cawangan Goldfinch dengan kad pengenalan anda — kakitangan kami akan mengemas kininya untuk anda.',
    'Your details are held securely by Goldfinch.': 'Butiran anda disimpan dengan selamat oleh Goldfinch.',

    /* language */
    'Default': 'Asal',

    /* rewards — claim + list + how-to-redeem */
    'Spend redeemable points to claim a voucher — it lands in': 'Belanja mata boleh tebus untuk menuntut baucar — ia masuk ke',
    'below, ready to show in-store. Claiming': 'di bawah, sedia ditunjukkan di kedai. Menuntut',
    'doesn\'t touch your status points or tier': 'tidak menjejaskan mata status atau peringkat anda',
    'redeemable pts': 'mata boleh tebus', 'Not enough pts': 'Mata tidak mencukupi',
    'Tap Redeem': 'Ketik Tebus', 'on any active voucher above': 'pada mana-mana baucar aktif di atas',
    'Show the QR or code': 'Tunjukkan QR atau kod', 'to the cashier at any Goldfinch outlet': 'kepada juruwang di mana-mana cawangan Goldfinch',
    'They apply it': 'Mereka menggunakannya', 'to your purchase at checkout': 'pada pembelian anda semasa pembayaran',
    'One voucher per transaction · Not valid on workmanship (upah) · Cannot be exchanged for cash · Non-transferable · Subject to each voucher\'s own validity date. Goldfinch Group Berhad reserves the right to amend the terms and conditions without prior notice.': 'Satu baucar setiap transaksi · Tidak sah untuk upah · Tidak boleh ditukar dengan tunai · Tidak boleh dipindah milik · Tertakluk pada tarikh sah setiap baucar. Goldfinch Group Berhad berhak meminda terma dan syarat tanpa notis terlebih dahulu.',
    'Your Gold benefits': 'Faedah Gold Anda', 'No vouchers in this category yet.': 'Tiada baucar dalam kategori ini lagi.',
    'VIP vouchers · 7-day early access · priority service · VIP events': 'Baucar VIP · akses awal 7 hari · perkhidmatan keutamaan · acara VIP',
    'SELECTED OUTLETS': 'CAWANGAN TERPILIH', 'FESTIVE': 'PERAYAAN', 'OFFER': 'TAWARAN', 'WELCOME': 'SELAMAT DATANG', 'WIN-BACK': 'MENANG SEMULA (WIN-BACK)',
    'Gift': 'Hadiah', 'Voucher code': 'Kod Baucar', 'Done': 'Selesai',
    'Show this QR to the cashier at any Goldfinch outlet. Once they scan it, the voucher is applied to your purchase and marked used automatically.': 'Tunjukkan QR ini kepada juruwang di mana-mana cawangan Goldfinch. Setelah mereka mengimbasnya, baucar akan digunakan pada pembelian anda dan ditanda telah guna secara automatik.',
    'One voucher per transaction · not valid on workmanship (upah) · non-transferable · no cash value.': 'Satu baucar setiap transaksi · tidak sah untuk upah · tidak boleh dipindah milik · tiada nilai tunai.',
    'Claim reward': 'Tuntut Ganjaran', 'Redeemable now': 'Boleh ditebus sekarang', 'After claiming': 'Selepas menuntut', 'Costs': 'Kos',

    /* voucher detail sheet + T&C bullets */
    'Any Goldfinch outlet, nationwide': 'Mana-mana cawangan Goldfinch, seluruh negara',
    'Minimum spend': 'Perbelanjaan Minimum', 'Redeemable at': 'Boleh Ditebus di', 'Valid until': 'Sah sehingga', 'All tiers': 'Semua Peringkat (Tier)',
    'Cannot be used to offset the workmanship fee (upah).': 'Tidak boleh digunakan untuk menolak caj upah.',
    'Non-transferable, no cash value.': 'Tidak boleh dipindah milik, tiada nilai tunai.', 'One per member.': 'Satu setiap ahli.',
    'Single transaction; unused balance forfeited.': 'Satu transaksi; baki tidak digunakan akan hangus.',
    'Goldfinch Group Berhad reserves the right to amend the terms and conditions without prior notice.': 'Goldfinch Group Berhad berhak meminda terma dan syarat tanpa notis terlebih dahulu.',
    'Must be used in a single transaction.': 'Mesti digunakan dalam satu transaksi.', 'Any unused balance is forfeited.': 'Sebarang baki tidak digunakan akan hangus.',
    'Cannot be exchanged for cash.': 'Tidak boleh ditukar dengan tunai.', 'Non-transferable.': 'Tidak boleh dipindah milik.',
    'One voucher per transaction; unused balance forfeited.': 'Satu baucar setiap transaksi; baki tidak digunakan akan hangus.',
    'Auto-issued on your birthday.': 'Dikeluarkan automatik pada hari lahir anda.', 'Converted from referral credit.': 'Ditukar daripada kredit rujukan.',
    'Converted from referral credit': 'Ditukar daripada kredit rujukan',

    /* referral-credit → voucher convert sheet */
    'Convert referral credit': 'Tukar Kredit Rujukan', 'Credit available': 'Kredit tersedia', 'After converting': 'Selepas menukar',
    'voucher value': 'nilai baucar', 'Not now': 'Bukan sekarang', 'The voucher lands in': 'Baucar ini masuk ke',

    /* refer & earn page */
    'Referral credit available': 'Kredit Rujukan Tersedia', 'Voucher only · no cash': 'Baucar sahaja · tiada tunai',
    'Convert to voucher': 'Tukar kepada Baucar', 'Your Referral Code': 'Kod Rujukan Anda', 'Copy code': 'Salin kod',
    'Share with friends': 'Kongsi dengan rakan', 'How It Works': 'Cara Ia Berfungsi', 'Share your code': 'Kongsi kod anda',
    'Send your code to friends & family.': 'Hantar kod anda kepada rakan & keluarga.', 'They join & buy': 'Mereka sertai & beli',
    'Your friend signs up and makes their first qualifying purchase.': 'Rakan anda mendaftar dan membuat pembelian layak pertama mereka.',
    'You earn credit': 'Anda peroleh kredit', 'Convert & redeem': 'Tukar & Tebus', 'Referring gold bars & bullion?': 'Merujuk jongkong emas & emas pelaburan?',
    'Rates': 'Kadar', 'Give gold,': 'Beri emas,', 'get gold.': 'dapat emas.', 'Earn': 'Peroleh',
    'your friends purchase — no limit.': 'rakan anda beli — tiada had.', 'Your Referrals': 'Rujukan Anda',
    'No referrals yet — share your code above.': 'Tiada rujukan lagi — kongsi kod anda di atas.', 'Referral rewards': 'Ganjaran Rujukan',

    /* tier ladder (Tier Status page) */
    'Page not found': 'Halaman tidak ditemui', 'Back to Home': 'Kembali ke Utama', 'We couldn\'t find': 'Kami tidak menemui',
    'A ladder worth': 'Tangga yang berbaloi', 'climbing.': 'didaki.',
    'Earn points on every Goldfinch purchase. Climb tiers, unlock benefits.': 'Peroleh mata pada setiap pembelian Goldfinch. Naik peringkat, buka faedah.',
    'Status points · keeps your tier': 'Mata status · mengekalkan peringkat anda', 'Benefits By Tier': 'Faedah Mengikut Peringkat', 'Swipe': 'Leret',
    'Reach it with status points': 'Capai dengan mata status', 'Keep it with a minimum purchase': 'Kekalkan dengan pembelian minimum',
    'Earn status points on every purchase. Once you cross a tier, it\'s yours —': 'Peroleh mata status pada setiap pembelian. Setelah anda melepasi satu peringkat, ia milik anda —',
    'redeeming points never drops your tier': 'menebus mata tidak pernah menurunkan peringkat anda',
    'Make at least the minimum purchase each 12 months to renew —': 'Buat sekurang-kurangnya pembelian minimum setiap 12 bulan untuk memperbaharui —',
    'Earn points on every purchase': 'Peroleh mata pada setiap pembelian', 'Digital membership card': 'Kad keahlian digital',
    'Seasonal vouchers': 'Baucar bermusim', 'Exclusive vouchers': 'Baucar eksklusif', 'Early access to new pieces': 'Akses awal ke koleksi baharu',
    'Priority service': 'Perkhidmatan keutamaan', 'VIP vouchers': 'Baucar VIP', 'welcome points': 'mata selamat datang', 'to qualify': 'untuk layak',

    /* installments (member) */
    'Buy-now-pay-later plans · 0% interest': 'Pelan beli-sekarang-bayar-kemudian · 0% faedah', 'Next payment': 'Bayaran Seterusnya',
    'Outstanding': 'Baki Tertunggak', 'Fully paid': 'Bayar Sepenuhnya', 'Plan complete': 'Pelan selesai', 'Completed': 'Selesai',
    'On track': 'Mengikut jadual', 'Remind me before due': 'Ingatkan saya sebelum tarikh', 'No active installment plans.': 'Tiada pelan ansuran aktif.',

    /* purchase history + points activity (member) */
    'No purchases yet.': 'Tiada pembelian lagi.', 'spent on rewards': 'dibelanja untuk ganjaran', 'No points activity yet.': 'Tiada aktiviti mata lagi.',
    'Purchase rewards are earned by gold grade —': 'Ganjaran pembelian diperoleh mengikut gred emas —',

    /* sign-in screen */
    'Member sign-in': 'Log Masuk Ahli', 'Welcome back to': 'Selamat kembali ke', 'Sign in': 'Log Masuk',
    'Your points, vouchers and installment plans — all in one place.': 'Mata, baucar dan pelan ansuran anda — semua di satu tempat.',
    'Phone or Member ID': 'Telefon atau ID Ahli', 'Use a one-time SMS code instead': 'Guna kod SMS sekali guna',
    'New to Goldfinch?': 'Baharu di Goldfinch?', 'Join in-store': 'Sertai di kedai',

    /* ---- small / status words ---- */
    'Today': 'Hari Ini', 'Walk-in': 'Tanpa Ahli', 'All Tiers': 'Semua Peringkat (Tier)', 'Reference only': 'Rujukan sahaja',
    'active': 'aktif', 'paused': 'dijeda', 'expired': 'luput', 'locked': 'terkunci',
    'System': 'Sistem'
  };

  /* translate the free-text tail of a voucher label ("· Welcome", "· exp # months from join" …)
     while leaving campaign/season/code tokens (CNY, Hari Raya, Aidiladha, Pesona Tiga, WELCOME30…). */
  function vtail(t) {
    if (!t) return t;
    t = t.replace(/Welcome/g, 'Selamat Datang');
    t = t.replace(/Win-back/g, 'Menang Semula (Win-back)');
    t = t.replace(/Birthday/g, 'Hari Lahir');
    t = t.replace(/Points reward/g, 'Ganjaran mata');       // portal: claimed-with-points voucher
    t = t.replace(/Referral reward/g, 'Ganjaran rujukan');  // portal: converted referral voucher
    t = t.replace(/([\d,]+) months from join/g, '$1 bulan dari tarikh sertai');
    t = t.replace(/\bexp\b/g, 'luput');
    return t;
  }

  /* PATTERN rules — ordered specific → generic; first whole-string match wins. */
  var MP = [
    /* voucher discount lines (data-preserving) */
    [/^(\d+\s+\w+\s+\d+)\s+·\s+(RM\s*[\d,]+(?:\.\d+)?)\s+OFF(.*)$/, function (m, d, money, t) { return d + ' · ' + money + ' POTONGAN' + vtail(t); }],
    [/^(RM\s*[\d,]+(?:\.\d+)?)\s+OFF(.*)$/, function (m, money, t) { return money + ' POTONGAN' + vtail(t); }],
    [/^(RM\s*[\d,]+(?:\.\d+)?) purchase = ([\d,]+(?:\.\d+)?) points$/, 'Pembelian $1 = $2 mata'],
    [/^(RM\s*[\d,]+(?:\.\d+)?) spent$/, '$1 dibelanja'],
    [/^(RM\s*[\d,]+(?:\.\d+)?) \/ (g|gram) referred$/, '$1 / $2 dirujuk'],

    /* notifications with a leading name (kept) */
    [/^(.+) · ([\d.,]+)-pt bonus queued$/, '$1 · bonus $2-mata dalam giliran'],
    [/^(.+) (Shopee PayLater|GrabPayLater|Atome|Boost PayFlex|Aeon Credit) schedule$/, '$1 jadual $2'],
    [/^(Atome|GrabPayLater|Shopee PayLater) · BNPL Sales · ([\d.,]+) months$/, '$1 · Jualan BNPL · $2 bulan'],
    [/^Provider data last synced (.+)$/, 'Data pembekal dikemas kini kali akhir $1'],
    [/^Across ([\d.,]+) outlets · auto-welcome sent$/, 'Di $1 cawangan · ucapan selamat datang auto dihantar'],
    [/^([\d.,]+) new members this week$/, '$1 ahli baharu minggu ini'],
    [/^([\d.,]+) new plans · last ([\d.,]+) days$/, '$1 pelan baharu · $2 hari lepas'],
    [/^(GF-[\d-]+) · ([\d,]+(?:\.\d+)?) pts · total spend (RM\s*[\d,]+(?:\.\d+)?)$/, '$1 · $2 mata · jumlah belanja $3'],
    [/^([A-Z][a-z]+) report ready$/, 'Laporan $1 sedia'],

    /* count-with-label */
    [/^Customers · ([\d.,]+)$/, 'Pelanggan · $1'],
    [/^Sales records · ([\d.,]+)$/, 'Rekod Jualan · $1'],
    [/^Installment plans · ([\d.,]+)$/, 'Pelan Ansuran · $1'],
    [/^Line items · ([\d.,]+)$/, 'Item baris · $1'],
    [/^members · ([\d.,]+%?)$/, 'ahli · $1'],
    [/^Inbox · ([\d.,]+) updates$/, 'Peti Masuk · $1 kemas kini'],
    [/^Mydin · ([\d.,]+) members on file$/, 'Mydin · $1 ahli berdaftar'],
    [/^Showing all ([\d.,]+) vouchers$/, 'Menunjukkan semua $1 baucar'],
    [/^Within ([\d.,]+) days · ([\d.,]+) expiring$/, 'Dalam $1 hari · $2 akan luput'],
    [/^([\d.,]+) purchases · page ([\d.,]+) of ([\d.,]+)$/, '$1 pembelian · halaman $2 daripada $3'],

    /* tier / maintenance */
    [/^Keep Gold tier · rolling ([\d.,]+) months$/, 'Kekalkan Peringkat Gold · $1 bulan berturut'],
    [/^Maintain · ([\d.,]+)mo$/, 'Kekalkan · $1bln'],
    [/^Dormant \(([\d.,]+)mo inactive\)$/, 'Tidak Aktif ($1bln tidak aktif)'],
    [/^Min\. purchase (RM\s*[\d,]+(?:\.\d+)?) \/ ([\d,]+) mo [—-] (met|not met)( · RM\s*[\d,]+(?:\.\d+)?)?$/, function (m, money, mo, state, tail) { return 'Pembelian min. ' + money + ' / ' + mo + ' bln — ' + (state === 'met' ? 'dipenuhi' : 'belum dipenuhi') + (tail || ''); }],
    [/^Expiring Soon · ([\d.,]+)d$/, 'Akan Luput · $1h'],
    [/^Top Performing · ([\d.,]+)d$/, 'Prestasi Terbaik · $1h'],
    [/^NEW PLANS · ([\d.,]+)d$/, 'PELAN BARU · $1h'],
    [/^TIER STRUCTURE · ([\d.,]+) MEMBERS$/, 'STRUKTUR PERINGKAT (TIER) · $1 AHLI'],

    /* interaction timeline */
    [/^Birthday bonus · ([\d.,]+) pts issued\.$/, 'Bonus Hari Lahir · $1 mata diberikan.'],
    [/^Gold achieved · ([\d.,]+) status pts$/, 'Gold dicapai · $1 mata status'],
    [/^Points redeemed · (RM\s*[\d,]+(?:\.\d+)?) voucher$/, 'Mata ditebus · baucar $1'],
    [/^Voucher (.+) redeemed · (RM\s*[\d,]+(?:\.\d+)?) off\.$/, 'Baucar $1 ditebus · $2 potongan.'],
    [/^Loket Pesona Tiga · (RM\s*[\d,]+(?:\.\d+)?) · paid CC\.$/, 'Loket Pesona Tiga · $1 · bayar CC.'],
    [/^Merdeka Charms · ([\d.,]+) days early$/, 'Merdeka Charms · $1 hari awal'],
    [/^Rantai ([\d.,]+)\+ purchases$/, 'Rantai $1+ pembelian'],

    /* bonus points */
    [/^([\d.,]+) Bonus Pts · Birthday$/, '$1 Mata Bonus · Hari Lahir'],
    [/^([\d.,]+) Bonus Points · (.+)$/, '$1 Mata Bonus · $2'],
    [/^([\d.,]+) Bonus Pts · (.+)$/, '$1 Mata Bonus · $2'],
    [/^([\d.,]+) Bonus Points$/, '$1 Mata Bonus'],
    [/^([\d.,]+) Bonus Pts$/, '$1 Mata Bonus'],
    [/^([\d.,]+) unredeemed pts × (RM\s*[\d,]+(?:\.\d+)?)$/, '$1 mata belum tebus × $2'],
    [/^Earns ~([\d.,]+) pts$/, 'Dapat ~$1 mata'],

    /* purchase-by-grade lines */
    [/^Purchase · ([\d.,]+) Pure Gold$/, 'Pembelian · $1 Emas Tulen'],
    [/^Purchase · ([\d.,]+) Gold$/, 'Pembelian · $1 Emas'],

    /* elapsed */
    [/^([\d.,]+) of ([\d.,]+) elapsed$/, '$1 daripada $2 berlalu'],
    [/^([\d.,]+) \/ ([\d.,]+) elapsed$/, '$1 / $2 berlalu'],
    [/^\/ ([\d.,]+) elapsed \(est\.\)$/, '/ $1 berlalu (anggaran)'],
    [/^([\d.,]+) \/ ([\d.,]+) etc · RM([\d.,]+) = ([\d.,]+) points$/, '$1 / $2 dll · RM$3 = $4 mata'],
    [/^Others · ([\d.,]+) \/ ([\d.,]+)$/, 'Lain-lain · $1 / $2'],

    /* VIP preview + voucher grants */
    [/^VIP Preview · (.+)$/, 'Pratonton VIP · $1'],
    [/^\+ (RM\s*[\d,]+(?:\.\d+)?) voucher · valid ([\d,]+) months$/, '+ Baucar $1 · sah $2 bulan'],
    [/^([\d.,]+) over (RM\s*[\d,]+(?:\.\d+)?)$/, '$1 melebihi $2'],

    /* active variants */
    [/^([\d.,]+) active · all providers$/, '$1 aktif · semua pembekal'],
    [/^([\d.,]+) active plans$/, '$1 pelan aktif'],
    [/^· ([\d.,]+) active$/, '· $1 aktif'],
    [/^([\d.,]+) active$/, '$1 aktif'],

    /* gold grade descriptors */
    [/^([\d.,]+) Pure Gold$/, '$1 Emas Tulen'],
    [/^([\d.,]+) Pure$/, '$1 Tulen'],
    [/^([\d.,]+) Gold$/, '$1 Emas'],
    [/^([\d.,]+) Jewellery$/, '$1 Barang Kemas'],

    /* schedules / durations */
    [/^([\d.,]+)-month · via (.+)$/, '$1 bulan · melalui $2'],
    [/^([\d.,]+)-month schedule$/, 'jadual $1 bulan'],
    [/^([\d.,]+) months from join$/, '$1 bulan dari tarikh sertai'],

    /* short numeric fragments */
    [/^([\d.,]+) status pts$/, '$1 mata status'],
    [/^([\d.,]+) qualified$/, '$1 layak'],
    [/^([\d.,]+) vouchers$/, '$1 baucar'],
    [/^([\d.,]+) total$/, '$1 jumlah'],
    [/^([\d.,]+) mo ago$/, '$1 bln lalu'],
    [/^([\d.,]+) wks ago$/, '$1 mgu lalu'],
    [/^([\d.,]+)d left$/, '$1 hari lagi'],
    [/^([\d.,]+)-day$/, '$1 hari'],
    [/^([\d.,]+)(?:st|nd|rd|th) purchase$/, 'pembelian ke-$1'],
    [/^▲ ([\d.,]+) this week$/, '▲ $1 minggu ini'],
    [/^([\d.,]+) months$/, '$1 bulan'],

    /* greeting (member name preserved) */
    [/^Happy Birthday, (.+)!$/, 'Selamat Hari Lahir, $1!'],

    /* birthday reward (RM 150 in vouchers) composites */
    [/^Birthday reward · (\d+) of (\d+) \(RM ([\d,]+) total\)$/, 'Ganjaran Hari Lahir · $1 daripada $2 (RM $3 jumlah)'],
    [/^([\d,]+) × RM ([\d,]+) vouchers \(RM ([\d,]+)\) · auto-issued on DOB$/, '$1 × baucar RM $2 (RM $3) · dikeluarkan auto pada Hari Lahir'],
    [/^Birthday reward · RM ([\d,]+) in vouchers issued \((\d+) × RM ([\d,]+)\)\.$/, 'Ganjaran Hari Lahir · RM $1 dalam baucar dikeluarkan ($2 × RM $3).'],
    [/^RM ([\d,]+) in vouchers \((\d+) × RM ([\d,]+)\) · on DOB$/, 'RM $1 dalam baucar ($2 × RM $3) · pada Hari Lahir'],

    /* New-Sale item-row aria-labels + plan month + tier-helper composites */
    [/^Category · item (\d+)$/, 'Kategori · item $1'],
    [/^Grade · item (\d+)$/, 'Gred · item $1'],
    [/^Grams · item (\d+)$/, 'Gram · item $1'],
    [/^Gold value \(RM\) · item (\d+)$/, 'Nilai emas (RM) · item $1'],
    [/^Other charges \(RM\) · item (\d+)$/, 'Caj lain (RM) · item $1'],
    [/^Workmanship \/ upah \(RM\) · item (\d+)$/, 'Upah (RM) · item $1'],
    [/^Design line · item (\d+)$/, 'Baris reka bentuk · item $1'],
    [/^Month (\d+)$/, 'Bulan $1'],
    [/^Points are earned by gold grade \(([\d.]+) \/ ([\d.]+) \/ others\) at the same rate for every tier\. Tiers differ by perks and are maintained by a minimum (\d+)-month spend\.$/,
     'Mata diperoleh mengikut gred emas ($1 / $2 / lain-lain) pada kadar yang sama untuk setiap peringkat. Peringkat berbeza mengikut faedah dan dikekalkan dengan perbelanjaan minimum $3 bulan.'],
    [/^No cap · paid after friend’s first qualifying purchase · voucher valid (\d+) months$/,
     'Tiada had · dibayar selepas pembelian layak pertama rakan · baucar sah $1 bulan'],

    /* referral programme composites (voucher-only / approval / redeem) */
    [/^≤ RM ([\d,]+) instant$/, '≤ RM $1 segera'],
    [/^> RM ([\d,]+) → HQ approval \((.+) working days\)$/, '> RM $1 → kelulusan HQ ($2 hari bekerja)'],
    [/^([\d–\-]+) working days$/, '$1 hari bekerja'],
    [/^Reward is issued as an in-store voucher only — it cannot be exchanged for cash\. The member redeems it at the till on their next purchase \(Rewards ▸ voucher QR, one per transaction\)\. Rewards ≤ RM ([\d,]+) auto-credit; above that they need HQ approval \((.+) working days\)\. One referral code per member\.$/,
     'Ganjaran diberi sebagai baucar dalam kedai sahaja — tidak boleh ditukar dengan tunai. Ahli menebusnya di kaunter pada pembelian seterusnya (Ganjaran ▸ QR baucar, satu setiap transaksi). Ganjaran ≤ RM $1 auto-kredit; melebihi itu perlukan kelulusan HQ ($2 hari bekerja). Satu kod rujukan setiap ahli.'],

    /* ==== portal (member app) composites — data-preserving ==== */
    /* points-activity explainer paragraph (split around bold grade spans) */
    [/^, others at ([\d.,]+) pt \/ (RM\s*[\d,]+(?:\.\d+)?)\. Redeeming spends redeemable points; your status points and tier stay put\.$/,
     function (m, a, b) { return ', lain-lain pada ' + a + ' mata / ' + b + '. Menebus menggunakan mata boleh tebus; mata status dan peringkat anda kekal.'; }],
    [/^([\d.]+) at ([\d.,]+) pt \/ (RM\s*[\d,]+(?:\.\d+)?)$/, '$1 pada $2 mata / $3'],

    /* voucher meta line: "<TIER> · EXP <date|N months from join>" (Silver/Gold tiers kept English) */
    [/^(ALL TIERS|SILVER \+ GOLD|SILVER\+|BIRTHDAY|ENTRY|BRONZE|SILVER|GOLD) · EXP (.+?)( ·)?$/,
     function (m, tier, exp, tail) {
       var T = tier === 'ALL TIERS' ? 'SEMUA PERINGKAT' : tier === 'BIRTHDAY' ? 'HARI LAHIR' : tier;
       exp = exp.replace(/^([\d,]+) months from join$/, '$1 bulan dari tarikh sertai');
       return T + ' · LUPUT ' + exp + (tail || '');
     }],
    [/^(ALL TIERS|SILVER \+ GOLD|SILVER\+|BIRTHDAY|ENTRY|BRONZE|SILVER|GOLD) · (USED|EXPIRED)( · .+)?$/,
     function (m, tier, st, tail) {
       var T = tier === 'ALL TIERS' ? 'SEMUA PERINGKAT' : tier === 'BIRTHDAY' ? 'HARI LAHIR' : tier;
       return T + ' · ' + (st === 'USED' ? 'TELAH GUNA' : 'LUPUT') + (tail || '');
     }],

    /* rewards tab counts + point/plan counters */
    [/^Active · ([\d.,]+)$/, 'Aktif · $1'],
    [/^Used · ([\d.,]+)$/, 'Telah Guna · $1'],
    [/^Locked · ([\d.,]+)$/, 'Terkunci · $1'],
    [/^([\d.,]+) pts$/, '$1 mata'],
    [/^([\d.,]+) redeemable points$/, '$1 mata boleh tebus'],
    [/^([\d.,]+) purchases$/, '$1 pembelian'],
    [/^([\d.,]+) active plan$/, '$1 pelan aktif'],
    [/^([\d,]+) of ([\d,]+) paid$/, '$1 daripada $2 dibayar'],

    /* home hero (membership card) tier lines */
    [/^Min (RM\s*[\d,]+(?:\.\d+)?)\/yr · kept ✓$/, 'Min $1/thn · dikekalkan ✓'],
    [/^(RM\s*[\d,]+(?:\.\d+)?) \/ (RM\s*[\d,]+(?:\.\d+)?) this yr$/, '$1 / $2 tahun ini'],
    [/^([\d.,]+) status pts → (Entry|Bronze|Silver|Gold)$/, '$1 mata status → $2'],
    [/^(Entry|Bronze|Silver|Gold) · Tier Status$/, '$1 · Status Peringkat (Tier)'],
    [/^(Entry|Bronze|Silver|Gold) Member$/, 'Ahli $1'],
    [/^(ENTRY|BRONZE|SILVER|GOLD) MEMBER$/, 'AHLI $1'],
    [/^Top tier · ([\d.,]+)g gold owned$/, 'Peringkat teratas · $1g emas dimiliki'],
    [/^Status ([\d.,]+) · keeps (Entry|Bronze|Silver|Gold)$/, 'Status $1 · kekalkan $2'],
    [/^· top tier · min (RM\s*[\d,]+(?:\.\d+)?)\/yr kept ✓$/, '· peringkat teratas · min $1/thn dikekalkan ✓'],
    [/^· top tier · spend (RM\s*[\d,]+(?:\.\d+)?)\/yr to keep$/, '· peringkat teratas · belanja $1/thn untuk kekal'],

    /* home installment "Up Next" + due tags */
    [/^due (\d{1,2} \w+ \d{4})$/, 'perlu dibayar $1'],
    [/^([\d.,]+) days$/, '$1 hari'],

    /* home marketing rail + refer entry */
    [/^Raya Collection (\d{4})$/, 'Koleksi Raya $1'],
    [/^Earn (RM\s*[\d,]+(?:\.\d+)?)\/g when friends buy · (RM\s*[\d,]+(?:\.\d+)?) earned$/, 'Peroleh $1/g apabila rakan membeli · $2 diperoleh'],
    [/^Earn (RM\s*[\d,]+(?:\.\d+)?)\/g when friends buy$/, 'Peroleh $1/g apabila rakan membeli'],

    /* profile footer */
    [/^Member App · (v[\d.]+) · Goldfinch Jewelry$/, 'Apl Ahli · $1 · Goldfinch Jewelry'],

    /* refer & earn — hero, how-it-works, gold-bar rate blurb */
    [/^(RM\s*[\d,]+(?:\.\d+)?) pending · ([\d,]+) of ([\d,]+) friends qualified · (RM\s*[\d,]+(?:\.\d+)?) converted$/, '$1 tertunggak · $2 daripada $3 rakan layak · $4 ditukar'],
    [/^(RM\s*[\d,]+(?:\.\d+)?) pending · ([\d,]+) of ([\d,]+) friends qualified$/, '$1 tertunggak · $2 daripada $3 rakan layak'],
    [/^(RM\s*[\d,]+(?:\.\d+)?) awaiting HQ approval · ([\d–\-]+) working days$/, '$1 menunggu kelulusan HQ · $2 hari bekerja'],
    [/^(RM\s*[\d,]+(?:\.\d+)?) for every gram$/, '$1 setiap gram'],
    [/^Earn (RM\s*[\d,]+(?:\.\d+)?) per gram they buy — added to your referral credit \(voucher-only, never cash\)\. No limit\.$/, 'Peroleh $1 setiap gram yang mereka beli — ditambah ke kredit rujukan anda (baucar sahaja, tiada tunai). Tiada had.'],
    [/^Convert your credit into a voucher in (RM\s*[\d,]+(?:\.\d+)?) steps — it lands in$/, 'Tukar kredit anda menjadi baucar dalam gandaan $1 — ia masuk ke'],
    [/^ready to use in-store\. Referral credit is voucher-only \(valid (\d+) months\) and can't be exchanged for cash\.$/, 'sedia digunakan di kedai. Kredit rujukan adalah baucar sahaja (sah $1 bulan) dan tidak boleh ditukar dengan tunai.'],
    [/^Convert your credit into a voucher in (RM\s*[\d,]+(?:\.\d+)?) steps — it appears in Rewards\. Show its QR to the cashier on your next purchase\.$/, 'Tukar kredit anda menjadi baucar dalam gandaan $1 — ia muncul dalam Ganjaran. Tunjukkan QR-nya kepada juruwang pada pembelian anda seterusnya.'],
    [/^Gold bars, silver bars & special items earn a flat rebate by weight\. Jewellery earns (RM\s*[\d,]+(?:\.\d+)?) \/ g\.$/, 'Jongkong emas, jongkong perak & item istimewa dapat rebat rata ikut berat. Barang kemas dapat $1 / g.'],

    /* referral convert sheet */
    [/^Convert · (RM\s*[\d,]+(?:\.\d+)?) voucher$/, 'Tukar · baucar $1'],
    [/^Max (RM\s*[\d,]+(?:\.\d+)?)$/, 'Maks $1'],
    [/^Turn credit into an in-store voucher · (RM\s*[\d,]+(?:\.\d+)?) steps$/, 'Tukar kredit kepada baucar dalam kedai · gandaan $1'],
    [/^as Active \(valid (\d+) months\)\. Voucher-only — no cash value\.$/, 'sebagai Aktif (sah $1 bulan). Baucar sahaja — tiada nilai tunai.'],

    /* points-redeem (claim) sheet */
    [/^(RM\s*[\d,]+(?:\.\d+)?) voucher$/, 'baucar $1'],
    [/^Confirm · Claim (RM\s*[\d,]+(?:\.\d+)?)$/, 'Sahkan · Tuntut $1'],

    /* voucher detail rows + bespoke T&C bullets with data */
    [/^(RM\s*[\d,]+(?:\.\d+)?) single receipt$/, '$1 satu resit'],
    [/^Minimum spend (RM\s*[\d,]+(?:\.\d+)?) in a single receipt\.$/, 'Perbelanjaan minimum $1 dalam satu resit.'],
    [/^Valid (\d+) months from join\.$/, 'Sah $1 bulan dari tarikh sertai.'],
    [/^Valid (\d+) months from issue\.$/, 'Sah $1 bulan dari tarikh dikeluarkan.'],
    [/^Valid for (\d+) months from the date of issue\.$/, 'Sah selama $1 bulan dari tarikh dikeluarkan.'],
    [/^Valid to (\d{1,2} \w+ \d{4})\.$/, 'Sah sehingga $1.'],
    [/^Claimed with ([\d,]+) points\.$/, 'Dituntut dengan $1 mata.'],
    [/^Claimed with ([\d,]+) points$/, 'Dituntut dengan $1 mata'],
    [/^Part of your (RM\s*[\d,]+(?:\.\d+)?) birthday reward \((\d+) × (RM\s*[\d,]+(?:\.\d+)?) vouchers\)\.$/, 'Sebahagian daripada ganjaran hari lahir $1 anda ($2 × baucar $3).'],
    [/^Redeemed · (\d{1,2} \w+ \d{4})$/, 'Ditebus · $1'],

    /* tier-carousel benefit lines (with data) */
    [/^Welcome (RM\s*[\d,]+(?:\.\d+)?) voucher · valid (\d+) months$/, 'Baucar selamat datang $1 · sah $2 bulan'],
    [/^Maintain with (RM\s*[\d,]+(?:\.\d+)?) \/ year$/, 'Kekalkan dengan $1 / tahun'],
    [/^([\d,]+) pts = (RM\s*[\d,]+(?:\.\d+)?) redemption$/, '$1 mata = penebusan $2'],
    [/^([\d.,]+)-day early access$/, 'akses awal $1 hari'],
    [/^From ([\d,]+) pts$/, 'Dari $1 mata'],

    /* points-feed / purchase-history rows: translate the Gold Bar / Silver Bar category token
       (embedded in a data row) — must precede the generic "+N more" tail below. */
    [/^(\d{1,2}\s+\w+\s+\d{4}\s+·\s+)(Gold Bar|Silver Bar)(\s+·\s+.+)$/, function (m, a, b, c) { return a + (b === 'Gold Bar' ? 'Jongkong Emas' : 'Jongkong Perak') + c; }],
    [/^(Gold Bar|Silver Bar) · ([\d.]+)( \+[\d,]+ more)?$/, function (m, b, g, more) { return (b === 'Gold Bar' ? 'Jongkong Emas' : 'Jongkong Perak') + ' · ' + g + (more ? more.replace(/ \+([\d,]+) more$/, ' +$1 lagi') : ''); }],

    /* generic tails (kept data before/after) */
    [/^(.+) · started (.+)$/, '$1 · mula $2'],
    [/^(.+) · exp (.+)$/, function (m, a, b) { return a + ' · luput ' + b; }],
    [/^(.+) \+([\d.,]+) more$/, '$1 +$2 lagi'],
    [/^Redeemed on (.+)$/, 'Ditebus pada $1'],
    [/^(v[\d.]+) · POWERED BY ZAC$/, '$1 · POWERED BY ZAC']
  ];

  function msPattern(key) {
    for (var p = 0; p < MP.length; p++) {
      if (MP[p][0].test(key)) return key.replace(MP[p][0], MP[p][1]);
    }
    return null;
  }

  /* ---- date localisation (day + month names) ----
     Applied to every node as a final pass. Day abbreviations are safe to swap globally.
     Month names are swapped ONLY in a clear date context (adjacent to a day-number, a
     4-digit year, or a comma) so a member/product name can never be mistaken for a month. */
  var DAY_ABBR = { Mon: 'Isn', Tue: 'Sel', Wed: 'Rab', Thu: 'Kha', Fri: 'Jum', Sat: 'Sab', Sun: 'Ahd' };
  var DAY_FULL = { Monday: 'Isnin', Tuesday: 'Selasa', Wednesday: 'Rabu', Thursday: 'Khamis', Friday: 'Jumaat', Saturday: 'Sabtu', Sunday: 'Ahad' };
  var MON_ABBR = { Jan: 'Jan', Feb: 'Feb', Mar: 'Mac', Apr: 'Apr', May: 'Mei', Jun: 'Jun', Jul: 'Jul', Aug: 'Ogo', Sep: 'Sep', Oct: 'Okt', Nov: 'Nov', Dec: 'Dis' };
  var MON_FULL = { January: 'Januari', February: 'Februari', March: 'Mac', April: 'April', May: 'Mei', June: 'Jun', July: 'Julai', August: 'Ogos', September: 'September', October: 'Oktober', November: 'November', December: 'Disember' };
  var RE_MON_ABBR = 'Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec';
  var RE_MON_FULL = 'January|February|March|April|May|June|July|August|September|October|November|December';
  function msDate(s) {
    if (!s || !/\d/.test(s)) return s;   // dates always carry a digit; names don't
    s = s.replace(/\b(Mon|Tue|Wed|Thu|Fri|Sat|Sun)\b/g, function (m) { return DAY_ABBR[m] || m; });
    s = s.replace(/\b(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\b/g, function (m) { return DAY_FULL[m] || m; });
    // month only when clearly a date: "15 May" / "May 2026" / "May,"
    s = s.replace(new RegExp('(\\d{1,2})\\s+(' + RE_MON_FULL + '|' + RE_MON_ABBR + ')\\b', 'g'), function (_m, d, mo) { return d + ' ' + (MON_FULL[mo] || MON_ABBR[mo] || mo); });
    s = s.replace(new RegExp('\\b(' + RE_MON_FULL + '|' + RE_MON_ABBR + ')\\s+(\\d{4})', 'g'), function (_m, mo, y) { return (MON_FULL[mo] || MON_ABBR[mo] || mo) + ' ' + y; });
    s = s.replace(new RegExp('\\b(' + RE_MON_FULL + '|' + RE_MON_ABBR + ')(,)', 'g'), function (_m, mo, c) { return (MON_FULL[mo] || MON_ABBR[mo] || mo) + c; });
    return s;
  }
  // A node that is EXACTLY one month/day token (chart axis labels, split date nodes like
  // `Apr <span>2026</span>`) — safe to translate whole, since a real name is never a lone month.
  var LONE_TOKEN = {};
  (function () {
    var maps = [DAY_ABBR, DAY_FULL, MON_ABBR, MON_FULL];
    for (var k = 0; k < maps.length; k++) for (var t in maps[k]) if (maps[k].hasOwnProperty(t)) LONE_TOKEN[t] = maps[k][t];
  })();
  // Resolve one string through lone-token → dict → pattern → date pass. Returns final string (or input).
  function msResolve(key) {
    if (LONE_TOKEN.hasOwnProperty(key)) return LONE_TOKEN[key];
    var out;
    if (MS.hasOwnProperty(key)) out = MS[key];
    else { var mapped = msPattern(key); out = (mapped !== null) ? mapped : key; }
    return msDate(out);
  }
  if (typeof window !== 'undefined') window.msResolve = msResolve;

  var G = (typeof window !== 'undefined') ? window : this;
  try { G.GF_LANG = localStorage.getItem('gf_lang') || 'en'; } catch (e) { G.GF_LANG = 'en'; }
  G.GF_MS = MS;
  G.GF_MP = MP;
  G.gfSetLang = function (l) { G.GF_LANG = l; try { localStorage.setItem('gf_lang', l); } catch (e) {} };

  // Reversibility: the FIRST time we translate a node we stash its English original, keyed by the
  // node itself. Switching back to English restores it — so a static element (topbar avatar menu,
  // etc.) that was localised to BM doesn't get stuck in Malay after the cashier picks English again.
  var hasWM = (typeof WeakMap !== 'undefined');
  var ORIG = hasWM ? new WeakMap() : null;        // text node  -> original English nodeValue
  var ORIG_ATTR = hasWM ? new WeakMap() : null;   // element    -> { attrName: original English value }
  var didTranslate = false;                        // becomes true once anything was localised to BM

  G.localizeDOM = function (root) {
    if (!root || typeof document === 'undefined') return;
    var ms = (G.GF_LANG === 'ms');
    // English + nothing was ever translated ⇒ nothing to restore ⇒ skip the walk entirely (HQ path).
    if (!ms && !didTranslate) return;
    try {
      var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
      var node, nodes = [];
      while ((node = walker.nextNode())) nodes.push(node);
      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        // English baseline = the stored original if we've translated this node before, else current.
        var baseline = (ORIG && ORIG.has(n)) ? ORIG.get(n) : n.nodeValue;
        var key = baseline.trim();
        if (!key) continue;
        if (ms) {
          var out = msResolve(key);
          if (out !== key) {
            // Keep the DATABASE value English: a translated <option> with no explicit value would
            // make select.value return the Malay text. Pin an English value once so the form / filter
            // still reads "Rings", "Cash", etc. while the shown word is Malay.
            var po = n.parentNode;
            if (po && po.tagName === 'OPTION' && !po.hasAttribute('value')) po.setAttribute('value', key);
            if (ORIG && !ORIG.has(n)) ORIG.set(n, n.nodeValue);   // stash English once
            var target = baseline.replace(key, function () { return out; });
            if (n.nodeValue !== target) { n.nodeValue = target; didTranslate = true; }
          }
        } else if (ORIG && ORIG.has(n)) {
          var orig = ORIG.get(n);                                  // restore English
          if (n.nodeValue !== orig) n.nodeValue = orig;
        }
      }
      var attrs = ['placeholder', 'title', 'aria-label'];
      for (var a = 0; a < attrs.length; a++) {
        var els = root.querySelectorAll('[' + attrs[a] + ']');
        for (var j = 0; j < els.length; j++) {
          var el = els[j], an = attrs[a];
          var store = ORIG_ATTR && ORIG_ATTR.get(el);
          var base = (store && store.hasOwnProperty(an)) ? store[an] : el.getAttribute(an);
          if (!base) continue;
          var bk = base.trim();
          if (ms) {
            var vout = msResolve(bk);
            if (vout !== bk) {
              if (ORIG_ATTR) { if (!store) { store = {}; ORIG_ATTR.set(el, store); } if (!store.hasOwnProperty(an)) store[an] = el.getAttribute(an); }
              el.setAttribute(an, base.replace(bk, function () { return vout; }));
              didTranslate = true;
            }
          } else if (store && store.hasOwnProperty(an)) {
            if (el.getAttribute(an) !== store[an]) el.setAttribute(an, store[an]);
          }
        }
      }
    } catch (e) {}
  };
})();
