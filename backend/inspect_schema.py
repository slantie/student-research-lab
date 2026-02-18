import psycopg2
import sys

def inspect_db():
    try:
        conn = psycopg2.connect(
            host="localhost",
            database="attendance_db",
            user="postgres",
            password="aayush"
        )
        cur = conn.cursor()
        
        # Get distinct status values
        cur.execute("SELECT DISTINCT status FROM attendance;")
        rows = cur.fetchall()
        print("\n--- DISTINCT STATUS VALUES ---")
        for row in rows:
            print(row[0])
        print("--- END ---\n")

        cur.close()
        conn.close()
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    inspect_db()
