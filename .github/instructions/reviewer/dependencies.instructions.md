---
applyTo: "sdk/**/package.json,pnpm-workspace.yaml"
description: "Azure SDK dependency review rules covering pnpm workspace protocol, catalog usage, and version range compliance."
---
# Dependency Review — Azure SDK Monorepo Conventions

**Scope:** `package.json`, `pnpm-workspace.yaml`, metadata. Skip source, tests, docs, consistent lock file churn.

## Workspace Protocol (Critical)
This monorepo uses **pnpm** with workspace linking:
- **Dev tools & test utils**: `workspace:^` (e.g., `"@azure-tools/test-recorder": "workspace:^"`)
- **Published runtime `@azure/*` deps**: semver `^` ranges (e.g., `"@azure/core-rest-pipeline": "^1.19.0"`)
  - pnpm resolves to local during dev; publishes real ranges
  - `workspace:^` on published runtime deps is wrong — locks to unpublished local version

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
| Published runtime deps | `^` (caret) |
| Peer deps | `>=` compatibility window |
| Dev deps | `catalog:` or `^` |
| Internal dev tools | `workspace:^` |

**Forbidden in package.json deps:** tilde `~`, star `*`, URL/git deps
**Exact pins:** forbidden for stable runtime deps (prevents deduplication); required for beta→beta deps

## Beta Dependency Rules
- **Stable package depending on beta:** ❌ Not allowed — flag and require stable dependency
- **Beta package depending on beta:** Must use exact pin (e.g., `"1.0.0-beta.1"`) to protect against breaking changes

## New Dependency Evaluation
1. **Necessity**: Already in `@azure/core-*`?
   - `core-util`: `delay`, `isNode`, `randomUUID`
   - `core-rest-pipeline`: HTTP client, retry, logging
   - `core-auth`: credential interfaces
   - `core-lro`: long-running operations
2. **Size**: <100KB minified preferred for browser-compatible packages
3. **Maintenance**: Active commits in last 2 years, not deprecated on npm
4. **License**: MIT-compatible (MIT, Apache-2.0, BSD-2-Clause, BSD-3-Clause, ISC, 0BSD)
5. **Types**: Ships types or has `@types/*` available

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
All packages support Node 20 minimum — new deps must not require Node >20

## Package.json Structure (new packages)
- `files`: `dist/`, types entry, `README.md`, `LICENSE`, `CHANGELOG.md`
- `sideEffects: false` (enables tree-shaking)
- `sdk-type`: `client` | `mgmt` | `perf-test` | `utility`
- Scripts: `build`, `clean`, `check-format`, `format`, `lint`, `lint:fix`, `pack`, `test`, `test:browser`, `test:node`
- No lifecycle hooks: `preinstall`, `prebuild`, `prepack` — build system runs steps explicitly

## Named Catalog Entries
New version conflicting with existing catalog entry → update catalog in `pnpm-workspace.yaml`, don't create duplicate versions
