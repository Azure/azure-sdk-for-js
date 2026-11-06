# Agentic Workflows upgrade checker

Runs in the weekly pipeline's `CheckAgenticWorkflows` job without an AI agent.
Compares the gh-aw pin in `.github/workflows/copilot-setup-steps.yml` with the
latest release, skips existing upgrade PRs or matching issues, and runs
`gh aw upgrade --create-pull-request` in an isolated checkout. Publication requires
successful, stable recompilation with the target version. Failures produce a
fallback issue with details and upgrade instructions; select **Agentic Workflows**
if assigning it to Copilot. No force push or auto-merge is used.

Requires Node.js, pnpm, Git, `gh`, and `GH_TOKEN` with repository contents,
workflows, pull requests, and issues write permissions. GitHub API calls use
`gh api`.

## Usage

From the repository root:

```shell
pnpm install --filter @azure-tools/agentic-workflows-upgrade-check --frozen-lockfile
pnpm --filter @azure-tools/agentic-workflows-upgrade-check test
node eng/tools/agentic-workflows/check-upgrade.mjs --dry-run
```

Omit `--dry-run` to enable upgrades and PR/issue creation; dry runs only read
GitHub data. `--repo owner/repo` overrides the default `Azure/azure-sdk-for-js`;
the local pin must match the target's default branch.

Logs show step outcomes, skip reasons, from/to versions, and PR/issue URLs.
