@echo off
echo Initializing Git repository...
git init

echo Adding files...
git add .

echo Committing files...
git commit -m "Fix deployment structure for Render"

echo Renaming branch to main...
git branch -M main

echo Adding remote origin...
git remote add origin https://github.com/25Rohit25/FitLife.git

echo Pushing to GitHub (Force update)...
git push -u origin main --force

echo.
echo Done! Now check Render logs.
pause
