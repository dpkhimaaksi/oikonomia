import React, { useState } from 'react';
import { SIMULATORS_LIST } from '../../data/simulators';
import { SimulatorInfo, SimulatorType } from '../../types';
import { MarketEquilibriumSimulator } from './MarketEquilibriumSimulator';
import { MultiplierEffectCalculator } from './MultiplierEffectCalculator';
import { DepreciationCalculator } from './DepreciationCalculator';
import { TrialBalanceGenerator } from './TrialBalanceGenerator';
import { ElasticityCalculator } from './ElasticityCalculator';
import { GdpInflationCalculator } from './GdpInflationCalculator';

interface SimulatorsHubProps {
  initialSimulator?: SimulatorType;
}

export const SimulatorsHub: React.FC<SimulatorsHubProps> = ({
  initialSimulator = 'market-equilibrium',
}) => {
  const [activeSimulator, setActiveSimulator] = useState<SimulatorType>(initialSimulator);

  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="max-w-2xl space-y-2">
          <div className="text-2xs font-bold uppercase tracking-wider text-slate-400">
            Laboratorium & Alat Simulasi Interaktif
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Simulator Kurva & Kalkulator Dinamis
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Eksperimen langsung dengan parameter ekonomi dan keuangan: geser kurva permintaan/penawaran, hitung pengganda Keynesian, simulasikan depresiasi aset, dan verifikasi neraca saldo.
          </p>
        </div>

        {/* Simulator Selector Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-100">
          {SIMULATORS_LIST.map((sim) => {
            const isSelected = activeSimulator === sim.type;
            const categoryBadge = 
              sim.categoryId === 'akuntansi' ? 'Akt' :
              sim.categoryId === 'mikro' ? 'Mikro' : 'Makro';

            return (
              <button
                key={sim.id}
                onClick={() => setActiveSimulator(sim.type)}
                className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap flex items-center gap-2 ${
                  isSelected
                    ? 'bg-slate-900 text-white font-semibold shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
              >
                <span className={`text-2xs font-bold uppercase ${isSelected ? 'text-slate-300' : 'text-slate-400'}`}>
                  [{categoryBadge}]
                </span>
                <span>{sim.title.replace('Simulator ', '').replace('Kalkulator ', '')}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Simulator Rendering */}
      <div>
        {activeSimulator === 'market-equilibrium' && <MarketEquilibriumSimulator />}
        {activeSimulator === 'macro-multiplier' && <MultiplierEffectCalculator />}
        {activeSimulator === 'depreciation' && <DepreciationCalculator />}
        {activeSimulator === 'trial-balance' && <TrialBalanceGenerator />}
        {activeSimulator === 'elasticity' && <ElasticityCalculator />}
        {activeSimulator === 'gdp-inflation' && <GdpInflationCalculator />}
      </div>
    </div>
  );
};
