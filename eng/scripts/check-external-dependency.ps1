[CmdletBinding(SupportsShouldProcess = $true)]
param (
  [Parameter(Mandatory = $true)]
  [string]$AuthToken,

  [Parameter(Mandatory = $true)]
  [string]$RepoOwner,

  [Parameter(Mandatory = $true)]
  [string]$RepoName
)

# This script will reset the repo and any changes in tracked files will be lost.

$dependencyUpgradeLabel = "dependency-upgrade-required"
$dependencyRegex = "^\+\s(?<pkg>[\S]*)\s(?<version>[\S]*)\s\((?<newVersion>[0-9\.a-b]*).*\)\s?(?<deprecated>deprecated)?"
$RepoRoot = Resolve-Path -Path "${PSScriptRoot}/../.."
Write-Host "Repo root: $RepoRoot"
$rushFile = join-Path -Path $RepoRoot "rush.json"
Write-Host "Path to rush.json: $rushFile"
$commonConfigFile = Join-path -Path $RepoRoot "common" "config" "rush" "common-versions.json"
Write-Host "Path to common-versions.json: $commonConfigFile"

$EngCommonScriptsPath = Join-Path (Resolve-Path "${PSScriptRoot}/..") "common" "scripts"
. (Join-Path $EngCommonScriptsPath common.ps1)


# Check and return if an isue already exists to upgrade the package 
function Get-GithubIssue($PackageName, $IsDeprecated) {
  $issueTitle = "Dependency package $PackageName has a new version available"
  $issues = Get-GitHubIssues -RepoOwner $RepoOwner -RepoName $RepoName -CreatedBy "azure-sdk" -Labels "dependency-upgrade-required" -AuthToken $AuthToken
  if ($issues) {
    foreach ($issue in $issues) {
      if ($issue.title -eq $issueTitle) {
        return $issue
      }
    }
  }
  return $issues
}

# Create new issue if none exists for the package. or update current one if an issue exists
function Set-GitHubIssue($Package) {
  $pkgName = $Package.Name
  $issueTitle = "Dependency package $pkgName has a new version available"
  $issueDesc = "We have identified a dependency on $pkgName ($($Package.OldVersion)). "

  if ($Package.IsDeprecated) {
    $issueDesc = "Version $($Package.OldVersion) of $pkgName has been deprecated.`n"
  }
  $issueDesc += "A new version ($($Package.NewVersion) is available now."


  $issue = Get-GithubIssue -PackageName $Package.Name -IsDeprecated $Package.IsDeprecated
  if ($issue) {
    Update-GitHubIssue -RepoOwner $RepoOwner -RepoName $RepoName -AuthToken $AuthToken -IssueNumber $issue.number -Body $issueDesc
  }
  else {
    $newIssue = New-GitHubIssue -RepoOwner $RepoOwner -RepoName $RepoName -AuthToken $AuthToken -Title $issueTitle -Description $issueDesc  
    Write-Host "Created issue $($newIssue.number) with title '$issueTitle'"
    if ($newIssue) {
      $out = Add-GitHubIssueLabels -RepoOwner $RepoOwner -RepoName $RepoName -AuthToken $AuthToken -Labels $dependencyUpgradeLabel -IssueNumber $newIssue.number
      Write-Host "Addd label $dependencyUpgradeLabel to issue $($newIssue.number)"
    }
  }
}


# Update rush configuration files to alter settings
if ((Test-Path $rushFile) -and (Test-Path $commonConfigFile)) {
  $rushJson = Get-Content -Path $rushFile | ConvertFrom-Json
  $rushJson.pnpmOptions.strictPeerDependencies = $false
  Set-Content -Path $rushFile -Value (ConvertTo-Json -InputObject $rushJson)

  $configJson = Get-Content -Path $commonConfigFile | ConvertFrom-Json
  $configJson.implicitlyPreferredVersions = $true
  Set-Content -Path $commonConfigFile -Value (ConvertTo-Json -InputObject $configJson)
}
else {
  Write-Error "Failed to find $($rushFile) and/or $($commonConfigFile). Verify repo root parameter."
  exit 1
}
Write-Host "Updated rush configuraion files"

try {
  # Run rush update --full
  Write-Host "Running rush update"
  $rushUpdateOutput = rush update --full
  Write-Host "Parsing rush update out"
  write-host $rushUpdateOutput
  foreach ($line in $rushUpdateOutput) {
    if ($line -match $dependencyRegex -and !$matches['pkg'].StartsWith("@azure")) { 
      $p = New-Object PSObject -Property @{
        Name         = $matches['pkg']  
        OldVersion   = [AzureEngSemanticVersion]::ParseVersionString($matches['version'])        
        NewVersion   = [AzureEngSemanticVersion]::ParseVersionString($matches['newVersion'])
        IsDeprecated = ($matches['deprecated'] -eq "deprecated")
      }
      Set-GitHubIssue -Package $p
    }
  }
}
catch {
  Write-Error "Failed to check available new versions of external dependency."
  exit 1
}
