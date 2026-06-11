---
on:
  workflow_dispatch:
    inputs:
      window_days:
        description: How many days back to measure (default 7)
        required: false
        default: "7"
        type: string
  schedule:
    - cron: "weekly on monday"   # fuzzy schedule (gh-aw-recommended)
description: |
  Weekly agent observability report for Azure/azure-sdk-for-js. Posts a
  structured comment on the long-lived tracking issue identified by repo
  variable AGENT_OBSERVABILITY_ISSUE (hardcoded to #38930 in this
  prototype). Measures Tier 1 (leading indicators)
  from the AI-Forward Starter Kit plus Copilot Code Review reaction quality.
permissions:
  contents: read
  actions: read
  pull-requests: read
  issues: read
tools:
  github:
    toolsets: [default]
  bash: true
safe-outputs:
  add-comment:
    max: 1
    target: "38930"   # tracking issue (prototype). TODO: move to repo var AGENT_OBSERVABILITY_ISSUE
    hide-older-comments: true
    footer: false
---

# Weekly Agent Observability Report

You are producing the weekly agent-observability report for
`Azure/azure-sdk-for-js`. The report is a single comment posted on the
tracking issue #38930 (in this prototype the number is hardcoded; it
will later move to repo variable `AGENT_OBSERVABILITY_ISSUE`).

The goal of this workflow is **measurement, not action**. Do not open
PRs, do not edit files, do not file new issues. Your only output is the
comment.

## Inputs

- `window_days` (workflow input, default `7`): the size of the
  measurement window in days. Compute `since = today - window_days` and
  `until = today` (UTC). Refer to this as "the window" throughout.

## Required output shape

The comment **must** follow this exact structure so that humans and
future agents can diff weeks at a glance. Use the marker comment so
gh-aw can deduplicate.

```markdown
<!-- gh-aw-workflow-id: agent-observability -->
# Week of YYYY-MM-DD — Agent observability

cc @maorleger — please assign yourself if not already assigned.

## CCR review-comment reactions (last N days)
- M inline comments by Copilot on K PRs
- R reactions logged: A 👍, B 👎
- **Helpful rate: P%** (Δ vs prior window)
- **Coverage: C%** of CCR comments got an explicit reaction

## Tier 1 — Are we set up?

### Context layer health
| File | Present | Days since last commit |
|---|---|---|
| ... | | |

**Verdict:** ✅ / ⚠️ / ❌ one-line summary

### CI speed — `js - pullrequest` (Azure Pipelines via GitHub check-runs)
- Median duration: ...
- p95: ...
- Check-runs counted: ...
- **Verdict:** ...

### Codebase hygiene
- `eslint-disable` directives under `sdk/**/src/**`: N (Δ vs last week)
- `.skip(` under `sdk/**/test/**`: N
- `.only(` under `sdk/**/test/**`: N
- **Verdict:** ...

### Stale documentation (>30d threshold)
- Files under `documentation/` with no commits in >30 days: N / total
- Top stale (up to 5): ...
- `taste/` folder: present (days-since-last-commit) **or** **missing — gap**
- **Verdict:** ...

## Agent activity (MVP proxy)
- Commits in window with `Co-authored-by: Copilot` trailer: N (Δ vs prior)
- Scope note: counts Copilot-CLI-authored commits only; VS Code inline
  edits + CCR comments are not captured by this signal.

## What I'm noticing
[One short paragraph — 3-5 sentences — naming the most interesting
signal this week. Be specific: name PR numbers, file paths, percentages.
Don't editorialize beyond what the numbers support.]
```

## Data collection — step by step

For every API call below, prefer `gh api` from bash. Page through
results when `per_page=100` is insufficient. All dates are UTC.

### Step 1 — CCR review-comment reactions

For each PR updated in the window:

1. `gh api '/repos/Azure/azure-sdk-for-js/pulls?state=all&sort=updated&direction=desc&per_page=100'`
   (page until `updated_at < since`).
2. For each PR, list inline review comments:
   `gh api '/repos/Azure/azure-sdk-for-js/pulls/{n}/comments?per_page=100'`
3. Keep comments where `user.login == "Copilot"` **and**
   `created_at` is within the window.
4. For each kept comment, fetch reactions:
   `gh api '/repos/Azure/azure-sdk-for-js/pulls/comments/{id}/reactions?per_page=100'`
   Tally `+1` and `-1` content values.

Compute:
- `total_comments = count of kept comments`
- `total_reactions = count of +1 and -1 across kept comments`
- `helpful_rate = (+1) / (+1 + -1)` — display `n/a` if denominator is 0
- `coverage = total_reactions / total_comments` — display `n/a` if 0
- `Δ vs prior window` — re-run steps 1-4 against the window
  `since - window_days .. since` to get a baseline.

Verified example: PR #38913 has two Copilot inline comments, one with a
`+1` reaction and one with a `-1`. Use it as a sanity check during
development.

### Step 2 — Context layer health

Check existence (via `gh api '/repos/.../contents/{path}'` or
`bash: test -f`) and most-recent commit date (via
`gh api '/repos/.../commits?path={path}&per_page=1'`, take
`commit.committer.date`) for each of:

- `AGENTS.md`
- `.github/copilot-instructions.md` (mark as intentionally removed —
  see PR #38927 — if missing)
- Every `.github/skills/**/SKILL.md`
- Every `.github/instructions/reviewer/**/*.md`

Verdict: ✅ if all present files have a commit within 14 days,
⚠️ if any are 14-30 days, ❌ if any are >30 days or expected-present
files are missing.

### Step 3 — CI speed (GitHub check-runs API)

For each PR **merged into `main`** in the window:

1. `gh api '/repos/Azure/azure-sdk-for-js/pulls?state=closed&base=main&sort=updated&direction=desc&per_page=100'`
   (filter `merged_at` within window).
2. Get the head SHA: `pr.head.sha`.
3. `gh api '/repos/Azure/azure-sdk-for-js/commits/{sha}/check-runs?per_page=100'`
4. Filter to check-runs where:
   - `app.slug == "azure-pipelines"`
   - `name == "js - pullrequest"` (the umbrella check-run; ignore
     matrix children whose names match `js - pullrequest (...)`)
   - `status == "completed"`
   - both `started_at` and `completed_at` are present
5. Compute `duration_seconds = completed_at - started_at` per check-run.

Report median and p95 of all durations, plus the count.

If a PR has multiple check-runs named exactly `js - pullrequest` (re-runs),
include all of them — re-run cost is real wait cost.

### Step 4 — Codebase hygiene

Run in bash from the repo root (the workflow's checkout):

```bash
grep -rE "eslint-disable" sdk --include="*.ts" --include="*.mts" --include="*.cts" \
  -l --exclude-dir=node_modules --exclude-dir=dist --exclude-dir=test \
  | wc -l    # file count
grep -rE "eslint-disable" sdk --include="*.ts" --include="*.mts" --include="*.cts" \
  --exclude-dir=node_modules --exclude-dir=dist --exclude-dir=test \
  | wc -l    # directive count
```

For `.skip` / `.only`, search under `sdk/**/test/**`:

```bash
grep -rnE "\.skip\(" sdk --include="*.ts" --include="*.mts" --include="*.cts" \
  --exclude-dir=node_modules --exclude-dir=dist \
  | grep -E "/test/" | wc -l
grep -rnE "\.only\(" sdk --include="*.ts" --include="*.mts" --include="*.cts" \
  --exclude-dir=node_modules --exclude-dir=dist \
  | grep -E "/test/" | wc -l
```

Exclude `test/snippets.spec.ts` files — those are documentation
snippets, not real tests.

Δ vs prior window: compare against the count from a checkout of the
commit that was `HEAD` `window_days` ago. Use:

```bash
prior_sha=$(git rev-list -1 --before="$(date -u -d "$window_days days ago" +%Y-%m-%d)" main)
```

then `git show $prior_sha:<path>` to diff counts. If this is too
expensive, report current counts only and note Δ as `n/a` for this run.

### Step 5 — Stale documentation

For each markdown file under `documentation/`:

```bash
for f in $(git ls-files documentation/); do
  last=$(git log -1 --format=%ct -- "$f")
  age_days=$(( ( $(date -u +%s) - last ) / 86400 ))
  echo "$age_days $f"
done | sort -rn
```

Count files with `age_days > 30`. Report the count, the total, and the
top 5 stale files with human-readable ages.

**`taste/` folder check:**
- `test -d taste` — if missing, report `**missing — gap**` (the article's
  example repo structure includes this folder; absence is itself a
  stale-context signal).
- If present, compute age the same way as a `documentation/` file using
  `git log -1 --format=%ct -- taste`.

### Step 6 — Agent activity proxy

```bash
since=$(date -u -d "$window_days days ago" +%Y-%m-%d)
gh api -X GET search/commits \
  -f q="repo:Azure/azure-sdk-for-js Co-authored-by:Copilot author-date:>=$since" \
  --jq '.total_count'
```

Repeat with the prior window for Δ. Verified working: 23 commits in
the last ~2 weeks at the time this workflow was authored.

**Honest scope caveat to include verbatim in the report:** this signal
counts commits whose message contains `Co-authored-by: Copilot`. That
trailer is added automatically by Copilot CLI but **not** by VS Code
inline Copilot edits and **not** by CCR review comments. The number is
a directional floor on Copilot-CLI-authored commits, not a count of
all agent-assisted work.

### Step 7 — "What I'm noticing"

Write 3-5 sentences. Anchor on the most surprising number in the run.
Examples of good observations:

- "Helpful rate dropped 12 points week-over-week, driven by three
  PRs against `sdk/keyvault/*` where CCR flagged formatting issues
  (PRs #X, #Y, #Z)."
- "Median CI time stayed flat but p95 jumped — three re-runs of `js -
  pullrequest` on PR #X account for the tail."
- "`taste/` is still missing. Article-recommended infrastructure gap."

Avoid:
- Restating numbers from the tables.
- Speculating about causes you can't see in the data.
- Generic "things are going well" filler.

## Process

1. Resolve the window: `since = today - window_days`.
2. Execute steps 1-6 in order. If any step fails (rate limit, missing
   data), capture the failure into the comment under a `## Errors`
   section but **still post the comment** with whatever data succeeded.
3. Assemble the comment per the required output shape.
4. Post via `safe-outputs.add-comment` exactly once.

## Validation expectations

Before turning on the cron, this workflow will be run via
`workflow_dispatch` against at least 3 distinct window ranges (using
different `window_days` values to span past data). Output shape must
be identical across runs. If you encounter ambiguity in the spec
during a run, prefer the more conservative interpretation and note
the choice in the `## Errors` section.
