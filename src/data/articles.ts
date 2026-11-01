import { Article } from '../types';

export const ARTICLES: Article[] = [
  // ==========================================
  // AKUNTANSI 1: Siklus Akuntansi & Persamaan Dasar
  // ==========================================
  {
    id: 'art-akt-persamaan-siklus',
    topicId: 'akt-1',
    categoryId: 'akuntansi',
    title: 'Persamaan Dasar Akuntansi & Siklus Pelaporan Keuangan',
    slug: 'persamaan-dasar-akuntansi-siklus',
    difficulty: 'Dasar',
    readTime: '8 menit',
    intro: 'Persamaan dasar akuntansi adalah fondasi sistem pencatatan berpasangan (double-entry bookkeeping) yang pertama kali dipopulerkan oleh Luca Pacioli pada tahun 1494. Dalam setiap transaksi bisnis, total sumber daya ekonomi yang dimiliki entitas (Aset) harus selalu seimbang dengan klaim atas sumber daya tersebut oleh pihak ketiga (Liabilitas) dan pemilik (Ekuitas).',
    conceptPoints: [
      {
        heading: '1. Filosofi Persamaan Akuntansi',
        description: 'Setiap sen aset yang dibeli atau dikuasai perusahaan berasal dari dua sumber pendanaan: pinjaman dari kreditor (Liabilitas/Kewajiban) atau setoran/akumulasi laba pemilik (Ekuitas). Tidak ada aset yang tercipta dari ketiadaan.',
      },
      {
        heading: '2. Aturan Posisi Saldo Normal (Debit vs Kredit)',
        description: 'Debit berasal dari bahasa Latin "debere" (sisi kiri) dan Kredit dari "credere" (sisi kanan). Aset dan Beban bertambah di sisi Debit; Liabilitas, Ekuitas, dan Pendapatan bertambah di sisi Kredit.',
      },
      {
        heading: '3. Alur Siklus Akuntansi 8 Tahap',
        description: 'Tahapan wajib: (1) Bukti Transaksi → (2) Jurnal Umum → (3) Buku Besar (Posting) → (4) Neraca Saldo Sebelum Penyesuaian → (5) Jurnal Penyesuaian (Akrual/Deferral) → (6) Kertas Kerja (Worksheet) → (7) Laporan Keuangan → (8) Jurnal Penutup & Neraca Saldo Setelah Penutup.',
      },
      {
        heading: '4. Akrual Basis vs Kas Basis (PSAK / SAK)',
        description: 'Standar Akuntansi Keuangan di Indonesia mewajibkan akrual basis: pendapatan diakui saat barang/jasa diserahkan (kinerja terpenuhi), dan beban diakui saat manfaat ekonomi dikonsumsi, bukan semata-mata saat uang tunai berpindah tangan.',
      },
    ],
    formulas: [
      {
        name: 'Persamaan Dasar Akuntansi Standar',
        formula: 'Aset = Liabilitas + Ekuitas',
        description: 'Keseimbangan fundamental posisi keuangan neraca.',
        variables: [
          { symbol: 'Aset', meaning: 'Sumber daya ekonomi berwujud maupun tidak berwujud yang dikendalikan entitas.' },
          { symbol: 'Liabilitas', meaning: 'Kewajiban kini entitas yang timbul dari peristiwa masa lalu, yang penyelesaiannya mengakibatkan arus keluar sumber daya.' },
          { symbol: 'Ekuitas', meaning: 'Hak residual atas aset entitas setelah dikurangi seluruh liabilitas (Modal Saham + Saldo Laba).' },
        ],
      },
      {
        name: 'Persamaan Akuntansi Diperluas (Expanded Equation)',
        formula: 'Aset + Beban + Prive = Liabilitas + Modal Awal + Pendapatan',
        description: 'Mengintegrasikan akun laba rugi ke dalam neraca keuangan.',
        variables: [
          { symbol: 'Beban', meaning: 'Penurunan manfaat ekonomi selama periode akuntansi dalam bentuk arus keluar kas atau berkurangnya aset.' },
          { symbol: 'Pendapatan', meaning: 'Peningkatan manfaat ekonomi yang meningkatkan ekuitas selain dari kontribusi pemilik.' },
          { symbol: 'Prive/Dividen', meaning: 'Penarikan aset entitas untuk keperluan pribadi pemilik atau pembagian laba.' },
        ],
      },
    ],
    caseStudy: {
      title: 'Studi Kasus: Pendirian Startup Logistik "PT Kirim Cepat Kilat" di Surabaya',
      context: 'Pada 1 Januari 2026, Bu Ratna mendirikan PT Kirim Cepat Kilat dengan modal setor kas Rp 500.000.000. Tanggal 5 Januari, perusahaan membeli 2 unit mobil operasional seharga Rp 300.000.000 secara tunai. Tanggal 15 Januari, memperoleh pinjaman bank dari Bank Mandiri sebesar Rp 200.000.000. Tanggal 28 Januari, menyelesaikan jasa ekspedisi senilai Rp 50.000.000 secara kredit (piutang usaha).',
      solutionSteps: [
        'Transaksi 1 (1 Jan): Kas (+) Rp 500.000.000 [Debit], Modal Saham (+) Rp 500.000.000 [Kredit]. Persamaan: Aset 500 jt = Liabilitas 0 + Ekuitas 500 jt.',
        'Transaksi 2 (5 Jan): Kendaraan (+) Rp 300.000.000 [Debit], Kas (-) Rp 300.000.000 [Kredit]. Komposisi aset berubah, total aset tetap Rp 500.000.000.',
        'Transaksi 3 (15 Jan): Kas (+) Rp 200.000.000 [Debit], Utang Bank (+) Rp 200.000.000 [Kredit]. Persamaan: Aset 700 jt (Kas 400 jt + Kendaraan 300 jt) = Liabilitas 200 jt + Ekuitas 500 jt.',
        'Transaksi 4 (28 Jan): Piutang Usaha (+) Rp 50.000.000 [Debit], Pendapatan Jasa (+) Rp 50.000.000 [Kredit]. Persamaan: Aset 750 jt = Liabilitas 200 jt + Ekuitas 550 jt (Modal 500 jt + Laba 50 jt).',
      ],
      takeaway: 'Setiap transaksi memiliki efek ganda (dual aspect) yang selalu mempertahankan rumus Aset = Liabilitas + Ekuitas dalam kondisi seimbang sempurna.',
    },
    visualExplanation: {
      type: 'table',
      title: 'Tabel Saldo Normal Akun Pokok Akuntansi Keuangan',
      headers: ['Golongan Akun', 'Saldo Normal', 'Jika Bertambah', 'Jika Berkurang', 'Contoh Nyata Akun'],
      rows: [
        ['Aset (Aktiva)', 'Debit', 'Debit', 'Kredit', 'Kas, Piutang Usaha, Persediaan Barang, Perlengkapan, Peralatan'],
        ['Liabilitas (Kewajiban)', 'Kredit', 'Kredit', 'Debit', 'Utang Dagang, Utang Gaji, Pendapatan Diterima di Muka, Utang Bank'],
        ['Ekuitas (Modal)', 'Kredit', 'Kredit', 'Debit', 'Modal Saham, Tambahan Modal Disetor, Saldo Laba Ditahan'],
        ['Pendapatan (Revenue)', 'Kredit', 'Kredit', 'Debit', 'Pendapatan Usaha / Penjualan, Pendapatan Bunga, Keuntungan Selisih Kurs'],
        ['Beban (Expenses)', 'Debit', 'Debit', 'Kredit', 'Beban Gaji Karyawan, Beban Sewa Kantor, Beban Penyusutan, Beban Listrik'],
        ['Prive / Dividen', 'Debit', 'Debit', 'Kredit', 'Penarikan Kas Pemilik, Pengumuman Pembagian Dividen Tunai'],
      ],
      notes: 'Ingat rumus mnemonic: ADE (Aset, Dividen, Expense) bertambah di sisi DEBIT. LER (Liabilities, Equity, Revenue) bertambah di sisi KREDIT.',
    },
    quiz: [
      {
        question: 'PT Maju Bersama menerima pembayaran pelunasan piutang sebesar Rp 15.000.000 dari pelanggan atas jasa yang diselesaikan bulan lalu. Bagaimanakah pengaruh transaksi ini terhadap persamaan dasar akuntansi?',
        options: [
          'Total aset bertambah Rp 15.000.000 dan ekuitas bertambah Rp 15.000.000.',
          'Total aset tidak berubah karena hanya terjadi pergeseran komposisi antara Kas bertambah dan Piutang Usaha berkurang.',
          'Total aset bertambah Rp 15.000.000 dan liabilitas bertambah Rp 15.000.000.',
          'Kas bertambah Rp 15.000.000 dan pendapatan diakui kembali sebesar Rp 15.000.000.',
        ],
        correctIndex: 1,
        explanation: 'Karena pendapatan sudah diakui saat jasa diserahkan bulan lalu (akrual), penerimaan kas sekarang adalah pelunasan piutang: Kas (Debit) bertambah Rp 15 jt dan Piutang (Kredit) berkurang Rp 15 jt. Total nilai aset entitas tetap sama, hanya bentuknya yang berubah.',
      },
      {
        question: 'Pada akhir periode 31 Desember 2026, saldo beban sewa dibayar di muka tercatat Rp 12.000.000 untuk masa sewa 1 tahun mulai 1 Oktober 2026. Berapa nilai jurnal penyesuaian beban sewa yang harus diakui?',
        options: [
          'Rp 12.000.000',
          'Rp 9.000.000',
          'Rp 3.000.000',
          'Rp 1.000.000',
        ],
        correctIndex: 2,
        explanation: 'Masa sewa yang sudah dinikmati (kadaluarsa) pada tahun 2026 adalah 3 bulan (Oktober, November, Desember). Nilai sewa per bulan = Rp 12.000.000 / 12 = Rp 1.000.000. Maka beban sewa yang diakui = 3 × Rp 1.000.000 = Rp 3.000.000. Jurnal: Beban Sewa (Debit) Rp 3.000.000, Sewa Dibayar di Muka (Kredit) Rp 3.000.000.',
      },
    ],
  },

  // ==========================================
  // AKUNTANSI 2: Akuntansi Manajemen & CVP (BEP)
  // ==========================================
  {
    id: 'art-akt-cvp-bep',
    topicId: 'akt-2',
    categoryId: 'akuntansi',
    title: 'Analisis Cost-Volume-Profit (CVP) & Titik Impas (BEP)',
    slug: 'analisis-cvp-titik-impas-bep',
    difficulty: 'Menengah',
    readTime: '9 menit',
    intro: 'Analisis Biaya-Volume-Laba (Cost-Volume-Profit / CVP) adalah alat perencanaan manajerial krusial untuk memetakan hubungan antara biaya tetap, biaya variabel, volume penjualan, dan profitabilitas. Titik Impas (Break-Even Point / BEP) menunjukkan volume penjualan di mana total pendapatan persis sama dengan total biaya (laba operasi = 0).',
    conceptPoints: [
      {
        heading: '1. Perilaku Biaya (Cost Behavior)',
        description: 'Biaya Tetap (Fixed Cost / FC) tidak berubah terhadap fluktuasi output dalam rentang relevan (contoh: sewa pabrik, gaji pokok manajer). Biaya Variabel (Variable Cost / VC) berubah secara proporsional dengan output produksi (contoh: bahan baku, komisi per unit).',
      },
      {
        heading: '2. Margin Kontribusi (Contribution Margin / CM)',
        description: 'CM per unit adalah harga jual per unit dikurangi biaya variabel per unit. CM menunjukkan sisa uang dari tiap unit yang terjual untuk menutup biaya tetap terlebih dahulu, sebelum mulai menghasilkan laba bersih.',
      },
      {
        heading: '3. Margin of Safety (Batas Aman)',
        description: 'Selisih antara proyeksi penjualan riil dengan volume titik impas. Ini menunjukkan seberapa jauh penjualan boleh merosot sebelum perusahaan mulai menderita kerugian kas.',
      },
      {
        heading: '4. Degree of Operating Leverage (DOL)',
        description: 'Pengungkit operasi mengukur sensitivitas laba terhadap perubahan persentase penjualan. Perusahaan dengan porsi biaya tetap tinggi memiliki DOL tinggi, sehingga sedikit kenaikan omset melipatgandakan laba, namun risikonya juga lebih tinggi jika penjualan turun.',
      },
    ],
    formulas: [
      {
        name: 'Margin Kontribusi per Unit & Rasio CM',
        formula: 'CM = P - VC_{unit} \\quad ; \\quad CM\\% = \\frac{P - VC_{unit}}{P}',
        description: 'Kontribusi marjinal per unit dan rasio margin kontribusi terhadap harga jual.',
        variables: [
          { symbol: 'P', meaning: 'Harga jual per unit produk (Price)' },
          { symbol: 'VC_{unit}', meaning: 'Biaya variabel per unit (Variable Cost per unit)' },
          { symbol: 'CM%', meaning: 'Contribution Margin Ratio (persentase kontribusi per rupiah penjualan)' },
        ],
      },
      {
        name: 'Titik Impas (BEP) Unit & Rupiah',
        formula: 'BEP_{unit} = \\frac{FC}{P - VC_{unit}} \\quad ; \\quad BEP_{Rp} = \\frac{FC}{CM\\%}',
        description: 'Jumlah minimum produk atau nilai rupiah yang harus dijual agar perusahaan tidak rugi.',
        variables: [
          { symbol: 'FC', meaning: 'Total Biaya Tetap (Total Fixed Costs) dalam satu periode' },
          { symbol: 'BEP_{unit}', meaning: 'Volume unit penjualan pada kondisi laba operasi nol' },
          { symbol: 'BEP_{Rp}', meaning: 'Nilai omzet penjualan minimum dalam rupiah' },
        ],
      },
      {
        name: 'Target Laba Operasi (Target Profit)',
        formula: 'Q_{target} = \\frac{FC + Laba_{Target}}{P - VC_{unit}}',
        description: 'Jumlah unit yang harus dijual untuk meraih laba sebelum pajak yang diinginkan.',
        variables: [
          { symbol: 'Laba_{Target}', meaning: 'Target laba operasional (Operating Income) yang ditetapkan manajemen' },
        ],
      },
    ],
    caseStudy: {
      title: 'Studi Kasus: UMKM Kedai Kopi "Kopi Nusantara" di Bandung',
      context: 'Kedai Kopi Nusantara menjual es kopi susu gula aren seharga Rp 20.000 per cup. Biaya bahan baku (biji kopi, susu segar, gula aren, cup & sedotan) adalah Rp 8.000 per cup. Biaya tetap bulanan (sewa ruko, listrik, gaji barista, Wi-Fi) mencapai Rp 24.000.000 per bulan. Pemilik menargetkan laba bersih bulanan Rp 12.000.000.',
      solutionSteps: [
        'Langkah 1: Hitung CM per unit = Rp 20.000 - Rp 8.000 = Rp 12.000 per cup (Rasio CM = 12.000 / 20.000 = 60%).',
        'Langkah 2: Hitung BEP Unit = FC / CM = Rp 24.000.000 / Rp 12.000 = 2.000 cup per bulan (atau rata-rata ~67 cup per hari).',
        'Langkah 3: Hitung BEP Rupiah = 2.000 cup × Rp 20.000 = Rp 40.000.000 per bulan.',
        'Langkah 4: Hitung Unit untuk Target Laba Rp 12 jt = (Rp 24.000.000 + Rp 12.000.000) / Rp 12.000 = 36.000.000 / 12.000 = 3.000 cup per bulan (~100 cup per hari).',
      ],
      takeaway: 'Setiap cup setelah cup ke-2.000 langsung menyumbang Rp 12.000 murni ke kantong laba bersih perusahaan.',
    },
    visualExplanation: {
      type: 'formula_comparison',
      title: 'Struktur Laba Rugi Format Kontribusi vs Format Tradisional',
      headers: ['Format Tradisional (GAAP/PSAK)', 'Format Kontribusi (Manajerial)'],
      rows: [
        ['Penjualan (Sales)', 'Penjualan (Sales)'],
        ['Dikurangi: Harga Pokok Penjualan (HPP)', 'Dikurangi: Total Biaya Variabel (Produksi & Operasional)'],
        ['= Laba Bruto (Gross Margin)', '= Margin Kontribusi (Contribution Margin)'],
        ['Dikurangi: Beban Operasional (Penjualan & Admin)', 'Dikurangi: Total Biaya Tetap (Pabrik & Operasional)'],
        ['= Laba Operasi (Operating Income)', '= Laba Operasi (Operating Income)'],
      ],
      notes: 'Format kontribusi memisahkan biaya berdasarkan perilakunya (tetap vs variabel), sangat efektif untuk simulasi skenario "what-if".',
    },
    quiz: [
      {
        question: 'Sebuah pabrik garmen memiliki biaya tetap Rp 100.000.000/bulan. Harga jual kemeja Rp 250.000 dan biaya variabel per potong Rp 150.000. Berapa omzet rupiah yang dibutuhkan untuk mencapai titik impas (BEP Rupiah)?',
        options: [
          'Rp 200.000.000',
          'Rp 250.000.000',
          'Rp 150.000.000',
          'Rp 100.000.000',
        ],
        correctIndex: 1,
        explanation: 'CM per unit = 250.000 - 150.000 = Rp 100.000. Rasio CM = 100.000 / 250.000 = 40% (0,4). BEP Rupiah = FC / Rasio CM = 100.000.000 / 0,4 = Rp 250.000.000 (atau 1.000 potong kemeja).',
      },
    ],
  },

  // ==========================================
  // AKUNTANSI 3: Analisis Rasio Keuangan & Pajak
  // ==========================================
  {
    id: 'art-akt-rasio-perpajakan',
    topicId: 'akt-3',
    categoryId: 'akuntansi',
    title: 'Analisis Rasio Keuangan & Ketentuan Perpajakan Indonesia',
    slug: 'analisis-rasio-keuangan-perpajakan',
    difficulty: 'Lanjutan',
    readTime: '10 menit',
    intro: 'Analisis rasio keuangan mentransformasi angka-angka mentah dari laporan laba rugi dan neraca menjadi indikator performa yang komprehensif. Dipadukan dengan pemahaman perpajakan Indonesia (UU Harmonisasi Peraturan Perpajakan / HPP), analis dapat menilai kesehatan arus kas, solvabilitas utang, dan beban pajak efektif entitas.',
    conceptPoints: [
      {
        heading: '1. Rasio Likuiditas (Liquidity Ratios)',
        description: 'Mengukur kemampuan perusahaan melunasi kewajiban jangka pendek yang jatuh tempo dalam 1 tahun. Current Ratio = Aset Lancar / Liabilitas Lancar. Quick Ratio (Acid-Test) = (Kas + Efek + Piutang) / Liabilitas Lancar.',
      },
      {
        heading: '2. Rasio Solvabilitas & Struktur Modal (Leverage)',
        description: 'Mengukur proporsi utang dalam mendanai aset. Debt to Equity Ratio (DER) = Total Utang / Total Ekuitas. DER > 2x umumnya menandakan ketergantungan utang yang tinggi dan risiko gagal bayar jika suku bunga melonjak.',
      },
      {
        heading: '3. Rasio Profitabilitas',
        description: 'Return on Assets (ROA) = Laba Bersih / Total Aset. Return on Equity (ROE) = Laba Bersih / Total Ekuitas. Net Profit Margin (NPM) = Laba Bersih / Pendapatan Penjualan.',
      },
      {
        heading: '4. Pokok Pajak Indonesia (PPh Badan & PPN)',
        description: 'PPh Badan tarif umum 22% (dengan insentif Pasal 31E bagi UMKM beromzet hingga Rp 50 M). PPN atas penyerahan BKP/JKP dengan tarif reguler 11% (menuju 12% sesuai UU HPP).',
      },
    ],
    formulas: [
      {
        name: 'Rasio Likuiditas Pokok',
        formula: 'Current\\ Ratio = \\frac{Aset\\ Lancar}{Liabilitas\\ Lancar} \\quad ; \\quad Quick\\ Ratio = \\frac{Aset\\ Lancar - Persediaan}{Liabilitas\\ Lancar}',
        description: 'Indikator kemampuan pelunasan kewajiban jangka pendek tanpa harus menjual persediaan secara terburu-buru.',
        variables: [
          { symbol: 'Aset Lancar', meaning: 'Kas, piutang usaha, surat berharga, biaya dibayar di muka, persediaan' },
          { symbol: 'Persediaan', meaning: 'Aset lancar yang paling tidak likuid dan memerlukan waktu untuk diuangkan' },
          { symbol: 'Liabilitas Lancar', meaning: 'Utang dagang, utang bank jangka pendek, beban akrual yang jatuh tempo < 12 bulan' },
        ],
      },
      {
        name: 'DuPont Analysis Model (Dekomposisi ROE)',
        formula: 'ROE = \\underbrace{\\frac{Laba\\ Bersih}{Penjualan}}_{Profit\\ Margin} \\times \\underbrace{\\frac{Penjualan}{Total\\ Aset}}_{Asset\\ Turnover} \\times \\underbrace{\\frac{Total\\ Aset}{Total\\ Ekuitas}}_{Equity\\ Multiplier}',
        description: 'Membedah ROE menjadi 3 penggerak: efisiensi operasional, efisiensi pemanfaatan aset, dan pengungkit utang keuangan.',
        variables: [
          { symbol: 'ROE', meaning: 'Tingkat pengembalian modal yang dinikmati para pemegang saham biasa' },
        ],
      },
    ],
    caseStudy: {
      title: 'Studi Kasus: Evaluasi Kesehatan Keuangan Perusahaan Ritel Terbuka (BEI)',
      context: 'PT Sumber Berkah Tbk memiliki Aset Lancar Rp 120 Miliar (termasuk Persediaan Rp 50 Miliar), Liabilitas Lancar Rp 60 Miliar, Total Liabilitas Rp 150 Miliar, dan Total Ekuitas Rp 150 Miliar. Laba bersih tahun 2025 tercatat Rp 30 Miliar dari penjualan Rp 300 Miliar.',
      solutionSteps: [
        'Current Ratio = 120 M / 60 M = 2,00x (Sangat likuid, mampu menutup setiap Rp 1 utang lancar dengan Rp 2 aset lancar).',
        'Quick Ratio = (120 M - 50 M) / 60 M = 70 M / 60 M = 1,17x (> 1,0x, menunjukkan posisi kas & piutang yang sehat).',
        'Debt-to-Equity Ratio (DER) = 150 M / 150 M = 1,00x (100% - rasio utang dan modal sendiri berimbang).',
        'Net Profit Margin (NPM) = 30 M / 300 M = 10,0%.',
        'Return on Equity (ROE) = 30 M / 150 M = 20,0% (Pengembalian bagi pemilik saham sangat atraktif).',
      ],
      takeaway: 'Kombinasi likuiditas sehat (Quick Ratio 1,17x) dan ROE tinggi (20%) membuktikan efisiensi operasional tanpa leverage utang yang membahayakan.',
    },
    quiz: [
      {
        question: 'Sebuah perusahaan manufaktur memiliki Aset Lancar Rp 800 juta, Persediaan Rp 350 juta, dan Liabilitas Lancar Rp 300 juta. Berapakah Quick Ratio perusahaan tersebut?',
        options: [
          '2,67x',
          '1,50x',
          '1,17x',
          '0,65x',
        ],
        correctIndex: 1,
        explanation: 'Quick Assets = Aset Lancar - Persediaan = Rp 800 jt - Rp 350 jt = Rp 450 jt. Quick Ratio = Rp 450 jt / Rp 300 jt = 1,50x. Artinya, tanpa menjual persediaan, perusahaan memiliki Rp 1,50 aset likuid untuk setiap Rp 1 utang jangka pendek.',
      },
    ],
  },

  // ==========================================
  // MIKRO 1: Kelangkaan, PPC & Opportunity Cost
  // ==========================================
  {
    id: 'art-mik-kelangkaan-ppc',
    topicId: 'mik-1',
    categoryId: 'mikro',
    title: 'Kelangkaan, Biaya Peluang, & Batas Kemungkinan Produksi (PPC)',
    slug: 'kelangkaan-biaya-peluang-ppc',
    difficulty: 'Dasar',
    readTime: '8 menit',
    intro: 'Ilmu ekonomi lahir dari kontradiksi abadi: kebutuhan manusia yang tidak terbatas (unlimited wants) berhadapan dengan sumber daya ekonomi yang langka dan terbatas (scarce resources). Kelangkaan mengharuskan pilihan (choice), dan setiap pilihan selalu menuntut pengorbanan yang disebut Biaya Peluang (Opportunity Cost).',
    conceptPoints: [
      {
        heading: '1. Definisi Biaya Peluang (Opportunity Cost)',
        description: 'Bukan sekadar uang yang dikeluarkan, melainkan nilai dari alternatif terbaik berikutnya yang terpaksa dikorbankan ketika sebuah keputusan diambil.',
      },
      {
        heading: '2. Batas Kemungkinan Produksi (Production Possibility Curve / PPC)',
        description: 'Kurva yang menggambarkan kombinasi maksimum dari dua barang yang dapat diproduksi oleh suatu perekonomian dengan memanfaatkan seluruh faktor produksi dan teknologi yang tersedia secara penuh dan efisien.',
      },
      {
        heading: '3. Tiga Wilayah pada Grafik PPC',
        description: 'Titik di sepanjang kurva: Efisien (full employment). Titik di dalam kurva: Tidak efisien (underemployment / pengangguran sumber daya). Titik di luar kurva: Mustahil dicapai pada saat ini kecuali ada pertumbuhan ekonomi atau kemajuan teknologi.',
      },
      {
        heading: '4. Hukum Kenaikan Biaya Peluang (Law of Increasing Opportunity Cost)',
        description: 'Bentuk kurva PPC yang cembung ke arah luar (bowed outward) mencerminkan bahwa sumber daya tidak dapat diadaptasi secara sempurna dari memproduksi satu barang ke barang lainnya.',
      },
    ],
    formulas: [
      {
        name: 'Tingkat Transformasi Marginal (Marginal Rate of Transformation - MRT)',
        formula: 'MRT_{xy} = -\\frac{\\Delta Y}{\\Delta X} = \\frac{Biaya\\ Peluang\\ Barang\\ Y}{Tambahan\\ 1\\ Unit\\ Barang\\ X}',
        description: 'Kemiringan (slope) kurva PPC yang mengukur seberapa banyak barang Y harus dilepaskan untuk memproduksi tambahan 1 unit barang X.',
        variables: [
          { symbol: '\\Delta Y', meaning: 'Jumlah barang Y yang dikorbankan' },
          { symbol: '\\Delta X', meaning: 'Jumlah barang X tambahan yang diperoleh' },
        ],
      },
    ],
    caseStudy: {
      title: 'Studi Kasus: Alokasi Lahan Pertanian Padi vs Jagung di Kabupaten Subang',
      context: 'Seorang petani memiliki 10 hektar lahan subur. Jika seluruh lahan ditanami padi, ia menghasilkan 50 ton gabah dan 0 ton jagung. Jika dialihkan bertahap: (40 ton padi, 20 ton jagung), (25 ton padi, 35 ton jagung), dan (0 ton padi, 45 ton jagung). Petani memutuskan meningkatkan produksi jagung dari 20 ton ke 35 ton.',
      solutionSteps: [
        'Pada titik awal (40 ton padi, 20 ton jagung), produksi jagung = 20 ton.',
        'Untuk memproduksi 35 ton jagung (tambahan +15 ton), produksi padi turun dari 40 ton menjadi 25 ton (pengorbanan -15 ton padi).',
        'Biaya peluang per ton tambahan jagung = 15 ton padi / 15 ton jagung = 1 ton padi per 1 ton jagung.',
        'Bila petani ingin memproduksi 45 ton jagung (+10 ton berikutnya), padi turun dari 25 ton ke 0 ton (-25 ton padi). Biaya peluang melonjak menjadi 25/10 = 2,5 ton padi per 1 ton jagung (Law of Increasing Opportunity Cost).',
      ],
      takeaway: 'Lahan yang paling tidak cocok untuk jagung terpaksa dipaksakan beralih fungsi, sehingga biaya peluang melonjak semakin tinggi.',
    },
    quiz: [
      {
        question: 'Sebuah negara berada pada titik di bagian DALAM kurva Batas Kemungkinan Produksi (PPC). Kondisi ini mengindikasikan bahwa:',
        options: [
          'Perekonomian mengalami inflasi yang sangat tinggi.',
          'Perekonomian tidak memanfaatkan sumber daya secara penuh atau terjadi inefisiensi/pengangguran.',
          'Perekonomian mengalami kemajuan teknologi yang sangat pesat.',
          'Perekonomian berada pada tingkat keseimbangan pareto optimal.',
        ],
        correctIndex: 1,
        explanation: 'Setiap titik di dalam kurva PPC menandakan inefisiensi (resources underutilization). Perekonomian sebenarnya mampu memproduksi lebih banyak barang tanpa harus mengorbankan barang lain jika seluruh pengangguran atau kapasitas pabrik yang menganggur diaktifkan kembali.',
      },
    ],
  },

  // ==========================================
  // MIKRO 2: Permintaan, Penawaran & Ekuilibrium Pasar
  // ==========================================
  {
    id: 'art-mik-permintaan-penawaran-pasar',
    topicId: 'mik-2',
    categoryId: 'mikro',
    title: 'Hukum Permintaan, Penawaran, & Ekuilibrium Pasar',
    slug: 'permintaan-penawaran-ekuilibrium-pasar',
    difficulty: 'Dasar',
    readTime: '9 menit',
    intro: 'Mekanisme pasar bekerja melalui interaksi antara pembeli (permintaan) dan penjual (penawaran). Adam Smith menyebut koordinasi desentralisasi ini sebagai "tangan tak terlihat" (invisible hand) yang mengarahkan harga menuju titik keseimbangan (ekuilibrium), di mana jumlah yang ingin dibeli persis sama dengan jumlah yang ingin dijual.',
    conceptPoints: [
      {
        heading: '1. Hukum Permintaan (Law of Demand)',
        description: 'Ceteris paribus (faktor lain konstan), saat harga suatu barang naik, jumlah barang yang diminta akan turun, dan sebaliknya (hubungan terbalik / kurva berslope negatif). Hal ini dipicu oleh efek substitusi dan efek pendapatan.',
      },
      {
        heading: '2. Hukum Penawaran (Law of Supply)',
        description: 'Ceteris paribus, saat harga suatu barang naik, jumlah barang yang ditawarkan oleh produsen akan meningkat (hubungan searah / kurva berslope positif) demi memaksimalisasi keuntungan.',
      },
      {
        heading: '3. Perbedaan Pergeseran Kurva vs Pergerakan Sepanjang Kurva',
        description: 'Perubahan HARGA barang itu sendiri hanya menyebabkan "pergerakan di sepanjang kurva" (movement along the curve). Sementara perubahan faktor di luar harga (pendapatan, selera, harga barang lain, ekspektasi, teknologi) menyebabkan "pergeseran seluruh kurva" (shift of the curve).',
      },
      {
        heading: '4. Intervensi Pemerintah: Plafon Harga & Lantai Harga',
        description: 'Price Ceiling (Harga Eceran Tertinggi / HET) yang efektif selalu dipatok DI BAWAH harga ekuilibrium, memicu kelangkaan (shortage). Price Floor (Harga Pembelian Pemerintah / HPP gabah) yang efektif selalu dipatok DI ATAS harga pasar, memicu kelebihan pasokan (surplus).',
      },
    ],
    formulas: [
      {
        name: 'Fungsi Permintaan & Penawaran Linear',
        formula: 'Q_d = a - bP \\quad ; \\quad Q_s = c + dP',
        description: 'Persamaan hubungan antara harga pasar (P) dan kuantitas barang (Q).',
        variables: [
          { symbol: 'Q_d', meaning: 'Kuantitas barang yang diminta pembeli' },
          { symbol: 'Q_s', meaning: 'Kuantitas barang yang ditawarkan penjual' },
          { symbol: 'a, c', meaning: 'Konstanta intercept kuantitas otonom saat harga nol' },
          { symbol: 'b, d', meaning: 'Koefisien kemiringan / sensitivitas respon kuantitas terhadap harga' },
        ],
      },
      {
        name: 'Syarat Keseimbangan Pasar (Market Equilibrium)',
        formula: 'Q_d = Q_s \\quad \\Longrightarrow \\quad a - bP^* = c + dP^* \\quad \\Longrightarrow \\quad P^* = \\frac{a - c}{b + d}',
        description: 'Penetapan harga keseimbangan P* dan kuantitas ekuilibrium Q*.',
        variables: [
          { symbol: 'P^*', meaning: 'Harga ekuilibrium pasar yang membersihkan pasar (market-clearing price)' },
          { symbol: 'Q^*', meaning: 'Jumlah unit ekuilibrium yang ditransaksikan' },
        ],
      },
    ],
    caseStudy: {
      title: 'Studi Kasus: Ekuilibrium Pasar Beras Premium di Pasar Induk Cipinang Jakarta',
      context: 'Misalkan fungsi permintaan harian beras premium di Jakarta adalah Qd = 1.000 - 0,04P dan fungsi penawarannya adalah Qs = -200 + 0,08P (di mana P dalam rupiah per kg dan Q dalam ton beras). Pemerintah sempat menerapkan HET (Price Ceiling) sebesar Rp 13.000/kg.',
      solutionSteps: [
        'Langkah 1: Cari ekuilibrium alami pasar: Qd = Qs → 1.000 - 0,04P = -200 + 0,08P → 1.200 = 0,12P → P* = Rp 10.000/kg.',
        'Langkah 2: Cari kuantitas ekuilibrium Q*: Q* = 1.000 - 0,04(10.000) = 1.000 - 400 = 600 ton per hari.',
        'Langkah 3: Jika terjadi paceklik dan permintaan naik menjadi Qd = 1.400 - 0,04P, maka: 1.400 - 0,04P = -200 + 0,08P → 1.600 = 0,12P → P* naik menjadi Rp 13.333/kg dan Q* = 867 ton.',
        'Langkah 4: Dampak jika HET dipatok Rp 12.000/kg: Qd = 1.400 - 0,04(12.000) = 920 ton. Qs = -200 + 0,08(12.000) = 760 ton. Terjadi Shortage (Kelangkaan) beras sebesar 920 - 760 = 160 ton/hari!',
      ],
      takeaway: 'Penetapan harga pagu tanpa didukung operasi pasar / pasokan beras cadangan pemerintah (Bulog) akan selalu berujung pada antrean panjang atau pasar gelap (black market).',
    },
    quiz: [
      {
        question: 'Jika fungsi permintaan adalah Qd = 80 - 2P dan fungsi penawaran adalah Qs = -20 + 3P, berapakah harga dan kuantitas ekuilibrium pasarnya?',
        options: [
          'P = 20 dan Q = 40',
          'P = 25 dan Q = 30',
          'P = 15 dan Q = 50',
          'P = 30 dan Q = 20',
        ],
        correctIndex: 0,
        explanation: 'Qd = Qs → 80 - 2P = -20 + 3P → 80 + 20 = 3P + 2P → 100 = 5P → P = 20. Substitusikan P = 20 ke fungsi Qd: Q = 80 - 2(20) = 80 - 40 = 40. Ekuilibrium: P* = 20 dan Q* = 40.',
      },
      {
        question: 'Pengenaan pajak spesifik sebesar t rupiah per unit atas barang yang diperjualbelikan akan berdampak pada grafik:',
        options: [
          'Kurva permintaan bergeser sejajar ke kanan atas sebesar t.',
          'Kurva penawaran bergeser ke kiri atas (atau naik vertikal sebesar t).',
          'Titik ekuilibrium tidak berubah karena pajak diserap seluruhnya oleh kas negara.',
          'Kurva penawaran menjadi elastis sempurna.',
        ],
        correctIndex: 1,
        explanation: 'Pajak penjualan menambah biaya marjinal produsen untuk setiap unit yang diproduksi, sehingga kurva penawaran (Supply) bergeser ke atas/kiri sebesar nilai pajak (t), menyebabkan harga yang dibayar konsumen naik dan kuantitas transaksi berkurang.',
      },
    ],
  },

  // ==========================================
  // MIKRO 3: Elastisitas & Struktur Pasar
  // ==========================================
  {
    id: 'art-mik-struktur-pasar-elastisitas',
    topicId: 'mik-4',
    categoryId: 'mikro',
    title: 'Struktur Pasar: Persaingan Sempurna, Monopoli, Oligopoli, & Monopolistik',
    slug: 'struktur-pasar-persaingan-monopoli-oligopoli',
    difficulty: 'Menengah',
    readTime: '10 menit',
    intro: 'Struktur pasar menentukan bagaimana perusahaan menetapkan harga, berapa banyak output yang diproduksi, dan tingkat keuntungan yang diperoleh dalam jangka panjang. Rentang struktur pasar membentang dari persaingan sempurna yang tanpa kekuatan pasar (price taker) hingga monopoli absolut (price maker).',
    conceptPoints: [
      {
        heading: '1. Pasar Persaingan Sempurna (Perfect Competition)',
        description: 'Banyak penjual dan pembeli, produk homogen sempurna, bebas keluar masuk (free entry/exit), informasi simetris sempurna. Perusahaan adalah price taker, sehingga P = AR = MR. Dalam jangka panjang, laba ekonomi adalah normal (nol).',
      },
      {
        heading: '2. Pasar Monopoli Murni (Pure Monopoly)',
        description: 'Hanya satu penjual menguasai seluruh pasokan barang tanpa ada barang substitusi dekat. Hambatan masuk (barriers to entry) sangat tinggi (paten, monopoli alamiah skala ekonomis, regulasi negara). Monopolis memaksimalkan laba pada MR = MC, tetapi menetapkan harga P > MC.',
      },
      {
        heading: '3. Pasar Oligopoli',
        description: 'Dikuasai oleh beberapa produsen besar (contoh: industri semen, telekomunikasi seluler, maskapai penerbangan). Ciri khas utamanya adalah saling ketergantungan strategis (mutual interdependence). Dijelaskan oleh kurva permintaan patah (Kinked Demand Curve) Paul Sweezy atau Teori Permainan (Game Theory / Nash Equilibrium).',
      },
      {
        heading: '4. Pasar Persaingan Monopolistik',
        description: 'Banyak produsen, namun produk terdiferensiasi (differentiated products) melalui merek, rasa, kemasan, atau lokasi (contoh: kafe kopi, restoran cepat saji). Memiliki sedikit kekuatan menetapkan harga, namun tetap free entry dalam jangka panjang.',
      },
    ],
    formulas: [
      {
        name: 'Kaidah Penentu Laba Maksimum Umum',
        formula: 'MR = MC \\quad (dengan\\ lereng\\ MC > lereng\\ MR)',
        description: 'Aturan universal untuk seluruh jenis perusahaan: produksi ditambah selama pendapatan marjinal (MR) masih melebihi biaya marjinal (MC).',
        variables: [
          { symbol: 'MR', meaning: 'Marginal Revenue = Turunan pertama Total Pendapatan terhadap Q (dTR/dQ)' },
          { symbol: 'MC', meaning: 'Marginal Cost = Turunan pertama Total Biaya terhadap Q (dTC/dQ)' },
        ],
      },
      {
        name: 'Indeks Lerner Kekuatan Monopoli (Lerner Index of Monopoly Power)',
        formula: 'L = \\frac{P - MC}{P} = -\\frac{1}{E_d}',
        description: 'Mengukur seberapa jauh harga markup di atas biaya marjinal sebagai representasi kekuatan monopoli.',
        variables: [
          { symbol: 'L', meaning: 'Indeks Lerner (berkisar antara 0 pada pasar persaingan sempurna hingga mendekati 1 pada monopoli inelastis)' },
          { symbol: 'E_d', meaning: 'Elastisitas harga permintaan yang dihadapi perusahaan' },
        ],
      },
    ],
    caseStudy: {
      title: 'Studi Kasus: Perang Tarif Provider Telekomunikasi Seluler di Indonesia',
      context: 'Industri seluler Indonesia dikuasai oleh Telkomsel, Indosat Ooredoo Hutchison, dan XL Axiata (Oligopoli). Saat satu provider menurunkan harga paket data internet drastis, kompetitor segera membalas menurunkan tarif agar pelanggan tidak berpindah (inelastic demand saat harga turun). Sebaliknya, jika satu provider menaikkan tarif sendirian, kompetitor tidak mengikuti, sehingga provider tersebut kehilangan banyak pelanggan (elastic demand saat harga naik).',
      solutionSteps: [
        'Fenomena ini menciptakan Kurva Permintaan Patah (Kinked Demand Curve).',
        'Kurva Pendapatan Marjinal (MR) terputus vertikal tepat pada tingkat harga pasar saat ini.',
        'Akibatnya, fluktuasi biaya marjinal (MC) akibat kenaikan sewa tower atau lisensi pita frekuensi tidak mengubah harga eceran paket data ke konsumen, menciptakan fenomena harga kaku (price rigidity).',
      ],
      takeaway: 'Dalam pasar oligopoli, perusahaan lebih memilih bersaing lewat diferensiasi non-harga (kualitas jaringan 5G, loyalty rewards) ketimbang perang tarif harga yang merugikan semua pihak.',
    },
    quiz: [
      {
        question: 'Sebuah perusahaan monopolis memiliki fungsi permintaan P = 100 - 2Q dan fungsi biaya total TC = 20Q + 200. Berapakah kuantitas (Q) dan harga (P) yang memaksimalkan laba?',
        options: [
          'Q = 20 dan P = 60',
          'Q = 25 dan P = 50',
          'Q = 40 dan P = 20',
          'Q = 15 dan P = 70',
        ],
        correctIndex: 0,
        explanation: 'TR = P × Q = 100Q - 2Q^2. MR = dTR/dQ = 100 - 4Q. MC = dTC/dQ = 20. Syarat laba maksimum: MR = MC → 100 - 4Q = 20 → 80 = 4Q → Q = 20. Masukkan ke fungsi P: P = 100 - 2(20) = 100 - 40 = 60. Maka Q = 20 dan P = 60.',
      },
    ],
  },

  // ==========================================
  // MAKRO 1: Pendapatan Nasional & PDB
  // ==========================================
  {
    id: 'art-mak-pdb-pendapatan-nasional',
    topicId: 'mak-1',
    categoryId: 'makro',
    title: 'Perhitungan Pendapatan Nasional: PDB Nominal, Riil, & Deflator PDB',
    slug: 'perhitungan-pdb-nominal-riil-deflator',
    difficulty: 'Dasar',
    readTime: '9 menit',
    intro: 'Produk Domestik Bruto (PDB / GDP) adalah ukuran moneter agregat dari seluruh barang dan jasa akhir yang diproduksi di dalam batas wilayah geografis suatu negara selama periode tertentu (biasanya satu tahun). PDB menjadi indikator utama untuk menakar kapasitas, laju pertumbuhan, dan taraf hidup ekonomi suatu bangsa.',
    conceptPoints: [
      {
        heading: '1. Tiga Pendekatan Perhitungan PDB',
        description: '(1) Pendekatan Pengeluaran (Expenditure): Konsumsi + Investasi + Pengeluaran Pemerintah + Ekspor Neto. (2) Pendekatan Pendapatan (Income): Upah + Sewa + Bunga + Laba. (3) Pendekatan Produksi (Value Added): Jumlah nilai tambah dari seluruh sektor industri lapangan usaha.',
      },
      {
        heading: '2. PDB Nominal vs PDB Riil',
        description: 'PDB Nominal dihitung berdasarkan harga yang berlaku pada tahun berjalan, sehingga kenaikannya bisa disebabkan oleh kenaikan fisik output ATAU sekadar kenaikan harga (inflasi). PDB Riil dihitung menggunakan harga tahun dasar konstan, murni mencerminkan peningkatan volume fisik produksi barang dan jasa.',
      },
      {
        heading: '3. Deflator PDB (GDP Deflator)',
        description: 'Ukuran tingkat harga dari seluruh barang dan jasa akhir baru yang diproduksi di dalam negeri. Rasio antara PDB Nominal terhadap PDB Riil dikalikan 100.',
      },
      {
        heading: '4. PDB vs PNB (Produk Nasional Bruto / GNP)',
        description: 'PDB berpatokan pada batas wilayah geografis (domestik), sedangkan PNB berpatokan pada kewarganegaraan. PNB = PDB + Pendapatan Neto Luar Negeri atas Faktor Produksi.',
      },
    ],
    formulas: [
      {
        name: 'Pendekatan Pengeluaran Perekonomian Terbuka',
        formula: 'Y = C + I + G + (X - M)',
        description: 'Rumus identitas pendapatan nasional dari sisi pengeluaran agregat.',
        variables: [
          { symbol: 'Y', meaning: 'Pendapatan Nasional / Produk Domestik Bruto (PDB)' },
          { symbol: 'C', meaning: 'Konsumsi Rumah Tangga (Private Consumption)' },
          { symbol: 'I', meaning: 'Investasi Domestik Bruto (Gross Fixed Capital Formation + Inventori)' },
          { symbol: 'G', meaning: 'Pengeluaran Konsumsi & Investasi Pemerintah (Government Purchases)' },
          { symbol: 'X - M', meaning: 'Ekspor Neto (Ekspor dikurangi Impor)' },
        ],
      },
      {
        name: 'Deflator PDB & Pertumbuhan Ekonomi Riil',
        formula: 'Deflator\\ PDB = \\frac{PDB_{Nominal}}{PDB_{Riil}} \\times 100 \\quad ; \\quad Laju\\ Pertumbuhan = \\frac{PDB\\ Riil_t - PDB\\ Riil_{t-1}}{PDB\\ Riil_{t-1}} \\times 100\\%',
        description: 'Menghitung indikator inflasi produsen agregat dan pertumbuhan output riil.',
        variables: [
          { symbol: 'Deflator PDB', meaning: 'Indeks harga berbasis output komprehensif' },
        ],
      },
    ],
    caseStudy: {
      title: 'Studi Kasus: Perekonomian Indonesia Tahun 2024-2025 (BPS Data Insight)',
      context: 'Menurut data Badan Pusat Statistik (BPS), PDB Nominal Indonesia tahun 2024 mencapai sekitar Rp 21.000 Triliun, dengan PDB Riil berbasis tahun dasar 2010 sebesar Rp 12.500 Triliun. Konsumsi Rumah Tangga (C) menyumbang sekitar 53% dari total PDB, disusul PMTB/Investasi (I) sekitar 29%.',
      solutionSteps: [
        'Hitung Deflator PDB = (Rp 21.000 T / Rp 12.500 T) × 100 = 168,0.',
        'Artinya sejak tahun dasar 2010 hingga 2024, tingkat harga barang dan jasa agregat dalam negeri telah mengalami kenaikan kumulatif sebesar 68,0%.',
        'Jika PDB Riil tahun 2023 adalah Rp 11.900 Triliun, maka laju pertumbuhan ekonomi riil Indonesia = [(12.500 - 11.900) / 11.900] × 100% = +5,04% YoY.',
      ],
      takeaway: 'Pertumbuhan 5,04% ini murni kenaikan kapasitas fisik barang & jasa yang diproduksi, bebas dari distorsi lonjakan harga inflasi.',
    },
    quiz: [
      {
        question: 'Pada tahun 2025, PDB Nominal suatu negara adalah Rp 1.500 Triliun dan Indeks Deflator PDB adalah 125 (tahun dasar = 100). Berapakah nilai PDB Riil negara tersebut?',
        options: [
          'Rp 1.200 Triliun',
          'Rp 1.875 Triliun',
          'Rp 1.375 Triliun',
          'Rp 1.000 Triliun',
        ],
        correctIndex: 0,
        explanation: 'PDB Riil = (PDB Nominal / Deflator PDB) × 100 = (Rp 1.500 Triliun / 125) × 100 = Rp 1.200 Triliun.',
      },
    ],
  },

  // ==========================================
  // MAKRO 2: Multiplier Effect & Kebijakan
  // ==========================================
  {
    id: 'art-mak-multiplier-moneter-fiskal',
    topicId: 'mak-2',
    categoryId: 'makro',
    title: 'Keseimbangan Makroekonomi Keynesian & Efek Multiplier',
    slug: 'keseimbangan-keynesian-angka-pengganda-multiplier',
    difficulty: 'Menengah',
    readTime: '9 menit',
    intro: 'John Maynard Keynes membuktikan bahwa perekonomian tidak selalu otomatis berada pada kesempatan kerja penuh (full employment). Suntikan pengeluaran otonom (seperti proyek infrastruktur pemerintah atau investasi swasta) memicu reaksi berantai dalam perekonomian melalui Angka Pengganda (Multiplier Effect), melipatgandakan dampak awal terhadap pendapatan nasional.',
    conceptPoints: [
      {
        heading: '1. Kecenderungan Mengonsumsi Marginal (MPC)',
        description: 'Marginal Propensity to Consume (MPC) mengukur fraksi dari setiap tambahan 1 rupiah pendapatan disposabel yang dibelanjakan untuk konsumsi. Sisanya ditabung sebagai MPS (Marginal Propensity to Save). Rumus pokok: MPC + MPS = 1.',
      },
      {
        heading: '2. Cara Kerja Efek Pengganda (Multiplier Process)',
        description: 'Ketika pemerintah membelanjakan Rp 100 Miliar untuk membangun jalan tol, pekerja konstruksi dan pemasok semen menerima pendapatan Rp 100 Miliar. Jika MPC = 0,8, mereka membelanjakan Rp 80 Miliar untuk makanan, pakaian, dan sewa. Pedagang makanan menerima Rp 80 Miliar dan membelanjakan 0,8 × Rp 80 Miliar = Rp 64 Miliar. Putaran ini berlanjut hingga total peningkatan pendapatan nasional menjadi 5x lipat!',
      },
      {
        heading: '3. Pengganda Pengeluaran Pemerintah vs Pengganda Pajak',
        description: 'Pengganda pengeluaran pemerintah (k_g = 1 / MPS) selalu lebih besar daripada pengganda pemotongan pajak (k_t = -MPC / MPS), karena stimulus pajak mengalami "kebocoran" terlebih dahulu ke dalam tabungan sebelum dibelanjakan.',
      },
      {
        heading: '4. Teorema Anggaran Berimbang (Balanced Budget Multiplier)',
        description: 'Jika pemerintah menaikkan belanja (G) sebesar Rp 100 T dan membiayainya dengan menaikkan pajak (T) dalam jumlah yang sama persis (Rp 100 T), pendapatan nasional tetap akan meningkat sebesar Rp 100 T (angka pengganda anggaran berimbang = 1).',
      },
    ],
    formulas: [
      {
        name: 'Angka Pengganda Pengeluaran Sederhana',
        formula: 'k = \\frac{1}{1 - MPC} = \\frac{1}{MPS}',
        description: 'Faktor pelipat ganda dampak pengeluaran investasi atau belanja pemerintah terhadap total pendapatan nasional.',
        variables: [
          { symbol: 'k', meaning: 'Angka pengganda pengeluaran investasi / pemerintah' },
          { symbol: 'MPC', meaning: 'Marginal Propensity to Consume (\\Delta C / \\Delta Y_d)' },
          { symbol: 'MPS', meaning: 'Marginal Propensity to Save (\\Delta S / \\Delta Y_d)' },
        ],
      },
      {
        name: 'Angka Pengganda Pajak (Tax Multiplier)',
        formula: 'k_t = -\\frac{MPC}{1 - MPC} = -\\frac{MPC}{MPS}',
        description: 'Dampak perubahan penerimaan pajak terhadap pendapatan nasional (bertanda negatif).',
        variables: [
          { symbol: 'k_t', meaning: 'Pengganda pemotongan atau kenaikan pajak' },
        ],
      },
    ],
    caseStudy: {
      title: 'Studi Kasus: Stimulus Anggaran Pemulihan Ekonomi Nasional (PEN) di Indonesia',
      context: 'Misalkan estimasi nilai MPC masyarakat Indonesia adalah 0,75 (MPS = 0,25). Untuk menggerakkan perekonomian daerah, pemerintah menyalurkan Dana Alokasi Khusus (DAK) infrastruktur jalan desa sebesar Rp 20 Triliun.',
      solutionSteps: [
        'Hitung Angka Pengganda Belanja Pemerintah (k_g) = 1 / (1 - 0,75) = 1 / 0,25 = 4.',
        'Hitung kenaikan total Pendapatan Nasional (ΔY) = k_g × ΔG = 4 × Rp 20 Triliun = Rp 80 Triliun.',
        'Bandingkan jika stimulus diberikan dalam bentuk pemotongan pajak (ΔT = -Rp 20 Triliun): k_t = -0,75 / 0,25 = -3. Maka ΔY = (-3) × (-20 T) = +Rp 60 Triliun.',
      ],
      takeaway: 'Belanja langsung infrastruktur menghasilkan kenaikan output Rp 80 Triliun, lebih besar Rp 20 Triliun dibandingkan pemotongan pajak karena 25% pemotongan pajak langsung ditabung oleh masyarakat tanpa memicu perputaran ekonomi langsung.',
    },
    quiz: [
      {
        question: 'Jika fungsi konsumsi masyarakat adalah C = 100 + 0,8Y, berapakah besarnya angka pengganda investasi (multiplier)?',
        options: [
          '5',
          '4',
          '2,5',
          '1,25',
        ],
        correctIndex: 0,
        explanation: 'Dari fungsi konsumsi C = 100 + 0,8Y, diperoleh MPC = 0,8. Angka pengganda k = 1 / (1 - MPC) = 1 / (1 - 0,8) = 1 / 0,2 = 5.',
      },
    ],
  },
];
