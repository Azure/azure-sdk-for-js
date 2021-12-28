<#
.SYNOPSIS
Spell checks JS public API surface as expored to review/**/*.md

.DESCRIPTION
Checks spelling of package's public API. Some packages may be excluded by
criteria in the cspell.json config. The precise list of files to scan is
determined by cspell. If a pacakge is opted out in the cspell.json a command
will still be issued to scan that folder but cspell will report 0 files checked.

.PARAMETER ServiceDirectory
Scopes scanning to a particular service directory (e.g. `storage`). Otherwise
scan everything under the `sdk/` folder. Default is empty string (scan
everything).

.EXAMPLE
./spell-check-public-api.ps1

Spell check all public API specs for all services and packages under `sdk`

.EXAMPLE
./spell-check-public-api.ps1 -ServiceDirectory storage

Spell check all public API specs for packages under `sdk/storage`

#>
[CmdletBinding()]
param (
  [Parameter(mandatory = $false)]
  $ServiceDirectory = ''
)

Set-StrictMode -Version 3.0

."$PSScriptRoot/../common/scripts/common.ps1"

$REPO_ROOT = Resolve-Path "$PSScriptRoot/../.."

$directoresToScan = @((Resolve-Path "$REPO_ROOT/sdk/$ServiceDirectory"))
if (!$ServiceDirectory) {
  $directoresToScan = Get-ChildItem -Path "$REPO_ROOT/sdk" -Directory
}

$packageDirectories = @()
foreach ($serviceDirectory in $directoresToScan) {
  # Only include directories which have a `review` folder as that is the folder
  # that will be scanned.
  $packageDirectories += Get-ChildItem -Path "$serviceDirectory/*/review" -Directory
}

$scanGlobs = @()
foreach ($directory in $packageDirectories) {
  $scanGlobs += "$directory/**/*.md"
}

$cspellOutput = &"$REPO_ROOT/eng/common/spelling/Invoke-Cspell.ps1" `
  -ScanGlobs $scanGlobs

if ($LASTEXITCODE) {
  foreach ($log in $cspellOutput) {
    LogError $log
  }
  LogError "Spelling errors detected. To correct false positives or learn about spell checking see: https://aka.ms/azsdk/engsys/spellcheck"
  exit 1
}
