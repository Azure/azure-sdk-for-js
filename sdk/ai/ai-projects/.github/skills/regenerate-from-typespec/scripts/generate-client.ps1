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

[CmdletBinding()]
param(
  [string]$PublicRegistry = 'https://registry.npmjs.org/'
)

$ErrorActionPreference = 'Stop'

if (-not (Test-Path 'tsp-location.yaml')) {
  throw 'Expected tsp-location.yaml in the current directory. Run update-tsp-commit.ps1 first, from sdk/ai/ai-projects/.'
}

if (-not (Get-Command tsp-client -ErrorAction SilentlyContinue)) {
  throw 'tsp-client is not on PATH. From the repository root run `npm --prefix eng/common/tsp-client ci` and add eng/common/tsp-client/node_modules/.bin to PATH.'
}

function Invoke-Checked {
  param([string]$Description, [scriptblock]$Command)
  & $Command
  if ($LASTEXITCODE -ne 0) {
    throw "$Description failed with exit code $LASTEXITCODE"
  }
}

Invoke-Checked 'tsp-client sync' { tsp-client sync -d }

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

Invoke-Checked 'tsp-client generate' { tsp-client generate -d }
Invoke-Checked 'npm run customize' { npm run customize }
