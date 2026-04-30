# Dispatch a cloud GitHub Copilot coding-agent task to regenerate the
# @azure/ai-projects package end-to-end.
#
# Usage:
#   ./start-cloud-regen.ps1
#   ./start-cloud-regen.ps1 -TspCommit <40-char-sha>
#   ./start-cloud-regen.ps1 -BranchName regen/ai-projects/abc1234-20260501
#   ./start-cloud-regen.ps1 -DryRun
#   ./start-cloud-regen.ps1 -Repo myuser/azure-sdk-for-js -Follow
#
# Behavior:
#   1. Verifies `gh` is on PATH and the caller is authenticated.
#   2. Resolves the latest commit on `Azure/azure-rest-api-specs@SpecBranch`
#      if -TspCommit was not supplied (delegates to update-tsp-commit.ps1
#      -ResolveOnly).
#   3. Defaults -BranchName to regen/ai-projects/<short-sha>-<yyyyMMdd>.
#   4. Renders cloud-regen-prompt.template.md into a temp file with
#      {{TSP_COMMIT}} and {{BRANCH_NAME}} substituted.
#   5. -DryRun: prints the rendered prompt and exits.
#      Otherwise: invokes `gh agent-task create -R $Repo -b $BaseBranch -F <tmp>`
#      (with --follow when requested).
#   6. Prints the resulting agent task / PR URL as the final line.
#
# The caller's local `gh auth` only signs the dispatch call. The cloud
# Copilot coding agent uses its own GitHub App identity for git push and
# PR creation inside the runner.
#
# Run from sdk/ai/ai-projects/ (the script does not chdir).

[CmdletBinding()]
param(
  [string]$TspCommit,
  [string]$SpecBranch = 'feature/foundry-release',
  [string]$BranchName,
  [string]$Repo = 'Azure/azure-sdk-for-js',
  [string]$BaseBranch = 'main',
  [switch]$Follow,
  [switch]$DryRun
)

$ErrorActionPreference = 'Stop'

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$packageRoot = Split-Path -Parent $scriptDir
$templatePath = Join-Path $scriptDir 'cloud-regen-prompt.template.md'
$resolveScript = Join-Path $packageRoot '.github/skills/regenerate-from-typespec/scripts/update-tsp-commit.ps1'

if (-not (Test-Path $templatePath)) {
  throw "Prompt template not found at $templatePath"
}
if (-not (Test-Path $resolveScript)) {
  throw "SHA-resolution script not found at $resolveScript"
}

# 1. Verify gh CLI is available and authenticated (skip in DryRun for
#    convenience — DryRun should be a pure local rendering exercise).
if (-not $DryRun) {
  $ghCmd = Get-Command gh -ErrorAction SilentlyContinue
  if (-not $ghCmd) {
    throw "GitHub CLI (`gh`) not found on PATH. Install it from https://cli.github.com/."
  }
  & gh auth status 2>&1 | Out-Null
  if ($LASTEXITCODE -ne 0) {
    throw "Not authenticated to GitHub. Run `gh auth login` first."
  }
}

# 2. Resolve the TypeSpec commit if not provided.
if (-not $TspCommit) {
  Write-Host "Resolving latest commit on Azure/azure-rest-api-specs@$SpecBranch..."
  $TspCommit = (& pwsh -NoProfile -File $resolveScript -ResolveOnly -Branch $SpecBranch).Trim()
  if ($LASTEXITCODE -ne 0 -or -not $TspCommit) {
    throw "Failed to resolve commit SHA from $SpecBranch."
  }
}
if ($TspCommit -notmatch '^[0-9a-f]{40}$') {
  throw "TspCommit '$TspCommit' is not a 40-char hex SHA."
}
$shortSha = $TspCommit.Substring(0, 7)
Write-Host "TypeSpec commit: $TspCommit"

# 3. Default the branch name.
if (-not $BranchName) {
  $today = (Get-Date).ToString('yyyyMMdd')
  $BranchName = "regen/ai-projects/$shortSha-$today"
}
Write-Host "Target branch:   $BranchName"
Write-Host "Repo:            $Repo"
Write-Host "Base branch:     $BaseBranch"

# 4. Render the prompt template.
$template = Get-Content -Path $templatePath -Raw
$rendered = $template.
  Replace('{{TSP_COMMIT}}', $TspCommit).
  Replace('{{BRANCH_NAME}}', $BranchName)

if ($rendered -match '\{\{[A-Z_]+\}\}') {
  throw "Unresolved placeholders remain in rendered prompt: $($Matches[0])"
}

# 5a. Dry-run: print and exit.
if ($DryRun) {
  Write-Host ""
  Write-Host "----- BEGIN RENDERED PROMPT -----" -ForegroundColor Cyan
  Write-Output $rendered
  Write-Host "----- END RENDERED PROMPT -----" -ForegroundColor Cyan
  return
}

# 5b. Write to a temp file and dispatch.
$tmp = New-TemporaryFile
try {
  Set-Content -Path $tmp.FullName -Value $rendered -NoNewline -Encoding utf8
  Write-Host ""
  Write-Host "Dispatching agent task to $Repo (base: $BaseBranch)..."

  $args = @('agent-task', 'create', '-R', $Repo, '-b', $BaseBranch, '-F', $tmp.FullName)
  if ($Follow) { $args += '--follow' }

  $output = & gh @args 2>&1
  $exit = $LASTEXITCODE
  Write-Output $output
  if ($exit -ne 0) {
    throw "gh agent-task create failed with exit code $exit."
  }
}
finally {
  Remove-Item -Path $tmp.FullName -ErrorAction SilentlyContinue
}
