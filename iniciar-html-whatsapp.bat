@echo off
cd /d C:\Users\marti\whatsapp-masivo
start cmd /k "node server.js"
timeout /t 3 >nul
start http://localhost:3000


