@REM Copyright (c) Microsoft. All rights reserved.
@REM Licensed under the MIT license. See LICENSE file in the project root for full license information.

@setlocal
@echo off

set node-root=%~dp0..
rem // resolve to fully qualified path
for %%i in ("%node-root%") do set node-root=%%~fi

rem ---------------------------------------------------------------------------
rem -- parse script arguments
rem ---------------------------------------------------------------------------

set min-output=0
set integration-tests=0

:args-loop
if "%1" equ "" goto args-done
if "%1" equ "--min" goto arg-min-output
if "%1" equ "--integration-tests" goto arg-integration-tests
call :usage && exit /b 1

:arg-min-output
set min-output=1
goto args-continue

:arg-integration-tests
set integration-tests=1
goto args-continue

:args-continue
shift
goto args-loop

:args-done

if %min-output%==0 if %integration-tests%==0 set "npm-command=npm -s test"
if %min-output%==0 if %integration-tests%==1 set "npm-command=npm -s run lint && npm -s run alltest"
if %min-output%==1 if %integration-tests%==0 set "npm-command=npm -s run lint && npm -s run unittest-min"
if %min-output%==1 if %integration-tests%==1 set "npm-command=npm -s run ci"

rem ---------------------------------------------------------------------------
rem -- lint and run tests
rem ---------------------------------------------------------------------------

echo.
if %integration-tests%==0 echo -- Linting and running unit tests --
if %integration-tests%==1 echo -- Linting and running unit + integration tests --
echo.

call :lint-and-test %node-root%\send_receive
if errorlevel 1 goto :eof

goto :eof


rem ---------------------------------------------------------------------------
rem -- helper subroutines
rem ---------------------------------------------------------------------------

:usage
echo Lint code and run tests.
echo build.cmd [options]
echo options:
echo  --min                 minimize display output
echo  --integration-tests   run integration tests too (unit tests always run)
goto :eof

:lint-and-test
cd "%1"
echo %cd%
call %npm-command%
goto :eof
