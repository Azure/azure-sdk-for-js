[CmdletBinding()]
param (
  [Parameter(Mandatory = $true)]
  [string]$PackagePath
)

$packagePaths = Get-ChildItem -Path "$PackagePath/*/package.json"

foreach ($packagePath in $packagePaths) {
  $pkgContent = Get-Content $packagePath | ConvertFrom-Json
  foreach ($dependency in $pkgContent.dependencies.PSObject.properties) {
    $depVer = $dependency.Value
    if ($depVer -match "\D0.\d.\d") {
      throw "Found dependency on preview package $($dependency.Name) with version range $depVer. Please pin dependencies to preview packages."
    }
  }
}
