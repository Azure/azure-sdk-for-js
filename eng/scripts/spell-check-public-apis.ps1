<#
.SYNOPSIS
Spell checks JS public API surface as exported to review/**/*.md. This script invokes
against multiple service directories.

.DESCRIPTION
Checks spelling of package's public API. Some packages may be excluded by
criteria in the cspell.json config. The precise list of files to scan is
determined by cspell. If a pacakge is opted out in the cspell.json a command
will still be issued to scan that folder but cspell will report 0 files checked.
Given a diff json file, this script will check the spelling of any service directories
that have been changed.

.PARAMETER DiffJson
Scopes scanning to one or multiple service directories contained within `diff.json->ChangedServices`.

.EXAMPLE
./spell-check-public-apis.ps1 -PRDiff diff.json

Spell check all public API specs for all services under `sdk` that have been changed in the PR.

#>
[CmdletBinding()]
param (
  [Parameter(mandatory = $true)]
  $DiffJsonFile
)

Set-StrictMode -Version 3.0

$prDiff = Get-Content $DiffJsonFile | ConvertFrom-Json -AsHashTable


$allSuccess = $true
if ($prDiff["ChangedServices"]) {
  foreach($service in $prDiff["ChangedServices"]) {

    &"$PSScriptRoot/spell-check-public-api.ps1" -ServiceDirectory $service

    if($LASTEXITCODE -ne 0) {
      $allSuccess = $false
    }
  }
}

if (-not $allSuccess) {
  Write-Error "One or more service directories failed spell check, check above output for details."
  exit 1
}
