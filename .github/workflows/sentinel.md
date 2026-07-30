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
      if: github.event_name == 'pull_request_target' && github.event.label.name == 'security-review-needed'
      uses: actions/github-script@v9
      with:
        script: |
          const pr = context.payload.pull_request.number;
          // Remove trigger label
          try {
            await github.rest.issues.removeLabel({
              ...context.repo,
              issue_number: pr,
              name: 'security-review-needed'
            });
          } catch (e) {
            core.warning(`Could not remove trigger label: ${e.message}`);
          }
          // Add in-progress label
          try {
            await github.rest.issues.addLabels({
              ...context.repo,
              issue_number: pr,
              labels: ['security-review-in-progress']
            });
          } catch (e) {
            core.warning(`Could not add in-progress label: ${e.message}`);
          }
checkout: false
labels: [security-review-needed]
if: github.event.label.name == 'security-review-needed' || github.event_name == 'workflow_dispatch'
concurrency:
  group: "gh-aw-${{ github.workflow }}-${{ github.event.pull_request.number || github.event.inputs.item_number || github.run_id }}-${{ github.event.label.name || '' }}"
  cancel-in-progress: true
description: "Sentinel: Review a pull request for security vulnerabilities"
permissions:
  contents: read
  pull-requests: read
  actions: read
  security-events: read
  copilot-requests: write
network:
  allowed:
    - defaults
    - node
    - "osv.dev"
tools:
  github:
    # gh-proxy: pre-authenticated gh CLI, no Docker MCP server startup. Used
    # only for residual on-demand reads; bulk PR data is prefetched below.
    mode: gh-proxy
    toolsets: [context, repos, pull_requests, actions, code_security]
    min-integrity: unapproved
  bash: ["cat", "date", "echo", "gh:*", "grep", "head", "jq", "ls", "pwd", "sort", "tail", "uniq", "wc"]
  cache-memory:
  repo-memory:
  web-fetch:
# DataOps: prefetch all PR context in a deterministic shell step (GH_TOKEN,
# outside the agent sandbox — zero AI tokens, no agent rate-limit pressure).
# The agent reads /tmp/gh-aw/agent/*.json instead of calling the GitHub API
# to list files, fetch diffs, check CI, or query code scanning. Inlined
# because this workflow runs with `checkout: false` (no repo clone on disk).
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

      # Persona surface: production source + dependency manifests/lockfiles.
      surface_re='(^|/)src/.*\.[cm]?ts$|(^|/)package\.json$|(^|/)pnpm-lock\.yaml$'
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

      # Open code scanning (CodeQL) alerts (may be disabled → empty array).
      gh api --paginate "repos/$REPO/code-scanning/alerts?state=open&per_page=100" \
        --jq '[.[] | {number, rule: .rule.id, severity: (.rule.security_severity_level // .rule.severity), path: .most_recent_instance.location.path, state}]' \
        > "$OUTDIR/code_scanning_alerts.json" 2>/dev/null \
        || echo '[]' > "$OUTDIR/code_scanning_alerts.json"

      rm -f "$OUTDIR/files_raw.json"
      printf '{"repo":"%s","pr_number":%s,"head_sha":"%s","generated_at":"%s"}\n' \
        "$REPO" "$PR_NUMBER" "$head_sha" "$(date -u +%FT%TZ)" > "$OUTDIR/meta.json"
      echo "Prefetch complete:"; ls -la "$OUTDIR"
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
    footer: "> 🛡️ *Scanned by [{workflow_name}]({run_url})*"
    run-started: "🛡️ [{workflow_name}]({run_url}) is scanning this PR for security vulnerabilities…"
    run-success: "🛡️ [{workflow_name}]({run_url}) completed the security review. ✅"
    run-failure: "🛡️ [{workflow_name}]({run_url}) {status}. ❌"
timeout-minutes: 15

---

# Security Review

Review pull request #${{ github.event.pull_request.number }} for security
vulnerabilities.

Follow the guidelines in [security-review-guidelines.md](../prompts/security-review-guidelines.md).

## Important Constraints

- Only review for **security vulnerabilities**. Ignore style, formatting,
  API design, and performance.
- Only flag issues **introduced or worsened** by this pull request. Do not
  flag pre-existing issues in unchanged code.
- If other review agent labels are also present on this PR, stay focused
  on security. Do not duplicate findings better handled by other agents
  (Archie for API design, Dexter for dependencies, Dash for performance,
  Scribe for documentation, Tester for test coverage).
- Focus on production source code in `src/` directories. Test files are
  in scope only if they contain real credentials.
- Do **not** flag patterns in auto-generated code under `src/generated/`
  unless they introduce a clear injection vector.
- `snippets.spec.ts` files under `sdk/**/*/test/` are documentation
  snippet sources, **not** real tests — ignore them.

## Prefetched context — read these first, do not re-fetch

A deterministic step has already gathered this PR's context into
`/tmp/gh-aw/agent/`. **Read these files with `cat`. Do not call the GitHub
API or MCP tools to re-list files, fetch diffs, check CI, or query code
scanning.**

| File | Contents |
|---|---|
| `pr.json` | PR metadata (`title`, `mergeable`, `headRefOid`, `labels`, `changedFiles`). |
| `changed_files.json` | Every changed file: `{filename, status, additions, deletions, previous_filename}` (use its length for the large-PR check). |
| `surface.json` | The security-relevant subset (`src/**`, `package.json`, `pnpm-lock.yaml`). Start here. |
| `surface_diff.patch` | Diff of only the security-relevant files — your primary review input. |
| `code_scanning_alerts.json` | Open CodeQL alerts: `{number, rule, severity, path, state}` (empty if disabled). |
| `diff.patch` | Full PR diff (fallback). |
| `ci_status.json` | `{total, failing[], by_conclusion}` for the head commit's checks. |
| `meta.json` | `{repo, pr_number, head_sha, generated_at}`. |

This workflow runs with `mode: gh-proxy`, so any residual on-demand GitHub
read uses the `gh` CLI; `web-fetch` still reaches npm/osv.dev.

## Step 0 — Context Gathering

1. **Check CI status** — read `ci_status.json`. Security-related build
   failures (`failing`) are high priority.
2. **Check code scanning alerts** — read `code_scanning_alerts.json` and
   cross-reference the `path` of each alert with the files changed in this PR.
3. **Recall past context** — use repo-memory to check for known
   security exceptions or suppressed findings for this package. Use
   cache-memory to check if this PR author or package has had prior
   security findings.

## Step 1 — Identify Changed Files

1. Read `surface.json` (security-relevant files) and `changed_files.json`
   (complete list); review the changes in `surface_diff.patch`. Do **not**
   call the GitHub API.
2. Prioritize:
   - Files in `src/` directories (production code)
   - Credential-related files (`*credential*`, `*auth*`, `*token*`)
   - HTTP client or pipeline files (`*pipeline*`, `*policy*`, `*client*`)
   - Files that handle user input or construct URLs/queries
   - Lock files (`pnpm-lock.yaml`) and package manifests (`package.json`)
3. **Large PRs** — if the pull request changes more than 50 files, focus
   exclusively on the priority categories above. State at the end of your
   review that lower-priority files were not examined due to PR size.
4. If no security-relevant files were changed (`surface.json` is empty),
   post a single pull request comment saying no security concerns were
   found and stop.

## Step 2 — Check Against Guidelines

For each changed file, apply the full security review checklist from the
guidelines document. Cover all 16 categories: credential exposure, input
validation, dangerous patterns, unsafe type assertions, error handling,
environment variables, cryptography, authorization, browser security,
supply chain, prototype pollution, ReDoS, SSRF, Azure SDK patterns,
race conditions, and test recording security.

For any **new dependency** changes, consult the prefetched
`code_scanning_alerts.json` for existing CodeQL alerts. You can also use
web-fetch to query:
- `https://registry.npmjs.org/<package>` for package metadata and audit
  advisories
- `https://osv.dev/` for vulnerability data (added to the network
  allowlist)

## Step 3 — Submit Review

Submit your findings as a **pull request review** with inline code comments.

For each finding, create a **review comment** on the specific file and
line using `create-pull-request-review-comment`:

> 🔴 **Critical** — CWE-532 — Connection string logged at `info` level.
> **Fix:** Remove the connection string from log output. Log only the
> endpoint hostname.

After all inline comments, **submit the review** using
`submit-pull-request-review` with:

- **event**: `COMMENT`
- **body**: A one-paragraph summary (count of findings by severity, or
  "No security issues found") followed by:

<pre>
&lt;details&gt;
&lt;summary&gt;📊 Structured Report&lt;/summary&gt;

```json
{"agent":"sentinel","pr":NUMBER,"summary":"clean|issues_found","findings":[{"file":"...","line":0,"severity":"critical|medium|low","category":"...","cwe":"CWE-XXX","description":"..."}]}
```

&lt;/details&gt;
</pre>

If no issues were found, submit a `COMMENT` review with a one-sentence
body confirming no security vulnerabilities were detected.

## Step 4 — Update Memory

After posting, store useful context for future reviews:
- **repo-memory**: save any package-specific security exceptions
  (e.g., "identity package legitimately uses `child_process` for
  Azure CLI credential").
- **cache-memory**: save a brief summary of this review (PR number,
  package, findings with CWEs) so future runs can detect recurring
  vulnerability patterns.

## Final Step — Update Labels

After completing all review steps, update the PR labels to indicate completion:

1. Remove the `security-review-in-progress` label
2. Add the `security-review-added` label

Use the `gh` CLI (via `mode: gh-proxy`) to manage these labels on PR #${{ github.event.pull_request.number }}.