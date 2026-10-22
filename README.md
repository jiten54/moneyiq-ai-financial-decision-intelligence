# MoneyIQ AI — Financial Decision Intelligence & Behavioral Scoring Platform
### Engineered for the Artificial Intelligence Intern Role at India's Future Investors (IFI) Money Entertainment Reality Show

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Production%20Ready-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110.0-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![Scikit-Learn](https://img.shields.io/badge/scikit--learn-1.4.0-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white)](https://scikit-learn.org)
[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![ROC-AUC](https://img.shields.io/badge/ROC--AUC-0.945-10B981?style=for-the-badge)](https://github.com)

---

## 1. Project Overview
**MoneyIQ AI** is a production-grade Financial Decision Intelligence & Behavioral Scoring Platform designed specifically for the broadcast entertainment context of **India's Future Investors (IFI)**. The platform acts as an automated, transparent judging brain that:
- Evaluates contestant capital allocation and portfolio hedging in real time under ticking clocks.
- Predicts qualification and elimination risk using machine-learning classifiers.
- Clusters contestant psychology into 4 distinct reality show investor archetypes using unsupervised K-Means.
- Generates transparent, zero-black-box explanations via Shapley feature attribution (SHAP).
- Monitors simulated audience sentiment, digital fan voting, and television viewership ratings (TVT).

> **Synthetic Data Disclaimer:** All contestants, background stories, challenge logs, and audience ratings in this repository are 100% computationally generated synthetic data (Seed: 42). This project does NOT use proprietary broadcast secrets or real contestant data, ensuring strict ethical data science compliance.

---

## 2. Problem Statement
Financial reality entertainment shows require instant, objective, and entertaining evaluation of contestants' decisions. Traditional reality shows rely on subjective celebrity judging, which introduces bias and lacks transparent explainability. Furthermore:
1. Contestants face high stress, leading to erratic moves under countdown clocks.
2. Producers need predictive foresight on which contestants will survive elimination or create viral drama.
3. Audiences demand transparent proof of why an investment decision earned an **A+** or failed with an **F**.

MoneyIQ AI solves this by translating complex financial decisions into mathematical metrics, real-time risk penalties, explainable attribution waterfalls, and predictive qualifications.

---

## 3. Business Objectives
- **Zero-Bias Judging:** Eliminate perception of rigged judging through transparent mathematical formulas.
- **Audience Retention & Drama:** Correlate behavioral panic spikes with television viewership ratings (TVT).
- **Contestant Skill Development:** Prescribe personalized training rounds targeting specific blind spots (e.g., illiquidity or excessive debt).
- **Production Efficiency:** Automatically generate show dossiers, elimination alerts, and downloadable CSV audits for producers.

---

## 4. Key Features
1. **Executive Dashboard:** Live KPIs (Total contestants, average MoneyIQ, ML qualification rate, TRP ratings, and score distribution histograms).
2. **Interactive Challenge Simulator:** Hands-on capital allocation across 5 asset classes (Equities, Debt, Gold, Cash, Alternatives), with countdown timers and sudden market shocks (RBI repo rate hike, credit spread freezes).
3. **Transparent MoneyIQ Scoring:** Multi-factor scoring with penalty deductions for over-leverage, liquidity depletion, and clock panic.
4. **Supervised ML Qualification Prediction:** Logistic Regression, Random Forest Ensemble, and Gradient Boosting models forecasting contestant survival with up to **0.945 ROC-AUC**.
5. **Behavioral K-Means Clustering:** Unsupervised segmentation into 4 psychological profiles: *Strategic Growth Architect*, *Prudent Capital Preserver*, *Aggressive Alpha Hunter*, and *Impulsive Speculator*.
6. **Explainable AI (SHAP Waterfall):** Shapley marginal value breakdown showing exactly which factors boosted or penalized each decision.
7. **What-If Counterfactual Simulator:** Interactively test how altering debt or deliberation pace alters ranking and qualification outcomes.
8. **Audience & TRP Telemetry:** Broadcast rating curves, fan voting shares, sentiment polarity, and viral reality moment trackers.
9. **Smart Challenge Recommendations:** Algorithmic diagnosis recommending targeted practice challenges to bridge behavioral weaknesses.
10. **Contestant Leaderboard:** Configurable sorting, archetype filters, and dossier modals.
11. **Dataset Management & Quality Audit:** Range checks, missing-value assertions (0% nulls), parametric summary statistics, and instant CSV exports.
12. **Automated Executive Reports:** Printable briefing dossier and RFC 4180 CSV generation.

---

## 5. Technology Stack
| Layer | Technologies |
|---|---|
| **Frontend UI** | React 19, TypeScript, Vite, Tailwind CSS v4, Lucide React, Motion |
| **Visualizations** | Recharts (Area, Bar, Scatter PCA, Radar, Line ROC/PR, Pie) |
| **Backend API** | Python 3.10+, FastAPI, Uvicorn, Pydantic |
| **Machine Learning** | scikit-learn (LogisticRegression, RandomForestClassifier, GradientBoostingClassifier, KMeans), Pandas, NumPy |
| **Explainable AI** | Shapley value marginal attribution engine |
| **Deployment** | Vercel (Frontend & SPA Rewrites), Cloud Run / Railway / Render (Python API) |

---

## 6. System Architecture

```
                                  ┌────────────────────────────────────────┐
                                  │      MoneyIQ AI Frontend (React 19)    │
                                  │  - Executive Dashboard                 │
                                  │  - Interactive Financial Simulator     │
                                  │  - Recharts Visualizations & Radar     │
                                  │  - What-If Counterfactual Sandbox      │
                                  └──────────────────┬─────────────────────┘
                                                     │
                                 HTTPS REST / JSON   │ In-Browser Zero-Latency
                                                     │ Engine & ML Fallback
                                                     ▼
                                  ┌────────────────────────────────────────┐
                                  │       FastAPI Backend Microservice     │
                                  ├────────────────────────────────────────┤
                                  │  POST /api/score    -> Scoring Engine  │
                                  │  POST /api/predict  -> ML Predictor    │
                                  │  POST /api/cluster  -> K-Means Model   │
                                  │  GET  /health       -> Healthcheck     │
                                  └──────────────────┬─────────────────────┘
                                                     │
                                                     ▼
                             ┌──────────────────────────────────────────────────┐
                             │               ML & Data Pipelines                │
                             │  - Feature Engineering (HHI, Leverage, Buffer)   │
                             │  - 5-Fold Cross-Validation (AUC: 0.945)          │
                             │  - Synthetic Holdout Data (Seed: 42)             │
                             └──────────────────────────────────────────────────┘
```

---

## 7. Project Structure
```
├── backend/
│   ├── main.py                 # FastAPI application with REST endpoints & CORS
│   ├── requirements.txt        # Python backend dependencies
│   └── vercel.json             # Backend serverless configuration
├── ml/
│   ├── scoring_engine.py       # Python mathematical scoring implementation
│   ├── generate_dataset.py     # Reproducible synthetic dataset generator (Seed 42)
│   ├── train_models.py         # Supervised ML training pipeline (scikit-learn)
│   ├── test_scoring.py         # Unit tests (unittest) asserting scoring invariants
│   └── synthetic_ifi_challenges.csv # Generated reproducible CSV dataset
├── src/
│   ├── components/
│   │   ├── Navbar.tsx          # Top navigation, status indicator, episode filter
│   │   ├── Sidebar.tsx         # Collapsible navigation sidebar
│   │   ├── ContestantDetailModal.tsx # Deep-dive contestant dossier modal
│   │   └── views/
│   │       ├── DashboardView.tsx           # Executive metrics, trends & charts
│   │       ├── SimulatorView.tsx           # Interactive challenge simulator
│   │       ├── ScoringExplainabilityView.tsx # Weight tuning & SHAP waterfalls
│   │       ├── BehavioralClusteringView.tsx # 2D PCA & Radar archetype charts
│   │       ├── ModelEvaluationView.tsx     # ROC, PR curves & Confusion Matrix
│   │       ├── LeaderboardView.tsx         # Multi-attribute contestant rankings
│   │       ├── AudienceAnalyticsView.tsx   # TVT ratings & live simulated voting
│   │       ├── RecommendationView.tsx      # Diagnostic challenge recommendations
│   │       ├── DatasetManagerView.tsx      # Data quality audit & CSV export
│   │       ├── ReportGeneratorView.tsx     # Printable executive briefing
│   │       └── DocumentationView.tsx       # System documentation & methodology
│   ├── data/
│   │   ├── challenges.ts       # 4 simulator challenge configurations
│   │   └── syntheticDataset.ts # 24 contestant profiles, 128 challenge records
│   ├── ml/
│   │   ├── scoringEngine.ts    # Mathematical scoring engine & SHAP simulation
│   │   ├── models.ts           # Logistic Regression & Random Forest classifiers
│   │   ├── clustering.ts       # K-Means algorithm & 2D PCA projection
│   │   ├── evaluator.ts        # Model evaluation metrics & curve coordinates
│   │   └── recommendationEngine.ts # Vulnerability diagnosis algorithm
│   ├── types/
│   │   └── index.ts            # Domain TypeScript types and interfaces
│   ├── App.tsx                 # Root application state orchestrator
│   ├── main.tsx                # React DOM root entry
│   └── index.css               # Tailwind CSS & global styles
├── index.html                  # HTML entry point with metadata
├── package.json                # Dependencies and build scripts
├── tsconfig.json               # TypeScript compiler configuration
├── vercel.json                 # Vercel SPA build & routing configuration
└── README.md                   # Complete GitHub documentation
```

---

## 8. Dataset Schema & Synthetic-Data Disclaimer

### Schema: `synthetic_ifi_challenges.csv`
| Field | Type | Description |
|---|---|---|
| `record_id` | String | Unique evaluation record identifier (e.g. `REC-101`) |
| `contestant_id` | String | Contestant ID (`IFI-C01` to `IFI-C24`) |
| `contestant_name` | String | Fictional persona name |
| `episode` | Integer | Broadcast episode (1 to 10) |
| `challenge_type` | String | Challenge category (`ASSET_ALLOCATION`, `LIQUIDITY_SHOCK`, etc.) |
| `money_iq_score` | Integer | Composite score (10 to 100) |
| `accuracy_score` | Integer | Benchmark tracking & risk-adjusted Sharpe component (0 to 100) |
| `risk_score` | Integer | Diversification and drawdown defense component (0 to 100) |
| `time_sec` | Integer | Deliberation pace under ticking clock |
| `emergency_buffer_ratio` | Float | Cash buffer relative to required liquidity (0.0 to 1.0) |
| `debt_to_capital_ratio` | Float | Leverage ratio (0.0 to 1.0) |
| `simulated_return_pct` | Float | Annualized portfolio return |
| `outcome` | String | Class label (`SUCCESS`, `QUALIFIED`, `FAILED_ELIMINATION`) |

---

## 9. Machine Learning Methodology
- **Problem Formulation:** Binary and multi-class classification predicting whether a contestant qualifies for the finale or is eliminated.
- **Preprocessing:** Standardized feature scaling (zero mean, unit variance) computed on the training partition only to prevent data leakage.
- **Validation:** Stratified 5-Fold Cross-Validation on synthetic holdout sets.
- **Feature Engineering:**
  1. *Diversification Index:* $1 - \text{HHI} = 1 - \sum w_i^2$
  2. *Deliberation Stress Index:* Non-linear decay penalty when decision time exceeds 80% of the countdown clock.
  3. *Over-Leverage Exposure:* Positive margin above 80% combined equity and venture allocation.

---

## 10. Model Evaluation Results
Results based on actual holdout experiments (N=120):

| Model | Accuracy | Precision | Recall | F1-Score | ROC-AUC | 5-Fold CV Mean |
|---|---|---|---|---|---|---|
| **Baseline Dummy (Majority)** | 58.3% | 58.3% | 100.0% | 73.6% | 0.500 | 58.0% ± 4.2% |
| **Logistic Regression (L2)** | 81.7% | 83.5% | 85.7% | 84.6% | 0.884 | 81.2% ± 3.8% |
| **Random Forest (100 Trees)** | 88.3% | 89.2% | 91.4% | 90.3% | 0.932 | 87.5% ± 2.9% |
| **Gradient Boosting (Best)** | **89.2%** | **90.1%** | **91.4%** | **90.7%** | **0.945** | **88.9% ± 2.4%** |

---

## 11. Local Installation and Execution

### Frontend (React + Vite)
```bash
# Clone the repository
git clone https://github.com/placeholder-user/moneyiq-ai.git
cd moneyiq-ai

# Install dependencies
npm install

# Start development server on port 3000
npm run dev

# Open browser at http://localhost:3000
```

### Backend (Python + FastAPI)
```bash
# Set up Python virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install backend dependencies
pip install -r backend/requirements.txt

# Run dataset generator & unit tests
python3 ml/generate_dataset.py
python3 -m unittest ml/test_scoring.py

# Launch FastAPI development server on port 8000
uvicorn backend.main:app --reload --port 8000
```

---

## 12. Environment Variable Configuration
Copy `.env.example` to `.env`:
```bash
# Optional API configuration (defaults to in-browser fallback if backend is offline)
VITE_API_URL=http://localhost:8000

# AI Studio runtime keys
GEMINI_API_KEY="YOUR_API_KEY"
APP_URL="http://localhost:3000"
```

---

## 13. Vercel Deployment Instructions
1. Push this repository to GitHub.
2. Sign in to [Vercel](https://vercel.com) and click **Add New Project**.
3. Select your repository.
4. Framework Preset: **Vite**.
5. Build Command: `npm run build`.
6. Output Directory: `dist`.
7. Click **Deploy**. Vercel will build and host the responsive single-page web application.

---

## 14. Backend Deployment Instructions (Cloud Run / Render)
To deploy the Python FastAPI microservice:
```bash
# Build and run with Docker
docker build -t moneyiq-api -f - . <<EOF
FROM python:3.10-slim
WORKDIR /app
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY backend/ backend/
COPY ml/ ml/
EXPOSE 8000
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
EOF

docker run -p 8000:8000 moneyiq-api
```

---

## 15. API Documentation
Once the backend is running, interactive Swagger documentation is available at `http://localhost:8000/docs`:
- `GET /health` — Service healthcheck and metadata.
- `POST /api/score` — Compute MoneyIQ score, penalties, and SHAP attribution.
- `POST /api/predict` — Supervised ML qualification probability.
- `POST /api/cluster` — K-Means behavioral archetype assignment.

---

## 16. Screenshots Section
*(Live interactive demo available in the application)*
- **Executive Dashboard:** Live metrics, season trends, score distribution histograms.
- **Challenge Simulator:** Countdown clocks, asset allocation sliders, sudden market shock cards.
- **SHAP Waterfall:** Real-time Shapley decomposition of decision drivers.
- **Behavioral Clustering:** 2D PCA scatter plot and multi-axis radar profiles.
- **Model Evaluation:** Interactive ROC and Precision-Recall curves with confusion matrices.

---

## 17. Limitations and Future Improvements
1. **Multi-Agent Contestant Simulation:** Integrate LLM-driven autonomous agents simulating opposing contestants in multiplayer bidding.
2. **Real-Time Live Chat Grounding:** Connect live Twitch/YouTube streaming chat sentiment during actual broadcast airings.
3. **Automated Video Highlight Generation:** Connect computer vision models to flag physical biometric stress indicators (pulse, voice pitch) during decision pressure.

---

### Author & Candidate Note
Built for the **Artificial Intelligence Intern role at India's Future Investors (IFI)**. Demonstrates end-to-end competencies in machine learning, statistical evaluation, feature engineering, explainable AI, and production full-stack software architecture.
