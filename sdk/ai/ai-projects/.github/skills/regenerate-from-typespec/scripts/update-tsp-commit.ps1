# Update the pinned TypeSpec commit in tsp-location.saved.yaml.
#
# Usage:
#   ./update-tsp-commit.ps1 -Branch feature/foundry-release
#   ./update-tsp-commit.ps1 -Commit <40-char-sha>
#   ./update-tsp-commit.ps1 -RestoreOnly
#   ./update-tsp-commit.ps1 -ResolveOnly [-Branch <name>]
#
# Behavior:
#   - Default mode: resolves latest commit on the given branch via `git ls-remote`,
#     renames tsp-location.saved.yaml -> tsp-location.yaml, and rewrites `commit:`.
#   - -RestoreOnly: just renames tsp-location.yaml back to tsp-location.saved.yaml
#     (idempotent if the saved file already exists).
#   - -ResolveOnly: prints the resolved 40-char SHA for `Branch` to stdout and
#     exits without touching any files. Intended for callers that want to
#     reuse the resolution logic (e.g. start-cloud-regen.ps1).
#
# Run from sdk/ai/ai-projects/ (except -ResolveOnly, which has no cwd requirement).

[CmdletBinding(DefaultParameterSetName = 'FromBranch')]
param(
  [Parameter(ParameterSetName = 'FromBranch')]
  [Parameter(ParameterSetName = 'Resolve')]
  [string]$Branch = 'feature/foundry-release',

  [Parameter(ParameterSetName = 'FromCommit', Mandatory = $true)]
  [string]$Commit,

  [Parameter(ParameterSetName = 'Restore', Mandatory = $true)]
  [switch]$RestoreOnly,

  [Parameter(ParameterSetName = 'Resolve', Mandatory = $true)]
  [switch]$ResolveOnly,

  [string]$Repo = 'https://github.com/Azure/azure-rest-api-specs.git'
)

$ErrorActionPreference = 'Stop'

$savedPath = 'tsp-location.saved.yaml'
$activePath = 'tsp-location.yaml'

function Restore-SavedYaml {
  if (Test-Path $activePath) {
    if (Test-Path $savedPath) {
      Remove-Item $savedPath -Force
    }
    Move-Item $activePath $savedPath -Force
    Write-Host "Restored: $activePath -> $savedPath"
  } else {
    Write-Host "Nothing to restore; $activePath does not exist."
  }
}

function Resolve-LatestCommit {
  param([string]$Branch, [string]$Repo)
  $lsRemote = & git ls-remote $Repo "refs/heads/$Branch"
  if ($LASTEXITCODE -ne 0 -or -not $lsRemote) {
    throw "git ls-remote failed for branch '$Branch' on $Repo"
  }
  $sha = ($lsRemote -split '\s+')[0]
  if ($sha -notmatch '^[0-9a-f]{40}$') {
    throw "Resolved value '$sha' is not a 40-char hex SHA."
  }
  return $sha
}

if ($RestoreOnly) {
  Restore-SavedYaml
  return
}

if ($ResolveOnly) {
  $sha = Resolve-LatestCommit -Branch $Branch -Repo $Repo
  # Stdout only — no Write-Host, so callers can capture cleanly.
  Write-Output $sha
  return
}

# Resolve target commit hash.
if ($PSCmdlet.ParameterSetName -eq 'FromBranch') {
  Write-Host "Resolving latest commit on $Repo @ $Branch..."
  $Commit = Resolve-LatestCommit -Branch $Branch -Repo $Repo
}

if ($Commit -notmatch '^[0-9a-f]{40}$') {
  throw "Commit hash '$Commit' is not a 40-char hex SHA."
}

Write-Host "Target commit: $Commit"

if (-not (Test-Path $savedPath)) {
  throw "Expected $savedPath in current directory. Run from sdk/ai/ai-projects/."
}

# Rename saved -> active, then rewrite commit field.
if (Test-Path $activePath) {
  throw "$activePath already exists; refusing to overwrite. Run with -RestoreOnly first."
}
Move-Item $savedPath $activePath -Force
Write-Host "Renamed: $savedPath -> $activePath"

try {
  $content = Get-Content $activePath -Raw
  $updated = [regex]::Replace($content, '(?m)^commit:\s*\S+\s*$', "commit: $Commit")
  if ($updated -eq $content) {
    throw "Did not find a 'commit:' line to update in $activePath."
  }
  Set-Content -Path $activePath -Value $updated -NoNewline
  Write-Host "Updated commit field to $Commit in $activePath"
}
catch {
  Write-Host "Error updating commit; restoring saved filename." -ForegroundColor Yellow
  Restore-SavedYaml
  throw
}

Write-Host ""
Write-Host "tsp-location.yaml is in place. Now run:"
Write-Host "  npm run generate:client"
Write-Host "Then restore with:"
Write-Host "  ./.github/skills/regenerate-from-typespec/scripts/update-tsp-commit.ps1 -RestoreOnly"
