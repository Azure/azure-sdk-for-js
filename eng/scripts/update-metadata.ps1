#Requires -Version 7.0
<#
.SYNOPSIS
    Updates the metadata for a specific Azure SDK package.
.DESCRIPTION
  This script updates the package metadata by invoking the generate-ci-yaml
  command from the internal local source tool under eng/tools/js-sdk-release-tools.
    
    The script validates the package path and runs the metadata update tool.
.PARAMETER SdkRepoPath
    The absolute path to the root folder of the local SDK repository.
.PARAMETER PackagePath
    The absolute path to the root folder of the local SDK project (package).
    Must contain a valid package.json file.
.EXAMPLE
    .\update-metadata.ps1 `
        -SdkRepoPath "D:\GithubSource\tmpSource\azure-sdk-for-js" `
        -PackagePath "D:\GithubSource\tmpSource\azure-sdk-for-js\sdk\storage\arm-storage"
    
    Updates the metadata for the arm-storage package.
.NOTES
  - Uses the internal source tool in eng/tools/js-sdk-release-tools.
    - The tool will generate or update CI YAML configuration for the package.
#>
[CmdletBinding()]
param (
  [Parameter(Mandatory = $true, HelpMessage = "Absolute path to the SDK repository root")]
  [string]$SdkRepoPath,
  
  [Parameter(Mandatory = $true, HelpMessage = "Absolute path to the SDK package directory")]
  [string]$PackagePath
)

# Import common helpers
. (Join-Path $PSScriptRoot ".." "common" "scripts" "Helpers" "CommandInvocation-Helpers.ps1")

# Main execution
try {
  # Validate SDK repository path
  if (-not (Test-Path $SdkRepoPath)) {
    throw "SDK repository path does not exist: $SdkRepoPath"
  }
  
  # Validate package path
  if (-not (Test-Path $PackagePath)) {
    throw "Package path does not exist: $PackagePath"
  }

  Push-Location $SdkRepoPath
  
  # Use the local internal source tree instead of a published package.
  $releaseToolsPath = "eng\tools\js-sdk-release-tools"
  if (-not (Test-Path $releaseToolsPath)) {
    throw "Release tools path does not exist: $releaseToolsPath"
  }
  
  Write-Host "Installing local js-sdk-release-tools dependencies..." -ForegroundColor Cyan
  Invoke-LoggedCommand "npm --prefix $releaseToolsPath ci"
  Write-Host ""

  Write-Host "Building local js-sdk-release-tools..." -ForegroundColor Cyan
  Invoke-LoggedCommand "npm --prefix $releaseToolsPath run build"
  Write-Host ""

  # Run the generate-ci-yaml command using npm exec
  Write-Host "Creating or updating CI files..." -ForegroundColor Cyan
  Write-Host ""
  $command = "npm --prefix $releaseToolsPath exec --no -- generate-ci-yaml --sdkRepoPath `"$SdkRepoPath`" --packagePath `"$PackagePath`""
  Invoke-LoggedCommand $command

  # Additional commands can be added here if needed
  
  Write-Host ""
  Write-Host "Package metadata update completed successfully!" -ForegroundColor Green
}
catch {
  Write-Host ""
  Write-Error "Update metadata failed: $($_.Exception.Message)" -ForegroundColor Red
  exit 1
}
finally {
  Pop-Location
}
