/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * MoneyIQ AI - Smart Challenge Recommendations
 */

import React from 'react';
import { 
  Lightbulb, 
  Target, 
  ArrowRight, 
  TrendingUp, 
  Zap, 
  CheckCircle2, 
  Play,
  ShieldAlert
} from 'lucide-react';
import { ContestantProfile, ChallengeRecommendation, ChallengeType } from '../../types';
import { generateSmartRecommendations } from '../../ml/recommendationEngine';
import { SIMULATOR_CHALLENGES } from '../../data/challenges';

interface RecommendationViewProps {
  contestants: ContestantProfile[];
  onLaunchChallengeInSimulator: (challengeId: ChallengeType) => void;
}

export const RecommendationView: React.FC<RecommendationViewProps> = ({
  contestants,
  onLaunchChallengeInSimulator,
}) => {
  const recommendations = generateSmartRecommendations(contestants);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Banner */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30 uppercase font-semibold">
                Prescriptive Intelligence
              </span>
              <span className="text-xs text-slate-400">Automated Financial Blind-Spot Detection</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-400" />
              <span>Smart Challenge Recommendations & Skill Gap Remediation</span>
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Algorithmic training advisor suggesting tailored simulation rounds to fix contestant vulnerabilities (e.g. illiquidity risk, clock panic, or timid capital deployment).
            </p>
          </div>

          <div className="text-xs font-mono text-slate-400 p-2.5 rounded-xl bg-slate-950 border border-slate-800">
            {recommendations.length} Tailored Diagnostic Profiles
          </div>
        </div>
      </div>

      {/* Recommendations Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendations.map((rec) => {
          const contestant = contestants.find(c => c.id === rec.contestantId);
          const challengeConfig = SIMULATOR_CHALLENGES.find(c => c.id === rec.recommendedChallenge);

          return (
            <div
              key={rec.contestantId}
              className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header: Contestant Name & Current Score */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-white text-xs"
                      style={{ backgroundColor: contestant?.avatarColor || '#3b82f6' }}
                    >
                      {rec.contestantName.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">{rec.contestantName}</h4>
                      <span className="text-[10px] text-slate-400 font-mono">Current: {contestant?.historicalMoneyIQ} pts</span>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    +{rec.improvementPotential} pts gain
                  </span>
                </div>

                {/* Target Challenge */}
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 my-2.5">
                  <span className="text-[9px] uppercase font-mono text-blue-400 block font-semibold">
                    Recommended Round
                  </span>
                  <h5 className="text-xs font-bold text-white mt-0.5">
                    {challengeConfig?.title || rec.recommendedChallenge}
                  </h5>
                  <span className="text-[10px] text-slate-400 block mt-1">
                    Target Skill: <span className="text-slate-300 font-medium">{rec.targetSkill}</span>
                  </span>
                </div>

                {/* Diagnosis Reason */}
                <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                  {rec.reason}
                </p>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onLaunchChallengeInSimulator(rec.recommendedChallenge)}
                className="w-full py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-blue-600 text-slate-200 hover:text-white border border-slate-700 hover:border-blue-500 transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-95"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Simulate Practice Round</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
