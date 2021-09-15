$EngPath = Resolve-Path "${PSScriptRoot}/../.."
$Engcommon = Join-Path $EngPath "common"
$EngCommonScriptsPath = Join-Path $Engcommon "scripts"
. (Join-Path $EngCommonScriptsPath common.ps1)

function GetNpmTagVersions($packageName)
{
  try
  {
    $existingVersion = Invoke-RestMethod -Method GET -Uri "https://registry.npmjs.com/${PackageName}"
    $latest = ($existingVersion."dist-tags").latest
    $next = ($existingVersion."dist-tags").next
    Write-Host "Latest version: $latest"
    Write-Host "Next version: $next"
    if ($latest -eq $null) {
      Write-Host "'latest' tag is not present in npm registry for package $packageName"
    }
    if ($next -eq $null) {
      Write-Host "'Next' tag is not present in npm registry for package $packageName"
    }

    return New-Object PSObject -Property @{
      latest = $latest
      next = $next
    }
  }
  catch
  {
    return $null
  }
}

function GetNpmPackageVersions ($packageName)
{
  try
  {
    Write-Host "Checking versions present on npm for package $packageName"
    $existingVersion = Invoke-RestMethod -Method GET -Uri "https://registry.npmjs.com/${packageName}"
    return ($existingVersion.versions | Get-Member -MemberType NoteProperty).Name
  }
  catch
  {
    return $null
  }
}

function FindRecentPackageVersion($packageName)
{
  $versions = (GetNpmPackageVersions -packageName $packageName).Where({$_ -notmatch "alpha|dev"})
  if ($versions.Count -gt 0)
  {
    $versions = [AzureEngSemanticVersion]::SortVersionStrings($versions)
    $highestNpmVersion = $versions[0]
    Write-Host "Recent version uploaded to NPM: $highestNpmVersion"
    return $highestNpmVersion
  }
  
  return $null
}

function GetNewNpmTags($packageName, $packageVersion)
{
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
      if ($latestVersion -eq $null -or $latestVersion.IsPreRelease) {
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
}

function CreateTestCase($packageName, $packageVersion, $eTag, $eAdditional) 
{
  $r = GetNewNpmTags -packageName $packageName -packageVersion $packageVersion
  if ($r.Tag -ne $eTag -or $r.AdditionalTag -ne $eAdditional)
  {
    Write-Error "Failed test case."
    Write-Host "Extected tag: '$($eTag)'' Actual tag: '$($r.Tag)'"
    Write-Host "Extected tag: '$($eAdditional)' Actual tag: '$($r.AdditionalTag)'"
  }
  else{
    Write-Host "Succeeded test case for $packageName version $packageVersion"
  }
}

function TestNewTags()
{
    # test cases are based on currently available package version on npm
    CreateTestCase -packageVersion "1.1.0" -eTag "latest" -eAdditional "" -packageName "@azure/template"
    CreateTestCase -packageName "@azure/template" -packageVersion "1.1.0-preview.1" -eTag "latest" -eAdditional "next"
    CreateTestCase -packageName "@azure/template" -packageVersion "1.0.9" -eTag "latest" -eAdditional ""
    CreateTestCase -packageName "@azure/template" -packageVersion "1.0.8" -eTag "" -eAdditional ""
    CreateTestCase -packageName "@azure/core-http" -packageVersion "1.2.5" -eTag "latest" -eAdditional ""
    CreateTestCase -packageName "@azure/core-http" -packageVersion "1.3.0-preview.1" -eTag "next" -eAdditional ""
    CreateTestCase -packageName "@azure/core-http" -packageVersion "1.2.2" -eTag "" -eAdditional ""
    CreateTestCase -packageName "@azure/core-http" -packageVersion "1.2.5-preview.1" -eTag "next" -eAdditional ""
    CreateTestCase -packageName "@azure/storage-blob" -packageVersion "12.5.1" -eTag "latest" -eAdditional ""
    CreateTestCase -packageName "@azure/storage-blob" -packageVersion "12.6.0-beta.2" -eTag "next" -eAdditional ""
    CreateTestCase -packageName "@azure/storage-blob" -packageVersion "12.6.0" -eTag "latest" -eAdditional ""
    CreateTestCase -packageName "@azure/storage-blob" -packageVersion "12.6.0-alpha.20210525.2" -eTag "" -eAdditional ""
    CreateTestCase -packageName "@azure/storage-blob" -packageVersion "12.4.1" -eTag "" -eAdditional ""
    CreateTestCase -packageName "@azure/storage-blob" -packageVersion "12.4.1-preview.1" -eTag "" -eAdditional ""
    CreateTestCase -packageName "@azure/dummy-new-package" -packageVersion "1.0.0" -eTag "latest" -eAdditional ""
    CreateTestCase -packageName "@azure/dummy-new-package" -packageVersion "1.0.0-preview.1" -eTag "latest" -eAdditional "next"
}
