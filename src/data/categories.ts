import { Category, Topic } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'akuntansi',
    name: 'Akuntansi',
    slug: 'akuntansi',
    description: 'Siklus akuntansi keuangan, penjurnalan, pelaporan keuangan berstandar SAK, akuntansi manajemen, hingga analisis rasio dan perpajakan.',
    badgeLabel: 'Financial & Management Accounting',
    topicsCount: 4,
  },
  {
    id: 'mikro',
    name: 'Ekonomi Mikro',
    slug: 'ekonomi-mikro',
    description: 'Analisis pengambilan keputusan pelaku ekonomi individu: teori utilitas konsumen, fungsi produksi, elastisitas, ekuilibrium pasar, dan struktur pasar.',
    badgeLabel: 'Microeconomic Theory',
    topicsCount: 4,
  },
  {
    id: 'makro',
    name: 'Ekonomi Makro',
    slug: 'ekonomi-makro',
    description: 'Kinerja agregat perekonomian nasional: PDB, inflasi, tingkat pengangguran, kebijakan moneter Bank Indonesia, dan kebijakan fiskal APBN.',
    badgeLabel: 'Macroeconomic Policy',
    topicsCount: 4,
  },
];

export const TOPICS: Topic[] = [
  // Akuntansi Topics
  {
    id: 'akt-1',
    categoryId: 'akuntansi',
    title: 'Akuntansi Keuangan Dasar & Siklus Akuntansi',
    slug: 'akuntansi-keuangan-dasar',
    order: 1,
    summary: 'Persamaan dasar akuntansi, aturan debit-kredit, jurnal penyesuaian, neraca saldo hingga penyusunan laporan keuangan lengkap.',
  },
  {
    id: 'akt-2',
    categoryId: 'akuntansi',
    title: 'Akuntansi Manajemen & Analisis Biaya',
    slug: 'akuntansi-manajemen-biaya',
    order: 2,
    summary: 'Klasifikasi biaya tetap/variabel, analisis Cost-Volume-Profit (CVP), Titik Impas (BEP), dan sistem kalkulasi biaya produksi.',
  },
  {
    id: 'akt-3',
    categoryId: 'akuntansi',
    title: 'Perpajakan & Analisis Laporan Keuangan',
    slug: 'perpajakan-analisis-keuangan',
    order: 3,
    summary: 'Ketentuan PPh & PPN Indonesia, serta interpretasi rasio likuiditas, solvabilitas, profitabilitas, dan perputaran aset.',
  },
  {
    id: 'akt-4',
    categoryId: 'akuntansi',
    title: 'Akuntansi Aset Tetap & Depresiasi',
    slug: 'aset-tetap-depresiasi',
    order: 4,
    summary: 'Penilaian harga perolehan aset tetap, metode penyusutan (Garis Lurus, Saldo Menurun), pelepasan aset, dan penjurnalan.',
  },

  // Mikro Topics
  {
    id: 'mik-1',
    categoryId: 'mikro',
    title: 'Pengantar Teori Dasar & Kelangkaan',
    slug: 'pengantar-teori-kelangkaan',
    order: 1,
    summary: 'Konsep kelangkaan (scarcity), biaya peluang (opportunity cost), dan kurva kemungkinan produksi (PPC/PPF).',
  },
  {
    id: 'mik-2',
    categoryId: 'mikro',
    title: 'Permintaan, Penawaran, & Ekuilibrium Pasar',
    slug: 'permintaan-penawaran-ekuilibrium',
    order: 2,
    summary: 'Hukum permintaan/penawaran, pembentukan harga keseimbangan, intervensi harga maksimum/minimum, pajak, dan bobot mati (deadweight loss).',
  },
  {
    id: 'mik-3',
    categoryId: 'mikro',
    title: 'Elastisitas & Perilaku Konsumen-Produsen',
    slug: 'elastisitas-perilaku-ekonomi',
    order: 3,
    summary: 'Elastisitas harga permintaan, kurva indiferens & garis anggaran, fungsi produksi, diminishing returns, dan struktur biaya TC/MC.',
  },
  {
    id: 'mik-4',
    categoryId: 'mikro',
    title: 'Struktur Pasar & Penentuan Harga',
    slug: 'struktur-pasar-penentuan-harga',
    order: 4,
    summary: 'Perbandingan karakteristik pasar persaingan sempurna, monopoli murni, oligopoli dengan kurva patah (kinked demand), dan persaingan monopolistik.',
  },

  // Makro Topics
  {
    id: 'mak-1',
    categoryId: 'makro',
    title: 'Pendapatan Nasional & Perhitungan PDB',
    slug: 'pendapatan-nasional-pdb',
    order: 1,
    summary: 'Metode pengeluaran, pendapatan, dan nilai tambah produksi; PDB riil vs nominal, deflator PDB, dan pendapatan per kapita.',
  },
  {
    id: 'mak-2',
    categoryId: 'makro',
    title: 'Keseimbangan Agregat & Angka Pengganda',
    slug: 'keseimbangan-agregat-multiplier',
    order: 2,
    summary: 'Model IS-LM, kurva AD-AS, fungsi konsumsi Keynesian, dan perhitungan angka pengganda pengeluaran serta pajak.',
  },
  {
    id: 'mak-3',
    categoryId: 'makro',
    title: 'Kebijakan Moneter & Kebijakan Fiskal',
    slug: 'kebijakan-moneter-fiskal',
    order: 3,
    summary: 'Instrumen Bank Indonesia (BI-Rate, GWM, OPT) serta APBN pemerintah (anggaran defisit/surplus, pajak kontra-siklis).',
  },
  {
    id: 'mak-4',
    categoryId: 'makro',
    title: 'Inflasi, Pengangguran, & Neraca Pembayaran',
    slug: 'inflasi-pengangguran-neraca',
    order: 4,
    summary: 'Indeks Harga Konsumen (IHK), jenis inflasi, pengangguran alami & siklikal, trade-off kurva Phillips, dan kurs valuta asing.',
  },
];
