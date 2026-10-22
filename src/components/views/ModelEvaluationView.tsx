/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * MoneyIQ AI - Model Evaluation & Statistical Benchmarking Suite
 */

import React, { useState } from 'react';
import { 
  LineChart as LineChartIcon, 
  ShieldCheck, 
  BarChart3, 
  HelpCircle, 
  CheckCircle2, 
  Cpu, 
  Scale, 
  SlidersHorizontal,
  Table
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend, 
  ReferenceLine 
} from 'recharts';
import { 
  BENCHMARK_MODELS, 
  ROC_CURVE_DATA, 
  PRECISION_RECALL_DATA 
} from '../../ml/evaluator';

export const ModelEvaluationView: React.FC = () => {
  const [selectedModelIdx, setSelectedModelIdx] = useState<number>(2); // Default to Random Forest
  const currentModel = BENCHMARK_MODELS[selectedModelIdx];

  const cm = currentModel.confusionMatrix;
  const totalPreds = cm.truePositive + cm.falsePositive + cm.trueNegative + cm.falseNegative;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Banner */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30 uppercase font-semibold">
                Rigorous ML Validation
              </span>
              <span className="text-xs text-slate-400">Zero Data Leakage • 5-Fold Cross Validation</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Machine Learning Model Evaluation & Benchmark Comparison
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Empirical assessment of supervised classification models predicting contestant qualification vs elimination. Evaluated on reproducible synthetic IFI holdout data.
            </p>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-400 flex items-center gap-2 shrink-0">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Best ROC-AUC: 0.945 (Gradient Boosting)</span>
          </div>
        </div>
      </div>

      {/* Benchmark Comparison Table */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Table className="w-4 h-4 text-blue-400" />
            <span>Cross-Model Performance Matrix (Baseline vs Supervised Models)</span>
          </h3>
          <span className="text-xs text-slate-400 font-mono">Test Sample N=120</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] font-mono uppercase text-slate-400">
                <th className="py-2.5 px-3">Model Architecture</th>
                <th className="py-2.5 px-3">Accuracy</th>
                <th className="py-2.5 px-3">Precision</th>
                <th className="py-2.5 px-3">Recall</th>
                <th className="py-2.5 px-3">F1-Score</th>
                <th className="py-2.5 px-3">ROC-AUC</th>
                <th className="py-2.5 px-3">5-Fold CV (Mean ± Std)</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {BENCHMARK_MODELS.map((m, idx) => (
                <tr 
                  key={m.modelName} 
                  className={`hover:bg-slate-850/60 transition-colors ${
                    selectedModelIdx === idx ? 'bg-blue-600/10 border-l-2 border-blue-500' : ''
                  }`}
                >
                  <td className="py-3 px-3 font-sans font-medium text-white flex items-center gap-2">
                    {idx === 0 && <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">DUMMY</span>}
                    {idx === 2 && <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 font-bold">ENSEMBLE</span>}
                    {idx === 3 && <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">TOP ROC</span>}
                    <span>{m.modelName}</span>
                  </td>
                  <td className="py-3 px-3 text-slate-200">{(m.accuracy * 100).toFixed(1)}%</td>
                  <td className="py-3 px-3 text-slate-200">{(m.precision * 100).toFixed(1)}%</td>
                  <td className="py-3 px-3 text-slate-200">{(m.recall * 100).toFixed(1)}%</td>
                  <td className="py-3 px-3 text-slate-200">{(m.f1Score * 100).toFixed(1)}%</td>
                  <td className={`py-3 px-3 font-bold ${m.rocAuc >= 0.90 ? 'text-emerald-400' : m.rocAuc >= 0.80 ? 'text-blue-400' : 'text-slate-400'}`}>
                    {m.rocAuc.toFixed(3)}
                  </td>
                  <td className="py-3 px-3 text-slate-300">
                    {(m.cvScoreMean * 100).toFixed(1)}% ± {(m.cvScoreStd * 100).toFixed(1)}%
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => setSelectedModelIdx(idx)}
                      className={`px-2.5 py-1 rounded text-[11px] font-sans font-semibold cursor-pointer transition-all ${
                        selectedModelIdx === idx
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {selectedModelIdx === idx ? 'Selected' : 'Inspect'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Curves: ROC & Precision-Recall */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ROC Curve */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white">Receiver Operating Characteristic (ROC)</h3>
              <p className="text-xs text-slate-400">True Positive Rate vs False Positive Rate across classification thresholds.</p>
            </div>
            <span className="text-xs font-mono text-emerald-400">AUC 0.945</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ROC_CURVE_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="fpr" stroke="#64748b" tick={{ fontSize: 10 }} label={{ value: 'False Positive Rate (1 - Specificity)', position: 'insideBottom', offset: -5, fill: '#64748b', fontSize: 10 }} />
                <YAxis stroke="#64748b" domain={[0, 1.05]} tick={{ fontSize: 10 }} label={{ value: 'True Positive Rate (Sensitivity)', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 10 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.5rem', fontSize: '11px' }}
                />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                <Line type="monotone" dataKey="baseline" stroke="#64748b" strokeDasharray="5 5" name="Dummy Baseline (0.50)" dot={false} />
                <Line type="monotone" dataKey="logistic" stroke="#3b82f6" strokeWidth={2} name="Logistic Reg (0.88)" dot={false} />
                <Line type="monotone" dataKey="randomForest" stroke="#8b5cf6" strokeWidth={2} name="Random Forest (0.93)" dot={false} />
                <Line type="monotone" dataKey="gradientBoost" stroke="#10b981" strokeWidth={2.5} name="Gradient Boost (0.95)" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Precision-Recall Curve */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white">Precision-Recall (PR) Curve</h3>
              <p className="text-xs text-slate-400">Precision stability during class-imbalanced elimination screening.</p>
            </div>
            <span className="text-xs font-mono text-purple-400">PR-AUC 0.92</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={PRECISION_RECALL_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="recall" stroke="#64748b" tick={{ fontSize: 10 }} label={{ value: 'Recall (Sensitivity)', position: 'insideBottom', offset: -5, fill: '#64748b', fontSize: 10 }} />
                <YAxis stroke="#64748b" domain={[0.5, 1.05]} tick={{ fontSize: 10 }} label={{ value: 'Precision', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 10 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.5rem', fontSize: '11px' }}
                />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                <Line type="monotone" dataKey="logistic" stroke="#3b82f6" strokeWidth={2} name="Logistic Reg" dot={false} />
                <Line type="monotone" dataKey="randomForest" stroke="#8b5cf6" strokeWidth={2} name="Random Forest" dot={false} />
                <Line type="monotone" dataKey="gradientBoost" stroke="#10b981" strokeWidth={2.5} name="Gradient Boost" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Confusion Matrix & Feature Importance Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Confusion Matrix (5 Cols) */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white">Confusion Matrix</h3>
              <p className="text-xs text-slate-400">{currentModel.modelName}</p>
            </div>
            <span className="text-xs font-mono text-blue-400">Total N={totalPreds}</span>
          </div>

          {/* 2x2 Matrix Grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            {/* True Positive */}
            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-center">
              <span className="text-[10px] uppercase font-mono text-emerald-400 block mb-1">True Positive (TP)</span>
              <span className="text-3xl font-extrabold font-mono text-white">{cm.truePositive}</span>
              <span className="text-[10px] text-slate-400 block mt-1">Correctly Qualified</span>
            </div>

            {/* False Positive */}
            <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 text-center">
              <span className="text-[10px] uppercase font-mono text-rose-400 block mb-1">False Positive (FP)</span>
              <span className="text-3xl font-extrabold font-mono text-white">{cm.falsePositive}</span>
              <span className="text-[10px] text-slate-400 block mt-1">Type I Error</span>
            </div>

            {/* False Negative */}
            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 text-center">
              <span className="text-[10px] uppercase font-mono text-amber-400 block mb-1">False Negative (FN)</span>
              <span className="text-3xl font-extrabold font-mono text-white">{cm.falseNegative}</span>
              <span className="text-[10px] text-slate-400 block mt-1">Type II Error</span>
            </div>

            {/* True Negative */}
            <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-500/40 text-center">
              <span className="text-[10px] uppercase font-mono text-blue-400 block mb-1">True Negative (TN)</span>
              <span className="text-3xl font-extrabold font-mono text-white">{cm.trueNegative}</span>
              <span className="text-[10px] text-slate-400 block mt-1">Correctly Eliminated</span>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800 flex justify-between font-mono">
            <span>Accuracy: {(currentModel.accuracy * 100).toFixed(1)}%</span>
            <span>Sensitivity: {(currentModel.recall * 100).toFixed(1)}%</span>
            <span>Specificity: {((cm.trueNegative / (cm.trueNegative + cm.falsePositive || 1)) * 100).toFixed(1)}%</span>
          </div>
        </div>

        {/* Feature Importance Rankings (7 Cols) */}
        <div className="lg:col-span-7 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white">Gini Feature Importance / Weight Rankings</h3>
              <p className="text-xs text-slate-400">Relative impact of engineered features on the prediction tree ensemble.</p>
            </div>
            <span className="text-xs font-mono text-blue-400">Normalized Σ=1.0</span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={currentModel.featureImportance} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis type="number" stroke="#64748b" domain={[0, 0.4]} tick={{ fontSize: 10 }} />
                <YAxis dataKey="feature" type="category" stroke="#64748b" tick={{ fontSize: 10 }} width={140} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '0.5rem', fontSize: '11px' }}
                />
                <Bar dataKey="importance" fill="#3b82f6" radius={[0, 4, 4, 0]} name="Gini Importance" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
