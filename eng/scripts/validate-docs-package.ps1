<#
.SYNOPSIS
Validates packages by simulating docs CI steps

.PARAMETER Package
An object describing a package configuration to validate in the format used by
docker image, which is the wrapping of docs CI build commands.
Required attributes: 
  - name: The name of the package
  Supported optional attributes:
  - registry: The registry to use for the package if it's not NPM
Example: 
```
@{
  name = "@azure/attestation@dev";
  folder = "./types";
  registry = "<url>";
  ...
}
.PARAMETER DocValidationImageId
The image name for package validation in format of '$containerRegistry/$imageName:$tag'. 
e.g. azuresdkimages.azurecr.io/jsrefautocr:latest

.PARAMETER WorkingDirectory
Supplied to `npm install ... --prefix $WorkingDirectory`. The place where the 
node_modules folder is created and the package is installed
#>

param(
  [object] $Package,
  [string] $DocValidationImageId,
  [string] $WorkingDirectory
)
."$PSScriptRoot\..\common\scripts\common.ps1"

function GetResult($success, $package, $output) { 
  return @{ Success = $success; Package = $package; Output = $output }
}
function FallbackValidation() {
  $additionalParameters = @()
  $prefixDirectory = New-Item -ItemType Directory -Force -Path "$WorkingDirectory\$($Package.name)"
  if ($Package.registry) {
    Write-Host $Package.registry
    $additionalParameters += @("--registry", $Package.registry)
  }

  Write-Host "npm install $($Package.name) --prefix $prefixDirectory $additionalParameters"
  $installOutput = npm install $Package.name --prefix $prefixDirectory @additionalParameters 2>&1
  if ($LASTEXITCODE -ne 0) {
    LogWarning "Package install failed: $($Package.name)"
    return GetResult $false $Package $installOutput
  }
  return GetResult $true $Package $installOutput
}
function DockerValidation() {
  $registry = " -e TARGET_REGISTRY=`'$($Package.registry)`'"
  $folder = " -e TARGET_FOLDER=`'$($Package.folder)`'"
  $commandLine = "docker run --restart=on-failure:3 -e TARGET_PACKAGE='$($Package.name)'"
  if ("$($Package.registry)") {
    $commandLine = "$commandLine$registry"
  }
  if ("$($Package.folder)") {
    $commandLine = "$commandLine$folder"
  }
  $commandLine = "$commandLine $DocValidationImageId 2>&1"
  $installOutput = Invoke-Expression $commandLine

  # The docker exit codes: https://docs.docker.com/engine/reference/run/#exit-status
  # If the docker failed because of docker itself instead of the application, 
  # we should skip the validation and keep the packages. 
  if ($LASTEXITCODE -eq 125 -Or $LASTEXITCODE -eq 126 -Or $LASTEXITCODE -eq 127) { 
    Write-Host $commandLine
    LogWarning "The `docker` command does not work with exit code $LASTEXITCODE. Fall back to npm install $($Package.name) directly."
    FallbackValidation
  }
  elseif ($LASTEXITCODE -ne 0) { 
    Write-Host $commandLine
    LogWarning "Package $($Package.name) ref docs validation failed."
    return GetResult $false $Package $installOutput
  }
  return GetResult $true $Package $installOutput
}


if (!$DocValidationImageId) {
  FallbackValidation
} 
else {
  DockerValidation
}
