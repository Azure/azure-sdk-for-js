---
on:
  workflow_dispatch:
  schedule:
    - cron: "weekly on monday"
description: Detect a new gh-aw release and file an issue requesting the agentic-workflows upgrade
permissions:
  contents: read
  issues: read
  pull-requests: read
  copilot-requests: write
tools:
  github:
    toolsets: [default]
  bash: true
safe-outputs:
  create-issue:
    title-prefix: "[agentic-workflows] "
    labels: [agentic-workflows, automated, dependencies]
    deduplicate-by-title: true
  noop:
    report-as-issue: false
network:
  allowed:
    - defaults
    - github
---

# Upgrade Agentic Workflows

Check whether a newer released version of `gh-aw` is available and, if so, file
an issue asking the **Agent Workflows** agent to perform the upgrade.

1. Read the currently pinned `gh-aw` version from
   `.github/workflows/copilot-setup-steps.yml` (the `setup-cli` action ref and
   the `with.version` value).
2. Get the latest released version:
   `gh api repos/github/gh-aw/releases/latest --jq '.tag_name'`.
3. Compare the two as **semantic versions**. Only proceed if the latest release
   is strictly greater than the pinned version. If they are equal, or the pin is
   already newer (e.g. a prerelease or a rolled-back latest), call `noop` with a
   short message and stop without creating an issue.
4. Otherwise, before filing, check for an existing open issue requesting the
   same upgrade and, if one exists, call `noop` and stop.
5. Open one issue titled `Upgrade gh-aw from v<old> to v<new>` that states the
   current and latest versions, links to the release, and asks the Agent
   Workflows agent to upgrade this repository to the latest `gh-aw` version. The
   agent already knows how to run the upgrade, so keep the issue brief.
