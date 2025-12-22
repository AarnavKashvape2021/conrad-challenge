@echo off
echo Starting local web server...
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python from https://www.python.org/
    pause
    exit /b 1
)

REM Check if port 8000 is already in use
netstat -ano | findstr :8000 >nul 2>&1
if not errorlevel 1 (
    echo WARNING: Port 8000 is already in use!
    echo Attempting to find and close the process using port 8000...
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8000 ^| findstr LISTENING') do (
        echo Closing process %%a...
        taskkill /F /PID %%a >nul 2>&1
    )
    timeout /t 2 /nobreak >nul
)

echo.
echo Your website will be available at: http://localhost:8000
echo.
echo Press Ctrl+C to stop the server
echo.
echo Starting server...
echo.

python -m http.server 8000
if errorlevel 1 (
    echo.
    echo ERROR: Failed to start server on port 8000
    echo Please check if the port is available or try a different port
    pause
    exit /b 1
)

