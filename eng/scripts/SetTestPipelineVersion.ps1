# Overides the project file and CHANGELOG.md for the template project using the next publishable version
# This is to help with testing the release pipeline.

. "${PSScriptRoot}\..\common\scripts\common.ps1"
$latestTags = git tag -l "@azure/template*beta*"
$semVars = @()

$packageDirectory = "${PSScriptRoot}\..\..\sdk\template\template"
$templatePackageFile = "${packageDirectory}\package.json"
$changeLogFile = "${packageDirectory}\CHANGELOG.md"


Foreach ($tags in $latestTags)
{
  $semVars += $tags.Replace("@azure/template_", "")
}

$semVarsSorted = [AzureEngSemanticVersion]::SortVersionStrings($semVars)
Write-Host "Last Published Version $($semVarsSorted[0])"

$newVersion = [AzureEngSemanticVersion]::ParseVersionString($semVarsSorted[0])
$newVersion.IncrementAndSetToPrerelease()
Write-Host "Version to publish [ $($newVersion.ToString()) ]"

$packageFileContent = Get-Content -Path $templatePackageFile | ConvertFrom-Json
Write-Host "Version in Source $($packageFileContent.version)"
$packageFileContent.version = $newVersion.ToString()
Write-Host "Version to publish $($packageFileContent.version)"

Set-Content -Path $templatePackageFile -Value ($packageFileContent | ConvertTo-Json)
Set-Content -Path $changeLogFile -Value @"
# Release History
## $($newVersion.ToString()) ($(Get-Date -f "yyyy-MM-dd"))
- Test Release Pipeline
"@
