<#
.SYNOPSIS
Spell checks JS public API surface as exported to review/**/*.md. This script invokes
against multiple service directories.

.DESCRIPTION
Checks spelling of package's public API. Some packages may be excluded by
criteria in the cspell.json config. The precise list of files to scan is
determined by cspell. If a package is opted out in the cspell.json a command
will still be issued to scan that folder but cspell will report 0 files checked.

.PARAMETER ChangedServices
The list of service directories that have been changed in the PR. Space separated list of service directories.

.EXAMPLE
$(ChangedServices) is set in set-artifact-packages.yml
./spell-check-public-apis.ps1 -ChangedServices $(ChangedServices)

Spell check all public API specs for all services under `sdk` that have been changed in the PR.

#>
[CmdletBinding()]
param (
  [Parameter(mandatory = $true)]
  [string]$ChangedServices
)

Set-StrictMode -Version 3.0
$allSuccess = $true

if ($ChangedServices) {
  $changed = $ChangedServices.Split(" ")

  foreach ($service in $changed) {
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
