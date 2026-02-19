
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import psycopg2

app = FastAPI()

# ✅ Allow React → Backend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Database Connection
def get_conn():
    return psycopg2.connect(
        host="localhost",
        database="attendance_db",
        user="postgres",
        password="aayush"
    )

# ✅ Root Test
@app.get("/")
def root():
    return {"status": "API running ✅"}

# ✅ Fetch Students
@app.get("/students")
def get_students():
    conn = get_conn()
    cur = conn.cursor()

    query = """
    WITH attendance_stats AS (
        SELECT 
            student_id, 
            COUNT(*) as total_classes, 
            COUNT(*) FILTER (WHERE status = 'Present') as present_count
        FROM attendance
        GROUP BY student_id
    ),
    score_stats AS (
        SELECT 
            student_id, 
            SUM(score) as total_score
        FROM scores
        GROUP BY student_id
    )
    SELECT 
        s.id, 
        s.name, 
        COALESCE(a.total_classes, 0),
        COALESCE(a.present_count, 0),
        COALESCE(sc.total_score, 0)
    FROM students s
    LEFT JOIN attendance_stats a ON s.id = a.student_id
    LEFT JOIN score_stats sc ON s.id = sc.student_id
    ORDER BY s.id
    """
    
    cur.execute(query)
    rows = cur.fetchall()

    students = []
    for row in rows:
        total_classes = row[2]
        present_count = row[3]
        total_score = row[4]
        
        attendance_percentage = 0.0
        if total_classes > 0:
            attendance_percentage = round((present_count / total_classes) * 100, 2)

        students.append({
            "id": row[0],
            "name": row[1],
            "attendance_percentage": attendance_percentage,
            "total_score": total_score
        })

    cur.close()
    conn.close()

    return {"students": students}

# ✅ Attendance Records
@app.get("/attendance/{student_id}")
def get_attendance(student_id: int):
    conn = get_conn()
    cur = conn.cursor()

    cur.execute(
        """
        SELECT date, status
        FROM attendance
        WHERE student_id = %s
        ORDER BY date
        """,
        (student_id,)
    )

    rows = cur.fetchall()

    cur.close()
    conn.close()

    return {"records": rows}

# ✅ Score Records
@app.get("/scores/{student_id}")
def get_scores(student_id: int):
    conn = get_conn()
    cur = conn.cursor()

    cur.execute(
        """
        SELECT date, score
        FROM scores
        WHERE student_id = %s
        ORDER BY date
        """,
        (student_id,)
    )

    rows = cur.fetchall()

    cur.close()
    conn.close()

    return {"scores": rows}

# ✅ Total Score
@app.get("/scores/{student_id}/total")
def total_score(student_id: int):
    conn = get_conn()
    cur = conn.cursor()

    cur.execute(
        """
        SELECT COALESCE(SUM(score), 0)
        FROM scores
        WHERE student_id = %s
        """,
        (student_id,)
    )

    total = cur.fetchone()[0]

    cur.close()
    conn.close()

    return {"student_id": student_id, "total_score": total}

# ✅ Student Summary (Dashboard Gold)
@app.get("/students/{student_id}/summary")
def student_summary(student_id: int):
    conn = get_conn()
    cur = conn.cursor()

    cur.execute("""
        SELECT 
            COUNT(*) FILTER (WHERE status = 'Present'),
            COUNT(*)
        FROM attendance
        WHERE student_id = %s
    """, (student_id,))

    present, total = cur.fetchone()
    percentage = round((present / total) * 100, 2) if total else 0

    cur.execute("""
        SELECT COALESCE(SUM(score), 0)
        FROM scores
        WHERE student_id = %s
    """, (student_id,))

    total_score = cur.fetchone()[0]

    cur.close()
    conn.close()

    return {
        "student_id": student_id,
        "attendance_percentage": percentage,
        "total_score": total_score
    }
