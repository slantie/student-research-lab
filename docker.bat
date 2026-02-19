@echo off
rem Read variables from .env if present (simple implementation)
for /f "tokens=1,2 delims==" %%a in (.env) do set %%a=%%b

rem Build Docker image with arguments
docker build --build-arg VITE_SUPABASE_URL=%VITE_SUPABASE_URL% --build-arg VITE_SUPABASE_ANON_KEY=%VITE_SUPABASE_ANON_KEY% -t srl-website .
