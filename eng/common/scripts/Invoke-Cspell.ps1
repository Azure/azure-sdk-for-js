<#
.SYNOPSIS
Invokes a given version of cspell with standard parameters and provided globs

.PARAMETER JobType
Maps to cspell command (e.g. `lint`, `trace`, etc.). Default is `lint`

.PARAMETER ScanGlobs
List of glob expressions to be scanned. This list is not constrained by
npx/cmd's upper limit on command line length as the globs are inserted into the
cspell config's `files` property.

.PARAMETER CSpellVersion
Version of cspell to use. Defaults to `5.12.3`

.PARAMETER CSpellConfigPath
Location of cspell.json file to use when scanning. Defaults to
`.vscode/cspell.json` at the root of the repo.

.PARAMETER SpellCheckRoot
Location of root folder for generating readable relative file paths. Defaults to
the root of the repo relative to the script.

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
  [string]$CSpellVersion = '5.12.3',

  [Parameter()]
  [string] $CSpellConfigPath = (Resolve-Path "$PSScriptRoot/../../../.vscode/cspell.json"),

  [Parameter()]
  [string] $SpellCheckRoot = (Resolve-Path "$PSScriptRoot/../../.."),

  [Parameter()]
  [switch] $Test
)

Set-StrictMode -Version 3.0

if ((Get-Command npx | Measure-Object).Count -eq 0) {
  LogError "Could not locate npx. Install NodeJS (includes npx and npx) https://nodejs.org/en/download/"
  exit 1
}

if (!(Test-Path $CSpellConfigPath)) {
  LogError "Could not locate config file $CSpellConfigPath"
  exit 1
}

function Test-VersionReportMatches() {
  # Arrange
  $expectedCspellVersion = '5.12.1'

  # Act
  $actual = &"$PSSCriptRoot/Invoke-Cspell.ps1" `
    -CSpellVersion $expectedCspellVersion `
    -JobType '--version'

  # Assert
  if ($actual -ne $expectedCspellVersion) {
    throw "Mismatched version. Expected:`n$expectedCspellVersion`n`nActual:`n$actual"
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


# The "files" list must always contain a file which exists, is not empty, and is
# not excluded in ignorePaths. In this case it will be a file with the contents
# "1" (no spelling errors will be detected)
$notExcludedFile = (New-TemporaryFile).ToString()
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

# Use the mutated configuration file when calling cspell
Write-Host "npx cspell $JobType --config $CSpellConfigPath --no-must-find-files --root $SpellCheckRoot --relative"

$cspellOutput = npx cspell@$CSpellVersion `
  $JobType `
  --config $CSpellConfigPath `
  --no-must-find-files `
  --root $SpellCheckRoot `
  --relative `
  $ScanGlobs

Write-Host "cspell run complete, restoring original configuration and removing temp file."
Set-Content -Path $CSpellConfigPath -Value $cspellConfigContent -NoNewLine
Remove-Item -Path $notExcludedFile

return $cspellOutput
