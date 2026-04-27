# Update the pinned TypeSpec commit in tsp-location.saved.yaml.
#
# Usage:
#   ./update-tsp-commit.ps1 -Branch feature/foundry-release
#   ./update-tsp-commit.ps1 -Commit <40-char-sha>
#   ./update-tsp-commit.ps1 -RestoreOnly
#
# Behavior:
#   - Default mode: resolves latest commit on the given branch via `git ls-remote`,
#     renames tsp-location.saved.yaml -> tsp-location.yaml, and rewrites `commit:`.
#   - -RestoreOnly: just renames tsp-location.yaml back to tsp-location.saved.yaml
#     (idempotent if the saved file already exists).
#
# Run from sdk/ai/ai-projects/.

[CmdletBinding(DefaultParameterSetName = 'FromBranch')]
param(
  [Parameter(ParameterSetName = 'FromBranch')]
  [string]$Branch = 'feature/foundry-release',

  [Parameter(ParameterSetName = 'FromCommit', Mandatory = $true)]
  [string]$Commit,

  [Parameter(ParameterSetName = 'Restore', Mandatory = $true)]
  [switch]$RestoreOnly,

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

if ($RestoreOnly) {
  Restore-SavedYaml
  return
}

# Resolve target commit hash.
if ($PSCmdlet.ParameterSetName -eq 'FromBranch') {
  Write-Host "Resolving latest commit on $Repo @ $Branch..."
  $lsRemote = & git ls-remote $Repo "refs/heads/$Branch"
  if ($LASTEXITCODE -ne 0 -or -not $lsRemote) {
    throw "git ls-remote failed for branch '$Branch' on $Repo"
  }
  $Commit = ($lsRemote -split '\s+')[0]
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
