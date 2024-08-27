param (
  [Parameter(mandatory = $true)]
  $packageArtifact,
  [Parameter(mandatory = $true)]
  $workingDirectory
)

$HelpersPath = Join-Path $PSScriptRoot "helpers"
. (Join-Path $HelpersPath npm-helpers.ps1)

# $pkgProps = Get-javascript-PackageInfoFromPackageFile -pkg $packageArtifact -workingDirectory $workingDirectory
# if ($pkgProps -eq $null)
# {
#   Write-Error "Failed to parse package artifact $packageArtifact to get package name"
#   exit 1
# }

$packageName = '@azure/eventhubs-checkpointstore-table'#'@azure/openai'#'@azure/video-indexer-widgets'#'@azure/template'#$pkgProps.PackageId
$packageVersions = npm view $packageName versions --json | ConvertFrom-Json
$validDev = $packageVersions | ? { $_ -match "alpha" } | Select-Object -Last 1
$validNext = $packageVersions | ? { $_ -match "beta" } | Select-Object -Last 1
$validLatest = $packageVersions | ? { !($_ -match "alpha") -and !($_ -match "beta") } | Select-Object -Last 1
if (!$validLAtest) {
  Write-Host "No GA package found"
  $validLatest = $packageVersions | ? { $_ -match "beta" } | Select-Object -Last 1
}
if (!$validLAtest) {
  Write-Host "No beta package found"
  $validLatest = $packageVersions | ? { $_ -match "alpha" } | Select-Object -Last 1
}

$currentDev = npm view $packageName@dev version
$currentNext = npm view $packageName@next version
$currentLatest = npm view $packageName@latest version

# if ($validDev -ne $currentDev) {
  Write-Host "Dev version should be: $validDev, current dev version: $currentDev"
# }
# if ($validNext -ne $currentNext) {
  Write-Host "Next version should be: $validNext, current next version: $currentNext"
# }
# if ($validLatest -ne $currentLatest) {
  Write-Host "Latest version should be: $validLatest, current latest version: $currentLatest"
# }

return $result
