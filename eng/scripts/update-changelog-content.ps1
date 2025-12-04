#Requires -Version 7.0
<#
.SYNOPSIS
    Updates the CHANGELOG.md for a specific Azure SDK package.
.DESCRIPTION
    This script updates the CHANGELOG.md file by invoking the update-changelog-content 
    command from @azure-tools/js-sdk-release-tools.
    
    The script validates the package path and runs the changelog update tool.
.PARAMETER SdkRepoPath
    The absolute path to the root folder of the local SDK repository.
.PARAMETER PackagePath
    The absolute path to the root folder of the local SDK project (package).
    Must contain a valid package.json file.
.EXAMPLE
    .\update-changelog-content.ps1 `
        -SdkRepoPath "D:\GithubSource\tmpSource\azure-sdk-for-js" `
        -PackagePath "D:\GithubSource\tmpSource\azure-sdk-for-js\sdk\storage\arm-storage"
    
    Updates the CHANGELOG.md for the arm-storage package.
.NOTES
    - Requires js-sdk-release-tools to be installed in eng/tools/js-sdk-release-tools.
    - The tool will analyze git history and package changes to update the changelog.
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
  
  # Install js-sdk-release-tools if needed
  $releaseToolsPath = "eng\tools\js-sdk-release-tools"
  if (-not (Test-Path $releaseToolsPath)) {
    throw "Release tools path does not exist: $releaseToolsPath"
  }
  
  Write-Host "Installing js-sdk-release-tools dependencies..." -ForegroundColor Cyan
  Invoke-LoggedCommand "npm --prefix $releaseToolsPath ci"
  Write-Host ""
  
 
  # Run the update-changelog command using npm exec
  Write-Host "Updating CHANGELOG.md..." -ForegroundColor Cyan
  Write-Host ""
  $command = "npm --prefix $releaseToolsPath exec --no -- update-changelog -- --sdkRepoPath `"$SdkRepoPath`" --packagePath `"$PackagePath`""
  Invoke-LoggedCommand $command
  
  Write-Host ""
  Write-Host "CHANGELOG.md update completed successfully!" -ForegroundColor Green
}
catch {
  Write-Host ""
  Write-Host "Update changelog failed: $($_.Exception.Message)" -ForegroundColor Red
  exit 1
}
finally {
  Pop-Location
}
