param (
  [Parameter(mandatory = $true)]
  $packageArtifact,
  [Parameter(mandatory = $true)]
  $workingDirectory
)

$HelpersPath = Join-Path $PSScriptRoot "helpers"
. (Join-Path $HelpersPath npm-helpers.ps1)

$pkgProps = Get-javascript-PackageInfoFromPackageFile -pkg $packageArtifact -workingDirectory $workingDirectory
if ($pkgProps -eq $null)
{
  Write-Error "Failed to parse package artifact $packageArtifact to get package name"
  exit 1
}
$packageName = $pkgProps.PackageId
$packageVersion = $pkgProps.PackageVersion
$result = GetNewNpmTags -packageName $packageName -packageVersion $packageVersion
return $result
