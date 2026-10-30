# Re-record the sdk/ai/ai-projects test suite and keep only recordings that pass playback.
#
# Usage:
#   ./rerecord.ps1 [-TestFilter <pattern>] [-Push] [-SkipRecord]
#
# Flow: TEST_MODE=record npm run test:node  ->  TEST_MODE=playback npm run test:node
#       -> revert recordings for specs that failed playback
#       -> verify all "key" fields in recordings are sanitized
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
    # Pipe to `Out-Host` so the runner's stdout is displayed but does NOT leak
    # into this function's output stream — otherwise the captured value becomes
    # an array (stdout lines + boolean), which is always truthy and silently
    # defeats the playback-failure gate. `Out-Host` does not reset $LASTEXITCODE.
    if ($TestFilter) {
      & cmd /c "npx dev-tool run build-test --no-browser-test && npx dev-tool run test:vitest -- ""$TestFilter""" | Out-Host
    }
    else {
      & cmd /c "npm run test:node" | Out-Host
    }
    $code = $LASTEXITCODE
    return ($code -eq 0)
  }
  finally {
    $env:TEST_MODE = $prev
  }
}

function Get-RecordingsDirectory {
  $assetsDir = Join-Path $repoRoot '.assets'
  $singleBreadcrumb = Join-Path $assetsDir '.breadcrumb'
  $multiBreadcrumbDir = Join-Path $assetsDir 'breadcrumb'

  $entries = @()
  if (Test-Path $singleBreadcrumb) {
    $entries += Get-Content $singleBreadcrumb | Where-Object { $_.Trim() }
  }
  elseif (Test-Path $multiBreadcrumbDir) {
    Get-ChildItem -Path $multiBreadcrumbDir -Filter '*.breadcrumb' -File | ForEach-Object {
      $entries += Get-Content $_.FullName | Where-Object { $_.Trim() }
    }
  }

  $expectedRel = 'sdk/ai/ai-projects/assets.json'
  $cloneDir = $null
  foreach ($entry in $entries) {
    $parts = $entry.Trim().Split(';')
    if ($parts.Length -ge 2 -and ($parts[0] -replace '\\', '/') -eq $expectedRel) {
      $cloneDir = Join-Path $assetsDir $parts[1].Trim()
      break
    }
  }

  if (-not $cloneDir -or -not (Test-Path $cloneDir)) {
    throw "Could not locate the .assets clone directory for $expectedRel. Run 'npx dev-tool test-proxy restore' first."
  }

  $assetsConfig = Get-Content './assets.json' -Raw | ConvertFrom-Json
  $prefix = $assetsConfig.AssetsRepoPrefixPath
  if ($prefix) {
    return Join-Path $cloneDir "$prefix/sdk/ai/ai-projects/recordings"
  }
  return Join-Path $cloneDir 'sdk/ai/ai-projects/recordings'
}

function Test-RecordingsKeySanitized {
  Write-Host "==> Checking recordings to ensure all ""key"" fields are sanitized" -ForegroundColor Cyan
  $recordingsDir = Get-RecordingsDirectory
  if (-not (Test-Path $recordingsDir)) {
    throw "Recordings directory not found at: $recordingsDir"
  }

  $unsanitized = @()
  $files = Get-ChildItem -Path $recordingsDir -Filter '*.json' -Recurse -File
  foreach ($file in $files) {
    $matchesInFile = Select-String -Path $file.FullName -Pattern '"key"\s*:\s*(?<val>.+)' -AllMatches
    foreach ($m in $matchesInFile) {
      $rawVal = $m.Matches[0].Groups['val'].Value.Trim().TrimEnd(',')
      $isSanitized = ($rawVal -match '^"(?i:Sanitized)"$') -or ($rawVal -match '^"0+"$')
      if (-not $isSanitized) {
        $relPath = $file.FullName.Substring($recordingsDir.Length).TrimStart('\', '/')
        $unsanitized += "${relPath}:$($m.LineNumber): $($m.Line.Trim())"
      }
    }
  }

  if ($unsanitized.Count -gt 0) {
    Write-Warning "Found unsanitized ""key"" field(s) in local recordings:"
    foreach ($item in $unsanitized) {
      Write-Warning "  $item"
    }
    return $false
  }

  Write-Host "==> Verified all ""key"" fields in $($files.Count) recording file(s) are sanitized." -ForegroundColor Green
  return $true
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

# --- Step 4: Verify all "key" values in recordings are sanitized ----------------------
$keysSanitized = Test-RecordingsKeySanitized

# --- Step 5: Enforce 'only passing recordings' and key sanitization -------------------
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

if (-not $keysSanitized) {
  Write-Warning @"
Sanitization check FAILED: one or more recordings contain an unsanitized "key": value.
Ensure 'test/public/utils/createClient.ts' sanitizes '$..key' and sanitize or re-record the affected files before pushing.
"@
  if ($Push) {
    throw "Not pushing: unsanitized 'key' values detected in recordings."
  }
  exit 1
}

# --- Step 6: Push (optional) ----------------------------------------------------------
if ($Push) {
  Write-Host "==> Pushing recordings to Azure/azure-sdk-assets" -ForegroundColor Cyan
  # Wrap in `cmd /c` so the push failure is reliably reflected in $LASTEXITCODE
  # (the npm/npx PowerShell shims do not reliably propagate the child exit code).
  & cmd /c "npx dev-tool test-proxy push"
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
