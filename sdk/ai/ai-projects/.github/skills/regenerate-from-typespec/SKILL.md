---
name: regenerate-from-typespec
description: 'Regenerate the @azure/ai-projects client from the latest TypeSpec commit on Azure/azure-rest-api-specs. Use when refreshing emitted code, bumping the pinned tsp-location commit, running tsp-client update, or pulling in upstream Foundry spec changes. Handles the rename dance between tsp-location.saved.yaml and tsp-location.yaml.'
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

## Prerequisites

- `git` on PATH.
- `npm` on PATH.
- The package dev dependency `@azure-tools/typespec-client-generator-cli` (provides `tsp-client`) must be installed. From the repository root, run `pnpm install` first if dependencies are not already installed.
- **Clean working tree under `sdk/ai/ai-projects/`.** `dev-tool customization apply` does a 3-way merge against the committed `generated/` baseline; running it on a tree with uncommitted changes from a prior failed regen produces silently-incorrect output (e.g. new model types from upstream do not get propagated into `src/`). Verify with `git status -- sdk/ai/ai-projects/` and revert any leftover changes before proceeding.

## Procedure

Run from the package root: `sdk/ai/ai-projects/`.

### Step 1: Resolve and apply the target commit

Invoke the bundled script. It (a) resolves the latest commit hash for `branch` (or accepts an explicit `-Commit`), (b) renames `tsp-location.saved.yaml` → `tsp-location.yaml`, and (c) rewrites the `commit:` field in place.

```powershell
./.github/skills/regenerate-from-typespec/scripts/update-tsp-commit.ps1 -Branch feature/foundry-release
# or, with an explicit commit:
./.github/skills/regenerate-from-typespec/scripts/update-tsp-commit.ps1 -Commit <40-char-sha>
```

See [scripts/update-tsp-commit.ps1](./scripts/update-tsp-commit.ps1).

### Step 2: Run the emitter

```powershell
npm run generate:client
```

This runs `tsp-client update -d && npm run format && dev-tool customization apply`. The emitter writes **directly into `generated/` and `src/`** — there is no `incoming/` snapshot. The next skill (`apply-post-emitter-edits`) inspects the resulting working-tree diff via `git diff` rather than a separate staging directory.

### Step 3: Restore the saved-yaml filename

This MUST run whether Step 2 succeeded or failed.

```powershell
./.github/skills/regenerate-from-typespec/scripts/update-tsp-commit.ps1 -RestoreOnly
```

The script wraps Step 1's edits in a `try/finally` when invoked normally, but if you ran the emitter in a separate shell, call it again with `-RestoreOnly` to put `tsp-location.yaml` back to `tsp-location.saved.yaml`.

### Step 4: Verify

- `tsp-location.saved.yaml` exists, `tsp-location.yaml` does not.
- The `commit:` line in `tsp-location.saved.yaml` matches the resolved hash.
- `git status` shows changes under `generated/` and/or `src/` from the regen.

## Hand-off

Once this skill completes, hand off to the `apply-post-emitter-edits` skill to merge the emitted output into `src/`.

## Notes

- This skill never commits. It only edits `tsp-location.saved.yaml` and runs the emitter.
- The branch default is `feature/foundry-release`. Override only when explicitly asked.
- The emitter writes directly into `generated/` and `src/`. Leave those changes in the working tree (do **not** stash, revert, or stage them) so `apply-post-emitter-edits` can inspect them via `git diff`.
