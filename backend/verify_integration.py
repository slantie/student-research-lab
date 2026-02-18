import urllib.request
import json
import sys

def verify_api():
    url = "http://localhost:8000/students"
    try:
        with urllib.request.urlopen(url) as response:
            if response.status != 200:
                print(f"❌ API returned status: {response.status}")
                return
            
            data = json.loads(response.read().decode())
            print("✅ API Response Received")

            if "students" not in data:
                print("❌ 'students' key missing in response")
                return

            students = data["students"]
            if not students:
                print("⚠️ No students found in database")
                return

            print(f"Found {len(students)} students")
            
            first_student = students[0]
            print(f"Sample Student: {json.dumps(first_student, indent=2)}")

            required_keys = ["id", "name", "attendance_percentage", "total_score"]
            missing_keys = [key for key in required_keys if key not in first_student]

            if missing_keys:
                print(f"❌ Missing keys in student object: {missing_keys}")
                sys.exit(1)
            else:
                print("✅ All required keys present (attendance_percentage, total_score)")
                
    except Exception as e:
        print(f"❌ API Request Failed: {e}")
        sys.exit(1)

if __name__ == "__main__":
    verify_api()
