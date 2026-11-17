@echo off
REM Double-click to start Office Desk. Keep this window open while people use it.
cd /d "%~dp0"
if not exist .env (
  echo The .env settings file is missing. Copy .env.example to .env and fill it in first.
  pause
  exit /b 1
)
if not exist node_modules (
  echo Installing for the first time, please wait...
  call npm install --omit=dev
)
node --no-warnings server.js
pause
