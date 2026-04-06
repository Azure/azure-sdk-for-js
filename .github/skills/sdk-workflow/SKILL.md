---
name: sdk-workflow
description: '**UTILITY SKILL** — Must be consulted for SDK development workflow tasks. Routes agents to the correct tools and documentation for building, testing, linting, formatting, provisioning, deploying, and other package development tasks. WHEN: "build package", "run tests", "lint code", "format code", "run checks", "prepare samples", "publish samples", "apply customization", "run migrations", "bump version", "extract API", "update snippets", "check API compatibility", "manage test recordings", "provision test resources", "deploy test resources", "create test resources", "set up test environment", "authenticate to Azure", "login to Azure", "release package", "increment version", "troubleshoot CI", "fix CI failure", "CredScan", "credential scan", "push recordings", "asset sync", "update recordings".'
---

# SDK Development Workflow

This skill routes you to the correct tools and documentation for common SDK
development tasks. Read the referenced docs — don't guess at commands.

## Key Documentation

| What you need | Where to look |
| ------------- | ------------- |
| Dev workflows (build, test, lint, install deps, clean) | `CONTRIBUTING.md` § "Development Workflows" |
| Dev-tool CLI commands (checks, samples, API extraction, etc.) | `common/tools/dev-tool/README.md` |
| Writing and running tests | `documentation/Quickstart-on-how-to-write-tests.md` |
| Test recordings (record, playback, push) | `documentation/Quickstart-on-how-to-write-tests.md` § "Recording" |
| Provisioning test resources | `eng/common/TestResources/README.md` |
| Linting rules and troubleshooting | `documentation/linting.md` |
| Code generation from TypeSpec | `documentation/Generate-code-from-TypeSpec.md` |
| Customization after code generation | `documentation/modular-customization.md` |
| Build system (dual emit with warp) | `documentation/dual-emitting-using-warp.md` |
| Dependency management | `documentation/dependency-management.md` |
| Min/max dependency version testing | `eng/tools/dependency-testing/README.md` |
| Post-generation steps (changelog, samples, release prep) | `documentation/steps-after-generations.md` |
| Bundling for browser | `documentation/Bundling.md` |
| Resolving pnpm-lock.yaml merge conflicts | `documentation/resolve-pnpm-lock-merge-conflict.md` |
| Writing and running perf tests | `documentation/writing-performance-tests.md` |
| TypeSpec client generator CLI | `eng/common/tsp-client/README.md` |
| Code review agents (archie, scribe, sentinel, tester, dash, dexter) | `documentation/reviewer-agents.md` |
| Troubleshooting CI failures | `documentation/Troubleshoot-ci-failure.md` |
| Asset sync workflow (test recordings) | `sdk/test-utils/recorder/ASSET_SYNC_WORKFLOW.md` |
| CredScan suppression process | `documentation/credscan-process.md` |

## Important Notes

- **Prerequisites**: If `pnpm` or `node` are not available, download and install
  them before running any commands. Provisioning test resources requires PowerShell 7+
  (`pwsh`) and the Azure PowerShell module. If `pwsh` is not installed, install it
  from https://learn.microsoft.com/powershell/scripting/install/installing-powershell,
  then run `Install-Module -Name Az -Force -AllowClobber` to install the Az module.
  Always run `pnpm install` before building or running any dev-tool commands.
- **Azure DevOps npm feed (devfeed priming)**: Before running `pnpm install`
  (especially on a new machine or fresh checkout), or if `pnpm install` fails due to
  feed authentication, authenticate to the Azure Artifacts feed by running
  `npx artifacts-npm-credprovider` at the repo root. This is required because some
  devDependencies (e.g. the ESLint plugin) are published only to the internal Azure
  DevOps feed, not the public npm registry. See `CONTRIBUTING.md` §
  "Authenticating to the Azure DevOps npm feed" for details.
- **Building with turbo**: To build a package _and its dependencies_, use
  `pnpm turbo build --filter=<package-name>... --token 1` (note the trailing `...`).
  Running `npm run build` in a package directory will fail if dependencies aren't built.
- **Dev-tool**: Most package.json scripts delegate to `dev-tool` under the hood.
  Use `npx dev-tool <command> --help` for detailed options. Dev-tool does not need
  to be built — it runs via tsx after `pnpm install`.
- **Checks**: `npx dev-tool check` runs format, lint, build, test, and package.json
  validation. Use `--fix` to auto-repair, `--tag` to select check categories.
- **Pre-push checks**: All code changes must pass build, format, lint, and test
  checks locally before pushing — CI will fail otherwise. Run `npx dev-tool check`
  for format, lint, and package.json validation, then `npx dev-tool check --tag=local`
  for build and unit tests.
- **Versioning**: When there is a new change to `src/` after a release, the package
  version must be incremented. Use `npx dev-tool package increment-version` to bump
  the version in `package.json`, update tracked version constants, and add a new
  changelog entry.
- **Azure authentication**: You must be logged in to Azure when running tests live,
  recording, or provisioning test resources. Always authenticate using the interactive
  browser-based login flow (e.g. `Connect-AzAccount` or `az login`). Never use device
  code authentication.
- **Test resources**: When provisioning test resources with `New-TestResources.ps1`,
  use the TME tenant and its subscription `Azure SDK Test Resources - TME`
  (`4d042dc6-fe17-4698-a23f-ec6a8d1e98f4`). The script auto-selects this subscription
  when it detects a TME tenant, but you can also pass `-SubscriptionId` explicitly.
  After provisioning, write the output environment variables to a `.env` file in every
  library under the service folder. For example, for `sdk/keyvault`, write the `.env`
  file in `sdk/keyvault/keyvault-keys`, `sdk/keyvault/keyvault-certificates`, etc.
- **Test proxy**: `npx dev-tool run test:vitest` automatically manages the test proxy
  lifecycle. You do not need to start it manually.
- **Code review agents**: Available locally for reviewing changes before pushing.
  See `documentation/reviewer-agents.md` for details on each agent — **archie**
  (API design), **scribe** (documentation), **sentinel** (security), **tester**
  (test coverage), **dash** (performance), **dexter** (dependencies),
  **mgmt-review** (management SDKs).
