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
  permissions:
    pull-requests: write
  steps:
    - name: Swap trigger label to in-progress
      id: swap_label
      if: github.event_name == 'pull_request_target' && github.event.label.name == 'test-review-needed'
      uses: actions/github-script@v9
      with:
        script: |
          const pr = context.payload.pull_request.number;
          // Remove trigger label
          try {
            await github.rest.issues.removeLabel({
              ...context.repo,
              issue_number: pr,
              name: 'test-review-needed'
            });
          } catch (e) {
            core.warning(`Could not remove trigger label: ${e.message}`);
          }
          // Add in-progress label
          try {
            await github.rest.issues.addLabels({
              ...context.repo,
              issue_number: pr,
              labels: ['test-review-in-progress']
            });
          } catch (e) {
            core.warning(`Could not add in-progress label: ${e.message}`);
          }
checkout: false
labels: [test-review-needed]
if: github.event.label.name == 'test-review-needed' || github.event_name == 'workflow_dispatch'
concurrency:
  group: "gh-aw-${{ github.workflow }}-${{ github.event.pull_request.number || github.event.inputs.item_number || github.run_id }}-${{ github.event.label.name || '' }}"
  cancel-in-progress: true
description: "Tester: Review a pull request for test coverage and quality"
permissions:
  contents: read
  pull-requests: read
  actions: read
  copilot-requests: write
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

      # Persona surface: test specs (excluding snippets.spec.ts), API reports,
      # and source exports.
      surface_re='/test/.*\.spec\.ts$|/review/[^/]+\.api\.md$|(^|/)src/.*\.[cm]?ts$'
      jq --arg re "$surface_re" \
        '[.[] | select((.filename | test($re)) and (.filename | test("snippets\\.spec\\.ts$") | not)) | {filename, status, additions, deletions}]' \
        "$OUTDIR/files_raw.json" > "$OUTDIR/surface.json"
      jq -r --arg re "$surface_re" \
        '.[] | select((.filename | test($re)) and (.filename | test("snippets\\.spec\\.ts$") | not))
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
    # only for residual on-demand reads; bulk PR data is prefetched above.
    mode: gh-proxy
    toolsets: [context, repos, pull_requests, actions]
    min-integrity: unapproved
  bash: ["cat", "date", "echo", "gh:*", "grep", "head", "jq", "ls", "pwd", "sort", "tail", "uniq", "wc"]
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

## Prefetched context — read these first, do not re-fetch

A deterministic step has already gathered this PR's context into
`/tmp/gh-aw/agent/`. **Read these files with `cat`. Do not call the GitHub
API or MCP tools to re-list files, fetch diffs, or check CI.**

| File | Contents |
|---|---|
| `pr.json` | PR metadata (`title`, `mergeable`, `headRefOid`, `labels`, `changedFiles`). |
| `changed_files.json` | Every changed file: `{filename, status, additions, deletions, previous_filename}`. |
| `surface.json` | The test-relevant subset (`test/**/*.spec.ts` excluding snippets, `review/*.api.md`, `src/**`). Start here. |
| `surface_diff.patch` | Diff of only those files — your primary review input. |
| `diff.patch` | Full PR diff (fallback). |
| `ci_status.json` | `{total, failing[], by_conclusion}` for the head commit's checks. |
| `meta.json` | `{repo, pr_number, head_sha, generated_at}`. |

This workflow runs with `mode: gh-proxy`, so any residual on-demand GitHub
read uses the `gh` CLI.

## Step 0 — Context Gathering

1. **Check CI status** — read `ci_status.json`. Failing tests in CI
   (`failing`) are the highest signal for test quality issues.
2. **Recall past context** — use cache-memory to check if this package
   has had prior test coverage gaps.

## Step 1 — Identify What Changed

1. Read `surface.json` for the test-relevant changed files and
   `changed_files.json` for the complete list; review the changes in
   `surface_diff.patch`. Do **not** call the GitHub API.
2. It is categorized across:
   - **New/changed APIs**: `src/index.ts`, `src/**/*.ts` (exports)
   - **Test files**: `test/**/*.spec.ts` (`snippets.spec.ts` already excluded)
   - **API report**: `review/*.api.md` (new exports visible here)
3. If `surface.json` is empty (no API or test files changed), post a single
   pull request comment saying no test concerns and stop.

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

## Final Step — Update Labels

After completing all review steps, update the PR labels to indicate completion:

1. Remove the `test-review-in-progress` label
2. Add the `test-review-added` label

Use the `gh` CLI (via `mode: gh-proxy`) to manage these labels on PR #${{ github.event.pull_request.number }}.