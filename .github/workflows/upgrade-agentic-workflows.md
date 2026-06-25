---
on:
  workflow_dispatch:
  schedule:
    - cron: "weekly on monday"
description: Upgrade gh-aw agentic workflows to the latest version and update pinned references
permissions:
  contents: read
  issues: read
  pull-requests: read
tools:
  github:
    toolsets: [default]
  edit:
  bash: true
safe-outputs:
  create-pull-request:
    title-prefix: "[agentic-workflows] "
    labels: [agentic-workflows, automated, dependencies]
    protected-files: fallback-to-issue
network:
  allowed:
    - defaults
    - github
    - node
    - go
---

# Upgrade Agentic Workflows

Upgrade the `gh-aw` agentic workflows in this repository to the latest released
version, recompile every workflow, and bump the pinned `gh-aw` version
references in the repository configuration files. If anything cannot be fixed
automatically, open the pull request as a draft and clearly call out what still
needs human attention.

## Important Constraints

- This workflow only mutates the repository through a single pull request via
  the `safe-outputs.create-pull-request` mechanism. Do **not** push commits
  directly or open PRs through the `gh` CLI.
- Do **not** modify workflow source files beyond what `gh aw upgrade`,
  `gh aw compile`, and the version-pin bumps require. Unrelated edits must be
  left alone.
- If the upgrade reports breaking changes that cannot be resolved by following
  the upgrade guidance, capture the unresolved items in the PR description and
  mark the PR as draft.

## Step 1 — Detect the current and latest gh-aw versions

1. Read `.github/workflows/copilot-setup-steps.yml` and extract the currently
   pinned `gh-aw` version from the
   `uses: github/gh-aw-actions/setup-cli@<sha> # v<version>` line and the
   `with.version: v<version>` value just below it. Record both the **commit
   SHA** and the **`vX.Y.Z` tag**.
2. Read `.github/agents/agentic-workflows.agent.md` and confirm the same
   version appears in the many `https://github.com/github/gh-aw/blob/v<version>/...`
   URLs and in the "Configuration" link near the top.
3. Determine the **latest released version** of `gh-aw` by querying the GitHub
   API for the latest release of `github/gh-aw`:
   ```bash
   gh api repos/github/gh-aw/releases/latest --jq '.tag_name'
   ```
   Also fetch the **commit SHA** that the latest tag points to:
   ```bash
   gh api repos/github/gh-aw/git/refs/tags/<tag> --jq '.object.sha'
   ```
   If the returned object is a tag (annotated), dereference it to the commit:
   ```bash
   gh api repos/github/gh-aw/git/tags/<tag-sha> --jq '.object.sha'
   ```
4. If the current pinned version already equals the latest released version,
   **stop immediately** — do not create a pull request. Report that the
   repository is already on the latest version and exit.

## Step 2 — Run the upgrade

1. Make sure the `gh aw` extension is available (it is installed by the
   repository's `copilot-setup-steps` job). Confirm with:
   ```bash
   gh aw --version
   ```
2. From the repository root, run:
   ```bash
   gh aw upgrade
   ```
3. Read the upgrade output carefully. It may:
   - Apply codemods automatically.
   - Report deprecations or breaking changes that require manual edits to
     individual workflow `.md` files under `.github/workflows/`.
   - Suggest follow-up commands.
4. For every issue reported by `gh aw upgrade` that requires a manual edit:
   - Open the affected workflow `.md` file.
   - Apply the minimum change needed to resolve the deprecation or breaking
     change, following the guidance from the upgrade output and any links it
     references.
   - Keep edits surgical — do not refactor unrelated parts of the workflow.
5. If `gh aw upgrade` reports an issue you cannot confidently resolve, note it
   for the PR description and continue with the remaining steps. The PR will
   be opened as a draft in that case.

## Step 3 — Recompile every workflow

1. From the repository root, run:
   ```bash
   gh aw compile
   ```
   This regenerates the `.lock.yml` files for every workflow under
   `.github/workflows/`.
2. If `gh aw compile` reports errors, fix them in the corresponding workflow
   source `.md` files, then re-run `gh aw compile` until it succeeds (or until
   you have a remaining issue that requires human attention — in that case,
   leave a clear note for the PR description).

## Step 4 — Update pinned version references

Update every pinned reference to the **old** `gh-aw` version to the **new**
version detected in Step 1.

### 4a. `.github/workflows/copilot-setup-steps.yml`

Update the `Install gh-aw extension` step so both the action ref and the
`with.version` value point at the new release. The expected shape is:

```yaml
- name: Install gh-aw extension
  uses: github/gh-aw-actions/setup-cli@v0.81.3 # v<new-version>
  with:
    version: v<new-version>
```

- Replace `<new-commit-sha>` with the commit SHA fetched in Step 1.
- Replace `v<new-version>` with the new tag (including the leading `v`).
- Do **not** change any other steps in this file.

### 4b. `.github/agents/agentic-workflows.agent.md`

This file contains many URLs of the form
`https://github.com/github/gh-aw/blob/v<old-version>/.github/aw/<name>.md`.
Replace every occurrence of `v<old-version>` with `v<new-version>` in this
file. The simplest correct approach is a single search-and-replace of the
exact `v<old-version>` string with `v<new-version>` — but only within this
file, and only for `gh-aw` references (verify each match is part of a
`github/gh-aw/blob/...` URL or the "Configuration" link).

Do **not** modify any other files in `.github/agents/`.

## Step 5 — Verify the result

1. Re-run `gh aw compile` one more time and confirm it exits cleanly.
2. Run `git status` and `git diff --stat` to review the set of changes. The
   expected changes are:
   - Updated workflow `.md` files (only those touched by `gh aw upgrade` or
     manual fixes).
   - Regenerated `.lock.yml` files under `.github/workflows/`.
   - Updated `.github/workflows/copilot-setup-steps.yml` (version pin only).
   - Updated `.github/agents/agentic-workflows.agent.md` (version references
     only).
3. If any other files are modified, revert them — they are out of scope for
   this workflow.

## Step 6 — Open the pull request

Open a single pull request via the `safe-outputs.create-pull-request`
mechanism with the following structure.

**Title:** `Upgrade gh-aw from v<old-version> to v<new-version>`

**Body:**

```
## Summary

Upgrades the `gh-aw` agentic workflows tooling from **v<old-version>** to
**v<new-version>** and updates all pinned references.

## Changes

- Ran `gh aw upgrade` and applied codemods + manual fixes to workflow source files.
- Re-ran `gh aw compile` to regenerate `.lock.yml` files.
- Bumped the pinned action in `.github/workflows/copilot-setup-steps.yml`:
  - `github/gh-aw-actions/setup-cli@<old-sha>` → `@<new-sha>`
  - `with.version: v<old-version>` → `v<new-version>`
- Updated all `github/gh-aw/blob/v<old-version>/...` references in
  `.github/agents/agentic-workflows.agent.md` to `v<new-version>`.

## Upgrade output

<Paste the relevant portion of `gh aw upgrade` output here, especially any
breaking-change notices or codemods that were applied.>

## Manual fixes applied

<List any workflow files that required manual edits and briefly describe the
change made. Omit this section if no manual fixes were needed.>

## Unresolved issues

<List any items reported by `gh aw upgrade` or `gh aw compile` that could not
be resolved automatically and require human attention. If this section is
non-empty, the PR is opened as a draft. Omit this section if there are none.>

## Verification

- [x] `gh aw compile` exits cleanly
- [x] Only expected files are modified

```

If there are any unresolved issues from Step 2 or Step 3, open the PR as a
**draft**. Otherwise open it as a regular PR.
