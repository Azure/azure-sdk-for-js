# Re-record the sdk/ai/ai-projects test suite and keep only recordings that pass playback.
#
# Usage:
#   ./rerecord.ps1 [-TestFilter <pattern>] [-Push] [-SkipRecord]
#
# Flow: TEST_MODE=record npm run test:node  ->  TEST_MODE=playback npm run test:node
#       -> revert recordings for specs that failed playback
#       -> (optional) npx dev-tool test-proxy push  (updates assets.json Tag)
#
# Run from sdk/ai/ai-projects/. Requires live Azure auth + test env vars for record mode,
# and write access to Azure/azure-sdk-assets for -Push.

[CmdletBinding()]
param(
  [string]$TestFilter,
  [switch]$Push,
  [switch]$SkipRecord
)

$ErrorActionPreference = 'Stop'

# --- Locate the package and repo roots ------------------------------------------------
if (-not (Test-Path './assets.json')) {
  throw "Run this script from sdk/ai/ai-projects/ (no assets.json found in the current directory)."
}
$repoRoot = (& git rev-parse --show-toplevel).Trim()
if (-not $repoRoot) { throw "Not inside a git repo." }

function Invoke-Suite {
  param(
    [Parameter(Mandatory = $true)][ValidateSet('record', 'playback')][string]$Mode
  )
  Write-Host "==> Running test:node in '$Mode' mode" -ForegroundColor Cyan
  $prev = $env:TEST_MODE
  $env:TEST_MODE = $Mode
  try {
    # Invoke via `cmd /c` so the child's real exit code reaches $LASTEXITCODE.
    # (Calling the npm/npx PowerShell shims directly with `&` does not reliably
    # propagate the underlying process exit code, which can mask test failures.)
    if ($TestFilter) {
      & cmd /c "npx dev-tool run build-test --no-browser-test && npx dev-tool run test:vitest -- ""$TestFilter"""
    }
    else {
      & cmd /c "npm run test:node"
    }
    $code = $LASTEXITCODE
    return ($code -eq 0)
  }
  finally {
    $env:TEST_MODE = $prev
  }
}

# --- Step 1: Record -------------------------------------------------------------------
if (-not $SkipRecord) {
  $recordOk = Invoke-Suite -Mode 'record'
  if (-not $recordOk) {
    Write-Warning "Some specs failed during RECORD mode. Their recordings (if any) will be dropped after playback verification."
  }
}
else {
  Write-Host "==> Skipping record (-SkipRecord). Verifying existing local recordings." -ForegroundColor Yellow
}

# --- Step 2: Verify in playback (no live env vars) ------------------------------------
$playbackOk = Invoke-Suite -Mode 'playback'

# --- Step 3: Surface the recordings diff ----------------------------------------------
# `dev-tool test-proxy diff` locates the .assets clone via .breadcrumb and prints the
# git status/diff of the recordings subtree for this package.
Write-Host "==> Recordings changed since last restore/push:" -ForegroundColor Cyan
& npx dev-tool test-proxy diff

# --- Step 4: Enforce 'only passing recordings' ----------------------------------------
if (-not $playbackOk) {
  Write-Warning @"
Playback verification FAILED for one or more specs.
Only recordings that pass playback should be published.

Next steps (manual, to avoid publishing broken recordings):
  1. npx dev-tool test-proxy diff      # find the .assets clone + changed recordings
  2. Inside that clone dir: git restore <failing-files>   # drop failing recordings
  3. Re-run playback only:  ./rerecord.ps1 -SkipRecord
     (or re-record just the failing spec:  ./rerecord.ps1 -TestFilter <pattern>)

Refusing to auto-push while playback is red.
"@
  if ($Push) {
    throw "Not pushing: playback verification failed. Resolve the failing specs first."
  }
  exit 1
}

Write-Host "==> Playback verification PASSED for the selected specs." -ForegroundColor Green

# --- Step 5: Push (optional) ----------------------------------------------------------
if ($Push) {
  Write-Host "==> Pushing recordings to Azure/azure-sdk-assets" -ForegroundColor Cyan
  & npx dev-tool test-proxy push
  if ($LASTEXITCODE -ne 0) { throw "dev-tool test-proxy push failed." }

  Write-Host ""
  Write-Host "assets.json diff:" -ForegroundColor Cyan
  & git --no-pager diff -- assets.json
  Write-Host ""
  Write-Host "Recordings pushed and assets.json Tag updated. Next: open-assets-pr.ps1" -ForegroundColor Green
}
else {
  Write-Host ""
  Write-Host "Playback green. Re-run with -Push to publish, or push manually with: npx dev-tool test-proxy push" -ForegroundColor Yellow
}
