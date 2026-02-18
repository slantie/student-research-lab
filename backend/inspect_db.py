import psycopg2
import json

conn = psycopg2.connect(
    host="localhost",
    database="attendance_db",
    user="postgres",
    password="aayush"
)
cur = conn.cursor()

# Get schema for each table
for table in ['students', 'attendance', 'scores']:
    cur.execute(f"SELECT column_name, data_type, is_nullable, column_default FROM information_schema.columns WHERE table_name='{table}' ORDER BY ordinal_position")
    rows = cur.fetchall()
    print(f"\n=== {table} schema ===")
    for r in rows:
        print(f"  {r[0]}: {r[1]} (nullable={r[2]}, default={r[3]})")

# Get all students
cur.execute("SELECT * FROM students ORDER BY id")
students = cur.fetchall()
print(f"\n=== students ({len(students)} rows) ===")
for s in students:
    print(f"  {s}")

# Get attendance count
cur.execute("SELECT COUNT(*) FROM attendance")
att_count = cur.fetchone()[0]
print(f"\n=== attendance ({att_count} rows) ===")

# Get scores count  
cur.execute("SELECT COUNT(*) FROM scores")
scores_count = cur.fetchone()[0]
print(f"\n=== scores ({scores_count} rows) ===")

cur.close()
conn.close()
