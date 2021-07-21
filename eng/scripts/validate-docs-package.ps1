<#
.SYNOPSIS
Validates packages by simulating docs CI steps

.PARAMETER Package
An object describing a package configuration to validate in the format used by
docs CI onboarding format.

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
```

.PARAMETER WorkingDirectory
Supplied to `npm install ... --prefix $WorkingDirectory`. The place where the 
node_modules folder is created and the package is installed
#>

param(
  [object] $Package,
  [string] $WorkingDirectory
)
."$PSScriptRoot\..\common\scripts\common.ps1"

function GetResult($success, $package, $output) { 
  return @{ Success = $success; Package = $package; Output = $output }
}

$additionalParameters = @()
if ($Package.registry) {
  Write-Host $Package.registry
  $additionalParameters += @("--registry", $Package.registry)
}

Write-Host "npm install $($Package.name) --prefix $WorkingDirectory $additionalParameters"
$installOutput = npm install $Package.name --prefix $WorkingDirectory @additionalParameters 2>&1
if ($LASTEXITCODE -ne 0) {
  LogWarning "Package install failed: $($Package.name)"
  return GetResult $false $package $installOutput
}

return GetResult $true $package $installOutput
