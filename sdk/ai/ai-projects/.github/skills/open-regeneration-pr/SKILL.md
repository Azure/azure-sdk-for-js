---
name: open-regeneration-pr
description: "Commit ai-projects regeneration output and finish a draft GitHub PR. Use when the prior five regen skills are complete. Supports either a manually dispatched task that creates and pushes a branch via gh, or an issue-assigned Copilot session that already owns its branch and PR. Stages three to five non-empty logical commits and never force-pushes."
---

# Open the regeneration PR for ai-projects

## When to Use

- The previous five skills (`regenerate-from-typespec`, `apply-post-emitter-edits`, `author-samples`, `author-tests`, `update-changelog`) have all completed.
- The working tree has staged-able changes only in `sdk/ai/ai-projects/`.
- You're ready to publish a **draft** PR for human review.

## Inputs

| Name                  | Default                                    | Description                                                                           |
| --------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------- |
| `tspCommit`           | _required_                                 | The 40-char SHA from `tsp-location.saved.yaml` (the upstream commit being pulled in). |
| `branchName`          | `regen/ai-projects/<short-sha>-<yyyyMMdd>` | Branch name to create outside a managed agent session.                                |
| `baseBranch`          | `main`                                     | Branch from which the task starts and which the PR targets.                           |
| `remote`              | `origin`                                   | Git remote to push to outside a managed agent session.                                |
| `samplesNoOp`         | `false`                                    | Assert that `author-samples` completed as a documented no-op.                         |
| `testsNoOp`           | `false`                                    | Assert that `author-tests` completed as a documented no-op.                           |
| `managedAgentSession` | `false`                                    | Keep the current Copilot-owned branch and leave push/PR publication to the session.   |

## Prerequisites

- For manually dispatched tasks, `gh` CLI installed and authenticated against `Azure/azure-sdk-for-js`.
- Clean working tree apart from changes under `sdk/ai/ai-projects/`.
- Empty Git index; the script stages each logical commit group itself.

## Procedure

Run from `sdk/ai/ai-projects/` (the script `cd`s to the repo root as needed).

### Step 1: Create branch and stage commits

```powershell
./.github/skills/open-regeneration-pr/scripts/open-pr.ps1 -TspCommit <40-char-sha> -BaseBranch main
```

The script ([scripts/open-pr.ps1](./scripts/open-pr.ps1)) does:

1. Aborts if the Git index is non-empty or there are unstaged changes outside `sdk/ai/ai-projects/`.
2. In manual mode, fetches `remote/baseBranch`, requires the current `HEAD` to equal that fetched tip, then creates `regen/ai-projects/<short-sha>-<yyyyMMdd>`.
3. Stages three to five non-empty logical commits, each scoped via path filters:
   - `[ai-projects] regen: emitter output @ <short-sha>` — `generated/`, `tsp-location.saved.yaml`.
   - `[ai-projects] regen: post-emitter edits` — `src/`, API reports, and post-emitter workaround data (excluding samples/tests).
   - `[ai-projects] regen: samples for new features` — `samples-dev/`, omitted when sample authoring was a documented no-op.
   - `[ai-projects] regen: tests for new GA features` — `test/`, omitted when test authoring was a documented no-op.
   - `[ai-projects] regen: changelog` — `CHANGELOG.md`.
4. Pushes to `origin` (no force).
5. Calls `gh pr create --draft` against `baseBranch` with title `[ai-projects] Regenerate from azure-rest-api-specs@<short-sha>` and a body templated from changelog content + a verification checklist.

### Managed Copilot issue session

When this workflow started by assigning an issue to Copilot, the session already owns exactly one branch and one draft pull request. Run:

```powershell
./.github/skills/open-regeneration-pr/scripts/open-pr.ps1 `
   -TspCommit <40-char-sha> `
   -BaseBranch <issue-base-branch> `
   -ManagedAgentSession
```

Pass `-SamplesNoOp` or `-TestsNoOp` only when the corresponding authoring skill explicitly completed as a documented no-op; omit each switch when that skill produced changes.

Managed mode keeps the current branch and prepares the same logical commits, but does not switch branches, push, or call `gh pr create`. The Copilot session publishes its existing branch and updates its existing draft PR.

### Step 2: Verify

- The PR shows up as **Draft** in GitHub.
- The PR body links the upstream commit: `https://github.com/Azure/azure-rest-api-specs/commit/<sha>`.
- The verification checklist (build, format, test TypeScript/lint, build:samples) reports the checks that actually ran.

## Safety rails

- **Never** runs `git push --force` or `git push --force-with-lease`.
- **Never** opens a non-draft PR — humans flip it to "ready for review".
- In managed mode, **never** creates a branch, pushes manually, or opens a second PR.
- **Never** stages files outside `sdk/ai/ai-projects/`.
- Rejects a non-empty Git index before staging any logical commit group.
- In manual mode, requires `HEAD` to equal the freshly fetched `remote/baseBranch` tip.
- Requires emitter output, post-emitter edits, and changelog commit groups to be non-empty. Empty sample and test groups require the corresponding explicit no-op switch, and a group marked as a no-op must not contain changes.
- Aborts before publishing if any package changes remain outside the recognized commit groups.
