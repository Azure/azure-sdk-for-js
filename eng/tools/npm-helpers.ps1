$EngPath = Resolve-Path "${PSScriptRoot}/.."
$Engcommon = Join-Path $EngPath "common"
$EngCommonScriptsPath = Join-Path $Engcommon "scripts"
. (Join-Path $EngCommonScriptsPath common.ps1)

function Get-LatestVersionInfoFromNpm($packageName)
{
  $latestVersion = npm show $packageName@latest version
  $nextVersion = npm show $packageName@next version
  Write-Host "Latest version: $latestVersion"
  Write-Host "Next version: $nextVersion"
  if ( $nextVersion -eq $null) {
    Write-Host "'Next' tag is not present in npm registry for package $packageName"
  }
  else {
    $nextVersion = [AzureEngSemanticVersion]::ParseVersionString($nextVersion)
  }

  if ( $latestVersion -eq $null) {
    Write-Host "'latest' tag is not present in npm registry for package $packageName"
  }
  else {
    $latestVersion = [AzureEngSemanticVersion]::ParseVersionString($latestVersion)
  }

  $result = New-Object PSObject -Property @{
    Latest = $latestVersion
    Next = $nextVersion
  }
  return $result
}

function Find-RecentPackageVersion($packageName)
{
  $npmVersionInfo = Get-LatestVersionInfoFromNpm -packageName $packageName
  if ($npmVersionInfo -ne $null)
  {
    $latestVersion = $npmVersionInfo.Latest
    $nextVersion = $npmVersionInfo.Next
    if (($nextVersion -ne $null) -and ($latestVersion -ne $null))
    {
      if ($latestVersion.CompareTo($nextVersion) -eq 1) {
        $highestNpmVersion = $latestVersion
      }
      else {
        $highestNpmVersion = $nextVersion
      }
    }
    else
    {
      if ($nextVersion -ne $null) {
        $highestNpmVersion = $nextVersion
      }
      else {
        $highestNpmVersion = $latestVersion
      }
    } 
  }
  Write-Host "Recent version uploaded to NPM: $highestNpmVersion"
  return $highestNpmVersion
}
