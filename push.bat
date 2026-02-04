@echo off
:: 한글 깨짐 방지
chcp 65001 > nul

echo =======================================
echo     버전 업데이트 및 캐시 무력화 중...
echo =======================================

:: 현재 날짜와 시간으로 버전 생성 (예: 240204.2235)
for /f "tokens=2 delims==" %%I in ('wmic os get localdatetime /format:list') do set datetime=%%I
set version=%datetime:~2,2%%datetime:~4,2%%datetime:~6,2%.%datetime:~8,4%

:: index.html을 utf8로 읽어서 수정 후 utf8로 다시 저장 (한글 깨짐 방지 필수)
:: gc(Get-Content)에 -Encoding UTF8을 명시해야 한글이 깨지지 않습니다.
powershell -Command "$c = Get-Content -Encoding UTF8 index.html; $c = $c -replace 'Ver\. \d{6}\.\d{4}', 'Ver. %version%'; $c = $c -replace 'Ver\. 1\.0\.0', 'Ver. %version%'; $c = $c -replace 'style\.css\?v=[^\"'']+', 'style.css?v=%version%'; $c = $c -replace 'script\.js\?v=[^\"'']+', 'script.js?v=%version%'; [System.IO.File]::WriteAllLines('index.html', $c, (New-Object System.Text.UTF8Encoding $false))"

echo [%version%] 버전으로 파일이 업데이트되었습니다.

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
