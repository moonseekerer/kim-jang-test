@echo off
:: 한글 깨짐 방지
chcp 65001 > nul

echo =======================================
echo     버전 업데이트 및 캐시 무력화 중...
echo =======================================

:: 현재 날짜와 시간으로 버전 생성 (YYMMDD.HHMM)
for /f "tokens=*" %%i in ('powershell -NoProfile -Command "Get-Date -Format 'yyMMdd.HHmm'"') do set version=%%i

:: PowerShell을 한 줄로 실행하여 줄바꿈(^) 오류 원천 차단
powershell -NoProfile -ExecutionPolicy Bypass -Command "$path = 'index.html'; $content = Get-Content -Path $path -Raw -Encoding UTF8; $content = $content -replace 'Ver\. \d{6}\.\d{4}', 'Ver. %version%' -replace 'Ver\. 1\.0\.0', 'Ver. %version%' -replace 'style\.css\?v=[^\"'']+', ('style.css?v=' + '%version%') -replace 'script\.js\?v=[^\"'']+', ('script.js?v=' + '%version%'); [System.IO.File]::WriteAllText($path, $content, (New-Object System.Text.UTF8Encoding $false))"

echo [%version%] 버전으로 업데이트 및 한글 인코딩 보호 완료!

echo =======================================
echo     깃허브 자동 업로드를 시작합니다
echo =======================================

:: 1. 변경된 모든 파일을 장바구니에 담기
git add .

:: 2. 현재 시간으로 커밋 메세지 작성
git commit -m "Auto Update: %version%"

:: 3. 깃허브 서버로 내보내기
git push origin main

echo.
echo =======================================
echo     업로드 완료! (현 버전: %version%)
echo =======================================
echo.
pause
