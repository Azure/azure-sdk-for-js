# Implementation: Unified Sample-Tests Compiler

> **Status**: Implemented (KeyVault packages migrated)
> **Companion doc**: [Design](./sample-tests-unification.md)

This document covers the compiler internals and pipeline integration for the unified sample-tests system. For the authoring model and configuration, see the [design doc](./sample-tests-unification.md).

## 1. Compiler Internals

The compiler transforms test code into published code with two core mechanisms: **import-based removal** (classify imports → mark dead bindings → cascade removals) and **value substitution** (`forPublishing` replacement).

### 1.1 Import Classification

Every import falls into one of five categories, determined purely by path:

| Category | Which imports match | What happens |
|---|---|---|
| **Test** | `vitest`, `@azure-tools/test-recorder`, `@azure-tools/test-publishing`, `@azure-tools/test-utils`, `@azure-tools/test-utils-vitest`, `@azure-tools/test-credential` | Import gets removed. Every imported name becomes a dead binding. |
| **Source code** | Relative paths containing `/src/` (e.g., `"../src/index.js"`) | Rewritten to the package's main entrypoint (e.g., `"@azure/storage-blob"`). |
| **Local helper** | Any other relative path to a `.ts` file | Kept as-is in output. |
| **Data file** | Relative paths to `.json` files (with import assertions) | Kept in output. Converted to `require()` in JavaScript. |
| **External** | Everything else (`@azure/identity`, `dotenv`, `fs`, etc.) | Kept as-is. Leading comments are preserved through the AST rewrite. |

All five categories are determined by the import path alone. The compiler does not load or analyze imported files to decide classification.

This classification is the _only_ mechanism for identifying test infrastructure. The compiler never pattern-matches function names or method calls; removals only happen as a consequence of import classification and dead-binding elimination.

Type-only imports (`import type { X }`) from source code are preserved as `import type { X } from "@azure/package"` in the output. Per-specifier type modifiers (`import { type X, Y }`) are also preserved — `type X` stays type-only while `Y` follows normal liveness rules.

### 1.2 Dead-Binding Elimination

After test imports are removed, every name they introduced becomes a **dead binding**. The compiler walks the AST and removes statements that only reference dead bindings. When a removal creates new dead bindings, the process cascades until nothing more can be removed.

**Example cascade:**

1. `import { Recorder } from "@azure-tools/test-recorder"` → removed → `Recorder` is dead
2. `let recorder: Recorder` → removed → `recorder` is dead
3. `beforeEach(...)` → removed (references only `recorder`)
4. `import { assert } from "vitest"` → removed → `assert` is dead
5. `assert.isAbove(i, 1)` → removed

Note: `afterEach` hooks are ignored entirely by the compiler (they are not processed or included in output). `beforeEach` hooks are processed — surviving statements become preamble in `main()`.

This works per-binding, not per-file. If a helper exports both test stuff and real stuff, only the real stuff survives.

#### 1.2.1 AST Node Kinds Subject to Removal

These TypeScript AST node kinds are candidates for dead-binding elimination:

| Node kind | When it gets removed |
|---|---|
| `ImportDeclaration` | All imported bindings are dead |
| `VariableStatement` | All declared bindings are dead |
| `FunctionDeclaration` | The function name is a dead binding |
| `ClassDeclaration` | The class name is a dead binding |
| `TypeAliasDeclaration` | Always removed (type-only, never in output) |
| `InterfaceDeclaration` | Always removed (type-only, never in output) |
| `ExpressionStatement` | The expression is a call (or chain of calls/property accesses) where any binding at the root of the callee chain is dead |

When a dead binding shows up anywhere in a declaration's initializer, the whole declaration gets removed. If that same declaration also binds live values, the compiler throws an error instead of silently dropping them.

**Namespace imports from test packages** (`import * as test from "vitest"`) are handled the same way as named imports — the namespace binding becomes dead when the test import is removed. However, direct named imports are preferred since they make the dead-binding cascade more explicit.

### 1.3 Value Substitution (`forPublishing`)

`forPublishing()` comes from `@azure-tools/test-publishing`, a test package. Normally, removing that import would kill everything using `forPublishing`. The compiler avoids this by processing substitution _before_ import removal. The full pipeline:

1. Parse the source file and extract the `describe`/`it`/`beforeEach` structure.
2. Replace every `forPublishing(test, () => sample)` call with `sample` (grab the arrow body).
3. Print and re-parse to get a clean AST with substitutions applied.
4. Classify all imports (§1.1).
5. Collect dead bindings from test imports, then clean `describe`-level variables, `beforeEach` hooks, and `it` block bodies — cascading dead bindings through each scope (§1.2).
6. Rewrite imports: remove test imports, merge source-code imports into the package name, keep external/local/data imports. Leading comments on imports are preserved.
7. Generate named functions from `it` blocks (or inline into `main()` for single-`it` files). Generate `main()` with `beforeEach` survivors as preamble.
8. Assemble the output: copyright header, `@summary` JSDoc (with `@azsdk-*` tags), imports, module-level variables, functions, `main()`, error handler.
9. Extract `// @snippet` regions from the raw output (for compiled-output snippets).
10. Extract `process.env` references for `sample.env`.
11. Post-process: strip `@ts-preserve-whitespace` comments (convert to blank lines), strip `@snippet` / `@snippet-end` markers, collapse excessive blank lines.

Because substitution happens before import removal, the published-stage values survive even though their wrapper function gets removed.

#### 1.3.1 Substituted-Expression Validation

After substitution and dead-binding elimination, the compiler validates that every `forPublishing` published expression can still resolve its bindings. It runs `collectFreeVariables()` on each substituted expression (collecting only root-level identifiers, skipping property access names) and checks them against the dead binding set at two points: once after initial test-import removal, and again after cascaded elimination.

1. **Missing binding:** The symbol's declaration got removed as test infrastructure. → **Error**: `Symbol "X" in forPublishing expression is not available after cleanup (it was removed as test infrastructure)`

Silent rebinding detection (a same-named symbol exists at a broader scope after a local is removed) is not yet implemented. Currently the compiler only detects missing bindings.

### 1.4 Following the Import Graph

When a spec file imports a local helper (e.g. `import { createClient } from "./helpers.js"`), the compiler resolves and compiles it through the same dead-binding pipeline.

**How it works:**

1. The compiler classifies local helper imports (category `localHelper`) and calls the `resolveHelper` callback to read the source file.
2. `compileHelper()` runs the same classify → dead-binding → import-rewrite pipeline on the helper, using `treatTangledAsDead` mode so that functions referencing test bindings are eliminated instead of throwing.
3. Cycle detection prevents infinite recursion for circular imports (cycles are skipped).
4. If the helper is empty (all exports reference test infrastructure), its import bindings in the parent become dead and cascade normally.
5. If the helper has surviving exports, its compiled output goes into `CompiledSample.helperFiles` and is written alongside the sample in the staging directory.
6. Environment variables from helpers are aggregated into the main sample result.

### 1.5 Catching Mistakes

The compiler reports an error when test code and published code are tangled in a single expression.

**Dead binding inside a larger expression:**

```typescript
// ❌ ERROR: recorder is dead, but buried inside the new Client() call.
const client = new Client(url, cred, recorder.configureClientOptions({}));

// ✅ Fix: tell the compiler what to use in the published output.
const client = new Client(url, cred, forPublishing(recorder.configureClientOptions({}), () => ({})));
```

**Published-stage expression references a doomed binding:**

```typescript
const url = recorder.variable("url", process.env.URL); // removed (uses recorder)
const client = new Client(forPublishing(url, () => url));
```

After substitution: `new Client(url)`. But `url`'s declaration depends on `recorder` and will get removed. The compiler tells you: "Symbol `url` in sample expression depends on `recorder.variable(...)` which will be removed."

Fix it: use `forPublishing` on the declaration itself:

```typescript
const url = forPublishing(recorder.variable("url", process.env.URL), () => process.env.URL);
const client = new Client(url);
```

## 2. Pipeline Integration

### 2.1 Compilation

The compiler is invoked automatically by `dev-tool samples publish` when sample-test files are present under `test/public/samples/`. There is no separate `compile` command — compilation is part of the publish pipeline.

Here's the pipeline, step by step:

1. Scan and parse `test/public/**/*.spec.ts` files with `@summary`
2. Extract `it` blocks into named functions and follow the import graph to find helpers and data files
3. Strip test code (substitution → import removal → dead-binding cascade), generate `main()`, rewrite source paths (preserving import comments), add copyright header
4. Generate `sample.env` from `process.env.*` and `process.env["..."]` references
5. Extract `// @snippet` regions from the raw compiled text, then post-process: strip `@ts-preserve-whitespace` (→ blank lines), strip `@snippet` / `@snippet-end` markers, collapse blank lines
6. Convert TypeScript to JavaScript (JSON import assertions become `require()`, ESM `import` becomes CJS `require`, top-level `await` is wrapped or removed), generate README/package.json/tsconfig
7. Write to `samples/<version>/`

### 2.2 Generating `sample.env`

The compiler scans each compiled sample for `process.env.VARIABLE_NAME` and `process.env["VARIABLE_NAME"]` (including single-quoted bracket notation) references. After all files are compiled, the `compileSampleTests` module aggregates, deduplicates, and sorts the discovered variables, then writes a `sample.env` to the staging directory.

The generated file has a copyright header and one `VARIABLE_NAME=` line per discovered variable (sorted alphabetically, empty values). If a hand-written `sample.env` already exists at the package root, it is merged: hand-written values and comments are preserved, newly discovered variables are appended, and warnings are emitted for variables defined in the hand-written file but not referenced in any sample code.

The publish pipeline (`generation.ts`) prefers `sample.env` from the staging/source directory when available, falling back to the package root for packages that don't use sample-tests.

### 2.3 Snippet Integration

The `update-snippets` command extracts `// @snippet` regions directly from source test files (not compiled output). It reads `it` block bodies from sample-test files, performs import rewriting (replacing `"../src/index.js"` with the package name), and extracts `@snippet` regions. For each region:

1. Parse the source `.spec.ts` file
2. Extract `it` bodies with `@snippet` markers, rewrite source-code imports
3. Inject into README.md and TSDoc at `` ```ts snippet:<name> `` markers

Since extraction happens on source code, `forPublishing` wrappers are **not** automatically substituted — snippets show whatever code is between the markers. Place `@snippet` markers around the published-facing code for clean snippets.

Separately, in the `samples publish` pipeline, the compiler also extracts `@snippet` regions from compiled output (where substitutions have been applied). These compiler-extracted snippets are used when snippet names appear in compiled samples but not in the source `update-snippets` path.

Legacy `test/snippets.spec.ts` files keep working for pure doc snippets that aren't part of any sample. If the same snippet name shows up in both a sample-test region and a `snippets.spec.ts` file, the command reports an error.

### 2.4 Publish Integration

`dev-tool samples publish` automatically detects sample-test files under `test/public/samples/` and runs the compilation pipeline. When `samples-dev/` doesn't exist, sample-tests are used. The old `samples-dev/` workflow keeps working for unmigrated packages.
