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

- Focus reviewing changes to the LISTED rules' validation on **tool** and **public API surface** in guidelines. 
- Ignore implementation internals, private methods, generated code, and test or samples files.
- Do **not** comment on style, formatting, documentation, or whitespace.
- Do **not** flag issues in APIs tagged `@internal`.
- Do **not** flag issues in APIs undocumented.
- Do **not** flag issues in sub modules.

## Step 0 — Context Gathering

1. **Check CI status** — use the Actions toolset to check whether CI checks are 
  passing on this PR. If the build is failing, note it but proceed with the 
  review (management SDK review issues exist regardless of build).
2. **Recall past context** — use cache-memory to check if this PR or
   package has been reviewed before.

## Step 2 - Validate any tool issues

1. List the files changed in the pull request using the GitHub API.
2. Focus on the tool validation rules and hightlight tool issue reporting.
3. If no any listed violation found, proceed with following steps.

## Step 3 — Validate changed public API surface

1. List the files changed in the pull request using the GitHub API.
2. Focus on:
   - `review/{package-name}-node.api.md` files (the API report — each line is a public symbol)
   - Only consider checkpoints mentioned in guidelines
   No need to:
   - Review sub-modules like /models or /api
   - Focus other issues not mentioned by guidelines like undocumented
3. If no violations mentioned in guidelines, say no concern for public API.

## Step 4 - Double check review comments

1. Go through all review comments
2. If some comments mention missing data, we should
    2.1 first check relevant complete files not just PR's diff
    2.2 then double check if the data is missing
3. If the data is missing, keep this comment; Otherwise remove this comment because the data is there but not in current PR.

## Step 5 — Submit Review

Submit your findings as a **pull request review** with inline code comments.

For each finding, create a **review comment** on the specific file and
line using `create-pull-request-review-comment`:

> 🔴 **Tool Issue** — `CHANGELOG.md:42`
> `Compared with 1.0.0-alpha.20260311.1:`.
> We should not compare with any alpha versions in CHANGELOG.md and there should be a bug in tool.
> **Fix:**: Update the CHANGELOG to compare with lastest preview or stable version and report the issue in [generation tool repository](https://github.com/Azure/autorest.typescript/issues).

After all inline comments, **submit the review** using
`submit-pull-request-review` with:

- **event**: `COMMENT` (this is an advisory review, not a blocking gate)
- **body**: A one-paragraph summary (count of findings by issue type, or "No API design issues found") followed by:

<pre>
&lt;details&gt;
&lt;summary&gt;📊 Structured Report&lt;/summary&gt;

```json
{"agent":"mgm-reviewer","pr":NUMBER,"summary":"clean|issues_found","findings":[{"file":"...","line":0,"issueType":"tool|design","category":"...","description":"..."}]}
```

&lt;/details&gt;
</pre>

If no issues were found, submit a `COMMENT` review with a one-sentence
body confirming the API surface looks good.

## Step 6 — Update Memory

After posting, store a brief summary in cache-memory (PR number,
package, outcome) so future runs can detect repeat patterns.
