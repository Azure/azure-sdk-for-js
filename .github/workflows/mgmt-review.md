---
on:
  pull_request_target:
    types: [labeled]
    forks: ["*"]
  workflow_dispatch:
    inputs:
      item_number:
        description: PR number to run the review on
        required: true
        type: string
  bots: [azure-sdk-automation]
  permissions:
    pull-requests: write
  steps:
    - name: Swap trigger label to in-progress
      id: swap_label
      if: github.event_name == 'pull_request_target' && github.event.label.name == 'mgmt-review-needed'
      uses: actions/github-script@v9
      with:
        script: |
          const pr = context.payload.pull_request.number;
          // Remove trigger label
          try {
            await github.rest.issues.removeLabel({
              ...context.repo,
              issue_number: pr,
              name: 'mgmt-review-needed'
            });
          } catch (e) {
            core.warning(`Could not remove trigger label: ${e.message}`);
          }
          // Add in-progress label
          try {
            await github.rest.issues.addLabels({
              ...context.repo,
              issue_number: pr,
              labels: ['mgmt-review-in-progress']
            });
          } catch (e) {
            core.warning(`Could not add in-progress label: ${e.message}`);
          }
checkout: false
labels: [mgmt-review-needed]
if: github.event.label.name == 'mgmt-review-needed' || github.event_name == 'workflow_dispatch'
concurrency:
  group: "gh-aw-${{ github.workflow }}-${{ github.event.pull_request.number || github.event.inputs.item_number || github.run_id }}-${{ github.event.label.name || '' }}"
  cancel-in-progress: true
description: "Review a pull request for management-plane SDKs"
permissions:
  contents: read
  pull-requests: read
  actions: read
  copilot-requests: write
strict: false
network:
  allowed:
    - defaults
    - node
    - "dev.azure.com"
# DataOps: prefetch all PR context in a deterministic shell step (GH_TOKEN,
# outside the agent sandbox — zero AI tokens, no agent rate-limit pressure).
# The agent reads /tmp/gh-aw/agent/*.json instead of calling the GitHub API
# to list files, fetch diffs, or check CI. Inlined because this workflow runs
# with `checkout: false` (no repo clone on disk in the agent job).
steps:
  - name: Prefetch PR review context (DataOps)
    env:
      GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      REPO: ${{ github.repository }}
      PR_NUMBER: ${{ github.event.pull_request.number || github.event.inputs.item_number }}
      OUTDIR: /tmp/gh-aw/agent
    run: |
      set -euo pipefail
      mkdir -p "$OUTDIR"

      gh pr view "$PR_NUMBER" -R "$REPO" \
        --json number,title,state,isDraft,mergeable,mergeStateStatus,baseRefName,headRefName,headRefOid,baseRefOid,labels,additions,deletions,changedFiles \
        > "$OUTDIR/pr.json"
      head_sha="$(jq -r '.headRefOid' "$OUTDIR/pr.json")"

      # Changed files with per-file patch (top-level array — gh --paginate merges pages).
      gh api --paginate "repos/$REPO/pulls/$PR_NUMBER/files" > "$OUTDIR/files_raw.json"
      jq '[.[] | {filename, status, additions, deletions, previous_filename}]' \
        "$OUTDIR/files_raw.json" > "$OUTDIR/changed_files.json"

      # Persona surface: mgmt API reports, CHANGELOG, and package manifests.
      surface_re='/review/[^/]+-node\.api\.md$|(^|/)CHANGELOG\.md$|(^|/)package\.json$'
      jq --arg re "$surface_re" \
        '[.[] | select(.filename | test($re)) | {filename, status, additions, deletions}]' \
        "$OUTDIR/files_raw.json" > "$OUTDIR/surface.json"
      jq -r --arg re "$surface_re" \
        '.[] | select(.filename | test($re))
             | "=== " + .filename + " (" + .status + ") ===\n" + (.patch // "(binary or no textual patch)")' \
        "$OUTDIR/files_raw.json" > "$OUTDIR/surface_diff.patch"

      gh pr diff "$PR_NUMBER" -R "$REPO" > "$OUTDIR/diff.patch" 2>/dev/null \
        || echo "(full diff unavailable)" > "$OUTDIR/diff.patch"

      gh api "repos/$REPO/commits/$head_sha/check-runs?per_page=100" \
        --jq '{total: (.check_runs | length),
               failing: [.check_runs[] | select(.conclusion == "failure" or .conclusion == "cancelled" or .conclusion == "timed_out") | {name, conclusion}],
               by_conclusion: (.check_runs | group_by(.conclusion // "pending") | map({(.[0].conclusion // "pending"): length}) | add)}' \
        > "$OUTDIR/ci_status.json" \
        || echo '{"error": "check-runs unavailable"}' > "$OUTDIR/ci_status.json"

      rm -f "$OUTDIR/files_raw.json"
      printf '{"repo":"%s","pr_number":%s,"head_sha":"%s","generated_at":"%s"}\n' \
        "$REPO" "$PR_NUMBER" "$head_sha" "$(date -u +%FT%TZ)" > "$OUTDIR/meta.json"
      echo "Prefetch complete:"; ls -la "$OUTDIR"
tools:
  github:
    # gh-proxy: pre-authenticated gh CLI, no Docker MCP server startup. Used
    # for the on-demand full-file reads in Step 4; bulk PR data is prefetched.
    mode: gh-proxy
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
  add-labels:
    max: 1
    target: "${{ github.event.pull_request.number || github.event.issue.number }}"
  remove-labels:
    max: 1
    target: "${{ github.event.pull_request.number || github.event.issue.number }}"
  dispatch-workflow:
    - format-auto-fix
  messages:
    footer: "> ⚡ *Benchmarked by [{workflow_name}]({run_url})*"
    run-started: "⚡ [{workflow_name}]({run_url}) is profiling this PR for guidance and review..."
    run-success: "⚡ [{workflow_name}]({run_url}) completed the management SDK PR review. ✅"
    run-failure: "⚡ [{workflow_name}]({run_url}) {status}. ❌"
timeout-minutes: 35

---

# Management Release Assistant

You are an SDK release assistant that reviews management-plane SDK PRs and provides API surface and tooling review comments.

## Workflow to review the management PR
Review Azure SDK for JS management library pull request #${{ github.event.pull_request.number }} against the official API review guidelines.

Follow the guidelines in [mgmt-review-guidelines.md](../prompts/mgmt-review-guidelines.md).

### Important Constraints

- Focus the review on changes relevant to the listed validation rules for **tooling** and **public API surface** in the guidelines.
- Ignore implementation internals, private methods, generated code, and test or samples files.
- Do **not** comment on style, formatting, documentation, or whitespace.
- Do **not** flag issues in APIs tagged `@internal`.
- Do **not** flag undocumented APIs.
- Do **not** flag issues in submodules.
- Do **not** flag `AzureClouds` relevant enums. Its inconsistency is by design.
- Do **not** raise CHANGELOG `Compared with version X.Y.Z` baseline issues except an `alpha` baseline — see the **CHANGELOG comparison baseline** rule in the guidelines for why skipped previews and "missing" intermediate entries are expected.
- **Do** flag if the `api-version` introduced in this PR is not strictly newer than the one already present in the package (i.e., it is the same as or older than the existing version).

## Prefetched context — read these first, do not re-fetch

A deterministic step has already gathered this PR's context into
`/tmp/gh-aw/agent/`. **Read these files with `cat`. Do not call the GitHub
API to re-list files, fetch diffs, or check CI.**

| File | Contents |
|---|---|
| `pr.json` | PR metadata (`title`, `mergeable`, `headRefOid`, `labels`, `changedFiles`). |
| `changed_files.json` | Every changed file: `{filename, status, additions, deletions, previous_filename}`. |
| `surface.json` | The mgmt-relevant subset (`review/*-node.api.md`, `CHANGELOG.md`, `package.json`). Start here. |
| `surface_diff.patch` | Diff of only those files. |
| `diff.patch` | Full PR diff (fallback). |
| `ci_status.json` | `{total, failing[], by_conclusion}` for the head commit's checks. |
| `meta.json` | `{repo, pr_number, head_sha, generated_at}`. |

This workflow runs with `mode: gh-proxy`. In Step 4, when you need the
**full file** (not just the diff), read it on demand with the `gh` CLI.

### Step 1 — Context Gathering

1. **Recall past context** — use `cache-memory` to check whether this PR or package has been reviewed before.

### Step 2 - Validate any tool issues

1. Read `changed_files.json` (the prefetched file list) — do not call the GitHub API.
2. Focus on the tool validation rules and highlight tool issues.
3. If no listed violations are found, proceed to the following steps.

### Step 3 — Validate changed public API surface

1. Read `surface.json` and the corresponding `surface_diff.patch` (prefetched) — do not call the GitHub API.
2. Focus on:
   - `review/{package-name}-node.api.md` files (the API report — each line is a public symbol)
  - Only consider checkpoints mentioned in the guidelines
   No need to:
  - Review submodules like `/models` or `/api`
  - Focus on issues not mentioned in the guidelines, such as `undocumented`
3. If no guideline violations are found, state that there are no public API concerns.

### Step 4 - Double check review comments

1. Go through all review comments.
2. If any comments mention missing data:
   2.1 First, check the relevant full files, not just the PR diff.
   2.2 Then double-check whether the data is actually missing.
3. If the data is missing, keep the comment; otherwise remove it because the data exists but is not part of the current PR.

### Step 5 — Submit Review

Submit your findings as a **pull request review** with inline code comments.

For each finding, create a **review comment** on the specific file and
line using `create-pull-request-review-comment`:

> 🔴 **Tool Issue** — `CHANGELOG.md:42`
> `Compared with 1.0.0-alpha.20260311.1:`.
> We should not compare with alpha versions in `CHANGELOG.md`; this suggests a tooling bug.
> **Fix:** Update `CHANGELOG.md` to compare with the last released stable version (or, if the package has never had a stable release, its most recent preview), and report the issue in the [generation tool repository](https://github.com/Azure/typespec-azure/issues).

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

### Step 6 — Update Memory

Store a brief summary in `cache-memory` (PR number, package, outcome) so future runs can detect repeat patterns.


## Final Step — Update Labels

After completing all review steps, update the PR labels to indicate completion:

1. Remove the `mgmt-review-in-progress` label
2. Add the `mgmt-review-added` label

Use the `add-labels` and `remove-labels` safe-outputs to manage these labels on PR #${{ github.event.pull_request.number }}.
