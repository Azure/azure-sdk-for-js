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
$deprecatedDependency = "Deprecated-Dependency"
$deprecatedDependencyRegex = "^\+\s(?<pkg>[\S]*)\s|\sWARN\(?<deprecated>deprecated\)"
$RepoRoot = Resolve-Path -Path "${PSScriptRoot}/../.."
Write-Host "Repo root: $RepoRoot"

# $ghIssues = Get-GitHubIssues -RepoOwner $RepoOwner -RepoName $RepoName -CreatedBy "azure-sdk" -Labels "dependency-upgrade-required" -AuthToken $AuthToken
$ghIssues = @()
# Check and return if an issue already exists to upgrade the package
function Get-GithubIssue($IssueTitle) {
  foreach ($issue in $ghIssues) {
    if ($issue.title -eq $IssueTitle) {
      return $issue
    }
  }
  return $null
}

# Create new issue if none exists for the package. or update current one if an issue exists
function Set-GitHubIssue($Package) {
  $pkgName = $Package.Name
  $issueTitle = "Dependency package $pkgName has a new version available"
  $issueDesc = "We have identified a dependency on version $($Package.OldVersion) of [$pkgName](https://www.npmjs.com/package/$pkgName). "
  $labels = $dependencyUpgradeLabel
  if ($Package.IsDeprecated) {
    $issueDesc += "Version $($Package.OldVersion) of $pkgName has been deprecated.`n"
    $labels += ",$deprecatedDependency"
  }
  $issueDesc += "A new version ($($Package.NewVersion)) is available for upgrade.`n`nFollowing are the steps to upgrade package dependency.`n
  1. Understand the breaking changes between the version being used and the version you want to upgrade to.`n
  2. Identify all packages that take a dependency on this package.`n
  3. Go to the root folder for each such package (/sdk/service-name/package-name) and update package.json to have the new version.`n
  4. Run 'pnpm install' to ensure the new version is pulled in.`n
  5. Make relevant changes to absorb the breaking changes.`n
  6. Repeat steps 3 to 5 for each of the packages that have a dependency on this package."

  $issue = Get-GithubIssue -IssueTitle $issueTitle
  if ($issue) {
    if ($issue.body -ne $issueDesc) {
      # Copy over current labels to avoid removing manually tagged labels
      foreach($lbl in $issue.labels)
      {
        $labels += ",$($lbl.name)"
      }
      Write-Host "Updating existing issue  $($issue.number). Labels: $($labels)"
      $oldIssue = Update-GitHubIssue -RepoOwner $RepoOwner -RepoName $RepoName -AuthToken $AuthToken -IssueNumber $issue.number -Body $issueDesc -Labels $labels
      Write-Host "Updated existing issue $($oldIssue.number)"
    }
    else {
      Write-Host "Found existing issue for package $($Package.Name)"
    }
  }
  else {
    write-Host "Creating issue for $pkgName"
    $newIssue = New-GitHubIssue -RepoOwner $RepoOwner -RepoName $RepoName -AuthToken $AuthToken -Title $issueTitle -Description $issueDesc
    if ($newIssue) {
      $out = Add-GitHubIssueLabels -RepoOwner $RepoOwner -RepoName $RepoName -AuthToken $AuthToken -Labels $labels -IssueNumber $newIssue.number
    }
  }
}

Write-Host "Running pnpm install --latest"
$rushUpdateOutput = pnpm update --latest
write-host $rushUpdateOutput
$gitDifOutput = git --no-pager diff
foreach ($line in $gitDifOutput) {
  write-host $line
}
foreach ($line in $rushUpdateOutput) {
  if ($line -match $deprecatedDependencyRegex) {
    $p = New-Object PSObject -Property @{
      Name         = $matches['pkg']
      OldVersion   = [AzureEngSemanticVersion]::ParseVersionString($matches['version'])
      NewVersion   = [AzureEngSemanticVersion]::ParseVersionString($matches['newVersion'])
      IsDeprecated = ($matches['deprecated'] -eq "deprecated")
    }

    if ($null -ne $p.OldVersion -and $null -ne $p.NewVersion) {
      # Set-GitHubIssue -Package $p
      Start-Sleep -s 5
    }
  }
}
Write-Host "Verified and filed issues"
