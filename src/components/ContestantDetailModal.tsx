/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * MoneyIQ AI - Contestant Intelligence Dossier Modal
 */

import React from 'react';
import { 
  X, 
  Trophy, 
  ShieldCheck, 
  Clock, 
  TrendingUp, 
  Sparkles, 
  AlertTriangle,
  Play,
  Heart,
  Briefcase,
  MapPin,
  Calendar
} from 'lucide-react';
import { ContestantProfile, ChallengeRecord } from '../types';
import { CLUSTER_METADATA } from '../ml/clustering';

interface ContestantDetailModalProps {
  contestant: ContestantProfile | null;
  challenges: ChallengeRecord[];
  onClose: () => void;
  onSimulateForContestant: (c: ContestantProfile) => void;
}

export const ContestantDetailModal: React.FC<ContestantDetailModalProps> = ({
  contestant,
  challenges,
  onClose,
  onSimulateForContestant,
}) => {
  if (!contestant) return null;

  const meta = CLUSTER_METADATA[contestant.cluster];
  const contestantChallenges = challenges.filter(c => c.contestantId === contestant.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative p-6 border-b border-slate-800 bg-gradient-to-r from-blue-950/40 via-slate-900 to-indigo-950/40">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-start gap-4">
            <div 
              className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-white text-xl shadow-lg shrink-0"
              style={{ backgroundColor: contestant.avatarColor }}
            >
              {contestant.name.slice(0, 2).toUpperCase()}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span 
                  className="text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase"
                  style={{ backgroundColor: meta.badgeBg, color: meta.color }}
                >
                  {meta.name}
                </span>
                <span className="text-xs text-slate-400 font-mono">ID: {contestant.id}</span>
              </div>

              <h3 className="text-xl font-extrabold text-white truncate">{contestant.name}</h3>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1">
                <span className="flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5 text-blue-400" />
                  {contestant.profession}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  {contestant.city}
                </span>
                <span>Age: {contestant.age}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-5 custom-scrollbar text-xs">
          {/* Contestant Bio */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 leading-relaxed">
            {contestant.background}
          </div>

          {/* Core Metrics Grid (4 Stats) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <span className="text-[10px] font-mono uppercase text-slate-400 block mb-0.5">MoneyIQ</span>
              <span className="text-2xl font-black font-mono text-blue-400">{contestant.historicalMoneyIQ}</span>
              <span className="text-[10px] text-slate-500 block">Overall Score</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <span className="text-[10px] font-mono uppercase text-slate-400 block mb-0.5">Win Forecast</span>
              <span className="text-2xl font-black font-mono text-emerald-400">
                {Math.round(contestant.predictedWinProbability * 100)}%
              </span>
              <span className="text-[10px] text-slate-500 block">ML Probability</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <span className="text-[10px] font-mono uppercase text-slate-400 block mb-0.5">Pace Under Clock</span>
              <span className="text-2xl font-black font-mono text-white">{contestant.avgDecisionTimeSec}s</span>
              <span className="text-[10px] text-slate-500 block">Deliberation</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <span className="text-[10px] font-mono uppercase text-slate-400 block mb-0.5">Audience Heart</span>
              <span className="text-2xl font-black font-mono text-purple-400">{contestant.audienceApprovalPct}%</span>
              <span className="text-[10px] text-slate-500 block">Fan Approval</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-1.5">
            {contestant.tags.map(t => (
              <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                #{t}
              </span>
            ))}
          </div>

          {/* Historical Performance in Season 1 */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase font-mono tracking-wider text-[11px]">
              Season 1 Evaluation Records ({contestantChallenges.length})
            </h4>

            {contestantChallenges.length > 0 ? (
              <div className="space-y-2">
                {contestantChallenges.map(ch => (
                  <div key={ch.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 font-bold">
                          Ep {ch.episodeNumber}
                        </span>
                        <span className="font-bold text-white text-xs">{ch.challengeTitle}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        Alpha: <span className="text-emerald-400 font-mono font-bold">+{ch.alphaGeneratedPct}%</span> • Time: {ch.timeTakenSec}s
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-mono text-base font-black text-white">{ch.overallMoneyIQ}</span>
                      <span className="text-[10px] text-slate-400 block">MoneyIQ</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 italic">No historical records logged for this contestant.</p>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all cursor-pointer"
          >
            Close Dossier
          </button>

          <button
            onClick={() => {
              onClose();
              onSimulateForContestant(contestant);
            }}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/30 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Simulate Live Challenge as {contestant.name.split(' ')[0]}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
