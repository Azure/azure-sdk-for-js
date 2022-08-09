param (
  [Parameter(mandatory = $true)]
  $ArtifactPath,
  $NpmDevopsFeedRegistry = "https://pkgs.dev.azure.com/azure-sdk/public/_packaging/azure-sdk-for-js/npm/registry/"
)

Set-StrictMode -Version 3
if (!(Test-Path -Path $ArtifactPath))
{
  Write-Error "Incorrect path to api-extractor artifacts. Path: $($ArtifactPath)"
  exit 1
}

$apiviewParser = "@azure-tools/ts-genapi@1.0.2"
# Find and install dependencies from public npm registry
$deps = npm view $apiviewParser --registry $NpmDevopsFeedRegistry dependencies
if ($deps)
{
  $deps = $deps.replace("{", "").replace("}","").replace(" ", "").replace("'", "").replace(":", "@").split(",")
  foreach ($d in $deps)
  {
    Write-Host "Instaling $($d)"
    npm install $d
  }
}
Write-Host "Installing $($apiviewParser)"
New-Item -Path "./node_modules" -Directory
npm install $apiviewParser --registry $NpmDevopsFeedRegistry
$installedPath = Join-Path -Path "." "node_modules/@azure-tools/ts-genapi"
if (!(Test-Path -Path $installedPath))
{
  Write-Host "@Azure-tools/ts-genapi is not installed to $($installedPath)"
  exit 1
}

Write-Host "Setting working directory to $($installedPath)"
Set-Location $installedPath
npm run-script build

$apiFiles = Get-ChildItem -Path $ArtifactPath -Recurse -Filter "*.api.json"
foreach ($apiPkgFile in $apiFiles)
{
  $apiFilePath = $apiPkgFile.FullName
  $FileName = Split-Path -Leaf $apiFilePath
  $OutDirectory = Split-Path -Path $apiFilePath
  $OutFileName = $FileName -replace ".api.json", ".codefile.json"
  $OutFilePath = Join-Path -Path $OutDirectory $OutFileName
  Write-Host "Converting api-extractor file $($apiFilePath) to APIview code file $($OutFilePath)"
  node ./export.js $apiFilePath $OutFilePath
}
