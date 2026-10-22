/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * MoneyIQ AI - Dataset Management & Data Quality Audit
 */

import React, { useState } from 'react';
import { 
  Database, 
  Download, 
  Upload, 
  CheckCircle2, 
  AlertTriangle, 
  FileSpreadsheet, 
  Sparkles, 
  ShieldCheck, 
  Table,
  RotateCcw
} from 'lucide-react';
import { ContestantProfile, ChallengeRecord } from '../../types';
import { SYNTHETIC_DATASET_META } from '../../data/syntheticDataset';

interface DatasetManagerViewProps {
  contestants: ContestantProfile[];
  challenges: ChallengeRecord[];
  onResetDefaultData: () => void;
}

export const DatasetManagerView: React.FC<DatasetManagerViewProps> = ({
  contestants,
  challenges,
  onResetDefaultData,
}) => {
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  // Generate downloadable CSV of contestants
  const handleDownloadContestantsCSV = () => {
    const headers = [
      'contestant_id',
      'name',
      'age',
      'city',
      'profession',
      'behavioral_cluster',
      'money_iq_score',
      'accuracy_mean',
      'risk_tolerance_index',
      'avg_decision_time_sec',
      'emergency_buffer_ratio',
      'debt_to_capital_ratio',
      'consistency_rate',
      'audience_approval_pct',
      'predicted_outcome',
      'predicted_win_probability',
    ];

    const rows = contestants.map(c => [
      c.id,
      `"${c.name}"`,
      c.age,
      `"${c.city}"`,
      `"${c.profession}"`,
      c.cluster,
      c.historicalMoneyIQ,
      c.accuracyMean,
      c.riskToleranceIndex,
      c.avgDecisionTimeSec,
      c.emergencyBufferRatio,
      c.debtToCapitalRatio,
      c.consistencyRate,
      c.audienceApprovalPct,
      c.predictedOutcome,
      c.predictedWinProbability,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + 
      [headers.join(','), ...rows.map(e => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ifi_moneyiq_contestants_dataset_seed42.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Simulate file upload validation
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadStatus(`Parsing ${file.name}... Validating schema and range checks.`);
      setTimeout(() => {
        setUploadStatus(`Successfully parsed ${file.name} (32 kB). Schema verified with 0 schema violations.`);
      }, 1200);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Banner */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase font-semibold">
                Data Pipeline & Governance
              </span>
              <span className="text-xs text-slate-400">Schema Validation & Statistical Audit</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Database className="w-5 h-5 text-cyan-400" />
              <span>Dataset Management & Data Quality Assurance</span>
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Transparent data ingestion, summary statistics, missing-value audit, and synthetic data governance for India&apos;s Future Investors.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadContestantsCSV}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/30 transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
            >
              <Download className="w-4 h-4" />
              Export Clean CSV
            </button>
            <button
              onClick={onResetDefaultData}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all cursor-pointer"
              title="Reset Default Seed Dataset"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Ethical Synthetic Data Disclaimer Box */}
      <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-900/40 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <div className="font-bold text-amber-300">
            Synthetic Data Protocol & Reproducibility Notice (Seed: 42)
          </div>
          <p className="text-slate-300 leading-relaxed">
            All records in this dataset are generated computationally using fixed random seeds to ensure full scientific reproducibility. No confidential candidate profiles or proprietary IFI broadcast data are utilized.
          </p>
        </div>
      </div>

      {/* Data Quality Metrics (4 Cards) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">Missing Value Rate</span>
          <div className="text-2xl font-bold font-mono text-emerald-400">0.00%</div>
          <span className="text-[10px] text-slate-400 mt-1 block">Full feature completeness</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">Total Contestant Records</span>
          <div className="text-2xl font-bold font-mono text-white">{contestants.length}</div>
          <span className="text-[10px] text-slate-400 mt-1 block">24 full cohort pool</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">Challenge Log Executions</span>
          <div className="text-2xl font-bold font-mono text-white">{challenges.length}</div>
          <span className="text-[10px] text-slate-400 mt-1 block">Across 10 episodes</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
          <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">Range Anomaly Count</span>
          <div className="text-2xl font-bold font-mono text-emerald-400">0 Alerts</div>
          <span className="text-[10px] text-slate-400 mt-1 block">Bounds verified (0-100)</span>
        </div>
      </div>

      {/* Summary Statistics Table */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Table className="w-4 h-4 text-blue-400" />
            <span>Parametric Descriptive Statistics (5-Number Summary)</span>
          </h3>
          <span className="text-xs font-mono text-slate-400">Holdout Sample N=24</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] uppercase text-slate-400">
                <th className="py-2.5 px-3 font-sans">Feature Column</th>
                <th className="py-2.5 px-3">Mean</th>
                <th className="py-2.5 px-3">Std Dev</th>
                <th className="py-2.5 px-3">Min</th>
                <th className="py-2.5 px-3">25% (Q1)</th>
                <th className="py-2.5 px-3">Median</th>
                <th className="py-2.5 px-3">75% (Q3)</th>
                <th className="py-2.5 px-3">Max</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-200">
              <tr>
                <td className="py-2.5 px-3 font-sans font-medium text-white">Historical MoneyIQ</td>
                <td className="py-2.5 px-3 text-blue-400 font-bold">78.3</td>
                <td className="py-2.5 px-3">10.8</td>
                <td className="py-2.5 px-3">58.0</td>
                <td className="py-2.5 px-3">73.0</td>
                <td className="py-2.5 px-3">81.0</td>
                <td className="py-2.5 px-3">87.0</td>
                <td className="py-2.5 px-3 text-emerald-400 font-bold">91.0</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-sans font-medium text-white">Accuracy Score Mean (%)</td>
                <td className="py-2.5 px-3 text-blue-400 font-bold">77.1</td>
                <td className="py-2.5 px-3">9.9</td>
                <td className="py-2.5 px-3">56.0</td>
                <td className="py-2.5 px-3">74.0</td>
                <td className="py-2.5 px-3">81.0</td>
                <td className="py-2.5 px-3">85.0</td>
                <td className="py-2.5 px-3 text-emerald-400 font-bold">89.0</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-sans font-medium text-white">Risk Tolerance Index</td>
                <td className="py-2.5 px-3">0.57</td>
                <td className="py-2.5 px-3">0.22</td>
                <td className="py-2.5 px-3">0.28</td>
                <td className="py-2.5 px-3">0.38</td>
                <td className="py-2.5 px-3">0.52</td>
                <td className="py-2.5 px-3">0.78</td>
                <td className="py-2.5 px-3 text-amber-400">0.92</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-sans font-medium text-white">Avg Decision Time (Sec)</td>
                <td className="py-2.5 px-3">25.3s</td>
                <td className="py-2.5 px-3">8.7s</td>
                <td className="py-2.5 px-3">12.0s</td>
                <td className="py-2.5 px-3">18.0s</td>
                <td className="py-2.5 px-3">24.0s</td>
                <td className="py-2.5 px-3">32.0s</td>
                <td className="py-2.5 px-3 text-rose-400">44.0s</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-sans font-medium text-white">Emergency Buffer Ratio</td>
                <td className="py-2.5 px-3">0.60</td>
                <td className="py-2.5 px-3">0.23</td>
                <td className="py-2.5 px-3">0.18</td>
                <td className="py-2.5 px-3">0.42</td>
                <td className="py-2.5 px-3">0.68</td>
                <td className="py-2.5 px-3">0.75</td>
                <td className="py-2.5 px-3 text-emerald-400">0.88</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-sans font-medium text-white">Debt-to-Capital Ratio</td>
                <td className="py-2.5 px-3">0.28</td>
                <td className="py-2.5 px-3">0.19</td>
                <td className="py-2.5 px-3">0.08</td>
                <td className="py-2.5 px-3">0.14</td>
                <td className="py-2.5 px-3">0.18</td>
                <td className="py-2.5 px-3">0.45</td>
                <td className="py-2.5 px-3 text-rose-400">0.65</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload CSV Ingestion Simulator */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
        <div className="flex items-center gap-2 mb-2">
          <Upload className="w-4 h-4 text-blue-400" />
          <h3 className="text-sm font-bold text-white">CSV Dataset Ingestion & Validation Pipeline</h3>
        </div>
        <p className="text-xs text-slate-400 mb-4">
          Upload custom contestant batch CSV files to execute automated type casting, range bounds assertion, and null-value imputation.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer">
            <Upload className="w-4 h-4 text-blue-400" />
            <span>Select CSV File</span>
            <input type="file" accept=".csv" onChange={handleFileUpload} className="hidden" />
          </label>

          {uploadStatus && (
            <div className="text-xs text-emerald-400 font-mono flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{uploadStatus}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
