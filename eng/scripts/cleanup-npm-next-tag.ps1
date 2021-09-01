param (
  [Parameter(mandatory = $true)]
  $packageArtifact,
  [Parameter(mandatory = $true)]
  $workingDirectory,
  [Parameter(mandatory = $true)]
  $npmToken
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
Write-Host "Package name: $packageName"
Write-Host "Find latest and next versions in npm registry for package"

<#
1. Get latest GA and latest preview from npm
2. Check if latest GA is higher than next
3. Remove next tag from preview version if latest is higher than preview version
#>

$npmVersionInfo = GetNpmTagVersions -packageName $packageName
if ($npmVersionInfo -eq $null)
{
  # Version info object should not be null even if package is not present in npm
  Write-Host "Failed to get version info from NPM registry. Package is probably published for the first time."
  exit 0
}
$nextVersion = [AzureEngSemanticVersion]::ParseVersionString($npmVersionInfo.next)
$latestVersion = [AzureEngSemanticVersion]::ParseVersionString($packageVersion) 

if ( ($latestVersion -ne $null) -and ($nextVersion -ne $null) -and (!$latestVersion.IsPreRelease))
{
  if ($latestVersion.CompareTo($nextVersion) -eq 1)
  {
    Write-Host "Latest Version $latestVersion is higher than next tagged version $nextVersion."
    Write-Host "Removing next tag from $nextVersion."
    $scriptsPath = Join-Path $EngPath "scripts"
    . (Join-Path $scriptsPath npm-admin-tasks.ps1) -taskType "RemoveTag" -packageName $packageName -pkgVersion $nextVersion.ToString() -tagName "next" -npmToken $npmToken
  }
  else
  {
    Write-Host "Latest tagged version is lower than or same as next tagged version."
    Write-Host "Skipping remove 'next' tag task."
  }
}
else
{
  Write-Host "Latest or next tag is missing on npm or latest version is not GA release to compare versions."
}
