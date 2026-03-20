---
on:
  pull_request:
    types: [labeled]
    names: [mgmt-review-needed]
description: "Review a pull request for management-plane SDKs"
permissions:
  contents: read
  pull-requests: read
  actions: read
strict: false
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
    footer: "> ⚡ *Benchmarked by [{workflow_name}]({run_url})*"
    run-started: "⚡ [{workflow_name}]({run_url}) is profiling this PR for reviewing..."
    run-success: "⚡ [{workflow_name}]({run_url}) completed the management-plane SDKs review. ✅"
    run-failure: "⚡ [{workflow_name}]({run_url}) {status}. ❌"
timeout-minutes: 15

---

# Management SDK PR Review

Review Azure SDK for JS management library pull request #${{ github.event.pull_request.number }} against the official API review guidelines.

Follow the guidelines in [mgmt-review-guidelines.md](../prompts/mgmt-review-guidelines.md).

## Important Constraints

- Focus the review on changes relevant to the listed validation rules for **tooling** and **public API surface** in the guidelines.
- Ignore implementation internals, private methods, generated code, and test or samples files.
- Do **not** comment on style, formatting, documentation, or whitespace.
- Do **not** flag issues in APIs tagged `@internal`.
- Do **not** flag undocumented APIs.
- Do **not** flag issues in submodules.

## Step 1 — Context Gathering

1. **Check CI status** — use the Actions toolset to check whether CI checks are 
  passing on this PR. If the build is failing, note it but proceed with the 
  review (management SDK review issues exist regardless of build).
2. **Recall past context** — use `cache-memory` to check whether this PR or
   package has been reviewed before.

## Step 2 - Validate any tool issues

1. List the files changed in the pull request using the GitHub API.
2. Focus on the tool validation rules and highlight tool issues.
3. If no listed violations are found, proceed to the following steps.

## Step 3 — Validate changed public API surface

1. List the files changed in the pull request using the GitHub API.
2. Focus on:
   - `review/{package-name}-node.api.md` files (the API report — each line is a public symbol)
  - Only consider checkpoints mentioned in the guidelines
   No need to:
  - Review submodules like `/models` or `/api`
  - Focus on issues not mentioned in the guidelines, such as `undocumented`
3. If no guideline violations are found, state that there are no public API concerns.

## Step 4 - Double check review comments

1. Go through all review comments.
2. If any comments mention missing data:
   2.1 First, check the relevant full files, not just the PR diff.
   2.2 Then double-check whether the data is actually missing.
3. If the data is missing, keep the comment; otherwise remove it because the data exists but is not part of the current PR.

## Step 5 — Submit Review

Submit your findings as a **pull request review** with inline code comments.

For each finding, create a **review comment** on the specific file and
line using `create-pull-request-review-comment`:

> 🔴 **Tool Issue** — `CHANGELOG.md:42`
> `Compared with 1.0.0-alpha.20260311.1:`.
> We should not compare with alpha versions in `CHANGELOG.md`; this suggests a tooling bug.
> **Fix:** Update `CHANGELOG.md` to compare with the latest preview or stable version, and report the issue in the [generation tool repository](https://github.com/Azure/autorest.typescript/issues).

After all inline comments, **submit the review** using
`submit-pull-request-review` with:

- **event**: `COMMENT` (this is an advisory review, not a blocking gate)
- **body**: A one-paragraph summary (count of findings by issue type, or "No API design issues found") followed by:

<pre>
&lt;details&gt;
&lt;summary&gt;📊 Structured Report&lt;/summary&gt;

```json
{"agent":"mgmt-reviewer","pr":NUMBER,"summary":"clean|issues_found","findings":[{"file":"...","line":0,"issueType":"tool|design","category":"...","description":"..."}]}
```

&lt;/details&gt;
</pre>

If no issues were found, submit a `COMMENT` review with a one-sentence
body confirming that the API surface looks good.

## Step 6 — Update Memory

After posting, store a brief summary in `cache-memory` (PR number,
package, outcome) so future runs can detect repeat patterns.
