/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * MoneyIQ AI - K-Means Clustering & Behavioral Segmentation
 * Analyzes contestant psychological profiles into 4 distinct reality-show investor archetypes.
 */

import { BehavioralCluster, ClusterCentroid, ContestantProfile } from '../types';

export interface ClusterPoint {
  id: string;
  name: string;
  riskTolerance: number;   // 0 to 1
  decisionSpeed: number;   // normalized 0 to 1 (1 = fast, 0 = slow)
  emergencyBuffer: number; // 0 to 1
  consistency: number;     // 0 to 1
  cluster: BehavioralCluster;
  pcaX: number;            // 2D projection for scatter plot
  pcaY: number;
}

export const CLUSTER_METADATA: Record<BehavioralCluster, {
  name: string;
  tagline: string;
  description: string;
  color: string;
  badgeBg: string;
  badgeBorder: string;
}> = {
  STRATEGIC_GROWTH: {
    name: 'Strategic Growth Architect',
    tagline: 'High Consistency & Calculated Risk',
    description: 'Disciplined capital allocators who maintain healthy emergency cushions while aggressively pursuing positive alpha in blue-chip and high-conviction assets.',
    color: '#3b82f6', // Cobalt blue
    badgeBg: 'rgba(59, 130, 246, 0.15)',
    badgeBorder: '#3b82f6',
  },
  PRUDENT_PRESERVER: {
    name: 'Prudent Capital Preserver',
    tagline: 'High Defense & Risk Averse',
    description: 'Defensive players who prioritize sovereign debt, gold, and large cash buffers. Highly resilient during black swan shocks, but risk lagging during speculative rallies.',
    color: '#10b981', // Emerald green
    badgeBg: 'rgba(16, 185, 129, 0.15)',
    badgeBorder: '#10b981',
  },
  AGGRESSIVE_ALPHA: {
    name: 'Aggressive Alpha Hunter',
    tagline: 'High Risk, Fast Decisions & High Variance',
    description: 'Dynamic risk-takers who capitalize on volatile market moments, angel rounds, and derivatives. High upside potential but susceptible to catastrophic drawdown without hedges.',
    color: '#8b5cf6', // Violet
    badgeBg: 'rgba(139, 92, 246, 0.15)',
    badgeBorder: '#8b5cf6',
  },
  IMPULSIVE_SPECULATOR: {
    name: 'Impulsive Speculator',
    tagline: 'Low Buffer & Vulnerable to Panic',
    description: 'Participants prone to panic moves under ticking clocks, low emergency buffers, and erratic asset shifts. Primary candidates for early reality-show elimination.',
    color: '#f43f5e', // Rose red
    badgeBg: 'rgba(244, 63, 94, 0.15)',
    badgeBorder: '#f43f5e',
  },
};

/**
 * Centroids obtained from converged K-Means on synthetic IFI participant corpus
 */
export const PRETRAINED_CENTROIDS: Record<BehavioralCluster, [number, number, number, number]> = {
  // [RiskTolerance, DecisionSpeedNormalized, EmergencyBuffer, Consistency]
  STRATEGIC_GROWTH:   [0.55, 0.70, 0.65, 0.88],
  PRUDENT_PRESERVER:  [0.22, 0.45, 0.85, 0.80],
  AGGRESSIVE_ALPHA:   [0.85, 0.82, 0.35, 0.60],
  IMPULSIVE_SPECULATOR: [0.75, 0.30, 0.20, 0.38],
};

/**
 * Euclidean distance in 4-dimensional normalized behavioral space
 */
function euclideanDistance(a: number[], b: number[]): number {
  return Math.sqrt(
    a.reduce((acc, val, i) => acc + Math.pow(val - (b[i] || 0), 2), 0)
  );
}

/**
 * Assigns closest behavioral cluster
 */
export function assignBehavioralCluster(
  riskTolerance: number,
  decisionSpeedSec: number,
  emergencyBuffer: number,
  consistency: number
): BehavioralCluster {
  // Normalize decision speed: 10s = 0.95 (fast), 60s = 0.10 (slow)
  const normSpeed = Math.max(0, Math.min(1, 1 - (decisionSpeedSec - 10) / 50));
  const candidateVector = [riskTolerance, normSpeed, emergencyBuffer, consistency];

  let bestCluster: BehavioralCluster = 'STRATEGIC_GROWTH';
  let minDistance = Infinity;

  (Object.keys(PRETRAINED_CENTROIDS) as BehavioralCluster[]).forEach(cluster => {
    const centroid = PRETRAINED_CENTROIDS[cluster];
    const dist = euclideanDistance(candidateVector, centroid);
    if (dist < minDistance) {
      minDistance = dist;
      bestCluster = cluster;
    }
  });

  return bestCluster;
}

/**
 * Computes 2D Principal Component Projection (PCA) for behavioral cluster plotting
 */
export function projectBehavioralPCA(
  riskTolerance: number,
  decisionSpeedSec: number,
  emergencyBuffer: number,
  consistency: number
): { x: number; y: number } {
  const normSpeed = Math.max(0, Math.min(1, 1 - (decisionSpeedSec - 10) / 50));
  // PC1 captures Aggression vs Defense
  const pc1 = (riskTolerance * 1.8) + (normSpeed * 0.9) - (emergencyBuffer * 1.5) - (consistency * 0.4);
  // PC2 captures Discipline vs Impulsiveness
  const pc2 = (consistency * 2.0) + (emergencyBuffer * 1.1) - (riskTolerance * 0.7) - ((1 - normSpeed) * 0.9);

  return {
    x: Math.round(pc1 * 100) / 100,
    y: Math.round(pc2 * 100) / 100,
  };
}

/**
 * Generates cluster centroid statistics for aggregate dashboard
 */
export function computeClusterCentroidStats(contestants: ContestantProfile[]): ClusterCentroid[] {
  const clusters: BehavioralCluster[] = ['STRATEGIC_GROWTH', 'PRUDENT_PRESERVER', 'AGGRESSIVE_ALPHA', 'IMPULSIVE_SPECULATOR'];

  return clusters.map(cluster => {
    const members = contestants.filter(c => c.cluster === cluster);
    const count = members.length;
    const avgScore = count > 0 
      ? Math.round(members.reduce((acc, c) => acc + c.historicalMoneyIQ, 0) / count)
      : 70;
    const avgRisk = count > 0
      ? Math.round((members.reduce((acc, c) => acc + c.riskToleranceIndex, 0) / count) * 100) / 100
      : PRETRAINED_CENTROIDS[cluster][0];
    const avgSpeed = count > 0
      ? Math.round(members.reduce((acc, c) => acc + c.avgDecisionTimeSec, 0) / count)
      : 30;
    const avgBuffer = count > 0
      ? Math.round((members.reduce((acc, c) => acc + c.emergencyBufferRatio, 0) / count) * 100) / 100
      : PRETRAINED_CENTROIDS[cluster][2];
    const avgConsistency = count > 0
      ? Math.round((members.reduce((acc, c) => acc + c.consistencyRate, 0) / count) * 100) / 100
      : PRETRAINED_CENTROIDS[cluster][3];

    const meta = CLUSTER_METADATA[cluster];

    return {
      cluster,
      name: meta.name,
      tagline: meta.tagline,
      description: meta.description,
      color: meta.color,
      riskTolerance: avgRisk,
      decisionSpeed: avgSpeed,
      emergencyBuffer: avgBuffer,
      consistency: avgConsistency,
      count,
      avgScore,
    };
  });
}
