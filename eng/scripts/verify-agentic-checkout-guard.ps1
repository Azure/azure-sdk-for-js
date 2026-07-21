#!/usr/bin/env pwsh
<#
.SYNOPSIS
    Guards the `continue-on-error` stopgap on the "Checkout PR branch" step of
    agentic reviewer workflows that run with `checkout: false`.

.DESCRIPTION
    gh-aw has a compiler bug (https://github.com/github/gh-aw/issues/30791):
    when a PR-triggered workflow sets `checkout: false`, the compiler still emits
    a "Checkout PR branch" helper step. With no `actions/checkout` having run there
    is no `.git`, so the helper aborts with "fatal: not a git repository" (git exit
    128) and, since gh-aw v0.81.6 removed the tolerant `continue-on-error`, that
    failure now aborts the whole agent job.

    The affected reviewer agents fetch everything through the GitHub MCP and do not
    need a local checkout, so `checkout: false` is the correct, secure setting (it
    keeps untrusted fork code off disk). The fix is therefore to keep `checkout: false`
    and mark the phantom helper step `continue-on-error: true` so it stays non-fatal.

    Because `*.lock.yml` files are compiled artifacts, any gh-aw recompile/upgrade
    silently drops that hand-applied line. This guard fails CI when the stopgap is
    missing so a recompile cannot silently re-break the workflow.

    Remove this guard and the `continue-on-error` line once gh-aw ships a fix for
    issue #30791 and the workflow is recompiled against it.

.NOTES
    Extend $GuardedWorkflows when the stopgap is applied to additional workflows.
#>

[CmdletBinding()]
param(
    [string] $WorkflowDir = (Join-Path $PSScriptRoot '..' '..' '.github' 'workflows')
)

$ErrorActionPreference = 'Stop'

# Workflow ids (basename without extension) whose lock file must keep the stopgap.
$GuardedWorkflows = @(
    'mgmt-review'
)

$issueUrl = 'https://github.com/github/gh-aw/issues/30791'
$failures = New-Object System.Collections.Generic.List[string]

foreach ($id in $GuardedWorkflows) {
    $mdPath = Join-Path $WorkflowDir "$id.md"
    $lockPath = Join-Path $WorkflowDir "$id.lock.yml"

    if (-not (Test-Path $mdPath)) {
        $failures.Add("[$id] source file not found: $mdPath")
        continue
    }
    if (-not (Test-Path $lockPath)) {
        $failures.Add("[$id] lock file not found: $lockPath")
        continue
    }

    # Only workflows that disable checkout are affected by the gh-aw bug.
    $mdLines = Get-Content -LiteralPath $mdPath
    $hasCheckoutFalse = $mdLines | Where-Object { $_ -match '^\s*checkout:\s*false\s*$' }
    if (-not $hasCheckoutFalse) {
        $failures.Add("[$id] expected 'checkout: false' in $id.md but did not find it; " +
            "the guard's assumptions no longer hold. Re-evaluate the stopgap for $id.")
        continue
    }

    # Locate the "Checkout PR branch" step and confirm continue-on-error is set on it
    # (before the next '- name:' step begins).
    $lockLines = Get-Content -LiteralPath $lockPath
    $stepIndex = -1
    for ($i = 0; $i -lt $lockLines.Count; $i++) {
        if ($lockLines[$i] -match '^\s*-\s*name:\s*Checkout PR branch\s*$') {
            $stepIndex = $i
            break
        }
    }

    if ($stepIndex -lt 0) {
        # The helper step is gone entirely (e.g. gh-aw fixed the bug). Then the stopgap
        # is obsolete: drop this workflow from $GuardedWorkflows and remove the guard.
        $failures.Add("[$id] no 'Checkout PR branch' step found in $id.lock.yml. If gh-aw " +
            "issue #30791 is fixed, remove '$id' from `$GuardedWorkflows and delete this guard.")
        continue
    }

    $found = $false
    for ($j = $stepIndex + 1; $j -lt $lockLines.Count; $j++) {
        if ($lockLines[$j] -match '^\s*-\s*name:\s*') { break } # next step
        if ($lockLines[$j] -match '^\s*continue-on-error:\s*true\s*$') { $found = $true; break }
    }

    if (-not $found) {
        $failures.Add("[$id] '$id.lock.yml' is missing 'continue-on-error: true' on the " +
            "'Checkout PR branch' step. A gh-aw recompile likely dropped it. Re-apply the line " +
            "(see the comment on that step) to keep the '$id' agent job from aborting on the " +
            "known gh-aw bug $issueUrl.")
    }
}

if ($failures.Count -gt 0) {
    Write-Host "verify-agentic-checkout-guard: FAILED" -ForegroundColor Red
    foreach ($f in $failures) {
        Write-Host "  - $f" -ForegroundColor Red
    }
    Write-Host ""
    Write-Host "Context: $issueUrl" -ForegroundColor Yellow
    exit 1
}

Write-Host "verify-agentic-checkout-guard: OK ($($GuardedWorkflows.Count) workflow(s) checked)" -ForegroundColor Green
exit 0
