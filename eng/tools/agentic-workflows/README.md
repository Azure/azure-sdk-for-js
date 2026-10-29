# Agentic Workflows upgrade checker

The `CheckAgenticWorkflows` job in `eng/pipelines/weekly_automation.yml` runs this
Node.js tool without an AI agent. It reads the gh-aw CLI pin from
`.github/workflows/copilot-setup-steps.yml`, compares semantic versions against
the latest `github/gh-aw` release, and runs
`gh aw upgrade --create-pull-request` when the latest version is strictly newer.
An existing open upgrade PR or an issue with the same upgrade title prevents
duplicate work.

The upgrade runs in a temporary, shallow clone of the target repository's default
branch, leaving the pipeline checkout unchanged. The clone's CLI pin must still
match the detected version; otherwise the attempt fails for a later rerun or
manual investigation. A separate GitHub CLI configuration and extension directory
is used to install the exact target version. Automatic extension self-upgrades
are disabled so a release published mid-run cannot change the selected version.
The CLI updates templates, applies codemods, refreshes action/container pins, and
recompiles workflows. Its generated PR description includes the repository PR
template. No AI agent, automatic approval, force push, or auto-merge is used.

Because `gh aw upgrade` can report compilation failures as warnings, an external
pre-push hook requires a successful standalone compilation, the target setup pin
and compiler metadata in every workflow lock, and no uncommitted changes after
recompilation. The CLI cannot publish the upgrade unless this gate passes.
Temporary files and the isolated CLI installation are removed on completion.

If installation, upgrade, compilation, push, or PR creation fails, the tool logs
the failure and files a fallback issue. It checks for a PR again first in case
publication succeeded before the CLI reported an error. Fallback issues retain
the `agentic-workflows`, `automated`, and `dependencies` labels and include the
failure details, release link, and full manual-upgrade instructions.

The fallback issue links directly to the upstream upgrade instructions and requires the
agent to read them before editing, perform the full upgrade with the target CLI
version, recompile every workflow, and commit generated changes. Instruction-fetch
or compilation failures must be reported as blockers, not treated as a successful
pin-only upgrade. Select **Agentic Workflows** when assigning the issue to Copilot;
the checker does not assign an agent automatically.

From the repository root:

```shell
pnpm install --filter @azure-tools/agentic-workflows-upgrade-check --frozen-lockfile
pnpm --filter @azure-tools/agentic-workflows-upgrade-check test
node eng/tools/agentic-workflows/check-upgrade.mjs --dry-run
```

Omit `--dry-run` to enable upgrades, PR publication, and fallback issue creation.
Dry runs perform API reads only: they never install extensions, clone or modify
repositories, or create issues or PRs. Use `--repo owner/repo` to select a target
other than `Azure/azure-sdk-for-js`; the pin in this checkout must match that
repository's default branch.

Node.js, Git, and the GitHub CLI (`gh`) must be available; the weekly pipeline's
Ubuntu image provides these tools. Release discovery and issue fallback use
Node.js `fetch` and `GH_TOKEN` from the pipeline's GitHub login step. The token
needs access to read gh-aw releases and repository issues/PRs, plus **Contents:
write**, **Workflows: write**, **Pull requests: write**, and **Issues: write** in
the target repository. The GitHub App installation must grant these permissions;
the script cannot elevate its token. Git authentication and commit identity are
configured only in the temporary clone.

Logs include the pinned and target versions and the created/existing PR or issue
URL. Each discovery and upgrade step logs `[START]`, followed by `[SUCCESS]` or
`[FAILURE]` with failure details. Command output is retained, and failures identify
the failed command or named step. `[SKIP]` messages distinguish an existing issue
or PR, no eligible release, and dry runs from attempted upgrades. Finding an
existing issue means no upgrade was attempted and no new fallback issue was
created. The CLI's combined upgrade/publication step includes its commit, push,
and PR creation; the pre-push gate logs compilation and verification separately.
A handled upgrade failure ends successfully only after an issue is created;
authentication, discovery, malformed-pin, and fallback-issue API failures fail
the run instead of being reported as successful no-ops.
