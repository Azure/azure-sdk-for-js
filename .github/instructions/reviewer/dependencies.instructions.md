---
applyTo: "sdk/**/package.json,pnpm-workspace.yaml"
description: "Azure SDK dependency review rules covering pnpm workspace protocol, catalog usage, and version range compliance."
---

# Dependency Review — Azure SDK Monorepo Conventions

**Scope:** `package.json`, `pnpm-workspace.yaml`, metadata. Skip source, tests, docs, consistent lock file churn.

## Workspace Protocol

This monorepo uses **pnpm** with workspace linking:

- **Dev tools & test utils**: `workspace:^` (e.g., `"@azure-tools/test-recorder": "workspace:^"`)
- **Published runtime `@azure/*` deps (stable)**: `workspace:^` **or** semver `^` ranges (e.g., `"@azure/core-rest-pipeline": "^1.19.0"`) — both are acceptable
  - At pack/publish time pnpm rewrites `workspace:^` to `^<local version>`
  - Versions aren't bumped until a package has source changes, so the local version normally matches the latest published version → `workspace:^` resolves to a published range and is safe
  - **When the dependency has unreleased source changes** (local version ahead of npm): release it together with/before the consumer, bump the consumer's version + `CHANGELOG.md` when it uses the new features, or use an explicit `^` range against the last published version
  - Only flag `workspace:^` on a runtime dep when its local version is ahead of npm **and** the dependency is not guaranteed to be published together with or before the consumer
  - **Beta exception:** a **beta** package depending on a **beta** `@azure/*` package must use an **exact pin** (e.g., `"1.0.0-beta.1"`), not `workspace:^` or a caret range (see [Beta Dependency Rules](#beta-dependency-rules))
  - **Peer dependencies:** this relaxed `workspace:^`/caret acceptance applies only to regular runtime `dependencies`; `devDependencies` continue to follow the existing rules (internal dev tools & test utils use `workspace:^`; other dev deps use `catalog:` or `^`), and `peerDependencies` are unaffected and must continue to use the `>=` compatibility-window range (see Version Range Conventions below)

## Catalog Usage (pnpm-workspace.yaml)

Use `catalog:` references when entry exists:

```jsonc
"typescript": "catalog:"
"vitest": "catalog:testing"
"@types/node": "catalog:"
```

**Default catalog (`catalog:`):** typescript, eslint, prettier, @types/node, rimraf
**Named catalogs (`catalogs:`):** `arm`, `internal`, `testing`

Hardcoded versions for cataloged deps are wrong:

```jsonc
// ❌ "typescript": "~5.7.2"
// ✅ "typescript": "catalog:"
```

## Version Range Conventions

| Type | Range |
|------|-------|
| Published **stable** runtime deps | `^` (caret); `workspace:^` only for internal `@azure/*` monorepo packages |
| **Beta** → **beta** `@azure/*` dep | exact pin (e.g., `1.0.0-beta.1`) — not `workspace:^`/caret |
| Peer deps | `>=` compatibility window |
| Dev deps | `catalog:` or `^` |
| Internal dev tools | `workspace:^` |

**Forbidden in package.json deps:** tilde `~`, star `*`, URL/git deps
**Exact pins:** forbidden for stable runtime deps (prevents deduplication); required for beta→beta deps

## Beta Dependency Rules

- **Stable package depending on beta:** ❌ Not allowed — flag and require stable dependency
- **Beta package depending on beta:** Must use exact pin (e.g., `"1.0.0-beta.1"`) to protect against breaking changes

## New Dependency Approval Gate

New third-party runtime `dependencies` in shipped libraries (`sdk-type` `client`/`mgmt`) must be first-party (`@azure*`, `@microsoft/*`, `@typespec/*`) or listed in `eng/approved-third-party-dependencies.yml` (`allowed`, or an `exceptions` entry naming the package). Enforced by the `@azure/azure-sdk/ts-package-json-approved-dependencies` ESLint rule. Flag any new runtime dep not covered there.

## Dev vs Runtime Boundary

- Test-only (`vitest`, `chai`, `playwright`, `nock`, `@vitest/coverage-istanbul`): `devDependencies`
- Type-only (`@types/*`): `devDependencies`
- Used in both source and tests: `dependencies`

## Dependency Removal Checks

- Verify no remaining imports in source/tests
- Check peer dep impact on downstream packages
- `@azure/core-*` removal is suspicious — flag unless all usage of that package's APIs also removed

## Circular Dependencies

Adding new `@azure/*` dep may create cycle — check if target (or its deps) already depends on current package

## Peer Dependency Consistency

New peer dep ranges must be compatible with existing declarations in sibling packages

## Engine Requirements

All SDK packages declare a minimum supported Node.js version in their `engines` field. A new dependency must not require a newer Node.js version than the package's declared minimum.

## Package.json Structure (new packages)

- `files`: `dist/`, types entry, `README.md`, `LICENSE`, `CHANGELOG.md`
- `sideEffects: false` (enables tree-shaking)
- `sdk-type`: `client` | `mgmt` | `perf-test` | `utility`
- Scripts: `build`, `clean`, `check-format`, `format`, `lint`, `lint:fix`, `pack`, `test`, `test:browser`, `test:node`
- No lifecycle hooks: `preinstall`, `prebuild`, `prepack` — build system runs steps explicitly

## Named Catalog Entries

New version conflicting with existing catalog entry → update catalog in `pnpm-workspace.yaml`, don't create duplicate versions
