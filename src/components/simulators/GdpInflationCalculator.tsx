import React, { useState } from 'react';
import { RotateCcw, TrendingUp, DollarSign, Layers } from 'lucide-react';

export const GdpInflationCalculator: React.FC = () => {
  const [baseYear, setBaseYear] = useState<number>(2020);
  const [currentYear, setCurrentYear] = useState<number>(2026);

  // GDP Inputs in Trillion IDR
  const [nominalGdp, setNominalGdp] = useState<number>(22500); // 22,500 Trillion
  const [realGdp, setRealGdp] = useState<number>(13200);       // 13,200 Trillion
  const [prevRealGdp, setPrevRealGdp] = useState<number>(12550); // Previous year real GDP

  // CPI (IHK) Inputs
  const [prevCpi, setPrevCpi] = useState<number>(115.2);
  const [currCpi, setCurrCpi] = useState<number>(118.4);

  // Calculations
  const gdpDeflator = realGdp > 0 ? (nominalGdp / realGdp) * 100 : 0;
  const cumulativeInflationFromBase = gdpDeflator - 100;
  const realGdpGrowth = prevRealGdp > 0 ? ((realGdp - prevRealGdp) / prevRealGdp) * 100 : 0;
  const cpiInflationRate = prevCpi > 0 ? ((currCpi - prevCpi) / prevCpi) * 100 : 0;

  const handleReset = () => {
    setBaseYear(2020);
    setCurrentYear(2026);
    setNominalGdp(22500);
    setRealGdp(13200);
    setPrevRealGdp(12550);
    setPrevCpi(115.2);
    setCurrCpi(118.4);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            <span>Ekonomi Makro</span>
            <span aria-hidden="true">·</span>
            <span>Agregat Nasional & Stabilitas Harga</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">Kalkulator PDB Riil, Nominal & Deflator Inflasi</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Menghitung indikator output riil, Deflator PDB, dan laju inflasi Indeks Harga Konsumen (IHK) tahunan.
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
        {/* Input Parameters Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-5 bg-slate-50 rounded-xl border border-slate-200">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">PDB Nominal Tahun Ini (Rp Triliun)</label>
            <input
              type="number"
              step="500"
              value={nominalGdp}
              onChange={(e) => setNominalGdp(Number(e.target.value))}
              className="w-full px-3 py-2 text-sm font-mono bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 tabular-nums"
            />
            <span className="text-2xs text-slate-500 block mt-1">Dihitung dengan harga berlaku saat ini</span>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">PDB Riil Tahun Ini (Rp Triliun)</label>
            <input
              type="number"
              step="500"
              value={realGdp}
              onChange={(e) => setRealGdp(Number(e.target.value))}
              className="w-full px-3 py-2 text-sm font-mono bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 tabular-nums"
            />
            <span className="text-2xs text-slate-500 block mt-1">Dihitung dengan harga konstan tahun dasar {baseYear}</span>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">PDB Riil Tahun Sebelumnya</label>
            <input
              type="number"
              step="500"
              value={prevRealGdp}
              onChange={(e) => setPrevRealGdp(Number(e.target.value))}
              className="w-full px-3 py-2 text-sm font-mono bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 tabular-nums"
            />
            <span className="text-2xs text-slate-500 block mt-1">Tolak ukur pertumbuhan ekonomi tahunan (YoY)</span>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">IHK Periode Awal & Akhir</label>
            <div className="flex gap-2">
              <input
                type="number"
                step="0.1"
                placeholder="IHK Awal"
                value={prevCpi}
                onChange={(e) => setPrevCpi(Number(e.target.value))}
                className="w-1/2 px-2 py-2 text-xs font-mono bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 tabular-nums"
              />
              <input
                type="number"
                step="0.1"
                placeholder="IHK Akhir"
                value={currCpi}
                onChange={(e) => setCurrCpi(Number(e.target.value))}
                className="w-1/2 px-2 py-2 text-xs font-mono bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 tabular-nums"
              />
            </div>
            <span className="text-2xs text-slate-500 block mt-1">Indeks Harga Konsumen dari data BPS</span>
          </div>
        </div>

        {/* Key Metrics Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-sky-50/70 border border-sky-200 rounded-xl space-y-1">
            <span className="text-2xs uppercase text-sky-800 font-semibold block">Deflator PDB</span>
            <div className="text-2xl font-bold font-mono text-sky-950 tabular-nums">
              {gdpDeflator.toFixed(1)}
            </div>
            <span className="text-xs text-sky-800 block">
              Inflasi Kumulatif: +{cumulativeInflationFromBase.toFixed(1)}% sejak {baseYear}
            </span>
          </div>

          <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1">
            <span className="text-2xs uppercase text-emerald-800 font-semibold block">Pertumbuhan Ekonomi Riil</span>
            <div className="text-2xl font-bold font-mono text-emerald-950 tabular-nums">
              +{realGdpGrowth.toFixed(2)}%
            </div>
            <span className="text-xs text-emerald-800 block">
              Pertumbuhan kapasitas fisik barang & jasa
            </span>
          </div>

          <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1">
            <span className="text-2xs uppercase text-amber-800 font-semibold block">Laju Inflasi IHK Tahunan</span>
            <div className="text-2xl font-bold font-mono text-amber-950 tabular-nums">
              {cpiInflationRate.toFixed(2)}%
            </div>
            <span className="text-xs text-amber-800 block">
              Perubahan keranjang belanja kebutuhan masyarakat
            </span>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
            <span className="text-2xs uppercase text-slate-500 font-semibold block">Rasio Nominal / Riil</span>
            <div className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
              {(nominalGdp / realGdp).toFixed(2)}x
            </div>
            <span className="text-xs text-slate-500 block">
              Faktor kenaikan harga murni
            </span>
          </div>
        </div>

        {/* Method Comparison Card */}
        <div className="p-5 bg-slate-900 text-slate-100 rounded-xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
            <Layers className="w-4 h-4" />
            <span>Perbedaan Deflator PDB vs Indeks Harga Konsumen (IHK / CPI):</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300 pt-1">
            <div className="p-3 bg-slate-800/80 rounded border border-slate-800 space-y-1">
              <span className="font-bold text-white block">1. Deflator PDB (GDP Deflator)</span>
              <p className="text-slate-400 leading-relaxed">
                Mencakup <strong>seluruh barang dan jasa baru yang diproduksi di dalam negeri</strong> (termasuk pesawat militer, mesin pabrik, dan ekspor). Tidak mencakup barang impor yang dibeli konsumen. Bobotnya otomatis berubah setiap tahun mengikuti pola produksi agregat.
              </p>
            </div>
            <div className="p-3 bg-slate-800/80 rounded border border-slate-800 space-y-1">
              <span className="font-bold text-white block">2. Indeks Harga Konsumen (IHK)</span>
              <p className="text-slate-400 leading-relaxed">
                Mengukur biaya pembelian <strong>keranjang tetap barang dan jasa konsumsi rumah tangga biasa</strong> (makanan pokok, sewa rumah, bensin, pulsa, termasuk barang impor seperti gandum atau HP).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
