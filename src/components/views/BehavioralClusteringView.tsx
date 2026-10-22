/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * MoneyIQ AI - K-Means Behavioral Clustering & Contestant Segmentation
 */

import React, { useState } from 'react';
import { 
  Binary, 
  Users, 
  Target, 
  ShieldCheck, 
  Flame, 
  AlertTriangle,
  ChevronRight,
  Sparkles,
  Compass
} from 'lucide-react';
import { 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend
} from 'recharts';
import { ContestantProfile, BehavioralCluster } from '../../types';
import { 
  CLUSTER_METADATA, 
  computeClusterCentroidStats, 
  projectBehavioralPCA 
} from '../../ml/clustering';

interface BehavioralClusteringViewProps {
  contestants: ContestantProfile[];
  onSelectContestant: (c: ContestantProfile) => void;
}

export const BehavioralClusteringView: React.FC<BehavioralClusteringViewProps> = ({
  contestants,
  onSelectContestant,
}) => {
  const [selectedClusterFilter, setSelectedClusterFilter] = useState<BehavioralCluster | 'ALL'>('ALL');
  const [highlightedContestant, setHighlightedContestant] = useState<ContestantProfile | null>(null);

  const centroidStats = computeClusterCentroidStats(contestants);

  // 2D PCA Projected Scatter Data
  const scatterPoints = contestants.map(c => {
    const pca = projectBehavioralPCA(
      c.riskToleranceIndex,
      c.avgDecisionTimeSec,
      c.emergencyBufferRatio,
      c.consistencyRate
    );
    const meta = CLUSTER_METADATA[c.cluster];

    return {
      id: c.id,
      name: c.name,
      x: pca.x,
      y: pca.y,
      cluster: c.cluster,
      clusterName: meta.name,
      color: meta.color,
      score: c.historicalMoneyIQ,
      risk: Math.round(c.riskToleranceIndex * 100),
      speed: `${c.avgDecisionTimeSec}s`,
      contestantRef: c,
    };
  });

  const filteredScatter = selectedClusterFilter === 'ALL'
    ? scatterPoints
    : scatterPoints.filter(p => p.cluster === selectedClusterFilter);

  // Radar Chart Data comparing the 4 Archetypes
  const radarData = [
    {
      metric: 'Risk Appetite',
      Strategic: 55,
      Prudent: 22,
      Aggressive: 85,
      Speculator: 75,
    },
    {
      metric: 'Decision Pace',
      Strategic: 70,
      Prudent: 45,
      Aggressive: 82,
      Speculator: 30,
    },
    {
      metric: 'Liquidity Buffer',
      Strategic: 65,
      Prudent: 85,
      Aggressive: 35,
      Speculator: 20,
    },
    {
      metric: 'Consistency',
      Strategic: 88,
      Prudent: 80,
      Aggressive: 60,
      Speculator: 38,
    },
    {
      metric: 'Market Resilience',
      Strategic: 82,
      Prudent: 92,
      Aggressive: 52,
      Speculator: 28,
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Banner */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30 uppercase font-semibold">
                Unsupervised Learning
              </span>
              <span className="text-xs text-slate-400">K-Means Centroid Convergence</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Contestant Behavioral Segmentation & Psychological Profiling
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Unsupervised clustering on 4 core behavioral dimensions: Risk Tolerance Index, Decision Speed Under Pressure, Emergency Liquidity Buffer, and Allocation Consistency.
            </p>
          </div>

          {/* Cluster Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => setSelectedClusterFilter('ALL')}
              className={`px-2.5 py-1 text-xs rounded-lg font-semibold transition-all cursor-pointer ${
                selectedClusterFilter === 'ALL'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All (4 Clusters)
            </button>
            {(Object.keys(CLUSTER_METADATA) as BehavioralCluster[]).map(key => (
              <button
                key={key}
                onClick={() => setSelectedClusterFilter(key)}
                className={`px-2.5 py-1 text-xs rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedClusterFilter === key
                    ? 'bg-slate-800 text-white border border-slate-700'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: CLUSTER_METADATA[key].color }}></span>
                <span>{CLUSTER_METADATA[key].name.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: 2D PCA Scatter & Radar Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 2D Behavioral Space (7 Cols) */}
        <div className="lg:col-span-7 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Compass className="w-4 h-4 text-blue-400" />
                <span>2D Behavioral Projection (PCA Dimensionality Reduction)</span>
              </h3>
              <p className="text-xs text-slate-400">Click any point to inspect individual psychological dossier.</p>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Showing {filteredScatter.length} points
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis 
                  type="number" 
                  dataKey="x" 
                  name="Aggression vs Defense" 
                  stroke="#64748b" 
                  tick={{ fontSize: 10 }}
                  label={{ value: 'Aggressive Risk Exposure →', position: 'bottom', fill: '#64748b', fontSize: 10 }}
                />
                <YAxis 
                  type="number" 
                  dataKey="y" 
                  name="Discipline vs Panic" 
                  stroke="#64748b" 
                  tick={{ fontSize: 10 }}
                  label={{ value: '← High Discipline', angle: -90, position: 'left', fill: '#64748b', fontSize: 10 }}
                />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  content={({ payload }) => {
                    if (!payload || !payload[0]) return null;
                    const data = payload[0].payload;
                    return (
                      <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs space-y-1 shadow-xl">
                        <div className="font-bold text-white">{data.name}</div>
                        <div className="text-[11px]" style={{ color: data.color }}>{data.clusterName}</div>
                        <div className="text-slate-400">MoneyIQ: <span className="font-mono text-white font-bold">{data.score} pts</span></div>
                        <div className="text-slate-400">Decision Pace: <span className="font-mono text-white">{data.speed}</span></div>
                      </div>
                    );
                  }}
                />
                <Scatter 
                  data={filteredScatter} 
                  onClick={(node: any) => {
                    if (node && node.contestantRef) {
                      setHighlightedContestant(node.contestantRef);
                    }
                  }}
                  className="cursor-pointer"
                >
                  {filteredScatter.map((entry, index) => (
                    <Cell 
                      key={`scatter-cell-${index}`} 
                      fill={entry.color} 
                      r={highlightedContestant?.id === entry.id ? 10 : 7}
                      stroke="#0f172a"
                      strokeWidth={2}
                    />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          {/* Highlighted Contestant Quick Dossier */}
          {highlightedContestant && (
            <div className="p-3 rounded-xl bg-slate-950 border border-blue-500/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div 
                  className="w-9 h-9 rounded-lg flex items-center justify-center font-bold text-white text-xs shrink-0"
                  style={{ backgroundColor: highlightedContestant.avatarColor }}
                >
                  {highlightedContestant.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{highlightedContestant.name}</h4>
                  <p className="text-[11px] text-slate-400">{highlightedContestant.profession} • {highlightedContestant.city}</p>
                </div>
              </div>

              <button
                onClick={() => onSelectContestant(highlightedContestant)}
                className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 cursor-pointer"
              >
                Open Full Dossier <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Right: Radar Profile (5 Cols) */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Multi-Dimensional Behavioral Radar</span>
            </h3>
            <p className="text-xs text-slate-400">Comparing psychological attributes of the 4 investor archetypes.</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#1e293b" />
                <PolarAngleAxis dataKey="metric" stroke="#94a3b8" tick={{ fontSize: 10 }} />
                <PolarRadiusAxis stroke="#475569" angle={30} domain={[0, 100]} tick={{ fontSize: 9 }} />
                <Radar name="Strategic Growth" dataKey="Strategic" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.25} />
                <Radar name="Prudent Preserver" dataKey="Prudent" stroke="#10b981" fill="#10b981" fillOpacity={0.25} />
                <Radar name="Aggressive Alpha" dataKey="Aggressive" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.25} />
                <Radar name="Impulsive Speculator" dataKey="Speculator" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.25} />
                <Legend 
                  wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Archetype Detail Dossier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {centroidStats.map(stat => {
          const meta = CLUSTER_METADATA[stat.cluster];
          return (
            <div 
              key={stat.cluster}
              className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span 
                    className="text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase"
                    style={{ backgroundColor: meta.badgeBg, color: meta.color }}
                  >
                    Cluster {stat.cluster === 'STRATEGIC_GROWTH' ? '1' : stat.cluster === 'PRUDENT_PRESERVER' ? '2' : stat.cluster === 'AGGRESSIVE_ALPHA' ? '3' : '4'}
                  </span>
                  <span className="font-mono text-xs text-slate-400 font-semibold">{stat.count} Contestants</span>
                </div>

                <h4 className="text-sm font-bold text-white mb-1" style={{ color: meta.color }}>
                  {meta.name}
                </h4>
                <p className="text-[11px] font-medium text-slate-300 mb-2">{meta.tagline}</p>
                <p className="text-[11px] text-slate-400 leading-relaxed mb-4">{meta.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-800 space-y-1.5 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-400">Avg MoneyIQ Score:</span>
                  <span className="font-mono font-bold text-white">{stat.avgScore} pts</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Risk Tolerance Index:</span>
                  <span className="font-mono font-bold text-slate-200">{Math.round(stat.riskTolerance * 100)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Avg Decision Pace:</span>
                  <span className="font-mono font-bold text-slate-200">{stat.decisionSpeed}s</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
