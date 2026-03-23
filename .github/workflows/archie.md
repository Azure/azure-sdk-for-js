---
on:
  pull_request_target:
    types: [labeled]
labels: [architecture-review-needed]
if: github.event.label.name == 'architecture-review-needed'
description: "Archie: Review a pull request for public API design issues"
permissions:
  contents: read
  pull-requests: read
  actions: read
tools:
  github:
    toolsets: [context, repos, pull_requests, actions]
    lockdown: true
  bash: true
  cache-memory:
  repo-memory:
safe-outputs:
  create-pull-request-review-comment:
    max: 10
    side: "RIGHT"
  submit-pull-request-review:
    max: 1
    footer: "if-body"
  messages:
    footer: "> 🏗️ *Reviewed by [{workflow_name}]({run_url})*"
    run-started: "🏗️ [{workflow_name}]({run_url}) is reviewing this PR for API design issues…"
    run-success: "🏗️ [{workflow_name}]({run_url}) completed the architecture review. ✅"
    run-failure: "🏗️ [{workflow_name}]({run_url}) {status}. ❌"
timeout-minutes: 15

---

# Architecture Review

Review pull request #${{ github.event.pull_request.number }} for public API
design issues.

Follow the guidelines in [architecture-review-guidelines.md](../prompts/architecture-review-guidelines.md).

## Important Constraints

- Only review changes to the **public API surface**. Ignore implementation
  internals, private methods, generated code under `src/generated/` or
  `generated/`, and test files under `test/`.
- Only flag issues **introduced or worsened** by this pull request. Do not
  flag pre-existing issues in unchanged code.
- If other review agent labels are present on this PR, focus strictly on
  API design. Do not duplicate findings better handled by other agents
  (Dexter for dependencies, Sentinel for security, Dash for performance,
  Scribe for docs, Tester for tests).
- Do **not** comment on style, formatting, or whitespace.
- Do **not** flag issues in APIs tagged `@internal`.

## Step 0 — Context Gathering

1. **Check CI status** — use the Actions toolset to check whether CI
   checks are passing on this PR. If the build is failing, note it but
   proceed with the review (API design issues exist regardless of build).
2. **Recall past context** — use cache-memory to check if this PR or
   package has been reviewed before.

## Step 1 — Identify Changed API Surface

1. List the files changed in the pull request using the GitHub API.
2. Focus on:
   - `src/index.ts` or barrel export files (added/removed exports)
   - Subpath export entry points defined in the `exports` field of
     `package.json` (e.g. `./models`, `./api`) and their corresponding
     source files
   - `review/*.api.md` files (the API report — each line is a public symbol)
   - New or modified public interfaces, classes, types, and functions
3. If no public API surface was changed, post a single comment saying the
   API surface looks good and stop.

## Step 2 — Check Against Guidelines

For each changed public API element, apply the full checklist from the
architecture review guidelines. Focus on breaking changes, naming
conventions, exports, type safety, parameter design, async patterns,
core package usage, and API consistency.

## Step 3 — Submit Review

Submit your findings as a **pull request review** with inline code comments.

For each finding, create a **review comment** on the specific file and
line using `create-pull-request-review-comment`:

> 🔴 **Breaking** — `methodName` parameter type changed from `string`
> to `number`, breaking existing callers.
> **Fix:** Keep the original type or add an overload.

After all inline comments, **submit the review** using
`submit-pull-request-review` with:

- **event**: `COMMENT` (this is an advisory review, not a blocking gate)
- **body**: A one-paragraph summary (count of findings by severity, or
  "No API design issues found") followed by:

<pre>
&lt;details&gt;
&lt;summary&gt;📊 Structured Report&lt;/summary&gt;

```json
{"agent":"archie","pr":NUMBER,"summary":"clean|issues_found","findings":[{"file":"...","line":0,"severity":"critical|medium|low","category":"...","description":"..."}]}
```

&lt;/details&gt;
</pre>

If no issues were found, submit a `COMMENT` review with a one-sentence
body confirming the API surface looks good.

## Step 4 — Update Memory

After posting, store a brief summary in cache-memory (PR number,
package, outcome) so future runs can detect repeat patterns.
