# @microsoft/warp

Multi-format TypeScript build tool for the Azure SDK. Compiles one source tree to multiple output formats (ESM, CJS, browser, React Native) and generates `package.json` exports from a single config.

## Quick start

1. Add a `warp.config.yml` to your package root.
2. Run `warp build`.

## CLI

```
warp <command> [options]
```

| Command | Description |
|---------|-------------|
| `build` | Compile all targets |
| `watch` | Build then rebuild on source changes |
| `init`  | Scaffold a new `warp.config.yml` |

| Flag | Description |
|------|-------------|
| `--config <path>` | Config file path |
| `--dry-run` | Show exports diff without compiling |
| `--no-clean` | Skip wiping `outDir`s before compilation |
| `--parallel` | Compile independent targets in worker threads |
| `--target <name>` | Build specific target(s). Repeatable |
| `--stats` | Show size and API surface report |
| `--json` | Machine-readable JSON output (implies `--quiet`) |
| `--verbose` | Debug-level output |
| `--quiet` | Errors only |

## Configuration

Warp checks the package root for config in this order:

1. `warp.config.yml` (or `.yaml`)
2. `warp.config.json`
3. `"warp"` key in `package.json`

### Minimal example

```yaml
exports:
  ./package.json: ./package.json
  .: ./src/index.ts

targets:
  - name: browser
    tsconfig: ../../../tsconfig.src.browser.json
  - name: react-native
    tsconfig: ../../../tsconfig.src.react-native.json
  - name: esm
    condition: import
    tsconfig: ../../../tsconfig.src.esm.json
  - name: commonjs
    condition: require
    tsconfig: ../../../tsconfig.src.cjs.json
```

This is the standard config for most SDK packages. All four targets are compiled, and `package.json` exports are generated automatically with the correct condition keys (`browser`, `react-native`, `import`, `require`) and `types`/`default` entries.

### `exports`

Map of subpath export keys → source file paths. Keys follow Node.js subpath export syntax (`"."`, `"./models"`, etc.). Values are `.ts` source paths or literal pass-throughs like `"./package.json"`.

- Keys must be `"."` or start with `"./"`.
- Trailing-slash keys and wildcards are rejected.
- Duplicate and empty keys are rejected.

### `targets`

Ordered array of build targets. Declaration order determines condition key order in the generated exports.

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `name` | `string` | ✅ | — | Unique identifier for logs and dedup |
| `condition` | `string` | — | Same as `name` | Node.js exports condition key (`import`, `require`, `browser`, etc.) |
| `tsconfig` | `string` | ✅ | — | Path to tsconfig. Must set `outDir` |

- Duplicate names and conditions are rejected.
- Overlapping `outDir`s are rejected.

When a tsconfig lives outside the package root (shared repo-root config using `${configDir}`), Warp creates a virtual config that extends it so `${configDir}` resolves to the package root.

## How it works

### Exports generation

After compilation, Warp rewrites `package.json` `"exports"` with the correct dist paths for every target/condition. Existing exports entries not managed by Warp are preserved. A `{ "type": "module" }` or `{ "type": "commonjs" }` shim is written into each target's `outDir`.

### Import resolution

Packages that need per-platform file selection use [Node.js subpath imports](https://nodejs.org/api/packages.html#subpath-imports) (`#`-prefixed specifiers). When `package.json` has an `"imports"` field, Warp automatically resolves these specifiers in all emitted `.js` and `.d.ts` files.

1. Source code uses `#`-prefixed imports:
   ```ts
   import { hmac } from "#platform/util/sha256";
   ```
2. `package.json` maps specifiers to per-condition files:
   ```json
   {
     "imports": {
       "#platform/*": {
         "browser": "./src/*-web.mts",
         "react-native": "./src/*-web.mts",
         "default": "./src/*.ts"
       }
     }
   }
   ```
3. Each target's tsconfig uses `customConditions` for type-checking:
   ```json
   { "compilerOptions": { "customConditions": ["browser"] } }
   ```
4. Warp resolves each `#` specifier to a concrete relative path in the output:
   - Browser: `import { hmac } from "./sha256-web.mjs";`
   - Node: `import { hmac } from "./sha256.js";`

**Advantages over `polyfillSuffix`:**

- **Per-target type-checking** — each target's tsconfig sees only the correct platform types, catching cross-platform type errors that `polyfillSuffix` cannot detect
- **Standards-based** — uses Node.js subpath imports and TypeScript `customConditions`, so IDEs and `tsc --noEmit` understand the resolution without Warp
- **Self-contained output** — the emitted files contain only relative paths, with no runtime dependency on `#imports` resolution

### Target deduplication

Warp computes two identity hashes per target:

- **Type-check identity** — all compiler options + file names → determines if type-checking can be skipped.
- **Emit identity** — emit-affecting options + file names + resolved imports → determines if output can be copied.

This yields four outcomes:

| Type-check | Emit | Action |
|---|---|---|
| new | new | Full compilation |
| seen | new | Skip type-check, emit |
| new | seen | Type-check only, copy output |
| seen | seen | Copy output only |

For example, `browser` and `react-native` targets with identical `#platform` resolutions share emit identity — one compiles, the other copies.

### Parallel compilation

`--parallel` uses worker threads (one per CPU). Sequential mode (default) is usually faster since dedup makes secondary targets near-instant.

### Watch mode

`warp watch` rebuilds on `.ts`/`.mts`/`.cts` changes with 300 ms debounce. Config file changes also trigger rebuilds.

## Programmatic API

```ts
import { build } from "@microsoft/warp";

const result = await build({ cwd: "/path/to/package" });
console.log(result.success, result.totalTimeMs);
```

See `src/index.ts` for the full list of exported functions, classes, and types.

### Error codes

| Code | Meaning |
|------|---------|
| `CONFIG_NOT_FOUND` | No config found |
| `CONFIG_INVALID` | Config fails validation |
| `TSCONFIG_ERROR` | Target tsconfig unreadable or missing `outDir` |
| `COMPILE_ERROR` | TypeScript compilation failed |
| `VALIDATION_ERROR` | Duplicate names/conditions, overlapping outDirs, unknown targets |
| `DIST_MISSING` | Referenced dist files don't exist after compilation |
