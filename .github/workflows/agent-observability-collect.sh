#!/usr/bin/env bash
#
# Data collection for the agent-observability agentic workflow.
#
# This implements the gh-aw "DataOps" pattern: all metric gathering runs
# in a deterministic, authenticated shell step (GH_TOKEN -> 5000 req/hr,
# outside the agent sandbox) and writes compact JSON to $OUTDIR. The
# agent then only reads those JSON files and writes the narrative — it
# makes no API calls itself.
#
# It is kept as a standalone script (rather than inlined in the workflow
# YAML) so it has shell tooling support: shellcheck, editor highlighting,
# LSP, clean diffs, and local runnability. The workflow's `run:` step is
# a one-line `bash` invocation of this file.
#
# DataOps pattern: https://github.github.com/gh-aw/patterns/data-ops/
# Invoked from: .github/workflows/agent-observability.md
#
# Required env:
#   GH_TOKEN      authenticated token for `gh api`
#   REPO          owner/name of the repository to measure
#   WINDOW_DAYS   measurement window size in days (e.g. 7)
#   OUTDIR        directory to write *.json into (e.g. /tmp/gh-aw/agent)
#
# Outputs (under $OUTDIR): meta.json, ccr.json, context.json,
#   hygiene.json, docs.json, ci.json
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

# --- Blobless clone (full history; blobs fetched on demand) ---
if [ ! -d "$REPODIR/.git" ]; then
  git clone --filter=blob:none "https://github.com/$REPO.git" "$REPODIR" 2>/dev/null \
    && echo "clone ok" || echo "clone FAILED"
fi

# --- CCR review-comment reactions (repo-level, inline reactions) ---
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

# --- Context layer health (local git log) ---
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

# --- Codebase hygiene (grep) ---
ed=null; ef=null; sk=null; on=null
if [ -d "$REPODIR/sdk" ]; then
  cd "$REPODIR" || exit 1
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

# --- Stale documentation (local git log; all files, no sampling) ---
if [ -d "$REPODIR/.git" ]; then
  cd "$REPODIR" || exit 1
  doclist=$(git ls-files documentation/ | while read -r f; do
    last=$(git log -1 --format=%ct -- "$f" 2>/dev/null); [ -z "$last" ] && continue
    age=$(( (now_s - last) / 86400 ))
    jq -n --arg f "$f" --argjson a "$age" '{file:$f, age_days:$a}'
  done | jq -s 'sort_by(-.age_days)')
  total=$(echo "$doclist" | jq 'length')
  stale=$(echo "$doclist" | jq '[.[]|select(.age_days>30)]|length')
  top=$(echo "$doclist" | jq '.[0:5]')
  if [ -d "$REPODIR/taste" ]; then
    tlast=$(git log -1 --format=%ct -- taste 2>/dev/null)
    if [ -n "$tlast" ]; then tage=$(( (now_s - tlast) / 86400 )); else tage=null; fi
    taste=$(jq -n --argjson a "${tage:-null}" '{present:true, age_days:$a}')
  else
    taste='{"present":false,"age_days":null}'
  fi
  jq -n --argjson t "$total" --argjson s "$stale" --argjson top "$top" --argjson taste "$taste" \
    '{total:$t, stale_count:$s, top:$top, taste:$taste}' > "$OUTDIR/docs.json"
else
  echo '{"total":null,"stale_count":null,"top":[],"taste":{"present":false,"age_days":null}}' > "$OUTDIR/docs.json"
fi

# --- CI speed (check-runs for every merged PR in the window) ---
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
