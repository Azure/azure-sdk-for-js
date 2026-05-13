# Open a draft regeneration PR for sdk/ai/ai-projects.
#
# Usage:
#   ./open-pr.ps1 -TspCommit <40-char-sha> [-BranchName <name>] [-Remote origin]
#
# Stages five logical commits, pushes to origin, and opens a DRAFT PR via `gh`.
# Run from sdk/ai/ai-projects/. Never force-pushes.

[CmdletBinding()]
param(
  [Parameter(Mandatory = $true)]
  [string]$TspCommit,

  [string]$BranchName,

  [string]$Remote = 'origin'
)

$ErrorActionPreference = 'Stop'

if ($TspCommit -notmatch '^[0-9a-f]{40}$') {
  throw "TspCommit must be a 40-char hex SHA."
}
$shortSha = $TspCommit.Substring(0, 7)

if (-not $BranchName) {
  $today = (Get-Date).ToString('yyyyMMdd')
  $BranchName = "regen/ai-projects/$shortSha-$today"
}

# 1. Sanity: working tree should only have changes under sdk/ai/ai-projects/.
$repoRoot = (& git rev-parse --show-toplevel).Trim()
if (-not $repoRoot) { throw "Not inside a git repo." }

Push-Location $repoRoot
try {
  $dirty = & git status --porcelain | Where-Object { $_ -and ($_ -notmatch '^.. sdk/ai/ai-projects/') }
  if ($dirty) {
    throw "Refusing to proceed: changes detected outside sdk/ai/ai-projects/:`n$($dirty -join "`n")"
  }

  # 2. Create branch from HEAD.
  Write-Host "Creating branch $BranchName"
  & git switch -c $BranchName
  if ($LASTEXITCODE -ne 0) { throw "git switch -c $BranchName failed." }

  $pkg = 'sdk/ai/ai-projects'

  function Commit-Group {
    param(
      [string]$Title,
      [string[]]$Paths
    )
    foreach ($p in $Paths) {
      & git add -- $p 2>$null
    }
    $staged = & git diff --cached --name-only
    if (-not $staged) {
      Write-Host "  (skip) no changes for: $Title"
      return
    }
    Write-Host "  commit: $Title"
    & git commit -m $Title | Out-Null
    if ($LASTEXITCODE -ne 0) { throw "git commit failed for: $Title" }
  }

  # 3. Stage five logical commits in order.
  Commit-Group "[ai-projects] regen: emitter output @ $shortSha" @(
    "$pkg/generated",
    "$pkg/tsp-location.saved.yaml"
  )

  # post-emitter edits live in src/ (exclude samples and tests, those get their own commits)
  Commit-Group "[ai-projects] regen: post-emitter edits" @(
    "$pkg/src",
    "$pkg/review",
    "$pkg/scripts/post-emitter-workarounds.md"
  )

  Commit-Group "[ai-projects] regen: samples for new features" @(
    "$pkg/samples-dev"
  )

  Commit-Group "[ai-projects] regen: tests for new GA features" @(
    "$pkg/test"
  )

  Commit-Group "[ai-projects] regen: changelog" @(
    "$pkg/CHANGELOG.md",
    "$pkg/package.json"
  )

  # Optional: skill scaffolding for the regen workflow itself.
  Commit-Group "[ai-projects] regen: skills for the regeneration workflow" @(
    "$pkg/.github"
  )

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

## New regeneration-workflow skills

This PR also seeds (or updates) the Copilot skills under ``sdk/ai/ai-projects/.github/skills/`` that were used to produce it. Each is a self-contained ``SKILL.md`` with bundled scripts/templates/references that VS Code Copilot loads on demand:

- **regenerate-from-typespec** — resolves the latest commit on ``feature/foundry-release`` (or a chosen ref), renames ``tsp-location.saved.yaml`` ↔ ``tsp-location.yaml``, and runs ``npm run generate:client`` against a clean working tree.
- **apply-post-emitter-edits** — walks the resulting ``git diff``, resolves diff3 conflict markers (always taking the custom side), enforces protected files, propagates genuinely-new public types from ``generated/`` to ``src/``, deduplicates redeclared symbols, repairs renamed positional parameters, and verifies the build + API extraction.
- **author-samples** — buckets new public-API additions into ``samples-dev/<feature>/`` skeletons and validates with ``npm run build:samples``. Cascade-rename aware so existing samples that called the renamed surface are patched in lockstep.
- **author-tests** — scaffolds ``.skip``-ped Vitest specs under ``test/public/`` for new **non-beta** GA features with ``TODO(<feature>): unskip after recording added`` markers; runs ``npm run test:node`` to confirm compilation only.
- **update-changelog** — inserts an ``## Unreleased`` entry classified into Breaking Changes / Features Added / Bugs Fixed / Other Changes.
- **open-regeneration-pr** — (this skill) commits the regen output as five (or six, with skills) logical commits and opens a draft PR via ``gh``.

## Verification checklist

- [ ] ``npx dev-tool run build-package`` (all four targets)
- [ ] ``npm run check-format``
- [ ] ``npm run build:samples``
- [ ] ``npm run test:node`` (skipped specs are expected for newly added GA features)
- [ ] ``review/ai-projects-node.api.md`` reviewed for unintended breaking changes
- [ ] ``CHANGELOG.md`` ``Unreleased`` header bumped to a real version

## Generated by
``open-regeneration-pr`` skill in ``sdk/ai/ai-projects/.github/skills/``.
"@

  $bodyFile = New-TemporaryFile
  Set-Content -Path $bodyFile -Value $body -NoNewline
  try {
    & gh pr create --draft --title $title --body-file $bodyFile --base main --head $BranchName
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
