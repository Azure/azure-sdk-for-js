# Build a specific Azure SDK package using pnpm
# This script validates the package path, installs dependencies, and builds the package

[CmdletBinding(SupportsShouldProcess = $true)]
param (
  [Parameter(Mandatory = $true)]
  [string]$packagePath
)

# Validates package path and extracts package information
function Get-PackageInfo {
  param (
    [Parameter(Mandatory = $true)]
    [string]$packagePath
  )
  
  $resolvedPath = Resolve-Path $packagePath

  if (-not (Test-Path $resolvedPath)) {
    Write-Host "Error: The specified path does not exist: $resolvedPath"
    exit 1
  }

  $packageJsonPath = Join-Path $resolvedPath "package.json"

  if (-not (Test-Path $packageJsonPath)) {
    Write-Host "Error: package.json file not found at: $packageJsonPath"
    exit 1
  }

  try {
    $packageJson = Get-Content $packageJsonPath | ConvertFrom-Json
  }
  catch {
    Write-Host "Error: Unable to parse the $packageJsonPath file. Please check the file format."
    exit 1
  }

  if (-not $packageJson.PSObject.Properties["name"]) {
    Write-Host "Error: 'name' field not found in package.json"
    exit 1
  }

  return @{
    Name = $packageJson.name
    Path = $resolvedPath
  }
}

# Extract package information and prepare for build
$packageInfo = Get-PackageInfo -packagePath $packagePath
$packageName = $packageInfo.Name

Write-Host "Building package: $packageName"

# Install dependencies
Write-Host "Installing dependencies..."
try {
  pnpm install
  if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: pnpm install failed with exit code $LASTEXITCODE"
    exit $LASTEXITCODE
  }
  Write-Host "Dependencies installed successfully"
}
catch {
  Write-Host "Error: Failed to install dependencies"
  exit 1
}

# Execute build command
try {
  $command = "pnpm build --filter=$packageName..."
  Write-Host "Executing command: $command"
  
  Invoke-Expression $command
  
  if ($LASTEXITCODE -eq 0) {
    Write-Host "Build succeeded!"
    exit 0
  } else {
    Write-Host "Error: Build failed with exit code $LASTEXITCODE"
    exit $LASTEXITCODE
  }
}
catch {
  Write-Host "Error: Build failed. Please check the pnpm command or package configuration."
  exit 1
}
