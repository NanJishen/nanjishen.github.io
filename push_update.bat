@echo off
:: 获取当前日期
for /f "tokens=2 delims==." %%a in ('wmic os get localdatetime /value') do set datetime=%%a

:: 格式化日期为 YYYY-MM-DD
set year=%datetime:~0,4%
set month=%datetime:~4,2%
set day=%datetime:~6,2%
set formattedDate=%year%-%month%-%day%

:: 添加所有更改到暂存区
git add .

:: 提交更改并附加当前日期
git commit -m "Update on %formattedDate%"

:: 推送更改到远程仓库
git push origin main

echo Update pushed with commit message: "Update on %formattedDate%"