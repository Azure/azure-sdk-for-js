<#
.SYNOPSIS
Spell checks JS public API surface as expored to review/**/*.md

.DESCRIPTION
Checks spelling of package's public API

.PARAMETER ServiceDirectory
Scopes scanning to a particular service directory (e.g. `storage`). Otherwise
scan everything under the `sdk/` folder. Default is empty string (scan 
everything).

.EXAMPLE
./spell-check-public-api.ps1

Spell check all public API specs for all services and packages under `sdk`

.EXAMPLE
./spell-check-public-api.ps1 -ServiceDirectory storage

Spell check all public API specs for packages under `sdk/storage`

#>
param (
  [Parameter(mandatory = $false)]
  $ServiceDirectory = ''
)

$REPO_ROOT = Resolve-Path "$PSScriptRoot/../.."

$directoresToScan = @((Resolve-Path "$REPO_ROOT/sdk/$ServiceDirectory"))
if (!$ServiceDirectory) {
  $directoresToScan = Get-ChildItem -Path "$REPO_ROOT/sdk" -Directory
}

$packageDirectories = @()
foreach ($serviceDirectory in $directoresToScan) {
  # Only include directories which have a `reivew` folder as that is the folder
  # that will be scanned.
  $packageDirectories += `
  (Get-ChildItem -Path $serviceDirectory -Directory).Where({
    (Get-ChildItem -Path $_ -Directory).Where({
          $_.Name -eq 'review'
        })
    })
}

$failed = $false
foreach ($directory in $packageDirectories) {
  $scanGlob = "$directory/review/**/*.md"
  Write-Host "cspell lint --config '$REPO_ROOT/.vscode/cspell.json' --no-must-find-files --root $REPO_ROOT --relative $scanGlob"
  npx cspell lint `
    --config "$REPO_ROOT/.vscode/cspell.json" `
    --no-must-find-files `
    --root $REPO_ROOT `
    --relative `
    $scanGlob

  if ($LASTEXITCODE) {
    $failed = $true
  }
}

if ($failed) {
  exit 1
}
