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
  
  # Run the update-changelog command using npx
  Write-Host "Updating CHANGELOG.md..." -ForegroundColor Green
  Write-Host "Running: npx --yes --package=@azure-tools/js-sdk-release-tools -- update-changelog --sdkRepoPath `"$resolvedRepoPath`" --packagePath `"$($packageInfo.Path)`"" -ForegroundColor Gray
  
  # Execute the npx command
  npx --yes --package=@azure-tools/js-sdk-release-tools -- update-changelog --sdkRepoPath "$resolvedRepoPath" --packagePath "$($packageInfo.Path)"
  
  if ($LASTEXITCODE -ne 0) {
    throw "update-changelog command failed with exit code $LASTEXITCODE"
  }
  
  Write-Host ""
  Write-Host "CHANGELOG.md update completed successfully!" -ForegroundColor Green
  
  # Check if CHANGELOG.md exists and show its location
  $changelogPath = Join-Path $packageInfo.Path "CHANGELOG.md"
  if (Test-Path $changelogPath) {
    Write-Host "Updated changelog at: $changelogPath" -ForegroundColor Cyan
  }
}
catch {
  Write-Host ""
  Write-Host "Update changelog failed: $($_.Exception.Message)" -ForegroundColor Red
  exit 1
}
