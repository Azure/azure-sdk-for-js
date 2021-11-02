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
#>

param(
  [object] $Package,
  [string] $DocValidationImageId
)
."$PSScriptRoot\..\common\scripts\common.ps1"

function GetResult($success, $package, $output) { 
  return @{ Success = $success; Package = $package; Output = $output }
}
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
  LogWarning "The `docker` command does not work with exit code $LASTEXITCODE. Skipvalidation of $($Package.name)."
}
elseif ($LASTEXITCODE -ne 0) { 
  Write-Host $commandLine
  LogWarning "Package $($Package.name) ref docs validation failed."
  return GetResult $false $package $installOutput
}
return GetResult $true $package $installOutput
