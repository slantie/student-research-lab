import psycopg2
import socket

# Force IPv4 resolution
original_getaddrinfo = socket.getaddrinfo
def ipv4_getaddrinfo(*args, **kwargs):
    return original_getaddrinfo(*args, family=socket.AF_INET, **kwargs)

socket.getaddrinfo = ipv4_getaddrinfo

print("Trying direct connection with IPv4 forced...")
try:
    conn = psycopg2.connect(
        host="db.euicqolbsjtrshmxsiwy.supabase.co",
        port=5432,
        database="postgres",
        user="postgres",
        password="aayush04112006",
        sslmode="require",
        connect_timeout=15
    )
    cur = conn.cursor()
    cur.execute("SELECT version()")
    print(f"SUCCESS! {cur.fetchone()[0]}")
    cur.close()
    conn.close()
except Exception as e:
    print(f"FAILED: {e}")
