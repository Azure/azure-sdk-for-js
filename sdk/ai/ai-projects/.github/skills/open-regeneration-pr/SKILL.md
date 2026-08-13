---
name: open-regeneration-pr
description: 'Commit ai-projects regeneration output to a new branch and open a draft GitHub PR against Azure/azure-sdk-for-js main. Use when the prior five regen skills are complete and you need to push the branch and create a draft pull request via the gh CLI. Stages five logical commits (emitter output, post-emitter edits, samples, tests, changelog). Never force-pushes; always opens as draft.'
---

# Open the regeneration PR for ai-projects

## When to Use

- The previous five skills (`regenerate-from-typespec`, `apply-post-emitter-edits`, `author-samples`, `author-tests`, `update-changelog`) have all completed.
- The working tree has staged-able changes only in `sdk/ai/ai-projects/`.
- You're ready to publish a **draft** PR for human review.

## Inputs

| Name | Default | Description |
|------|---------|-------------|
| `tspCommit` | _required_ | The 40-char SHA from `tsp-location.saved.yaml` (the upstream commit being pulled in). |
| `branchName` | `regen/ai-projects/<short-sha>-<yyyyMMdd>` | Branch name to create. |
| `remote` | `origin` | Git remote to push to. |

## Prerequisites

- `gh` CLI installed and authenticated against `Azure/azure-sdk-for-js`.
- Clean working tree apart from changes under `sdk/ai/ai-projects/`.

## Procedure

Run from `sdk/ai/ai-projects/` (the script `cd`s to the repo root as needed).

### Step 1: Create branch and stage commits

```powershell
./.github/skills/open-regeneration-pr/scripts/open-pr.ps1 -TspCommit <40-char-sha>
```

The script ([scripts/open-pr.ps1](./scripts/open-pr.ps1)) does:

1. Aborts if there are unstaged changes outside `sdk/ai/ai-projects/`.
2. Creates branch `regen/ai-projects/<short-sha>-<yyyyMMdd>` from current `HEAD`.
3. Stages five logical commits, each scoped via path filters:
   - `[ai-projects] regen: emitter output @ <short-sha>` — `generated/`, `tsp-location.saved.yaml`.
   - `[ai-projects] regen: post-emitter edits` — `src/` (excluding samples/tests).
   - `[ai-projects] regen: samples for new features` — `samples-dev/`.
   - `[ai-projects] regen: tests for new GA features` — `test/`.
   - `[ai-projects] regen: changelog` — `CHANGELOG.md`.
4. Pushes to `origin` (no force).
5. Calls `gh pr create --draft` with title `[ai-projects] Regenerate from azure-rest-api-specs@<short-sha>` and a body templated from changelog content + a verification checklist.

### Step 2: Verify

- The PR shows up as **Draft** in GitHub.
- The PR body links the upstream commit: `https://github.com/Azure/azure-rest-api-specs/commit/<sha>`.
- The verification checklist (build, format, test:node, build:samples) is present and unchecked, awaiting human/CI confirmation.

## Safety rails

- **Never** runs `git push --force` or `git push --force-with-lease`.
- **Never** opens a non-draft PR — humans flip it to "ready for review".
- **Never** stages files outside `sdk/ai/ai-projects/`.
- Aborts immediately if a commit step would be empty (signals an upstream skill failure).
