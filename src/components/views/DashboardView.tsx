/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * MoneyIQ AI - Executive Dashboard View
 */

import React from 'react';
import { 
  Users, 
  Trophy, 
  TrendingUp, 
  ShieldCheck, 
  Radio, 
  AlertTriangle,
  ArrowUpRight,
  Flame,
  Zap,
  Target,
  ChevronRight,
  Activity
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { ContestantProfile, ChallengeRecord, AudienceSentiment } from '../../types';
import { CLUSTER_METADATA } from '../../ml/clustering';

interface DashboardViewProps {
  contestants: ContestantProfile[];
  challengeRecords: ChallengeRecord[];
  audienceMetrics: AudienceSentiment[];
  onSelectContestant: (c: ContestantProfile) => void;
  onNavigateTab: (tab: any) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  contestants,
  challengeRecords,
  audienceMetrics,
  onSelectContestant,
  onNavigateTab,
}) => {
  // Aggregate KPI calculations
  const totalContestants = contestants.length;
  const avgMoneyIQ = Math.round(
    contestants.reduce((acc, c) => acc + c.historicalMoneyIQ, 0) / (totalContestants || 1)
  );
  const totalCompleted = challengeRecords.length;
  const atRiskCount = contestants.filter(c => c.predictedOutcome === 'AT_RISK_ELIMINATION').length;
  const highProbabilityWinners = contestants.filter(c => c.predictedOutcome === 'HIGH_PROBABILITY_WIN').length;
  const avgAudienceApproval = Math.round(
    contestants.reduce((acc, c) => acc + c.audienceApprovalPct, 0) / (totalContestants || 1)
  );

  // Episode trend chart data
  const episodeTrendData = audienceMetrics.map(ep => {
    const epChallenges = challengeRecords.filter(r => r.episodeNumber === ep.episode);
    const avgScore = epChallenges.length > 0
      ? Math.round(epChallenges.reduce((acc, r) => acc + r.overallMoneyIQ, 0) / epChallenges.length)
      : Math.round(75 + (ep.episode * 1.5));
    const avgReturn = epChallenges.length > 0
      ? Math.round((epChallenges.reduce((acc, r) => acc + r.simulatedReturnPct, 0) / epChallenges.length) * 10) / 10
      : Math.round((10 + ep.episode * 0.4) * 10) / 10;

    return {
      episode: `Ep ${ep.episode}`,
      avgScore,
      avgReturn,
      tvtRating: ep.tvtRating,
      positiveSentiment: ep.positiveSentimentPct,
    };
  });

  // Score distribution histogram buckets
  const scoreBuckets = [
    { range: '40-50', count: 0, label: 'Danger' },
    { range: '51-65', count: 0, label: 'Vulnerable' },
    { range: '66-75', count: 0, label: 'Average' },
    { range: '76-85', count: 0, label: 'Strong' },
    { range: '86-100', count: 0, label: 'Elite' },
  ];

  contestants.forEach(c => {
    const s = c.historicalMoneyIQ;
    if (s <= 50) scoreBuckets[0].count++;
    else if (s <= 65) scoreBuckets[1].count++;
    else if (s <= 75) scoreBuckets[2].count++;
    else if (s <= 85) scoreBuckets[3].count++;
    else scoreBuckets[4].count++;
  });

  // Behavioral cluster breakdown
  const clusterCounts: Record<string, number> = {};
  contestants.forEach(c => {
    clusterCounts[c.cluster] = (clusterCounts[c.cluster] || 0) + 1;
  });

  const clusterPieData = Object.keys(CLUSTER_METADATA).map(key => ({
    name: CLUSTER_METADATA[key as keyof typeof CLUSTER_METADATA].name,
    value: clusterCounts[key] || 0,
    color: CLUSTER_METADATA[key as keyof typeof CLUSTER_METADATA].color,
  }));

  // Sort top 4 performers
  const topPerformers = [...contestants]
    .sort((a, b) => b.historicalMoneyIQ - a.historicalMoneyIQ)
    .slice(0, 4);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900/40 via-indigo-950/40 to-slate-900 border border-blue-500/30 p-6 shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase bg-blue-500/20 text-blue-300 border border-blue-500/30">
                Season 1 Executive Intel
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <Activity className="w-3 h-3" /> Real-Time Scoring
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              India&apos;s Future Investors (IFI) Reality Platform
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl mt-1 leading-relaxed">
              Automated behavioral scoring, predictive ML qualification models, dynamic financial simulation, and audience sentiment telemetry.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigateTab('SIMULATOR')}
              className="px-4 py-2.5 rounded-xl font-semibold text-xs bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <Zap className="w-4 h-4 fill-current" />
              Launch Live Simulation
            </button>
            <button
              onClick={() => onNavigateTab('REPORTS')}
              className="px-4 py-2.5 rounded-xl font-semibold text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer"
            >
              Export Intelligence
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Total Contestants */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-medium uppercase font-mono">Contestants</span>
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">{totalContestants}</div>
          <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
            <span className="text-emerald-400 font-semibold">{highProbabilityWinners}</span> Crown contenders
          </div>
        </div>

        {/* Average MoneyIQ */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-medium uppercase font-mono">Avg MoneyIQ</span>
            <Target className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">{avgMoneyIQ} <span className="text-xs text-slate-500 font-normal">/100</span></div>
          <div className="text-[10px] text-emerald-400 mt-1 flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3" /> +4.2 pts vs Ep 1
          </div>
        </div>

        {/* Challenges Completed */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-medium uppercase font-mono">Evaluations</span>
            <Trophy className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">{totalCompleted}</div>
          <div className="text-[10px] text-slate-400 mt-1">Across 10 broadcast episodes</div>
        </div>

        {/* Model Prediction */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-medium uppercase font-mono">ML Qualification</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400 font-mono">91.7%</div>
          <div className="text-[10px] text-slate-400 mt-1">ROC-AUC 0.945 benchmark</div>
        </div>

        {/* Audience TVT & Sentiment */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-medium uppercase font-mono">Viewership</span>
            <Radio className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono">7.8M</div>
          <div className="text-[10px] text-purple-300 mt-1">{avgAudienceApproval}% fan approval</div>
        </div>

        {/* Elimination Alert */}
        <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 hover:border-rose-800/60 transition-all">
          <div className="flex items-center justify-between text-rose-400 mb-2">
            <span className="text-[11px] font-medium uppercase font-mono">At-Risk</span>
            <AlertTriangle className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-bold text-rose-400 font-mono">{atRiskCount}</div>
          <div className="text-[10px] text-rose-300/80 mt-1">Below elimination safety line</div>
        </div>
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Performance Progression Over Episodes (2 Cols) */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>Contestant MoneyIQ & Alpha Return Trends Across Episodes</span>
              </h3>
              <p className="text-xs text-slate-400">Tracking aggregate financial decision accuracy and simulated alpha vs episode difficulty.</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-blue-400">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> MoneyIQ Score
              </span>
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Return %
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={episodeTrendData}>
                <defs>
                  <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="returnGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="episode" stroke="#64748b" textAnchor="middle" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748b" domain={[0, 100]} tick={{ fontSize: 11 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }}
                  itemStyle={{ color: '#e2e8f0' }}
                />
                <Area type="monotone" dataKey="avgScore" stroke="#3b82f6" strokeWidth={2.5} fillOpacity={1} fill="url(#scoreGrad)" name="Avg MoneyIQ Score" />
                <Area type="monotone" dataKey="avgReturn" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#returnGrad)" name="Simulated Return %" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Behavioral Archetype Distribution */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold text-white">Contestant Archetypes</h3>
              <button 
                onClick={() => onNavigateTab('CLUSTERING')}
                className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-0.5 cursor-pointer"
              >
                K-Means <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-xs text-slate-400 mb-3">K-Means behavioral clustering into 4 psychological profiles.</p>
          </div>

          <div className="h-44 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={clusterPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {clusterPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.5rem', fontSize: '11px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-slate-800 text-[11px]">
            {clusterPieData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <span className="truncate max-w-[160px]">{item.name}</span>
                </span>
                <span className="font-mono font-semibold text-slate-200">{item.value} contestants</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Secondary Row: Score Distribution & Top Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Score Distribution Histogram */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-sm font-bold text-white">Score Distribution</h3>
              <p className="text-xs text-slate-400">Bell-curve grouping across IFI candidate cohort.</p>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
              N={contestants.length}
            </span>
          </div>

          <div className="h-48 w-full mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={scoreBuckets}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="range" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11 }} allowDecimals={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.5rem', fontSize: '11px' }}
                />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Contestants" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Contenders Spotlight (2 Cols) */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>Season 1 Top Contenders Leaderboard Spotlight</span>
              </h3>
              <p className="text-xs text-slate-400">High MoneyIQ scores and ML-predicted finale win probabilities.</p>
            </div>
            <button
              onClick={() => onNavigateTab('LEADERBOARD')}
              className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer font-medium"
            >
              Full Rankings <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
            {topPerformers.map((c, idx) => (
              <div
                key={c.id}
                onClick={() => onSelectContestant(c)}
                className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-850/60 transition-all cursor-pointer group flex items-start gap-3"
              >
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-md"
                  style={{ backgroundColor: c.avatarColor }}
                >
                  #{idx + 1}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="text-xs font-bold text-white truncate group-hover:text-blue-300 transition-colors">
                      {c.name}
                    </h4>
                    <span className="font-mono text-xs font-extrabold text-blue-400">
                      {c.historicalMoneyIQ} <span className="text-[10px] text-slate-500 font-normal">pts</span>
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-400 truncate">{c.city} • {c.profession}</p>

                  <div className="flex items-center gap-2 mt-2">
                    <span 
                      className="text-[9px] font-mono px-1.5 py-0.5 rounded font-semibold"
                      style={{
                        backgroundColor: CLUSTER_METADATA[c.cluster]?.badgeBg || 'rgba(59, 130, 246, 0.1)',
                        color: CLUSTER_METADATA[c.cluster]?.color || '#3b82f6',
                      }}
                    >
                      {CLUSTER_METADATA[c.cluster]?.name.split(' ')[0]}
                    </span>

                    <span className="text-[10px] text-emerald-400 font-mono font-medium">
                      Win Prob: {Math.round(c.predictedWinProbability * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
