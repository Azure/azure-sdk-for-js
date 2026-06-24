---
on:
  workflow_dispatch:
  schedule:
    - cron: "weekly on monday"
description: Review documentation for inconsistencies with source code and create a PR with fixes
max-runs: 20
permissions:
  contents: read
  issues: read
  pull-requests: read
tools:
  github:
    toolsets: [default]
  edit:
  bash: true
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

1. List the markdown files in `documentation/` and pick at most **8 files** to
   review in this run (prioritize the largest or most frequently referenced docs).
   Do not attempt to review every file in a single run.
2. Do all of the analysis yourself in the main agent. **Do not spawn background,
   general-purpose, or sub-agents** — they multiply token usage and exhaust the
   run's effective-token budget.
3. Verify claims with **targeted** lookups: use `grep`/`rg` for specific symbols,
   commands, or paths rather than reading entire files or the whole `sdk/` tree.
   Read a source file only when a targeted search is inconclusive.
4. Fix the documentation files you reviewed directly using the edit tools.
5. Create a single pull request with the fixes from this run, providing a clear
   summary of every change made and why.
