<#
.SYNOPSIS
    Builds a specific Azure SDK package using pnpm and turbo.

.DESCRIPTION
    This script validates the package path, installs workspace dependencies, and builds 
    the specified Azure SDK package using the turbo build system.

.PARAMETER PackagePath
    The absolute path to the SDK package directory. Must contain a valid package.json file.

.EXAMPLE
    .\build-sdk.ps1 -PackagePath "C:\repo\azure-sdk-for-js\sdk\storage\storage-blob"
    
    Builds the storage-blob package with dependency installation.

.NOTES
    Requires pnpm and turbo to be installed and available in PATH.
    Should be run from the Azure SDK for JS repository root or with absolute paths.
#>

# Build a specific Azure SDK package using pnpm
# This script validates the package path, installs dependencies, and builds the package

[CmdletBinding(SupportsShouldProcess = $true)]
param (
  [Parameter(Mandatory = $true, HelpMessage = "Absolute path to the SDK package directory")]
  [string]$PackagePath
)


# Validates package path and extracts package information
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
    }
  }
  catch {
    Write-Host "Error processing package: $($_.Exception.Message)"
    throw
  }
}

# Main execution
try {
  # Extract package information
  $packageInfo = Get-PackageInfo -PackagePath $PackagePath
  
  Write-Host "Building package: $($packageInfo.Name) (v$($packageInfo.Version))"
  Write-Host "Package path: $($packageInfo.Path)"
    
  try {
    # Install dependencies
    Write-Host "Installing dependencies..."
    pnpm install
    if ($LASTEXITCODE -ne 0) {
      throw "pnpm install failed with exit code $LASTEXITCODE"
    }
    Write-Host "Dependencies installed successfully"
    
    # Build the package
    Write-Host "Building package with turbo..."
    pnpm turbo build --token 1
    if ($LASTEXITCODE -ne 0) {
      throw "pnpm turbo build failed with exit code $LASTEXITCODE"
    }
    
    Write-Host "Build completed successfully!"
  }
  finally {
    Pop-Location
  }
}
catch {
  Write-Host "Build failed: $($_.Exception.Message)"
  exit 1
}
