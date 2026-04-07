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
  hash.update(JSON.stringify(emitOpts));
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

// ── Aliases consumed by parallel.ts (will be removed when parallel.ts adopts programIdentity) ──

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
 * Build output in a different module format from TypeScript sources using
 * esbuild, copying declarations from a previously emitted target.
 *
 * When two targets share the same program identity but differ only in module
 * format (e.g., ESM vs CJS), the derived target can skip a full tsc pass.
 * For each `.ts` source file (relative to `rootDir`), esbuild strips types
 * and emits the requested format (`.js` + `.js.map`) into `dest`, preserving
 * directory structure. Source maps point directly to the original `.ts` files.
 *
 * Declaration files (`.d.ts`, `.d.ts.map`) are copied as-is from the source
 * target's output since they are identical regardless of module format.
 */
export async function buildTransformedOutput(
  rootDir: string,
  dest: string,
  sourceOutDir: string,
  format: "cjs" | "esm",
): Promise<void> {
  const absRoot = path.resolve(rootDir);

  // Derive which source files to transform by inspecting the source target's output.
  // The source target may use entry-point includes (e.g., ["./src/index.ts"])
  // but TypeScript still emits .js for every file in the import graph.
  // We map each emitted .js/.mjs back to its .ts/.mts source in rootDir.
  const tsFiles: Array<{ srcPath: string; relPath: string; destPath: string }> = [];
  const sourceEntries = await fsp.readdir(sourceOutDir, { withFileTypes: true, recursive: true });
  for (const entry of sourceEntries) {
    if (!entry.isFile()) continue;
    const name = entry.name;
    // Skip declaration and map files
    if (name.endsWith(".d.ts") || name.endsWith(".d.mts") || name.endsWith(".d.cts")) continue;
    if (name.endsWith(".map")) continue;

    let srcExt: string;
    let outExt: string;
    if (name.endsWith(".mjs")) {
      srcExt = ".mts";
      outExt = ".mjs";
    } else if (name.endsWith(".cjs")) {
      srcExt = ".cts";
      outExt = ".cjs";
    } else if (name.endsWith(".js")) {
      srcExt = ".ts";
      outExt = ".js";
    } else {
      continue;
    }

    const parentPath = entry.parentPath ?? (entry as { path: string }).path;
    const relPath = path.relative(sourceOutDir, path.join(parentPath, name));
    const relNoExt = relPath.slice(0, -outExt.length);
    const srcPath = path.join(absRoot, relNoExt + srcExt);

    // Verify the source file exists (it should, since ESM emitted output for it)
    try {
      await fsp.access(srcPath);
    } catch {
      continue;
    }

    tsFiles.push({
      srcPath,
      relPath: relNoExt + srcExt,
      destPath: path.join(dest, relPath),
    });
  }

  // Collect declaration files from source target's output to copy
  const dtsFiles: Array<{ srcPath: string; destPath: string }> = [];
  try {
    const entries = await fsp.readdir(sourceOutDir, { withFileTypes: true, recursive: true });
    for (const entry of entries) {
      if (!entry.isFile()) continue;
      if (
        !entry.name.endsWith(".d.ts") &&
        !entry.name.endsWith(".d.ts.map") &&
        !entry.name.endsWith(".d.mts") &&
        !entry.name.endsWith(".d.mts.map") &&
        !entry.name.endsWith(".d.cts") &&
        !entry.name.endsWith(".d.cts.map")
      )
        continue;
      const parentPath = entry.parentPath ?? (entry as { path: string }).path;
      const srcPath = path.join(parentPath, entry.name);
      const relPath = path.relative(sourceOutDir, srcPath);
      dtsFiles.push({ srcPath, destPath: path.join(dest, relPath) });
    }
  } catch {
    // ESM output dir may not have declarations if declarationMap is off — that's fine
  }

  // Collect all directories we need to create
  const dirs = new Set<string>();
  for (const { destPath } of tsFiles) dirs.add(path.dirname(destPath));
  for (const { destPath } of dtsFiles) dirs.add(path.dirname(destPath));

  await runWithConcurrency([...dirs], MAX_COPY_CONCURRENCY, (d) =>
    fsp.mkdir(d, { recursive: true }),
  );

  const ops: Array<() => Promise<void>> = [
    // Transform TS sources via esbuild
    ...tsFiles.map(({ srcPath, destPath }) => async () => {
      const source = await fsp.readFile(srcPath, "utf-8");
      // Choose format per-file: .mjs must stay ESM, .cjs must stay CJS,
      // .js uses the target's requested format.
      const fileFormat = destPath.endsWith(".mjs")
        ? "esm"
        : destPath.endsWith(".cjs")
          ? "cjs"
          : format;
      const result = await esbuildTransform(source, {
        format: fileFormat,
        loader: "ts",
        sourcemap: "external",
        // Use relative path from dest to source so maps point to .ts files
        sourcefile: path.relative(path.dirname(destPath), srcPath),
        platform: "node",
      });
      const mapFile = path.basename(destPath) + ".map";
      const code = result.code + `//# sourceMappingURL=${mapFile}\n`;
      await Promise.all([
        fsp.writeFile(destPath, code),
        fsp.writeFile(destPath + ".map", result.map),
      ]);
    }),
    // Copy declaration files from ESM output
    ...dtsFiles.map(
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

    // Layer virtual package.json overrides on top of the existing host
    // (which may be a polyfill host). We must NOT replace the host entirely
    // or we lose polyfill source-file substitution.
    //
    // NOTE: CJS targets with polyfills already receive an isolated
    // SharedSourceFileCache (see compileAllTargets) to prevent
    // impliedNodeFormat poisoning from ESM SourceFile entries.
    const existingHost = host!;
    effectiveHost = {
      ...existingHost,
      fileExists(fileName: string) {
        if (overridePaths.has(path.resolve(fileName))) return true;
        return existingHost.fileExists(fileName);
      },
      readFile(fileName: string) {
        const override = overridePaths.get(path.resolve(fileName));
        if (override !== undefined) return override;
        return existingHost.readFile(fileName);
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
  // Track the first emitted target per base identity (without moduleType)
  // so that subsequent targets with the same base identity but a different
  // moduleType can derive their output via esbuild transform.
  const emittedBaseTargets = new Map<string, { outDir: string; rootDir: string }>();

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
      // CJS targets get an isolated cache to avoid impliedNodeFormat poisoning:
      // under Node16, TypeScript embeds CJS vs ESM format in each SourceFile
      // based on the nearest package.json. Our virtual {"type":"commonjs"}
      // override changes that format, so sharing cache with ESM targets would
      // produce wrong output.
      const hostCache =
        parsed.target.moduleType === "commonjs" ? new SharedSourceFileCache() : cache;
      ({ host } = createPolyfillHost(parsed.parsedConfig.options, polyfillMap, hostCache));
    } else {
      // CJS targets get an isolated cache for the same impliedNodeFormat reason.
      const hostCache =
        parsed.target.moduleType === "commonjs" ? new SharedSourceFileCache() : cache;
      host = createCachedHost(parsed.parsedConfig.options, hostCache);
    }

    const typeCheckId = optionsSignature(
      parsed.parsedConfig.options,
      parsed.parsedConfig.fileNames,
      effSuffix,
    );
    // Normalize moduleType so that an omitted value ("module" by default) still
    // produces a distinct emitId from targets with explicit "commonjs", enabling
    // the esbuild transform fast path regardless of target ordering.
    const effectiveModuleType = parsed.target.moduleType ?? "module";
    const emitId = programIdentity(
      parsed.parsedConfig.options,
      parsed.parsedConfig.fileNames,
      parsed.resolvedImports,
      effSuffix,
      effectiveModuleType,
    );
    const baseEmitId = programIdentity(
      parsed.parsedConfig.options,
      parsed.parsedConfig.fileNames,
      parsed.resolvedImports,
      effSuffix,
    );

    const alreadyEmittedOutDir = emittedPrograms.get(emitId);
    // Check if a target with the same base identity (ignoring moduleType)
    // was already emitted, allowing us to derive output via esbuild transform.
    const transformSource =
      !alreadyEmittedOutDir && emitId !== baseEmitId
        ? emittedBaseTargets.get(baseEmitId)
        : undefined;
    const needsTypeCheck = !typeCheckedIds.has(typeCheckId);

    if (needsTypeCheck) typeCheckedIds.add(typeCheckId);
    if (!alreadyEmittedOutDir) emittedPrograms.set(emitId, parsed.outDir);
    if (!emittedBaseTargets.has(baseEmitId)) {
      emittedBaseTargets.set(baseEmitId, {
        outDir: parsed.outDir,
        rootDir: parsed.rootDir,
      });
    }

    const label = [];
    if (!needsTypeCheck) label.push("skip-typecheck");
    if (alreadyEmittedOutDir) label.push("reuse-output");
    if (transformSource) label.push(`esbuild-${effectiveModuleType}`);

    log.info(
      `[warp] [${i + 1}/${total}] ${parsed.target.name}${label.length ? ` (${label.join(", ")})` : ""}...`,
    );

    let result: CompileResult;

    const esbuildFormat = effectiveModuleType === "commonjs" ? "cjs" : "esm";

    if (alreadyEmittedOutDir && !needsTypeCheck) {
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
    } else if (transformSource && !needsTypeCheck) {
      // Derived target — transform sources via esbuild, copy .d.ts from source target
      const t0 = performance.now();
      try {
        await buildTransformedOutput(
          transformSource.rootDir,
          parsed.outDir,
          transformSource.outDir,
          esbuildFormat,
        );
        result = {
          target: parsed.target,
          diagnostics: [],
          success: true,
          outDir: parsed.outDir,
          rootDir: parsed.rootDir,
          compileTimeMs: performance.now() - t0,
          deduped: true,
        };
      } catch (err) {
        result = {
          target: parsed.target,
          diagnostics: [],
          success: false,
          outDir: parsed.outDir,
          rootDir: parsed.rootDir,
          compileTimeMs: performance.now() - t0,
          deduped: true,
          diagnosticText: `esbuild transform failed: ${err instanceof Error ? err.message : String(err)}`,
        };
      }
    } else if (transformSource) {
      // Derived target but needs type-check — typecheck-only + esbuild transform
      result = await compileTarget(parsed, host, { typeCheck: true, skipEmit: true });
      if (result.success) {
        try {
          await buildTransformedOutput(
            transformSource.rootDir,
            parsed.outDir,
            transformSource.outDir,
            esbuildFormat,
          );
        } catch (err) {
          result = {
            target: parsed.target,
            diagnostics: [],
            success: false,
            outDir: parsed.outDir,
            rootDir: parsed.rootDir,
            compileTimeMs: result.compileTimeMs,
            deduped: true,
            diagnosticText: `esbuild transform failed: ${err instanceof Error ? err.message : String(err)}`,
          };
        }
      }
    } else if (alreadyEmittedOutDir) {
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
      (alreadyEmittedOutDir || transformSource) && !needsTypeCheck ? "copied" : "done";
    log.info(
      `[warp] [${i + 1}/${total}] ${parsed.target.name} ${timeLabel} (${result.compileTimeMs.toFixed(0)}ms)`,
    );

    results.push(result);
    if (!result.success) break;
  }

  return results;
}
