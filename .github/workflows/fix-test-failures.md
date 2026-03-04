---
on:
  workflow_dispatch:
    inputs:
      package:
        description: "Package name to fix (e.g. @azure/storage-blob). Leave empty to auto-detect from latest CI failures."
        required: false
      run_id:
        description: "Specific Azure Pipeline run ID to investigate. Leave empty to auto-detect."
        required: false
  schedule:
    - cron: "0 10 * * 1-5"
description: Detect test failures on the main branch CI and create a PR with fixes
permissions:
  contents: read
  actions: read
  checks: read
  issues: read
  pull-requests: read
tools:
  github:
    toolsets: [default]
  edit:
  bash: true
safe-outputs:
  create-pull-request:
    title-prefix: "[test-fix] "
    labels: [automated, test-fix]
---

# Fix CI Test Failures

Detect and fix unit test failures on the `main` branch and create a pull request
with the minimal changes needed to make CI green again.

## Important Constraints

- Only fix **test or source code** that is clearly broken. Do not refactor, restyle, or
  improve unrelated code.
- Never disable, skip, or delete a failing test to make it pass.
- Never turn off an ESLint rule to resolve a linting issue.
- `snippets.spec.ts` files under `sdk/**/*/test/` are documentation snippet sources,
  **not** real tests — ignore failures in those files.
- If a failure cannot be fixed with a straightforward code change (e.g. it requires
  a new dependency, infrastructure change, or design decision), open a GitHub issue
  describing the failure instead of creating a PR.

## Step 1 — Identify Failing Packages

1. Use the GitHub API to list the most recent **check runs** on the `main` branch
   (look at the HEAD commit of `main`).
2. Filter for check runs whose `conclusion` is `failure` and whose name relates to
   build or test jobs (e.g. names containing `Build`, `Test`, `node`, `browser`).
3. If a specific `package` input was provided, scope investigation to that package only.
4. If a specific `run_id` input was provided, look at that Azure Pipeline run directly.
5. Collect the list of affected **service directories** or **package names** from the
   failure information (job names typically include the service directory).

If there are no test failures on `main`, stop and report that CI is green.

## Step 2 — Gather Failure Details

For each failing package identified in Step 1:

1. Retrieve the check run logs or annotations to find the specific error messages
   and stack traces.
2. Identify the failing test file(s) and test case name(s).
3. Note the error type — for example: `TypeError`, `AssertionError`, compilation
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
   npx vitest run --reporter=verbose <path/to/failing/test>
   ```
   Or use the package test script:
   ```bash
   cd <package-directory> && pnpm test:node
   ```
4. Confirm the failure reproduces locally. If it does not reproduce, note this and
   move on to the next package.

## Step 4 — Analyze and Fix

For each reproduced failure:

1. Read the failing test file and the source file(s) it exercises.
2. Determine the root cause — common causes include:
   - Source code change that broke an existing API contract (fix the source).
   - Test expectations that are stale after a legitimate source change (update the test).
   - Missing or renamed exports in barrel files (`index.ts`).
   - Type errors from dependency updates.
3. Make the **smallest possible change** to fix the failure:
   - If the source code is wrong, fix the source.
   - If the test expectation is wrong (the source change was intentional), update the test.
   - Update any affected documentation or changelog only if directly related.
4. Re-run the failing tests to verify the fix:
   ```bash
   npx vitest run --reporter=verbose <path/to/failing/test>
   ```
5. Run the package linter and formatter to ensure no new violations:
   ```bash
   cd <package-directory> && pnpm lint && pnpm format
   ```

## Step 5 — Create Pull Request

After all fixable failures have been addressed:

1. Create a single pull request that includes all fixes.
2. The PR title should follow the format: `Fix test failures in <package-name(s)>`.
3. The PR body should include:
   - A summary of which tests were failing and why.
   - A description of each fix applied.
   - Confirmation that the fixes were verified locally.
4. If any failures could not be fixed automatically, list them in the PR body and
   suggest opening separate issues for them.
