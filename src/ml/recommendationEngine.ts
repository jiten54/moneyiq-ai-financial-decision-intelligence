/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * MoneyIQ AI - Smart Challenge Recommendation Engine
 * Analyzes financial blind spots and generates personalized training recommendations.
 */

import { ContestantProfile, ChallengeRecommendation, ChallengeType } from '../types';

export function generateSmartRecommendations(contestants: ContestantProfile[]): ChallengeRecommendation[] {
  return contestants.map(c => {
    let rec: ChallengeType = 'ASSET_ALLOCATION';
    let reason = '';
    let targetSkill = '';
    let difficulty: 'Beginner' | 'Intermediate' | 'Mastery' | 'Sudden Death' = 'Intermediate';
    let potential = 12;

    // Detect behavioral blind spots
    if (c.emergencyBufferRatio < 0.40 || c.debtToCapitalRatio > 0.45) {
      rec = 'LIQUIDITY_SHOCK';
      reason = `Excessive leverage (${Math.round(c.debtToCapitalRatio * 100)}%) and thin emergency liquidity buffer (${Math.round(c.emergencyBufferRatio * 100)}%) expose contestant to sudden cash crunch.`;
      targetSkill = 'Liquidity Resilience & Fire-Sale Avoidance';
      difficulty = 'Mastery';
      potential = 18;
    } else if (c.avgDecisionTimeSec > 35) {
      rec = 'DERIVATIVES_HEDGING';
      reason = `Decision deliberation latency (${c.avgDecisionTimeSec}s avg) degrades efficiency under ticking reality-show clocks.`;
      targetSkill = 'High-Speed Dynamic Hedging Under Clock Pressure';
      difficulty = 'Sudden Death';
      potential = 15;
    } else if (c.riskToleranceIndex < 0.35) {
      rec = 'STARTUP_VALUATION';
      reason = `Ultra-defensive risk posture (${Math.round(c.riskToleranceIndex * 100)}% risk index) leaves potential equity alpha on the table.`;
      targetSkill = 'Early-Stage Growth Capital Allocation & Valuation Multiples';
      difficulty = 'Intermediate';
      potential = 14;
    } else {
      rec = 'ASSET_ALLOCATION';
      reason = `Solid baseline performance. Needs mastery of non-linear correlation shifts during volatile macroeconomic stagflation.`;
      targetSkill = 'Cross-Asset Macro Frontier Optimization';
      difficulty = 'Mastery';
      potential = 10;
    }

    return {
      contestantId: c.id,
      contestantName: c.name,
      recommendedChallenge: rec,
      reason,
      targetSkill,
      expectedDifficulty: difficulty,
      improvementPotential: potential,
    };
  });
}
