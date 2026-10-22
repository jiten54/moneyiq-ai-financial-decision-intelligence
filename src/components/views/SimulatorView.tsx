/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * MoneyIQ AI - Financial Challenge Simulator
 * High-stakes interactive decision simulation with real-time countdown timer, market shock cards, and SHAP explainability.
 */

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Play, 
  RotateCcw, 
  Zap, 
  AlertOctagon, 
  Clock, 
  Shield, 
  ShieldCheck, 
  TrendingUp, 
  Coins, 
  CheckCircle2, 
  Sparkles,
  SlidersHorizontal,
  Info,
  DollarSign
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';
import { SIMULATOR_CHALLENGES } from '../../data/challenges';
import { evaluateFinancialDecision } from '../../ml/scoringEngine';
import { UserChallengeSubmission, ScoreBreakdown, ShapFeatureContribution, ChallengeType } from '../../types';

interface SimulatorViewProps {
  onSaveChallengeRecord?: (record: any) => void;
}

export const SimulatorView: React.FC<SimulatorViewProps> = ({ onSaveChallengeRecord }) => {
  const [selectedChallengeId, setSelectedChallengeId] = useState<ChallengeType>('ASSET_ALLOCATION');
  const currentChallenge = SIMULATOR_CHALLENGES.find(c => c.id === selectedChallengeId) || SIMULATOR_CHALLENGES[0];

  // Allocation Sliders State (must total 100%)
  const [equity, setEquity] = useState<number>(45);
  const [debt, setDebt] = useState<number>(30);
  const [gold, setGold] = useState<number>(15);
  const [cash, setCash] = useState<number>(10);
  const [alt, setAlt] = useState<number>(0);
  const [emergencyBufferINR, setEmergencyBufferINR] = useState<number>(100000);
  const [hedgedRatioPct, setHedgedRatioPct] = useState<number>(50);
  const [useShockMitigation, setUseShockMitigation] = useState<boolean>(true);

  // Timer State
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [timeLeftSec, setTimeLeftSec] = useState<number>(currentChallenge.timeLimitSec);
  const [timeSpentSec, setTimeSpentSec] = useState<number>(0);

  // Evaluation Output State
  const [evaluated, setEvaluated] = useState<boolean>(false);
  const [scoreResult, setScoreResult] = useState<{
    breakdown: ScoreBreakdown;
    simulatedReturnPct: number;
    shapExplanation: ShapFeatureContribution[];
  } | null>(null);

  // Shock event active toggle
  const [triggerShockEvent, setTriggerShockEvent] = useState<boolean>(true);

  // Reset timer whenever challenge changes
  useEffect(() => {
    setTimeLeftSec(currentChallenge.timeLimitSec);
    setTimeSpentSec(0);
    setTimerRunning(false);
    setEvaluated(false);
    setScoreResult(null);
  }, [selectedChallengeId]);

  // Timer tick effect
  useEffect(() => {
    let interval: any = null;
    if (timerRunning && timeLeftSec > 0) {
      interval = setInterval(() => {
        setTimeLeftSec((prev) => {
          if (prev <= 1) {
            setTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
        setTimeSpentSec((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRunning, timeLeftSec]);

  // Total allocation sum
  const totalAllocation = equity + debt + gold + cash + alt;
  const isAllocationValid = totalAllocation === 100;

  // Auto-normalize allocations to 100%
  const handleAutoBalance = () => {
    const sum = totalAllocation;
    if (sum === 0) return;
    const factor = 100 / sum;
    const newEquity = Math.round(equity * factor);
    const newDebt = Math.round(debt * factor);
    const newGold = Math.round(gold * factor);
    const newCash = Math.round(cash * factor);
    const newAlt = 100 - (newEquity + newDebt + newGold + newCash);

    setEquity(newEquity);
    setDebt(newDebt);
    setGold(newGold);
    setCash(newCash);
    setAlt(Math.max(0, newAlt));
  };

  // Submit and evaluate decision
  const handleEvaluate = () => {
    setTimerRunning(false);

    const submission: UserChallengeSubmission = {
      challengeType: selectedChallengeId,
      equityAllocationPct: equity,
      debtAllocationPct: debt,
      goldAllocationPct: gold,
      cashAllocationPct: cash,
      alternativeAllocationPct: alt,
      timeSpentSec: timeSpentSec > 0 ? timeSpentSec : currentChallenge.timeLimitSec - timeLeftSec,
      hedgedRatioPct,
      emergencyBufferINR,
      usedShockMitigation: useShockMitigation && triggerShockEvent,
    };

    const result = evaluateFinancialDecision(submission);
    setScoreResult(result);
    setEvaluated(true);

    // Trigger celebration if high score
    if (result.breakdown.moneyIQScore >= 85) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#3b82f6', '#10b981', '#f59e0b', '#06b6d4'],
        });
      } catch (e) {
        // Safe fallback if confetti canvas fails in iframe
      }
    }
  };

  const handleReset = () => {
    setTimerRunning(false);
    setTimeLeftSec(currentChallenge.timeLimitSec);
    setTimeSpentSec(0);
    setEvaluated(false);
    setScoreResult(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Banner & Scenario Selector */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30 uppercase font-semibold">
                Interactive Simulator
              </span>
              <span className="text-xs text-slate-400">
                Episode {currentChallenge.episode} Challenge Simulation
              </span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              {currentChallenge.title}
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              {currentChallenge.description}
            </p>
          </div>

          {/* Scenario Selector Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
            {SIMULATOR_CHALLENGES.map((ch) => (
              <button
                key={ch.id}
                onClick={() => setSelectedChallengeId(ch.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedChallengeId === ch.id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                Round {ch.episode === 1 ? '1: Macro' : ch.episode === 4 ? '2: Liquidity' : ch.episode === 6 ? '3: Angel' : '4: Finale'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Controls vs Live Evaluation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Controls & Sliders (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Challenge Telemetry & Countdown Timer Card */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-950/60 border border-blue-800/60 flex items-center justify-center font-mono font-bold text-lg text-blue-400">
                ₹1Cr
              </div>
              <div>
                <div className="text-[11px] uppercase font-mono text-slate-400">Capital Envelope</div>
                <div className="text-sm font-bold text-white font-mono">
                  ₹{(currentChallenge.totalCapitalINR).toLocaleString('en-IN')} INR
                </div>
              </div>
            </div>

            {/* Countdown Timer with Status */}
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-[10px] uppercase font-mono text-slate-400 flex items-center gap-1 justify-end">
                  <Clock className="w-3 h-3 text-amber-400" />
                  Clock Pressure
                </div>
                <div className={`text-xl font-mono font-extrabold ${timeLeftSec <= 10 ? 'text-rose-400 animate-pulse' : 'text-amber-300'}`}>
                  00:{timeLeftSec < 10 ? `0${timeLeftSec}` : timeLeftSec}
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setTimerRunning(!timerRunning)}
                  className={`p-2 rounded-lg font-semibold text-xs cursor-pointer transition-all ${
                    timerRunning
                      ? 'bg-amber-600 text-white hover:bg-amber-500'
                      : 'bg-emerald-600 text-white hover:bg-emerald-500'
                  }`}
                  title={timerRunning ? 'Pause Clock' : 'Start Clock'}
                >
                  <Play className={`w-4 h-4 ${timerRunning ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={handleReset}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all cursor-pointer"
                  title="Reset Simulation"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Allocation Sliders Card */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-blue-400" />
                <h3 className="text-sm font-bold text-white">Asset Allocation Engine</h3>
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                  isAllocationValid 
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                    : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                }`}>
                  Total: {totalAllocation}% / 100%
                </span>
                {!isAllocationValid && (
                  <button
                    onClick={handleAutoBalance}
                    className="text-[11px] font-medium text-blue-400 hover:text-blue-300 cursor-pointer underline"
                  >
                    Auto Balance
                  </button>
                )}
              </div>
            </div>

            {/* Slider Rows */}
            <div className="space-y-3.5">
              {/* Equity */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-medium">Equities (Nifty 50 & Mid-Cap Index)</span>
                  <span className="font-mono font-bold text-blue-400">{equity}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={equity}
                  onChange={(e) => setEquity(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
              </div>

              {/* Debt */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-medium">Government Bonds & Fixed Income (10Y G-Sec)</span>
                  <span className="font-mono font-bold text-emerald-400">{debt}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={debt}
                  onChange={(e) => setDebt(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              {/* Gold */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-medium">Sovereign Gold / Commodities Hedge</span>
                  <span className="font-mono font-bold text-amber-400">{gold}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={gold}
                  onChange={(e) => setGold(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>

              {/* Cash */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-medium">Liquid Cash & Overnight Funds</span>
                  <span className="font-mono font-bold text-cyan-400">{cash}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={cash}
                  onChange={(e) => setCash(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
              </div>

              {/* Alternatives */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-medium">Venture Capital / High-Alpha Alternatives</span>
                  <span className="font-mono font-bold text-purple-400">{alt}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={alt}
                  onChange={(e) => setAlt(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
              </div>
            </div>

            {/* Additional Risk Parameters */}
            <div className="pt-3 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Emergency Liquidity Buffer (INR)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="20000"
                    max="300000"
                    step="10000"
                    value={emergencyBufferINR}
                    onChange={(e) => setEmergencyBufferINR(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                  <span className="font-mono text-xs text-indigo-400 font-bold shrink-0">
                    ₹{(emergencyBufferINR / 1000).toFixed(0)}k
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Derivatives Hedging Ratio (%)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={hedgedRatioPct}
                    onChange={(e) => setHedgedRatioPct(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-500"
                  />
                  <span className="font-mono text-xs text-teal-400 font-bold shrink-0">
                    {hedgedRatioPct}%
                  </span>
                </div>
              </div>
            </div>

            {/* Market Shock Simulation Card */}
            {currentChallenge.marketShockEvent && (
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-950/30 to-slate-900 border border-amber-900/40">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <AlertOctagon className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold text-amber-300">
                          {currentChallenge.marketShockEvent.name}
                        </h4>
                        <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300">
                          Live Shock
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300 mt-0.5">
                        {currentChallenge.marketShockEvent.description}
                      </p>
                    </div>
                  </div>

                  <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer shrink-0">
                    <input
                      type="checkbox"
                      checked={useShockMitigation}
                      onChange={(e) => setUseShockMitigation(e.target.checked)}
                      className="rounded bg-slate-800 border-slate-700 text-blue-600 focus:ring-blue-500"
                    />
                    <span>Deploy Hedge</span>
                  </label>
                </div>
              </div>
            )}

            {/* Evaluation Action Button */}
            <button
              onClick={handleEvaluate}
              disabled={!isAllocationValid}
              className={`w-full py-3 rounded-xl font-bold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg ${
                isAllocationValid
                  ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-blue-600/25 active:scale-[0.99]'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>Evaluate Financial Decision & Generate MoneyIQ</span>
            </button>
          </div>
        </div>

        {/* Right Column: AI Scoring & SHAP Attribution Output (5 Cols) */}
        <div className="lg:col-span-5 space-y-5">
          {scoreResult ? (
            <div className="space-y-5 animate-fade-in">
              {/* Score Summary Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-blue-500/40 shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold">
                      Contestant Score Breakdown
                    </span>
                    <h3 className="text-base font-bold text-white">AI MoneyIQ Evaluation</h3>
                  </div>

                  {/* Grade Badge */}
                  <div className="px-3 py-1 rounded-xl bg-blue-600/20 border border-blue-500/50 flex items-center gap-1.5 font-mono">
                    <span className="text-xs text-slate-400">Grade:</span>
                    <span className="text-lg font-extrabold text-blue-300">{scoreResult.breakdown.grade}</span>
                  </div>
                </div>

                {/* Score Number Display */}
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-5xl font-black font-mono tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400">
                    {scoreResult.breakdown.moneyIQScore}
                  </span>
                  <span className="text-slate-400 text-sm font-medium">/ 100 MoneyIQ Points</span>
                </div>

                {/* 4 Component Scoring Bars */}
                <div className="space-y-2.5 pt-3 border-t border-slate-800">
                  {/* Accuracy */}
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-400">Financial Accuracy (40% weight)</span>
                      <span className="font-mono font-bold text-white">{scoreResult.breakdown.accuracyScore}/100</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${scoreResult.breakdown.accuracyScore}%` }}></div>
                    </div>
                  </div>

                  {/* Risk Management */}
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-400">Risk Management (25% weight)</span>
                      <span className="font-mono font-bold text-white">{scoreResult.breakdown.riskScore}/100</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${scoreResult.breakdown.riskScore}%` }}></div>
                    </div>
                  </div>

                  {/* Consistency */}
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-400">Decision Consistency (20% weight)</span>
                      <span className="font-mono font-bold text-white">{scoreResult.breakdown.consistencyScore}/100</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${scoreResult.breakdown.consistencyScore}%` }}></div>
                    </div>
                  </div>

                  {/* Time Efficiency */}
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-400">Time Efficiency (15% weight)</span>
                      <span className="font-mono font-bold text-white">{scoreResult.breakdown.timeEfficiencyScore}/100</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: `${scoreResult.breakdown.timeEfficiencyScore}%` }}></div>
                    </div>
                  </div>
                </div>

                {/* Return Output */}
                <div className="mt-4 p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between">
                  <div className="text-xs text-slate-400">Simulated Annualized Return</div>
                  <div className={`font-mono text-sm font-bold ${scoreResult.simulatedReturnPct >= 11 ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {scoreResult.simulatedReturnPct >= 0 ? '+' : ''}{scoreResult.simulatedReturnPct}%
                  </div>
                </div>
              </div>

              {/* Explainable AI: SHAP Marginal Feature Contribution Waterfall */}
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider">
                      Explainable AI (SHAP Contributions)
                    </h4>
                  </div>
                  <span className="text-[10px] text-slate-400">Base: ~68 pts</span>
                </div>
                <p className="text-[11px] text-slate-400 mb-3">
                  Shapley marginal attributions showing how individual features pulled your score above or below baseline.
                </p>

                <div className="space-y-2">
                  {scoreResult.shapExplanation.map((shap) => (
                    <div
                      key={shap.featureKey}
                      className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800/80 text-xs flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-slate-200 truncate">{shap.featureName}</div>
                        <div className="text-[10px] text-slate-400 truncate">{shap.description}</div>
                      </div>
                      <div className={`font-mono font-bold text-xs shrink-0 px-2 py-0.5 rounded ${
                        shap.contribution >= 0 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}>
                        {shap.contribution >= 0 ? `+${shap.contribution}` : shap.contribution} pts
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Empty State Prompting Simulation */
            <div className="h-full min-h-[400px] p-8 rounded-2xl bg-slate-900/40 border border-dashed border-slate-800 flex flex-col items-center justify-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4">
                <Zap className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-white">Simulator Ready for Execution</h3>
              <p className="text-xs text-slate-400 max-w-sm mt-1 leading-relaxed">
                Adjust asset allocation sliders, configure emergency liquidity, and click &ldquo;Evaluate Financial Decision&rdquo; to execute the scoring engine and generate explainable SHAP feature attribution.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
