# @microsoft/warp

Multi-format TypeScript build tool for the Azure SDK. Takes one source tree, compiles it to multiple output formats (ESM, CJS, browser, whatever) and wires up your `package.json` exports — all from a single config.

Requires **Node.js ≥ 20.0.0**.

## Install

Already wired up as a workspace dependency — no separate install needed.

## Quick start

1. Add a `warp.config.yml` to your package root (or stick a `"warp"` key in `package.json`).
2. Run `warp build`.
3. That's it. Your `package.json` `"exports"` field gets updated automatically.

## CLI

```
warp <command> [options]
```

### Commands

| Command | What it does |
| ------- | ------------ |
| `build` | Compile all targets defined in your config |
| `watch` | Build then watch for source changes and rebuild |
| `init`  | Scaffold a new `warp.config.yml` by detecting existing tsconfigs |
| `help`  | Print usage info |

### Options

| Flag | Description |
| ---- | ----------- |
| `--config <path>` | Path to a warp config file (resolved relative to cwd) |
| `--dry-run` | Validate config and show an exports diff — nothing gets compiled or written |
| `--no-clean` | Skip wiping `outDir`s before compilation |
| `--parallel` | Compile independent targets in parallel using worker threads (off by default) |
| `--target <name>` | Only build targets matching the given name(s). Repeatable: `--target esm --target cjs` |
| `--stats` | Compute and display a size and API surface report after building |
| `--json` | Output machine-readable JSON (implies `--quiet`). Useful for CI integrations |
| `--verbose` | Print debug-level detail (cache hits, file lists) |
| `--quiet` | Suppress all output except errors |
| `--help` | Show help |

## Configuration

Warp looks for config in this order:

1. `warp.config.yml` (or `.yaml`)
2. `warp.config.json`
3. `"warp"` key in `package.json`

If multiple config sources exist, precedence follows the order above (you'll get a warning when a file-based config overrides the `package.json` key).

Config lookup only checks the package root directory — it does **not** walk up the directory tree.

### Example `warp.config.yml`

```yaml
exports:
  ".": "./src/index.ts"
  "./models": "./src/models/index.ts"

targets:
  - name: import
    tsconfig: tsconfig.esm.json

  - name: require
    tsconfig: tsconfig.cjs.json
    moduleType: commonjs

  - name: browser
    tsconfig: tsconfig.browser.json
    polyfillSuffix: true
```

### Config reference

#### `exports`

Map of subpath patterns → source file paths. Keys are Node.js subpath export keys (like `"."`, `"./models"`). Values are source `.ts` paths or literal pass-throughs (`"./package.json"`).

**Validation rules:**

- Keys must be `"."` or start with `"./"`.
- Trailing-slash keys (e.g. `"./foo/"`) are rejected — they are deprecated in Node.js. Use subpath patterns instead.
- Wildcard/glob patterns (e.g. `"./*"`) are rejected. Warp requires each export to map to a single source file; list entries explicitly.
- Duplicate keys are rejected.
- Empty keys are rejected.

#### `targets`

Ordered array of build targets. Declaration order controls the condition key order in the generated `package.json` exports.

| Field | Type | Required | Description |
| ----- | ---- | -------- | ----------- |
| `name` | `string` | ✅ | Identifier used in logs, size reports, and dedup. Must be unique across targets |
| `condition` | `string` | — | Node.js exports condition (`import`, `require`, `browser`, `react-native`, anything). Defaults to `name`. Must be unique across targets |
| `tsconfig` | `string` | ✅ | Path to the target's tsconfig. Must set `outDir`; should set `rootDir`. Must point to an existing file |
| `polyfillSuffix` | `string \| true \| false` | — | Per-target file substitution suffix (see below). Set to `true` to use `-<name>`, or a custom string. Omit or set to `false` to disable |
| `moduleType` | `"module"` \| `"commonjs"` | — | Module type for the `outDir` package.json shim. Auto-inferred from tsconfig if omitted (`ts.ModuleKind.CommonJS` → `"commonjs"`, everything else → `"module"`) |

**Validation rules:**

- `name` and `tsconfig` are required non-empty strings.
- Duplicate target names are rejected.
- Duplicate target conditions are rejected.
- Overlapping `outDir`s across targets are rejected (each target must write to a distinct directory).
- `targets` must be a non-empty array.

#### External tsconfigs

When a tsconfig lives outside the package root (e.g. a shared repo-root config using `${configDir}`), Warp creates a virtual config that extends the real file. This ensures `${configDir}` resolves to the package root, which is what shared configs typically expect.

## Features

### Multi-target compilation

Define as many targets as you want (ESM, CJS, browser, React Native, …). Each gets its own tsconfig and output directory. Warp compiles them all and stitches the results into a single `package.json` `"exports"` map with proper `types` + `default` condition entries.

### Automatic `package.json` exports rewriting

After compilation, Warp rewrites the `"exports"` field in your `package.json` with the correct dist paths for every target/condition combo. Existing exports entries not managed by Warp are preserved.

A `{ "type": "module" }` or `{ "type": "commonjs" }` shim is also written into each target's `outDir` so Node resolves things correctly.

Writes to `package.json` are atomic (temp file + rename) to avoid corruption on crash.

### Polyfill substitution

Polyfill substitution is opt-in. Set `polyfillSuffix: true` on a target to enable it (uses `-<name>` as the suffix), or provide a custom string like `"-browser"`. When enabled, if you have `foo.ts` and `foo-browser.mts`, the browser target compiles `foo-browser.mts` but emits it as `foo.js`. The output filename stays the same — callers never know. Omit `polyfillSuffix` or set it to `false` to disable scanning.

- `.mts` polyfills are preferred over `.ts`
- Polyfills must be type-compatible with the originals (mismatches surface as compile errors, on purpose)
- Polyfill source files are filtered from rootNames so they don't produce extra `.mjs` output files
- Discovery is driven by the parsed tsconfig's file list, so it respects `include`/`exclude` patterns
- Targets with a configured `polyfillSuffix` but no actual polyfill files on disk are treated as no-polyfill targets for dedup purposes

### Target deduplication

Targets with identical compiler options, source files, and effective polyfill suffix are compiled once, then the output is copied. Saves real time when you have targets that only differ in `outDir`. The dedup signature includes a hash of the sorted file list to prevent incorrect dedup when targets have different `include`/`exclude` patterns.

### Source-group type checking

Targets sharing the same source files only get type-checked once. The first target in a source group runs full diagnostics; subsequent targets skip `getPreEmitDiagnostics` (~30 % faster per skipped target).

### Declaration sharing

When multiple targets differ only in module format (same source files), `.d.ts` files are emitted once and copied to the other targets' `outDir`s (~17 % faster).

### esbuild fast transpilation

For targets that skip type-checking (e.g. CommonJS re-emit of already-validated sources), Warp uses [esbuild](https://esbuild.github.io/) instead of `ts.transpileModule`. esbuild transpiles all files concurrently via `Promise.all`, making it ~30% faster than synchronous alternatives for large packages. If `esbuild` is not installed, Warp falls back to the TypeScript transpiler automatically.

### Parallel compilation

Pass `--parallel` to spin up worker threads (one per CPU, capped to the number of compilation groups). Each worker pre-loads TypeScript once (~300 ms), then stays alive to process multiple compile tasks via message passing. Independent source groups compile simultaneously; dependent groups respect the DAG ordering.

Sequential mode (the default) is typically faster for most packages because esbuild makes the transpile-only targets near-instant, eliminating work that would benefit from parallelism. Parallel mode can help when you have multiple targets that each require full type-checking with different compiler options.

The parallel orchestrator:

- Uses Kahn's algorithm for cycle detection — throws immediately if the task graph has cycles.
- Pre-discovers polyfills on the main thread and passes the map to workers to avoid redundant filesystem I/O.
- Handles `.d.ts` copying and dedup copying on the main thread (since they write to independent directories).
- If a worker crashes, the error includes the target name for context and suggests retrying without `--parallel`.

### Watch mode

`warp watch` runs an initial build, then monitors your source directories for `.ts`/`.mts`/`.cts` changes (ignoring `.d.ts` files). When a change is detected, Warp debounces events (300 ms default, configurable via the programmatic API) and rebuilds with `--no-clean` for speed, displaying the rebuild timing when done.

- The config file is also watched — editing it triggers a rebuild.
- Supports `--target` to only watch/rebuild specific targets.
- Rebuilds use the same error handling as `build` — `WarpError`s are caught and reported without crashing the watcher.
- Press `Ctrl+C` to stop (sends `SIGINT`).
- On Linux, where `fs.watch({ recursive: true })` only watches the top-level directory, Warp automatically expands to watch all subdirectories individually.

The programmatic `watch()` function returns an `AbortController` for stopping the watcher from code.

### Log levels and diagnostic buffering

- `--verbose` prints debug details like cache hits, polyfill discovery, and per-file events.
- `--quiet` suppresses everything except errors — useful in CI pipelines where you only care about pass/fail.
- Default (`info`) shows normal build output.

At levels below `verbose`, info and verbose messages are buffered instead of printed. On successful builds the buffer is discarded. On failure, `flush()` replays the full message buffer to stderr so you see the complete diagnostic trail without needing to re-run with `--verbose`.

### Shared source file cache

In sequential mode, parsed `ts.SourceFile` objects are cached across targets with the same `ScriptTarget`. Parse once, reuse everywhere. The cache is bounded (max 10,000 entries) with LRU eviction. In parallel mode, each worker maintains its own cache that persists across all tasks assigned to that worker.

### Target filtering

Use `--target <name>` to build only specific targets. Repeat the flag to select multiple: `warp build --target esm --target cjs`. Unknown target names produce an actionable error listing available targets. Works with both `build` and `watch` commands.

### Scaffolding (`warp init`)

Run `warp init` to generate a starter `warp.config.yml`. Warp detects `package.json` entry points (the `"main"` field, or probes for `./src/index.ts`, `./src/index.mts`, `./src/main.ts`) to infer a reasonable starting config. Scaffolds a dual-format (ESM + CJS) setup by default. Won't overwrite an existing config.

### JSON output

Pass `--json` for machine-readable output (implies `--quiet`). Returns a JSON object with `success`, `totalTimeMs`, per-target results (name, condition, success, compileTimeMs, deduped, outDir), and optional size report. Useful for CI pipelines and tooling integrations.

### Dry run

`--dry-run` validates your config and prints an exports diff showing exactly what would change in `package.json` — without compiling anything. Uses key-level comparison to produce a clear `+`/`-` diff.

### Size report

Pass `--stats` to compute and print a size table after building:

```
Target              Files     JS LOC       JS raw    npm est.       d.ts
-----------------------------------------------------------------------
esm                    42      1,234      48.2 kB     12.1 kB     8.3 kB
cjs                    42      1,301      50.0 kB     12.8 kB     8.3 kB
```

Plus public API surface info (export count, `.d.ts` file count). In CI (`CI=true`), a `warp-size-report.json` artifact is written to the package root.

JS LOC counts non-blank, non-comment lines using the TypeScript scanner for accurate tokenization (correctly handles comment tokens inside strings and template literals). npm estimated size uses gzip level 9.

### Dist file verification

After writing exports, Warp checks that every referenced `.js`, `.d.ts`, and `.d.ts.map` file actually exists on disk. Missing files produce a warning and fail the build (`DIST_MISSING` error code) so you catch problems before publish.

### Timing summary

On successful builds, Warp prints a timing breakdown showing total compile time, per-target time, and whether each target was compiled or copied (deduped).

## Programmatic API

Everything's exported from `@microsoft/warp`:

```ts
import { build } from "@microsoft/warp";

const result = await build({
  cwd: "/path/to/package",
  dryRun: false,
  clean: true,
  stats: true,
  target: ["esm"],
  configPath: "warp.config.yml",
  // Or pass a pre-resolved config to skip file discovery:
  // config: resolvedConfig,
});

console.log(result.success);        // boolean
console.log(result.totalTimeMs);    // wall-clock ms
console.log(result.compileResults); // per-target CompileResult[]
console.log(result.sizeReport);     // SizeReport with per-target metrics
```

### Key exports

#### Functions

| Export | Description |
| ------ | ----------- |
| `build(options?)` | Run the full build pipeline |
| `watch(options?)` | Build then watch for changes. Returns an `AbortController` to stop watching |
| `init(options?)` | Scaffold a new `warp.config.yml` |
| `findWarpConfig(dir, configPath?)` | Find, validate, and return config (or `undefined` if not found) |
| `validateTsconfigPaths(config, dir, source)` | Check that all tsconfig files referenced by targets exist |
| `validateOutDirs(configs)` | Verify that all targets have distinct `outDir`s |
| `inferModuleType(moduleKind)` | Map TS module kind → `"module"` / `"commonjs"` |
| `discoverPolyfills(files, suffix)` | Find polyfill files for a suffix |
| `groupBySignature(configs, getEffectiveSuffix?)` | Group targets by options signature for dedup |
| `optionsSignature(options, fileNames, polyfillSuffix?)` | Compute a dedup signature for a target's compiler options + file list |
| `sourceIdentity(fileNames, polyfillSuffix?)` | Compute a source identity hash for type-check grouping |
| `cleanOutDir(dir)` | `rm -rf` a directory (async) |
| `copyDir(src, dest)` | Recursive async copy with correct symlink handling |
| `copyDtsFiles(src, dest)` | Async copy of `.d.ts`/`.d.ts.map` files only |
| `verifyDistFiles(exports, root)` | Check dist files exist (`.js`, `.d.ts`, `.d.ts.map`) |
| `formatDiagnostics(results)` | Format diagnostics from compile results grouped by target |
| `formatSingleDiagnostic(diag, prefix)` | Format a single `ts.Diagnostic` with a prefix |
| `diagnosticCategoryLabel(category)` | Map `ts.DiagnosticCategory` to `"error"` / `"warning"` / etc. |
| `createCachedHost(options, cache)` | Create a `CompilerHost` backed by a `SharedSourceFileCache` |
| `createPolyfillHost(options, polyfillMap, cache)` | Create a `CompilerHost` that substitutes polyfill content |

#### Classes

| Export | Description |
| ------ | ----------- |
| `SharedSourceFileCache` | Reusable parsed-`SourceFile` cache (bounded, max 10k entries, LRU eviction) |
| `Logger` | Structured logger with configurable level and message buffering |
| `WarpError` | Structured error with `.code` field and optional `.cause` |

#### Logger utilities

| Export | Description |
| ------ | ----------- |
| `getLogger()` | Get the module-level default logger |
| `setLogLevel(level)` | Set the log level (`"quiet"` / `"info"` / `"verbose"`) |
| `setJsonMode(enabled)` | Toggle machine-readable JSON output mode |
| `isJsonMode()` | Check whether JSON mode is active |

#### Types

| Export | Description |
| ------ | ----------- |
| `BuildOptions` | Options for `build()` |
| `BuildResult` | Return type of `build()` |
| `WatchOptions` | Options for `watch()` (extends `BuildOptions` with `debounceMs`) |
| `InitOptions` | Options for `init()` |
| `WarpConfig` | Validated config (exports + targets) |
| `WarpTarget` | Single build target definition |
| `ResolvedWarpConfig` | Config with metadata about where it was found |
| `ConfigSource` | Source type and path (`"yaml"` or `"package.json"`) |
| `WarpErrorCode` | Union of all error code strings |
| `ModuleType` | `"module"` \| `"commonjs"` |
| `CompileResult` | Per-target compilation result (diagnostics, timing, dedup status) |
| `ParsedTargetConfig` | Parsed tsconfig data for a target (used internally and in advanced API usage) |
| `SizeReport` | Full size report with per-target metrics and API surface |
| `TargetSizeMetrics` | Per-target file count, LOC, raw bytes, gzip estimate, d.ts bytes |
| `ApiSurfaceMetrics` | Export count and `.d.ts` file count |
| `LogLevel` | `"quiet"` \| `"info"` \| `"verbose"` |

### Error codes

| Code | Meaning |
| ---- | ------- |
| `CONFIG_NOT_FOUND` | No config file or `"warp"` key found |
| `CONFIG_INVALID` | Config exists but doesn't pass validation (wrong types, missing fields) |
| `TSCONFIG_ERROR` | Target tsconfig can't be read, parsed, or has missing `outDir`. Includes hints for missing `"extends"` base configs |
| `COMPILE_ERROR` | TypeScript compilation failed, worker thread crashed, or task graph cycle detected |
| `VALIDATION_ERROR` | Duplicate target names/conditions, overlapping outDirs, invalid subpath patterns, unknown `--target` targets |
| `DIST_MISSING` | Referenced dist files don't exist after compilation |
