$EngPath = Resolve-Path "${PSScriptRoot}/.."
$Engcommon = Join-Path $EngPath "common"
$EngCommonScriptsPath = Join-Path $Engcommon "scripts"
. (Join-Path $EngCommonScriptsPath common.ps1)

function GetNpmTagVersions($packageName)
{
  try
  {
    $existingVersion = Invoke-RestMethod -Method GET -Uri "http://registry.npmjs.com/${PackageName}"
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
    LogError "Failed to retrieve package versions. `n$_"
    return $null
  }
}

function GetNpmPackageVersions ($packageName)
{
  try
  {
    Write-Host "Checking versions present on npm for package $packageName"
    $existingVersion = Invoke-RestMethod -Method GET -Uri "http://registry.npmjs.com/${packageName}"
    return ($existingVersion.versions | Get-Member -MemberType NoteProperty).Name
  }
  catch
  {
    LogError "Failed to retrieve package versions. `n$_"
    return $null
  }
}

function FindRecentPackageVersion($packageName)
{
  $versions = (GetNpmPackageVersions -packageName $packageName) | ? {$_ -NotMatch "alpha|dev"}  
  if ($versions -ne $null -and $versions.Count -gt 0)
  {
    $versions = [AzureEngSemanticVersion]::SortVersionStrings($versions)
    $highestNpmVersion = $versions[0]
    Write-Host "Recent version uploaded to NPM: $highestNpmVersion"
    return $highestNpmVersion
  }
  
  return $null
}
