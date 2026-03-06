---
on:
  pull_request:
    types: [labeled]
    names: [test-review-needed]
description: "Tester: Review a pull request for test coverage and quality"
permissions:
  contents: read
  issues: read
  pull-requests: read
  actions: read
tools:
  github:
    toolsets: [default, actions]
  bash: true
  cache-memory:
  repo-memory:
safe-outputs:
  add-comment:
    max: 10
    discussions: false

---

# Test Review

Review pull request #${{ github.event.pull_request.number }} for test
coverage and quality.

Follow the guidelines in [test-review-guidelines.md](https://github.com/Azure/azure-sdk-for-js/blob/main/.github/prompts/test-review-guidelines.md).

## Important Constraints

- Only review for **test gaps and quality issues**. Ignore source code
  logic, documentation, and API design.
- Only flag issues **introduced or worsened** by this pull request. Do not
  flag pre-existing test gaps in unchanged code.
- If other review agent labels are also present on this PR, stay focused
  on test coverage. Do not duplicate findings better handled by other
  agents (Archie for API design, Dexter for dependencies, Sentinel for
  security, Dash for performance, Scribe for documentation).
- `snippets.spec.ts` files are **documentation snippet sources**, not
  real tests — exclude them entirely.
- Do **not** flag style or assertion preference differences.
- Do **not** flag generated code under `src/generated/`.

## Step 0 — Context Gathering

1. **Check CI status** — use the Actions toolset to check whether tests
   are passing. Failing tests in CI are the highest signal for test
   quality issues.
2. **Recall past context** — use repo-memory to check for known
   testing patterns or exceptions for this package (e.g., packages with
   intentionally skipped browser tests). Use cache-memory to check if
   this package has had prior test coverage gaps.

## Step 1 — Identify What Changed

1. List the files changed in the pull request using the GitHub API.
2. Categorize:
   - **New/changed APIs**: `src/index.ts`, `src/**/*.ts` (exports)
   - **Test files**: `test/**/*.spec.ts` (excluding `snippets.spec.ts`)
   - **API report**: `review/*.api.md` (new exports visible here)
3. If no API or test files were changed, post a single pull request
   comment saying no test concerns and stop.

## Step 2 — Check Coverage for New APIs

For every new or changed public export, apply the full test coverage
checklist from the guidelines. Verify happy paths, error paths, edge
cases, cancellation, pagination, and LRO patterns as applicable.

## Step 3 — Review Test Quality

For changed test files, apply the full test quality checklist from the
guidelines. Check recorder setup, test mode awareness, credential
handling, error assertions, and test isolation.

## Step 4 — Check for Removed Coverage

If tests were deleted:

1. Verify the tested API was also removed
2. Check if tests were moved, not deleted
3. Flag unjustified coverage reduction

## Step 5 — Post Findings

Post your findings as a **single pull request comment** on the pull
request. For each finding, include:

- **File and line**
- **Severity**: 🔴 Missing, 🟡 Concern, 🔵 Suggestion
- A one-line description of the test gap
- A concrete suggested fix

Group findings by severity (missing first). If test coverage looks
good, say so explicitly in one sentence.

After your human-readable comment, append a machine-readable summary:

<pre>
&lt;details&gt;
&lt;summary&gt;📊 Structured Report&lt;/summary&gt;

```json
{"agent":"tester","pr":NUMBER,"summary":"clean|issues_found","findings":[{"file":"...","line":0,"severity":"high|medium|low","category":"...","description":"..."}]}
```

&lt;/details&gt;
</pre>

## Step 6 — Update Memory

After posting, store useful context for future reviews:
- **repo-memory**: save any package-specific testing conventions
  (e.g., "this package skips browser tests because it's Node-only" or
  "uses custom test utilities in `test/utils/`").
- **cache-memory**: save a brief summary of this review (PR number,
  package, outcome) so future runs can track test coverage trends.
