<#
.SYNOPSIS
    Updates the version for a specific Azure SDK package.
.DESCRIPTION
    This script updates the package version by invoking the update-version 
    command from @azure-tools/js-sdk-release-tools.
    
    The script validates the package path and runs the version update tool.
.PARAMETER SdkRepoPath
    The absolute path to the root folder of the local SDK repository.
.PARAMETER PackagePath
    The absolute path to the root folder of the local SDK project (package).
    Must contain a valid package.json file.
.PARAMETER ReleaseType
    The type of release: 'beta' or 'stable'.
.PARAMETER Version
    The version number to set (e.g., '1.0.0' or '1.0.0-beta.1').
.PARAMETER ReleaseDate
    The release date in YYYY-MM-DD format.
.EXAMPLE
    .\update-version.ps1 `
        -SdkRepoPath "D:\GithubSource\tmpSource\azure-sdk-for-js" `
        -PackagePath "D:\GithubSource\tmpSource\azure-sdk-for-js\sdk\storage\arm-storage" `
        -ReleaseType "stable" `
        -Version "1.0.0" `
        -ReleaseDate "2025-11-13"
    
    Updates the version for the arm-storage package.
.NOTES
    - Requires @azure-tools/js-sdk-release-tools to be available via npx.
    - The tool will update package.json and CHANGELOG.md with the new version.
#>
[CmdletBinding()]
param (
  [Parameter(Mandatory = $true, HelpMessage = "Absolute path to the SDK repository root")]
  [string]$SdkRepoPath,
  
  [Parameter(Mandatory = $true, HelpMessage = "Absolute path to the SDK package directory")]
  [string]$PackagePath,
  
  [Parameter(Mandatory = $false, HelpMessage = "Release type: 'beta' or 'stable'")]
  [ValidateSet('beta', 'stable')]
  [string]$ReleaseType,
  
  [Parameter(Mandatory = $false, HelpMessage = "Version number (e.g., '1.0.0' or '1.0.0-beta.1')")]
  [string]$Version,
  
  [Parameter(Mandatory = $false, HelpMessage = "Release date in YYYY-MM-DD format")]
  [string]$ReleaseDate
)

# Validate that at least one of ReleaseType or Version is provided
if (-not $ReleaseType -and -not $Version) {
  Write-Host "Error: Either -ReleaseType or -Version must be provided" -ForegroundColor Red
  exit 1
}

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
  
  # Build the npx command with optional parameters
  $npxArgs = @(
    "--yes"
    "--package=@azure-tools/js-sdk-release-tools"
    "--"
    "update-version"
    "--sdkRepoPath", "$resolvedRepoPath"
    "--packagePath", "$resolvedPackagePath"
  )
  
  if ($ReleaseType) {
    $npxArgs += "--releaseType", "$ReleaseType"
  }
  
  if ($Version) {
    $npxArgs += "--version", "$Version"
  }
  
  if ($ReleaseDate) {
    $npxArgs += "--releaseDate", "$ReleaseDate"
  }
  
  # Run the update-version command using npx
  Write-Host "Updating package version..." -ForegroundColor Green
  Write-Host "Running: npx $($npxArgs -join ' ')" -ForegroundColor Gray
  
  # Execute the npx command
  & npx $npxArgs
  
  if ($LASTEXITCODE -ne 0) {
    throw "update-version command failed with exit code $LASTEXITCODE"
  }
  
  Write-Host ""
  Write-Host "Package version update completed successfully!" -ForegroundColor Green
}
catch {
  Write-Host ""
  Write-Host "Update version failed: $($_.Exception.Message)" -ForegroundColor Red
  exit 1
}
