import pandas as pd
from datetime import datetime, timedelta
import sqlite3
import random
from sklearn.linear_model import LinearRegression
import numpy as np
import folium
import os

# ---------------------------------------
# 1. SIMULATED DATABASE CREATION
# ---------------------------------------
def create_dummy_database():
    """Create a local SQLite database with simulated agent data."""
    conn = sqlite3.connect("agents.db")
    cursor = conn.cursor()

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS agent_table (
        agent_id INTEGER PRIMARY KEY,
        status TEXT,
        affiliation TEXT,
        last_active TEXT,
        latitude REAL,
        longitude REAL
    )
    """)

    # Create 100 dummy agents
    agents = []
    for i in range(1, 101):
        status = random.choice(["active", "inactive", "managing"])
        affiliation = random.choice(["FirmA", "FirmB", None])
        last_active = datetime.now() - timedelta(days=random.randint(10, 400))
        latitude = 47.60 + random.uniform(-0.3, 0.3)
        longitude = -122.33 + random.uniform(-0.3, 0.3)
        agents.append((i, status, affiliation, last_active.isoformat(), latitude, longitude))

    cursor.executemany("INSERT OR REPLACE INTO agent_table VALUES (?, ?, ?, ?, ?, ?)", agents)
    conn.commit()
    conn.close()


# ---------------------------------------
# 2. FETCH & SEGMENT AGENTS
# ---------------------------------------
def fetch_agents_data(database_connection):
    query = "SELECT * FROM agent_table"
    return pd.read_sql(query, database_connection)


def advanced_segmentation(df):
    """Implements the segmentation logic from the business document."""
    segments = {
        "Total Outreach": len(df),
        "Active Brokers": len(df[df["status"] == "active"]),
        "Inactive Brokers": len(df[df["status"] == "inactive"]),
        "Inactive - No Affiliations": len(df[(df["status"] == "inactive") & (df["affiliation"].isnull())]),
        "Managing Brokers": len(df[df["status"] == "managing"]),
    }
    return segments


# ---------------------------------------
# 3. INCENTIVE STRUCTURE
# ---------------------------------------
def calculate_incentives(segment_counts):
    incentive_table = {
        "100% Sponsorship Program": (45, 176),
        "IDX Accounts": (25, 90),
        "Website + Email": (160, 15),  # setup + monthly
        "CYPS 360° Yard Sign": ("Wholesale", "Deployment"),
    }

    results = {}
    for product, values in incentive_table.items():
        if isinstance(values[0], (int, float)):
            low, high = values
            results[product] = {
                "One-Time Payment Range": f"${low}–${high}",
                "Projected Volume": f"{segment_counts.get('Active Brokers', 0) // 10 * 10} agents"
            }
        else:
            results[product] = {
                "One-Time Payment Range": "Variable",
                "Projected Volume": "1,000 units (prototype deployment)"
            }

    return results


# ---------------------------------------
# 4. FORECAST ACTIVATION VELOCITY
# ---------------------------------------
def forecast_activation_velocity(df):
    """Predict reactivation count over next 30 days."""
    df["inactive_days"] = (datetime.now() - pd.to_datetime(df["last_active"])).dt.days
    df["reactivation_likelihood"] = df["inactive_days"].apply(lambda x: max(0, 1 - x / 400))

    # Simulate activation data for regression
    X = np.arange(len(df)).reshape(-1, 1)
    y = df["reactivation_likelihood"]
    model = LinearRegression().fit(X, y)

    # Predict 30 days ahead
    future_X = np.arange(len(df), len(df) + 30).reshape(-1, 1)
    forecast = model.predict(future_X)

    forecast_summary = {f"Day {i+1}": round(val * 100, 2) for i, val in enumerate(forecast)}
    return forecast_summary


# ---------------------------------------
# 5. CYPS DEPLOYMENT MAP
# ---------------------------------------
def generate_broker_density_map(df):
    """Plot managing broker zones for CYPS deployment."""
    managing_df = df[df["status"] == "managing"]

    m = folium.Map(location=[47.6, -122.33], zoom_start=10)
    for _, row in managing_df.iterrows():
        folium.CircleMarker(
            location=[row["latitude"], row["longitude"]],
            radius=6,
            color="blue",
            fill=True,
            fill_opacity=0.6,
            popup=f"Broker ID: {row['agent_id']}"
        ).add_to(m)

    os.makedirs("reports", exist_ok=True)
    map_path = "reports/cyps_deployment_map.html"
    m.save(map_path)
    return map_path


# ---------------------------------------
# 6. FINAL REPORT GENERATION
# ---------------------------------------
def save_report(segmentation, forecast, incentives, map_path):
    os.makedirs("reports", exist_ok=True)
    report_path = "reports/summary_report.txt"
    with open(report_path, "w") as f:
        f.write("ONE DRIVE REALTY – DATA ANALYTICS SUMMARY\n\n")
        f.write("LICENSEE SEGMENTATION LOGIC\n")
        for k, v in segmentation.items():
            f.write(f"- {k}: {v}\n")

        f.write("\nACTIVATION FORECAST (Next 30 Days):\n")
        for d, c in forecast.items():
            f.write(f"- {d}: {c}% potential reactivations\n")

        f.write("\nINCENTIVE STRUCTURE:\n")
        for p, info in incentives.items():
            f.write(f"- {p}: {info['One-Time Payment Range']}, {info['Projected Volume']}\n")

        f.write(f"\nCYPS Deployment Map: {map_path}\n")

    print(f"\n✅ Report saved to: {report_path}")
    print(f"✅ Map generated: {map_path}")


# ---------------------------------------
# MAIN EXECUTION
# ---------------------------------------
if __name__ == "__main__":
    create_dummy_database()

    conn = sqlite3.connect("agents.db")
    df = fetch_agents_data(conn)

    segmentation = advanced_segmentation(df)
    incentives = calculate_incentives(segmentation)
    forecast = forecast_activation_velocity(df)
    map_path = generate_broker_density_map(df)

    # -------- Terminal Output (detailed) --------
    print("\n=== LICENSEE SEGMENTATION LOGIC ===")
    for k, v in segmentation.items():
        print(f"{k}: {v}")

    print("\n=== PRODUCT INCENTIVE STRUCTURE ===")
    for p, info in incentives.items():
        print(f"{p}: {info['One-Time Payment Range']}, {info['Projected Volume']}")

    print("\n=== ACTIVATION FORECAST (Next 30 Days) ===")
    for d, c in list(forecast.items())[:10]:  # show first 10 days
        print(f"{d}: {c}% potential reactivations")

    print("\n✅ CYPS Deployment Map generated:")
    print(f"{map_path}")

    # Save report file
    save_report(segmentation, forecast, incentives, map_path)
    conn.close()
