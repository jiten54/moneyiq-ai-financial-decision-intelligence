/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * MoneyIQ AI - Audience Engagement & Reality Show TRP Analytics
 */

import React, { useState } from 'react';
import { 
  Radio, 
  Tv, 
  Heart, 
  Flame, 
  TrendingUp, 
  MessageSquare, 
  Share2, 
  Sparkles,
  ThumbsUp,
  AlertCircle
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
  Legend 
} from 'recharts';
import { AudienceSentiment, ContestantProfile } from '../../types';

interface AudienceAnalyticsViewProps {
  audienceMetrics: AudienceSentiment[];
  contestants: ContestantProfile[];
}

export const AudienceAnalyticsView: React.FC<AudienceAnalyticsViewProps> = ({
  audienceMetrics,
  contestants,
}) => {
  const [selectedContestantVote, setSelectedContestantVote] = useState<string>(contestants[0]?.id || 'IFI-C01');
  const [voteCountDelta, setVoteCountDelta] = useState<number>(0);
  const [voteSuccessToast, setVoteSuccessToast] = useState<string | null>(null);

  // Handle fan vote simulation
  const handleCastVote = () => {
    const candidate = contestants.find(c => c.id === selectedContestantVote);
    setVoteCountDelta(prev => prev + 1);
    setVoteSuccessToast(`Simulated vote cast for ${candidate?.name || 'Contestant'}! Audience popularity updated.`);
    setTimeout(() => {
      setVoteSuccessToast(null);
    }, 4000);
  };

  const chartData = audienceMetrics.map(ep => ({
    episode: `Ep ${ep.episode}`,
    tvt: ep.tvtRating,
    votes: Math.round(ep.totalVotes / 1000),
    positive: ep.positiveSentimentPct,
    neutral: ep.neutralSentimentPct,
    controversial: ep.controversialSentimentPct,
  }));

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Banner */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-400 border border-purple-500/30 uppercase font-semibold">
                Broadcast Telemetry
              </span>
              <span className="text-xs text-slate-400">Viewership Ratings (TVT) & Sentiment</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Tv className="w-5 h-5 text-indigo-400" />
              <span>Audience Engagement & Reality Show Sentiment Intelligence</span>
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Real-time monitoring of television viewership ratings, social media controversy spikes, fan voting share, and audience emotional resonance.
            </p>
          </div>

          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-slate-300">Peak Finale TRP:</span>
            <span className="text-emerald-400 font-bold">7.8M Viewers</span>
          </div>
        </div>
      </div>

      {/* Main Charts: TVT Viewership & Sentiment Spread */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: TVT Viewership & Total Votes (7 Cols) */}
        <div className="lg:col-span-7 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white">Broadcast Viewership (TVT) & Vote Volume</h3>
              <p className="text-xs text-slate-400">Television ratings and digital app voting engagement per episode.</p>
            </div>
            <span className="text-xs font-mono text-purple-400">Episodes 1-10</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="tvtGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="episode" stroke="#64748b" tick={{ fontSize: 10 }} />
                <YAxis stroke="#64748b" domain={[0, 9]} tick={{ fontSize: 10 }} label={{ value: 'Viewers (Millions)', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 10 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.5rem', fontSize: '11px' }}
                />
                <Area type="monotone" dataKey="tvt" stroke="#8b5cf6" strokeWidth={2.5} fillOpacity={1} fill="url(#tvtGrad)" name="TVT (Millions)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Positive vs Controversial Sentiment Breakdown (5 Cols) */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white">Audience Sentiment Distribution (%)</h3>
              <p className="text-xs text-slate-400">Tracking viewer polarity across challenge drama.</p>
            </div>
            <span className="text-xs font-mono text-emerald-400">84% Positive Mean</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="episode" stroke="#64748b" tick={{ fontSize: 9 }} />
                <YAxis stroke="#64748b" domain={[0, 100]} tick={{ fontSize: 9 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.5rem', fontSize: '11px' }}
                />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                <Bar dataKey="positive" stackId="a" fill="#10b981" name="Positive %" />
                <Bar dataKey="neutral" stackId="a" fill="#64748b" name="Neutral %" />
                <Bar dataKey="controversial" stackId="a" fill="#f43f5e" name="Controversial %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Simulated Live Audience Voting Card */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/30 via-slate-900 to-blue-950/30 border border-purple-500/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
              <h3 className="text-sm font-bold text-white">Simulated Live Audience Voting Hub</h3>
            </div>
            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
              Cast a simulated fan vote to see how crowd endorsement shifts contestant popularity index and psychological resilience.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={selectedContestantVote}
              onChange={(e) => setSelectedContestantVote(e.target.value)}
              className="bg-slate-950 border border-slate-700 text-xs text-slate-200 rounded-lg px-3 py-2 focus:outline-none"
            >
              {contestants.map(c => (
                <option key={c.id} value={c.id}>{c.name} ({c.audienceApprovalPct}% approval)</option>
              ))}
            </select>

            <button
              onClick={handleCastVote}
              className="px-4 py-2 rounded-lg font-semibold text-xs bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-600/30 transition-all cursor-pointer flex items-center gap-1.5 active:scale-95 shrink-0"
            >
              <ThumbsUp className="w-3.5 h-3.5" />
              Cast Fan Vote
            </button>
          </div>
        </div>

        {voteSuccessToast && (
          <div className="mt-3 p-2.5 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2 animate-fade-in">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>{voteSuccessToast} (Total simulated votes: +{voteCountDelta})</span>
          </div>
        )}
      </div>

      {/* Top Reality Show Moments Log */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-400" />
            <span>Broadcast Viral Moments & Social Buzz Tracker</span>
          </h3>
          <span className="text-xs font-mono text-slate-400">10 Highlight Reels</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {audienceMetrics.map(ep => (
            <div key={ep.episode} className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex flex-col items-center justify-center shrink-0">
                <span className="text-[9px] font-mono text-slate-500 uppercase">Ep</span>
                <span className="font-mono font-bold text-white text-xs">{ep.episode}</span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <span className="text-[10px] font-mono text-blue-400 font-semibold">
                    {(ep.totalVotes / 1000).toFixed(0)}k Votes • {ep.tvtRating}M TVT
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 font-medium">
                    {ep.positiveSentimentPct}% Positive
                  </span>
                </div>
                <p className="text-xs text-slate-200 leading-snug">{ep.topMoment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
