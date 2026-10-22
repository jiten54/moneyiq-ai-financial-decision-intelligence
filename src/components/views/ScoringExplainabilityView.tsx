/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * MoneyIQ AI - Transparent AI Scoring & Explainability (SHAP & What-If)
 */

import React, { useState } from 'react';
import { 
  Sliders, 
  Sparkles, 
  HelpCircle, 
  RotateCcw, 
  TrendingUp, 
  TrendingDown, 
  AlertCircle,
  CheckCircle2,
  BrainCircuit,
  Scale
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  ReferenceLine 
} from 'recharts';
import { ScoringWeights, ContestantProfile } from '../../types';
import { DEFAULT_WEIGHTS } from '../../ml/scoringEngine';

interface ScoringExplainabilityViewProps {
  weights: ScoringWeights;
  onUpdateWeights: (newWeights: ScoringWeights) => void;
  contestants: ContestantProfile[];
}

export const ScoringExplainabilityView: React.FC<ScoringExplainabilityViewProps> = ({
  weights,
  onUpdateWeights,
  contestants,
}) => {
  // What-If Counterfactual Scenario State
  const [selectedContestantId, setSelectedContestantId] = useState<string>(contestants[0]?.id || 'IFI-C01');
  const [counterfactualDebt, setCounterfactualDebt] = useState<number>(20);
  const [counterfactualBuffer, setCounterfactualBuffer] = useState<number>(60);
  const [counterfactualTime, setCounterfactualTime] = useState<number>(24);

  const selectedContestant = contestants.find(c => c.id === selectedContestantId) || contestants[0];

  // Base and Counterfactual calculation
  const baseScore = selectedContestant ? selectedContestant.historicalMoneyIQ : 80;
  
  // Delta calculation based on simulated sliders
  const debtImpact = Math.round((28 - counterfactualDebt) * 0.35);
  const bufferImpact = Math.round((counterfactualBuffer - 50) * 0.25);
  const timeImpact = counterfactualTime <= 30 ? 4 : Math.round((30 - counterfactualTime) * 0.3);
  
  const whatIfScore = Math.max(10, Math.min(100, baseScore + debtImpact + bufferImpact + timeImpact));
  const scoreDelta = whatIfScore - baseScore;

  // SHAP Waterfall simulation data
  const shapWaterfallData = [
    { name: 'IFI Cohort Base', value: 68, fill: '#64748b', isBaseline: true },
    { name: 'Financial Accuracy', value: 12, fill: '#10b981' },
    { name: 'Diversification (HHI)', value: 8, fill: '#10b981' },
    { name: 'Emergency Liquidity', value: 5, fill: '#10b981' },
    { name: 'Decision Pace', value: 3, fill: '#10b981' },
    { name: 'Debt Leverage Drag', value: -7, fill: '#f43f5e' },
    { name: 'Final MoneyIQ', value: 89, fill: '#3b82f6', isFinal: true },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Banner */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30 uppercase font-semibold">
                Explainable AI (XAI)
              </span>
              <span className="text-xs text-slate-400">Zero Black-Box Transparency</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Scoring Mechanics & SHAP Feature Attribution
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Every score awarded in India&apos;s Future Investors is mathematically decomposed into transparent feature contributions, preventing arbitrary reality-show bias.
            </p>
          </div>

          <button
            onClick={() => onUpdateWeights(DEFAULT_WEIGHTS)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all cursor-pointer self-start"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Default Weights
          </button>
        </div>
      </div>

      {/* Grid: Configurable Weights Sliders & SHAP Waterfall */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Weight Tuning (5 Cols) */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Scale className="w-4 h-4 text-blue-400" />
              <h3 className="text-sm font-bold text-white">Judge Scoring Weights</h3>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Sum: {Math.round((weights.accuracyWeight + weights.riskManagementWeight + weights.consistencyWeight + weights.timeEfficiencyWeight) * 100)}%
            </span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Tune weighting parameters to emphasize risk management during crisis episodes or speed during sudden-death rounds.
          </p>

          <div className="space-y-4 pt-2">
            {/* Accuracy Weight */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">Financial Accuracy Weight</span>
                <span className="font-mono font-bold text-blue-400">
                  {Math.round(weights.accuracyWeight * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0.10"
                max="0.70"
                step="0.05"
                value={weights.accuracyWeight}
                onChange={(e) => onUpdateWeights({ ...weights, accuracyWeight: Number(e.target.value) })}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>

            {/* Risk Management Weight */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">Risk Management Weight</span>
                <span className="font-mono font-bold text-emerald-400">
                  {Math.round(weights.riskManagementWeight * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0.10"
                max="0.60"
                step="0.05"
                value={weights.riskManagementWeight}
                onChange={(e) => onUpdateWeights({ ...weights, riskManagementWeight: Number(e.target.value) })}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            {/* Consistency Weight */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">Decision Consistency Weight</span>
                <span className="font-mono font-bold text-indigo-400">
                  {Math.round(weights.consistencyWeight * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.40"
                step="0.05"
                value={weights.consistencyWeight}
                onChange={(e) => onUpdateWeights({ ...weights, consistencyWeight: Number(e.target.value) })}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>

            {/* Time Efficiency Weight */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">Time Efficiency Weight</span>
                <span className="font-mono font-bold text-amber-400">
                  {Math.round(weights.timeEfficiencyWeight * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.40"
                step="0.05"
                value={weights.timeEfficiencyWeight}
                onChange={(e) => onUpdateWeights({ ...weights, timeEfficiencyWeight: Number(e.target.value) })}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-blue-950/20 border border-blue-900/40 text-[11px] text-blue-300 flex items-start gap-2">
            <InfoIcon className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <span>
              Real-time synchronization: Modifying these sliders immediately updates the composite MoneyIQ rankings across all contestant dashboards.
            </span>
          </div>
        </div>

        {/* Right: SHAP Feature Attribution Waterfall (7 Cols) */}
        <div className="lg:col-span-7 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>SHAP Value Attribution Waterfall</span>
              </h3>
              <p className="text-xs text-slate-400">Marginal Shapley values decomposing contestant score drivers.</p>
            </div>
            <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
              Aryan Malhotra (Ep 1)
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={shapWaterfallData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis type="number" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis dataKey="name" type="category" stroke="#64748b" tick={{ fontSize: 10 }} width={120} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.5rem', fontSize: '11px' }}
                />
                <ReferenceLine x={0} stroke="#475569" />
                <Bar dataKey="value" radius={[4, 4, 4, 4]}>
                  {shapWaterfallData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800 text-[11px] text-center">
            <div className="p-2 rounded bg-slate-950 border border-slate-800">
              <span className="text-slate-400 block">Baseline Prior</span>
              <span className="font-mono font-bold text-slate-200">68.0 pts</span>
            </div>
            <div className="p-2 rounded bg-slate-950 border border-slate-800">
              <span className="text-slate-400 block">Net Positive Push</span>
              <span className="font-mono font-bold text-emerald-400">+28.0 pts</span>
            </div>
            <div className="p-2 rounded bg-slate-950 border border-slate-800">
              <span className="text-slate-400 block">Leverage Penalty</span>
              <span className="font-mono font-bold text-rose-400">-7.0 pts</span>
            </div>
          </div>
        </div>
      </div>

      {/* What-If Counterfactual Scenario Simulator */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <BrainCircuit className="w-4 h-4 text-purple-400" />
              <span>What-If Counterfactual Decision Playground</span>
            </h3>
            <p className="text-xs text-slate-400">
              Simulate alternative decisions to see how contestant ranking and qualification probabilities change.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Select Contestant:</span>
            <select
              value={selectedContestantId}
              onChange={(e) => setSelectedContestantId(e.target.value)}
              className="bg-slate-950 border border-slate-700 text-xs text-slate-200 rounded-lg px-2.5 py-1 focus:outline-none"
            >
              {contestants.map(c => (
                <option key={c.id} value={c.id}>{c.name} ({c.historicalMoneyIQ} pts)</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          {/* Slider 1: Counterfactual Debt */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400">Debt Leverage Ratio</span>
              <span className="font-mono font-bold text-white">{counterfactualDebt}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="65"
              value={counterfactualDebt}
              onChange={(e) => setCounterfactualDebt(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          {/* Slider 2: Counterfactual Buffer */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400">Emergency Buffer Ratio</span>
              <span className="font-mono font-bold text-white">{counterfactualBuffer}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="90"
              value={counterfactualBuffer}
              onChange={(e) => setCounterfactualBuffer(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          {/* Slider 3: Counterfactual Time */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400">Decision Deliberation Time</span>
              <span className="font-mono font-bold text-white">{counterfactualTime}s</span>
            </div>
            <input
              type="range"
              min="10"
              max="60"
              value={counterfactualTime}
              onChange={(e) => setCounterfactualTime(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>

          {/* Outcome Result Box */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-mono">Predicted MoneyIQ</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold font-mono text-white">{whatIfScore}</span>
                <span className={`text-xs font-mono font-bold ${scoreDelta >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {scoreDelta >= 0 ? `+${scoreDelta}` : scoreDelta} pts
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-400 block uppercase font-mono">Status</span>
              <span className={`text-xs font-bold font-mono px-2 py-0.5 rounded ${
                whatIfScore >= 75 ? 'text-emerald-400 bg-emerald-500/10' : whatIfScore >= 60 ? 'text-blue-400 bg-blue-500/10' : 'text-rose-400 bg-rose-500/10'
              }`}>
                {whatIfScore >= 75 ? 'Safe / Win' : whatIfScore >= 60 ? 'Qualified' : 'Elimination Risk'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function InfoIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
