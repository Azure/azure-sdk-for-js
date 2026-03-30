// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as ts from "typescript";
import * as fs from "node:fs";
import * as fsp from "node:fs/promises";
import * as path from "node:path";
import * as crypto from "node:crypto";
import { transform as esbuildTransform } from "esbuild";
import type { WarpTarget } from "./types.ts";
import { WarpError } from "./types.ts";
import { getLogger } from "./logger.ts";

/**
 * Parsed tsconfig data needed for compilation and exports rewriting.
 */
export interface ParsedTargetConfig {
  target: WarpTarget;
  parsedConfig: ts.ParsedCommandLine;
  outDir: string;
  rootDir: string;
  /**
   * Resolved import map patterns for the target's active conditions.
   * Used by `programIdentity` to determine when two targets with different
   * `customConditions` resolve to the same program graph (e.g., both
   * react-native and browser mapping `#platform/*` to `*-browser.mts`).
   */
  resolvedImports?: readonly string[];
}

/**
 * Parse and validate a target's tsconfig file.
 * Returns the parsed config along with resolved outDir and rootDir.
 */
export function parseTargetTsConfig(target: WarpTarget, packageRoot: string): ParsedTargetConfig {
  const tsconfigPath = path.resolve(packageRoot, target.tsconfig);
  const configFile = ts.readConfigFile(tsconfigPath, (fileName) => ts.sys.readFile(fileName));

  if (configFile.error) {
    const message = ts.flattenDiagnosticMessageText(configFile.error.messageText, "\n");
    throw new WarpError(
      "TSCONFIG_ERROR",
      `[warp] [${target.name}] Failed to read ${tsconfigPath}: ${message}`,
    );
  }

  // When the tsconfig lives outside the package (e.g. a shared repo-root config
  // using ${configDir}), we parse it via a virtual config that "extends" the real
  // file.  TypeScript resolves ${configDir} to the *extending* config's directory,
  // so placing the virtual config in packageRoot makes ${configDir} point at the
  // package — exactly what shared configs expect.
  const tsconfigDir = path.dirname(tsconfigPath);
  const needsVirtualExtends = path.relative(packageRoot, tsconfigDir).startsWith("..");

  let parsedConfig: ts.ParsedCommandLine;
  if (needsVirtualExtends) {
    const virtualConfig = { extends: tsconfigPath };
    const virtualConfigFileName = path.join(packageRoot, `__warp_virtual_${target.name}.json`);
    parsedConfig = ts.parseJsonConfigFileContent(
      virtualConfig,
      ts.sys,
      packageRoot,
      undefined,
      virtualConfigFileName,
    );
  } else {
    parsedConfig = ts.parseJsonConfigFileContent(configFile.config, ts.sys, tsconfigDir);
  }

  if (parsedConfig.errors.length > 0) {
    const messages = parsedConfig.errors
      .map((d) => ts.flattenDiagnosticMessageText(d.messageText, "\n"))
      .join("\n");
    // Detect missing base config referenced via "extends" and add a hint
    const hasFileNotFound = parsedConfig.errors.some(
      (d) =>
        d.code === 6053 /* File '{0}' not found. */ ||
        d.code === 5083 /* Cannot read file '{0}'. */,
    );
    const extendsHint = hasFileNotFound
      ? `\nHint: if this tsconfig uses "extends", verify that the base config path is correct and the file exists.` +
        `\n\nExample:` +
        `\n  {` +
        `\n    "extends": "../../../tsconfig.json",` +
        `\n    "compilerOptions": { "outDir": "./dist/esm", "rootDir": "./src" }` +
        `\n  }`
      : "";
    throw new WarpError(
      "TSCONFIG_ERROR",
      `[warp] [${target.name}] Errors parsing ${tsconfigPath}:\n${messages}${extendsHint}`,
    );
  }

  const outDir = parsedConfig.options.outDir;
  if (!outDir) {
    throw new WarpError(
      "TSCONFIG_ERROR",
      `[warp] [${target.name}] tsconfig ${tsconfigPath} must specify "outDir". Warp reads outDir to locate output files for exports rewriting and size reporting.`,
    );
  }

  const rootDir = parsedConfig.options.rootDir;
  if (!rootDir) {
    getLogger().warn(
      `[warp] [${target.name}] Warning: tsconfig ${tsconfigPath} does not specify "rootDir". Output paths may be unpredictable.`,
    );
  }

  if (parsedConfig.fileNames.length === 0) {
    throw new WarpError(
      "VALIDATION_ERROR",
      `[warp] [${target.name}] tsconfig ${tsconfigPath} matched zero source files. ` +
        `Check the "include" and "exclude" patterns.`,
    );
  }

  return {
    target,
    parsedConfig,
    outDir,
    rootDir: rootDir ?? (needsVirtualExtends ? packageRoot : path.dirname(tsconfigPath)),
  };
}

/**
 * Validate that all targets have distinct outDirs.
 * Throws if two targets would write to the same directory.
 */
export function validateOutDirs(configs: ParsedTargetConfig[]): void {
  const seen = new Map<string, string>();
  for (const pc of configs) {
    const normalized = path.resolve(pc.outDir);
    const existing = seen.get(normalized);
    if (existing) {
      throw new WarpError(
        "VALIDATION_ERROR",
        `[warp] Targets "${existing}" and "${pc.target.name}" share the same outDir: ${normalized}. Each target must have a distinct outDir.`,
      );
    }
    seen.set(normalized, pc.target.name);
  }
}

/**
 * Result from compiling a single target.
 */
export interface CompileResult {
  target: WarpTarget;
  diagnostics: readonly ts.Diagnostic[];
  /** Pre-formatted diagnostic text (from worker compilation). */
  diagnosticText?: string;
  success: boolean;
  outDir: string;
  rootDir: string;
  /** Time in milliseconds spent compiling this target (0 for dedup copies). */
  compileTimeMs: number;
  /** Whether this target was produced by copying a dedup primary. */
  deduped: boolean;
}

// ---------------------------------------------------------------------------
// Shared SourceFile cache
// ---------------------------------------------------------------------------

/**
 * Cache of parsed ts.SourceFile objects keyed by `absolutePath\0scriptTarget`.
 * Including ScriptTarget in the key ensures files parsed for different
 * targets (e.g. ES5 vs ESNext) are not incorrectly shared.
 *
 * An optional maxSize caps memory usage. When the limit is reached the
 * oldest entry (insertion-order via Map) is evicted.
 */
export class SharedSourceFileCache {
  private cache = new Map<string, ts.SourceFile>();
  private maxSize: number;

  constructor(maxSize: number = 10_000) {
    this.maxSize = maxSize;
  }

  private makeKey(fileName: string, target: ts.ScriptTarget): string {
    return `${path.resolve(fileName)}\0${target}`;
  }

  get(fileName: string, target: ts.ScriptTarget): ts.SourceFile | undefined {
    const key = this.makeKey(fileName, target);
    const sf = this.cache.get(key);
    if (sf !== undefined) {
      // Promote to most-recently-used by re-inserting (Map preserves insertion
      // order), turning FIFO eviction into true LRU.
      this.cache.delete(key);
      this.cache.set(key, sf);
    }
    return sf;
  }

  set(fileName: string, target: ts.ScriptTarget, sf: ts.SourceFile): void {
    const key = this.makeKey(fileName, target);
    // Evict oldest entry when at capacity (Map preserves insertion order)
    if (!this.cache.has(key) && this.cache.size >= this.maxSize) {
      const first = this.cache.keys().next().value!;
      this.cache.delete(first);
    }
    this.cache.set(key, sf);
  }

  get size(): number {
    return this.cache.size;
  }
}

/**
 * Create a CompilerHost that wraps the default host with a shared source
 * file cache. Source files are parsed once and reused across targets
 * that share the same ScriptTarget.
 */
export function createCachedHost(
  options: ts.CompilerOptions,
  cache: SharedSourceFileCache,
): ts.CompilerHost {
  const baseHost = ts.createCompilerHost(options);
  const scriptTarget = options.target ?? ts.ScriptTarget.Latest;
  return {
    ...baseHost,
    getSourceFile(fileName, languageVersionOrOptions, onError, shouldCreate) {
      const absPath = path.resolve(fileName);
      const cached = cache.get(absPath, scriptTarget);
      if (cached) return cached;
      const sf = baseHost.getSourceFile(fileName, languageVersionOrOptions, onError, shouldCreate);
      if (sf) cache.set(absPath, scriptTarget, sf);
      return sf;
    },
  };
}

// ---------------------------------------------------------------------------
// Polyfill discovery and source substitution
// ---------------------------------------------------------------------------

/**
 * Discover polyfill files for a set of source files. For each file in
 * `fileNames`, checks whether a polyfill exists at `<stem><suffix>.mts`
 * (preferred) or `<stem><suffix>.ts`. Returns a map from the absolute
 * path of the original file to its polyfill replacement.
 *
 * Because discovery is driven by `fileNames` (from the parsed tsconfig),
 * it inherently respects include/exclude patterns — only files in the
 * compilation can be polyfilled.
 *
 * `.mts` polyfills take priority over `.ts` polyfills when both exist.
 */
export async function discoverPolyfills(
  fileNames: readonly string[],
  suffix: string,
): Promise<Map<string, string>> {
  const polyfillMap = new Map<string, string>();

  // Group source files by directory so we can scan each directory once
  // instead of doing O(files × 2) stat calls that mostly miss.
  const byDir = new Map<string, string[]>();
  for (const fileName of fileNames) {
    if (!fileName.endsWith(".ts") || fileName.endsWith(".d.ts")) continue;
    const dir = path.dirname(fileName);
    let list = byDir.get(dir);
    if (!list) {
      list = [];
      byDir.set(dir, list);
    }
    list.push(fileName);
  }

  // For each unique directory, list entries once and match polyfill candidates
  await Promise.all(
    [...byDir.entries()].map(async ([dir, sources]) => {
      let entries: Set<string>;
      try {
        const dirEntries = await fsp.readdir(dir);
        entries = new Set(dirEntries);
      } catch {
        return; // directory doesn't exist or unreadable — skip
      }

      for (const fileName of sources) {
        const base = path.basename(fileName);
        const stem = base.slice(0, -3); // strip .ts

        // Prefer .mts polyfill
        const mtsName = `${stem}${suffix}.mts`;
        if (entries.has(mtsName)) {
          polyfillMap.set(path.resolve(fileName), path.join(dir, mtsName));
          continue;
        }

        // Check .cts polyfill (e.g. state-cjs.cts for CJS module-local-state)
        const ctsName = `${stem}${suffix}.cts`;
        if (entries.has(ctsName)) {
          polyfillMap.set(path.resolve(fileName), path.join(dir, ctsName));
          continue;
        }

        // Fall back to .ts polyfill
        const tsName = `${stem}${suffix}.ts`;
        if (entries.has(tsName)) {
          polyfillMap.set(path.resolve(fileName), path.join(dir, tsName));
        }
      }
    }),
  );

  return polyfillMap;
}

/**
 * Create a CompilerHost that transparently substitutes polyfill file
 * content for the original source files. The output filename stays the
 * same as the original (e.g. `foo.js`), but the emitted code comes
 * from the polyfill (e.g. `foo-browser.mts`).
 *
 * Type errors from signature mismatches between polyfill and callers
 * are surfaced intentionally — polyfills must maintain type-compatible
 * signatures with the originals they replace.
 *
 * Polyfilled source files use a separate cache to avoid conflicts with
 * non-polyfill targets sharing the same SharedSourceFileCache.
 */
export function createPolyfillHost(
  options: ts.CompilerOptions,
  polyfillMap: Map<string, string>,
  cache: SharedSourceFileCache,
): { host: ts.CompilerHost } {
  const baseHost = ts.createCompilerHost(options);
  const polyfillCache = new Map<string, ts.SourceFile>();
  const scriptTarget = options.target ?? ts.ScriptTarget.Latest;

  const host: ts.CompilerHost = {
    ...baseHost,
    getSourceFile(fileName, languageVersionOrOptions, onError, shouldCreate) {
      const absPath = path.resolve(fileName);
      const polyfillPath = polyfillMap.get(absPath);

      if (polyfillPath) {
        // Key by absPath + scriptTarget to avoid cross-target cache collisions (#3)
        const cacheKey = `${absPath}\0${scriptTarget}`;
        const cached = polyfillCache.get(cacheKey);
        if (cached) return cached;

        // Read polyfill content but present it under the original filename
        // so that outDir-relative output paths are preserved.
        const content = ts.sys.readFile(polyfillPath);
        if (content !== undefined) {
          const sf = ts.createSourceFile(fileName, content, languageVersionOrOptions);
          polyfillCache.set(cacheKey, sf);
          return sf;
        }
      }

      // Non-polyfilled files use the shared cache (normalized to absolute)
      const cached = cache.get(absPath, scriptTarget);
      if (cached) return cached;
      const sf = baseHost.getSourceFile(fileName, languageVersionOrOptions, onError, shouldCreate);
      if (sf) cache.set(absPath, scriptTarget, sf);
      return sf;
    },
  };

  return { host };
}

// ---------------------------------------------------------------------------
// Target deduplication — two independent dimensions
// ---------------------------------------------------------------------------
//
// Type-check identity (`optionsSignature`): ALL compiler options + fileNames.
//   Same identity → type checking produces identical diagnostics → safe to skip.
//   Controls `typeCheck` in compileTarget.
//
// Emit identity (`programIdentity`): emit-affecting options + fileNames + resolvedImports.
//   Same identity → emitted JS + declarations are identical → safe to copyDir.
//   Controls whether we compile or copy output.
//
// A target can match on emit identity (copy output) without matching on
// type-check identity (must still type-check) — e.g. workerd and esm share
// the same module/target/fileNames but differ in `lib`.
// ---------------------------------------------------------------------------

/**
 * Compute a type-check identity for a target's compiler options + file list.
 * Targets with the same identity produce identical type-checking results
 * (same diagnostics) because ALL compiler options — including `lib`, `types`,
 * `strict`, etc. — are included. Only `outDir` and `configFilePath` are
 * excluded as they don't affect semantics.
 *
 * Used to decide when type checking can be safely skipped.
 */
export function optionsSignature(
  options: ts.CompilerOptions,
  fileNames: readonly string[],
  polyfillSuffix?: string,
): string {
  const clone = { ...options };
  delete clone.outDir;
  // configFilePath is per-tsconfig, not semantically meaningful
  delete clone.configFilePath;
  const optionsStr = JSON.stringify(clone, Object.keys(clone).sort());

  // Include a hash of sorted fileNames to prevent incorrect dedup
  // when targets have different include/exclude patterns.
  const filesHash = crypto
    .createHash("sha256")
    .update([...fileNames].sort().join("\0"))
    .digest("hex")
    .slice(0, 16);

  const base = `${optionsStr}\0files:${filesHash}`;
  return polyfillSuffix ? `${base}\0polyfill:${polyfillSuffix}` : base;
}

/**
 * Compute an emit identity hash — determines when two targets produce
 * byte-identical output (JS + declarations).
 *
 * The identity includes only factors that affect emitted output:
 * - Emit-affecting compiler options (module, target, jsx, declaration, etc.)
 * - `fileNames` — the root files from tsconfig include
 * - `resolvedImports` — the resolved import map entries for the active
 *   conditions. This captures how `#platform/*` imports resolve: two targets
 *   with different `customConditions` that resolve to the same files (e.g.,
 *   both react-native and browser mapping to `*-web.mts`) will share an
 *   identity, while targets resolving to different files will not.
 *
 * NOT included (type-check only, no effect on output):
 * - `lib`, `types`, `typeRoots` — affect available type definitions
 * - `strict` and its sub-flags — affect error reporting
 * - `customConditions` — affects import resolution, already captured by
 *   resolvedImports
 */

/** Compiler options that affect emitted JS/declarations (not just type-checking). */
const EMIT_AFFECTING_OPTIONS: readonly (keyof ts.CompilerOptions)[] = [
  "module",
  "moduleResolution",
  "target",
  "jsx",
  "jsxFactory",
  "jsxFragmentFactory",
  "jsxImportSource",
  "declaration",
  "declarationMap",
  "emitDeclarationOnly",
  "sourceMap",
  "inlineSourceMap",
  "inlineSources",
  "importHelpers",
  "noEmitHelpers",
  "downlevelIteration",
  "esModuleInterop",
  "verbatimModuleSyntax",
  "isolatedModules",
  "emitDecoratorMetadata",
  "removeComments",
  "preserveConstEnums",
  "stripInternal",
  "newLine",
];

export function programIdentity(
  options: ts.CompilerOptions,
  fileNames: readonly string[],
  resolvedImports?: readonly string[],
  polyfillSuffix?: string,
  moduleType?: string,
): string {
  const hash = crypto.createHash("sha256");
  // Hash only emit-affecting options (sorted for stability)
  const emitOpts: Record<string, unknown> = {};
  for (const key of EMIT_AFFECTING_OPTIONS) {
    if (options[key] !== undefined) {
      emitOpts[key] = options[key];
    }
  }
  hash.update(JSON.stringify(emitOpts, Object.keys(emitOpts).sort()));
  hash.update("\0files:" + [...fileNames].sort().join("\0"));
  if (resolvedImports && resolvedImports.length > 0) {
    hash.update("\0imports:" + [...resolvedImports].sort().join("\0"));
  }
  if (polyfillSuffix) {
    hash.update("\0polyfill:" + polyfillSuffix);
  }
  if (moduleType) {
    hash.update("\0moduleType:" + moduleType);
  }
  return hash.digest("hex").slice(0, 16);
}

// ── Backward-compatible aliases (consumed by parallel.ts, removed in a later commit) ──

/** @deprecated Use optionsSignature + programIdentity instead. */
export function sourceIdentity(fileNames: readonly string[], polyfillSuffix?: string): string {
  const filesHash = crypto
    .createHash("sha256")
    .update([...fileNames].sort().join("\0"))
    .digest("hex")
    .slice(0, 16);
  return polyfillSuffix ? `${filesHash}\0polyfill:${polyfillSuffix}` : filesHash;
}

interface DedupGroup {
  primary: ParsedTargetConfig;
  copies: ParsedTargetConfig[];
}

/** @deprecated Use per-target dedup with optionsSignature + programIdentity. */
export function groupBySignature(
  configs: ParsedTargetConfig[],
  getEffectiveSuffix?: (pc: ParsedTargetConfig) => string | undefined,
): DedupGroup[] {
  const map = new Map<string, DedupGroup>();
  for (const pc of configs) {
    const suffix = getEffectiveSuffix ? getEffectiveSuffix(pc) : pc.target.polyfillSuffix;
    const sig = optionsSignature(pc.parsedConfig.options, pc.parsedConfig.fileNames, suffix);
    const existing = map.get(sig);
    if (existing) {
      existing.copies.push(pc);
    } else {
      map.set(sig, { primary: pc, copies: [] });
    }
  }
  return [...map.values()];
}

/** @deprecated Use copyDir instead. */
export async function copyDtsFiles(src: string, dest: string): Promise<void> {
  const entries = await fsp.readdir(src, { withFileTypes: true, recursive: true });
  const copies: { srcPath: string; destPath: string }[] = [];
  const dirs = new Set<string>([dest]);
  for (const entry of entries) {
    if (!entry.isFile()) continue;
    if (!entry.name.endsWith(".d.ts") && !entry.name.endsWith(".d.ts.map")) continue;
    const parentPath = entry.parentPath ?? (entry as { path: string }).path;
    const srcPath = path.join(parentPath, entry.name);
    const relPath = path.relative(src, srcPath);
    const destPath = path.join(dest, relPath);
    dirs.add(path.dirname(destPath));
    copies.push({ srcPath, destPath });
  }
  if (copies.length === 0) return;
  await runWithConcurrency([...dirs], MAX_COPY_CONCURRENCY, (d) =>
    fsp.mkdir(d, { recursive: true }),
  );
  await runWithConcurrency(copies, MAX_COPY_CONCURRENCY, ({ srcPath, destPath }) =>
    fsp.copyFile(srcPath, destPath, fs.constants.COPYFILE_FICLONE),
  );
}

// ── End backward-compatible aliases ──

/**
 * Remove a directory and its contents if it exists.
 */
export async function cleanOutDir(outDir: string): Promise<void> {
  await fsp.rm(outDir, { recursive: true, force: true });
}

const MAX_COPY_CONCURRENCY = 64;

async function runWithConcurrency<T>(
  items: readonly T[],
  maxConcurrency: number,
  run: (item: T) => Promise<unknown>,
): Promise<void> {
  if (items.length === 0) return;

  const concurrency = Math.max(1, Math.min(maxConcurrency, items.length));
  let nextIndex = 0;

  await Promise.all(
    Array.from({ length: concurrency }, async () => {
      while (true) {
        const idx = nextIndex++;
        if (idx >= items.length) return;
        await run(items[idx]);
      }
    }),
  );
}

/**
 * Recursively copy a directory tree, correctly handling symlinks (#14).
 */
export async function copyDir(src: string, dest: string): Promise<void> {
  // Single recursive readdir replaces O(depth) nested readdir calls,
  // reducing filesystem round-trips for deep directory trees.
  const entries = await fsp.readdir(src, { withFileTypes: true, recursive: true });

  const dirs = new Set<string>([dest]);
  const files: { srcPath: string; destPath: string }[] = [];
  const symlinks: { srcPath: string; destPath: string }[] = [];

  for (const entry of entries) {
    const parentPath = entry.parentPath ?? (entry as { path: string }).path;
    const srcPath = path.join(parentPath, entry.name);
    const relPath = path.relative(src, srcPath);
    const destPath = path.join(dest, relPath);
    if (entry.isSymbolicLink()) {
      dirs.add(path.dirname(destPath));
      symlinks.push({ srcPath, destPath });
    } else if (entry.isDirectory()) {
      dirs.add(destPath);
    } else {
      dirs.add(path.dirname(destPath));
      files.push({ srcPath, destPath });
    }
  }

  // Create all destination directories first
  await runWithConcurrency([...dirs], MAX_COPY_CONCURRENCY, (d) =>
    fsp.mkdir(d, { recursive: true }),
  );

  const copyOps: Array<() => Promise<void>> = [
    ...files.map(
      ({ srcPath, destPath }) =>
        () =>
          fsp.copyFile(srcPath, destPath, fs.constants.COPYFILE_FICLONE),
    ),
    ...symlinks.map(({ srcPath, destPath }) => async () => {
      let linkTarget: string;
      try {
        linkTarget = await fsp.readlink(srcPath);
      } catch (err) {
        if ((err as NodeJS.ErrnoException).code === "ENOENT") return;
        throw err;
      }
      if (path.isAbsolute(linkTarget)) {
        await fsp.symlink(linkTarget, destPath);
      } else {
        const absTarget = path.resolve(path.dirname(srcPath), linkTarget);
        const relTarget = path.relative(path.dirname(destPath), absTarget);
        await fsp.symlink(relTarget, destPath);
      }
    }),
  ];

  // Copy files and recreate symlinks with bounded concurrency
  await runWithConcurrency(copyOps, MAX_COPY_CONCURRENCY, (op) => op());
}

/**
 * Transform ESM output to CJS using esbuild.
 *
 * Reads `.js` files from `src`, transforms each to CommonJS format via
 * esbuild, and writes the result (plus a regenerated `.js.map`) to `dest`.
 * Non-JS files (`.d.ts`, `.d.ts.map`, etc.) are copied as-is.
 * Stale ESM `.js.map` files are excluded since esbuild produces its own.
 *
 * This is much faster than running a full tsc compilation with a virtual
 * `{"type":"commonjs"}` package.json, since esbuild only does syntax
 * transformation — no resolution, type checking, or program analysis.
 */
export async function transformEsmToCjs(src: string, dest: string): Promise<void> {
  const entries = await fsp.readdir(src, { withFileTypes: true, recursive: true });
  const dirs = new Set<string>();
  const jsFiles: Array<{ srcPath: string; destPath: string }> = [];
  const copyFiles: Array<{ srcPath: string; destPath: string; relPath: string }> = [];
  const jsRelPaths = new Set<string>();

  for (const entry of entries) {
    if (entry.isDirectory()) continue;
    const parentPath = entry.parentPath ?? entry.path;
    const srcPath = path.join(parentPath, entry.name);
    const relPath = path.relative(src, srcPath);
    const destPath = path.join(dest, relPath);
    dirs.add(path.dirname(destPath));
    if (entry.name.endsWith(".js") && !entry.name.endsWith(".d.js")) {
      jsFiles.push({ srcPath, destPath });
      jsRelPaths.add(relPath);
    } else {
      copyFiles.push({ srcPath, destPath, relPath });
    }
  }

  // Exclude .js.map files whose .js counterpart will be transformed (we regenerate the map).
  const filteredCopyFiles = copyFiles.filter(
    ({ relPath }) => !relPath.endsWith(".js.map") || !jsRelPaths.has(relPath.slice(0, -4)),
  );

  await runWithConcurrency([...dirs], MAX_COPY_CONCURRENCY, (d) =>
    fsp.mkdir(d, { recursive: true }),
  );

  const ops: Array<() => Promise<void>> = [
    ...jsFiles.map(({ srcPath, destPath }) => async () => {
      const source = await fsp.readFile(srcPath, "utf-8");
      const result = await esbuildTransform(source, {
        format: "cjs",
        loader: "js",
        sourcemap: "external",
        sourcefile: path.basename(srcPath),
        platform: "node",
      });
      await Promise.all([
        fsp.writeFile(destPath, result.code),
        fsp.writeFile(destPath + ".map", result.map),
      ]);
    }),
    ...filteredCopyFiles.map(
      ({ srcPath, destPath }) =>
        () =>
          fsp.copyFile(srcPath, destPath, fs.constants.COPYFILE_FICLONE),
    ),
  ];

  await runWithConcurrency(ops, MAX_COPY_CONCURRENCY, (op) => op());
}

// ---------------------------------------------------------------------------
// Compilation
// ---------------------------------------------------------------------------

/**
 * Filter rootNames to exclude polyfill source files.
 * Uses basename-aware matching: a file is a polyfill if its basename
 * (without extension) ends with the suffix and the extension is .mts, .cts, or .ts.
 */
function filterPolyfillRootNames(rootNames: readonly string[], suffix: string): string[] {
  return rootNames.filter((f) => {
    const base = path.basename(f);
    const ext = path.extname(base);
    if (ext !== ".mts" && ext !== ".cts" && ext !== ".ts") return true;
    const stem = base.slice(0, -ext.length);
    return !stem.endsWith(suffix);
  });
}

/**
 * Options controlling how a single target is compiled.
 */
interface CompileTargetOptions {
  /** When false, skip getPreEmitDiagnostics (type checking). Default: true. */
  typeCheck?: boolean;
  /**
   * When true, run type-checking only — skip emit entirely (noEmit: true).
   * Used when output will be copied from another target with the same emit identity.
   */
  skipEmit?: boolean;
  /** @deprecated When true, emit JS only — suppress .d.ts/.d.ts.map. Kept for compat. */
  skipDeclarations?: boolean;
}

/**
 * Compile a single target using the TypeScript compiler API.
 *
 * Performance optimizations controlled by options:
 * - `typeCheck: false` — skip getPreEmitDiagnostics (~30% faster)
 * - `skipEmit: true` — type-check only, no output files
 *
 * CJS virtual package.json: when the target's `moduleType` is `"commonjs"`,
 * a virtual `{"type":"commonjs"}` package.json is injected into the
 * compiler host so TypeScript's Node16/NodeNext resolution emits CommonJS.
 * The tsconfig on disk should already specify `module: "Node16"` /
 * `moduleResolution: "Node16"` so all tools (IDE, eslint, api-extractor)
 * see the same resolution algorithm that warp uses.
 */
export async function compileTarget(
  parsed: ParsedTargetConfig,
  host?: ts.CompilerHost,
  compileOptions?: CompileTargetOptions,
): Promise<CompileResult> {
  const t0 = performance.now();
  const doTypeCheck = compileOptions?.typeCheck ?? true;
  const skipEmit = compileOptions?.skipEmit ?? false;
  const skipDecl = compileOptions?.skipDeclarations ?? false;

  let rootNames: readonly string[] = parsed.parsedConfig.fileNames;

  // Filter out polyfill source files so they don't produce extra output
  const suffix = parsed.target.polyfillSuffix;
  if (suffix) {
    rootNames = filterPolyfillRootNames(rootNames, suffix);
  }

  const effectiveOptions: ts.CompilerOptions = {
    ...parsed.parsedConfig.options,
  };

  if (skipEmit) {
    effectiveOptions.declaration = false;
    effectiveOptions.declarationMap = false;
    effectiveOptions.noEmit = true;
  } else if (skipDecl) {
    effectiveOptions.declaration = false;
    effectiveOptions.declarationMap = false;
  }

  // Inject virtual {"type":"commonjs"} package.json when the target
  // explicitly requests CJS output via moduleType. The tsconfig should
  // already use module/moduleResolution Node16 or NodeNext — we only
  // override the package.json "type" field so TypeScript emits CJS.
  let effectiveHost = host;
  if (parsed.target.moduleType === "commonjs") {
    // Build package.json override: inject {"type":"commonjs"} for the
    // source root directory (and its ancestors up to the real package.json).
    // Preserve the real package.json's "imports" field so that TypeScript
    // can still resolve #-prefixed subpath imports under Node16.
    const overridePaths = new Map<string, string>();
    const rootDir = parsed.rootDir ?? path.dirname(rootNames[0] ?? "");
    const absRoot = path.resolve(rootDir);

    // Read the real package.json to preserve its "imports" and "exports" fields
    let realPkgImports: unknown;
    let realPkgExports: unknown;
    let dir = absRoot;
    while (dir) {
      const pkgPath = path.join(dir, "package.json");
      try {
        const pkgContent = JSON.parse(await fsp.readFile(pkgPath, "utf-8")) as Record<
          string,
          unknown
        >;
        realPkgImports = pkgContent.imports;
        realPkgExports = pkgContent.exports;
        break;
      } catch {
        // file doesn't exist or parse error — walk up
      }
      const parent = path.dirname(dir);
      if (parent === dir) break;
      dir = parent;
    }

    const virtualPkg: Record<string, unknown> = { type: "commonjs" };
    if (realPkgImports) virtualPkg.imports = realPkgImports;
    if (realPkgExports) virtualPkg.exports = realPkgExports;
    const cjsPackageJson = JSON.stringify(virtualPkg);

    dir = absRoot;
    while (dir) {
      overridePaths.set(path.resolve(dir, "package.json"), cjsPackageJson);
      try {
        await fsp.access(path.join(dir, "package.json"));
        break;
      } catch {
        // doesn't exist — walk up
      }
      const parent = path.dirname(dir);
      if (parent === dir) break;
      dir = parent;
    }

    // Create a fresh host that intercepts package.json reads.
    //
    // IMPORTANT: We do NOT use the shared SourceFile cache here. Under Node16,
    // TypeScript embeds `impliedNodeFormat` (CJS vs ESM) in each SourceFile
    // based on the nearest package.json. Our virtual {"type":"commonjs"}
    // override changes that format, so cached SourceFiles from ESM targets
    // would poison CJS output (and vice versa).
    const baseHost = ts.createCompilerHost(effectiveOptions);

    effectiveHost = {
      ...baseHost,
      fileExists(fileName: string) {
        if (overridePaths.has(path.resolve(fileName))) return true;
        return baseHost.fileExists(fileName);
      },
      readFile(fileName: string) {
        const override = overridePaths.get(path.resolve(fileName));
        if (override !== undefined) return override;
        return baseHost.readFile(fileName);
      },
    };
  }

  const program = ts.createProgram({
    rootNames: [...rootNames],
    options: effectiveOptions,
    host: effectiveHost,
  });
  const preEmit = doTypeCheck ? ts.getPreEmitDiagnostics(program) : [];

  const emitResult = skipEmit
    ? { diagnostics: [] as readonly ts.Diagnostic[], emitSkipped: true }
    : program.emit();
  const allDiagnostics: readonly ts.Diagnostic[] = [...preEmit, ...emitResult.diagnostics];

  return {
    target: parsed.target,
    diagnostics: allDiagnostics,
    success: !allDiagnostics.some((d) => d.category === ts.DiagnosticCategory.Error),
    outDir: parsed.outDir,
    rootDir: parsed.rootDir,
    compileTimeMs: performance.now() - t0,
    deduped: false,
  };
}

/**
 * Compile all targets with two-dimensional optimization:
 *
 * 1. **Type-check identity** (`optionsSignature` — ALL options + fileNames):
 *    Targets with identical type-check identity produce the same diagnostics.
 *    Only the first is type-checked; subsequent ones skip `getPreEmitDiagnostics`.
 *
 * 2. **Emit identity** (`programIdentity` — emit options + fileNames + resolvedImports):
 *    Targets with identical emit identity produce byte-identical output.
 *    Only the first emits; subsequent ones get `copyDir`.
 *
 * These are independent: a target may share emit identity (copy output) but
 * differ in type-check identity (must still type-check). For example, workerd
 * and esm share module/target/fileNames but differ in `lib` — esm must be
 * type-checked but can reuse workerd's output.
 */
export async function compileAllTargets(
  parsedConfigs: ParsedTargetConfig[],
  options?: { clean?: boolean; packageRoot?: string },
): Promise<CompileResult[]> {
  const clean = options?.clean ?? true;
  validateOutDirs(parsedConfigs);
  const log = getLogger();
  const cache = new SharedSourceFileCache();

  // Pre-discover polyfills for all targets in parallel.
  const polyfillResults = new Map<string, Map<string, string>>();
  await Promise.all(
    parsedConfigs.map(async (pc) => {
      const suffix = pc.target.polyfillSuffix;
      if (suffix) {
        const map = await discoverPolyfills(pc.parsedConfig.fileNames, suffix);
        polyfillResults.set(pc.target.name, map);
      }
    }),
  );

  // Effective suffix: only non-empty when polyfill files were actually found.
  const getEffectiveSuffix = (pc: ParsedTargetConfig): string | undefined => {
    const map = polyfillResults.get(pc.target.name);
    return map && map.size > 0 ? pc.target.polyfillSuffix : undefined;
  };

  if (clean) {
    await Promise.all(parsedConfigs.map((pc) => cleanOutDir(pc.outDir)));
  }

  // Two-dimensional dedup
  const emittedPrograms = new Map<string, string>(); // emitId → outDir
  const typeCheckedIds = new Set<string>();
  // Track ESM outputs by base identity (without moduleType) for esbuild CJS transform
  const esmOutputsByBaseId = new Map<string, string>(); // baseEmitId → outDir

  const results: CompileResult[] = [];
  const total = parsedConfigs.length;

  for (let i = 0; i < total; i++) {
    const parsed = parsedConfigs[i];
    const effSuffix = getEffectiveSuffix(parsed);
    const polyfillMap = polyfillResults.get(parsed.target.name);
    const hasPolyfills = polyfillMap != null && polyfillMap.size > 0;

    let host: ts.CompilerHost;
    if (hasPolyfills) {
      log.info(
        `[warp] [${parsed.target.name}] ${polyfillMap.size} polyfill(s) via "${parsed.target.polyfillSuffix}"`,
      );
      ({ host } = createPolyfillHost(parsed.parsedConfig.options, polyfillMap, cache));
    } else {
      host = createCachedHost(parsed.parsedConfig.options, cache);
    }

    const typeCheckId = optionsSignature(
      parsed.parsedConfig.options,
      parsed.parsedConfig.fileNames,
      effSuffix,
    );
    const emitId = programIdentity(
      parsed.parsedConfig.options,
      parsed.parsedConfig.fileNames,
      parsed.resolvedImports,
      effSuffix,
      parsed.target.moduleType,
    );
    const baseEmitId = programIdentity(
      parsed.parsedConfig.options,
      parsed.parsedConfig.fileNames,
      parsed.resolvedImports,
      effSuffix,
    );

    const alreadyEmittedOutDir = emittedPrograms.get(emitId);
    const canReuseOutput = !!alreadyEmittedOutDir;
    // Check if an ESM target with the same base identity was already emitted,
    // allowing us to use esbuild to transform ESM→CJS instead of full tsc.
    const esmSourceDir =
      !canReuseOutput && parsed.target.moduleType === "commonjs"
        ? esmOutputsByBaseId.get(baseEmitId)
        : undefined;
    const canTransformFromEsm = !!esmSourceDir;
    const needsTypeCheck = !typeCheckedIds.has(typeCheckId);

    if (needsTypeCheck) typeCheckedIds.add(typeCheckId);
    if (!canReuseOutput) emittedPrograms.set(emitId, parsed.outDir);
    if (!parsed.target.moduleType || parsed.target.moduleType === "module") {
      esmOutputsByBaseId.set(baseEmitId, parsed.outDir);
    }

    const label = [];
    if (!needsTypeCheck) label.push("skip-typecheck");
    if (canReuseOutput) label.push("reuse-output");
    if (canTransformFromEsm) label.push("esm→cjs");

    log.info(
      `[warp] [${i + 1}/${total}] ${parsed.target.name}${label.length ? ` (${label.join(", ")})` : ""}...`,
    );

    let result: CompileResult;

    if (canReuseOutput && !needsTypeCheck) {
      // Both already done — pure copy
      const t0 = performance.now();
      await copyDir(alreadyEmittedOutDir, parsed.outDir);
      result = {
        target: parsed.target,
        diagnostics: [],
        success: true,
        outDir: parsed.outDir,
        rootDir: parsed.rootDir,
        compileTimeMs: performance.now() - t0,
        deduped: true,
      };
    } else if (canTransformFromEsm && !needsTypeCheck) {
      // CJS target with matching ESM output — transform via esbuild
      const t0 = performance.now();
      await transformEsmToCjs(esmSourceDir, parsed.outDir);
      result = {
        target: parsed.target,
        diagnostics: [],
        success: true,
        outDir: parsed.outDir,
        rootDir: parsed.rootDir,
        compileTimeMs: performance.now() - t0,
        deduped: true,
      };
    } else if (canTransformFromEsm) {
      // CJS with matching ESM but needs type-check — typecheck-only + transform
      result = await compileTarget(parsed, host, { typeCheck: true, skipEmit: true });
      if (result.success) {
        await transformEsmToCjs(esmSourceDir, parsed.outDir);
      }
    } else if (canReuseOutput) {
      // Need type-check but can reuse output — skipEmit + copy
      result = await compileTarget(parsed, host, { typeCheck: true, skipEmit: true });
      if (result.success) {
        await copyDir(alreadyEmittedOutDir, parsed.outDir);
      }
    } else {
      // First time seeing this emit identity — full or typecheck-less compile
      result = await compileTarget(parsed, host, { typeCheck: needsTypeCheck });
    }

    const timeLabel =
      (canReuseOutput || canTransformFromEsm) && !needsTypeCheck ? "copied" : "done";
    log.info(
      `[warp] [${i + 1}/${total}] ${parsed.target.name} ${timeLabel} (${result.compileTimeMs.toFixed(0)}ms)`,
    );

    results.push(result);
    if (!result.success) break;
  }

  return results;
}
