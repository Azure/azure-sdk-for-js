<#
.SYNOPSIS
Checks that samples can be published successfully using dev-tool samples publish command.

.DESCRIPTION
Iterates through packages in the PackageInfo directory and runs dev-tool samples publish
for each package that has a samples-dev directory. This ensures all samples are publishable
before they are merged to the main branch.

.PARAMETER PackageInfoPath
Path to the directory containing package info JSON files.

.EXAMPLE
eng/scripts/check-samples-publish.ps1 -PackageInfoPath $(Build.ArtifactStagingDirectory)/PackageInfo

#>
[CmdletBinding()]
param (
  [Parameter(Mandatory = $true)]
  [string]$PackageInfoPath
)

Set-StrictMode -Version 3.0
$ErrorActionPreference = 'Stop'

$allSuccess = $true
$checkedCount = 0
$skippedCount = 0

Write-Host "Checking samples publishability for packages in: $PackageInfoPath"

if (-not (Test-Path $PackageInfoPath)) {
  Write-Warning "PackageInfo path does not exist: $PackageInfoPath"
  Write-Warning "Skipping samples publish check."
  exit 0
}

# Get all package info files
$packageInfoFiles = @(Get-ChildItem -Path $PackageInfoPath -Filter "*.json")

if ($packageInfoFiles.Length -eq 0) {
  Write-Warning "No package info files found in: $PackageInfoPath"
  Write-Warning "Skipping samples publish check."
  exit 0
}

foreach ($packageInfoFile in $packageInfoFiles) {
  $packageInfo = Get-Content -Path $packageInfoFile.FullName -Raw | ConvertFrom-Json
  
  # Handle both absolute and relative paths
  if ([System.IO.Path]::IsPathRooted($packageInfo.DirectoryPath)) {
    $packageDir = $packageInfo.DirectoryPath
  } else {
    $packageDir = Join-Path $PSScriptRoot "../.." $packageInfo.DirectoryPath
  }
  
  $samplesDevDir = Join-Path $packageDir "samples-dev"
  
  Write-Host ""
  Write-Host "Checking package: $($packageInfo.Name)"
  Write-Host "  Package directory: $packageDir"
  
  # Check if package has samples-dev directory
  if (-not (Test-Path $samplesDevDir)) {
    Write-Host "  No samples-dev directory found. Skipping."
    $skippedCount++
    continue
  }
  
  Write-Host "  Found samples-dev directory. Running dev-tool samples publish..."
  
  # Create a temporary output directory for the publish check
  $tempOutputDir = Join-Path ([System.IO.Path]::GetTempPath()) "samples-publish-check-$([Guid]::NewGuid())"
  
  try {
    # Run dev-tool samples publish
    Push-Location $packageDir
    
    # Capture all output (stdout and stderr)
    $output = & npx dev-tool samples publish --output-path $tempOutputDir 2>&1 | Out-String
    $exitCode = $LASTEXITCODE
    
    if ($exitCode -ne 0) {
      Write-Host "  ✗ Failed to publish samples for $($packageInfo.Name)" -ForegroundColor Red
      Write-Host "  Output:"
      Write-Host $output
      $allSuccess = $false
    } else {
      Write-Host "  ✓ Successfully validated samples can be published"
      $checkedCount++
    }
  }
  catch {
    Write-Host "  ✗ Exception while checking samples for $($packageInfo.Name): $_" -ForegroundColor Red
    $allSuccess = $false
  }
  finally {
    Pop-Location
    
    # Clean up temporary directory
    if (Test-Path $tempOutputDir) {
      Remove-Item -Path $tempOutputDir -Recurse -Force -ErrorAction SilentlyContinue
    }
  }
}

Write-Host ""
Write-Host "=========================================="
Write-Host "Samples Publish Check Summary:"
Write-Host "  Packages checked: $checkedCount"
Write-Host "  Packages skipped (no samples-dev): $skippedCount"

if (-not $allSuccess) {
  Write-Host "  Result: ✗ One or more packages failed the samples publish check" -ForegroundColor Red
  Write-Host "=========================================="
  Write-Host ""
  Write-Host "##vso[task.logissue type=error]One or more packages failed the samples publish check. See above output for details."
  exit 1
}

Write-Host "  Result: All samples are publishable ✓"
Write-Host "=========================================="
exit 0
