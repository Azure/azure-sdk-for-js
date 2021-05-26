param (
  [Parameter(mandatory = $true)]
  $packageArtifact,
  [Parameter(mandatory = $true)]
  $workingDirectory
)

. (Join-Path $PSScriptRoot npm-helpers.ps1)
$pkgProps = Get-javascript-PackageInfoFromPackageFile -pkg $packageArtifact -workingDirectory $workingDirectory
if ($pkgProps -eq $null)
{
  Write-Error "Failed to parse package artifact $packageArtifact to get package name"
  exit 1
}
$packageName = $pkgProps.PackageId
$packageVersion = $pkgProps.PackageVersion
$newVersion = [AzureEngSemanticVersion]::ParseVersionString($packageVersion)
Write-Host "Package name: $packageName"
Write-Host "Package version: $packageVersion"
Write-Host "Find latest and next versions in npm registry for package"

<#
1. Get latest GA and latest preview from npm
2. Check new version to be published to find is it GA or preview
3. If new Version is GA:
   a. If higher than current latest, or first GA then set LATEST tag
4. If new version is preview and higher than current higher version in npm:
   a. Set LATEST if package has never GA released
   b. Set NEXT tag
#>
$npmVersionInfo = GetNpmTagVersions -packageName $packageName
if ($npmVersionInfo -eq $null)
{
  # Version info object should not be null even if package is not present in npm
  Write-Error "Failed to get version info from NPM registry."
  exit 1
}
$latestVersion = [AzureEngSemanticVersion]::ParseVersionString($npmVersionInfo.latest)
$setLatest = $false
$setNext = $false
# Set Latest tag if new version is higher than current GA or if package has never GA released before
if ((!$newVersion.IsPreRelease) -and ($latestVersion -eq $null -or $newVersion.CompareTo($latestVersion) -eq 1)) {
  $setLatest = $true
}

if ($newVersion.PrereleaseLabel -eq "preview" -or $newVersion.PrereleaseLabel -eq "beta")
{
  Write-Host "Checking for next version tag"
  # Set next tag if new preview is higher than highest present on npm
  $highestNpmVersion = FindRecentPackageVersion -packageName $packageName
  $highestNpmVersion = [AzureEngSemanticVersion]::ParseVersionString($highestNpmVersion)
  # New version is preview and if package is getting released first time or higher than currently available
  if ($highestNpmVersion -eq $null -or $newVersion.CompareTo($highestNpmVersion) -eq 1)
  {
    $setNext = $true
    # Set latest tag if package was never GA released
    if ($latestVersion -eq $null) {
      $setLatest = $true
    }
  }    
}

$tag = ""
$additionalTag = ""
if ($setLatest)
{
    $tag = "latest"
    if ($setNext) {
        $additionalTag = "next"
    }
}
elseif ($setNext) {
    $tag = "next"
}

$result = New-Object PSObject -Property @{
    Tag = $tag
    AdditionalTag = $additionalTag
}
write-Host $result
return $result
