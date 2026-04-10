---
on:
  pull_request:
    types: [labeled]
labels: [dependency-review-needed]
if: github.event.label.name == 'dependency-review-needed' && github.event.pull_request.head.repo.fork == false
description: "Dexter: Audit dependency changes in a pull request"
permissions:
  contents: read
  pull-requests: read
  actions: read
  security-events: read
tools:
  github:
    toolsets: [context, repos, pull_requests, actions, dependabot]
    min-integrity: unapproved
  bash: ["cat", "date", "echo", "grep", "head", "ls", "pwd", "sort", "tail", "uniq", "wc"]
  cache-memory:
  repo-memory:
  web-fetch:
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
    footer: "> 📦 *Audited by [{workflow_name}]({run_url})*"
    run-started: "📦 [{workflow_name}]({run_url}) is auditing dependency changes…"
    run-success: "📦 [{workflow_name}]({run_url}) completed the dependency audit. ✅"
    run-failure: "📦 [{workflow_name}]({run_url}) {status}. ❌"
timeout-minutes: 15

---

# Dependency Review

Audit dependency changes in pull request
#${{ github.event.pull_request.number }}.

Follow the guidelines in [dependency-review-guidelines.md](../prompts/dependency-review-guidelines.md).

## Important Constraints

- Only review changes to **`package.json`** files and **`pnpm-workspace.yaml`**.
  Ignore source code, tests, documentation, and lock file churn.
- Only flag issues **introduced or worsened** by this pull request. Do not
  flag pre-existing issues in unchanged code.
- If other review agent labels are present on this PR, focus strictly on
  dependency changes. Do not duplicate findings better handled by other
  agents (Archie for API design, Sentinel for security, Dash for
  performance, Scribe for docs, Tester for tests).
- Do **not** comment on style, formatting, or whitespace.
- Do **not** flag lock file changes that are consistent with `package.json`
  edits.

## Step 1 — Context Gathering

1. **Check CI status** — use the Actions toolset to check whether CI
   checks are passing. Dependency issues often surface as build failures.
2. **Check Dependabot alerts** — use the Dependabot toolset to see if
   any existing alerts relate to the dependencies being changed in this PR.
3. **Recall past context** — use repo-memory to check for known
   dependency exceptions or patterns for this package. Use cache-memory
   to check if similar dependency changes were reviewed before.

## Step 2 — Identify Changed Dependency Files

1. List the files changed in the pull request using the GitHub API.
2. Filter to:
   - `**/package.json` files (added, modified, or deleted)
   - `pnpm-workspace.yaml` (catalog changes)
3. If no dependency files were changed, post a single pull request comment
   saying no dependency changes were found and stop.

## Step 3 — Analyze Each Changed package.json

For each changed `package.json`, fetch the diff and apply the full
checklist from the dependency review guidelines. Focus on workspace
protocol, catalog usage, version ranges, new dependency evaluation,
removals, and dev vs runtime boundary.

## Step 4 — Check Cross-Cutting Concerns

1. **Circular dependencies** — does any new `@azure/*` dependency
   create a cycle?
2. **Peer dependency consistency** — do new peer deps conflict with
   sibling packages?
3. **Catalog changes** — if `pnpm-workspace.yaml` was modified, verify
   the catalog change is intentional and used by at least one package

## Step 5 — Submit Review

Submit your findings as a **pull request review** with inline code comments.

For each finding, create a **review comment** on the relevant
`package.json` file and line using `create-pull-request-review-comment`:

> 🔴 **Blocker** — New dependency `foo` uses `^2.0.0` but a catalog
> entry exists. Use `catalog:` instead.

After all inline comments, **submit the review** using
`submit-pull-request-review` with:

- **event**: `COMMENT`
- **body**: A one-paragraph summary (count of findings by severity, or
  "All dependency changes look good") followed by:

<pre>
&lt;details&gt;
&lt;summary&gt;📊 Structured Report&lt;/summary&gt;

```json
{"agent":"dexter","pr":NUMBER,"summary":"clean|issues_found","findings":[{"file":"...","line":0,"severity":"critical|medium|low","category":"...","description":"..."}]}
```

&lt;/details&gt;
</pre>

If no issues were found, submit a `COMMENT` review with a one-sentence
body confirming dependency changes look good.

## Step 6 — Update Memory

After posting, store useful context for future reviews:
- **repo-memory**: save any package-specific dependency exceptions
  discovered (e.g., "this package pins `ws` to 7.x for Node 14 compat").
- **cache-memory**: save a brief summary of this review (PR number,
  packages, outcome, any new deps added) so future runs can detect
  repeat patterns or track dependency growth.
