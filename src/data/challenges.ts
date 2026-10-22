/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * MoneyIQ AI - Interactive Challenge Scenarios
 * Recreates high-stakes financial game rounds from India's Future Investors (IFI).
 */

import { SimulatorChallengeConfig } from '../types';

export const SIMULATOR_CHALLENGES: SimulatorChallengeConfig[] = [
  {
    id: 'ASSET_ALLOCATION',
    title: 'Round 1: Multi-Asset Macro Frontier',
    subtitle: 'Optimize risk-adjusted Sharpe ratio across 5 asset classes under shifting yield curves.',
    description: 'You are granted ₹1,00,00,000 (1 Crore INR) virtual capital. Build an all-weather portfolio spanning Indian Equities (Nifty 50), Government Debt (10Y G-Sec), Sovereign Gold, Cash Reserves, and Venture Alternatives. Face unexpected macroeconomic inflation spikes.',
    episode: 1,
    difficulty: 'Intermediate',
    totalCapitalINR: 10000000,
    timeLimitSec: 45,
    marketCondition: 'Volatile Stagflation',
    marketShockEvent: {
      name: 'RBI Surprise Repo Rate Hike (+50 bps)',
      description: 'Bond yields jump 35 bps, triggering temporary equity contraction and gold rally.',
      impactEquityPct: -4.5,
      impactDebtPct: -1.8,
      impactGoldPct: 3.2,
      cashDeductionINR: 0,
    },
  },
  {
    id: 'LIQUIDITY_SHOCK',
    title: 'Round 2: The Black Swan Liquidity Freeze',
    subtitle: 'Defend capital against a sudden cash crunch and sudden corporate insolvency.',
    description: 'A Tier-1 financial institution halts debt redemptions while an unexpected ₹15,00,000 emergency capital call hits. Manage your emergency cash buffer, deploy liquidity hedges, and prevent fire-sale liquidation of core equities.',
    episode: 4,
    difficulty: 'Mastery',
    totalCapitalINR: 15000000,
    timeLimitSec: 35,
    marketCondition: 'Liquidity Freeze',
    marketShockEvent: {
      name: 'Credit Spread Blowout & Emergency Margin Call',
      description: 'Illiquid credit lines freeze; unhedged players face forced asset liquidation.',
      impactEquityPct: -8.0,
      impactDebtPct: -5.5,
      impactGoldPct: 1.5,
      cashDeductionINR: 1500000,
    },
  },
  {
    id: 'STARTUP_VALUATION',
    title: 'Round 3: High-Stakes Angel Pitch Arena',
    subtitle: 'Evaluate seed-stage term sheets, calculate burn runways, and avoid down-round dilution.',
    description: 'Contestants are pitched 3 fast-growing Indian D2C and FinTech startups. Allocate growth capital between high-risk pre-revenue convertibles and defensive sovereign assets under strict valuation multiple checks.',
    episode: 6,
    difficulty: 'Intermediate',
    totalCapitalINR: 8000000,
    timeLimitSec: 50,
    marketCondition: 'Bull Market Rally',
    marketShockEvent: {
      name: 'Tech Multiple Compression & Valuation Reset',
      description: 'Global tech valuation benchmark contracts by 15%, favoring disciplined unit economics.',
      impactEquityPct: -3.0,
      impactDebtPct: 0.5,
      impactGoldPct: 0.0,
      cashDeductionINR: 500000,
    },
  },
  {
    id: 'DERIVATIVES_HEDGING',
    title: 'Round 4: Sudden Death Derivatives Defense',
    subtitle: 'IFI Championship Finale: Balance exponential upside leverage against zero-rupee wipeout.',
    description: 'Championship round where contestants must hedge extreme volatility index (India VIX > 28) using index puts and covered collar strategies while maintaining capital adequacy.',
    episode: 9,
    difficulty: 'Sudden Death',
    totalCapitalINR: 25000000,
    timeLimitSec: 30,
    marketCondition: 'Interest Rate Spike',
    marketShockEvent: {
      name: 'VIX Explosion & Gap-Down Opening (-3.2%)',
      description: 'Nifty gaps down 650 points overnight. Unhedged portfolios suffer instant catastrophic drawdowns.',
      impactEquityPct: -11.5,
      impactDebtPct: -2.0,
      impactGoldPct: 4.8,
      cashDeductionINR: 2000000,
    },
  },
];
