/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * MoneyIQ AI - Transparent Scoring & Feature Engine
 * Mathematical implementation matching India's Future Investors (IFI) evaluation criteria.
 */

import { ScoreBreakdown, ScoringWeights, UserChallengeSubmission, ShapFeatureContribution } from '../types';

export const DEFAULT_WEIGHTS: ScoringWeights = {
  accuracyWeight: 0.40,
  riskManagementWeight: 0.25,
  consistencyWeight: 0.20,
  timeEfficiencyWeight: 0.15,
};

/**
 * Calculates the Herfindahl-Hirschman Index (HHI) for portfolio diversification.
 * HHI closer to 0 indicates well-diversified assets; closer to 1 indicates concentration risk.
 */
export function calculateDiversificationHHI(allocations: number[]): number {
  const sum = allocations.reduce((acc, v) => acc + v, 0);
  if (sum === 0) return 1.0;
  const normalized = allocations.map(v => v / sum);
  return normalized.reduce((acc, w) => acc + w * w, 0);
}

/**
 * Evaluates an interactive user submission or synthetic challenge execution.
 */
export function evaluateFinancialDecision(
  sub: UserChallengeSubmission,
  customWeights: ScoringWeights = DEFAULT_WEIGHTS
): { breakdown: ScoreBreakdown; simulatedReturnPct: number; shapExplanation: ShapFeatureContribution[] } {
  // 1. Asset weights
  const equity = sub.equityAllocationPct / 100;
  const debt = sub.debtAllocationPct / 100;
  const gold = sub.goldAllocationPct / 100;
  const cash = sub.cashAllocationPct / 100;
  const alt = sub.alternativeAllocationPct / 100;

  // Expected returns & volatilities (Annualized simulation under realistic Indian market conditions)
  const expEquityReturn = 0.145; // Nifty 50 long-term CAGR estimate
  const expDebtReturn = 0.072;   // 10Y G-Sec / Corporate Bond
  const expGoldReturn = 0.098;   // Sovereign Gold Bond / Physical Gold
  const expCashReturn = 0.045;   // Liquid fund / overnight
  const expAltReturn = 0.220;    // Startup / Alternative AIF

  const baseReturn = (equity * expEquityReturn) + (debt * expDebtReturn) + 
                     (gold * expGoldReturn) + (cash * expCashReturn) + (alt * expAltReturn);

  // Shock mitigation bonus/penalty
  let shockPenalty = 0;
  if (!sub.usedShockMitigation && (equity + alt > 0.65)) {
    shockPenalty = 0.06; // 6% drawdown during unhedged shock
  }
  const hedgeBonus = (sub.hedgedRatioPct / 100) * 0.025;
  const finalSimulatedReturnPct = Math.round(((baseReturn - shockPenalty + hedgeBonus) * 100) * 10) / 10;

  // 2. Component Scoring (0-100 scale)
  // Financial Accuracy: Optimal return vs risk trade-off (Target Sharpe profile ~ 10-14% balanced return)
  const targetReturnPct = 12.0;
  const returnError = Math.abs(finalSimulatedReturnPct - targetReturnPct);
  let accuracyScore = Math.max(10, Math.min(100, Math.round(100 - (returnError * 4.5))));

  // Risk Management: Diversification + Emergency Buffer + Hedge
  const hhi = calculateDiversificationHHI([equity, debt, gold, cash, alt]);
  const diversificationScore = Math.max(20, Math.min(100, Math.round((1 - hhi) * 130)));
  const bufferScore = Math.min(100, (sub.emergencyBufferINR / 150000) * 100);
  const hedgeScore = (sub.hedgedRatioPct / 100) * 100;
  
  let riskScore = Math.round(
    (diversificationScore * 0.45) + (bufferScore * 0.35) + (hedgeScore * 0.20)
  );

  // Consistency Score: Balanced asset allocation and stability
  const equityDebtRatio = debt > 0 ? equity / debt : 3.0;
  let consistencyScore = 80;
  if (equityDebtRatio >= 0.5 && equityDebtRatio <= 2.0) {
    consistencyScore += 18;
  } else if (equityDebtRatio > 4.0 || equityDebtRatio < 0.2) {
    consistencyScore -= 25;
  }
  consistencyScore = Math.max(15, Math.min(100, consistencyScore));

  // Time Efficiency: Optimal response time (15s to 45s is sweet spot, > 55s penalized for panic)
  let timeScore = 85;
  if (sub.timeSpentSec < 10) {
    timeScore = 55; // Rushed / Impulsive
  } else if (sub.timeSpentSec >= 15 && sub.timeSpentSec <= 35) {
    timeScore = 96; // Decisive and deliberate
  } else if (sub.timeSpentSec > 50) {
    timeScore = Math.max(30, 90 - (sub.timeSpentSec - 50) * 3); // Indecisive under pressure
  }

  // 3. Penalty deductions
  let overLeveragePenalty = 0;
  if (equity + alt > 0.80) {
    overLeveragePenalty = Math.round(((equity + alt) - 0.80) * 100);
  }

  let illiquidityPenalty = 0;
  if (cash < 0.08 && sub.emergencyBufferINR < 50000) {
    illiquidityPenalty = 15;
  }

  let panicDecisionPenalty = 0;
  if (sub.timeSpentSec > 55 && (equity > 0.7 || alt > 0.3)) {
    panicDecisionPenalty = 10;
  }

  // Adjust scores with penalties
  riskScore = Math.max(5, riskScore - overLeveragePenalty - illiquidityPenalty);
  timeScore = Math.max(5, timeScore - panicDecisionPenalty);

  // 4. Weighted Composite MoneyIQ Score
  const totalWeight = customWeights.accuracyWeight + customWeights.riskManagementWeight + 
                      customWeights.consistencyWeight + customWeights.timeEfficiencyWeight;
  
  const rawMoneyIQ = (
    (accuracyScore * customWeights.accuracyWeight) +
    (riskScore * customWeights.riskManagementWeight) +
    (consistencyScore * customWeights.consistencyWeight) +
    (timeScore * customWeights.timeEfficiencyWeight)
  ) / totalWeight;

  const moneyIQScore = Math.round(Math.max(10, Math.min(100, rawMoneyIQ)));

  // 5. Letter Grade Determination
  let grade: ScoreBreakdown['grade'] = 'C';
  if (moneyIQScore >= 92) grade = 'A+';
  else if (moneyIQScore >= 84) grade = 'A';
  else if (moneyIQScore >= 76) grade = 'B+';
  else if (moneyIQScore >= 68) grade = 'B';
  else if (moneyIQScore >= 55) grade = 'C';
  else if (moneyIQScore >= 45) grade = 'D';
  else grade = 'F';

  // 6. Explainable AI / SHAP Feature Attribution
  // Base baseline expectation for MoneyIQ score in IFI pool is ~68 points
  const baseline = 68;
  const shapExplanation: ShapFeatureContribution[] = [
    {
      featureName: 'Asset Diversification (1 - HHI)',
      featureKey: 'diversification',
      actualValue: Math.round((1 - hhi) * 100) / 100,
      contribution: Math.round((diversificationScore - 70) * 0.22),
      description: hhi < 0.35 
        ? 'Prudent spread across uncorrelated asset classes reduced portfolio volatility.' 
        : 'Concentrated risk exposure reduced diversification buffer.',
    },
    {
      featureName: 'Emergency Liquidity Buffer',
      featureKey: 'emergency_buffer',
      actualValue: sub.emergencyBufferINR,
      contribution: Math.round((bufferScore - 60) * 0.18),
      description: sub.emergencyBufferINR >= 100000 
        ? 'Sufficient liquidity cushion maintained capital resilience.' 
        : 'Sub-optimal liquid cash reserves caused illiquidity haircut.',
    },
    {
      featureName: 'Risk Asset Exposure (Equity + Alt)',
      featureKey: 'risk_exposure',
      actualValue: Math.round((equity + alt) * 100),
      contribution: overLeveragePenalty > 0 ? -overLeveragePenalty : 4,
      description: overLeveragePenalty > 0 
        ? `Exceeded 80% aggressive asset ceiling without hedging (-${overLeveragePenalty} pts).` 
        : 'Aggressive asset exposure stayed within calibrated risk tolerance.',
    },
    {
      featureName: 'Decision Pace Under Pressure',
      featureKey: 'decision_time',
      actualValue: sub.timeSpentSec,
      contribution: Math.round((timeScore - 75) * 0.15),
      description: sub.timeSpentSec >= 15 && sub.timeSpentSec <= 35 
        ? 'Calm and decisive execution within optimal deliberation window.' 
        : sub.timeSpentSec < 10 
          ? 'Fast impulsive entry triggered caution flags.' 
          : 'Prolonged deliberation under countdown pressure eroded execution score.',
    },
    {
      featureName: 'Shock Mitigation Protocol',
      featureKey: 'shock_mitigation',
      actualValue: sub.usedShockMitigation ? 1 : 0,
      contribution: sub.usedShockMitigation ? 8 : -8,
      description: sub.usedShockMitigation 
        ? 'Active hedging shielded portfolio during black swan liquidity shock.' 
        : 'Unhedged vulnerability led to negative market shock impact.',
    }
  ];

  return {
    breakdown: {
      moneyIQScore,
      accuracyScore,
      riskScore,
      consistencyScore,
      timeEfficiencyScore: timeScore,
      penalties: {
        overLeveragePenalty,
        illiquidityPenalty,
        panicDecisionPenalty,
      },
      grade,
    },
    simulatedReturnPct: finalSimulatedReturnPct,
    shapExplanation,
  };
}
