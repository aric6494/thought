@echo off
setlocal

:: 默认值（可由外部环境覆盖）
if "%COMMIT_MSG%"=="" set "COMMIT_MSG=Auto deploy: %DATE% %TIME%"
if "%BRANCH%"=="" set "BRANCH=main"

echo 0. Building site...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] npm run build failed.
    pause
    endlocal
    exit /b 1
)

echo 1. Adding changes to Git...
git add .
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] git add failed.
    pause
    endlocal
    exit /b 1
)

git diff --cached --quiet
if %ERRORLEVEL% EQU 0 (
    echo [INFO] No changes staged; skipping commit.
) else (
    echo 2. Committing changes...
    git commit -m "%COMMIT_MSG%"
    if %ERRORLEVEL% NEQ 0 (
        echo [ERROR] Commit failed.
        pause
        endlocal
        exit /b 1
    )
)

echo 3. Pushing to remote repository...
git push origin "%BRANCH%"
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Push failed! Check network and repository permissions.
    pause
    endlocal
    exit /b 1
)

echo.
echo ==================================
echo Deployment successful! Site updated.
echo ==================================
pause
endlocal
exit /b 0
