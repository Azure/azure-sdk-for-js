param (
  [Parameter(mandatory = $true)]
  $ArtifactPath,
  $ToolsRepoPath = "https://github.com/Azure/azure-sdk-tools.git",
  $ToolsRepoBranch = "main"
)

Set-StrictMode -Version 3
if (!(Test-Path -Path $ArtifactPath))
{
  Write-Error "Incorrect path to api-extractor artifacts. Path: $($ArtifactPath)"
  exit 1
}

# Create a temporary directory for cloning the tools repo
$tempDir = Join-Path -Path ([System.IO.Path]::GetTempPath()) "azure-sdk-tools-$(Get-Random)"
$originalLocation = Get-Location
Write-Host "Cloning azure-sdk-tools to temporary directory: $tempDir"

try {
  # Clone only the specific directory we need (sparse checkout for efficiency)
  git clone --depth 1 --branch $ToolsRepoBranch --filter=blob:none --sparse $ToolsRepoPath $tempDir
  if ($LASTEXITCODE -ne 0) {
    throw "Failed to clone azure-sdk-tools repository"
  }

  Set-Location $tempDir
  git sparse-checkout set tools/apiview/parsers/js-api-parser
  if ($LASTEXITCODE -ne 0) {
    throw "Failed to sparse checkout js-api-parser"
  }

  $parserPath = Join-Path -Path $tempDir "tools" "apiview" "parsers" "js-api-parser"
  if (!(Test-Path -Path $parserPath)) {
    throw "js-api-parser directory not found at $parserPath"
  }

  Write-Host "Building ts-genapi from source..."
  Set-Location $parserPath

  # Install dependencies
  Write-Host "Installing dependencies..."
  npm install
  if ($LASTEXITCODE -ne 0) {
    throw "Failed to install dependencies"
  }

  # Build the package
  Write-Host "Building package..."
  npm run build
  if ($LASTEXITCODE -ne 0) {
    throw "Failed to build ts-genapi"
  }

  $exportPath = Join-Path -Path $parserPath "dist" "src" "export.js"
  if (!(Test-Path -Path $exportPath)) {
    throw "ts-genapi export script not found at $exportPath after build"
  }

  Write-Host "Successfully built ts-genapi at $parserPath"

  $apiFiles = @(Get-ChildItem -Path $ArtifactPath -Recurse -Filter "*.api.json")
  foreach ($apiPkgFile in $apiFiles)
  {
    $apiFilePath = $apiPkgFile.FullName
    $FileName = Split-Path -Leaf $apiFilePath
    $OutDirectory = Split-Path -Path $apiFilePath
    $OutFileName = "$($FileName.split('_')[0])_js.json"
    $OutFilePath = Join-Path -Path $OutDirectory $OutFileName
    Write-Host "Converting api-extractor file $($apiFilePath) to APIview code file $($OutFilePath)"
    node $exportPath $apiFilePath $OutFilePath
  }
}
finally {
  # Restore original location
  Set-Location $originalLocation
  
  # Clean up temporary directory
  if (Test-Path -Path $tempDir) {
    Write-Host "Cleaning up temporary directory: $tempDir"
    Remove-Item -Path $tempDir -Recurse -Force -ErrorAction SilentlyContinue
  }
}
