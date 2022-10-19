# Wrapper Script for ChangeLog Verification
[CmdletBinding()]
param (
  [String]$ChangeLogLocation,
  [String]$VersionString,
  [string]$PackageName,
  [string]$ServiceDirectory,
  [boolean]$ForRelease = $False
)
Set-StrictMode -Version 3

. (Join-Path $PSScriptRoot common.ps1)

$validChangeLog = $false
if ($ChangeLogLocation -and $VersionString)
{
  $validChangeLog = Confirm-ChangeLogEntry -ChangeLogLocation $ChangeLogLocation -VersionString $VersionString -ForRelease $ForRelease
}
else
{
  $PackageProp = Get-PkgProperties -PackageName $PackageName -ServiceDirectory $ServiceDirectory
  LogDebug "Debugging [${PackageName}]."
  LogDebug "Debugging [${ServiceDirectory}]."
   LogDebug "Debugging [${PackageProp}]."
  $validChangeLog = Confirm-ChangeLogEntry -ChangeLogLocation $PackageProp.ChangeLogPath -VersionString $PackageProp.Version -ForRelease $ForRelease
}

if (!$validChangeLog)
{
  exit 1
}

exit 0
