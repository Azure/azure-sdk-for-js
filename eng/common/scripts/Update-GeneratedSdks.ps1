[CmdLetBinding()]
param(
  [Parameter(Mandatory)]
  [string]$PackageDirectoriesFile
)

. $PSScriptRoot/common.ps1
. $PSScriptRoot/Helpers/CommandInvocation-Helpers.ps1

Write-Host "Running automation_init.sh"
Invoke-LoggedCommand "sh $RepoRoot/.scripts/automation_init.sh" -GroupOutput

#$ErrorActionPreference = 'Stop'

if (Test-Path "Function:$UpdateGeneratedSdksFn") {
    &$UpdateGeneratedSdksFn $PackageDirectoriesFile
} else {
    Write-Error "Function $UpdateGeneratedSdksFn not implemented in Language-Settings.ps1"
}
