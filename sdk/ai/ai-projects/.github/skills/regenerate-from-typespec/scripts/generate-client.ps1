# Run the ai-projects emitter and customization merge using public npm registry URLs.
#
# Usage (from sdk/ai/ai-projects/, after update-tsp-commit.ps1 created tsp-location.yaml):
#   ./.github/skills/regenerate-from-typespec/scripts/generate-client.ps1
#
# Behavior:
#   Equivalent to `npm run generate:client` (`tsp-client update -d && npm run customize`),
#   split into `tsp-client sync` and `tsp-client generate` so that the temporary copy of
#   eng/emitter-package-lock.json can be normalized in between. The committed lockfile may pin
#   tarballs to Azure Artifacts upstream feeds (for example
#   https://ms-feed-25.pkgs.visualstudio.com/.../_packaging/npm-public/npm/registry/), which are
#   unreachable from the Copilot cloud agent firewall. Those URLs are rewritten to
#   https://registry.npmjs.org/ in TempTypeSpecFiles/package-lock.json only. Integrity hashes are
#   unchanged, so npm still verifies every tarball. The repository lockfile is never modified.
#
#   Customization is a three-way merge of the emitted output with the committed customizations. When
#   the strict merge rejects a change, that is recoverable rather than a reason to stop: unless
#   -Strict is passed, the script reruns customization in recovery mode, which keeps the customized
#   code for every change it cannot merge and writes temp/customization-worklist.md. The apply-post-
#   emitter-edits skill dispositions each worklist entry. Recovery never runs over uncommitted src/
#   changes, because it rewrites src/ from the committed baseline. If recovery itself fails, src/ is
#   restored to the committed state so the unresolved output of the generic merge is not left behind.

[CmdletBinding()]
param(
  [string]$PublicRegistry = 'https://registry.npmjs.org/',
  [switch]$Strict
)

$ErrorActionPreference = 'Stop'

if (-not (Test-Path 'tsp-location.yaml')) {
  throw 'Expected tsp-location.yaml in the current directory. Run update-tsp-commit.ps1 first, from sdk/ai/ai-projects/.'
}

# Recorded before any step can touch the tree: recovery rewrites src/, so it needs a clean start.
$sourceWasClean = [string]::IsNullOrWhiteSpace((git status --porcelain -- src | Out-String))

$tspClientPrefix = (Resolve-Path (Join-Path (Get-Location) '../../../eng/common/tsp-client')).Path
if (-not (Test-Path (Join-Path $tspClientPrefix 'node_modules/@azure-tools/typespec-client-generator-cli/package.json'))) {
  throw 'The pinned tsp-client is not installed. From the repository root run `npm --prefix eng/common/tsp-client ci`.'
}

function Invoke-Checked {
  param([string]$Description, [scriptblock]$Command)
  & $Command
  if ($LASTEXITCODE -ne 0) {
    throw "$Description failed with exit code $LASTEXITCODE"
  }
}

Invoke-Checked 'tsp-client sync' { npm --prefix $tspClientPrefix exec -- tsp-client sync -d }

$lockPath = Join-Path 'TempTypeSpecFiles' 'package-lock.json'
if (Test-Path $lockPath) {
  $registry = $PublicRegistry.TrimEnd('/') + '/'
  $feedPattern = 'https://[^"/\s]+/(?:[^"\s]*/)?_packaging/[^"/\s]+/npm/registry/'
  $content = Get-Content $lockPath -Raw
  $rewriteCount = [regex]::Matches($content, $feedPattern).Count
  if ($rewriteCount -gt 0) {
    Set-Content -Path $lockPath -Value ([regex]::Replace($content, $feedPattern, $registry)) -NoNewline
  }
  Write-Host "Rewrote $rewriteCount Azure Artifacts tarball URL(s) in $lockPath to $registry"

  $registryHost = ([uri]$registry).Host
  $otherHosts = (Get-Content $lockPath -Raw | ConvertFrom-Json -AsHashtable).packages.Values |
    Where-Object { $_.resolved } |
    ForEach-Object { ([uri]$_.resolved).Host } |
    Where-Object { $_ -ne $registryHost } |
    Sort-Object -Unique
  if ($otherHosts) {
    throw "Emitter lockfile still resolves tarballs from non-public host(s): $($otherHosts -join ', '). Add a rewrite for them or allowlist them for the cloud agent."
  }
} else {
  Write-Host "No $lockPath found; tsp-client will run npm install without a lockfile."
}

Invoke-Checked 'tsp-client generate' { npm --prefix $tspClientPrefix exec -- tsp-client generate -d }

# A worklist left by an earlier run describes a different emission.
Remove-Item -Path 'temp/customization-worklist.md' -Force -ErrorAction SilentlyContinue

$previousRecover = $env:CUSTOMIZE_RECOVER
try {
  $env:CUSTOMIZE_RECOVER = '0'
  npm run customize
  $customizeExitCode = $LASTEXITCODE
} finally {
  $env:CUSTOMIZE_RECOVER = $previousRecover
}
if ($customizeExitCode -eq 0) { return }

if ($Strict) {
  throw "npm run customize failed with exit code $customizeExitCode"
}
if (-not $sourceWasClean) {
  throw "npm run customize failed with exit code $customizeExitCode, and src/ had uncommitted changes before this run. Recovery would overwrite them, so it was not attempted. Commit or restore src/ (git restore -- src; git clean -fd -- src), then rerun this script."
}

Write-Warning 'Strict customization rejected the emitted changes. Continuing in recovery mode instead of stopping.'
node scripts/customize.mjs --recover
if ($LASTEXITCODE -ne 0) {
  $recoverExitCode = $LASTEXITCODE
  # The generic merge that ran first left unresolved output in src/ (conflict markers,
  # duplicated declarations). src/ was clean before this run, so restoring it cannot lose
  # work, and a session that stops here must not publish that output.
  git restore -- src
  git clean -fd -- src | Out-Null
  throw "customize --recover failed with exit code $recoverExitCode. src/ was restored to the committed state so the unresolved merge output is not left behind; generated/ still holds the new emission."
}
Invoke-Checked 'npm run format' { npm run format }
Invoke-Checked 'customize --recover --check' { node scripts/customize.mjs --recover --check }
Write-Host ''
Write-Host 'RECOVERY MODE: the customized code was kept for each change the resolver could not merge.'
Write-Host 'This is expected and not a reason to stop. Next, read temp/customization-worklist.md and follow'
Write-Host '"Step 0a" in the apply-post-emitter-edits skill. Verify later with "node scripts/customize.mjs --recover --check";'
Write-Host 'never rerun customize over your edits to src/.'
