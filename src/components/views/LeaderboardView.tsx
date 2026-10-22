/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * MoneyIQ AI - Contestant Leaderboard & Multi-Dimensional Ranking
 */

import React, { useState } from 'react';
import { 
  Trophy, 
  ArrowUpDown, 
  Search, 
  Filter, 
  Sparkles, 
  ChevronRight, 
  ShieldAlert, 
  CheckCircle2, 
  Flame,
  Award
} from 'lucide-react';
import { ContestantProfile, BehavioralCluster } from '../../types';
import { CLUSTER_METADATA } from '../../ml/clustering';

interface LeaderboardViewProps {
  contestants: ContestantProfile[];
  onSelectContestant: (c: ContestantProfile) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

type SortField = 'historicalMoneyIQ' | 'accuracyMean' | 'riskToleranceIndex' | 'consistencyRate' | 'avgDecisionTimeSec' | 'predictedWinProbability' | 'audienceApprovalPct';

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({
  contestants,
  onSelectContestant,
  searchQuery,
  onSearchChange,
}) => {
  const [sortField, setSortField] = useState<SortField>('historicalMoneyIQ');
  const [sortAsc, setSortAsc] = useState<boolean>(false);
  const [clusterFilter, setClusterFilter] = useState<BehavioralCluster | 'ALL'>('ALL');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false); // default descending for points
    }
  };

  const filteredContestants = contestants.filter(c => {
    const matchesSearch = 
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.profession.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCluster = clusterFilter === 'ALL' || c.cluster === clusterFilter;
    return matchesSearch && matchesCluster;
  });

  const sortedContestants = [...filteredContestants].sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];
    if (sortField === 'avgDecisionTimeSec') {
      // For decision time, smaller might be faster, but let standard comparison work with toggle
    }
    return sortAsc ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1);
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Banner */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30 uppercase font-semibold">
              Season 1 Live Standings
            </span>
            <span className="text-xs text-slate-400">Weighted MoneyIQ Composite Ranking</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <span>India&apos;s Future Investors Official Contestant Leaderboard</span>
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Multi-attribute ranking evaluating accuracy, capital preservation, execution speed, and ML win forecasts.
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Filter contestants..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs bg-slate-950 border border-slate-700/80 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <select
            value={clusterFilter}
            onChange={(e) => setClusterFilter(e.target.value as any)}
            className="bg-slate-950 border border-slate-700/80 text-xs text-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none cursor-pointer"
          >
            <option value="ALL">All Archetypes</option>
            <option value="STRATEGIC_GROWTH">Strategic Growth</option>
            <option value="PRUDENT_PRESERVER">Prudent Preserver</option>
            <option value="AGGRESSIVE_ALPHA">Aggressive Alpha</option>
            <option value="IMPULSIVE_SPECULATOR">Impulsive Speculator</option>
          </select>
        </div>
      </div>

      {/* Leaderboard Table Card */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] font-mono uppercase text-slate-400 select-none">
                <th className="py-2.5 px-3">Rank</th>
                <th className="py-2.5 px-3">Contestant Profile</th>
                <th className="py-2.5 px-3">Archetype</th>
                <th 
                  onClick={() => handleSort('historicalMoneyIQ')}
                  className="py-2.5 px-3 cursor-pointer hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>MoneyIQ</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('accuracyMean')}
                  className="py-2.5 px-3 cursor-pointer hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Accuracy</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('riskToleranceIndex')}
                  className="py-2.5 px-3 cursor-pointer hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Risk Index</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('avgDecisionTimeSec')}
                  className="py-2.5 px-3 cursor-pointer hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Avg Pace</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('predictedWinProbability')}
                  className="py-2.5 px-3 cursor-pointer hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Win Prob</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('audienceApprovalPct')}
                  className="py-2.5 px-3 cursor-pointer hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Audience %</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-2.5 px-3 text-right">Dossier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {sortedContestants.map((c, idx) => {
                const meta = CLUSTER_METADATA[c.cluster];
                const isTopThree = idx < 3 && sortField === 'historicalMoneyIQ' && !sortAsc;

                return (
                  <tr
                    key={c.id}
                    onClick={() => onSelectContestant(c)}
                    className="hover:bg-slate-850/60 transition-colors cursor-pointer group"
                  >
                    {/* Rank */}
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1.5 font-bold">
                        {isTopThree ? (
                          <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black shadow-md ${
                            idx === 0 
                              ? 'bg-amber-500 text-slate-950 shadow-amber-500/20' 
                              : idx === 1 
                                ? 'bg-slate-300 text-slate-950 shadow-slate-300/20' 
                                : 'bg-amber-700 text-white shadow-amber-700/20'
                          }`}>
                            {idx + 1}
                          </span>
                        ) : (
                          <span className="text-slate-500 w-6 text-center">{idx + 1}</span>
                        )}
                      </div>
                    </td>

                    {/* Name & Bio */}
                    <td className="py-3 px-3 font-sans">
                      <div className="flex items-center gap-2.5">
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-xs shrink-0"
                          style={{ backgroundColor: c.avatarColor }}
                        >
                          {c.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-white group-hover:text-blue-300 transition-colors truncate">
                            {c.name}
                          </div>
                          <div className="text-[10px] text-slate-400 truncate">
                            {c.profession} • {c.city.split(',')[0]}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Cluster Badge */}
                    <td className="py-3 px-3 font-sans">
                      <span 
                        className="text-[10px] font-mono px-2 py-0.5 rounded font-semibold whitespace-nowrap"
                        style={{ backgroundColor: meta?.badgeBg, color: meta?.color }}
                      >
                        {meta?.name.split(' ')[0]}
                      </span>
                    </td>

                    {/* MoneyIQ */}
                    <td className="py-3 px-3">
                      <span className="text-sm font-black text-blue-400">
                        {c.historicalMoneyIQ}
                      </span>
                    </td>

                    {/* Accuracy */}
                    <td className="py-3 px-3 text-slate-300">
                      {c.accuracyMean}%
                    </td>

                    {/* Risk Index */}
                    <td className="py-3 px-3 text-slate-300">
                      {Math.round(c.riskToleranceIndex * 100)}%
                    </td>

                    {/* Pace */}
                    <td className="py-3 px-3 text-slate-300">
                      {c.avgDecisionTimeSec}s
                    </td>

                    {/* Win Probability */}
                    <td className="py-3 px-3">
                      <span className={`font-bold ${
                        c.predictedWinProbability >= 0.80 
                          ? 'text-emerald-400' 
                          : c.predictedWinProbability >= 0.50 
                            ? 'text-blue-400' 
                            : 'text-rose-400'
                      }`}>
                        {Math.round(c.predictedWinProbability * 100)}%
                      </span>
                    </td>

                    {/* Audience Approval */}
                    <td className="py-3 px-3 text-slate-300">
                      {c.audienceApprovalPct}%
                    </td>

                    {/* Action */}
                    <td className="py-3 px-3 text-right font-sans">
                      <span className="text-xs text-blue-400 group-hover:text-blue-300 font-semibold inline-flex items-center gap-0.5">
                        Details <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
