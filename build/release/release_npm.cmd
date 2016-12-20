@REM Copyright (c) Microsoft. All rights reserved.
@REM Licensed under the MIT license. See LICENSE file in the project root for full license information.

@setlocal EnableDelayedExpansion
@echo off

cd %~dp0\release_npm
set root=../../..

@REM encourage user to specify a fork of azure-event-hubs
if "%1"=="" goto usage
for /f "tokens=1,2,3" %%i in ('git remote -v') do (
    if "%%k"=="(fetch)" if "%%i"=="%1" (
        set candidate_uri=%%j
        if "!candidate_uri:~-20!"=="Azure/azure-event-hubs" goto not-a-fork
        if "!candidate_uri:~-21!"=="Azure/azure-event-hubs/" goto not-a-fork
        if "!candidate_uri:~-24!"=="Azure/azure-event-hubs.git" goto not-a-fork
    )
)

@REM install script dependencies
call npm rm -g prepare-azeventhubs-release
call npm install -g

prepare-azeventhubs-release %1 %root%/node/send_receive

goto :eof

:not-a-fork
echo.
echo '%1' points to the azure-event-hubs repo. Please specify a *fork* of azure-event-hubs instead
goto usage

:usage
echo.
echo release_npm.cmd ^<fork-name^>
echo   ^<fork-name^> the name of a remote that preferably points to a fork of azure-event-hubs
goto :eof