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
      if: github.event_name == 'pull_request_target' && github.event.label.name == 'dependency-review-needed'
      uses: actions/github-script@v9
      with:
        script: |
          const pr = context.payload.pull_request.number;
          // Remove trigger label
          try {
            await github.rest.issues.removeLabel({
              ...context.repo,
              issue_number: pr,
              name: 'dependency-review-needed'
            });
          } catch (e) {
            core.warning(`Could not remove trigger label: ${e.message}`);
          }
          // Add in-progress label
          try {
            await github.rest.issues.addLabels({
              ...context.repo,
              issue_number: pr,
              labels: ['dependency-review-in-progress']
            });
          } catch (e) {
            core.warning(`Could not add in-progress label: ${e.message}`);
          }
checkout: false
labels: [dependency-review-needed]
if: github.event.label.name == 'dependency-review-needed' || github.event_name == 'workflow_dispatch'
concurrency:
  group: "gh-aw-${{ github.workflow }}-${{ github.event.pull_request.number || github.event.inputs.item_number || github.run_id }}-${{ github.event.label.name || '' }}"
  cancel-in-progress: true
description: "Dexter: Audit dependency changes in a pull request"
permissions:
  contents: read
  pull-requests: read
  actions: read
  vulnerability-alerts: read
  security-events: read
  copilot-requests: write
# DataOps: prefetch all PR context in a deterministic shell step (GH_TOKEN,
# outside the agent sandbox — zero AI tokens, no agent rate-limit pressure).
# The agent reads /tmp/gh-aw/agent/*.json instead of calling the GitHub API
# to list files, fetch diffs, check CI, or query Dependabot. Inlined because
# this workflow runs with `checkout: false` (no repo clone in the agent job).
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

      # Persona surface: dependency manifests only.
      surface_re='(^|/)package\.json$|(^|/)pnpm-workspace\.yaml$'
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

      # Open Dependabot alerts for the repo (may be disabled → empty array).
      gh api --paginate "repos/$REPO/dependabot/alerts?state=open&per_page=100" \
        --jq '[.[] | {number, package: .dependency.package.name, ecosystem: .dependency.package.ecosystem, severity: .security_advisory.severity, ghsa_id: .security_advisory.ghsa_id, summary: .security_advisory.summary}]' \
        > "$OUTDIR/dependabot_alerts.json" 2>/dev/null \
        || echo '[]' > "$OUTDIR/dependabot_alerts.json"

      rm -f "$OUTDIR/files_raw.json"
      printf '{"repo":"%s","pr_number":%s,"head_sha":"%s","generated_at":"%s"}\n' \
        "$REPO" "$PR_NUMBER" "$head_sha" "$(date -u +%FT%TZ)" > "$OUTDIR/meta.json"
      echo "Prefetch complete:"; ls -la "$OUTDIR"
tools:
  github:
    # gh-proxy: pre-authenticated gh CLI, no Docker MCP server startup. Used
    # only for residual on-demand reads; bulk PR data is prefetched above.
    mode: gh-proxy
    toolsets: [context, repos, pull_requests, actions, dependabot]
    min-integrity: unapproved
  bash: ["cat", "date", "echo", "gh:*", "grep", "head", "jq", "ls", "pwd", "sort", "tail", "uniq", "wc"]
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

## Prefetched context — read these first, do not re-fetch

A deterministic step has already gathered this PR's context into
`/tmp/gh-aw/agent/`. **Read these files with `cat`. Do not call the GitHub
API or MCP tools to re-list files, fetch diffs, check CI, or query
Dependabot.**

| File | Contents |
|---|---|
| `pr.json` | PR metadata (`title`, `mergeable`, `headRefOid`, `labels`, `changedFiles`). |
| `changed_files.json` | Every changed file: `{filename, status, additions, deletions, previous_filename}`. |
| `surface.json` | The dependency-manifest subset (`package.json`, `pnpm-workspace.yaml`). Start here. |
| `surface_diff.patch` | Diff of only the dependency manifests — your primary review input. |
| `dependabot_alerts.json` | Open Dependabot alerts: `{number, package, ecosystem, severity, ghsa_id, summary}` (empty if disabled). |
| `diff.patch` | Full PR diff (fallback). |
| `ci_status.json` | `{total, failing[], by_conclusion}` for the head commit's checks. |
| `meta.json` | `{repo, pr_number, head_sha, generated_at}`. |

This workflow runs with `mode: gh-proxy`, so any residual on-demand GitHub
read uses the `gh` CLI.

## Step 1 — Context Gathering

1. **Check CI status** — read `ci_status.json`. Dependency issues often
   surface as build failures; note any in `failing`.
2. **Check Dependabot alerts** — read `dependabot_alerts.json` and see
   whether any alert relates to the dependencies changed in this PR.
3. **Recall past context** — use repo-memory to check for known
   dependency exceptions or patterns for this package. Use cache-memory
   to check if similar dependency changes were reviewed before.

## Step 2 — Identify Changed Dependency Files

1. Read `surface.json` (the `package.json` / `pnpm-workspace.yaml` changes)
   and `changed_files.json` for the full list. Do **not** call the GitHub API.
2. It already contains:
   - `**/package.json` files (added, modified, or deleted)
   - `pnpm-workspace.yaml` (catalog changes)
3. If `surface.json` is empty (no dependency files changed), post a single
   pull request comment saying no dependency changes were found and stop.

## Step 3 — Analyze Each Changed package.json

For each changed `package.json`, read its diff from `surface_diff.patch`
and apply the full checklist from the dependency review guidelines. Focus on workspace
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

## Final Step — Update Labels

After completing all review steps, update the PR labels to indicate completion:

1. Remove the `dependency-review-in-progress` label
2. Add the `dependency-review-added` label

Use the `gh` CLI (via `mode: gh-proxy`) to manage these labels on PR #${{ github.event.pull_request.number }}.