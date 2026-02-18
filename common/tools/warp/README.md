# @microsoft/warp

Multi-format TypeScript build tool for the Azure SDK. Takes one source tree, compiles it to multiple output formats (ESM, CJS, browser, whatever) and wires up your `package.json` exports — all from a single config.

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
| `help`  | Print usage info |

### Options

| Flag | Description |
| ---- | ----------- |
| `--config <path>` | Path to a warp config file (resolved relative to cwd) |
| `--dry-run` | Validate config and show an exports diff — nothing gets compiled or written |
| `--no-clean` | Skip wiping `outDir`s before compilation |
| `--incremental` | Use `.tsbuildinfo` for faster warm builds (~60 % speedup on repeat runs) |
| `--parallel` | Compile independent targets in parallel using worker threads |
| `--stats` | Compute and display a size and API surface report after building |
| `--verbose` | Print debug-level detail (cache hits, file lists) |
| `--quiet` | Suppress all output except errors |
| `--help` | Show help |

## Configuration

Warp looks for config in this order:

1. `warp.config.yml` (or `.yaml`)
2. `"warp"` key in `package.json`

If both exist, the YAML file wins (you'll get a warning though).

### Example `warp.config.yml`

```yaml
exports:
  ".": "./src/index.ts"
  "./models": "./src/models/index.ts"

targets:
  - name: esm
    condition: import
    tsconfig: tsconfig.esm.json

  - name: cjs
    condition: require
    tsconfig: tsconfig.cjs.json
    moduleType: commonjs

  - name: browser
    condition: browser
    tsconfig: tsconfig.browser.json
    polyfillSuffix: "-browser"
```

### Config reference

#### `exports`

Map of subpath patterns → source file paths. Keys are Node.js subpath export keys (like `"."`, `"./models"`). Values are source `.ts` paths or literal pass-throughs (`"./package.json"`).

#### `targets`

Ordered array of build targets. Declaration order controls the condition key order in the generated `package.json` exports.

| Field | Type | Required | Description |
| ----- | ---- | -------- | ----------- |
| `name` | `string` | ✅ | Identifier used in logs, size reports, and dedup |
| `condition` | `string` | ✅ | Node.js exports condition (`import`, `require`, `browser`, `react-native`, anything) |
| `tsconfig` | `string` | ✅ | Path to the target's tsconfig. Must set `outDir`; should set `rootDir` |
| `polyfillSuffix` | `string` | — | Enables per-target file substitution (see below) |
| `moduleType` | `"module"` \| `"commonjs"` | — | Module type for the `outDir` package.json shim. Auto-inferred from tsconfig if omitted |

## Features

### Multi-target compilation

Define as many targets as you want (ESM, CJS, browser, React Native, …). Each gets its own tsconfig and output directory. Warp compiles them all and stitches the results into a single `package.json` `"exports"` map with proper `types` + `default` condition entries.

### Automatic `package.json` exports rewriting

After compilation, Warp rewrites the `"exports"` field in your `package.json` with the correct dist paths for every target/condition combo. Existing exports entries not managed by Warp are preserved.

A `{ "type": "module" }` or `{ "type": "commonjs" }` shim is also written into each target's `outDir` so Node resolves things correctly.

### Polyfill substitution

Set `polyfillSuffix` on a target (e.g. `"-browser"`) and Warp swaps source files at compile time. If you have `foo.ts` and `foo-browser.mts`, the browser target compiles `foo-browser.mts` but emits it as `foo.js`. The output filename stays the same — callers never know.

- `.mts` polyfills are preferred over `.ts`
- Polyfills must be type-compatible with the originals (mismatches surface as compile errors, on purpose)

### Target deduplication

Targets with identical compiler options and source files are compiled once, then the output is copied. Saves real time when you have targets that only differ in `outDir`.

### Source-group type checking

Targets sharing the same source files only get type-checked once. The first target in a source group runs full diagnostics; subsequent targets skip `getPreEmitDiagnostics` (~30 % faster per skipped target).

### Declaration sharing

When multiple targets differ only in module format (same source files), `.d.ts` files are emitted once and copied to the other targets' `outDir`s (~17 % faster).

### Incremental compilation

Pass `--incremental` to enable `.tsbuildinfo`-based warm builds. Repeat compilations skip unchanged files (~60 % faster on warm runs).

### Parallel compilation

Pass `--parallel` and Warp spins up worker threads (one per CPU, capped to the number of compilation groups). Each worker pre-loads TypeScript once, then processes tasks via message passing. Independent source groups compile simultaneously; dependent groups respect the DAG ordering.

### Watch mode

`warp watch` runs an initial build, then monitors your source directories for `.ts`/`.mts`/`.cts` changes. When a change is detected, Warp automatically rebuilds with `--no-clean` for speed. The config file is also watched — editing it triggers a rebuild. Press `Ctrl+C` to stop.

### Log levels

- `--verbose` prints debug details like cache hits, polyfill discovery, and per-file events.
- `--quiet` suppresses everything except errors — useful in CI pipelines where you only care about pass/fail.
- Default (`info`) shows normal build output.

### Shared source file cache

In sequential mode, parsed `ts.SourceFile` objects are cached across targets with the same `ScriptTarget`. Parse once, reuse everywhere.

### Dry run

`--dry-run` validates your config and prints an exports diff showing exactly what would change in `package.json` — without compiling anything.

### Size report

Pass `--stats` to compute and print a size table after building:

```
Target              Files     JS LOC       JS raw    npm est.       d.ts
-----------------------------------------------------------------------
esm                    42      1,234      48.2 kB     12.1 kB     8.3 kB
cjs                    42      1,301      50.0 kB     12.8 kB     8.3 kB
```

Plus public API surface info (export count, `.d.ts` file count). In CI (`CI=true`), a `warp-size-report.json` artifact is written to the package root.

### Dist file verification

After writing exports, Warp checks that every referenced `.js` and `.d.ts` file actually exists on disk. Missing files get a warning so you catch problems before publish.

## Programmatic API

Everything's exported from `@microsoft/warp`:

```ts
import { build } from "@microsoft/warp";

const result = await build({
  cwd: "/path/to/package",
  dryRun: false,
  clean: true,
  incremental: true,
  parallel: true,
  stats: true,
});

console.log(result.success);        // boolean
console.log(result.totalTimeMs);    // wall-clock ms
console.log(result.compileResults); // per-target CompileResult[]
console.log(result.sizeReport);     // SizeReport with per-target metrics
```

### Key exports

| Export | Description |
| ------ | ----------- |
| `build(options?)` | Run the full build pipeline |
| `watch(options?)` | Build then watch for changes |
| `resolveWarpConfig(dir, configPath?)` | Load and validate config |
| `validateTsconfigPaths(config, dir, source)` | Check tsconfig files exist |
| `inferModuleType(moduleKind)` | Map TS module kind → `"module"` / `"commonjs"` |
| `SharedSourceFileCache` | Reusable parsed-SourceFile cache (bounded, max 10k entries) |
| `discoverPolyfills(files, suffix)` | Find polyfill files for a suffix |
| `groupBySignature(configs)` | Group targets for dedup |
| `cleanOutDir(dir)` | rm -rf a directory (async) |
| `copyDir(src, dest)` | Recursive async copy with correct symlink handling |
| `copyDtsFiles(src, dest)` | Async copy of .d.ts/.d.ts.map files |
| `verifyDistFiles(exports, root)` | Check dist files exist (.js, .d.ts, .d.ts.map) |
| `formatDiagnostics(results)` | Format diagnostics from compile results |
| `formatSingleDiagnostic(diag, prefix)` | Format a single ts.Diagnostic |
| `Logger` / `getLogger()` / `setLogLevel()` | Structured log levels (quiet/info/verbose) |
| `WarpError` | Structured error with `.code` field |

### Error codes

| Code | Meaning |
| ---- | ------- |
| `CONFIG_NOT_FOUND` | No config file or `"warp"` key found |
| `CONFIG_INVALID` | Config exists but doesn't pass validation |
| `TSCONFIG_ERROR` | Target tsconfig can't be read or parsed |
| `COMPILE_ERROR` | TypeScript compilation failed |
| `VALIDATION_ERROR` | Duplicate target names, overlapping outDirs, etc. |
| `DIST_MISSING` | Referenced dist files don't exist |
