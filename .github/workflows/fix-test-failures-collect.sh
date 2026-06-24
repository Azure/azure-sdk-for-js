#!/usr/bin/env bash
#
# Data collection for the "Analyze CI Test Failures" (fix-test-failures)
# agentic workflow.
#
# This implements the gh-aw "DataOps" pattern: all GitHub API gathering
# runs in a deterministic, authenticated shell step (GH_TOKEN -> 5000
# req/hr, outside the agent sandbox) and writes compact JSON to $OUTDIR.
# The agent then only reads those JSON files — it makes no API calls
# itself. Before this change the agent paginated the check-runs API,
# fetched annotations one-by-one, and polled the rate limit across ~40
# model turns; the growing context tripped the AWF effective-token hard
# rail (25M) and failed the run. Moving the work here removes that cost
# entirely.
#
# Kept as a standalone script (rather than inlined in the workflow YAML)
# so it has shell tooling support: shellcheck, editor highlighting, LSP,
# clean diffs, and local runnability. The workflow's `run:` step is a
# one-line `bash` invocation of this file.
#
# DataOps pattern: https://github.com/github/gh-aw/blob/main/docs/src/content/docs/patterns/data-ops.md
# Invoked from: .github/workflows/fix-test-failures.md
#
# Required env:
#   GH_TOKEN   authenticated token for `gh api`
#   REPO       owner/name of the repository to inspect
#   OUTDIR     directory to write *.json into (e.g. /tmp/gh-aw/agent)
# Optional env:
#   PACKAGE       package/service to scope to (from workflow_dispatch input)
#   TRACKING_ISSUE  known-failures tracking issue number (default 37864)
#   MAX_COMMITS   how many recent commits to scan for check runs (default 5)
#
# Outputs (under $OUTDIR):
#   meta.json            commit inspected + counts + scope
#   failures.json        array of failing CI check runs with annotations
#   known-failures.json  parsed #37864 island entries with linked-issue state
#   known-failures.md    raw body of the tracking issue (for the agent)
set -uo pipefail

: "${GH_TOKEN:?GH_TOKEN is required (every \`gh api\` call needs an authenticated token)}"
: "${REPO:?REPO is required}"
: "${OUTDIR:?OUTDIR is required}"
PACKAGE="${PACKAGE:-}"
TRACKING_ISSUE="${TRACKING_ISSUE:-37864}"
MAX_COMMITS="${MAX_COMMITS:-5}"
ISLAND_ID="fix-test-failures"

mkdir -p "$OUTDIR"

api() { gh api -H "Accept: application/vnd.github+json" "$@"; }

# Lower-case helper for case-insensitive substring scoping.
lc() { printf '%s' "$1" | tr '[:upper:]' '[:lower:]'; }

# Preflight: fail loudly instead of silently emitting empty JSON. The files
# written below are the agent's authoritative source of truth, so a missing
# tool or an invalid/expired token must NOT be mistaken for "CI is green".
# (Many `gh api` calls below redirect errors to /dev/null for per-item
# resilience, which is exactly why this up-front check matters.)
for _bin in gh jq; do
  command -v "$_bin" >/dev/null 2>&1 \
    || { echo "ERROR: required tool '$_bin' is not on PATH." >&2; exit 1; }
done
if [ "$(api "/repos/$REPO" --jq '.full_name' 2>/dev/null || true)" != "$REPO" ]; then
  echo "ERROR: GitHub API preflight failed for '$REPO'. Is GH_TOKEN set, valid, and authorized?" >&2
  exit 1
fi

# ---------------------------------------------------------------------------
# Step 1: find the most recent commit on main that has check runs, and pull
# every failing CI check run for it. CI check-run names look like
# "js - <service> (Build UnitTest ...)". Live-test and perf pipelines
# (names containing " - tests", " - tests-weekly", " - perf") are excluded.
# ---------------------------------------------------------------------------
commit=""
checked_commits=0
total_check_runs=0
raw_runs="$OUTDIR/.check_runs.json"
: > "$raw_runs"

mapfile -t recent_shas < <(api "/repos/$REPO/commits?sha=main&per_page=$MAX_COMMITS" \
  --jq '.[].sha' 2>/dev/null)

for sha in "${recent_shas[@]}"; do
  checked_commits=$((checked_commits + 1))
  runs=$(api --paginate "/repos/$REPO/commits/$sha/check-runs?per_page=100" \
    --jq '.check_runs[]' 2>/dev/null | jq -s '.')
  count=$(printf '%s' "$runs" | jq 'length' 2>/dev/null || echo 0)
  if [ "${count:-0}" -gt 0 ]; then
    commit="$sha"
    total_check_runs="$count"
    printf '%s' "$runs" > "$raw_runs"
    break
  fi
done

if [ -z "$commit" ]; then
  echo "No check runs found on the last $MAX_COMMITS commit(s) of main."
  echo '[]' > "$OUTDIR/failures.json"
else
  echo "Inspecting commit $commit ($total_check_runs check runs)."
  # Failing CI check runs only (exclude live-test / perf pipelines).
  jq '[ .[]
        | select(.conclusion == "failure")
        | select(.name | test(" - tests-weekly| - tests| - perf") | not)
        | select(.name | startswith("js - "))
        | { id, name, html_url,
            details_url: (.details_url // null),
            output_title:   (.output.title   // null),
            output_summary: (.output.summary // null) } ]' \
    "$raw_runs" > "$OUTDIR/.failing_ci.json"

  # Optional scoping to a single package/service from the dispatch input.
  if [ -n "$PACKAGE" ]; then
    needle="$(lc "$PACKAGE")"; needle="${needle##*/}"
    jq --arg n "$needle" \
      '[ .[] | select((.name | ascii_downcase) | contains($n)) ]' \
      "$OUTDIR/.failing_ci.json" > "$OUTDIR/.failing_ci.scoped.json"
    mv "$OUTDIR/.failing_ci.scoped.json" "$OUTDIR/.failing_ci.json"
  fi

  fail_count=$(jq 'length' "$OUTDIR/.failing_ci.json")
  echo "Found $fail_count failing CI check run(s)."

  # For each failing check run, fetch annotations (capped) + the full
  # output.text, then assemble one compact record. All API work happens
  # here so the agent never paginates or polls a rate limit.
  echo '[]' > "$OUTDIR/failures.json"
  while IFS= read -r id; do
    [ -z "$id" ] && continue
    base=$(jq --argjson id "$id" '.[] | select(.id == $id)' "$OUTDIR/.failing_ci.json")
    annotations=$(api "/repos/$REPO/check-runs/$id/annotations" 2>/dev/null \
      | jq '[ .[] | { path, start_line, end_line, annotation_level,
                       title, message: (.message | .[0:1200]) } ] | .[0:25]' \
      2>/dev/null)
    [ -z "$annotations" ] && annotations='[]'
    output_text=$(api "/repos/$REPO/check-runs/$id" \
      --jq '.output.text // ""' 2>/dev/null | head -c 4000)
    record=$(jq -n --argjson base "$base" --argjson ann "$annotations" \
      --arg text "$output_text" \
      '$base + { annotations: $ann, output_text: $text }')
    jq --argjson rec "$record" '. + [ $rec ]' \
      "$OUTDIR/failures.json" > "$OUTDIR/.failures.tmp" \
      && mv "$OUTDIR/.failures.tmp" "$OUTDIR/failures.json"
  done < <(jq -r '.[].id' "$OUTDIR/.failing_ci.json")
fi

failing_ci_count=$(jq 'length' "$OUTDIR/failures.json")

# ---------------------------------------------------------------------------
# Step 2: pull the known-failures tracking issue (#37864), parse the island,
# and resolve each linked issue's open/closed state — so the agent can drop
# closed entries without making any API calls.
# ---------------------------------------------------------------------------
body=$(api "/repos/$REPO/issues/$TRACKING_ISSUE" --jq '.body // ""' 2>/dev/null)
printf '%s' "$body" > "$OUTDIR/known-failures.md"
# GitHub issue bodies use CRLF; normalize so marker/entry parsing is clean.
body=$(printf '%s' "$body" | tr -d '\r')

start_marker="<!-- gh-aw-island-start:$ISLAND_ID -->"
end_marker="<!-- gh-aw-island-end:$ISLAND_ID -->"
island_present=false
if printf '%s' "$body" | grep -qF "$start_marker"; then
  island_present=true
fi

# Extract issue numbers referenced on island lines ("- #NNN — ...").
island_lines=$(printf '%s\n' "$body" \
  | awk -v s="$start_marker" -v e="$end_marker" \
      'index($0,s){f=1;next} index($0,e){f=0} f' \
  | grep -E '^- #[0-9]+' || true)

echo '[]' > "$OUTDIR/known-failures.json"
while IFS= read -r line; do
  [ -z "$line" ] && continue
  num=$(printf '%s' "$line" | grep -oE '#[0-9]+' | head -1 | tr -d '#')
  [ -z "$num" ] && continue
  state=$(api "/repos/$REPO/issues/$num" --jq '.state // "unknown"' 2>/dev/null)
  [ -z "$state" ] && state="unknown"
  entry=$(jq -n --argjson n "$num" --arg s "$state" --arg raw "$line" \
    '{issue_number:$n, state:$s, raw_line:$raw}')
  jq --argjson e "$entry" '. + [ $e ]' \
    "$OUTDIR/known-failures.json" > "$OUTDIR/.known.tmp" \
    && mv "$OUTDIR/.known.tmp" "$OUTDIR/known-failures.json"
done < <(printf '%s\n' "$island_lines")

known_count=$(jq 'length' "$OUTDIR/known-failures.json")
open_known=$(jq '[ .[] | select(.state == "open") ] | length' "$OUTDIR/known-failures.json")

# ---------------------------------------------------------------------------
# meta.json: everything the agent needs to orient itself in one small file.
# ---------------------------------------------------------------------------
jq -n \
  --arg commit "$commit" \
  --arg repo "$REPO" \
  --arg package "$PACKAGE" \
  --argjson tracking "$TRACKING_ISSUE" \
  --argjson checked "$checked_commits" \
  --argjson total "$total_check_runs" \
  --argjson failing "$failing_ci_count" \
  --argjson known "$known_count" \
  --argjson open_known "$open_known" \
  --argjson island_present "$island_present" \
  '{
     repository: $repo,
     commit: (if $commit == "" then null else $commit end),
     commit_url: (if $commit == "" then null else "https://github.com/\($repo)/commit/\($commit)" end),
     package_scope: (if $package == "" then null else $package end),
     tracking_issue: $tracking,
     island_present: $island_present,
     commits_scanned: $checked,
     total_check_runs: $total,
     failing_ci_check_runs: $failing,
     known_failure_entries: $known,
     open_known_failures: $open_known
   }' > "$OUTDIR/meta.json"

# Clean up scratch files; leave only the agent-facing JSON/MD.
rm -f "$raw_runs" "$OUTDIR/.failing_ci.json" "$OUTDIR/.failures.tmp" "$OUTDIR/.known.tmp"

echo "DataOps complete -> $OUTDIR"
echo "  commit=$commit failing_ci=$failing_ci_count known=$known_count open_known=$open_known"
