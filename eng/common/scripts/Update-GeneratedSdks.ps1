[CmdLetBinding()]
param(
  [Parameter(Mandatory)]
  [string]$PackageDirectoriesFile
)

Write-Host "Running common.ps1 from path: $PSScriptRoot/common.ps1"
. $PSScriptRoot/common.ps1

Write-Host "Running CommandInvocation-Helpers.ps1 from path: $PSScriptRoot/Helpers/CommandInvocation-Helpers.ps1"
. $PSScriptRoot/Helpers/CommandInvocation-Helpers.ps1


Write-Host "Running automation_init.sh..."
bash ".scripts/automation_init.sh"


Write-Host "Running automation_generate.sh..."
bash ".scripts/automation_generate.sh"

$ErrorActionPreference = 'Stop'

if (Test-Path "Function:$UpdateGeneratedSdksFn") {
    &$UpdateGeneratedSdksFn $PackageDirectoriesFile
} else {
    Write-Error "Function $UpdateGeneratedSdksFn not implemented in Language-Settings.ps1"
}
