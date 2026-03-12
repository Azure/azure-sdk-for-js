---
on:
  pull_request_target:
    types: [labeled]
    names: [mgmt-review-needed]
description: "Review a pull request for management-plane SDKs"
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
    footer: "> ⚡ *Benchmarked by [{workflow_name}]({run_url})*"
    run-started: "⚡ [{workflow_name}]({run_url}) is profiling this PR for reviewing..."
    run-success: "⚡ [{workflow_name}]({run_url}) completed the management-plane SDKs review. ✅"
    run-failure: "⚡ [{workflow_name}]({run_url}) {status}. ❌"
timeout-minutes: 15

---

# Azure JS Management SDK PR Review

Review Azure SDK for JS management library pull request #${{ github.event.pull_request.number }} against the official API review guidelines.

Follow the guidelines in [mgmt-review-guidelines.md](https://github.com/marygao/azure-sdk-for-js/blob/main/.github/prompts/mgmt-review-guidelines.m).

## Important Constraints

- Focus reviewing changes to the **public API surface** and **listed tool validation rules**. 
  Ignore implementation internals, private methods, generated code, and test or samples files.
- Only flag issues **introduced or worsened** by this pull request. Do not
  flag pre-existing issues in unchanged code.
- If other review agent labels are present on this PR, focus strictly on
  API design. Do not duplicate findings better handled by other agents
  (Dexter for dependencies, Sentinel for security, Dash for performance,
  Scribe for docs, Tester for tests).
- Do **not** comment on style, formatting, or whitespace.
- Do **not** flag issues in APIs tagged `@internal`.

## Step 0 — Context Gathering

1. **Check CI status** — use the Actions toolset to check whether CI checks are 
  passing on this PR. If the build is failing, note it but proceed with the 
  review (management SDK review issues exist regardless of build).
2. **Recall past context** — use cache-memory to check if this PR or
   package has been reviewed before.

## Step 1 — Identify Changed public API Surface

1. List the files changed in the pull request using the GitHub API.
2. Focus on:
   - `src/index.ts` or barrel export files (added/removed exports)
   - `review/*node.api.md` files (the API report — each line is a public symbol)
   - New or modified public interfaces, classes, types, and functions
3. If no public API surface was changed, skip to Step 3 to check if any tool
   issue.

## Step 2 — Check Against Guidelines

For each changed public API element, apply the full checklist from the
architecture review guidelines. If no violation found, go to Step 3 for tool review.

## Step 3 - Validate Any Tool Issues

1. List the files changed in the pull request using the GitHub API.
2. Focus on the tool validation rules checking for changed files.
3. If no any listed violation found, saying no review concerns were found and stop.

## Step 4 — Submit Review

Submit your findings as a **pull request review** with inline code comments.

For each finding, create a **review comment** on the specific file and
line using `create-pull-request-review-comment`:

> 🔴 **Breaking** — `CHANGELOG.md:42`
> `Remove class AzureVMwareSolutionAPIClient`.
> Client name change is a breaking for customers.
> **Fix:**: Use `@@clientName` to rename it back to original one and triggering SDK regeneration could mitigate this.

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

## Step 5 — Update Memory

After posting, store a brief summary in cache-memory (PR number,
package, outcome) so future runs can detect repeat patterns.
