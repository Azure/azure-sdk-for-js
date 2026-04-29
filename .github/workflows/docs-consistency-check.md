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

1. Read every markdown file in `documentation/`.
2. For each claim or instruction, verify it against the current source code and
   repository structure using bash and the GitHub tools.
3. Collect all inconsistencies found.
4. Fix the documentation files directly using the edit tools.

## Recent PR Impact Analysis

After completing the documentation consistency checks above, analyze recent PRs
to identify changes that may require documentation updates:

1. **List merged PRs**: Use the GitHub tools to list all PRs merged into `main`
   in the last 7 days.
2. **Identify documentation-impacting changes**: For each merged PR, examine the
   changed files and look for:
   - New or renamed public APIs, classes, methods, or options under `sdk/`
   - Breaking changes (removed exports, changed signatures, renamed packages)
   - New packages or features that should be documented
   - Changes to build tooling, test infrastructure, or developer workflows
   - Dependency updates that affect usage instructions
3. **Cross-reference with package READMEs**: For each impacted package, read its
   `README.md` (at `sdk/<service>/<package>/README.md`) and check whether:
   - New features from the PR are mentioned or demonstrated
   - Breaking changes are noted with migration guidance
   - Code examples still match the current API surface
   - Installation or setup instructions are still accurate
4. **Suggest README updates**: For each package README that needs changes, fix it
   directly using the edit tools. Include a clear explanation of what PR motivated
   the change.

## Output

1. Create a pull request with all fixes (both documentation folder fixes and
   package README updates), providing a clear summary of every change made and why.
