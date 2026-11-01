import React, { useState } from 'react';
import { RotateCcw, AlertTriangle, CheckCircle, Info } from 'lucide-react';

export const MarketEquilibriumSimulator: React.FC = () => {
  // Demand parameters: P = a - bQ
  const [demandA, setDemandA] = useState<number>(100);
  const [demandB, setDemandB] = useState<number>(0.8);

  // Supply parameters: P = c + dQ
  const [supplyC, setSupplyC] = useState<number>(20);
  const [supplyD, setSupplyD] = useState<number>(0.8);

  // Policy interventions
  const [policyMode, setPolicyMode] = useState<'none' | 'ceiling' | 'floor' | 'tax' | 'subsidy'>('none');
  const [priceCeiling, setPriceCeiling] = useState<number>(50);
  const [priceFloor, setPriceFloor] = useState<number>(70);
  const [taxRate, setTaxRate] = useState<number>(15);
  const [subsidyRate, setSubsidyRate] = useState<number>(15);

  // Natural equilibrium without intervention
  // a - bQ = c + dQ => Q* = (a - c) / (b + d)
  const qEquilibrium = Math.max(0, (demandA - supplyC) / (demandB + supplyD));
  const pEquilibrium = demandA - demandB * qEquilibrium;

  // Intervened values
  let effectivePConsumer = pEquilibrium;
  let effectivePProducer = pEquilibrium;
  let effectiveQ = qEquilibrium;
  let shortageOrSurplus: { type: 'shortage' | 'surplus' | 'none'; amount: number } = { type: 'none', amount: 0 };
  let deadweightLoss = 0;
  let taxOrSubsidyAmount = 0;

  if (policyMode === 'ceiling') {
    if (priceCeiling < pEquilibrium) {
      // Effective ceiling
      const qDemanded = Math.max(0, (demandA - priceCeiling) / demandB);
      const qSupplied = Math.max(0, (priceCeiling - supplyC) / supplyD);
      effectiveQ = Math.min(qDemanded, qSupplied);
      effectivePConsumer = priceCeiling;
      effectivePProducer = priceCeiling;
      shortageOrSurplus = { type: 'shortage', amount: Math.max(0, qDemanded - qSupplied) };
      // DWL triangle: base is (P_demand(q_eff) - P_supply(q_eff)), height is (qEquilibrium - effectiveQ)
      const pDAtQeff = demandA - demandB * effectiveQ;
      const pSAtQeff = supplyC + supplyD * effectiveQ;
      deadweightLoss = 0.5 * (pDAtQeff - pSAtQeff) * (qEquilibrium - effectiveQ);
    }
  } else if (policyMode === 'floor') {
    if (priceFloor > pEquilibrium) {
      // Effective floor
      const qDemanded = Math.max(0, (demandA - priceFloor) / demandB);
      const qSupplied = Math.max(0, (priceFloor - supplyC) / supplyD);
      effectiveQ = Math.min(qDemanded, qSupplied);
      effectivePConsumer = priceFloor;
      effectivePProducer = priceFloor;
      shortageOrSurplus = { type: 'surplus', amount: Math.max(0, qSupplied - qDemanded) };
      const pDAtQeff = demandA - demandB * effectiveQ;
      const pSAtQeff = supplyC + supplyD * effectiveQ;
      deadweightLoss = 0.5 * (pSAtQeff - pDAtQeff) * (qEquilibrium - effectiveQ);
    }
  } else if (policyMode === 'tax') {
    // With tax t, supply shifts up: P = (c + t) + dQ
    // a - bQ = (c + t) + dQ => Q_tax = (a - c - t) / (b + d)
    effectiveQ = Math.max(0, (demandA - supplyC - taxRate) / (demandB + supplyD));
    effectivePConsumer = demandA - demandB * effectiveQ;
    effectivePProducer = effectivePConsumer - taxRate;
    taxOrSubsidyAmount = taxRate * effectiveQ;
    deadweightLoss = 0.5 * taxRate * (qEquilibrium - effectiveQ);
  } else if (policyMode === 'subsidy') {
    // With subsidy s, supply shifts down: P = (c - s) + dQ
    effectiveQ = Math.max(0, (demandA - supplyC + subsidyRate) / (demandB + supplyD));
    effectivePConsumer = demandA - demandB * effectiveQ;
    effectivePProducer = effectivePConsumer + subsidyRate;
    taxOrSubsidyAmount = subsidyRate * effectiveQ;
    deadweightLoss = 0.5 * subsidyRate * (effectiveQ - qEquilibrium);
  }

  // Consumer Surplus and Producer Surplus
  const consumerSurplus = 0.5 * (demandA - effectivePConsumer) * effectiveQ;
  const producerSurplus = 0.5 * (effectivePProducer - supplyC) * effectiveQ;

  // Chart Coordinate Mappings
  const svgWidth = 540;
  const svgHeight = 360;
  const padding = { top: 30, right: 30, bottom: 50, left: 60 };
  const plotWidth = svgWidth - padding.left - padding.right;
  const plotHeight = svgHeight - padding.top - padding.bottom;

  const maxQ = 120;
  const maxP = 120;

  const toSvgX = (q: number) => padding.left + (q / maxQ) * plotWidth;
  const toSvgY = (p: number) => padding.top + plotHeight - (p / maxP) * plotHeight;

  // Points for Demand curve: from Q=0 to Q=(a/b)
  const dQ0_P = demandA;
  const dMaxQ = Math.min(maxQ, demandA / demandB);
  const dMaxQ_P = demandA - demandB * dMaxQ;

  // Points for Supply curve: from Q=0 to Q=maxQ
  const sQ0_P = supplyC;
  const sMaxQ = maxQ;
  const sMaxQ_P = supplyC + supplyD * sMaxQ;

  // Shifting curves for tax/subsidy
  const sShiftC = policyMode === 'tax' ? supplyC + taxRate : policyMode === 'subsidy' ? supplyC - subsidyRate : supplyC;
  const sShiftQ0_P = sShiftC;
  const sShiftMaxQ_P = sShiftC + supplyD * sMaxQ;

  const handleReset = () => {
    setDemandA(100);
    setDemandB(0.8);
    setSupplyC(20);
    setSupplyD(0.8);
    setPolicyMode('none');
    setPriceCeiling(50);
    setPriceFloor(70);
    setTaxRate(15);
    setSubsidyRate(15);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            <span>Ekonomi Mikro</span>
            <span aria-hidden="true">·</span>
            <span>Simulasi Grafik Interaktif</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">Simulator Ekuilibrium Pasar & Intervensi</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Eksplorasi pembentukan harga pasar, kurva penawaran & permintaan, surplus, dan bobot mati (deadweight loss).
          </p>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Parameter</span>
        </button>
      </div>

      {/* Main Two-Zone Sandbox Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
        {/* Left Stage: SVG Coordinate Chart */}
        <div className="lg:col-span-7 p-6 flex flex-col justify-between bg-slate-50/50">
          <div className="flex items-center justify-between mb-3 text-xs text-slate-600">
            <span className="font-semibold text-slate-800">Kurva Permintaan (D) & Penawaran (S)</span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-sky-700">
                <span className="w-2.5 h-0.5 bg-sky-600 inline-block"></span> Permintaan (D)
              </span>
              <span className="flex items-center gap-1 text-emerald-700">
                <span className="w-2.5 h-0.5 bg-emerald-600 inline-block"></span> Penawaran (S)
              </span>
            </div>
          </div>

          {/* SVG Canvas */}
          <div className="relative w-full aspect-4/3 bg-white border border-slate-200 rounded-lg overflow-hidden shadow-2xs">
            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-full">
              {/* Grid Lines */}
              {[20, 40, 60, 80, 100].map((val) => (
                <g key={`grid-${val}`}>
                  <line
                    x1={padding.left}
                    y1={toSvgY(val)}
                    x2={svgWidth - padding.right}
                    y2={toSvgY(val)}
                    stroke="#f1f5f9"
                    strokeWidth="1"
                  />
                  <line
                    x1={toSvgX(val)}
                    y1={padding.top}
                    x2={toSvgX(val)}
                    y2={svgHeight - padding.bottom}
                    stroke="#f1f5f9"
                    strokeWidth="1"
                  />
                  <text
                    x={padding.left - 8}
                    y={toSvgY(val) + 4}
                    fontSize="10"
                    fill="#94a3b8"
                    textAnchor="end"
                    fontFamily="monospace"
                  >
                    {val}
                  </text>
                  <text
                    x={toSvgX(val)}
                    y={svgHeight - padding.bottom + 16}
                    fontSize="10"
                    fill="#94a3b8"
                    textAnchor="middle"
                    fontFamily="monospace"
                  >
                    {val}
                  </text>
                </g>
              ))}

              {/* Axes */}
              <line
                x1={padding.left}
                y1={svgHeight - padding.bottom}
                x2={svgWidth - padding.right}
                y2={svgHeight - padding.bottom}
                stroke="#64748b"
                strokeWidth="1.5"
              />
              <line
                x1={padding.left}
                y1={padding.top}
                x2={padding.left}
                y2={svgHeight - padding.bottom}
                stroke="#64748b"
                strokeWidth="1.5"
              />

              {/* Axis Labels */}
              <text
                x={svgWidth - padding.right}
                y={svgHeight - padding.bottom + 32}
                fontSize="11"
                fill="#334155"
                fontWeight="600"
                textAnchor="end"
              >
                Kuantitas (Q) →
              </text>
              <text
                x={padding.left - 10}
                y={padding.top - 10}
                fontSize="11"
                fill="#334155"
                fontWeight="600"
                textAnchor="start"
              >
                Harga (P) ↑
              </text>

              {/* Shaded Areas: Deadweight Loss Triangle */}
              {deadweightLoss > 0 && policyMode === 'tax' && (
                <polygon
                  points={`
                    ${toSvgX(effectiveQ)},${toSvgY(effectivePConsumer)} 
                    ${toSvgX(effectiveQ)},${toSvgY(effectivePProducer)} 
                    ${toSvgX(qEquilibrium)},${toSvgY(pEquilibrium)}
                  `}
                  fill="#f87171"
                  fillOpacity="0.35"
                  stroke="#ef4444"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                />
              )}

              {deadweightLoss > 0 && policyMode === 'ceiling' && priceCeiling < pEquilibrium && (
                <polygon
                  points={`
                    ${toSvgX(effectiveQ)},${toSvgY(demandA - demandB * effectiveQ)} 
                    ${toSvgX(effectiveQ)},${toSvgY(priceCeiling)} 
                    ${toSvgX(qEquilibrium)},${toSvgY(pEquilibrium)}
                  `}
                  fill="#f87171"
                  fillOpacity="0.35"
                  stroke="#ef4444"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                />
              )}

              {deadweightLoss > 0 && policyMode === 'floor' && priceFloor > pEquilibrium && (
                <polygon
                  points={`
                    ${toSvgX(effectiveQ)},${toSvgY(priceFloor)} 
                    ${toSvgX(effectiveQ)},${toSvgY(supplyC + supplyD * effectiveQ)} 
                    ${toSvgX(qEquilibrium)},${toSvgY(pEquilibrium)}
                  `}
                  fill="#f87171"
                  fillOpacity="0.35"
                  stroke="#ef4444"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                />
              )}

              {/* Demand Curve Line */}
              <line
                x1={toSvgX(0)}
                y1={toSvgY(dQ0_P)}
                x2={toSvgX(dMaxQ)}
                y2={toSvgY(dMaxQ_P)}
                stroke="#0284c7"
                strokeWidth="2.5"
              />
              <text
                x={toSvgX(dMaxQ) - 10}
                y={toSvgY(dMaxQ_P) - 10}
                fill="#0284c7"
                fontSize="12"
                fontWeight="700"
              >
                D
              </text>

              {/* Supply Curve Line (Original) */}
              <line
                x1={toSvgX(0)}
                y1={toSvgY(sQ0_P)}
                x2={toSvgX(sMaxQ)}
                y2={toSvgY(sMaxQ_P)}
                stroke="#059669"
                strokeWidth="2.5"
              />
              <text
                x={toSvgX(sMaxQ) - 15}
                y={toSvgY(sMaxQ_P) - 10}
                fill="#059669"
                fontSize="12"
                fontWeight="700"
              >
                S
              </text>

              {/* Shifted Supply Curve for Tax / Subsidy */}
              {(policyMode === 'tax' || policyMode === 'subsidy') && (
                <line
                  x1={toSvgX(0)}
                  y1={toSvgY(sShiftQ0_P)}
                  x2={toSvgX(sMaxQ)}
                  y2={toSvgY(sShiftMaxQ_P)}
                  stroke="#d97706"
                  strokeWidth="2"
                  strokeDasharray="4 3"
                />
              )}

              {/* Policy Lines (Ceiling or Floor) */}
              {policyMode === 'ceiling' && (
                <line
                  x1={padding.left}
                  y1={toSvgY(priceCeiling)}
                  x2={svgWidth - padding.right}
                  y2={toSvgY(priceCeiling)}
                  stroke="#dc2626"
                  strokeWidth="2"
                  strokeDasharray="5 3"
                />
              )}

              {policyMode === 'floor' && (
                <line
                  x1={padding.left}
                  y1={toSvgY(priceFloor)}
                  x2={svgWidth - padding.right}
                  y2={toSvgY(priceFloor)}
                  stroke="#dc2626"
                  strokeWidth="2"
                  strokeDasharray="5 3"
                />
              )}

              {/* Natural Equilibrium Point */}
              <circle
                cx={toSvgX(qEquilibrium)}
                cy={toSvgY(pEquilibrium)}
                r="5"
                fill="#0f172a"
              />
              <line
                x1={padding.left}
                y1={toSvgY(pEquilibrium)}
                x2={toSvgX(qEquilibrium)}
                y2={toSvgY(pEquilibrium)}
                stroke="#94a3b8"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
              <line
                x1={toSvgX(qEquilibrium)}
                y1={toSvgY(pEquilibrium)}
                x2={toSvgX(qEquilibrium)}
                y2={svgHeight - padding.bottom}
                stroke="#94a3b8"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
              <text
                x={toSvgX(qEquilibrium) + 8}
                y={toSvgY(pEquilibrium) - 6}
                fontSize="11"
                fill="#0f172a"
                fontWeight="700"
              >
                E ({qEquilibrium.toFixed(1)}, {pEquilibrium.toFixed(1)})
              </text>
            </svg>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 pt-3 border-t border-slate-200">
            <div className="p-2.5 bg-white rounded-md border border-slate-200">
              <span className="text-xs text-slate-500 block">Harga Ekuilibrium (P*)</span>
              <span className="text-base font-bold font-mono text-slate-900 tabular-nums">
                Rp {pEquilibrium.toFixed(2)}
              </span>
            </div>
            <div className="p-2.5 bg-white rounded-md border border-slate-200">
              <span className="text-xs text-slate-500 block">Kuantitas Ekuilibrium (Q*)</span>
              <span className="text-base font-bold font-mono text-slate-900 tabular-nums">
                {qEquilibrium.toFixed(2)} unit
              </span>
            </div>
            <div className="p-2.5 bg-white rounded-md border border-slate-200">
              <span className="text-xs text-slate-500 block">Surplus Konsumen</span>
              <span className="text-base font-bold font-mono text-sky-700 tabular-nums">
                Rp {consumerSurplus.toFixed(1)}
              </span>
            </div>
            <div className="p-2.5 bg-white rounded-md border border-slate-200">
              <span className="text-xs text-slate-500 block">Surplus Produsen</span>
              <span className="text-base font-bold font-mono text-emerald-700 tabular-nums">
                Rp {producerSurplus.toFixed(1)}
              </span>
            </div>
          </div>
        </div>

        {/* Right Zone: Control & Concept Deck */}
        <div className="lg:col-span-5 p-6 flex flex-col justify-between space-y-6">
          {/* Policy Segmented Selector */}
          <div>
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-2">
              Pilih Intervensi Kebijakan Pasar
            </label>
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-lg">
              <button
                onClick={() => setPolicyMode('none')}
                className={`py-1.5 px-2 text-xs font-medium rounded-md transition-colors ${
                  policyMode === 'none' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Bebas (Alami)
              </button>
              <button
                onClick={() => setPolicyMode('ceiling')}
                className={`py-1.5 px-2 text-xs font-medium rounded-md transition-colors ${
                  policyMode === 'ceiling' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Plafon Harga (HET)
              </button>
              <button
                onClick={() => setPolicyMode('floor')}
                className={`py-1.5 px-2 text-xs font-medium rounded-md transition-colors ${
                  policyMode === 'floor' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Lantai Harga (HPP)
              </button>
              <button
                onClick={() => setPolicyMode('tax')}
                className={`py-1.5 px-2 text-xs font-medium rounded-md transition-colors ${
                  policyMode === 'tax' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Pajak per Unit
              </button>
              <button
                onClick={() => setPolicyMode('subsidy')}
                className={`py-1.5 px-2 text-xs font-medium rounded-md transition-colors ${
                  policyMode === 'subsidy' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Subsidi per Unit
              </button>
            </div>
          </div>

          {/* Conditional Policy Slider */}
          {policyMode === 'ceiling' && (
            <div className="p-3.5 bg-rose-50/70 border border-rose-200 rounded-lg space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-rose-950">Batas Harga Tertinggi (Price Ceiling)</span>
                <span className="font-mono font-bold text-rose-700 tabular-nums">Rp {priceCeiling}</span>
              </div>
              <input
                type="range"
                min="25"
                max="90"
                value={priceCeiling}
                onChange={(e) => setPriceCeiling(Number(e.target.value))}
                className="w-full accent-rose-600"
              />
              <span className="text-2xs text-rose-700 block">
                {priceCeiling < pEquilibrium
                  ? '⚠️ Plafon efektif (di bawah P*), menimbulkan kelangkaan/antrean (shortage).'
                  : 'ℹ️ Plafon tidak mengikat (non-binding) karena berada di atas harga ekuilibrium alami.'}
              </span>
            </div>
          )}

          {policyMode === 'floor' && (
            <div className="p-3.5 bg-rose-50/70 border border-rose-200 rounded-lg space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-rose-950">Batas Harga Terendah (Price Floor)</span>
                <span className="font-mono font-bold text-rose-700 tabular-nums">Rp {priceFloor}</span>
              </div>
              <input
                type="range"
                min="30"
                max="95"
                value={priceFloor}
                onChange={(e) => setPriceFloor(Number(e.target.value))}
                className="w-full accent-rose-600"
              />
              <span className="text-2xs text-rose-700 block">
                {priceFloor > pEquilibrium
                  ? '⚠️ Lantai harga efektif (di atas P*), menimbulkan surplus berlebih yang harus diserap pemerintah.'
                  : 'ℹ️ Lantai harga tidak mengikat (non-binding) karena berada di bawah harga ekuilibrium alami.'}
              </span>
            </div>
          )}

          {policyMode === 'tax' && (
            <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-lg space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-amber-950">Tarif Pajak Penjualan per Unit (t)</span>
                <span className="font-mono font-bold text-amber-700 tabular-nums">Rp {taxRate}</span>
              </div>
              <input
                type="range"
                min="5"
                max="40"
                value={taxRate}
                onChange={(e) => setTaxRate(Number(e.target.value))}
                className="w-full accent-amber-600"
              />
              <div className="flex justify-between text-2xs text-amber-900 pt-1">
                <span>Penerimaan Pajak Negara: Rp {taxOrSubsidyAmount.toFixed(1)}</span>
                <span>Deadweight Loss: Rp {deadweightLoss.toFixed(1)}</span>
              </div>
            </div>
          )}

          {policyMode === 'subsidy' && (
            <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-lg space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-emerald-950">Besar Subsidi per Unit (s)</span>
                <span className="font-mono font-bold text-emerald-700 tabular-nums">Rp {subsidyRate}</span>
              </div>
              <input
                type="range"
                min="5"
                max="40"
                value={subsidyRate}
                onChange={(e) => setSubsidyRate(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
              <div className="flex justify-between text-2xs text-emerald-900 pt-1">
                <span>Beban Pengeluaran APBN: Rp {taxOrSubsidyAmount.toFixed(1)}</span>
                <span>Deadweight Loss: Rp {deadweightLoss.toFixed(1)}</span>
              </div>
            </div>
          )}

          {/* Core Curve Sliders */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium text-slate-700">Pergeseran Permintaan (Intercept a)</span>
                <span className="font-mono text-slate-900 font-semibold">{demandA}</span>
              </div>
              <input
                type="range"
                min="60"
                max="140"
                value={demandA}
                onChange={(e) => setDemandA(Number(e.target.value))}
                className="w-full accent-sky-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-medium text-slate-700">Pergeseran Penawaran (Biaya Dasar c)</span>
                <span className="font-mono text-slate-900 font-semibold">{supplyC}</span>
              </div>
              <input
                type="range"
                min="5"
                max="50"
                value={supplyC}
                onChange={(e) => setSupplyC(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
            </div>
          </div>

          {/* Analytical Takeaway Box */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-1.5">
              <Info className="w-4 h-4 text-slate-500" />
              <span>Analisis Ekonomi Terkini:</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {policyMode === 'none' && (
                <>Pasar berada pada kondisi <strong>efisiensi alokatif optimal</strong> (tidak ada bobot mati). Total surplus ekonomi (CS + PS) mencapai titik maksimal.</>
              )}
              {policyMode === 'ceiling' && priceCeiling < pEquilibrium && (
                <>Plafon harga sebesar Rp {priceCeiling} menyebabkan <strong>kelangkaan pasokan sebesar {shortageOrSurplus.amount.toFixed(1)} unit</strong>. Produsen mengurangi produksi, memicu terciptanya kerugian bobot mati (DWL) sebesar Rp {deadweightLoss.toFixed(1)}.</>
              )}
              {policyMode === 'floor' && priceFloor > pEquilibrium && (
                <>Lantai harga Rp {priceFloor} menyebabkan <strong>kelebihan penawaran (surplus) sebesar {shortageOrSurplus.amount.toFixed(1)} unit</strong> yang tidak terserap pasar tanpa intervensi pembelian oleh pemerintah.</>
              )}
              {policyMode === 'tax' && (
                <>Pajak Rp {taxRate}/unit menaikkan harga yang dibayar pembeli menjadi Rp {effectivePConsumer.toFixed(1)} dan menurunkan harga yang diterima penjual ke Rp {effectivePProducer.toFixed(1)}. Transaksi turun menjadi {effectiveQ.toFixed(1)} unit dengan <strong>Deadweight Loss Rp {deadweightLoss.toFixed(1)}</strong>.</>
              )}
              {policyMode === 'subsidy' && (
                <>Subsidi memicu overproduksi melampaui efisiensi pasar hingga {effectiveQ.toFixed(1)} unit, menghabiskan anggaran belanja negara sebesar Rp {taxOrSubsidyAmount.toFixed(1)}.</>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
