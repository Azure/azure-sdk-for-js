---
on:
  workflow_dispatch:
    inputs:
      window_days:
        description: How many days back to measure (default 7)
        required: false
        default: "7"
        type: string
  # Phased rollout: this is intended to run weekly (Monday). The
  # schedule is intentionally left off for the initial rollout so we
  # run it a few times on demand (workflow_dispatch) and confirm the
  # output is stable before enabling automation. To turn on the weekly
  # cadence, uncomment:
  #   schedule:
  #     - cron: "weekly on monday"
description: |
  Weekly agent observability report for this repository. Posts a
  structured comment on a long-lived tracking issue (its number is set
  in the add-comment safe-output below). Measures Tier 1 (leading
  indicators) from the AI-Forward Starter Kit plus Copilot Code Review
  reaction quality. Follows the gh-aw DataOps pattern: all data is
  gathered by an authenticated shell step (zero AI tokens,
  deterministic), and the agent only reads the pre-computed JSON and
  writes the narrative.
permissions:
  contents: read
  actions: read
  pull-requests: read
  issues: read
  copilot-requests: write
# DataOps: collect every metric in a deterministic, authenticated shell
# step (GH_TOKEN → 5000 req/hr, runs outside the agent sandbox). The
# agent never makes API calls; it only reads /tmp/gh-aw/agent/*.json.
#
# The collection logic lives in a committed sibling script,
# agent-observability-collect.sh, rather than inline here — so it gets
# shellcheck, editor highlighting, LSP, and clean diffs. In production
# the agent job sparse-checks-out `.github` before this step, so the
# script is on disk and `bash .github/workflows/...sh` resolves.
#
# KNOWN LIMITATION (for future us): `gh aw trial` CANNOT exercise this
# script. In trial mode the agent job checks out the --logical-repo
# (the simulated target), not this branch, so the unmerged script is
# absent and the step fails with "No such file". This is a trial
# limitation, not a production bug. To validate pre-merge: run the
# script standalone (it is shellcheck-clean and takes REPO/WINDOW_DAYS/
# OUTDIR env), and rely on the fact that the identical logic passed a
# full `gh aw trial` while it was still inline. Once merged to the
# default branch, the normal workflow_dispatch run exercises it for real.
steps:
  - name: Collect observability data
    env:
      GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      # The repository the workflow runs in. In trial mode, gh aw's
      # --logical-repo sets this to the simulated target, so the same
      # value works for both production and trials.
      REPO: ${{ github.repository }}
      WINDOW_DAYS: ${{ github.event.inputs.window_days || '7' }}
      OUTDIR: /tmp/gh-aw/agent
    run: bash .github/workflows/agent-observability-collect.sh
tools:
  bash: true
safe-outputs:
  # Report hygiene (gh-aw report best practices): no @mentions (the
  # tracking issue is assigned to the owner, who is already subscribed),
  # and no bare #NNN references (they would backlink onto every cited PR
  # each week). Use full markdown links for PRs instead.
  mentions: false
  allowed-github-references: []
  add-comment:
    max: 1
    # The long-lived tracking issue this report comments on each week.
    # NOTE: gh-aw requires a literal issue number here (a ${{ vars.* }}
    # expression silently disables fixed-target mode and breaks posting),
    # so this is a per-deployment constant rather than a repo variable.
    # To deploy in another repo, create a tracking issue and put its
    # number here.
    target: "38930"
    hide-older-comments: true
    footer: false
---

# Agent observability report

You are writing the weekly agent-observability report for this
repository, posted as a single comment on the tracking issue.
**All measurement has already been done for you** by a deterministic
shell step — your only job is to read the pre-computed JSON and write a
clear, well-structured narrative. Do not fetch data, do not call APIs,
do not open PRs or files. Read JSON, write Markdown.

## Where the data is

Every file lives in `/tmp/gh-aw/agent/`. Read them with `cat`:

| File | Contents |
|---|---|
| `meta.json` | `{window_days, since, until, prior_since}` — the measurement window (UTC). |
| `ccr.json` | `{current, prior, pages_fetched}`. Each of current/prior: `{comments, plus, minus, with_reaction, prs[]}` — Copilot review-comment counts and inline 👍/👎 totals. |
| `context.json` | array of `{path, present, age_days}` for AGENTS.md, the copilot-instructions stub, every skill, and every reviewer instruction file. |
| `ci.json` | `{merged_prs, count, median_s, p95_s}` — `js - pullrequest` durations across **all** merged PRs in the window (`count` = umbrella runs measured). |
| `hygiene.json` | `{eslint_directives, eslint_files, skip, only}` — counts under `sdk/`. |
| `docs.json` | `{total, stale_count, top[], taste}` — `documentation/` staleness (>30d) and the `taste/` folder check. |

A `null` value means that metric could not be collected this run; render
it as `n/a` and mention it in **Notes** at the end. Never invent numbers.

## Deriving the few computed values

- **Helpful rate** = `plus / (plus + minus)` — `n/a` if `plus+minus == 0`.
- **Coverage** = `with_reaction / comments` — `n/a` if `comments == 0`.
- **Deltas (Δ)** = current − prior, for helpful rate and CCR volume.
  Show direction (e.g. `↓ 10 pp`, `+3`).
- **Durations**: convert `median_s` / `p95_s` to minutes (1 dp) for display.

## Report format (follow gh-aw report style exactly)

- Use **`###`** for the main sections and **`####`** for any subsection.
  Never use `#` or `##` (reserved for titles).
- For status, use GitHub alerts, **not** emoji: `> [!NOTE]` (healthy /
  neutral), `> [!WARNING]` (needs attention), `> [!CAUTION]`
  (problem / regression). Do not use ✅ ⚠️ ❌.
- Refer to PRs with full markdown links — `[#38913](https://github.com/Azure/azure-sdk-for-js/pull/38913)`
  — never a bare `#38913` (it would backlink the PR every week).
- Put the long context-layer table inside a `<details>` block; keep the
  headline stats and any failures visible.

Produce exactly this structure:

```markdown
<!-- gh-aw-workflow-id: agent-observability -->
### Week of <until date> — agent observability

_Window: <since> → <until> (<window_days>d). Prior window starts <prior_since>._

### CCR review-comment reactions
- <comments> Copilot review comments across <prs|length> PRs
- <plus> 👍 / <minus> 👎 logged
- **Helpful rate: <P>%** (Δ <…> vs prior)
- **Coverage: <C>%** of CCR comments got a reaction

> [!NOTE|WARNING|CAUTION] one-line read on CCR signal quality (e.g. low coverage = needs team diligence).

### Tier 1 — are we set up?

#### Context layer health
<headline: N files tracked; X within 14d, Y at 14–30d, Z over 30d or missing>

> [!NOTE|WARNING|CAUTION] verdict naming the worst offenders.

<details>
<summary>Per-file freshness</summary>

| File | Present | Days since last commit |
|---|---|---|
| … one row per context.json entry … |

</details>

#### CI speed — `js - pullrequest` (Azure Pipelines)
- Median: <median_min> min
- p95: <p95_min> min
- Measured: <count> umbrella runs across <merged_prs> merged PRs

> [!NOTE|WARNING|CAUTION] verdict.

#### Codebase hygiene
- `eslint-disable` directives under `sdk/**/src/**`: <eslint_directives> across <eslint_files> files
- `.skip(` under `sdk/**/test/**`: <skip>
- `.only(` under `sdk/**/test/**`: <only>

> [!NOTE|WARNING|CAUTION] verdict — committed `.only(` is the highest-signal item if > 0.

#### Stale documentation (>30d)
- <stale_count> of <total> files in `documentation/` are stale
- `taste/` folder: <present + age, or "missing — gap">

> [!NOTE|WARNING|CAUTION] verdict; cite 1–2 of the oldest files from docs.json `top`.

### What I'm noticing
<3–5 sentences naming the single most interesting signal this week. Be
specific: cite percentages, the oldest doc, the worst-stale context file,
PR links where relevant. Do not restate every number; do not speculate
beyond the data.>

### Notes
<Only if any metric was n/a or partial — say which and why. Omit this
section entirely if everything was collected.>
```

## Process

1. `cat` each JSON file in `/tmp/gh-aw/agent/`.
2. Derive the few computed values above.
3. Write the comment in the exact structure shown.
4. Emit it via `safe-outputs.add-comment` exactly once. That is your only output.

**Important — do not set a target on the comment.** Provide **only** the
`body`. Do **not** include an `item_number`, issue number, or any target
field in the `add-comment` call. The comment is automatically routed to
the preconfigured tracking issue. If you supply your own number you will
misroute the report to the wrong issue.
