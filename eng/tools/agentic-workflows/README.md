# Agentic Workflows upgrade checker

The `CheckAgenticWorkflows` job in `eng/pipelines/weekly_automation.yml` runs this
Node.js tool without an AI agent. It reads the gh-aw CLI pin from
`.github/workflows/copilot-setup-steps.yml`, compares semantic versions against
the latest `github/gh-aw` release, and files an upgrade issue only when the latest
version is strictly newer and no open issue has the same title.

Issues retain the `agentic-workflows`, `automated`, and `dependencies` labels and
request the **Agentic Workflows** custom agent. This tool only requests an
upgrade; it does not change pins or run the upgrade itself.

From the repository root:

```shell
pnpm install --filter @azure-tools/agentic-workflows-upgrade-check --frozen-lockfile
pnpm --filter @azure-tools/agentic-workflows-upgrade-check test
node eng/tools/agentic-workflows/check-upgrade.mjs --dry-run
```

Omit `--dry-run` to enable issue creation. Use `--repo owner/repo` to select an
issue repository other than `Azure/azure-sdk-for-js`. The script always reads
the pin from this checkout, regardless of the current working directory.

The GitHub CLI is not required. The script calls the GitHub REST API directly
using Node.js `fetch` and the `GH_TOKEN` supplied by the weekly pipeline's GitHub
login step. The token needs access to read gh-aw releases and repository issues,
and permission to create issues with the existing labels in the target
repository. Authentication, API, and malformed-pin errors fail the run rather
than being reported as successful no-ops.
