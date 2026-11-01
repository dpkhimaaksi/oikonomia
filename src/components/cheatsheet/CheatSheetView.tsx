import React, { useState } from 'react';
import { Printer, Download, BookMarked, Calculator, Layers, HelpCircle } from 'lucide-react';
import { CategoryId } from '../../types';

export const CheatSheetView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<CategoryId | 'semua'>('semua');

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Control Bar (Hidden during print) */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-4 no-print">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              <span>Lembar Ringkasan Rumus & Konsep</span>
              <span aria-hidden="true">·</span>
              <span>Siap Cetak & PDF</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">Cheat Sheet Edukasi Oikonomia</h2>
            <p className="text-sm text-slate-500 mt-0.5">
              Rangkuman padat rumus, saldo normal akun, kurva ekuilibrium, dan bauran kebijakan untuk ujian dan analisis praktis.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shadow-2xs"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Simpan PDF</span>
            </button>
          </div>
        </div>

        {/* Tab Filter */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg pt-1">
          <button
            onClick={() => setActiveTab('semua')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'semua' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Semua Modul Lengkap
          </button>
          <button
            onClick={() => setActiveTab('akuntansi')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'akuntansi' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Akuntansi
          </button>
          <button
            onClick={() => setActiveTab('mikro')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'mikro' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Ekonomi Mikro
          </button>
          <button
            onClick={() => setActiveTab('makro')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              activeTab === 'makro' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Ekonomi Makro
          </button>
        </div>
      </div>

      {/* Printable Sheet Area */}
      <div className="print-area space-y-8">
        {/* ========================================= */}
        {/* MODUL 1: AKUNTANSI CHEAT SHEET */}
        {/* ========================================= */}
        {(activeTab === 'semua' || activeTab === 'akuntansi') && (
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-4">
            <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
              <div>
                <span className="text-2xs font-bold text-sky-700 uppercase tracking-wider block">MODUL 01</span>
                <h3 className="text-lg font-bold text-slate-900">Rangkuman Pokok Akuntansi Keuangan & Biaya</h3>
              </div>
              <span className="text-xs text-slate-400 font-mono no-print">Format Kompak SAK</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Saldo Normal & Persamaan */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                <span className="font-bold text-slate-900 block border-b border-slate-200 pb-1">
                  1. Persamaan Dasar & Saldo Normal
                </span>
                <div className="font-mono bg-white p-2 rounded border border-slate-200 text-slate-800 text-center font-semibold">
                  Aset = Liabilitas + Ekuitas + (Pendapatan - Beban) - Prive
                </div>
                <div className="space-y-1 text-slate-700 pt-1">
                  <div>• <strong>Bertambah di DEBIT:</strong> Aset, Beban, Prive (Mnemonic: ADE)</div>
                  <div>• <strong>Bertambah di KREDIT:</strong> Liabilitas, Ekuitas, Pendapatan (Mnemonic: LER)</div>
                </div>
              </div>

              {/* Analisis CVP & Titik Impas */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                <span className="font-bold text-slate-900 block border-b border-slate-200 pb-1">
                  2. Analisis Biaya-Volume-Laba (CVP)
                </span>
                <div className="font-mono bg-white p-2 rounded border border-slate-200 text-slate-800 text-center font-semibold">
                  BEP (Unit) = FC / (P - VC_unit) = FC / CM_unit
                </div>
                <div className="font-mono bg-white p-2 rounded border border-slate-200 text-slate-800 text-center font-semibold">
                  BEP (Rupiah) = FC / (CM / P) = FC / Rasio CM
                </div>
                <div className="text-slate-600 text-2xs pt-1">
                  Margin of Safety = (Penjualan Riil - Penjualan BEP) / Penjualan Riil
                </div>
              </div>

              {/* Rasio Likuiditas & Solvabilitas */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                <span className="font-bold text-slate-900 block border-b border-slate-200 pb-1">
                  3. Rasio Keuangan Pokok
                </span>
                <div className="space-y-1 text-slate-700">
                  <div>• <strong>Current Ratio:</strong> Aset Lancar / Liabilitas Lancar (Benchmark &ge; 1,5x)</div>
                  <div>• <strong>Quick Ratio:</strong> (Aset Lancar - Persediaan) / Liabilitas Lancar</div>
                  <div>• <strong>Debt to Equity (DER):</strong> Total Liabilitas / Total Ekuitas</div>
                  <div>• <strong>ROA:</strong> Laba Bersih / Total Aset &nbsp;|&nbsp; <strong>ROE:</strong> Laba Bersih / Total Ekuitas</div>
                </div>
              </div>

              {/* Metode Penyusutan */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                <span className="font-bold text-slate-900 block border-b border-slate-200 pb-1">
                  4. Formula Depresiasi Aset Tetap
                </span>
                <div className="space-y-1 text-slate-700">
                  <div>• <strong>Garis Lurus:</strong> (Harga Perolehan - Nilai Residu) / Umur Ekonomis</div>
                  <div>• <strong>Saldo Menurun Ganda:</strong> Nilai Buku Awal × (2 / Umur Ekonomis)</div>
                  <div>• <strong>Jurnal Penyesuaian:</strong> Debit: Beban Penyusutan | Kredit: Akumulasi Penyusutan</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================= */}
        {/* MODUL 2: EKONOMI MIKRO CHEAT SHEET */}
        {/* ========================================= */}
        {(activeTab === 'semua' || activeTab === 'mikro') && (
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-4">
            <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
              <div>
                <span className="text-2xs font-bold text-emerald-700 uppercase tracking-wider block">MODUL 02</span>
                <h3 className="text-lg font-bold text-slate-900">Rangkuman Pokok Teori Ekonomi Mikro</h3>
              </div>
              <span className="text-xs text-slate-400 font-mono no-print">Pasar & Produsen-Konsumen</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Elastisitas Permintaan */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                <span className="font-bold text-slate-900 block border-b border-slate-200 pb-1">
                  1. Elastisitas Harga Permintaan (Ed)
                </span>
                <div className="font-mono bg-white p-2 rounded border border-slate-200 text-slate-800 text-center font-semibold">
                  Ed = (%ΔQd) / (%ΔP) = (dQ / dP) × (P / Q)
                </div>
                <div className="space-y-1 text-slate-700 pt-1">
                  <div>• <strong>|Ed| &gt; 1 (Elastis):</strong> Harga naik → Total Revenue TURUN.</div>
                  <div>• <strong>|Ed| &lt; 1 (Inelastis):</strong> Harga naik → Total Revenue NAIK.</div>
                  <div>• <strong>|Ed| = 1 (Uniter):</strong> Total Revenue konstan/maksimal.</div>
                </div>
              </div>

              {/* Maksimisasi Laba & Struktur Pasar */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                <span className="font-bold text-slate-900 block border-b border-slate-200 pb-1">
                  2. Kaidah Maksimisasi Laba & Struktur Pasar
                </span>
                <div className="font-mono bg-white p-2 rounded border border-slate-200 text-slate-800 text-center font-semibold">
                  MR = MC (Syarat Laba Maksimum Universal)
                </div>
                <div className="space-y-1 text-slate-700 pt-1">
                  <div>• <strong>Persaingan Sempurna:</strong> P = AR = MR = MC. Laba jangka panjang = normal (0).</div>
                  <div>• <strong>Monopoli:</strong> MR = MC &lt; P. Indeks Lerner L = (P - MC) / P = -1/Ed.</div>
                  <div>• <strong>Oligopoli:</strong> Saling ketergantungan, Kurva Patah (Kinked Demand Curve).</div>
                </div>
              </div>

              {/* Kurva Biaya Produksi */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                <span className="font-bold text-slate-900 block border-b border-slate-200 pb-1">
                  3. Hubungan Biaya Produksi Jangka Pendek
                </span>
                <div className="space-y-1 text-slate-700">
                  <div>• <strong>TC = FC + VC</strong> &nbsp;|&nbsp; <strong>ATC = AFC + AVC</strong></div>
                  <div>• <strong>MC = dTC / dQ = dVC / dQ</strong></div>
                  <div>• Kurva MC selalu memotong kurva AVC dan ATC tepat di titik MINIMUM-nya.</div>
                </div>
              </div>

              {/* Intervensi Pemerintah & DWL */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                <span className="font-bold text-slate-900 block border-b border-slate-200 pb-1">
                  4. Intervensi Pasar & Deadweight Loss
                </span>
                <div className="space-y-1 text-slate-700">
                  <div>• <strong>Price Ceiling (HET):</strong> Efektif jika &lt; P* → Memicu Kelangkaan (Shortage).</div>
                  <div>• <strong>Price Floor (HPP):</strong> Efektif jika &gt; P* → Memicu Surplus Pasokan.</div>
                  <div>• <strong>Deadweight Loss (DWL):</strong> 1/2 × (ΔP pajak) × (ΔQ berkurang).</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================= */}
        {/* MODUL 3: EKONOMI MAKRO CHEAT SHEET */}
        {/* ========================================= */}
        {(activeTab === 'semua' || activeTab === 'makro') && (
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-4">
            <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
              <div>
                <span className="text-2xs font-bold text-amber-700 uppercase tracking-wider block">MODUL 03</span>
                <h3 className="text-lg font-bold text-slate-900">Rangkuman Pokok Teori Ekonomi Makro</h3>
              </div>
              <span className="text-xs text-slate-400 font-mono no-print">Kebijakan Fiskal, Moneter & PDB</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Tiga Pendekatan PDB */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                <span className="font-bold text-slate-900 block border-b border-slate-200 pb-1">
                  1. Perhitungan Pendapatan Nasional (PDB)
                </span>
                <div className="font-mono bg-white p-2 rounded border border-slate-200 text-slate-800 text-center font-semibold">
                  Pengeluaran: Y = C + I + G + (X - M)
                </div>
                <div className="font-mono bg-white p-2 rounded border border-slate-200 text-slate-800 text-center font-semibold">
                  Pendapatan: Y = Upah (w) + Sewa (r) + Bunga (i) + Laba (π)
                </div>
                <div className="text-slate-600 text-2xs pt-1">
                  Deflator PDB = (PDB Nominal / PDB Riil) × 100
                </div>
              </div>

              {/* Multiplier Keynesian */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                <span className="font-bold text-slate-900 block border-b border-slate-200 pb-1">
                  2. Angka Pengganda (Multiplier Effect)
                </span>
                <div className="font-mono bg-white p-2 rounded border border-slate-200 text-slate-800 text-center font-semibold">
                  k = 1 / (1 - MPC) = 1 / MPS &nbsp;(k_g belanja)
                </div>
                <div className="font-mono bg-white p-2 rounded border border-slate-200 text-slate-800 text-center font-semibold">
                  k_t = -MPC / (1 - MPC) = -MPC / MPS &nbsp;(k_t pajak)
                </div>
                <div className="text-slate-600 text-2xs pt-1">
                  Pengganda Anggaran Berimbang (Balanced Budget Multiplier) = 1
                </div>
              </div>

              {/* Bauran Kebijakan Moneter vs Fiskal */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                <span className="font-bold text-slate-900 block border-b border-slate-200 pb-1">
                  3. Instrumen Kebijakan Moneter & Fiskal
                </span>
                <div className="space-y-1 text-slate-700">
                  <div>• <strong>Moneter BI (Kontraktif):</strong> Naikkan BI-Rate, naikkan GWM, jual SRBI/SBN.</div>
                  <div>• <strong>Moneter BI (Ekspansif):</strong> Turunkan BI-Rate, turunkan GWM, beli SBN.</div>
                  <div>• <strong>Fiskal APBN:</strong> Belanja Negara (G) dan Kebijakan Tarif Pajak (T).</div>
                </div>
              </div>

              {/* Isu Inflasi & Pengangguran */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                <span className="font-bold text-slate-900 block border-b border-slate-200 pb-1">
                  4. Inflasi, Pengangguran, & Kurs
                </span>
                <div className="space-y-1 text-slate-700">
                  <div>• <strong>Kurva Phillips:</strong> Trade-off jangka pendek antara Inflasi dan Pengangguran.</div>
                  <div>• <strong>Jenis Pengangguran:</strong> Friksional (transisi kerja), Struktural (skill mismatch), Siklikal (resesi).</div>
                  <div>• <strong>Kurs Valas:</strong> Apresiasi (IDR menguat) vs Depresiasi (IDR melemah).</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
