---
on:
  workflow_dispatch:
  schedule:
    - cron: "weekly on monday"
description: Review documentation for inconsistencies with source code and create a PR with fixes
permissions:
  contents: read
  issues: read
  pull-requests: read
# DataOps + planner-worker pattern. A deterministic step enumerates the docs
# (zero AI tokens); each doc is then verified by an isolated `model: small`
# `doc-checker` sub-agent that returns only compact findings. The orchestrator
# never loads raw documentation contents into its own context — it reads the
# small findings files, fixes the flagged docs, and opens the PR.
#
# This replaces the previous design ("read every markdown file" + a redundant
# general-purpose background agent), where ~30 full docs accumulated in one
# growing orchestrator context across ~37 turns and tripped the AWF
# effective-token hard rail (>25M effective tokens), failing the run.
steps:
  - name: Enumerate documentation files
    run: |
      mkdir -p /tmp/gh-aw/agent/findings
      find documentation -type f -name '*.md' | sort > /tmp/gh-aw/agent/docs.txt
      echo "Documentation files to check ($(wc -l < /tmp/gh-aw/agent/docs.txt)):"
      cat /tmp/gh-aw/agent/docs.txt
tools:
  edit:
  bash: true
safe-outputs:
  create-pull-request:
    title-prefix: "[docs] "
    labels: [documentation, automated]
---

# Documentation Consistency Check

Review the markdown files under `documentation/` for inconsistencies with the
actual source code, then open a single pull request with the fixes.

The repository is checked out locally, so **all verification is done against the
local working tree** with `bash`/`grep` — do not call any remote API.

## What counts as an inconsistency

1. **Incorrect code examples** — snippets referencing APIs, classes, methods, or
   options that no longer exist or changed signature in `sdk/`.
2. **Outdated instructions** — build/test/setup commands that no longer match the
   tooling (e.g. `npm` instead of `pnpm`, missing `turbo` flags, wrong
   `package.json` script names).
3. **Broken internal links** — references to files/folders/docs that were moved
   or deleted.
4. **Stale references** — deprecated packages, old repository paths, or removed
   features.

## Process — do NOT read all docs into your own context

The list of documentation files has already been written to
`/tmp/gh-aw/agent/docs.txt` (one path per line). Reading every file into this
(orchestrator) context is exactly what previously exhausted the token budget —
so don't. Instead:

### Step 1 — delegate per-file checking to the `doc-checker` sub-agent

For **each** path in `/tmp/gh-aw/agent/docs.txt`, invoke the `doc-checker`
sub-agent with that single path. Each invocation runs in its own isolated, cheap
(`model: small`) context, verifies that one file against the local source tree,
and writes a compact findings file under `/tmp/gh-aw/agent/findings/`. You may
dispatch these in parallel.

Do **not** read the documentation files yourself in this step, and do **not**
launch a general-purpose background agent — use only `doc-checker`.

### Step 2 — collect compact findings

Read the small JSON files under `/tmp/gh-aw/agent/findings/`. Each looks like:

```json
{ "file": "documentation/linting.md", "issues": [
  { "type": "outdated-instruction", "location": "line 42",
    "problem": "...", "fix": "..." } ] }
```

Ignore files whose `issues` array is empty.

### Step 3 — fix only the flagged files

For each file that has issues, open just that file and apply the fixes with the
`edit` tool. Keep each change minimal and surgical — do not reformat or touch
unrelated content.

### Step 4 — create the pull request

Create a single pull request containing all the fixes, with a clear summary
listing every change and why. If no file had any issues, do **not** create a
pull request — report that the documentation is consistent and stop.

## agent: `doc-checker`
---
description: Verifies one documentation file against the local source tree and writes compact findings
model: small
---
You verify a **single** documentation markdown file for consistency with the
local repository. You are given exactly one file path (e.g.
`documentation/linting.md`).

Steps:

1. Read that one file with `cat`.
2. For each concrete claim — code snippet, command, file/folder link, package
   name, version requirement — verify it against the **local working tree**
   using `bash` (`ls`, `grep -r`, `cat`, reading `package.json` scripts). Do not
   call any remote API, and do not read other documentation files.
3. Identify only real inconsistencies:
   - incorrect code examples (APIs/options that don't exist under `sdk/`)
   - outdated build/test/setup commands (e.g. `npm` vs `pnpm`, wrong script
     names, missing `turbo` flags)
   - broken internal links (a referenced path does not exist)
   - stale references (removed packages/paths/features)
4. Write a compact JSON findings file to
   `/tmp/gh-aw/agent/findings/<basename>.json`, where `<basename>` is the file
   name without directories (e.g. `linting.md` → `linting.md.json`). Use this
   shape:

   ```json
   { "file": "<the doc path>",
     "issues": [
       { "type": "broken-link|outdated-instruction|incorrect-example|stale-reference",
         "location": "line N or a short quoted anchor",
         "problem": "one sentence",
         "fix": "the exact corrected text or command" } ] }
   ```

   If the file is fully consistent, write `{ "file": "<path>", "issues": [] }`.

Keep your reply to a single short status line (e.g. `linting.md: 2 issues`).
**Do not** paste file contents back — only the JSON file and the status line.
