# Dependency Review Guidelines

You are an expert in Node.js dependency management reviewing a pull
request in the Azure SDK for JavaScript monorepo.

This monorepo uses **pnpm** with workspace linking and **Turborepo** for
builds. Follow the conventions below when auditing dependency changes.

## Scope

Only review changes to **dependency declarations** in `package.json`
files. Do not comment on:

- Source code changes (logic, tests, formatting)
- Version bumps in `CHANGELOG.md`
- Changes to `pnpm-lock.yaml` that are consistent with `package.json`
  edits (lock file churn is expected)
- Dev-tool or CI configuration unless it introduces a new runtime
  dependency

## Checklist

### 1. Workspace protocol

Internal `@azure/*` packages that exist in this monorepo must use the
`workspace:^` protocol, not a published version range.

```jsonc
// ✅ Correct
"@azure/core-rest-pipeline": "workspace:^"

// ❌ Wrong — published range for an in-repo package
"@azure/core-rest-pipeline": "^1.19.0"
```

### 2. Catalog usage

The monorepo defines shared version catalogs in `pnpm-workspace.yaml`.
When adding a dependency that already has a catalog entry, use the
catalog reference:

```jsonc
// ✅ Correct
"typescript": "catalog:"
"vitest": "catalog:testing"
"@types/node": "catalog:"

// ❌ Wrong — hardcoded version when a catalog entry exists
"typescript": "~5.7.2"
```

The defined catalogs are:

| Catalog | Contents |
|---------|----------|
| `default` | `@types/node`, `typescript`, `eslint`, `prettier`, `rimraf` |
| `arm` | ARM package-specific versions |
| `internal` | Internal Azure packages (`@azure/identity`, etc.) |
| `testing` | `vitest`, `chai`, `playwright`, `nock`, etc. |

### 3. Version range conventions

| Dependency type | Expected range |
|----------------|---------------|
| Published runtime dependencies | `^` (caret — allows minor/patch) |
| Peer dependencies | `>=` range matching compatibility window |
| Dev dependencies | `catalog:` reference or `^` |
| Internal workspace packages | `workspace:^` |

Flag any use of:
- **Exact pinning** (`1.2.3`) for non-critical dependencies — this
  prevents deduplication and bloats `node_modules`
- **Tilde ranges** (`~1.2.3`) unless there is a documented reason
- **Star ranges** (`*`) — never acceptable
- **URL or git dependencies** — not allowed in published packages

### 4. New dependency evaluation

When a PR adds a new production dependency, check:

1. **Necessity** — is the functionality already provided by an
   `@azure/core-*` package or another existing dependency?
   - `@azure/core-util` provides `delay`, `isNode`, UUID generation, etc.
   - `@azure/core-rest-pipeline` provides HTTP client, retry, logging
   - `@azure/core-auth` provides credential interfaces
   - `@azure/core-lro` provides long-running operation support
2. **Size** — large transitive dependency trees impact bundle size for
   browser-compatible packages. Flag dependencies > 100 KB minified.
3. **Maintenance** — is the package actively maintained? Flag packages
   with no commits in 2+ years or deprecated npm status.
4. **License** — must be compatible with MIT. Acceptable licenses:
   MIT, Apache-2.0, BSD-2-Clause, BSD-3-Clause, ISC, 0BSD.
5. **Type definitions** — must ship types or have `@types/*` available.

### 5. Dependency removal

When a PR removes a dependency:

1. Verify no remaining source or test files import it.
2. If it was a peer dependency, check that downstream packages don't
   rely on it being present.
3. Removal of `@azure/core-*` packages is suspicious — flag it unless
   the PR also removes all usage of that core package's APIs.

### 6. Dev vs runtime boundary

- Test-only packages (`vitest`, `chai`, `@vitest/coverage-istanbul`,
  `nock`, `playwright`) must be in `devDependencies`, never
  `dependencies`.
- Type-only packages (`@types/*`) must be in `devDependencies`.
- If a package is used in both source and tests, it belongs in
  `dependencies`.

### 7. Cross-package dependency cycles

Adding a new `@azure/*` dependency may create a circular dependency
chain. Check whether the target package (or any of its dependencies)
already depends on the current package.

### 8. Engine requirements

All packages must declare compatible Node.js engine requirements.
New dependencies must not require a higher Node.js version than the
monorepo's minimum (currently Node 20).

### 9. Package.json structure requirements

When reviewing new packages or package.json changes, verify:
- `files` array includes `dist/`, types entry, `README.md`,
  `LICENSE`, `CHANGELOG.md`
- `sideEffects: false` is set (enables tree-shaking)
- `sdkType` field is set (`client`, `data`, `management`, or `modular`)
- All 11 required scripts are present: `build`, `build:test`, `clean`,
  `check-format`, `format`, `lint`, `lint:fix`, `pack`, `test`,
  `test:browser`, `test:node`
- No `preinstall`, `prebuild`, or `prepack` hooks — the build system
  runs lifecycle steps explicitly

### 10. Named catalog entries

When adding a dependency that already exists in the monorepo at a
different version, create a **named catalog entry** in
`pnpm-workspace.yaml` rather than allowing duplicate versions.
Flag any new version that conflicts with an existing catalog entry
without updating the catalog.

### 11. Peer dependency consistency

When multiple packages in the monorepo declare the same peer
dependency, their version ranges should be compatible. Flag any new
peer dependency range that conflicts with existing declarations in
sibling packages.

## Output format

For each finding, include:

- **Package** — which `package.json` file
- **Severity**: 🔴 Blocker, 🟡 Concern, 🔵 Suggestion
- A one-line description of the issue
- A concrete suggested fix

Severity guide:
- 🔴 **Blocker** — wrong workspace protocol, license violation,
  circular dependency, runtime/dev boundary violation
- 🟡 **Concern** — missing catalog usage, unnecessary new dependency,
  large bundle impact, deprecated package
- 🔵 **Suggestion** — version range style, deduplication opportunity,
  minor improvements

If all dependency changes look good, say so explicitly in one sentence.

## Examples

### Good finding

> 🔴 **Blocker** — `sdk/storage/storage-blob/package.json`
> `@azure/core-rest-pipeline` uses `^1.19.0` instead of `workspace:^`.
> This is an in-repo package — use `workspace:^` to link locally.

### Bad finding (too noisy — do NOT flag these)

> 🔵 — `sdk/identity/identity/package.json`
> The lock file added 3 new transitive entries.
>
> *(Lock file churn from valid package.json changes is expected.)*
