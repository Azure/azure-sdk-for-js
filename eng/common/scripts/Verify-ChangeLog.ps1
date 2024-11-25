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

# todo: revert this temp change

exit 0
