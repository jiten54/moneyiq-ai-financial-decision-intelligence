/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * MoneyIQ AI - Domain Types & Schemas
 * Tailored for India's Future Investors (IFI) Reality Show
 */

export type ChallengeType = 
  | 'ASSET_ALLOCATION'
  | 'LIQUIDITY_SHOCK'
  | 'STARTUP_VALUATION'
  | 'DERIVATIVES_HEDGING';

export type BehavioralCluster = 
  | 'STRATEGIC_GROWTH'
  | 'PRUDENT_PRESERVER'
  | 'AGGRESSIVE_ALPHA'
  | 'IMPULSIVE_SPECULATOR';

export type PredictionOutcome = 'HIGH_PROBABILITY_WIN' | 'SAFE_ADVANCE' | 'AT_RISK_ELIMINATION';

export interface ScoringWeights {
  accuracyWeight: number;      // Default 0.40
  riskManagementWeight: number; // Default 0.25
  consistencyWeight: number;    // Default 0.20
  timeEfficiencyWeight: number; // Default 0.15
}

export interface ScoreBreakdown {
  moneyIQScore: number;         // 0 - 100 overall composite score
  accuracyScore: number;        // 0 - 100 based on return & benchmark tracking
  riskScore: number;            // 0 - 100 penalty-adjusted risk management
  consistencyScore: number;     // 0 - 100 stability across volatility
  timeEfficiencyScore: number;  // 0 - 100 decision pace under pressure
  penalties: {
    overLeveragePenalty: number;
    illiquidityPenalty: number;
    panicDecisionPenalty: number;
  };
  grade: 'A+' | 'A' | 'B+' | 'B' | 'C' | 'D' | 'F';
}

export interface ContestantProfile {
  id: string;
  name: string;
  age: number;
  city: string;
  profession: string;
  background: string;
  avatarSeed: string;
  avatarColor: string;
  episodesActive: number[];
  cluster: BehavioralCluster;
  historicalMoneyIQ: number;
  accuracyMean: number;
  riskToleranceIndex: number;   // 0.0 to 1.0 (0 = extreme caution, 1 = hyper risk)
  avgDecisionTimeSec: number;
  emergencyBufferRatio: number; // 0.0 to 1.0
  debtToCapitalRatio: number;   // 0.0 to 1.0
  consistencyRate: number;       // 0.0 to 1.0
  winCount: number;
  challengesCompleted: number;
  audienceApprovalPct: number;
  predictedOutcome: PredictionOutcome;
  predictedWinProbability: number; // 0.0 to 1.0
  tags: string[];
}

export interface ChallengeRecord {
  id: string;
  contestantId: string;
  contestantName: string;
  episodeNumber: number;
  challengeType: ChallengeType;
  challengeTitle: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Mastery' | 'Sudden Death';
  timeTakenSec: number;
  allocatedTimeSec: number;
  accuracyScore: number;
  riskScore: number;
  consistencyScore: number;
  timeEfficiencyScore: number;
  overallMoneyIQ: number;
  simulatedReturnPct: number;
  benchmarkReturnPct: number;
  alphaGeneratedPct: number;
  audienceVoteSharePct: number;
  result: 'SUCCESS' | 'QUALIFIED' | 'FAILED_ELIMINATION';
  timestamp: string;
  shapExplanation: ShapFeatureContribution[];
}

export interface ShapFeatureContribution {
  featureName: string;
  featureKey: string;
  actualValue: number;
  contribution: number; // Positive = boosted score/prediction, Negative = lowered score
  description: string;
}

export interface SimulatorChallengeConfig {
  id: ChallengeType;
  title: string;
  subtitle: string;
  description: string;
  episode: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Mastery' | 'Sudden Death';
  totalCapitalINR: number;
  timeLimitSec: number;
  marketCondition: 'Bull Market Rally' | 'Volatile Stagflation' | 'Liquidity Freeze' | 'Interest Rate Spike';
  marketShockEvent?: {
    name: string;
    description: string;
    impactEquityPct: number;
    impactDebtPct: number;
    impactGoldPct: number;
    cashDeductionINR: number;
  };
}

export interface UserChallengeSubmission {
  challengeType: ChallengeType;
  equityAllocationPct: number;
  debtAllocationPct: number;
  goldAllocationPct: number;
  cashAllocationPct: number;
  alternativeAllocationPct: number;
  timeSpentSec: number;
  hedgedRatioPct: number;
  emergencyBufferINR: number;
  usedShockMitigation: boolean;
}

export interface ClusterCentroid {
  cluster: BehavioralCluster;
  name: string;
  tagline: string;
  description: string;
  color: string;
  riskTolerance: number;
  decisionSpeed: number;
  emergencyBuffer: number;
  consistency: number;
  count: number;
  avgScore: number;
}

export interface ModelMetrics {
  modelName: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  rocAuc: number;
  cvScoreMean: number;
  cvScoreStd: number;
  confusionMatrix: {
    truePositive: number;
    falsePositive: number;
    trueNegative: number;
    falseNegative: number;
  };
  featureImportance: { feature: string; importance: number }[];
}

export interface AudienceSentiment {
  episode: number;
  totalVotes: number;
  positiveSentimentPct: number;
  neutralSentimentPct: number;
  controversialSentimentPct: number;
  tvtRating: number; // Television Viewership in Millions
  trendingContestantId: string;
  topMoment: string;
}

export interface ChallengeRecommendation {
  contestantId: string;
  contestantName: string;
  recommendedChallenge: ChallengeType;
  reason: string;
  targetSkill: string;
  expectedDifficulty: 'Beginner' | 'Intermediate' | 'Mastery' | 'Sudden Death';
  improvementPotential: number; // percentage points
}
