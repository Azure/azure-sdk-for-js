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


npm install "@rushstack/node-core-library@5.9.0"
npm install "js-tokens@9.0.0"
npm install "@microsoft/api-extractor-model@7.29.8"
$apiviewParser = "@azure-tools/ts-genapi@2.0.3"
Write-Host "Installing $($apiviewParser)"
npm install $apiviewParser --registry $NpmDevopsFeedRegistry
$installedPath = npm ls @azure-tools/ts-genapi -p
if (!(Test-Path -Path $installedPath))
{
  Write-Host "@Azure-tools/ts-genapi is not installed to $($installedPath)"
  exit 1
}

Write-Host "Setting working directory to $($installedPath)"
Set-Location $installedPath

$apiFiles = @(Get-ChildItem -Path $ArtifactPath -Recurse -Filter "*.api.json")
foreach ($apiPkgFile in $apiFiles)
{
  $apiFilePath = $apiPkgFile.FullName
  $FileName = Split-Path -Leaf $apiFilePath
  $OutDirectory = Split-Path -Path $apiFilePath
  $OutFileName = "$($FileName.split('_')[0])_js.json"
  $OutFilePath = Join-Path -Path $OutDirectory $OutFileName
  Write-Host "Converting api-extractor file $($apiFilePath) to APIview code file $($OutFilePath)"
  node ./dist/export.js $apiFilePath $OutFilePath
}
