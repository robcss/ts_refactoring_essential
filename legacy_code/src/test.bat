@echo off

echo Running ShippingApp tests...

echo.
echo === Test 1001 ===
call npx ts-node ShippingApp.ts 1001

echo.
echo === Test 1002 ===
call npx ts-node ShippingApp.ts 1002

echo.
echo === Test 1003 ===
call npx ts-node ShippingApp.ts 1003

echo.
echo All tests complete.
pause