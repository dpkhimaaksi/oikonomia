import React, { useState } from 'react';
import { RotateCcw, TrendingUp, Layers, CheckCircle2 } from 'lucide-react';

export const MultiplierEffectCalculator: React.FC = () => {
  const [mpc, setMpc] = useState<number>(0.8);
  const [injectionAmount, setInjectionAmount] = useState<number>(50); // In Trillion IDR
  const [injectionType, setInjectionType] = useState<'government' | 'investment'>('government');

  const mps = 1 - mpc;
  const spendingMultiplier = 1 / mps;
  const taxMultiplier = -mpc / mps;
  const totalIncomeChange = spendingMultiplier * injectionAmount;

  // Calculate 5 ripple rounds
  const rounds = [];
  let currentIncome = injectionAmount;
  let cumulativeIncome = 0;

  for (let i = 1; i <= 5; i++) {
    const consumed = currentIncome * mpc;
    const saved = currentIncome * mps;
    cumulativeIncome += currentIncome;
    rounds.push({
      round: i,
      newIncome: currentIncome,
      consumption: consumed,
      leakageSavings: saved,
      cumulative: cumulativeIncome,
    });
    currentIncome = consumed;
  }

  const handleReset = () => {
    setMpc(0.8);
    setInjectionAmount(50);
    setInjectionType('government');
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            <span>Ekonomi Makro</span>
            <span aria-hidden="true">·</span>
            <span>Kalkulator Keynesian Agregat</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">Kalkulator Angka Pengganda (Multiplier Effect)</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Simulasi pelipatgandaan dampak stimulus pengeluaran fiskal atau investasi swasta terhadap PDB riil.
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-5 bg-slate-50 rounded-xl border border-slate-200">
          {/* MPC Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-700">Marginal Propensity to Consume (MPC)</span>
              <span className="font-mono font-bold text-sky-700 text-sm tabular-nums">{mpc.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="0.95"
              step="0.05"
              value={mpc}
              onChange={(e) => setMpc(Number(e.target.value))}
              className="w-full accent-sky-600"
            />
            <div className="flex justify-between text-2xs text-slate-500">
              <span>Konsumsi: {(mpc * 100).toFixed(0)}%</span>
              <span>Tabungan (MPS): {(mps * 100).toFixed(0)}%</span>
            </div>
          </div>

          {/* Injection Amount */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-700">Suntikan Dana Awal (ΔG / ΔI)</span>
              <span className="font-mono font-bold text-slate-900 text-sm tabular-nums">Rp {injectionAmount} Triliun</span>
            </div>
            <input
              type="range"
              min="5"
              max="200"
              step="5"
              value={injectionAmount}
              onChange={(e) => setInjectionAmount(Number(e.target.value))}
              className="w-full accent-emerald-600"
            />
            <span className="text-2xs text-slate-500 block">
              Contoh: Proyek infrastruktur tol atau realisasi investasi pabrik baterai.
            </span>
          </div>

          {/* Multiplier KPI Cards */}
          <div className="flex flex-col justify-center space-y-2">
            <div className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-slate-200">
              <span className="text-xs text-slate-600">Angka Pengganda (k):</span>
              <span className="text-base font-bold font-mono text-emerald-700 tabular-nums">
                {spendingMultiplier.toFixed(2)}x
              </span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-slate-200">
              <span className="text-xs text-slate-600">Total Kenaikan PDB (ΔY):</span>
              <span className="text-base font-bold font-mono text-slate-900 tabular-nums">
                Rp {totalIncomeChange.toFixed(1)} T
              </span>
            </div>
          </div>
        </div>

        {/* Visual Waterfall Stages (Putaran Uang Berantai) */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>Simulasi 5 Putaran Transmisi Keynesian (Rounds of Multiplier)</span>
            </h3>
            <span className="text-xs text-slate-500">
              Dari suntikan awal Rp {injectionAmount} T menjadi Rp {totalIncomeChange.toFixed(1)} T
            </span>
          </div>

          {/* Visual Bars */}
          <div className="space-y-2.5">
            {rounds.map((item) => {
              const widthPct = Math.min(100, (item.newIncome / injectionAmount) * 100);
              return (
                <div key={item.round} className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-600">
                    <span className="font-medium text-slate-800">
                      Putaran {item.round} {item.round === 1 ? '(Suntikan Awal)' : `(Dibelanjakan ${ (mpc * 100).toFixed(0) }%)`}
                    </span>
                    <span className="font-mono text-slate-900 font-semibold tabular-nums">
                      +Rp {item.newIncome.toFixed(2)} Triliun
                    </span>
                  </div>
                  <div className="h-6 w-full bg-slate-100 rounded-md overflow-hidden flex">
                    <div
                      style={{ width: `${widthPct}%` }}
                      className="bg-sky-700 flex items-center justify-between px-2 text-2xs text-white font-medium transition-all duration-300"
                    >
                      <span className="truncate">Konsumsi: Rp {item.consumption.toFixed(2)} T</span>
                    </div>
                    <div
                      style={{ width: `${Math.max(4, 100 - widthPct)}%` }}
                      className="bg-slate-200/60"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Table */}
        <div className="overflow-x-auto border border-slate-200 rounded-lg">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 uppercase font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4">Putaran Perputaran</th>
                <th className="py-2.5 px-4 font-mono">Pendapatan Baru (ΔY)</th>
                <th className="py-2.5 px-4 font-mono">Konsumsi Baru (ΔC = MPC × ΔY)</th>
                <th className="py-2.5 px-4 font-mono">Kebocoran Tabungan (MPS × ΔY)</th>
                <th className="py-2.5 px-4 font-mono">Akumulasi Kenaikan PDB</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rounds.map((r) => (
                <tr key={r.round} className="hover:bg-slate-50">
                  <td className="py-2.5 px-4 font-medium text-slate-900">
                    Putaran {r.round}
                  </td>
                  <td className="py-2.5 px-4 font-mono text-slate-800 tabular-nums">
                    Rp {r.newIncome.toFixed(2)} T
                  </td>
                  <td className="py-2.5 px-4 font-mono text-sky-700 font-semibold tabular-nums">
                    Rp {r.consumption.toFixed(2)} T
                  </td>
                  <td className="py-2.5 px-4 font-mono text-amber-700 tabular-nums">
                    Rp {r.leakageSavings.toFixed(2)} T
                  </td>
                  <td className="py-2.5 px-4 font-mono text-slate-900 font-bold tabular-nums">
                    Rp {r.cumulative.toFixed(2)} T
                  </td>
                </tr>
              ))}
              <tr className="bg-emerald-50/80 font-bold text-slate-900">
                <td className="py-3 px-4">Total Akhir (Setelah n-Putaran)</td>
                <td className="py-3 px-4 font-mono text-emerald-800 tabular-nums">
                  Rp {totalIncomeChange.toFixed(2)} T
                </td>
                <td className="py-3 px-4 font-mono text-emerald-800 tabular-nums">
                  Rp {(totalIncomeChange * mpc).toFixed(2)} T
                </td>
                <td className="py-3 px-4 font-mono text-emerald-800 tabular-nums">
                  Rp {injectionAmount.toFixed(2)} T (Menutup Injeksi)
                </td>
                <td className="py-3 px-4 font-mono text-emerald-900 tabular-nums">
                  Rp {totalIncomeChange.toFixed(2)} T
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Insight Box */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-700 space-y-1">
            <span className="font-bold text-slate-900 block">Kaidah Multiplier Keynesian:</span>
            <p>
              Dengan MPC = {mpc.toFixed(2)}, setiap Rp 1 belanja langsung pemerintah menciptakan <strong>Rp {spendingMultiplier.toFixed(2)}</strong> nilai output agregat baru di dalam perekonomian. Kebocoran ke dalam tabungan (MPS = {mps.toFixed(2)}) adalah faktor yang pada akhirnya menghentikan siklus berantai tersebut sehingga total kenaikan berhingga pada Rp {totalIncomeChange.toFixed(1)} Triliun.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
