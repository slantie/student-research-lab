import psycopg2

# ---- LOCAL DB ----
LOCAL = {
    "host": "localhost",
    "database": "attendance_db",
    "user": "postgres",
    "password": "aayush"
}

# ---- SUPABASE DB ----
SUPA = {
    "host": "db.euicqolbsjtrshmxsiwy.supabase.co",
    "port": 5432,
    "database": "postgres",
    "user": "postgres",
    "password": "aayush04112006",
    "sslmode": "require"
}

def migrate():
    # Connect to local
    print("Connecting to local DB...")
    local_conn = psycopg2.connect(**LOCAL)
    local_cur = local_conn.cursor()

    # Connect to Supabase
    print("Connecting to Supabase...")
    supa_conn = psycopg2.connect(**SUPA)
    supa_cur = supa_conn.cursor()

    # ---- Step 1: Create tables on Supabase ----
    print("\nCreating tables on Supabase...")

    supa_cur.execute("""
        CREATE TABLE IF NOT EXISTS students (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL
        );
    """)

    supa_cur.execute("""
        CREATE TABLE IF NOT EXISTS attendance (
            id SERIAL PRIMARY KEY,
            student_id INTEGER NOT NULL REFERENCES students(id),
            date DATE NOT NULL,
            status TEXT NOT NULL
        );
    """)

    supa_cur.execute("""
        CREATE TABLE IF NOT EXISTS scores (
            id SERIAL PRIMARY KEY,
            student_id INTEGER NOT NULL REFERENCES students(id),
            date DATE NOT NULL,
            score NUMERIC NOT NULL
        );
    """)

    supa_conn.commit()
    print("Tables created successfully!")

    # ---- Step 2: Clear existing data (in case of re-run) ----
    print("\nClearing existing Supabase data (if any)...")
    supa_cur.execute("DELETE FROM scores")
    supa_cur.execute("DELETE FROM attendance")
    supa_cur.execute("DELETE FROM students")
    supa_conn.commit()

    # ---- Step 3: Copy students ----
    print("\nMigrating students...")
    local_cur.execute("SELECT id, name FROM students ORDER BY id")
    students = local_cur.fetchall()
    for s in students:
        supa_cur.execute("INSERT INTO students (id, name) VALUES (%s, %s)", s)
    supa_conn.commit()
    print(f"  Migrated {len(students)} students")

    # Reset sequence
    supa_cur.execute("SELECT setval('students_id_seq', (SELECT MAX(id) FROM students))")
    supa_conn.commit()

    # ---- Step 4: Copy attendance ----
    print("\nMigrating attendance...")
    local_cur.execute("SELECT id, student_id, date, status FROM attendance ORDER BY id")
    attendance = local_cur.fetchall()
    for a in attendance:
        supa_cur.execute("INSERT INTO attendance (id, student_id, date, status) VALUES (%s, %s, %s, %s)", a)
    supa_conn.commit()
    print(f"  Migrated {len(attendance)} attendance records")

    # Reset sequence
    supa_cur.execute("SELECT setval('attendance_id_seq', (SELECT MAX(id) FROM attendance))")
    supa_conn.commit()

    # ---- Step 5: Copy scores ----
    print("\nMigrating scores...")
    local_cur.execute("SELECT id, student_id, date, score FROM scores ORDER BY id")
    scores = local_cur.fetchall()
    for sc in scores:
        supa_cur.execute("INSERT INTO scores (id, student_id, date, score) VALUES (%s, %s, %s, %s)", sc)
    supa_conn.commit()
    print(f"  Migrated {len(scores)} score records")

    # Reset sequence
    supa_cur.execute("SELECT setval('scores_id_seq', (SELECT MAX(id) FROM scores))")
    supa_conn.commit()

    # ---- Step 6: Verify ----
    print("\n=== Verification ===")
    for table in ['students', 'attendance', 'scores']:
        supa_cur.execute(f"SELECT COUNT(*) FROM {table}")
        count = supa_cur.fetchone()[0]
        print(f"  {table}: {count} rows")

    # Cleanup
    local_cur.close()
    local_conn.close()
    supa_cur.close()
    supa_conn.close()

    print("\n✅ Migration complete!")

if __name__ == "__main__":
    migrate()
