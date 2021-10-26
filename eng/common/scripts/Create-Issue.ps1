[CmdletBinding(SupportsShouldProcess = $true)]
param(
  [Parameter(Mandatory = $true)]
  [string]$RepoOwner,

  [Parameter(Mandatory = $true)]
  [string]$RepoName,

  [Parameter(Mandatory = $true)]
  [string]$Title,

  [Parameter(Mandatory = $false)]
  [string[]]$Assignees,

  [Parameter(Mandatory = $false)]
  [string]$Labels,

  [Parameter(Mandatory = $false)]
  [string]$Comments,

  [Parameter(Mandatory = $false)]
  [string]$AuthToken = $(azuresdk-github-pat)
)

. (Join-Path $PSScriptRoot common.ps1)

try {
  $resp = Create-GithubIssue -RepoOwner $RepoOwner -RepoName $RepoName -Title $Title
  $issueNumber = $resp.number
  Write-Host "This is the issue created: $($resp.html_url)"
  if ($Comments) {
    Add-GithubIssueComment -RepoOwner $RepoOwner -RepoName $RepoName `
      -IssueNumber $issueNumber -Comment $Comment -AuthToken $AuthToken
  }
  if ($Labels) {
    Add-GithubIssueLabels -RepoOwner $RepoOwner -RepoName $RepoName `
      -IssueNumber $issueNumber -Labels $Labels -AuthToken $AuthToken
  }
  if ($Assignees) {
    Add-GitHubIssueAssignees -RepoOwner $RepoOwner -RepoName $RepoName `
      -IssueNumber $issueNumber -Assignees $Assignee -AuthToken $AuthToken
  }
}
catch {
  LogError "Create-Issue failed with exception:`n$_"
  exit 1
}
