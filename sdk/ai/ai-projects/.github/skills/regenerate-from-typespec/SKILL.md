---
name: regenerate-from-typespec
description: 'Regenerate the @azure/ai-projects client from the latest TypeSpec commit on Azure/azure-rest-api-specs. Use when refreshing emitted code, bumping the pinned tsp-location commit, running tsp-client update, or pulling in upstream Foundry spec changes. Handles the rename dance between tsp-location.saved.yaml and tsp-location.yaml, and captures upstream commit descriptions for post-merge validation.'
---

# Regenerate ai-projects from TypeSpec

## When to Use

- You need to pull the newest TypeSpec changes from `Azure/azure-rest-api-specs` into this package.
- The pinned commit in `tsp-location.saved.yaml` is stale and you want to re-emit the generated client.
- Someone asks to "regen from TypeSpec", "bump the spec commit", "run tsp-client update", or similar.

## Inputs

| Name | Default | Description |
|------|---------|-------------|
| `branch` | `feature/foundry-release` | Branch on `Azure/azure-rest-api-specs` to read the latest commit from. |
| `commit` | _(none)_ | Optional explicit commit SHA. If provided, skip the `git ls-remote` lookup. |
| `commitDescriptionsPath` | `temp/typespec-commit-descriptions.md` | File to write upstream commit subjects and bodies for the old-exclusive/new-inclusive TypeSpec range. |

## Prerequisites

- `git` on PATH.
- `npm` on PATH.
- The package dev dependency `@azure-tools/typespec-client-generator-cli` (provides `tsp-client`) must be installed. From the repository root, run `pnpm install` first if dependencies are not already installed.
- **Clean working tree under `sdk/ai/ai-projects/`.** `dev-tool customization apply` does a 3-way merge against the committed `generated/` baseline; running it on a tree with uncommitted changes from a prior failed regen produces silently-incorrect output (e.g. new model types from upstream do not get propagated into `src/`). Verify with `git status -- sdk/ai/ai-projects/` and revert any leftover changes before proceeding.

## Procedure

Run from the package root: `sdk/ai/ai-projects/`.

### Step 1: Capture the current and target commits

Before mutating `tsp-location.saved.yaml`, capture the currently pinned commit and resolve the target commit. Then fetch enough `Azure/azure-rest-api-specs` history to write the commit subjects and bodies from the commit after the current hash through the target hash, inclusive. Use this artifact later to verify that the SDK code after emitter merge adheres to the upstream change descriptions.

```powershell
$branch = 'feature/foundry-release'
$commit = $null
$currentCommit = (Select-String -Path tsp-location.saved.yaml -Pattern '^commit:\s*(\S+)' | ForEach-Object { $_.Matches[0].Groups[1].Value })
if ($commit) {
	$targetCommit = $commit
} else {
	$targetCommit = ./.github/skills/regenerate-from-typespec/scripts/update-tsp-commit.ps1 -ResolveOnly -Branch $branch
}
$commitDescriptionsPath = 'temp/typespec-commit-descriptions.md'

$specRepo = Join-Path $env:TEMP 'azure-rest-api-specs-foundry'
if (-not (Test-Path $specRepo)) {
	git clone --filter=blob:none --no-checkout https://github.com/Azure/azure-rest-api-specs.git $specRepo
}
git -C $specRepo fetch --filter=blob:none --no-tags origin $branch

New-Item -ItemType Directory -Force (Split-Path $commitDescriptionsPath) | Out-Null
git -C $specRepo log --reverse --format='commit %H%nsubject: %s%n%n%b%n---' "$currentCommit..$targetCommit" > $commitDescriptionsPath
if (-not (Get-Content $commitDescriptionsPath -Raw).Trim()) {
	throw "No upstream commit descriptions found for range $currentCommit..$targetCommit"
}
```

With an explicit commit, set `$targetCommit = '<40-char-sha>'` instead of using `-ResolveOnly`. If `git log` returns no commits, stop and verify that `$currentCommit` is an ancestor of `$targetCommit` on the selected TypeSpec branch; do not proceed with an empty commit-description artifact unless the user explicitly confirms the hashes are intentionally identical.

### Step 2: Apply the target commit

Invoke the bundled script. It (a) resolves the latest commit hash for `branch` (or accepts an explicit `-Commit`), (b) renames `tsp-location.saved.yaml` → `tsp-location.yaml`, and (c) rewrites the `commit:` field in place.

```powershell
./.github/skills/regenerate-from-typespec/scripts/update-tsp-commit.ps1 -Branch feature/foundry-release
# or, with an explicit commit:
./.github/skills/regenerate-from-typespec/scripts/update-tsp-commit.ps1 -Commit <40-char-sha>
```

See [scripts/update-tsp-commit.ps1](./scripts/update-tsp-commit.ps1).

### Step 3: Run the emitter

```powershell
npm run generate:client
```

This runs `tsp-client update -d && npm run format && dev-tool customization apply`. The emitter writes **directly into `generated/` and `src/`** — there is no `incoming/` snapshot. The next skill (`apply-post-emitter-edits`) inspects the resulting working-tree diff via `git diff` rather than a separate staging directory.

### Step 4: Restore the saved-yaml filename

This MUST run whether Step 3 succeeded or failed.

```powershell
./.github/skills/regenerate-from-typespec/scripts/update-tsp-commit.ps1 -RestoreOnly
```

The script wraps Step 2's edits in a `try/finally` when invoked normally, but if you ran the emitter in a separate shell, call it again with `-RestoreOnly` to put `tsp-location.yaml` back to `tsp-location.saved.yaml`.

### Step 5: Verify

- `tsp-location.saved.yaml` exists, `tsp-location.yaml` does not.
- The `commit:` line in `tsp-location.saved.yaml` matches the resolved hash.
- `temp/typespec-commit-descriptions.md` exists and contains the upstream commit descriptions for `$currentCommit..$targetCommit`.
- `git status` shows changes under `generated/` and/or `src/` from the regen.
- Review the commit descriptions against the emitted diff before and after post-emitter merging; any SDK behavior, API shape, samples, or tests added during follow-up work should trace back to those upstream descriptions or be called out as an intentional local workaround.

## Hand-off

Once this skill completes, hand off to the `apply-post-emitter-edits` skill to merge the emitted output into `src/`. Include `temp/typespec-commit-descriptions.md` in that hand-off so the post-merge SDK diff can be checked against the upstream TypeSpec commit descriptions.

## Notes

- This skill never commits. It only edits `tsp-location.saved.yaml`, writes `temp/typespec-commit-descriptions.md`, and runs the emitter.
- The branch default is `feature/foundry-release`. Override only when explicitly asked.
- The emitter writes directly into `generated/` and `src/`. Leave those changes in the working tree (do **not** stash, revert, or stage them) so `apply-post-emitter-edits` can inspect them via `git diff`.
