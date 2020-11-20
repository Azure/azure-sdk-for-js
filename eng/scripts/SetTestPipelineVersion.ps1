# Overides the project file and CHANGELOG.md for the template project.
# This is to help with testing the release pipeline.

param (
  [Parameter(mandatory = $true)]
  $BuildID
)

. "${PSScriptRoot}\..\common\scripts\common.ps1"
$latestTags = git tag -l "@azure/template_*"
$semVars = @()

$packageDirectory = "${PSScriptRoot}\..\..\sdk\template\template"
$templatePackageFile = "${packageDirectory}\package.json"
$changeLogFile = "${packageDirectory}\CHANGELOG.md"

Foreach ($tags in $latestTags)
{
  $semVars += $tags.Replace("@azure/template_", "")
}

$semVarsSorted = [AzureEngSemanticVersion]::SortVersionStrings($semVars)
LogDebug "Last Published Version $($semVarsSorted[0])"

$newVersion = [AzureEngSemanticVersion]::ParseVersionString($semVarsSorted[0])
$newVersion.PrereleaseLabel = "beta"
$newVersion.PrereleaseNumber = $BuildID

$packageFileContent = Get-Content -Path $templatePackageFile | ConvertFrom-Json
LogDebug "Version in Source $($packageFileContent.version)"
$packageFileContent.version = $newVersion.ToString()
LogDebug "Version to publish $($packageFileContent.version)"

Set-Content -Path $templatePackageFile -Value ($packageFileContent | ConvertTo-Json)
Set-Content -Path $changeLogFile -Value @"
# Release History
## $($newVersion.ToString()) ($(Get-Date -f "yyyy-MM-dd"))
- Test Release Pipeline
"@
