import React, { useState } from 'react';
import { RotateCcw, FileText, CheckCircle, Calculator } from 'lucide-react';

export const DepreciationCalculator: React.FC = () => {
  const [assetName, setAssetName] = useState<string>('Kendaraan Operasional');
  const [cost, setCost] = useState<number>(250000000); // 250 million IDR
  const [salvageValue, setSalvageValue] = useState<number>(50000000); // 50 million IDR
  const [usefulLife, setUsefulLife] = useState<number>(5); // 5 years
  const [method, setMethod] = useState<'straight-line' | 'double-declining' | 'sum-of-years'>('straight-line');

  // Calculate year-by-year schedule
  const schedule = [];
  const depreciableAmount = Math.max(0, cost - salvageValue);

  if (method === 'straight-line') {
    const annualDepreciation = usefulLife > 0 ? depreciableAmount / usefulLife : 0;
    let accumulated = 0;
    let currentBookValue = cost;

    for (let yr = 1; yr <= usefulLife; yr++) {
      const dep = annualDepreciation;
      accumulated += dep;
      const endingBookValue = Math.max(salvageValue, cost - accumulated);
      schedule.push({
        year: yr,
        beginningBookValue: currentBookValue,
        depreciationExpense: dep,
        accumulatedDepreciation: accumulated,
        endingBookValue: endingBookValue,
      });
      currentBookValue = endingBookValue;
    }
  } else if (method === 'double-declining') {
    const rate = usefulLife > 0 ? (2 / usefulLife) : 0;
    let accumulated = 0;
    let currentBookValue = cost;

    for (let yr = 1; yr <= usefulLife; yr++) {
      let dep = currentBookValue * rate;
      // Do not depreciate below salvage value
      if (currentBookValue - dep < salvageValue) {
        dep = Math.max(0, currentBookValue - salvageValue);
      }
      accumulated += dep;
      const endingBookValue = currentBookValue - dep;
      schedule.push({
        year: yr,
        beginningBookValue: currentBookValue,
        depreciationExpense: dep,
        accumulatedDepreciation: accumulated,
        endingBookValue: endingBookValue,
      });
      currentBookValue = endingBookValue;
    }
  } else if (method === 'sum-of-years') {
    const sumOfYears = (usefulLife * (usefulLife + 1)) / 2;
    let accumulated = 0;
    let currentBookValue = cost;

    for (let yr = 1; yr <= usefulLife; yr++) {
      const fraction = (usefulLife - yr + 1) / sumOfYears;
      const dep = depreciableAmount * fraction;
      accumulated += dep;
      const endingBookValue = cost - accumulated;
      schedule.push({
        year: yr,
        beginningBookValue: currentBookValue,
        depreciationExpense: dep,
        accumulatedDepreciation: accumulated,
        endingBookValue: endingBookValue,
      });
      currentBookValue = endingBookValue;
    }
  }

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleReset = () => {
    setAssetName('Kendaraan Operasional');
    setCost(250000000);
    setSalvageValue(50000000);
    setUsefulLife(5);
    setMethod('straight-line');
  };

  const year1Depreciation = schedule.length > 0 ? schedule[0].depreciationExpense : 0;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            <span>Akuntansi Keuangan</span>
            <span aria-hidden="true">·</span>
            <span>Aset Tetap & Depresiasi</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">Kalkulator Penyusutan Aset Tetap & Jurnal Otomatis</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Skedul penyusutan komparatif standar PSAK dengan penjurnalan otomatis penyesuaian akhir periode.
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

      <div className="p-6 space-y-8">
        {/* Input Parameters Controls */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-5 bg-slate-50 rounded-xl border border-slate-200">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Nama Aset Tetap</label>
            <input
              type="text"
              value={assetName}
              onChange={(e) => setAssetName(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Harga Perolehan (Cost)</label>
            <input
              type="number"
              step="10000000"
              value={cost}
              onChange={(e) => setCost(Number(e.target.value))}
              className="w-full px-3 py-2 text-sm font-mono bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 tabular-nums"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Nilai Residu / Sisa (Salvage)</label>
            <input
              type="number"
              step="5000000"
              value={salvageValue}
              onChange={(e) => setSalvageValue(Number(e.target.value))}
              className="w-full px-3 py-2 text-sm font-mono bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 tabular-nums"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Umur Ekonomis (Tahun)</label>
            <input
              type="number"
              min="1"
              max="20"
              value={usefulLife}
              onChange={(e) => setUsefulLife(Math.max(1, Number(e.target.value)))}
              className="w-full px-3 py-2 text-sm font-mono bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900 tabular-nums"
            />
          </div>
        </div>

        {/* Method Selector Tabs */}
        <div>
          <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-2">
            Pilih Metode Penyusutan
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-1 bg-slate-100 rounded-lg">
            <button
              onClick={() => setMethod('straight-line')}
              className={`py-2 px-3 text-xs font-medium rounded-md transition-colors ${
                method === 'straight-line' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              1. Garis Lurus (Straight-Line)
            </button>
            <button
              onClick={() => setMethod('double-declining')}
              className={`py-2 px-3 text-xs font-medium rounded-md transition-colors ${
                method === 'double-declining' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              2. Saldo Menurun Ganda (DDB)
            </button>
            <button
              onClick={() => setMethod('sum-of-years')}
              className={`py-2 px-3 text-xs font-medium rounded-md transition-colors ${
                method === 'sum-of-years' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              3. Jumlah Angka Tahun (SYD)
            </button>
          </div>
        </div>

        {/* Schedule Table */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-slate-700" />
              <span>Tabel Skedul Amortisasi & Penyusutan ({usefulLife} Tahun)</span>
            </h3>
            <span className="text-xs text-slate-500">
              Dasar Penyusutan (Depreciable Cost): {formatRupiah(depreciableAmount)}
            </span>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 uppercase font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-4">Tahun</th>
                  <th className="py-2.5 px-4 font-mono">Nilai Buku Awal</th>
                  <th className="py-2.5 px-4 font-mono">Beban Penyusutan</th>
                  <th className="py-2.5 px-4 font-mono">Akumulasi Penyusutan</th>
                  <th className="py-2.5 px-4 font-mono">Nilai Buku Akhir</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {schedule.map((row) => (
                  <tr key={row.year} className="hover:bg-slate-50">
                    <td className="py-2.5 px-4 font-medium text-slate-900">
                      Tahun ke-{row.year}
                    </td>
                    <td className="py-2.5 px-4 font-mono text-slate-700 tabular-nums">
                      {formatRupiah(row.beginningBookValue)}
                    </td>
                    <td className="py-2.5 px-4 font-mono text-rose-700 font-semibold tabular-nums">
                      {formatRupiah(row.depreciationExpense)}
                    </td>
                    <td className="py-2.5 px-4 font-mono text-amber-700 tabular-nums">
                      {formatRupiah(row.accumulatedDepreciation)}
                    </td>
                    <td className="py-2.5 px-4 font-mono text-slate-900 font-bold tabular-nums">
                      {formatRupiah(row.endingBookValue)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Automated Journal Entry Preview */}
        <div className="p-5 bg-slate-900 text-slate-100 rounded-xl space-y-3">
          <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2">
            <span className="flex items-center gap-1.5 font-semibold text-emerald-400">
              <FileText className="w-4 h-4" />
              <span>Draf Jurnal Penyesuaian Otomatis (Per 31 Desember Tahun 1)</span>
            </span>
            <span className="text-slate-400 font-mono">Basis Standar Akuntansi Keuangan</span>
          </div>

          <div className="font-mono text-xs space-y-2 pt-1">
            <div className="flex justify-between items-center bg-slate-800/80 p-2.5 rounded">
              <div className="flex items-center gap-3">
                <span className="text-emerald-400 font-bold">[DEBIT]</span>
                <span className="text-white">Beban Penyusutan {assetName}</span>
              </div>
              <span className="text-emerald-300 font-bold tabular-nums">
                {formatRupiah(year1Depreciation)}
              </span>
            </div>

            <div className="flex justify-between items-center bg-slate-800/80 p-2.5 rounded">
              <div className="flex items-center gap-3 pl-6">
                <span className="text-sky-400 font-bold">[KREDIT]</span>
                <span className="text-slate-200">Akumulasi Penyusutan {assetName}</span>
              </div>
              <span className="text-sky-300 font-bold tabular-nums">
                {formatRupiah(year1Depreciation)}
              </span>
            </div>
          </div>
          <p className="text-2xs text-slate-400 italic">
            Catatan: Akun Akumulasi Penyusutan adalah akun Kontra Aset (Contra-Asset) yang akan disajikan di Neraca mengurangi nilai bruto {assetName}.
          </p>
        </div>
      </div>
    </div>
  );
};
