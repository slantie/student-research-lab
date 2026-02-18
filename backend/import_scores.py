import pandas as pd
import psycopg2
from datetime import datetime

df = pd.read_csv("scores.csv")

# Remove junk columns
df = df.loc[:, ~df.columns.str.contains('^Unnamed')]
df.columns = df.columns.str.strip()

date_columns = [col for col in df.columns if col not in ["Sr. No.", "Student Name"]]

conn = psycopg2.connect(
    host="localhost",
    database="attendance_db",
    user="postgres",
    password="aayush"
)

cur = conn.cursor()

YEAR = 2026

for _, row in df.iterrows():
    student_name = row["Student Name"]

    if pd.isna(student_name):
        continue

    student_name = str(student_name).strip()

    cur.execute("SELECT id FROM students WHERE name = %s", (student_name,))
    result = cur.fetchone()

    if not result:
        print(f"Student missing in DB: {student_name}")
        continue

    student_id = result[0]

    for col in date_columns:
        value = row[col]

        if pd.isna(value) or value == 0:
            continue

        date_obj = datetime.strptime(f"{col} {YEAR}", "%d %b %Y").date()

        cur.execute(
            """
            INSERT INTO scores (student_id, date, score)
            VALUES (%s, %s, %s)
            ON CONFLICT (student_id, date) DO NOTHING
            """,
            (student_id, date_obj, value)
        )

conn.commit()
cur.close()
conn.close()

print("Scores import complete ✅")
