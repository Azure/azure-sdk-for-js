[CmdletBinding()]
param (
  [Parameter(Mandatory = $true)]
  [string]$PackagePath
)

."$PSScriptRoot\..\common\scripts\SemVer.ps1"

$packagePaths = Get-ChildItem -Path "$PackagePath/*/package.json"

foreach ($packagePath in $packagePaths) {
  $pkgContent = Get-Content $packagePath | ConvertFrom-Json
  foreach ($dependency in $pkgContent.dependencies.PSObject.properties) {
    $depVer = $dependency.Value
    if ($depVer -match "\D\d.\d.\d") {
      $baseVer = $depVer.replace("~","").replace("^","")
      $version = [AzureEngSemanticVersion]::new($baseVer)
      if ($version.IsPrerelease) {
        throw "Found dependency on preview/pre-release package '$($dependency.Name)' with version range '$depVer'. Please pin dependencies to preview packages."
      }
    }
  }
}
