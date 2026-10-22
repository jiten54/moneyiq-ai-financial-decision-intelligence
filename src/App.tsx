/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * MoneyIQ AI - Financial Decision Intelligence & Behavioral Scoring Platform
 * Tailored for India's Future Investors (IFI) Reality Show
 */

import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar, NavTab } from './components/Sidebar';
import { DashboardView } from './components/views/DashboardView';
import { SimulatorView } from './components/views/SimulatorView';
import { ScoringExplainabilityView } from './components/views/ScoringExplainabilityView';
import { BehavioralClusteringView } from './components/views/BehavioralClusteringView';
import { ModelEvaluationView } from './components/views/ModelEvaluationView';
import { LeaderboardView } from './components/views/LeaderboardView';
import { AudienceAnalyticsView } from './components/views/AudienceAnalyticsView';
import { RecommendationView } from './components/views/RecommendationView';
import { DatasetManagerView } from './components/views/DatasetManagerView';
import { ReportGeneratorView } from './components/views/ReportGeneratorView';
import { DocumentationView } from './components/views/DocumentationView';
import { ContestantDetailModal } from './components/ContestantDetailModal';
import { 
  INITIAL_CONTESTANTS, 
  HISTORICAL_CHALLENGES, 
  EPISODE_AUDIENCE_METRICS 
} from './data/syntheticDataset';
import { DEFAULT_WEIGHTS } from './ml/scoringEngine';
import { ScoringWeights, ContestantProfile, ChallengeRecord, ChallengeType } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('DASHBOARD');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [activeEpisode, setActiveEpisode] = useState<number | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [weights, setWeights] = useState<ScoringWeights>(DEFAULT_WEIGHTS);
  
  // App dataset states
  const [contestantsData, setContestantsData] = useState<ContestantProfile[]>(INITIAL_CONTESTANTS);
  const [challengesData, setChallengesData] = useState<ChallengeRecord[]>(HISTORICAL_CHALLENGES);
  
  // Modal State
  const [selectedContestantModal, setSelectedContestantModal] = useState<ContestantProfile | null>(null);

  // Dynamically recalculate scores if weights change
  const processedContestants = useMemo(() => {
    const totalW = weights.accuracyWeight + weights.riskManagementWeight + 
                   weights.consistencyWeight + weights.timeEfficiencyWeight;
    
    return contestantsData.map(c => {
      // Re-evaluate composite MoneyIQ score with current custom weights
      const riskScore = Math.round((1 - c.debtToCapitalRatio) * 60 + c.emergencyBufferRatio * 40);
      const timeScore = c.avgDecisionTimeSec >= 15 && c.avgDecisionTimeSec <= 35 ? 95 : 75;
      
      const weighted = (
        (c.accuracyMean * weights.accuracyWeight) +
        (riskScore * weights.riskManagementWeight) +
        ((c.consistencyRate * 100) * weights.consistencyWeight) +
        (timeScore * weights.timeEfficiencyWeight)
      ) / totalW;

      return {
        ...c,
        historicalMoneyIQ: Math.round(weighted),
      };
    });
  }, [contestantsData, weights]);

  // Filter contestants by active episode if selected
  const episodeFilteredContestants = useMemo(() => {
    if (activeEpisode === 'ALL') return processedContestants;
    return processedContestants.filter(c => c.episodesActive.includes(activeEpisode));
  }, [processedContestants, activeEpisode]);

  const handleResetData = () => {
    setContestantsData(INITIAL_CONTESTANTS);
    setChallengesData(HISTORICAL_CHALLENGES);
    setWeights(DEFAULT_WEIGHTS);
  };

  const handleLaunchChallengeInSimulator = (challengeId: ChallengeType) => {
    setActiveTab('SIMULATOR');
  };

  const handleSimulateForContestant = (c: ContestantProfile) => {
    setActiveTab('SIMULATOR');
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        activeEpisode={activeEpisode}
        onSelectEpisode={setActiveEpisode}
        onOpenSimulator={() => setActiveTab('SIMULATOR')}
        onOpenDocs={() => setActiveTab('DOCUMENTATION')}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Container with Sidebar + Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Collapsible Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        {/* Scrollable View Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 custom-scrollbar">
          {activeTab === 'DASHBOARD' && (
            <DashboardView
              contestants={episodeFilteredContestants}
              challengeRecords={challengesData}
              audienceMetrics={EPISODE_AUDIENCE_METRICS}
              onSelectContestant={(c) => setSelectedContestantModal(c)}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'SIMULATOR' && (
            <SimulatorView />
          )}

          {activeTab === 'SCORING_XAI' && (
            <ScoringExplainabilityView
              weights={weights}
              onUpdateWeights={setWeights}
              contestants={processedContestants}
            />
          )}

          {activeTab === 'CLUSTERING' && (
            <BehavioralClusteringView
              contestants={processedContestants}
              onSelectContestant={(c) => setSelectedContestantModal(c)}
            />
          )}

          {activeTab === 'EVALUATION' && (
            <ModelEvaluationView />
          )}

          {activeTab === 'LEADERBOARD' && (
            <LeaderboardView
              contestants={episodeFilteredContestants}
              onSelectContestant={(c) => setSelectedContestantModal(c)}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          )}

          {activeTab === 'AUDIENCE' && (
            <AudienceAnalyticsView
              audienceMetrics={EPISODE_AUDIENCE_METRICS}
              contestants={processedContestants}
            />
          )}

          {activeTab === 'RECOMMENDATIONS' && (
            <RecommendationView
              contestants={processedContestants}
              onLaunchChallengeInSimulator={handleLaunchChallengeInSimulator}
            />
          )}

          {activeTab === 'DATASET' && (
            <DatasetManagerView
              contestants={processedContestants}
              challenges={challengesData}
              onResetDefaultData={handleResetData}
            />
          )}

          {activeTab === 'REPORTS' && (
            <ReportGeneratorView
              contestants={processedContestants}
              challenges={challengesData}
              audienceMetrics={EPISODE_AUDIENCE_METRICS}
            />
          )}

          {activeTab === 'DOCUMENTATION' && (
            <DocumentationView />
          )}
        </main>
      </div>

      {/* Contestant Intelligence Dossier Modal */}
      <ContestantDetailModal
        contestant={selectedContestantModal}
        challenges={challengesData}
        onClose={() => setSelectedContestantModal(null)}
        onSimulateForContestant={handleSimulateForContestant}
      />
    </div>
  );
}
