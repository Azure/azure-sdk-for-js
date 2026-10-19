# Verify that the ai-projects package working tree is clean before regeneration.
#
# Usage (from sdk/ai/ai-projects/, after the setup build):
#   ./.github/skills/regenerate-from-typespec/scripts/assert-clean-tree.ps1
#
# Behavior:
#   The setup build runs API extraction, which rewrites the browser and react-native API diff
#   reports under review/. Those two files are build output, not user changes, so they must not
#   fail the clean-tree preflight. This script reverts only them: an untracked copy is deleted,
#   and a tracked copy is restored from the Git index. The build overwrites these files anyway, so
#   no user edit to them survives the build. Staged changes are left in place and still fail the
#   preflight. The script then requires `git status --short -- .` to be empty; any other change
#   fails the preflight.

[CmdletBinding()]
param()

$ErrorActionPreference = 'Stop'

if (-not (Test-Path 'tsp-location.saved.yaml')) {
  throw 'Expected tsp-location.saved.yaml in the current directory. Run from sdk/ai/ai-projects/.'
}

$buildArtifacts = @(
  'review/ai-projects-browser.api.diff.md',
  'review/ai-projects-react-native.api.diff.md'
)

foreach ($path in $buildArtifacts) {
  & git ls-files --error-unmatch -- $path *> $null
  if ($LASTEXITCODE -eq 0) {
    & git restore -- $path
    if ($LASTEXITCODE -ne 0) { throw "Failed to restore build artifact $path." }
  }
  elseif (Test-Path -LiteralPath $path) {
    Remove-Item -LiteralPath $path -Force
    Write-Host "Removed untracked build artifact $path"
  }
}

$status = @(& git status --short -- .)
if ($LASTEXITCODE -ne 0) { throw 'Failed to inspect the package working tree.' }
if ($status.Count) {
  throw "Package working tree is not clean:`n$($status -join "`n")"
}
Write-Host 'Package working tree is clean.'
