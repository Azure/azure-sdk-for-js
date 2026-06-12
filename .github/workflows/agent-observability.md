---
on:
  workflow_dispatch:
    inputs:
      window_days:
        description: How many days back to measure (default 7)
        required: false
        default: "7"
        type: string
  # NOTE: This is intended to run weekly (Monday). The schedule is
  # intentionally omitted for now so we can validate stability via
  # manual workflow_dispatch runs before enabling automation. To turn
  # it on, restore:
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
# DataOps: collect every metric in a deterministic, authenticated shell
# step (GH_TOKEN → 5000 req/hr, runs outside the agent sandbox). The
# agent never makes API calls; it only reads /tmp/gh-aw/agent/*.json.
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
    run: |
      set -uo pipefail
      REPODIR="$OUTDIR/repo"
      mkdir -p "$OUTDIR"

      now_s=$(date -u +%s)
      since_s=$(( now_s - WINDOW_DAYS * 86400 ))
      prior_s=$(( since_s - WINDOW_DAYS * 86400 ))
      since=$(date -u -d "@$since_s" +%Y-%m-%dT%H:%M:%SZ)
      until=$(date -u -d "@$now_s" +%Y-%m-%dT%H:%M:%SZ)
      prior_since=$(date -u -d "@$prior_s" +%Y-%m-%dT%H:%M:%SZ)

      jq -n --arg wd "$WINDOW_DAYS" --arg s "$since" --arg u "$until" --arg ps "$prior_since" \
        '{window_days:($wd|tonumber), since:$s, until:$u, prior_since:$ps}' > "$OUTDIR/meta.json"
      echo "window: $since .. $until (prior from $prior_since)"

      api() { gh api -H "Accept: application/vnd.github+json" "$@"; }

      # --- Step 0: blobless clone (full history; blobs fetched on demand) ---
      if [ ! -d "$REPODIR/.git" ]; then
        git clone --filter=blob:none "https://github.com/$REPO.git" "$REPODIR" 2>/dev/null \
          && echo "clone ok" || echo "clone FAILED"
      fi

      # --- Step 1: CCR review-comment reactions (repo-level, inline reactions) ---
      collect_ccr() {
        jq -s --arg lo "$1" --arg hi "$2" '
          [ .[][] | select(.user.login=="Copilot")
            | select(.created_at >= $lo and .created_at < $hi) ] as $c
          | { comments: ($c|length),
              plus:   ([$c[].reactions["+1"]] | add // 0),
              minus:  ([$c[].reactions["-1"]] | add // 0),
              with_reaction: ([$c[] | select((.reactions["+1"]+.reactions["-1"])>0)] | length),
              prs: ([$c[] | (.pull_request_url | split("/") | last)] | unique) }
        ' "$3"
      }
      ccr_dump="$OUTDIR/.ccr_pages.json"; : > "$ccr_dump"
      page=1; pages_fetched=0
      while [ "$page" -le 20 ]; do
        resp=$(api "/repos/$REPO/pulls/comments?sort=created&direction=desc&per_page=100&page=$page" 2>/dev/null)
        [ -z "$resp" ] && break
        cnt=$(echo "$resp" | jq 'length'); [ "$cnt" -eq 0 ] && break
        echo "$resp" >> "$ccr_dump"
        pages_fetched=$((pages_fetched+1))
        oldest=$(echo "$resp" | jq -r '.[-1].created_at')
        [[ "$oldest" < "$prior_since" ]] && break
        page=$((page+1))
      done
      cur=$(collect_ccr "$since" "$until" "$ccr_dump")
      prior=$(collect_ccr "$prior_since" "$since" "$ccr_dump")
      jq -n --argjson cur "$cur" --argjson prior "$prior" --argjson pages "$pages_fetched" \
        '{current:$cur, prior:$prior, pages_fetched:$pages}' > "$OUTDIR/ccr.json"

      # --- Step 2: context layer health (local git log) ---
      ctx="[]"
      if [ -d "$REPODIR/.git" ]; then
        mapfile -t files < <(cd "$REPODIR" && { \
          echo AGENTS.md; echo .github/copilot-instructions.md; \
          git ls-files '.github/skills/**/SKILL.md'; \
          git ls-files '.github/instructions/reviewer/*.md'; } | sort -u)
        ctx=$(
          for f in "${files[@]}"; do
            if [ -f "$REPODIR/$f" ]; then
              last=$(cd "$REPODIR" && git log -1 --format=%ct -- "$f" 2>/dev/null)
              if [ -n "$last" ]; then age=$(( (now_s - last) / 86400 )); else age=null; fi
              jq -n --arg p "$f" --argjson a "${age:-null}" '{path:$p, present:true, age_days:$a}'
            else
              jq -n --arg p "$f" '{path:$p, present:false, age_days:null}'
            fi
          done | jq -s '.'
        )
      fi
      echo "$ctx" > "$OUTDIR/context.json"

      # --- Step 4: codebase hygiene (grep) ---
      ed=null; ef=null; sk=null; on=null
      if [ -d "$REPODIR/sdk" ]; then
        cd "$REPODIR"
        ed=$(grep -rE "eslint-disable" sdk --include="*.ts" --include="*.mts" --include="*.cts" \
              --exclude-dir=node_modules --exclude-dir=dist --exclude-dir=test 2>/dev/null | wc -l | tr -d ' ')
        ef=$(grep -rlE "eslint-disable" sdk --include="*.ts" --include="*.mts" --include="*.cts" \
              --exclude-dir=node_modules --exclude-dir=dist --exclude-dir=test 2>/dev/null | wc -l | tr -d ' ')
        sk=$(grep -rnE "\.skip\(" sdk --include="*.ts" --include="*.mts" --include="*.cts" \
              --exclude-dir=node_modules --exclude-dir=dist 2>/dev/null | grep -E "/test/" | grep -v "snippets.spec" | wc -l | tr -d ' ')
        on=$(grep -rnE "\.only\(" sdk --include="*.ts" --include="*.mts" --include="*.cts" \
              --exclude-dir=node_modules --exclude-dir=dist 2>/dev/null | grep -E "/test/" | grep -v "snippets.spec" | wc -l | tr -d ' ')
      fi
      jq -n --argjson ed "${ed:-null}" --argjson ef "${ef:-null}" --argjson sk "${sk:-null}" --argjson on "${on:-null}" \
        '{eslint_directives:$ed, eslint_files:$ef, skip:$sk, only:$on}' > "$OUTDIR/hygiene.json"

      # --- Step 5: stale documentation (local git log; all files, no sampling) ---
      if [ -d "$REPODIR/.git" ]; then
        cd "$REPODIR"
        doclist=$(git ls-files documentation/ | while read -r f; do
          last=$(git log -1 --format=%ct -- "$f" 2>/dev/null); [ -z "$last" ] && continue
          age=$(( (now_s - last) / 86400 ))
          jq -n --arg f "$f" --argjson a "$age" '{file:$f, age_days:$a}'
        done | jq -s 'sort_by(-.age_days)')
        total=$(echo "$doclist" | jq 'length')
        stale=$(echo "$doclist" | jq '[.[]|select(.age_days>30)]|length')
        top=$(echo "$doclist" | jq '.[0:5]')
        if [ -d "$REPODIR/taste" ]; then
          tlast=$(git log -1 --format=%ct -- taste 2>/dev/null); tage=$(( (now_s - tlast) / 86400 ))
          taste=$(jq -n --argjson a "$tage" '{present:true, age_days:$a}')
        else
          taste='{"present":false,"age_days":null}'
        fi
        jq -n --argjson t "$total" --argjson s "$stale" --argjson top "$top" --argjson taste "$taste" \
          '{total:$t, stale_count:$s, top:$top, taste:$taste}' > "$OUTDIR/docs.json"
      else
        echo '{"total":null,"stale_count":null,"top":[],"taste":{"present":false,"age_days":null}}' > "$OUTDIR/docs.json"
      fi

      # --- Step 3: CI speed (check-runs for every merged PR in the window) ---
      merged=$(api "/repos/$REPO/pulls?state=closed&base=main&sort=updated&direction=desc&per_page=100" 2>/dev/null \
        | jq --arg s "$since" --arg u "$until" '[.[] | select(.merged_at != null and .merged_at >= $s and .merged_at < $u)]')
      mcount=$(echo "$merged" | jq 'length')
      durs="[]"
      for sha in $(echo "$merged" | jq -r '.[].head.sha'); do
        d=$(api "/repos/$REPO/commits/$sha/check-runs?per_page=100" 2>/dev/null \
          | jq '[.check_runs[]
              | select(.app.slug=="azure-pipelines" and .name=="js - pullrequest"
                       and .status=="completed" and .started_at!=null and .completed_at!=null)
              | ((.completed_at|fromdateiso8601) - (.started_at|fromdateiso8601))]')
        durs=$(jq -n --argjson a "$durs" --argjson b "${d:-[]}" '$a + $b')
      done
      jq -n --argjson durs "$durs" --argjson mc "$mcount" '
        ($durs|sort) as $d | ($d|length) as $n
        | { merged_prs:$mc, count:$n,
            median_s: (if $n==0 then null else $d[(($n-1)/2)|floor] end),
            p95_s:    (if $n==0 then null else $d[(($n*0.95 - 0.001)|floor)] end) }
      ' > "$OUTDIR/ci.json"

      rm -f "$ccr_dump"
      echo "=== collected ==="; ls -1 "$OUTDIR"/*.json
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
