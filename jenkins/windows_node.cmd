@REM Copyright (c) Microsoft. All rights reserved.
@REM Licensed under the MIT license. See LICENSE file in the project root for full license information.

@setlocal
@echo off

set build-root=%~dp0..
REM Resolve to fully qualified path
for %%i in ("%build-root%") do set build-root=%%~fi

cd %build-root%\node

REM Set up links in the npm cache to ensure we're exercising all the code in
REM the repo, rather than downloading released versions of our packages from
REM npm.
call build\dev-setup.cmd
if errorlevel 1 goto :eof

REM Lint all JavaScript code and run unit + integration tests
call build\build.cmd --min --integration-tests
if errorlevel 1 goto :eof
