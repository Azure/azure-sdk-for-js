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

| Type                   | Range                     |
| ---------------------- | ------------------------- |
| Published runtime deps | `^` (caret)               |
| Peer deps              | `>=` compatibility window |
| Dev deps               | `catalog:` or `^`         |
| Internal dev tools     | `workspace:^`             |

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

### Production `src/**` may only use declared runtime dependencies
- Any package whose **values** are imported (or otherwise loaded) from `src/**` must be a
  regular `dependency` — **not** a `devDependency`. A `devDependency` is absent for consumers,
  so the import resolves in the monorepo/tests but fails (often silently) once published.
  Enforced by `import-x/no-extraneous-dependencies` (`devDependencies: false`) in the shared
  eslint config.
- **Type-only** references (`import type`, `typeof import("pkg")`) are *not* lint-enforced
  (they are erased at runtime, so a dev-only type import is not a runtime failure). Still
  prefer sourcing shared types from their canonical home (e.g. `TokenCredential` from
  `@azure/core-auth`, `AbortSignalLike` from `@azure/core-util`) and declaring the package as
  a runtime dependency when the type is part of your public API.
- **Do not load modules dynamically to dodge this.** `createRequire(...)`, aliasing the
  global `require` (`const r = require; r("pkg")`), or non-literal `import(expr)` hide the
  dependency from the module graph, bundlers, api-extractor, and dependency linting — which
  is exactly how an undeclared/dev-only runtime dependency slips through. Import statically
  and declare the dependency. (Enforced for `createRequire`/`require`-aliasing by the
  `no-restricted-syntax` block in the shared eslint config; see `documentation/linting.md`.)
- **Tracing:** use `@azure/core-tracing` (`createTracingClient`), which is already a runtime
  dependency of tracing-enabled packages. Do **not** import/require `@opentelemetry/api`
  directly for spans or context propagation.
- **Avoid optional runtime dependencies.** Prefer routing the need through an `@azure/core-*`
  abstraction. A genuinely optional runtime load is an advanced exception (e.g. platform
  shims in `monitor-opentelemetry`) — it must use the justified `eslint-disable` escape hatch
  **and** emit an `@azure/logger` diagnostic on load failure (never a bare `catch {}`), so the
  degraded behavior is observable instead of silent. Do **not** introduce `peerDependencies`
  in client libraries to model this.

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
