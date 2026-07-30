---
on:
  workflow_dispatch:
  schedule:
    - cron: "weekly on monday"
description: Review documentation for inconsistencies with source code and create a PR with fixes
permissions:
  contents: read
  issues: read
  pull-requests: read
  copilot-requests: write
tools:
  github:
    # gh-proxy: pre-authenticated gh CLI, no Docker MCP server startup.
    mode: gh-proxy
    toolsets: [default]
  edit:
  bash: true
# DataOps: inventory the documentation set in a deterministic step (repo is
# checked out for this scheduled workflow) so the agent has the file list
# without an exploratory glob. The consistency reasoning itself stays with
# the agent — only the inventory is precomputed.
steps:
  - name: Prefetch documentation inventory (DataOps)
    env:
      OUTDIR: /tmp/gh-aw/agent
    run: |
      set -euo pipefail
      mkdir -p "$OUTDIR"
      if [ -d documentation ]; then
        find documentation -type f -name '*.md' -printf '%p\t%s\n' | sort > "$OUTDIR/docs_list.tsv"
        jq -Rn '[inputs | split("\t") | {path: .[0], bytes: (.[1] | tonumber)}]' \
          "$OUTDIR/docs_list.tsv" > "$OUTDIR/docs_manifest.json"
        rm -f "$OUTDIR/docs_list.tsv"
      else
        echo '[]' > "$OUTDIR/docs_manifest.json"
      fi
      printf '{"count":%s,"generated_at":"%s"}\n' \
        "$(jq 'length' "$OUTDIR/docs_manifest.json")" "$(date -u +%FT%TZ)" > "$OUTDIR/meta.json"
      echo "Documentation inventory:"; cat "$OUTDIR/docs_manifest.json"
safe-outputs:
  create-pull-request:
    title-prefix: "[docs] "
    labels: [documentation, automated]

---

# Documentation Consistency Check

Review all markdown files under the `documentation/` folder for inconsistencies
with the actual source code and other documentation in this repository.

## Analysis

Go through each file in the `documentation/` folder and check for:

1. **Incorrect code examples**: snippets that reference APIs, classes, methods, or
   options that no longer exist or have changed signature in the source code under `sdk/`.
2. **Outdated instructions**: build commands, test commands, or setup steps that
   no longer match the current tooling (e.g. referencing `npm` instead of `pnpm`,
   missing `turbo` flags, wrong script names in `package.json`).
3. **Broken internal links**: references to files, folders, or other docs that have
   been moved or deleted.
4. **Contradictions between documents**: two or more docs giving conflicting guidance
   on the same topic (e.g. different Node.js version requirements, different
   instructions for the same task).
5. **Stale references**: mentions of deprecated packages, old repository paths, or
   removed features.

## Process

1. Read every markdown file listed in the prefetched inventory at
   `/tmp/gh-aw/agent/docs_manifest.json` (each entry is `{path, bytes}`).
   This is the authoritative set of `documentation/` files to review — you
   don't need to glob for them.
2. For each claim or instruction, verify it against the current source code and
   repository structure using bash and the `gh` CLI (this workflow uses
   `mode: gh-proxy`).
3. Collect all inconsistencies found.
4. Fix the documentation files directly using the edit tools.
5. Create a pull request with all fixes, providing a clear summary of every change
   made and why.
