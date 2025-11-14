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
    - Requires @azure-tools/js-sdk-release-tools to be available via npx.
    - The tool will analyze git history and package changes to update the changelog.
#>
[CmdletBinding()]
param (
  [Parameter(Mandatory = $true, HelpMessage = "Absolute path to the SDK repository root")]
  [string]$SdkRepoPath,
  
  [Parameter(Mandatory = $true, HelpMessage = "Absolute path to the SDK package directory")]
  [string]$PackagePath
)

# Main execution
try {
  # Validate SDK repository path
  if (-not (Test-Path $SdkRepoPath)) {
    throw "SDK repository path does not exist: $SdkRepoPath"
  }
  
  $resolvedRepoPath = Resolve-Path $SdkRepoPath -ErrorAction Stop
  Write-Host "SDK Repository: $resolvedRepoPath"
  
  # Validate package path
  if (-not (Test-Path $PackagePath)) {
    throw "Package path does not exist: $PackagePath"
  }
  
  $resolvedPackagePath = Resolve-Path $PackagePath -ErrorAction Stop
  Write-Host "Package Path: $resolvedPackagePath"
  Write-Host ""
  
  # Build the npx command
  $npxArgs = @(
    "--yes"
    "--package=@azure-tools/js-sdk-release-tools"
    "--"
    "update-changelog"
    "--sdkRepoPath", "$resolvedRepoPath"
    "--packagePath", "$resolvedPackagePath"
  )
  
  # Run the update-changelog command using npx
  Write-Host "Updating CHANGELOG.md..." -ForegroundColor Green
  Write-Host "Running: npx $($npxArgs -join ' ')" -ForegroundColor Gray
  
  # Execute the npx command
  & npx $npxArgs
  
  if ($LASTEXITCODE -ne 0) {
    throw "update-changelog command failed with exit code $LASTEXITCODE"
  }
  
  Write-Host ""
  Write-Host "CHANGELOG.md update completed successfully!" -ForegroundColor Green
}
catch {
  Write-Host ""
  Write-Host "Update changelog failed: $($_.Exception.Message)" -ForegroundColor Red
  exit 1
}
