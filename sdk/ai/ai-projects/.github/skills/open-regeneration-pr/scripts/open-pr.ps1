# Open a draft regeneration PR for sdk/ai/ai-projects.
#
# Usage:
#   ./open-pr.ps1 -TspCommit <40-char-sha> [-BranchName <name>] [-BaseBranch main] [-Remote origin] [-SamplesNoOp] [-TestsNoOp]
#   ./open-pr.ps1 -TspCommit <40-char-sha> -ManagedAgentSession [-BaseBranch main] [-SamplesNoOp] [-TestsNoOp]
#
# Stages three to five logical commits, pushes to origin, and opens a DRAFT PR via `gh`.
# In a managed Copilot agent session, stages the commits but leaves branch and
# pull-request publishing to the session.
# Run from sdk/ai/ai-projects/. Never force-pushes.

[CmdletBinding()]
param(
  [Parameter(Mandatory = $true)]
  [string]$TspCommit,

  [string]$BranchName,

  [string]$Remote = 'origin',

  [string]$BaseBranch = 'main',

  [switch]$SamplesNoOp,

  [switch]$TestsNoOp,

  [switch]$ManagedAgentSession
)

$ErrorActionPreference = 'Stop'

if ($TspCommit -notmatch '^[0-9a-f]{40}$') {
  throw "TspCommit must be a 40-char hex SHA."
}
$shortSha = $TspCommit.Substring(0, 7)

if (-not $ManagedAgentSession -and -not $BranchName) {
  $today = (Get-Date).ToString('yyyyMMdd')
  $BranchName = "regen/ai-projects/$shortSha-$today"
}

# 1. Sanity: working tree should only have changes under sdk/ai/ai-projects/.
$repoRoot = (& git rev-parse --show-toplevel).Trim()
if (-not $repoRoot) { throw "Not inside a git repo." }

Push-Location $repoRoot
try {
  $staged = & git diff --cached --name-only
  if ($LASTEXITCODE -ne 0) { throw 'Failed to inspect the Git index.' }
  if ($staged) {
    throw "Refusing to proceed: the Git index must be empty before creating logical commits:`n$($staged -join "`n")"
  }

  $dirty = & git status --porcelain | Where-Object { $_ -and ($_ -notmatch '^.. sdk/ai/ai-projects/') }
  if ($dirty) {
    throw "Refusing to proceed: changes detected outside sdk/ai/ai-projects/:`n$($dirty -join "`n")"
  }

  # 2. Use the branch owned by the Copilot session, or create a branch for a
  # manually dispatched task.
  if ($ManagedAgentSession) {
    $currentBranch = (@(& git branch --show-current) -join '').Trim()
    if (-not $currentBranch) {
      throw 'Managed agent session must be running on a named branch.'
    }
    Write-Host "Using managed agent branch $currentBranch"
  }
  else {
    Write-Host "Fetching $BaseBranch from $Remote"
    & git fetch --no-tags -- $Remote $BaseBranch
    if ($LASTEXITCODE -ne 0) { throw "Failed to fetch $BaseBranch from $Remote." }

    $currentHead = (@(& git rev-parse HEAD) -join '').Trim()
    $fetchedBase = (@(& git rev-parse FETCH_HEAD) -join '').Trim()
    if (-not $currentHead -or -not $fetchedBase) {
      throw 'Failed to resolve the current HEAD or fetched base commit.'
    }
    if ($currentHead -cne $fetchedBase) {
      throw "Manual mode must start at $Remote/$BaseBranch ($fetchedBase), but HEAD is $currentHead."
    }

    Write-Host "Creating branch $BranchName"
    & git switch -c $BranchName
    if ($LASTEXITCODE -ne 0) { throw "git switch -c $BranchName failed." }
  }

  $pkg = 'sdk/ai/ai-projects'

  function Commit-Group {
    param(
      [string]$Title,
      [string[]]$Paths,
      [switch]$NoOp
    )
    foreach ($p in $Paths) {
      & git add -- $p 2>$null
    }
    $staged = & git diff --cached --name-only
    if (-not $staged) {
      if ($NoOp) {
        Write-Host "  (skip) no changes for: $Title"
        return
      }
      throw "Required commit group has no changes: $Title"
    }
    if ($NoOp) {
      throw "Commit group was marked as a no-op but has changes: $Title"
    }
    Write-Host "  commit: $Title"
    & git commit -m $Title | Out-Null
    if ($LASTEXITCODE -ne 0) { throw "git commit failed for: $Title" }
  }

  # 3. Stage three to five logical commits in order.
  Commit-Group "[ai-projects] regen: emitter output @ $shortSha" @(
    "$pkg/generated",
    "$pkg/tsp-location.saved.yaml"
  )

  # post-emitter edits live in src/ (exclude samples and tests, those get their own commits)
  Commit-Group "[ai-projects] regen: post-emitter edits" @(
    "$pkg/src",
    "$pkg/review",
    "$pkg/scripts/post-emitter-workarounds.md",
    "$pkg/.github/skills/apply-post-emitter-edits/references/parameter-renames.yml"
  )

  Commit-Group "[ai-projects] regen: samples for new features" @(
    "$pkg/samples-dev"
  ) -NoOp:$SamplesNoOp

  Commit-Group "[ai-projects] regen: tests for new GA features" @(
    "$pkg/test"
  ) -NoOp:$TestsNoOp

  Commit-Group "[ai-projects] regen: changelog" @(
    "$pkg/CHANGELOG.md",
    "$pkg/package.json"
  )

  $remaining = & git status --porcelain -- $pkg
  if ($remaining) {
    throw "Uncategorized changes remain under ${pkg}:`n$($remaining -join "`n")"
  }

  if ($ManagedAgentSession) {
    Write-Host "Prepared regeneration commits on $currentBranch."
    Write-Host 'Branch push and pull-request updates are owned by the Copilot agent session.'
    return
  }

  # 4. Push (no force).
  Write-Host "Pushing $BranchName to $Remote"
  & git push --set-upstream $Remote $BranchName
  if ($LASTEXITCODE -ne 0) { throw "git push failed." }

  # 5. Open draft PR.
  $title = "[ai-projects] Regenerate from azure-rest-api-specs@$shortSha"
  $body = @"
Regenerates ``@azure/ai-projects`` from upstream TypeSpec.

**Upstream commit**: https://github.com/Azure/azure-rest-api-specs/commit/$TspCommit

## Changes

See [CHANGELOG.md](sdk/ai/ai-projects/CHANGELOG.md) ``Unreleased`` section for the full classified change list.

## Verification checklist

- [ ] ``npx dev-tool run build-package`` (all four targets)
- [ ] ``npm run check-format``
- [ ] ``npm run build:samples``
- [ ] ``npx tsc -p tsconfig.test.node.json --noEmit``
- [ ] Targeted ESLint for new or edited test specs
- [ ] ``review/ai-projects-node.api.md`` reviewed for unintended breaking changes
- [ ] ``CHANGELOG.md`` ``Unreleased`` header bumped to a real version

## Generated by
``open-regeneration-pr`` skill in ``sdk/ai/ai-projects/.github/skills/``.
"@

  $bodyFile = New-TemporaryFile
  Set-Content -Path $bodyFile -Value $body -NoNewline
  try {
    & gh pr create --draft --title $title --body-file $bodyFile --base $BaseBranch --head $BranchName
    if ($LASTEXITCODE -ne 0) { throw "gh pr create failed." }
  }
  finally {
    Remove-Item $bodyFile -Force -ErrorAction SilentlyContinue
  }

  Write-Host ""
  Write-Host "Draft PR opened on branch $BranchName."
}
finally {
  Pop-Location
}
