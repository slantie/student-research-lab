import urllib.request
import json

try:
    print("Testing API connection...")
    with urllib.request.urlopen("http://localhost:8000/students") as response:
        if response.status == 200:
            data = json.loads(response.read().decode())
            print("API Response Structure (first student):")
            
            if "students" in data and len(data["students"]) > 0:
                s = data["students"][0]
                print(json.dumps(s, indent=2))
                
                if "attendance" in s:
                    print("\n✅ Verification SUCCESS: 'attendance' field present.")
                    att = s["attendance"]
                    if all(k in att for k in ("present", "absent", "percentage", "total")):
                         print("✅ Verification SUCCESS: 'attendance' object has all required keys.")
                    else:
                         print("❌ Verification FAILED: 'attendance' object missing keys.")
                else:
                    print("\n❌ Verification FAILED: 'attendance' field missing.")
            else:
                print("\n⚠️ Verification WARNING: 'students' list is empty.")
        else:
            print(f"\n❌ Verification FAILED: API returned status code {response.status}")
except Exception as e:
    print(f"\n❌ Verification FAILED: Could not connect to API. {e}")
