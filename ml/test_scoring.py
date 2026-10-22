"""
MoneyIQ AI - Unit Test Suite for Scoring Calculations & Mathematical Invariants
Can be executed with: python -m unittest ml/test_scoring.py
"""

import unittest
from ml.scoring_engine import calculate_hhi, compute_money_iq

class TestMoneyIQScoringEngine(unittest.TestCase):

    def test_hhi_diversification_extremes(self):
        """HHI should be 1.0 for single-asset concentration and 0.20 for equal 5-way split."""
        single_asset = [1.0, 0.0, 0.0, 0.0, 0.0]
        self.assertAlmostEqual(calculate_hhi(single_asset), 1.0, places=4)

        equal_split = [0.2, 0.2, 0.2, 0.2, 0.2]
        self.assertAlmostEqual(calculate_hhi(equal_split), 0.20, places=4)

    def test_score_bounds_and_validity(self):
        """Composite MoneyIQ score must always be strictly bounded between 10 and 100."""
        balanced = compute_money_iq(
            equity=0.45,
            debt=0.30,
            gold=0.15,
            cash=0.10,
            alt=0.0,
            time_spent_sec=24.0,
            emergency_buffer_inr=100000.0,
            hedged_ratio_pct=50.0,
            shock_mitigation=True
        )
        self.assertGreaterEqual(balanced["money_iq"], 10)
        self.assertLessEqual(balanced["money_iq"], 100)
        self.assertGreater(balanced["accuracy_score"], 0)
        self.assertGreater(balanced["risk_score"], 0)

    def test_overleverage_penalty(self):
        """Portfolios with >80% speculative assets should incur over-leverage penalties."""
        high_risk = compute_money_iq(
            equity=0.75,
            debt=0.05,
            gold=0.05,
            cash=0.05,
            alt=0.10, # equity + alt = 0.85 (>0.80)
            time_spent_sec=20.0,
            emergency_buffer_inr=50000.0
        )
        self.assertGreater(high_risk["penalties"]["over_leverage"], 0)

    def test_illiquidity_penalty(self):
        """Cash <8% and emergency buffer <50,000 INR triggers illiquidity penalty."""
        illiquid = compute_money_iq(
            equity=0.60,
            debt=0.20,
            gold=0.15,
            cash=0.05, # < 0.08
            alt=0.0,
            time_spent_sec=25.0,
            emergency_buffer_inr=20000.0 # < 50000
        )
        self.assertEqual(illiquid["penalties"]["illiquidity"], 15)

    def test_panic_time_penalty(self):
        """Submitting past 55 seconds with concentrated risk triggers panic penalty."""
        panic = compute_money_iq(
            equity=0.75,
            debt=0.10,
            gold=0.05,
            cash=0.10,
            alt=0.0,
            time_spent_sec=58.0, # > 55s
            emergency_buffer_inr=100000.0
        )
        self.assertEqual(panic["penalties"]["panic"], 10)

    def test_zero_division_protection(self):
        """Edge case: zero debt should not trigger division-by-zero errors."""
        zero_debt = compute_money_iq(
            equity=0.80,
            debt=0.0, # 0 debt
            gold=0.10,
            cash=0.10,
            alt=0.0,
            time_spent_sec=20.0,
            emergency_buffer_inr=60000.0
        )
        self.assertIsNotNone(zero_debt["money_iq"])

if __name__ == "__main__":
    unittest.main()
