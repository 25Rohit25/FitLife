@echo off
echo Starting FitLife Pro Backend (Spring Boot)...
cd server-java
set DB_PORT=3307
call mvn spring-boot:run
pause
