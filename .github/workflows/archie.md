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
      if: github.event_name == 'pull_request_target' && github.event.label.name == 'architecture-review-needed'
      uses: actions/github-script@v9
      with:
        script: |
          const pr = context.payload.pull_request.number;
          // Remove trigger label
          try {
            await github.rest.issues.removeLabel({
              ...context.repo,
              issue_number: pr,
              name: 'architecture-review-needed'
            });
          } catch (e) {
            core.warning(`Could not remove trigger label: ${e.message}`);
          }
          // Add in-progress label
          try {
            await github.rest.issues.addLabels({
              ...context.repo,
              issue_number: pr,
              labels: ['architecture-review-in-progress']
            });
          } catch (e) {
            core.warning(`Could not add in-progress label: ${e.message}`);
          }
checkout: false
labels: [architecture-review-needed]
if: github.event.label.name == 'architecture-review-needed' || github.event_name == 'workflow_dispatch'
concurrency:
  group: "gh-aw-${{ github.workflow }}-${{ github.event.pull_request.number || github.event.inputs.item_number || github.run_id }}-${{ github.event.label.name || '' }}"
  cancel-in-progress: true
description: "Archie: Review a pull request for public API design issues"
permissions:
  contents: read
  pull-requests: read
  actions: read
  copilot-requests: write
# DataOps: gather all PR review context in a deterministic shell step
# (GH_TOKEN, runs outside the agent sandbox — zero AI tokens and no agent
# rate-limit pressure). The agent then reads /tmp/gh-aw/agent/*.json
# instead of making GitHub API/MCP calls to list files, fetch diffs, or
# check CI. See the gh-aw DataOps pattern (deterministic-ops).
#
# Inlined here rather than a committed sibling script because this
# workflow runs with `checkout: false`, so no repo clone is on disk in
# the agent job for a `bash .github/...` invocation to resolve.
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

      # PR metadata: base/head SHAs, mergeability, labels (one call).
      gh pr view "$PR_NUMBER" -R "$REPO" \
        --json number,title,state,isDraft,mergeable,mergeStateStatus,baseRefName,headRefName,headRefOid,baseRefOid,labels,additions,deletions,changedFiles \
        > "$OUTDIR/pr.json"
      head_sha="$(jq -r '.headRefOid' "$OUTDIR/pr.json")"

      # Changed files with per-file patch (top-level array — gh --paginate
      # merges pages into one array).
      gh api --paginate "repos/$REPO/pulls/$PR_NUMBER/files" > "$OUTDIR/files_raw.json"

      # Compact list (no patch) for quick scanning.
      jq '[.[] | {filename, status, additions, deletions, previous_filename}]' \
        "$OUTDIR/files_raw.json" > "$OUTDIR/changed_files.json"

      # Public-API-surface subset: barrels/index.ts, API reports, package.json.
      surface_re='(^|/)index\.ts$|/review/[^/]+\.api\.md$|(^|/)package\.json$'
      jq --arg re "$surface_re" \
        '[.[] | select(.filename | test($re)) | {filename, status, additions, deletions}]' \
        "$OUTDIR/files_raw.json" > "$OUTDIR/api_surface.json"

      # Compact diff of just the API-surface files (primary review input).
      jq -r --arg re "$surface_re" \
        '.[] | select(.filename | test($re))
             | "=== " + .filename + " (" + .status + ") ===\n" + (.patch // "(binary or no textual patch)")' \
        "$OUTDIR/files_raw.json" > "$OUTDIR/api_diff.patch"

      # Full diff as a fallback (may be large; prefer api_diff.patch).
      gh pr diff "$PR_NUMBER" -R "$REPO" > "$OUTDIR/diff.patch" 2>/dev/null \
        || echo "(full diff unavailable)" > "$OUTDIR/diff.patch"

      # CI check-run status for the head commit (first 100 checks).
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
    # gh-proxy: pre-authenticated gh CLI, no Docker MCP server startup.
    # Used only for the on-demand GA-baseline lookup in Step 2; all bulk
    # PR data is already prefetched above.
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

## Prefetched context — read these first, do not re-fetch

A deterministic step has already gathered everything you need about this
PR into `/tmp/gh-aw/agent/`. **Read these files with `cat`. Do not call
the GitHub API or MCP tools to re-list files, fetch diffs, or check CI —
that work is already done.**

| File | Contents |
|---|---|
| `pr.json` | PR metadata: `title`, `state`, `mergeable`, `mergeStateStatus`, `baseRefName`, `headRefName`, `headRefOid`, `labels`, `additions`, `deletions`, `changedFiles`. |
| `changed_files.json` | Every changed file: `{filename, status, additions, deletions, previous_filename}`. |
| `api_surface.json` | The public-API-surface subset of `changed_files.json` (barrels/`index.ts`, `review/*.api.md`, `package.json`). Start here. |
| `api_diff.patch` | Unified diff of only the API-surface files — your primary review input. |
| `diff.patch` | Full PR diff (fallback; may be large — prefer `api_diff.patch`). |
| `ci_status.json` | `{total, failing[], by_conclusion}` for the head commit's checks. |
| `meta.json` | `{repo, pr_number, head_sha, generated_at}`. |

The only GitHub read you may still perform on demand is retrieving the
**GA baseline API report** in Step 2 (it depends on which package
changed). Use the `gh` CLI for that — this workflow runs with
`mode: gh-proxy`.

## Step 0 — Context Gathering

1. **Check CI status** — read `ci_status.json`. If `failing` is non-empty,
   note it but proceed with the review (API design issues exist regardless
   of build state).
2. **Recall past context** — use cache-memory to check if this PR or
   package has been reviewed before.

## Step 1 — Identify Changed API Surface

1. Read `api_surface.json` for the public-API-relevant changed files and
   `changed_files.json` for the complete list. Do **not** call the GitHub
   API — this data is already on disk.
2. Focus on:
   - `src/index.ts` or barrel export files (added/removed exports)
   - Subpath export entry points defined in the `exports` field of
     `package.json` (e.g. `./models`, `./api`) and their corresponding
     source files
   - `review/*.api.md` files (the API report — each line is a public symbol)
   - New or modified public interfaces, classes, types, and functions

   Review the actual changes in `api_diff.patch`.
3. If `api_surface.json` is empty (no public API surface changed), post a
   single comment saying the API surface looks good and stop.

## Step 2 — Check Against Guidelines

Before checking for breaking changes, establish the stable baseline: use
the `gh` CLI (available via `mode: gh-proxy`) to find the last GA
(non-preview) release tag for the changed package and retrieve its
`review/*.api.md` at that tag — e.g. `gh api
"repos/<repo>/contents/<path/to/review/x.api.md>?ref=<tag>"`. Only flag
removals as breaking if the API existed in the GA release. This is the
one lookup that stays on demand because it depends on which package
changed.

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

## Final Step — Update Labels

After completing all review steps, update the PR labels to indicate completion:

1. Remove the `architecture-review-in-progress` label
2. Add the `architecture-review-added` label

Use the `gh` CLI (via `mode: gh-proxy`) to manage these labels on PR #${{ github.event.pull_request.number }}.