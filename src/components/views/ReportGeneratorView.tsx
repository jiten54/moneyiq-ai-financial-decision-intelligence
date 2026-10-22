/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * MoneyIQ AI - Automated Report Generator & Executive Briefing
 */

import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  Download, 
  Printer, 
  Sparkles, 
  ShieldCheck, 
  Trophy, 
  AlertTriangle,
  CheckCircle2,
  Tv
} from 'lucide-react';
import { ContestantProfile, ChallengeRecord, AudienceSentiment } from '../../types';

interface ReportGeneratorViewProps {
  contestants: ContestantProfile[];
  challenges: ChallengeRecord[];
  audienceMetrics: AudienceSentiment[];
}

export const ReportGeneratorView: React.FC<ReportGeneratorViewProps> = ({
  contestants,
  challenges,
  audienceMetrics,
}) => {
  const [reportType, setReportType] = useState<'EXECUTIVE' | 'SCORES' | 'ELIMINATION'>('EXECUTIVE');

  // Trigger browser print for printable dossier
  const handlePrint = () => {
    window.print();
  };

  // Download comprehensive audit CSV
  const handleDownloadFullCSV = () => {
    const headers = [
      'Record_ID',
      'Contestant_ID',
      'Contestant_Name',
      'Episode',
      'Challenge_Type',
      'MoneyIQ_Score',
      'Accuracy_Score',
      'Risk_Score',
      'Consistency_Score',
      'Time_Efficiency_Score',
      'Simulated_Return_Pct',
      'Alpha_Generated_Pct',
      'Outcome',
    ];

    const rows = challenges.map(r => [
      r.id,
      r.contestantId,
      `"${r.contestantName}"`,
      r.episodeNumber,
      r.challengeType,
      r.overallMoneyIQ,
      r.accuracyScore,
      r.riskScore,
      r.consistencyScore,
      r.timeEfficiencyScore,
      r.simulatedReturnPct,
      r.alphaGeneratedPct,
      r.result,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + 
      [headers.join(','), ...rows.map(e => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ifi_moneyiq_challenge_audit_report.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const highProbabilityWinners = contestants.filter(c => c.predictedOutcome === 'HIGH_PROBABILITY_WIN');
  const atRiskContestants = contestants.filter(c => c.predictedOutcome === 'AT_RISK_ELIMINATION');

  return (
    <div className="space-y-6 animate-fade-in print:bg-white print:text-black">
      {/* Top Banner (hidden on print) */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 print:hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30 uppercase font-semibold">
                Intelligence Briefing
              </span>
              <span className="text-xs text-slate-400">Automated Audit & Decision Dossiers</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
              <span>Automated Reporting & Executive Show Dossier</span>
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Export downloadable comma-separated value (CSV) audits or print high-fidelity executive intelligence dossiers for India&apos;s Future Investors show directors.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleDownloadFullCSV}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/30 transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
            >
              <Download className="w-4 h-4" />
              Export Evaluation CSV
            </button>
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/30 transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
            >
              <Printer className="w-4 h-4" />
              Print / Save Dossier
            </button>
          </div>
        </div>
      </div>

      {/* Printable Executive Intelligence Document */}
      <div className="p-8 rounded-2xl bg-slate-900/95 border border-slate-800 space-y-6 print:border-none print:p-0 print:bg-white print:text-black">
        {/* Document Header */}
        <div className="border-b border-slate-800 print:border-black pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-[10px] uppercase font-mono tracking-wider text-blue-400 print:text-blue-700 font-bold">
              India&apos;s Future Investors (IFI) Reality Show
            </div>
            <h1 className="text-2xl font-black text-white print:text-black tracking-tight mt-1">
              MoneyIQ AI Season 1 Executive Intelligence Brief
            </h1>
            <p className="text-xs text-slate-400 print:text-gray-600 mt-1">
              Generated: {new Date().toLocaleDateString('en-IN', { dateStyle: 'full' })} • Status: Certified Audit
            </p>
          </div>

          <div className="text-right font-mono text-xs text-slate-300 print:text-gray-700">
            <div>Sample Holdout: N={contestants.length}</div>
            <div>ML Model: Gradient Boosting (AUC 0.945)</div>
          </div>
        </div>

        {/* Section 1: Executive Summary */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-blue-400 print:text-blue-800 font-mono">
            1. Executive Overview & Key Insights
          </h3>
          <p className="text-xs text-slate-300 print:text-gray-800 leading-relaxed">
            Season 1 contestant evaluation reveals strong bifurcated behavioral clustering. The cohort average MoneyIQ stands at <span className="font-bold text-white print:text-black">80.3/100</span>, with top-tier contestants generating an average positive annualized alpha of <span className="font-bold text-emerald-400 print:text-emerald-700">+3.1%</span> over the benchmark during simulated interest-rate and liquidity shocks.
          </p>
        </div>

        {/* Section 2: Top Contenders & Predicted Winners */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 print:text-emerald-800 font-mono flex items-center gap-1.5">
            <Trophy className="w-4 h-4" />
            2. Crown Contenders (Predicted Finale Qualifiers)
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {highProbabilityWinners.map(c => (
              <div key={c.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 print:border-gray-300 print:bg-gray-50 text-xs space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white print:text-black">{c.name}</span>
                  <span className="font-mono font-black text-blue-400 print:text-blue-700">{c.historicalMoneyIQ} pts</span>
                </div>
                <div className="text-[11px] text-slate-400 print:text-gray-600">{c.profession} • {c.city}</div>
                <div className="text-[11px] text-emerald-400 print:text-emerald-700 font-mono">
                  Win Probability: {Math.round(c.predictedWinProbability * 100)}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: High Risk / Elimination Danger Zone */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-rose-400 print:text-rose-800 font-mono flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4" />
            3. Elimination Vulnerability Watchlist
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {atRiskContestants.map(c => (
              <div key={c.id} className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-900/40 print:border-red-300 print:bg-red-50 text-xs space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-rose-300 print:text-red-900">{c.name}</span>
                  <span className="font-mono font-bold text-rose-400 print:text-red-700">{c.historicalMoneyIQ} pts</span>
                </div>
                <div className="text-[11px] text-slate-400 print:text-gray-600">{c.profession} • {c.city}</div>
                <p className="text-[11px] text-slate-300 print:text-gray-800 mt-1">
                  Primary vulnerability: Low emergency cash buffer ({Math.round(c.emergencyBufferRatio * 100)}%) and excessive debt exposure ({Math.round(c.debtToCapitalRatio * 100)}%).
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Broadcast Ratings & Sentiment */}
        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-purple-400 print:text-purple-800 font-mono flex items-center gap-1.5">
            <Tv className="w-4 h-4" />
            4. Broadcast Performance Telemetry
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-slate-800 print:border-gray-300 text-[10px] uppercase text-slate-400 print:text-gray-600">
                  <th className="py-2 px-2">Episode</th>
                  <th className="py-2 px-2">Viewers (TVT)</th>
                  <th className="py-2 px-2">Digital Votes</th>
                  <th className="py-2 px-2">Positive Sentiment</th>
                  <th className="py-2 px-2">Top Viral Moment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 print:divide-gray-200 text-slate-300 print:text-gray-800">
                {audienceMetrics.slice(0, 5).map(ep => (
                  <tr key={ep.episode}>
                    <td className="py-2 px-2 font-bold">Episode {ep.episode}</td>
                    <td className="py-2 px-2 text-purple-400 print:text-purple-700 font-bold">{ep.tvtRating}M</td>
                    <td className="py-2 px-2">{(ep.totalVotes / 1000).toFixed(0)}k</td>
                    <td className="py-2 px-2 text-emerald-400 print:text-emerald-700">{ep.positiveSentimentPct}%</td>
                    <td className="py-2 px-2 font-sans truncate max-w-xs">{ep.topMoment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Disclaimer footer */}
        <div className="pt-4 border-t border-slate-800 print:border-gray-300 text-[10px] text-slate-500 print:text-gray-500 font-mono">
          CONFIDENTIAL & SIMULATED: Generated by MoneyIQ AI Platform for India&apos;s Future Investors candidate portfolio demonstration. No real contestant broadcasting secrets utilized.
        </div>
      </div>
    </div>
  );
};
