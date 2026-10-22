"""
MoneyIQ AI - Python Scoring Engine & Mathematical Formulation
Reproducible scoring functions for India's Future Investors (IFI).
"""

import math
from typing import Dict, Any, List

def calculate_hhi(weights: List[float]) -> float:
    """Calculates Herfindahl-Hirschman Index (HHI) for diversification."""
    total = sum(weights)
    if total <= 0:
        return 1.0
    normalized = [w / total for w in weights]
    return sum(w * w for w in normalized)

def compute_money_iq(
    equity: float,
    debt: float,
    gold: float,
    cash: float,
    alt: float,
    time_spent_sec: float,
    emergency_buffer_inr: float,
    hedged_ratio_pct: float = 0.0,
    shock_mitigation: bool = False,
    custom_weights: Dict[str, float] = None
) -> Dict[str, Any]:
    """
    Computes transparent MoneyIQ score for a contestant decision.
    All asset values are fractions summing to 1.0.
    """
    if custom_weights is None:
        custom_weights = {
            "accuracy": 0.40,
            "risk": 0.25,
            "consistency": 0.20,
            "time": 0.15
        }

    # Simulated return calculation
    exp_return = (equity * 0.145) + (debt * 0.072) + (gold * 0.098) + (cash * 0.045) + (alt * 0.220)
    if not shock_mitigation and (equity + alt > 0.65):
        exp_return -= 0.06
    hedge_bonus = (hedged_ratio_pct / 100.0) * 0.025
    final_return_pct = round((exp_return + hedge_bonus) * 100, 1)

    # 1. Financial Accuracy
    target = 12.0
    err = abs(final_return_pct - target)
    acc_score = int(max(10, min(100, round(100 - (err * 4.5)))))

    # 2. Risk Management
    hhi = calculate_hhi([equity, debt, gold, cash, alt])
    div_score = max(20, min(100, round((1.0 - hhi) * 130)))
    buf_score = min(100, round((emergency_buffer_inr / 150000.0) * 100))
    risk_score = int(round((div_score * 0.45) + (buf_score * 0.35) + (hedged_ratio_pct * 0.20)))

    # 3. Decision Consistency
    ratio = equity / debt if debt > 0 else 3.0
    cons_score = 80
    if 0.5 <= ratio <= 2.0:
        cons_score += 18
    elif ratio > 4.0 or ratio < 0.2:
        cons_score -= 25
    cons_score = int(max(15, min(100, cons_score)))

    # 4. Time Efficiency
    time_score = 85
    if time_spent_sec < 10:
        time_score = 55
    elif 15 <= time_spent_sec <= 35:
        time_score = 96
    elif time_spent_sec > 50:
        time_score = max(30, int(round(90 - (time_spent_sec - 50) * 3)))

    # Deductions
    over_lev = int(round((equity + alt - 0.80) * 100)) if (equity + alt > 0.80) else 0
    illiquid = 15 if (cash < 0.08 and emergency_buffer_inr < 50000) else 0
    panic = 10 if (time_spent_sec > 55 and (equity > 0.7 or alt > 0.3)) else 0

    risk_score = max(5, risk_score - over_lev - illiquid)
    time_score = max(5, time_score - panic)

    total_w = sum(custom_weights.values())
    raw_iq = (
        (acc_score * custom_weights["accuracy"]) +
        (risk_score * custom_weights["risk"]) +
        (cons_score * custom_weights["consistency"]) +
        (time_score * custom_weights["time"])
    ) / total_w

    money_iq = int(max(10, min(100, round(raw_iq))))

    return {
        "money_iq": money_iq,
        "accuracy_score": acc_score,
        "risk_score": risk_score,
        "consistency_score": cons_score,
        "time_efficiency_score": time_score,
        "simulated_return_pct": final_return_pct,
        "penalties": {
            "over_leverage": over_lev,
            "illiquidity": illiquid,
            "panic": panic
        }
    }
