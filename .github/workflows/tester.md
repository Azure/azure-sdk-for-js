---
on:
  pull_request_target:
    types: [labeled]
labels: [test-review-needed]
if: github.event.label.name == 'test-review-needed'
description: "Tester: Review a pull request for test coverage and quality"
permissions:
  contents: read
  pull-requests: read
  actions: read
tools:
  github:
    toolsets: [context, repos, pull_requests, actions]
  bash: true
  cache-memory:
  repo-memory:
safe-outputs:
  create-pull-request-review-comment:
    max: 10
    side: "RIGHT"
    target: "${{ github.event.pull_request.number || github.event.issue.number }}"
  submit-pull-request-review:
    max: 1
    footer: "if-body"
    target: "${{ github.event.pull_request.number || github.event.issue.number }}"
  messages:
    footer: "> 🧪 *Tested by [{workflow_name}]({run_url})*"
    run-started: "🧪 [{workflow_name}]({run_url}) is reviewing test coverage and quality…"
    run-success: "🧪 [{workflow_name}]({run_url}) completed the test review. ✅"
    run-failure: "🧪 [{workflow_name}]({run_url}) {status}. ❌"
timeout-minutes: 15

---

# Test Review

Review pull request #${{ github.event.pull_request.number }} for test
coverage and quality.

Follow the guidelines in [test-review-guidelines.md](../prompts/test-review-guidelines.md).

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
2. **Recall past context** — use cache-memory to check if this package
   has had prior test coverage gaps.

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

## Step 5 — Submit Review

Submit your findings as a **pull request review** with inline code comments.

For each finding, create a **review comment** on the specific file and
line using `create-pull-request-review-comment`:

> 🔴 **Missing** — New `createWidget()` method has no test file.
> **Fix:** Add `test/widget.spec.ts` with happy path, error path,
> and cancellation tests.

After all inline comments, **submit the review** using
`submit-pull-request-review` with:

- **event**: `COMMENT`
- **body**: A one-paragraph summary (count of findings by severity, or
  "Test coverage looks good") followed by:

<pre>
&lt;details&gt;
&lt;summary&gt;📊 Structured Report&lt;/summary&gt;

```json
{"agent":"tester","pr":NUMBER,"summary":"clean|issues_found","findings":[{"file":"...","line":0,"severity":"critical|medium|low","category":"...","description":"..."}]}
```

&lt;/details&gt;
</pre>

If no issues were found, submit a `COMMENT` review with a one-sentence
body confirming test coverage is adequate.

## Step 6 — Update Memory

After posting, store a brief summary in cache-memory (PR number,
package, outcome) so future runs can track test coverage trends.
