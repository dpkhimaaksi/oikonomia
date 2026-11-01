import React, { useState } from 'react';
import { RotateCcw, HelpCircle, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

export const ElasticityCalculator: React.FC = () => {
  const [p1, setP1] = useState<number>(10000); // Rp 10.000
  const [p2, setP2] = useState<number>(12000); // Rp 12.000
  const [q1, setQ1] = useState<number>(500);   // 500 unit
  const [q2, setQ2] = useState<number>(350);   // 350 unit

  // Midpoint elasticity formula:
  // % delta Q = (Q2 - Q1) / ((Q1 + Q2) / 2)
  // % delta P = (P2 - P1) / ((P1 + P2) / 2)
  // Ed = (% delta Q) / (% delta P)
  const avgQ = (q1 + q2) / 2;
  const avgP = (p1 + p2) / 2;

  const pctDeltaQ = avgQ > 0 ? (q2 - q1) / avgQ : 0;
  const pctDeltaP = avgP > 0 ? (p2 - p1) / avgP : 0;

  const ed = pctDeltaP !== 0 ? pctDeltaQ / pctDeltaP : 0;
  const absEd = Math.abs(ed);

  // Total Revenue calculation
  const tr1 = p1 * q1;
  const tr2 = p2 * q2;
  const deltaTR = tr2 - tr1;

  let classification = '';
  let interpretation = '';
  let revenueImpact = '';

  if (absEd > 1) {
    classification = 'Elastis (|Ed| > 1)';
    interpretation = 'Konsumen sangat sensitif terhadap perubahan harga. Persentase penurunan kuantitas yang diminta lebih besar daripada persentase kenaikan harga.';
    if (p2 > p1) {
      revenueImpact = 'Kenaikan harga menurunkan total pendapatan (Total Revenue turun) karena kehilangan volume pembeli yang terlalu banyak.';
    } else {
      revenueImpact = 'Penurunan harga menaikkan total pendapatan (Total Revenue naik) karena menarik lonjakan volume pembeli yang besar.';
    }
  } else if (absEd < 1 && absEd > 0) {
    classification = 'Inelastis (|Ed| < 1)';
    interpretation = 'Konsumen kurang sensitif terhadap perubahan harga (biasanya barang pokok, kebutuhan primer, atau barang tanpa substitusi dekat).';
    if (p2 > p1) {
      revenueImpact = 'Kenaikan harga menguntungkan produsen karena total pendapatan (Total Revenue) meningkat.';
    } else {
      revenueImpact = 'Penurunan harga justru menurunkan total pendapatan karena volume pembelian tidak naik cukup banyak.';
    }
  } else if (absEd === 1) {
    classification = 'Uniter (|Ed| = 1)';
    interpretation = 'Persentase perubahan kuantitas sama persis dengan persentase perubahan harga.';
    revenueImpact = 'Perubahan harga tidak mengubah total pendapatan (Total Revenue konstan).';
  } else if (absEd === 0) {
    classification = 'Inelastis Sempurna (Ed = 0)';
    interpretation = 'Berapapun harga berubah, kuantitas yang diminta tetap sama sekali tidak berubah (contoh: insulin bagi penderita diabetes).';
    revenueImpact = 'Menaikkan harga selalu meningkatkan total pendapatan secara proporsional.';
  }

  const handleReset = () => {
    setP1(10000);
    setP2(12000);
    setQ1(500);
    setQ2(350);
  };

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            <span>Ekonomi Mikro</span>
            <span aria-hidden="true">·</span>
            <span>Sensitivitas Harga & Kebijakan Omzet</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">Kalkulator Elastisitas Permintaan & Analisis Omzet (TR)</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Gunakan rumus elastisitas busur (mid-point formula) untuk memandu penetapan harga strategis bisnis.
          </p>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Standar</span>
        </button>
      </div>

      <div className="p-6 space-y-6">
        {/* Input Parameters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5 bg-slate-50 rounded-xl border border-slate-200">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Harga Semula (P1)</label>
            <input
              type="number"
              step="500"
              value={p1}
              onChange={(e) => setP1(Number(e.target.value))}
              className="w-full px-3 py-2 text-sm font-mono bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 tabular-nums"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Harga Baru (P2)</label>
            <input
              type="number"
              step="500"
              value={p2}
              onChange={(e) => setP2(Number(e.target.value))}
              className="w-full px-3 py-2 text-sm font-mono bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 tabular-nums"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Jumlah Semula (Q1)</label>
            <input
              type="number"
              step="10"
              value={q1}
              onChange={(e) => setQ1(Number(e.target.value))}
              className="w-full px-3 py-2 text-sm font-mono bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 tabular-nums"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Jumlah Baru (Q2)</label>
            <input
              type="number"
              step="10"
              value={q2}
              onChange={(e) => setQ2(Number(e.target.value))}
              className="w-full px-3 py-2 text-sm font-mono bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 tabular-nums"
            />
          </div>
        </div>

        {/* Results Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-sky-50/70 border border-sky-200 rounded-xl space-y-1">
            <span className="text-2xs uppercase text-sky-800 font-semibold block">Koefisien Elastisitas (|Ed|)</span>
            <div className="text-2xl font-bold font-mono text-sky-950 tabular-nums">
              {absEd.toFixed(2)}
            </div>
            <span className="text-xs font-medium text-sky-800 block">
              {classification}
            </span>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1">
            <span className="text-2xs uppercase text-slate-500 font-semibold block">Perubahan Total Revenue (TR)</span>
            <div className="text-xl font-bold font-mono text-slate-900 tabular-nums flex items-center gap-1.5">
              <span>{formatRupiah(tr2)}</span>
              {deltaTR > 0 ? (
                <span className="text-xs font-semibold text-emerald-600 flex items-center">
                  <ArrowUpRight className="w-3.5 h-3.5" /> +{formatRupiah(deltaTR)}
                </span>
              ) : deltaTR < 0 ? (
                <span className="text-xs font-semibold text-rose-600 flex items-center">
                  <ArrowDownRight className="w-3.5 h-3.5" /> {formatRupiah(deltaTR)}
                </span>
              ) : (
                <span className="text-xs font-semibold text-slate-500 flex items-center">
                  <Minus className="w-3.5 h-3.5" /> Rp 0
                </span>
              )}
            </div>
            <span className="text-xs text-slate-500 block">
              Dari sebelumnya: {formatRupiah(tr1)}
            </span>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <span className="text-2xs uppercase text-slate-500 font-semibold block">Rincian Persentase</span>
            <div className="text-xs space-y-1 pt-1 text-slate-700">
              <div className="flex justify-between">
                <span>Perubahan Harga (%ΔP):</span>
                <span className="font-mono font-semibold tabular-nums">{(pctDeltaP * 100).toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span>Perubahan Kuantitas (%ΔQ):</span>
                <span className="font-mono font-semibold tabular-nums">{(pctDeltaQ * 100).toFixed(1)}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Managerial Strategy Guidance */}
        <div className="p-5 bg-slate-900 text-slate-100 rounded-xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
            <HelpCircle className="w-4 h-4" />
            <span>Rekomendasi Strategi Penetapan Harga (Pricing Strategy Takeaway):</span>
          </div>
          <p className="text-xs leading-relaxed text-slate-300">
            {interpretation}
          </p>
          <p className="text-xs font-medium text-emerald-400 bg-slate-800/80 p-3 rounded border border-slate-800">
            {revenueImpact}
          </p>
        </div>
      </div>
    </div>
  );
};
