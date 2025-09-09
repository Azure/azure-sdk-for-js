# Build a package using pnpm by reading the package.json and executing the build command.
param (
  [string]$packagePath  # Path to the package (absolute or relative)
)

# Resolve the path to an absolute path
$resolvedPath = Resolve-Path $packagePath

# Check if the specified path exists
if (-not (Test-Path $resolvedPath)) {
  Write-Host "Error: The specified path does not exist: $resolvedPath"
  exit 1  # If the path doesn't exist, return 1 (failure)
}

# Construct the path to package.json
$packageJsonPath = Join-Path $resolvedPath "package.json"

# Check if package.json exists at the given path
if (-not (Test-Path $packageJsonPath)) {
  Write-Host "Error: package.json file not found at: $packageJsonPath"
  exit 1  # If package.json doesn't exist, return 1 (failure)
}

# Read the contents of package.json
try {
  $packageJson = Get-Content $packageJsonPath | ConvertFrom-Json
}
catch {
  Write-Host "Error: Unable to parse the $packageJsonPath file. Please check the file format."
  exit 1  # If reading or parsing fails, return 1 (failure)
}

# Check if the 'name' field exists in package.json
if (-not $packageJson.PSObject.Properties["name"]) {
  Write-Host "Error: 'name' field not found in package.json"
  exit 1  # If 'name' field is missing, return 1 (failure)
}

# Extract the package name from the 'name' field
$packageName = $packageJson.name
Write-Host "Building package: $packageName"

# Execute the pnpm build command with the package name as a filter
try {
  # Run the pnpm build command with the specified package name
  $command = "pnpm run build --filter=$packageName..."
  Write-Host "Executing command: $command"
  & $command  # Run the command

  # If the build command succeeds, return 0 (success)
  Write-Host "Build succeeded!"
  exit 0
}
catch {
  Write-Host "Error: Build failed. Please check the pnpm command or package configuration."
  exit 1  # If build fails, return 1 (failure)
}
