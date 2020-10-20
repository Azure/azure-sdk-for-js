# Overides the project file and CHANGELOG.md for the template project using a custom preview version
# This is to help with testing the release pipeline.

[CmdletBinding(SupportsShouldProcess = $true)]
param(
  [Parameter(Mandatory = $true)]
  [string]$PreviewVersionNumber
)

. "${PSScriptRoot}\..\common\scripts\common.ps1"

$packageDirectory = "${PSScriptRoot}\..\..\sdk\template\template"
$templatePackageFile = "${packageDirectory}\package.json"
$changeLogFile = "${packageDirectory}\CHANGELOG.md"
$newVersion = "1.0.9-beta.$PreviewVersionNumber"

$packageFileContent = Get-Content -Path $templatePackageFile | ConvertFrom-Json
LogDebug "Version in Source $($packageFileContent.version)"
$packageFileContent.version = $newVersion.ToString()
LogDebug "Version to publish $($packageFileContent.version)"

Set-Content -Path $templatePackageFile -Value ($packageFileContent | ConvertTo-Json)
Set-TestChangeLog -TestVersion $newVersion -changeLogFile $changeLogFile -ReleaseEntry "Test Release Pipeline"
