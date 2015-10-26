@REM Copyright (c) Microsoft. All rights reserved.
@REM Licensed under the MIT license. See LICENSE file in the project root for full license information.

@setlocal
@echo off

set node-root=%~dp0..
REM // resolve to fully qualified path
for %%i in ("%node-root%") do set node-root=%%~fi

cd %node-root%

cd common
echo.
echo -- Creating links for %cd% --
call npm link

cd ..\device
echo.
echo -- Creating links for %cd% --
call npm link azure-iot-common
call npm link

cd ..\service
echo.
echo -- Creating links for %cd% --
call npm link azure-iot-common
call npm link

cd ..\..\tools\iothub-explorer
echo.
echo -- Creating links for %cd% --
call npm link azure-iothub
call npm install
