<#
.SYNOPSIS
Validates packages by simulating docs CI steps

.PARAMETER Package
An object describing a package configuration to validate in the format used by
docker image, which is the wrapping of docs CI build commands.

#>

param(
  [object] $Package
)
."$PSScriptRoot\..\common\scripts\common.ps1"

function GetResult($success, $package, $output) { 
  return @{ Success = $success; Package = $package; Output = $output }
}

Write-Host "docker run -e TARGET_PACKAGE="$($Package.name)" azuresdkimages.azurecr.io/jsrefautocr:latest"
$installOutput = docker run -e TARGET_PACKAGE="$($Package.name)" azuresdkimages.azurecr.io/jsrefautocr:latest 2>&1
if ($LASTEXITCODE -ne 0) {
  LogWarning "Package install failed: $($Package.name)"
  return GetResult $false $package $installOutput
}

return GetResult $true $package $installOutput
