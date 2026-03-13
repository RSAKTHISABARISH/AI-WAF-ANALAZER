@echo off
echo Starting AI WAF Adaptive Suite...

echo [1/2] Launching Python Backend...
start /b cmd /c "cd backend && pip install -r requirements.txt && uvicorn main:app --port 8000"

echo [2/2] Launching Frontend...
start /b npm.cmd run dev

timeout /t 8
start chrome http://localhost:5175/
echo Application suite launched!
pause
