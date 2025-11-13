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
[CmdletBinding(SupportsShouldProcess = $true)]
param (
  [Parameter(Mandatory = $true, HelpMessage = "Absolute path to the SDK repository root")]
  [string]$SdkRepoPath,
  
  [Parameter(Mandatory = $true, HelpMessage = "Absolute path to the SDK package directory")]
  [string]$PackagePath,
  
  [Parameter(Mandatory = $true, HelpMessage = "Release type: 'beta' or 'stable'")]
  [ValidateSet('beta', 'stable')]
  [string]$ReleaseType,
  
  [Parameter(Mandatory = $true, HelpMessage = "Version number (e.g., '1.0.0' or '1.0.0-beta.1')")]
  [string]$Version,
  
  [Parameter(Mandatory = $true, HelpMessage = "Release date in YYYY-MM-DD format")]
  [string]$ReleaseDate
)

# Validates that the path contains a valid package
function Get-PackageInfo {
  param (
    [Parameter(Mandatory = $true)]
    [string]$PackagePath
  )
  
  try {
    $resolvedPath = Resolve-Path $PackagePath -ErrorAction Stop
    $packageJsonPath = Join-Path $resolvedPath "package.json"
    
    if (-not (Test-Path $packageJsonPath)) {
      throw "package.json not found at: $packageJsonPath"
    }
    
    Write-Host "Reading package.json from: $packageJsonPath"
    
    $packageJson = Get-Content $packageJsonPath -Raw | ConvertFrom-Json -ErrorAction Stop
    
    if (-not $packageJson.name) {
      throw "'name' field not found in package.json"
    }
    
    return [PSCustomObject]@{
      Name    = $packageJson.name
      Path    = $resolvedPath
      Version = $packageJson.version ?? "unknown"
      SdkType = $packageJson.'sdk-type' ?? "unknown"
    }
  }
  catch {
    Write-Host "Error processing package: $($_.Exception.Message)" -ForegroundColor Red
    throw
  }
}

# Main execution
try {
  # Validate SDK repository path
  if (-not (Test-Path $SdkRepoPath)) {
    throw "SDK repository path does not exist: $SdkRepoPath"
  }
  
  $resolvedRepoPath = Resolve-Path $SdkRepoPath -ErrorAction Stop
  Write-Host "SDK Repository: $resolvedRepoPath"
  
  # Validate and get package information
  $packageInfo = Get-PackageInfo -PackagePath $PackagePath
  
  Write-Host ""
  Write-Host "Package Information:" -ForegroundColor Cyan
  Write-Host "  Name:     $($packageInfo.Name)"
  Write-Host "  Version:  $($packageInfo.Version)"
  Write-Host "  Type:     $($packageInfo.SdkType)"
  Write-Host "  Path:     $($packageInfo.Path)"
  Write-Host ""
  Write-Host "Version Update Information:" -ForegroundColor Cyan
  Write-Host "  Release Type: $ReleaseType"
  Write-Host "  New Version:  $Version"
  Write-Host "  Release Date: $ReleaseDate"
  Write-Host ""
  
  # Run the update-version command using npx
  Write-Host "Updating package version..." -ForegroundColor Green
  Write-Host "Running: npx --yes --package=@azure-tools/js-sdk-release-tools -- update-version --sdkRepoPath `"$resolvedRepoPath`" --packagePath `"$($packageInfo.Path)`" --releaseType `"$ReleaseType`" --version `"$Version`" --releaseDate `"$ReleaseDate`"" -ForegroundColor Gray
  
  # Execute the npx command
  npx --yes --package=@azure-tools/js-sdk-release-tools -- update-version --sdkRepoPath "$resolvedRepoPath" --packagePath "$($packageInfo.Path)" --releaseType "$ReleaseType" --version "$Version" --releaseDate "$ReleaseDate"
  
  if ($LASTEXITCODE -ne 0) {
    throw "update-version command failed with exit code $LASTEXITCODE"
  }
  
  Write-Host ""
  Write-Host "Package version update completed successfully!" -ForegroundColor Green
  
  # Show updated files
  $packageJsonPath = Join-Path $packageInfo.Path "package.json"
  $changelogPath = Join-Path $packageInfo.Path "CHANGELOG.md"
  
  Write-Host "Updated files:" -ForegroundColor Cyan
  if (Test-Path $packageJsonPath) {
    Write-Host "  - $packageJsonPath" -ForegroundColor Cyan
  }
  if (Test-Path $changelogPath) {
    Write-Host "  - $changelogPath" -ForegroundColor Cyan
  }
}
catch {
  Write-Host ""
  Write-Host "Update version failed: $($_.Exception.Message)" -ForegroundColor Red
  exit 1
}
