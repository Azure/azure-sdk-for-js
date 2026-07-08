---
on:
  check_suite:
    types: [completed]
  workflow_dispatch:
    inputs:
      item_number:
        description: PR number to generate merge guidance for
        required: true
        type: string
  # on.permissions: scopes for the pre-activation job that runs on.steps
  permissions:
    checks: read
    pull-requests: read
    actions: read
  # on.steps: runs BEFORE agent activation; gates via `if:` below.
  # env: vars in steps use the full GitHub Actions expression context —
  # gh-aw's expression allowlist only restricts frontmatter YAML field values.
  steps:
    - name: Gate — verify CI complete and PR is a mgmt PR
      id: gate
      uses: actions/github-script@v9
      env:
        CHECK_SUITE_APP: ${{ github.event.check_suite.app.name }}
        HEAD_SHA: ${{ github.event.check_suite.head_sha }}
        ITEM_NUMBER: ${{ github.event.inputs.item_number }}
      with:
        script: |
          const appName  = process.env.CHECK_SUITE_APP || '';
          const headSha  = process.env.HEAD_SHA        || '';
          const inputPr  = process.env.ITEM_NUMBER     || '';

          if (context.eventName === 'workflow_dispatch') {
            core.setOutput('pr_number', inputPr);
            core.setOutput('ready', 'true');
            return;
          }

          // Only care about Azure Pipelines (ADO) check suites — filters out GitHub Actions
          // and other CI systems, and exits immediately for all non-mgmt PRs that lack ADO.
          if (!appName.includes('Azure Pipelines')) {
            core.setOutput('ready', 'false');
            return;
          }

          const prNum = context.payload.check_suite?.pull_requests?.[0]?.number;
          if (!prNum) {
            core.info('No PR associated with this check suite — skipping.');
            core.setOutput('ready', 'false');
            return;
          }

          // Filter to mgmt PRs: a PR qualifies only if it carries the 'Mgmt'
          // label (applied automatically by the path-based labeler on
          // sdk/*/arm-* changes) and its title contains 'AutoPR' — AutoPR PRs
          // can also be generated for data-plane, so the title alone is not enough.
          // Fully decoupled from the mgmt-review flow — guidance fires once CI
          // completes, regardless of review state.
          const { data: pr } = await github.rest.pulls.get({
            owner: context.repo.owner,
            repo:  context.repo.repo,
            pull_number: prNum,
          });
          const labels = (pr.labels || []).map(l => l.name);
          const isMgmtPr = labels.includes('Mgmt') && (pr.title || '').includes('AutoPR');
          if (!isMgmtPr) {
            core.info(`PR #${prNum} is not a mgmt PR (labels: ${labels.join(', ') || 'none'}; title: ${pr.title || ''}) — skipping.`);
            core.setOutput('ready', 'false');
            return;
          }

          core.info(`ADO check suite completed on ${headSha} — activating for mgmt PR #${prNum}`);
          core.setOutput('pr_number', String(prNum));
          core.setOutput('ready', 'true');

jobs:
  pre-activation:
    outputs:
      pr_number: ${{ steps.gate.outputs.pr_number }}
      ready: ${{ steps.gate.outputs.ready }}

if: needs.pre_activation.outputs.ready == 'true' && needs.pre_activation.outputs.pr_number != ''

concurrency:
  group: "gh-aw-mgmt-guidance-${{ github.event.check_suite.pull_requests[0].number || github.event.inputs.item_number || github.run_id }}"
  cancel-in-progress: true

description: "Post Next Steps to Merge once all CI checks complete on management-plane SDK PRs"
permissions:
  contents: read
  pull-requests: read
  actions: read
  copilot-requests: write
strict: false
network:
  allowed:
    - defaults
    - "dev.azure.com"
tools:
  github:
    toolsets: [context, repos, pull_requests, actions]
  bash: true
safe-outputs:
  add-comment:
    max: 1
    target: "${{ needs.pre_activation.outputs.pr_number }}"
    hide-older-comments: true
    footer: false
  messages:
    run-failure: "⚡ [{workflow_name}]({run_url}) failed to post merge guidance. ❌"
timeout-minutes: 10

---

# Management SDK Merge Guidance

You provide merge readiness guidance for Azure SDK for JS management-plane PRs.

**PR to evaluate:** `${{ needs.pre_activation.outputs.pr_number }}`

All CI checks have finished on this PR's head commit. Determine whether the PR is ready to merge or has blocking failures, then post a single comment.

## Step 1. Confirm merge readiness

Fetch the PR using the GitHub API. If `mergeable_state == "clean"` and no check has `conclusion: "failure"`, `"cancelled"`, or `"timed_out"`:

Post this comment and stop:
```markdown
## Next Steps to Merge
✅ All CI checks have passed — this PR is ready for review!

A SDK reviewer will take a look shortly. Once it's approved, you can go ahead and merge it. To make things easier, feel free to [enable auto-merge](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/automatically-merging-a-pull-request) so it merges on its own right after approval.

For more details, see the [management SDK release process](https://eng.ms/docs/products/azure-developer-experience/plan/mgmt-sdk-release-process).
```

## Step 2. Diagnose blocking items

Collect every blocker:

1. **PR merge conflicts** — if `mergeable_state == "dirty"` → pnpm-lock or code conflict.
2. **Failed CI checks** — every check run with `conclusion: "failure"`, `"cancelled"`, or `"timed_out"`.
3. **Diagnose each failed ADO sub-check** (names like `js - pullrequest (Build Build)`, `js - pullrequest (UnitTest ubuntu_24x_node)`):
   - Extract `buildId` from `target_url` (pattern: `https://dev.azure.com/azure-sdk/public/_build/results?buildId=<ID>&view=results`)
   - Timeline: `curl -s "https://dev.azure.com/azure-sdk/public/_apis/build/builds/<buildId>/timeline?api-version=7.1"` — find `records` with `result: "failed"`
   - Logs: `curl -s "<record.log.url>"` — search for specific error messages
   - **CRITICAL**: Use only the real `target_url` from the API. Never fabricate or use placeholder URLs.

#### CI Check → Category

| Sub-check (text in parentheses) | What it validates | Fix |
|---|---|---|
| `Build Build` | TypeScript compilation | Fix compile errors |
| `Build Analyze` | Format, ESLint, snippets, READMEs | `cd <pkg> && pnpm format` then push |
| `UnitTest <env>` | Tests on node/browser environments | Fix tests or skip with maintainer approval |
| `verify-links` | Markdown link validation | Add URL to `eng/ignore-links.txt` |
| `checkenforcer` | Meta-check (waits for all others) | `/check-enforcer override` to unblock |

#### Log Symptom → Root Cause

| Symptom | Root cause | Action |
|---|---|---|
| `UnitTest FAILED` request url mismatch | Stale recordings | Re-record per [test guide](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/Quickstart-on-how-to-write-tests.md#run-tests-in-record-mode) or skip with maintainer approval |
| `UnitTest FAILED` missing browser recordings | Missing browser recordings | Re-record browser recordings |
| `Build FAILED` | Compile error | Fix compile errors |
| `Check-format FAILED` | Unformatted code | `cd <pkg-dir> && pnpm format` then push |
| `verify-links` broken URL | Broken markdown link | Add URL to `eng/ignore-links.txt` |
| `ERR_PNPM_LOCKFILE_MISSING_DEPENDENCY` | pnpm-lock conflict | Follow [conflict guide](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/resolve-pnpm-lock-merge-conflict.md) |

Extra rules:
- If the same UnitTest error appears across multiple environments, list it only once.
- Include pnpm-lock guidance if `mergeable_state == "dirty"`.
- Link to [CI troubleshooting](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/Troubleshoot-ci-failure.md) for unrecognized failures.

## Step 3. Post the result

Post a single `add-comment`. Include marker `<!-- gh-aw-workflow-id: mgmt-guidance -->` in the body. Keep the comment concise (≤ 15 lines). Do NOT include passed checks.

```markdown
## Next Steps to Merge
Only failed checks and required actions are listed below.

- ❌ <failed check name>: <short reason>. Action: <specific fix>. Review [ADO logs](<real target_url>).
- ❌ Check-format: code not formatted. Action: Run `cd <package-dir> && pnpm format`, then commit and push. Review [ADO logs](<target_url>).
- 🔄 pnpm-lock conflict: merge conflict in pnpm-lock.yaml. Follow the [conflict guide](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/resolve-pnpm-lock-merge-conflict.md).

Need a hand? Feel free to ask in the [Language – JS & TS 🥷 Teams channel](https://teams.microsoft.com/l/channel/19%3A344f6b5b36ba414daa15473942c7477b%40thread.skype/Language%20%E2%80%93%20JS%E2%80%89%EF%BC%86%E2%80%89TS%20%F0%9F%A5%B7?groupId=3e17dcb0-4257-4a30-b843-77f47f1d4121&tenantId=72f988bf-86f1-41af-91ab-2d7cd011db47) — we're happy to help.
```
