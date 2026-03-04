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
tools:
  github:
    toolsets: [default]
  bash: true
safe-outputs:
  create-issue:
    labels: [bug, automated, CI]
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
- Do **not** create pull requests or modify source files. The only output of this
  workflow is a GitHub issue.

## Step 1 — Identify Failing Packages

1. Use the GitHub API to list the most recent **check runs** on the `main` branch
   (look at the HEAD commit of `main`). If there are no check runs on the HEAD
   commit, check a few recent commits — CI may not run on every push.
2. Filter for check runs whose `conclusion` is `failure`. CI runs are reported by
   the **Azure Pipelines** GitHub App; the check-run **name** includes the service
   directory and job type (e.g. `js - service-bus - tests`).
3. If a specific `package` input was provided, scope investigation to that package only.
4. Collect the list of affected **service directories** or **package names** from the
   check-run names (the pattern is `js - <service> - <job-type>`).

If there are no test failures on `main`, stop and report that CI is green.

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
