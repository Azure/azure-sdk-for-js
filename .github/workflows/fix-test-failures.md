---
on:
  workflow_dispatch:
    inputs:
      package:
        description: "Package name to fix (e.g. @azure/storage-blob). Leave empty to auto-detect from latest CI failures."
        required: false
  schedule:
    - cron: "0 10 * * 1-5"
description: Detect test failures on the main branch CI and file a GitHub issue with root cause analysis
permissions:
  contents: read
  actions: read
  checks: read
  issues: read
  pull-requests: read
# DataOps: all GitHub API gathering runs in this deterministic, authenticated
# shell step (GH_TOKEN, zero AI tokens) and writes compact JSON to
# /tmp/gh-aw/agent/. The agent only reads those files — it makes no API calls.
# This replaces ~40 model turns of check-run pagination + annotation fetching
# + rate-limit polling that previously tripped the effective-token hard rail.
# Collection logic lives in a committed sibling script so it gets shellcheck,
# highlighting, and clean diffs; in production the agent job sparse-checks-out
# `.github` before this step, so the script is on disk.
steps:
  - name: Collect CI failure data
    env:
      GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      REPO: ${{ github.repository }}
      PACKAGE: ${{ github.event.inputs.package || '' }}
      TRACKING_ISSUE: "37864"
      OUTDIR: /tmp/gh-aw/agent
    run: bash .github/workflows/fix-test-failures-collect.sh
tools:
  bash: true
safe-outputs:
  create-issue:
    labels: [test-reliability]
  update-issue:
    max: 1
    body:
    target: "37864"
network:
  allowed:
    - defaults
    - threat-detection
    - github
    - node
    - dotnet
---

# Analyze CI Test Failures

Detect unit test failures on the `main` branch and open a GitHub issue containing
a root cause analysis and, when possible, the exact code fix needed to resolve each
failure.

## Pre-computed Data (read these first)

**All GitHub API gathering has already been done for you** by a deterministic
shell step. Do **not** call the GitHub API, paginate check runs, fetch
annotations, or poll the rate limit yourself — read these files instead:

- `/tmp/gh-aw/agent/meta.json` — the commit inspected, counts, the package
  scope (if any), and the tracking-issue number. Orient yourself here first.
- `/tmp/gh-aw/agent/failures.json` — array of failing **CI** check runs already
  filtered to the CI (playback) pipeline. Live-test (`- tests`,
  `- tests-weekly`) and `- perf` pipelines are already excluded. Each element
  has: `name`, `html_url`, `details_url` (Azure DevOps build), `output_title`,
  `output_summary`, `output_text`, and a capped `annotations` array
  (`path`, `start_line`, `end_line`, `annotation_level`, `title`, `message`).
- `/tmp/gh-aw/agent/known-failures.json` — the parsed tracking-island entries
  from issue #37864, each with its linked-issue `state` (`open`/`closed`)
  already resolved, plus the original `raw_line`.
- `/tmp/gh-aw/agent/known-failures.md` — the raw body of #37864 (reference
  only; you normally only need `known-failures.json`).

Read these files with `cat`/`jq`. Keep your own shell exploration minimal —
every extra turn re-sends the whole context and is expensive. When you have
emitted the issue (Step 5) and the tracking update (Step 6), **stop**; do not
make further shell calls.

## Important Constraints

- `snippets.spec.ts` files under `sdk/**/*/test/` are documentation snippet sources,
  **not** real tests — ignore failures in those files.
- Do **not** follow `details_url` links on check runs — they point to Azure DevOps
  which is not accessible from this environment. (You may still **include** these
  links in the issue so a human can open them; you just must not fetch them yourself.)
- Do **not** create pull requests or modify source files. The only mutable output
  of this workflow is a GitHub issue; when no new failures exist the workflow
  exits silently with no issue created.

## Known Pre-existing Failures

Some CI test failures are caused by infrastructure or service-side issues that are
already tracked. Before filing a new issue, check the **known failures tracking
issue** (https://github.com/Azure/azure-sdk-for-js/issues/37864) for pre-existing
failures.

The tracking list for these known failures has already been fetched and parsed
into `/tmp/gh-aw/agent/known-failures.json`. Each element is one island entry:

```json
{ "issue_number": 12345, "state": "open", "raw_line": "- #12345 — `web-pubsub` — `TypeError: ...` — 2026-06-18" }
```

The linked-issue `state` is already resolved for you — you do **not** need to
call the GitHub API to check whether a tracked issue is still open.

The raw island in #37864 is delimited by these markers (managed by the
`update-issue` safe output, `operation: replace-island`); content **outside**
the island is human-authored and must be preserved exactly:

```
<!-- gh-aw-island-start:fix-test-failures -->
... tracked entries ...
<!-- gh-aw-island-end:fix-test-failures -->
```

Each entry on the tracked list follows this format:

```
- #<issue-number> — `<service or package>` — `<error pattern>` — <YYYY-MM-DD>
```

1. Read `known-failures.json`. Partition the entries by `state`:
   - `state == "open"` → **keep** the entry; it is an active known failure.
   - `state == "closed"` (or `unknown`) → **drop** it (do not carry it
     forward). If the same failure recurs in this run it will be filed as a
     brand-new issue in Step 5 and re-added in Step 6.
2. For each failing check run in `/tmp/gh-aw/agent/failures.json`, check whether
   the **service directory** (from the check-run name, e.g. `attestation` in
   `js - attestation (Build UnitTest ...)`) or the **npm package name** (from
   annotations/file paths) **and** the **error pattern** match a *kept* entry.
3. If a failure matches a kept entry:
   - **Exclude** it from the new GitHub issue entirely.
   - Do **not** attempt to reproduce or root-cause it — it is already tracked.
4. If **all** detected failures match kept entries, **do not** create a new CI
   failure issue. Still proceed to Step 6 so that any entries dropped in step 1
   are removed from the tracked list.
5. If some failures are new and some are known, create the issue for **new
   failures only**. Add a brief note in the "Additional Notes" section listing
   which known failures were excluded and linking to their tracking issues.

## Step 1 — Identify Failing Packages

Read `/tmp/gh-aw/agent/meta.json` and `/tmp/gh-aw/agent/failures.json`. The
collection step has already done all the API work and filtering:

1. `failures.json` already contains **only** failing **CI (playback) pipeline**
   check runs. The collection step kept entries whose `conclusion` is `failure`
   and whose name starts with `js - `, and excluded live-test
   (`- tests`, `- tests-weekly`) and `- perf` pipelines. You do not need to
   re-filter; just read the array.
   - For context: CI check-run names look like `js - <service> (Build ...)`,
     `(Build UnitTest ...)`, or `(Build Analyze)` — e.g.
     `js - attestation (Build UnitTest ubuntu_22x_node)`.
2. If `meta.json.package_scope` is set, the failures are already scoped to that
   package/service.
3. Derive the affected **service directories** / **package names** from each
   `name` (the pattern is `js - <service> (...)`).
4. Each failure record already carries the links to embed in the issue:
   - `html_url` — the GitHub check-run page for the failure.
   - `details_url` — the Azure DevOps build that produced the failure (the most
     useful link for full logs; pattern
     `https://dev.azure.com/azure-sdk/public/_build/results?buildId=<ID>&view=results`).
   Keep these URLs associated with their service/package.

If `failures.json` is an empty array (no CI failures on `main`), **stop
immediately** — do **not** create a GitHub issue. Report that CI is green
and exit.

## Step 2 — Gather Failure Details

Each element of `/tmp/gh-aw/agent/failures.json` already contains the failure
detail you need — no API calls required:

1. `annotations` — a capped array of `{ path, start_line, end_line,
   annotation_level, title, message }`. These contain the error messages,
   failing test names, and stack traces.
2. `output_title` / `output_summary` / `output_text` — the check-run output
   summary (e.g. pass/fail counts).
3. From the annotations, identify the failing test file(s) and test case name(s).
4. Note the error type — for example: `TypeError`, `AssertionError`, compilation
   error, missing export, API mismatch, etc.

## Step 3 — Reproduce Locally

## Step 3 — Reproduce Locally (best-effort, time-boxed)

Local reproduction is **optional and best-effort**. `pnpm install` +
`turbo build` for a package is slow and frequently not feasible in this
sandbox; do **not** spiral into many shell turns trying to make it work, and do
**not** explore unrelated packages "just in case". Each extra turn re-sends the
whole context and is expensive.

For each failing package, you may attempt **one** quick reproduction:

1. Install dependencies (only if not already present): `pnpm install`
2. Build the package and its dependencies:
   `pnpm turbo build --filter=<package-name>... --token 1`
3. Run the failing tests: `cd <package-directory> && pnpm run test`

If the build/test does not complete quickly, or dependencies are not installed,
**stop trying** and mark the failure as non-reproducible locally — still include
it in the issue. The annotations in `failures.json` are usually enough to
root-cause without a local run.

## Step 4 — Root Cause Analysis

For each failure (reproduced or not):

1. Read the failing test file and the source file(s) it exercises — read only
   the files the annotations point at; do not browse broadly.
2. Determine the root cause — common causes include:
   - Source code change that broke an existing API contract.
   - Test expectations that are stale after a legitimate source change.
   - Missing or renamed exports in barrel files (`index.ts`).
   - Type errors from dependency updates.
3. If the fix is straightforward, write out the **exact diff** (unified diff format)
   that would resolve the failure. Include file paths and enough context lines for
   the change to be unambiguous.
4. If the fix is **not** straightforward (e.g. it requires a new dependency,
   infrastructure change, or design decision), explain why and suggest next steps.

## Step 5 — Create GitHub Issue

Open a single GitHub issue that covers all detected failures. Use the following
structure for the issue body:

**Title:** `CI test failures on main: <package-name(s)>`

**Body:**

```
## Summary

<One-paragraph overview: how many packages affected, how many tests failing,
date/commit of the CI run inspected.>

## Failures

### <Package Name 1>

**Failing CI build:** [<check-run name>](<details_url / Azure DevOps build link>) ([check run](<html_url>))

**Failing tests:**
- `<test name 1>` in `<test-file-path>`
- `<test name 2>` in `<test-file-path>`

**Error:**
<Paste the key error message and/or stack trace from CI annotations.>

**Root cause:**
<Clear explanation of why the test is failing.>

**Suggested fix:**
<If derivable, provide the exact diff in a fenced code block with `diff` syntax
highlighting. If not derivable, explain what investigation or decision is needed.>

```diff
--- a/<file-path>
+++ b/<file-path>
@@ ... @@
 context line
-old line
+new line
 context line
```

**Reproduced locally:** Yes / No

---

(Repeat the above section for each affected package.)

## Additional Notes

<Any cross-cutting observations, e.g. a shared dependency upgrade that caused
multiple failures, or packages where CI failed but tests pass locally.>
```

Labels are applied automatically via the `safe-outputs.create-issue` configuration.

## Step 6 — Reconcile the Tracking List

Update the tracking island inside issue #37864 with a single `update_issue`
call so the list stays bounded and reflects only currently-open known failures.

1. Build the new tracking list:
   - Start from the entries **kept** in step 1 of "Known Pre-existing Failures"
     (entries whose tracked issue is still `open`). Closed entries dropped in
     step 1 are **not** carried forward.
   - For each issue this run created in Step 5, append one new entry using the
     line format from "Known Pre-existing Failures":

     ```
     - #<new-issue-number> — `<service or package>` — `<short error pattern>` — <YYYY-MM-DD>
     ```

     If a created issue covers multiple services or error patterns, emit one
     entry per (service, error pattern) pair so future matching is precise. Keep
     the error pattern under ~80 characters — use a representative substring
     such as `TypeError: cannot read ...` or `AssertionError: expected ...`.
2. Call `update_issue` with:
   - `issue_number`: `37864`
   - `operation`: `replace-island`
   - `body`: the full new tracking list (just the entry lines, separated by
     newlines — **no** marker lines; the framework injects those automatically
     for this workflow id `fix-test-failures`).

   If the new list is empty (all previously-tracked issues closed and no new
   issues created this run), pass an empty `body` so the island is cleared.

   Skip the call entirely **only** if step 1 dropped zero closed entries **and**
   Step 5 created zero new issues — i.e. the list has not changed at all.

3. Always call `update_issue` at most **once per run** on #37864 (the
   `update-issue` safe output is capped at `max: 1`). Do **not** add comments
   to #37864 — the tracking record lives entirely in the body island.

Because the island is replaced in-place each run, the body of #37864 stays
small and bounded by the number of currently-open known failures, regardless of
how many runs have happened historically.
