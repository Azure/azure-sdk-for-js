<#
.SYNOPSIS
Invokes cspell using dependencies defined in adjacent ./package*.json

.PARAMETER JobType
Maps to cspell command (e.g. `lint`, `trace`, etc.). Default is `lint`

.PARAMETER ScanGlobs
List of glob expressions to be scanned. This list is not constrained by
npx/cmd's upper limit on command line length as the globs are inserted into the
cspell config's `files` property.

.PARAMETER CSpellConfigPath
Location of cspell.json file to use when scanning. Defaults to
`.vscode/cspell.json` at the root of the repo.

.PARAMETER SpellCheckRoot
Location of root folder for generating readable relative file paths. Defaults to
the root of the repo relative to the script.

.PARAMETER WorkingDirectory
Location of a working directory. If no location is provided a folder will be
created in the temp folder, package*.json files will be placed in that folder.

.PARAMETER LeaveWorkingDirectory
If set the WorkingDirectory will not be deleted. Use if there are multiple
calls to Invoke-Cspell.ps1 to prevent creating multiple working directories and
redundant calls `npm install`.

.PARAMETER Test
Run test functions against the script logic

.EXAMPLE
./eng/common/scripts/Invoke-Cspell.ps1 -ScanGlobs 'sdk/*/*/PublicAPI/**/*.md'

This will run spell check with the given globs

.EXAMPLE
./eng/common/scripts/Invoke-Cspell.ps1 -ScanGlobs @('sdk/storage/**', 'sdk/keyvault/**')

This will run spell check against multiple globs

.EXAMPLE
./eng/common/scripts/Invoke-Cspell.ps1 -ScanGlobs './README.md'

This will run spell check against a single file

#>
[CmdletBinding()]
param(
  [Parameter()]
  [string] $JobType = 'lint',

  [Parameter()]
  [array]$ScanGlobs = '**',

  [Parameter()]
  [string] $CSpellConfigPath = (Resolve-Path "$PSScriptRoot/../../../.vscode/cspell.json"),

  [Parameter()]
  [string] $SpellCheckRoot = (Resolve-Path "$PSScriptRoot/../../.."),

  [Parameter()]
  [string] $WorkingDirectory = (Join-Path [System.IO.Path]::GetTempPath(), "cspell-tool-path"),

  [Parameter()]
  [switch] $LeaveWorkingDirectory,

  [Parameter()]
  [switch] $Test
)

Set-StrictMode -Version 3.0

if ((Get-Command npm | Measure-Object).Count -eq 0) {
  LogError "Could not locate npm. Install NodeJS (includes npm) https://nodejs.org/en/download/"
  exit 1
}

if (!(Test-Path $CSpellConfigPath)) {
  LogError "Could not locate config file $CSpellConfigPath"
  exit 1
}

function Test-VersionReportMatches() {
  # Arrange
  $expectedPackageVersion = '5.12.3'

  # Act
  $actual = &"$PSSCriptRoot/Invoke-Cspell.ps1" `
    -JobType '--version'

  # Assert
  if ($actual -ne $expectedPackageVersion) {
    throw "Mismatched version. Expected:`n$expectedPackageVersion`n`nActual:`n$actual"
  }
}

function TestInvokeCspell() {
  Test-VersionReportMatches
}

if ($Test) {
  TestInvokeCspell
  Write-Host "Test complete"
  exit 0
}

# Prepare the working directory if it does not already have requirements in
# place.
if (!(Test-Path $WorkingDirectory)) {
  New-Item -ItemType Directory -Path $WorkingDirectory | Out-Null
}

if (!(Test-Path "$WorkingDirectory/package.json")) {
  Copy-Item "$PSScriptRoot/package.json" $WorkingDirectory
}

if (!(Test-Path "$WorkingDirectory/package-lock.json")) {
  Copy-Item "$PSScriptRoot/package-lock.json" $WorkingDirectory
}

# The "files" list must always contain a file which exists, is not empty, and is
# not excluded in ignorePaths. In this case it will be a file with the contents
# "1" (no spelling errors will be detected)
$notExcludedFile = Join-Path $SpellCheckRoot ([System.IO.Path]::GetRandomFileName())
"1" >> $notExcludedFile
$ScanGlobs += $notExcludedFile

$cspellConfigContent = Get-Content $CSpellConfigPath -Raw
$cspellConfig = ConvertFrom-Json $cspellConfigContent

# If the config has no "files" property this adds it. If the config has a
# "files" property this sets the value, overwriting the existing value. In this
# case, spell checking is only intended to check files from $ScanGlobs so
# preexisting entries in "files" will be overwritten.
Add-Member `
  -MemberType NoteProperty `
  -InputObject $cspellConfig `
  -Name "files" `
  -Value $ScanGlobs `
  -Force

# Set the temporary config file with the mutated configuration. The temporary
# location is used to configure the command and the original file remains
# unchanged.
Write-Host "Setting config in: $CSpellConfigPath"
Set-Content `
  -Path $CSpellConfigPath `
  -Value (ConvertTo-Json $cspellConfig -Depth 100)

# Before chaning the run location, resolve paths specified in parameters
$CSpellConfigPath = Resolve-Path $CSpellConfigPath
$SpellCheckRoot = Resolve-Path $SpellCheckRoot

$originalLocation = Get-Location
# Use the mutated configuration file when calling cspell
$command = "npm exec -- cspell $JobType --config $CSpellConfigPath --no-must-find-files --root $SpellCheckRoot --relative"
Write-Host $command
$cspellOutput = npm exec -- `
  cspell `
  $JobType `
  --config $CSpellConfigPath `
  --no-must-find-files `
  --root $SpellCheckRoot `
  --relative
Set-Location $originalLocation

Write-Host "cspell run complete, restoring original configuration and removing temp file."
Set-Content -Path $CSpellConfigPath -Value $cspellConfigContent -NoNewLine
Remove-Item -Path $notExcludedFile

if (!$LeaveWorkingDirectory) {
  Remove-Item $WorkingDirectory -Recurse -Force
}

return $cspellOutput
