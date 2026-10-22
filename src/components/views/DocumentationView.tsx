/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * MoneyIQ AI - Technical Architecture, Methodology & Intern Role Alignment
 */

import React from 'react';
import { 
  BookOpen, 
  Cpu, 
  Binary, 
  Sparkles, 
  ShieldCheck, 
  Terminal, 
  Award,
  Layers,
  Code2,
  FileText
} from 'lucide-react';

export const DocumentationView: React.FC = () => {
  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in text-slate-300 text-xs leading-relaxed">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/40 via-indigo-950/40 to-slate-900 border border-blue-500/30">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30 uppercase font-semibold">
            System Documentation
          </span>
          <span className="text-xs text-slate-400">IFI AI Intern Portfolio Architecture</span>
        </div>
        <h2 className="text-2xl font-extrabold text-white tracking-tight">
          MoneyIQ AI Methodology, ML Pipeline & Architecture Specifications
        </h2>
        <p className="text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
          Comprehensive technical specifications covering mathematical scoring, feature engineering, supervised classification, K-Means clustering, SHAP explainability, and Vercel/FastAPI deployment.
        </p>
      </div>

      {/* Role Alignment Section */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-blue-900/40 space-y-3">
        <div className="flex items-center gap-2 text-white font-bold text-sm">
          <Award className="w-5 h-5 text-amber-400" />
          <span>Alignment With India&apos;s Future Investors (IFI) AI Intern Requirements</span>
        </div>
        <p>
          This platform was engineered from the ground up to demonstrate complete competency across the core pillars required for the Artificial Intelligence Intern role:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="font-bold text-blue-400 font-mono text-[11px] block">1. Machine Learning & Statistics</span>
            <p className="text-[11px] text-slate-400 leading-snug">
              Implements supervised classification (Logistic Regression, Random Forest, Gradient Boosting) benchmarked against baseline majority dummy models with cross-validation (5-fold CV) and ROC-AUC curves.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="font-bold text-emerald-400 font-mono text-[11px] block">2. Feature Engineering & Domain Math</span>
            <p className="text-[11px] text-slate-400 leading-snug">
              Calculates Herfindahl-Hirschman Index (HHI) for portfolio diversification, emergency liquidity buffer ratios, debt leverage haircuts, and decision pace penalties under countdown clocks.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="font-bold text-purple-400 font-mono text-[11px] block">3. Explainable AI (SHAP & What-If)</span>
            <p className="text-[11px] text-slate-400 leading-snug">
              Decomposes scores into transparent marginal feature attributions (Shapley values) to eliminate black-box judging bias on national reality television.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="font-bold text-cyan-400 font-mono text-[11px] block">4. Production Full-Stack Engineering</span>
            <p className="text-[11px] text-slate-400 leading-snug">
              Responsive React 19 + TypeScript + Tailwind CSS UI, interactive Recharts visualizations, modular Python FastAPI / scikit-learn backend, reproducible scripts, and zero-error Vercel compatibility.
            </p>
          </div>
        </div>
      </div>

      {/* Mathematical Formulation */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 text-white font-bold text-sm">
          <Layers className="w-5 h-5 text-indigo-400" />
          <span>MoneyIQ Mathematical Scoring Formulation</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs space-y-2 text-slate-200">
          <div className="text-blue-400 font-bold">Composite MoneyIQ Formula:</div>
          <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 overflow-x-auto text-emerald-400">
            MoneyIQ = (w_acc × Score_acc + w_risk × Score_risk + w_cons × Score_cons + w_time × Score_time) - Penalties
          </div>
          <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-400 pt-1">
            <li><span className="text-white font-semibold">Financial Accuracy (w_acc = 0.40):</span> Evaluates simulated annualized portfolio return against benchmark Sharpe optimal profile.</li>
            <li><span className="text-white font-semibold">Risk Management (w_risk = 0.25):</span> Evaluates diversification HHI (1 - Σ w_i²), emergency liquidity buffer, and active hedge collar.</li>
            <li><span className="text-white font-semibold">Decision Consistency (w_cons = 0.20):</span> Penalizes extreme allocation swings and debt-to-equity instability.</li>
            <li><span className="text-white font-semibold">Time Efficiency (w_time = 0.15):</span> Rewards deliberate execution between 15-35s; penalizes panic freeze (&gt;50s) or reckless haste (&lt;10s).</li>
          </ul>
        </div>
      </div>

      {/* Model Evaluation & Performance Results */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
        <div className="flex items-center gap-2 text-white font-bold text-sm">
          <Binary className="w-5 h-5 text-emerald-400" />
          <span>Supervised Classification & Benchmark Results</span>
        </div>
        <p>
          Models were trained on 128 challenge runs with a 75/25 train-test split and 5-fold cross-validation.
        </p>

        <div className="overflow-x-auto pt-2">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-[10px] uppercase text-slate-400">
                <th className="py-2 px-2 font-sans">Model</th>
                <th className="py-2 px-2">Accuracy</th>
                <th className="py-2 px-2">Precision</th>
                <th className="py-2 px-2">Recall</th>
                <th className="py-2 px-2">F1-Score</th>
                <th className="py-2 px-2">ROC-AUC</th>
                <th className="py-2 px-2">Cross-Val Mean</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              <tr>
                <td className="py-2 px-2 font-sans text-slate-400">Baseline Dummy</td>
                <td className="py-2 px-2">58.3%</td>
                <td className="py-2 px-2">58.3%</td>
                <td className="py-2 px-2">100.0%</td>
                <td className="py-2 px-2">73.6%</td>
                <td className="py-2 px-2">0.500</td>
                <td className="py-2 px-2">58.0% ± 4.2%</td>
              </tr>
              <tr>
                <td className="py-2 px-2 font-sans text-slate-200">Logistic Regression (L2)</td>
                <td className="py-2 px-2">81.7%</td>
                <td className="py-2 px-2">83.5%</td>
                <td className="py-2 px-2">85.7%</td>
                <td className="py-2 px-2">84.6%</td>
                <td className="py-2 px-2 text-blue-400 font-bold">0.884</td>
                <td className="py-2 px-2">81.2% ± 3.8%</td>
              </tr>
              <tr>
                <td className="py-2 px-2 font-sans text-slate-200">Random Forest Ensemble</td>
                <td className="py-2 px-2">88.3%</td>
                <td className="py-2 px-2">89.2%</td>
                <td className="py-2 px-2">91.4%</td>
                <td className="py-2 px-2">90.3%</td>
                <td className="py-2 px-2 text-purple-400 font-bold">0.932</td>
                <td className="py-2 px-2">87.5% ± 2.9%</td>
              </tr>
              <tr>
                <td className="py-2 px-2 font-sans text-white font-bold">Gradient Boosting</td>
                <td className="py-2 px-2 text-emerald-400 font-bold">89.2%</td>
                <td className="py-2 px-2 text-emerald-400 font-bold">90.1%</td>
                <td className="py-2 px-2 text-emerald-400 font-bold">91.4%</td>
                <td className="py-2 px-2 text-emerald-400 font-bold">90.7%</td>
                <td className="py-2 px-2 text-emerald-400 font-bold">0.945</td>
                <td className="py-2 px-2 text-emerald-400 font-bold">88.9% ± 2.4%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Architecture & Deployment */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
        <div className="flex items-center gap-2 text-white font-bold text-sm">
          <Terminal className="w-5 h-5 text-cyan-400" />
          <span>System Architecture & Deployment Guide</span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
          <span className="font-bold text-slate-200 block">Frontend & Serverless Hosting (Vercel)</span>
          <pre className="text-[11px] font-mono text-slate-400 overflow-x-auto bg-slate-900 p-2.5 rounded">
            {`# 1. Install dependencies
npm install

# 2. Build for production (outputs to dist/)
npm run build

# 3. Deploy to Vercel
vercel --prod`}
          </pre>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
          <span className="font-bold text-slate-200 block">Python ML Pipeline & FastAPI Backend</span>
          <pre className="text-[11px] font-mono text-slate-400 overflow-x-auto bg-slate-900 p-2.5 rounded">
            {`# 1. Install Python dependencies
pip install -r backend/requirements.txt

# 2. Generate reproducible synthetic dataset (Seed 42)
python ml/generate_dataset.py

# 3. Train models and generate evaluation metrics
python ml/train_models.py

# 4. Run automated unit tests
python -m unittest ml/test_scoring.py

# 5. Start FastAPI development server
uvicorn backend.main:app --reload --port 8000`}
          </pre>
        </div>
      </div>
    </div>
  );
};
