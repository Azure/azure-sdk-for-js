param (
  [Parameter(mandatory = $true)]
  $packageArtifact,
  [Parameter(mandatory = $true)]
  $workingDirectory
)

$EngPath = Resolve-Path "${PSScriptRoot}/.."
$Engcommon = Join-Path $EngPath "common"
$EngCommonScriptsPath = Join-Path $Engcommon "scripts"
. (Join-Path $EngCommonScriptsPath common.ps1)

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
$packageName = $null
$packageVersion = $null
if ($GetPackageInfoFromPackageFileFn -and (Test-Path "Function:$GetPackageInfoFromPackageFileFn"))
{
    $pkgProps = &$GetPackageInfoFromPackageFileFn -pkg $packageArtifact -workingDirectory $workingDirectory
    $packageName = $pkgProps.PackageId
    $packageVersion = $pkgProps.PackageVersion
}
else
{
  Write-Error "The function for '$GetPackageInfoFromPackageFileFn' was not found.`
  Make sure it is present in eng/scripts/Language-Settings.ps1 and referenced in eng/common/scripts/common.ps1.`
  See https://github.com/Azure/azure-sdk-tools/blob/master/doc/common/common_engsys.md#code-structure"
}


$latestGAVersion = npm show $packageName@latest version
$latestPreviewVersion = npm show $packageName@next version
Write-Host "Latest GA version: $latestGAVersion"
Write-Host "Latest preview version: $latestPreviewVersion"
if ( $latestPreviewVersion -eq $null)
{
    Write-Host "'Next' tag is not present in npm registry for package $packageName"
}
else
{
  $latestPreviewVersion = [AzureEngSemanticVersion]::ParseVersionString($latestPreviewVersion)
}

if ( $latestGAVersion -eq $null)
{
    Write-Host "GA version is not present in npm registry for package $packageName"
}
else
{
  $latestGAVersion = [AzureEngSemanticVersion]::ParseVersionString($latestGAVersion)
}

$newVersion = [AzureEngSemanticVersion]::ParseVersionString($packageVersion)

$setLatest = $false
$setNext = $false

# Set Latest tag if new version is higher than current GA or if package has never GA released before
if ((-not $newVersion.IsPreRelease) -and ($latestGAVersion -eq $null -or $newVersion.CompareTo($latestGAVersion) -eq 1))
{
    $setLatest = $true
}

if ($newVersion.PrereleaseLabel -eq "preview")
{
    # Set next tag if new preview is higher than both GA and current preview
    $highestNpmVersion = $latestPreviewVersion
    if (($highestNpmVersion -eq $null) -or ($latestGAVersion -ne $null -and $latestGAVersion.CompareTo($highestNpmVersion) -eq 1)) {
        $highestNpmVersion = $latestGAVersion
    }

    # New version is preview and if package is getting released first time or higher than currently available
    if ($highestNpmVersion -eq $null -or $newVersion.CompareTo($highestNpmVersion) -eq 1)
    {
        $setNext = $true
        # Set latest tag if package was never GA released
        if ($latestGAVersion -eq $null) {
            $setLatest = $true
        }
    }    
}

$tag = ""
$additionalTag = ""
if ($setLatest)
{
  Write-Host "Setting Tag to latest"
  $tag = "latest"
  if ($result.setNext)
  {
    Write-Host "Setting AdditionalTag to next"
    $additionalTag = "next"
  }
}
elseif ($result.setNext)
{
  Write-Host "Setting Tag to next"
  $tag = "next"
}

$result = New-Object PSObject -Property @{
  Tag = $tag
  AdditionalTag = $additionalTag
}
write-Host $result
return $result
