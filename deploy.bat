

echo 1. Adding changes to Git...
git add .
if %errorlevel% neq 0 (
    echo [WARNING] Git add encountered issues.
)

echo 2. Committing changes...
git commit -m "%COMMIT_MSG%"
if %errorlevel% neq 0 (
    echo [WARNING] Commit failed or no changes to commit.
)

echo 3. Pushing to remote repository...
git push origin %BRANCH%
if %errorlevel% neq 0 (
    echo [ERROR] Push failed! Check network and repository permissions.
    pause
    exit /b 1
)

echo.
echo ==================================
echo Deployment successful! Site updated.
echo ==================================
pause
endlocal