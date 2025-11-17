@echo off
REM filepath: c:\Users\aferrio\pocs\playwright\start_monitor.bat

echo Starting Playwright Test Monitor...
echo.

REM Verifica se Python è installato
py --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Python not found! Please install Python first.
    pause
    exit /b 1
)

REM Verifica se il file playwright_monitor.py esiste
if not exist "playwright_monitor.py" (
    echo ERROR: playwright_monitor.py not found in current directory!
    echo Please make sure the file is in the same folder as this batch file.
    pause
    exit /b 1
)

echo Python found, starting monitor...
echo Press Ctrl+C to stop the monitor
echo.

REM Esegue lo script Python
py playwright_monitor.py

echo.
echo Monitor stopped.
pause