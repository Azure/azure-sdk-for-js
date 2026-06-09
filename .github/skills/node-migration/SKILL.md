---
name: "node-migration"
description: "Migrate Azure/azure-sdk-for-js to a user-specified minimum Node.js version while preserving any existing references above the target."
---

# Azure SDK Node Migration

Migrate the Azure SDK for JavaScript (`Azure/azure-sdk-for-js`) to a user-specified minimum Node.js version.

## When to Use

Use this skill when the user asks to upgrade, migrate, or raise the repo-wide Node.js minimum or supported version for `Azure/azure-sdk-for-js`.

## Examples

- "Migrate azure-sdk-for-js to Node 24"
- "Upgrade the repo from Node 22 to Node 24"
- "Raise the minimum Node version to 26"

## Required Input

The user must provide a target Node.js version.

- Treat the target as a major version unless the user explicitly provides full semver.
- If the target is missing or ambiguous, ask for it before editing.
- If the target does not look like an active or plausible Node major version, ask for confirmation.

Define these values before editing:

| Name | Meaning |
| --- | --- |
| `TARGET_MAJOR` | User-requested target major, for example `22` or `24`. |
| `TARGET_SEMVER_MIN` | Minimum engine form matching nearby style, usually `>=${TARGET_MAJOR}` or `>=${TARGET_MAJOR}.0.0`. |
| `OLD_SUPPORTED_MAJORS` | Node majors below `TARGET_MAJOR` that appear in Node-runtime contexts. |
| `HIGHER_MAJORS` | Node majors above `TARGET_MAJOR` that appear in Node-runtime contexts and must be preserved. |

## Core Rules

- Raise Node.js runtime and minimum-version references below `TARGET_MAJOR` to `TARGET_MAJOR`.
- Preserve Node.js version references above `TARGET_MAJOR`. For example, when target is 22, preserve 24; when target is 24, preserve 26.
- Do not blindly replace every occurrence of the old number.
- Only change references that are clearly Node.js runtime, Node engine, Node typing, CI setup, Docker default, documentation, lock/generated artifact, or related test expectation references.
- Do not change unrelated API versions, service versions, years, port numbers, sample data, or dependency versions where the number is not clearly a Node.js version.

For future migrations, do both passes: broad mechanical sweep first, then a missed-reference sweep.

## Steps

1. **Verify repo** — Confirm the current repository is `Azure/azure-sdk-for-js`. If not, stop and tell the user this skill expects that repo.
2. **Discover current Node references** — Use the Search Checklist to find Node runtime, engine, CI, Docker, docs, lockfile, and generated expectation references.
3. **Classify findings** — Separate findings into JSON engine/dependency changes, CI/YAML changes, code/test expectation changes, docs changes, and generated lock/artifact changes.
4. **Identify preserved versions** — Record Node majors above `TARGET_MAJOR` and keep them unchanged unless the user explicitly says otherwise.
5. **Edit targeted files** — Apply the Core Rules to each finding. Prefer surgical changes and match nearby formatting.
6. **Handle special cases** — Use the Special Cases section only when the Core Rules do not fully resolve a finding.
7. **Regenerate generated artifacts** — Use repo tooling for lockfiles and generated package artifacts when applicable.
8. **Validate** — Run focused checks for changed tooling and a final leftover search.
9. **Report outcome** — Include the target version, changed categories, validation performed, and intentionally remaining old references with reasons.

## Search Checklist

Target areas to search:

| Area | Paths / Patterns |
| --- | --- |
| Package engines | `**/package.json` files containing `"node"` in `engines`. |
| Direct Node setup pins | `.nvmrc`, `.node-version`, `.github/workflows/**`, `eng/pipelines/**`, `rush.json`, `common/config/rush/**`. |
| Dev tooling | `common/tools/dev-tool/**`, `common/tools/eslint-plugin-azure-sdk/**`, `eng/tools/**`. |
| Docs and Docker | `documentation/**`, `README.md`, `sdk/**/Dockerfile`, `eng/**/Dockerfile`. |
| CI and build scripts | `**/.github/workflows/**`, `**/eng/pipelines/**`, `**/eng/scripts/**`. |
| Textual leftovers | For each old major `X`: `Node.js X`, `Node X`, `node-version: "X"`, `node-version: X`, `NODE_VERSION=X`, `>=X`, `>=X.0.0`, `@types/node@X`, `@types/node": "X`, `@types/node": "^X`, and known LTS codenames if relevant. |

## Special Cases

- If an engine range has an upper bound, update the lower bound only when the resulting range remains valid. If `TARGET_MAJOR` conflicts with the upper bound, ask the user how to handle it.
- Update `@types/node` only when it represents the repo's supported Node typings for tooling or packages. Do not downgrade higher-major typings.
- In CI matrices or dev-tool defaults, remove or raise entries below `TARGET_MAJOR`, but preserve entries above `TARGET_MAJOR`.
- For `.nvmrc` or `.node-version`, prefer the repo's existing convention. If the correct LTS codename is uncertain, use the numeric target major rather than guessing.
- Avoid manual lockfile edits when repo tooling can regenerate them correctly.

## Validation

Use repo-defined commands only. Inspect `package.json`, `rush.json`, and repo docs before choosing commands.

Recommended validation:

1. Run the repo install/update command needed to regenerate lock artifacts.
2. Run formatting only if existing scripts require it for changed files.
3. Run focused checks for touched tooling packages, especially dev-tool and eslint-plugin-azure-sdk if those files changed.
4. Run a final leftover search for every old Node major below `TARGET_MAJOR`.
5. Search for Node versions above `TARGET_MAJOR` and confirm they were not downgraded.

## Final Leftover Classification

For every remaining old-major hit, classify it as one of:

| Classification | Meaning |
| --- | --- |
| Changed | The reference was updated to `TARGET_MAJOR`. |
| Intentionally preserved: not Node | The number is not a Node.js runtime/minimum reference. |
| Intentionally preserved: above target | The version is above `TARGET_MAJOR` and must remain unchanged. |
| Needs user decision | The reference is ambiguous or the target conflicts with an upper bound. |

## Troubleshooting

- If there are many false positives from textual search, narrow to Node-specific contexts before editing.
- If generated files or lockfiles churn unexpectedly, rerun the repo's documented install/update workflow rather than hand-editing generated output.
- If a package engine range has an upper bound lower than `TARGET_MAJOR`, stop and ask the user whether to raise the upper bound, skip that package, or handle it separately.
- If `.nvmrc` uses an LTS codename and the correct codename is uncertain, prefer the numeric target major instead of guessing.
