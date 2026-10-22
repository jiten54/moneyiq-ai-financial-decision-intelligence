"""
MoneyIQ AI - Synthetic Dataset Generator
Generates reproducible simulated reality show contestant and challenge records.
Uses fixed Random Seed 42 for strict scientific reproducibility.
"""

import random
import csv
import json
import math
from datetime import datetime, timedelta

RANDOM_SEED = 42
random.seed(RANDOM_SEED)

CONTESTANT_NAMES = [
    ("Aryan Malhotra", "Quantitative Analyst", "Mumbai, Maharashtra"),
    ("Priya Sharma", "FinTech Product Lead", "Bengaluru, Karnataka"),
    ("Vikramaditya Rao", "Angel Investor & Ex-Founder", "Hyderabad, Telangana"),
    ("Devika Pillai", "Chartered Accountant", "Kochi, Kerala"),
    ("Rohan Singhania", "Options Scalper", "Indore, Madhya Pradesh"),
    ("Ananya Iyer", "Fixed Income Associate", "Chennai, Tamil Nadu"),
    ("Kabir Sen", "Economics Professor", "Kolkata, West Bengal"),
    ("Neha Deshmukh", "Treasury Manager", "Pune, Maharashtra"),
    ("Tanya Kapoor", "Commodities Trader", "New Delhi"),
    ("Aman Verma", "Fintech Engineering Student", "Jaipur, Rajasthan"),
    ("Zoya Merchant", "Family Office Manager", "Ahmedabad, Gujarat"),
    ("Siddharth Roy", "Agritech Entrepreneur", "Chandigarh, Punjab"),
]

CHALLENGE_TYPES = [
    "ASSET_ALLOCATION",
    "LIQUIDITY_SHOCK",
    "STARTUP_VALUATION",
    "DERIVATIVES_HEDGING"
]

def generate_records():
    rows = []
    base_time = datetime(2026, 9, 1, 10, 0, 0)
    
    record_id = 100
    for ep in range(1, 11):
        for idx, (name, profession, city) in enumerate(CONTESTANT_NAMES):
            record_id += 1
            ch_type = CHALLENGE_TYPES[(ep + idx) % len(CHALLENGE_TYPES)]
            
            # Behavioral traits
            is_disciplined = "Analyst" in profession or "Accountant" in profession or "Treasury" in profession
            is_aggressive = "Options" in profession or "Angel" in profession or "Commodities" in profession
            
            if is_disciplined:
                acc = random.randint(82, 94)
                risk = random.randint(78, 92)
                time_sec = random.randint(18, 28)
                buffer = round(random.uniform(0.60, 0.85), 2)
                debt = round(random.uniform(0.10, 0.25), 2)
                outcome = "SUCCESS" if acc >= 85 else "QUALIFIED"
            elif is_aggressive:
                acc = random.randint(68, 88)
                risk = random.randint(50, 78)
                time_sec = random.randint(11, 20)
                buffer = round(random.uniform(0.20, 0.45), 2)
                debt = round(random.uniform(0.35, 0.65), 2)
                outcome = "SUCCESS" if acc >= 80 else ("FAILED_ELIMINATION" if acc < 65 else "QUALIFIED")
            else:
                acc = random.randint(70, 85)
                risk = random.randint(70, 85)
                time_sec = random.randint(22, 42)
                buffer = round(random.uniform(0.50, 0.70), 2)
                debt = round(random.uniform(0.15, 0.35), 2)
                outcome = "QUALIFIED"

            time_score = 95 if (15 <= time_sec <= 35) else (60 if time_sec < 10 else 75)
            money_iq = int(round((acc * 0.40) + (risk * 0.25) + (85 * 0.20) + (time_score * 0.15)))
            sim_return = round(random.uniform(8.5, 16.5) - (4.0 if risk < 60 else 0.0), 1)
            alpha = round(sim_return - 11.2, 1)

            rows.append({
                "record_id": f"REC-{record_id}",
                "contestant_id": f"IFI-C{idx+1:02d}",
                "contestant_name": name,
                "profession": profession,
                "city": city,
                "episode": ep,
                "challenge_type": ch_type,
                "money_iq_score": money_iq,
                "accuracy_score": acc,
                "risk_score": risk,
                "time_sec": time_sec,
                "emergency_buffer_ratio": buffer,
                "debt_to_capital_ratio": debt,
                "simulated_return_pct": sim_return,
                "alpha_pct": alpha,
                "outcome": outcome,
                "timestamp": (base_time + timedelta(days=ep*7, minutes=idx*15)).isoformat()
            })
    return rows

def main():
    records = generate_records()
    filename = "ml/synthetic_ifi_challenges.csv"
    with open(filename, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=list(records[0].keys()))
        writer.writeheader()
        writer.writerows(records)
    print(f"Successfully generated {len(records)} synthetic records into {filename} (Random Seed: {RANDOM_SEED})")

if __name__ == "__main__":
    main()
