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
  copilot-requests: write
tools:
  github:
    toolsets: [default]
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

## Important Constraints

- `snippets.spec.ts` files under `sdk/**/*/test/` are documentation snippet sources,
  **not** real tests — ignore failures in those files.
- Do **not** follow `details_url` links on check runs — they point to Azure DevOps
  which is not accessible from this environment.
- Do **not** create pull requests or modify source files. The only mutable output
  of this workflow is a GitHub issue; when no new failures exist the workflow
  exits silently with no issue created.

## Known Pre-existing Failures

Some CI test failures are caused by infrastructure or service-side issues that are
already tracked. Before filing a new issue, check the **known failures tracking
issue** (https://github.com/Azure/azure-sdk-for-js/issues/37864) for pre-existing
failures.

The tracking list lives inside an **island** in the body of #37864, delimited by
the markers:

```
<!-- gh-aw-island-start:fix-test-failures -->
... tracked entries ...
<!-- gh-aw-island-end:fix-test-failures -->
```

These markers are managed by the `update-issue` safe output (`operation:
replace-island`). Content **outside** the island is human-authored and must be
preserved exactly. If the markers are not present yet (first run), treat the
tracked list as empty — the framework will create the island on the first update.

Each entry on the tracked list is a single line in this format:

```
- #<issue-number> — `<service or package>` — `<error pattern>` — <YYYY-MM-DD>
```

1. Fetch the body of issue #37864 using the GitHub API. Locate the island content
   between the markers shown above and parse the entries (one per line starting
   with `- #`).
2. For each parsed entry, fetch the linked issue with the GitHub API and inspect
   its `state`:
   - If `state == "open"` → keep the entry; it represents an active known
     failure.
   - If `state == "closed"` → **drop** the entry from the list (do not consider
     it a known failure anymore). If the same failure recurs in this run it will
     be filed as a brand-new issue in Step 5 and re-added to the list in Step 6.
3. For each failing check run identified later in "Step 1 — Identify Failing
   Packages", check whether the **service directory** (from the check-run name,
   e.g. `attestation` in `js - attestation (Build UnitTest ...)`) or the **npm
   package name** (from annotations/file paths) **and** the **error pattern**
   match an entry that was *kept* in step 2.
4. If a failure matches a kept entry:
   - **Exclude** it from the new GitHub issue entirely.
   - Do **not** attempt to reproduce or root-cause it — it is already tracked.
5. If **all** detected failures match kept entries, **do not** create a new CI
   failure issue. Still proceed to Step 6 so that any entries dropped in step 2
   are removed from the tracked list.
6. If some failures are new and some are known, create the issue for **new
   failures only**. Add a brief note in the "Additional Notes" section listing
   which known failures were excluded and linking to their tracking issues.

## Step 1 — Identify Failing Packages

1. Use the GitHub API to list the most recent **check runs** on the `main` branch
   (look at the HEAD commit of `main`). If there are no check runs on the HEAD
   commit, check a few recent commits — CI may not run on every push.
2. Filter for check runs whose `conclusion` is `failure`. CI runs are reported by
   the **Azure Pipelines** GitHub App; the check-run **name** includes the service
   directory and job type.
3. **Only consider CI (playback) pipeline failures.** Each service has two separate
   Azure DevOps pipelines that both report check runs against the same commit:
   - **CI pipeline** (from `ci.yml`) — triggered on pushes to `main`; runs tests
     in **playback** mode. Check-run name pattern: `js - <service>` with job
     suffixes like `(Build ...)`, `(Build UnitTest ...)`, `(Build Analyze)`.
     Example: `js - attestation (Build UnitTest ubuntu_22x_node)`.
   - **Live-test pipeline** (from `tests.yml`) — triggered on a schedule or
     manually; runs tests in **live** mode against real Azure services. Check-run
     name pattern: `js - <service> - tests` with job suffixes like
     `(Public ...)`. Example: `js - attestation - tests (Public macoslatest_24x_node)`.

   **Ignore all check runs whose name contains `- tests`, `- tests-weekly`, or
   `- perf`.** These are live-test and performance pipeline results, not CI
   regressions. This workflow should only analyze CI pipeline failures.
4. If a specific `package` input was provided, scope investigation to that package only.
5. Collect the list of affected **service directories** or **package names** from the
   check-run names (the pattern is `js - <service> (...)`).

If there are no test failures on `main`, **stop immediately** — do **not** create a
GitHub issue. Simply report that CI is green and exit.

## Step 2 — Gather Failure Details

For each failing check run identified in Step 1:

1. Retrieve the check-run **annotations** via the GitHub API
   (`GET /repos/{owner}/{repo}/check-runs/{check_run_id}/annotations`).
   Annotations contain error messages, failing test names, and stack traces.
2. Read the check-run `output.text` field for a summary of test results
   (e.g. pass/fail counts).
3. From the annotations, identify the failing test file(s) and test case name(s).
4. Note the error type — for example: `TypeError`, `AssertionError`, compilation
   error, missing export, API mismatch, etc.

## Step 3 — Reproduce Locally

For each failing package:

1. Install dependencies:
   ```bash
   pnpm install
   ```
2. Build the package and all its dependencies:
   ```bash
   pnpm turbo build --filter=<package-name>... --token 1
   ```
3. Run the failing tests:
   ```bash
   cd <package-directory> && pnpm run test
   ```
4. Confirm the failure reproduces locally. If it does not reproduce, note this —
   still include it in the issue but mark it as non-reproducible locally.

## Step 4 — Root Cause Analysis

For each failure (reproduced or not):

1. Read the failing test file and the source file(s) it exercises.
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
   - Start from the entries **kept** in step 2 of "Known Pre-existing Failures"
     (entries whose tracked issue is still `open`). Closed entries dropped in
     step 2 are **not** carried forward.
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

   Skip the call entirely **only** if step 2 dropped zero closed entries **and**
   Step 5 created zero new issues — i.e. the list has not changed at all.

3. Always call `update_issue` at most **once per run** on #37864 (the
   `update-issue` safe output is capped at `max: 1`). Do **not** add comments
   to #37864 — the tracking record lives entirely in the body island.

Because the island is replaced in-place each run, the body of #37864 stays
small and bounded by the number of currently-open known failures, regardless of
how many runs have happened historically.
