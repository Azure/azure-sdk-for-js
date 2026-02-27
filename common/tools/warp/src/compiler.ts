// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as ts from "typescript";
import * as esbuild from "esbuild";
import * as fs from "node:fs";
import * as fsp from "node:fs/promises";
import * as path from "node:path";
import * as crypto from "node:crypto";
import type { WarpTarget } from "./types.ts";
import { WarpError } from "./types.ts";
import { inferModuleType } from "./config.ts";
import { getLogger } from "./logger.ts";

/**
 * Parsed tsconfig data needed for compilation and exports rewriting.
 */
export interface ParsedTargetConfig {
  target: WarpTarget;
  parsedConfig: ts.ParsedCommandLine;
  outDir: string;
  rootDir: string;
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
// Target deduplication
// ---------------------------------------------------------------------------

/**
 * Compute a signature for a target's compiler options + polyfill config
 * + file list. Targets with the same signature produce identical output
 * (modulo outDir) and can be compiled once then copied.
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
 * Compute a "source identity" hash — the set of source files that will be
 * type-checked. Two targets with the same source identity (same fileNames,
 * same polyfillSuffix) produce the same type-checking result regardless of
 * module format. The first target type-checked in a source group validates
 * types for all subsequent targets in that group.
 */
export function sourceIdentity(fileNames: readonly string[], polyfillSuffix?: string): string {
  const filesHash = crypto
    .createHash("sha256")
    .update([...fileNames].sort().join("\0"))
    .digest("hex")
    .slice(0, 16);
  return polyfillSuffix ? `${filesHash}\0polyfill:${polyfillSuffix}` : filesHash;
}

interface DedupGroup {
  /** The target that will be compiled. */
  primary: ParsedTargetConfig;
  /** Targets that share the same options and will receive copies. */
  copies: ParsedTargetConfig[];
}

/**
 * Group parsed targets by options signature (including polyfillSuffix and fileNames).
 * The first target in each group is the primary; the rest are copies.
 *
 * When `getEffectiveSuffix` is provided it overrides `target.polyfillSuffix`
 * for signature computation.  This lets callers exclude the suffix for
 * targets that have a configured polyfillSuffix but no actual polyfill files
 * on disk, enabling output deduplication across such targets.
 */
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
        const item = items.at(idx);
        if (item === undefined) return;
        await run(item);
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
      const linkTarget = await fsp.readlink(srcPath);
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
 * Copy only .d.ts and .d.ts.map files from src to dest, preserving directory structure (#14).
 */
export async function copyDtsFiles(src: string, dest: string): Promise<void> {
  // Single recursive readdir replaces O(depth) nested readdir calls.
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

  // Create all destination directories, then copy files with bounded concurrency
  await runWithConcurrency([...dirs], MAX_COPY_CONCURRENCY, (d) =>
    fsp.mkdir(d, { recursive: true }),
  );
  await runWithConcurrency(copies, MAX_COPY_CONCURRENCY, ({ srcPath, destPath }) =>
    fsp.copyFile(srcPath, destPath, fs.constants.COPYFILE_FICLONE),
  );
}

// ---------------------------------------------------------------------------
// Compilation
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Fast transpilation (esbuild)
// ---------------------------------------------------------------------------

/** Map TypeScript ScriptTarget to an esbuild target string. */
function tsTargetToEsbuild(target: ts.ScriptTarget | undefined): string {
  switch (target) {
    case ts.ScriptTarget.ES5:
      return "es5";
    case ts.ScriptTarget.ES2015:
      return "es2015";
    case ts.ScriptTarget.ES2016:
      return "es2016";
    case ts.ScriptTarget.ES2017:
      return "es2017";
    case ts.ScriptTarget.ES2018:
      return "es2018";
    case ts.ScriptTarget.ES2019:
      return "es2019";
    case ts.ScriptTarget.ES2020:
      return "es2020";
    case ts.ScriptTarget.ES2021:
      return "es2021";
    case ts.ScriptTarget.ES2022:
      return "es2022";
    case ts.ScriptTarget.ES2023:
      return "es2023";
    case ts.ScriptTarget.ES2024:
      return "es2024";
    default:
      return "esnext";
  }
}

/**
 * Transpile all source files using esbuild.
 * All transforms run concurrently via Promise.all.
 */
async function transpileWithEsbuild(
  sources: Array<{ fileName: string; content: string }>,
  options: ts.CompilerOptions,
  outDir: string,
  rootDir: string,
): Promise<Array<{ outPath: string; js: string; map?: string }>> {
  const format: esbuild.Format =
    options.module === ts.ModuleKind.CommonJS || options.module === ts.ModuleKind.None
      ? "cjs"
      : "esm";
  const target = tsTargetToEsbuild(options.target);
  const sourcemap = options.sourceMap !== false;

  return Promise.all(
    sources.map(async ({ fileName, content }) => {
      const result = await esbuild.transform(content, {
        loader: "ts",
        format,
        target,
        sourcemap: sourcemap ? "external" : false,
        sourcefile: fileName,
      });

      const relPath = path.relative(rootDir, fileName);
      const ext = path.extname(fileName);
      const outExt = ext === ".mts" ? ".mjs" : ext === ".cts" ? ".cjs" : ".js";
      const outPath = path.join(outDir, relPath.replace(/\.(ts|mts|cts)$/, outExt));

      return {
        outPath,
        js: result.code,
        map: result.map || undefined,
      };
    }),
  );
}

// ---------------------------------------------------------------------------
// transpileFiles fast path
// ---------------------------------------------------------------------------

/**
 * Fast-path compilation using esbuild for targets that skip type-checking
 * and declaration emit.
 *
 * ~3-10× faster than createProgram for format-only conversions because
 * it bypasses module resolution, program graph construction, and the type
 * system entirely.  All files are transpiled concurrently via esbuild.
 *
 * Used automatically for targets with typeCheck=false + skipDeclarations=true
 * (e.g. CommonJS re-emit of already-validated source files).
 */
export async function transpileFiles(
  parsed: ParsedTargetConfig,
  polyfillMap?: Map<string, string>,
): Promise<CompileResult> {
  const t0 = performance.now();
  const options: ts.CompilerOptions = {
    ...parsed.parsedConfig.options,
    declaration: false,
    declarationMap: false,
  };

  // esbuild cannot read package.json "type" to determine the module format
  // for .ts files under module: NodeNext/Node16. Resolve the ambiguity by
  // setting an unambiguous module kind derived from the target's moduleType
  // (or inferModuleType from compiler options).
  const moduleKind = options.module;
  if (moduleKind === ts.ModuleKind.NodeNext || moduleKind === ts.ModuleKind.Node16) {
    const effectiveType = parsed.target.moduleType ?? inferModuleType(moduleKind);
    if (effectiveType === "commonjs") {
      options.module = ts.ModuleKind.CommonJS;
      options.moduleResolution = ts.ModuleResolutionKind.Node10;
    } else {
      options.module = ts.ModuleKind.ESNext;
      options.moduleResolution = ts.ModuleResolutionKind.Bundler;
    }
  }

  let fileNames: string[] = parsed.parsedConfig.fileNames.filter((f) => !f.endsWith(".d.ts"));

  // Filter out polyfill source files (injected via content substitution)
  const suffix = parsed.target.polyfillSuffix;
  if (suffix) {
    fileNames = filterPolyfillRootNames(fileNames, suffix);
  }

  const { outDir, rootDir } = parsed;

  // Read all source files concurrently, applying polyfill substitution
  const sources = await Promise.all(
    fileNames.map(async (fileName) => {
      const absPath = path.resolve(fileName);
      const polyfillPath = polyfillMap?.get(absPath);
      const content = await fsp.readFile(polyfillPath ?? fileName, "utf-8");
      return { fileName, content };
    }),
  );

  const outputs = await transpileWithEsbuild(sources, options, outDir, rootDir);

  // Write output files
  const dirsNeeded = new Set(outputs.map((o) => path.dirname(o.outPath)));
  await runWithConcurrency([...dirsNeeded], MAX_COPY_CONCURRENCY, (d) =>
    fsp.mkdir(d, { recursive: true }),
  );

  const writeOps = outputs.flatMap(({ outPath, js, map }) => {
    const ops: Array<{ p: string; content: string }> = [{ p: outPath, content: js }];
    if (map) ops.push({ p: `${outPath}.map`, content: map });
    return ops;
  });

  await runWithConcurrency(writeOps, MAX_COPY_CONCURRENCY, ({ p, content }) =>
    fsp.writeFile(p, content, "utf-8"),
  );

  return {
    target: parsed.target,
    diagnostics: [],
    success: true,
    outDir,
    rootDir,
    compileTimeMs: performance.now() - t0,
    deduped: false,
  };
}

/**
 * Filter rootNames to exclude polyfill source files.
 * Uses basename-aware matching: a file is a polyfill if its basename
 * (without extension) ends with the suffix and the extension is .mts or .ts.
 */
function filterPolyfillRootNames(rootNames: readonly string[], suffix: string): string[] {
  return rootNames.filter((f) => {
    const base = path.basename(f);
    const ext = path.extname(base);
    if (ext !== ".mts" && ext !== ".ts") return true;
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
   * When true, skip declaration emit (set declaration:false in effective options).
   * Declarations will be copied from another target's outDir instead.
   */
  skipDeclarations?: boolean;
}

/**
 * Compile a single target using the TypeScript compiler API.
 *
 * Performance optimizations controlled by options:
 * - `typeCheck: false` — skip getPreEmitDiagnostics (~30% faster)
 * - `skipDeclarations: true` — emit JS only (~17% faster)
 *
 * When the target has a polyfillSuffix, polyfill source files are
 * filtered from rootNames (they are injected via the host instead)
 * so they don't produce extra `.mjs` output files.
 */
export function compileTarget(
  parsed: ParsedTargetConfig,
  host?: ts.CompilerHost,
  compileOptions?: CompileTargetOptions,
): CompileResult {
  const t0 = performance.now();
  const doTypeCheck = compileOptions?.typeCheck ?? true;
  const skipDecl = compileOptions?.skipDeclarations ?? false;

  let rootNames: readonly string[] = parsed.parsedConfig.fileNames;

  // Filter out polyfill source files so they don't produce extra output
  const suffix = parsed.target.polyfillSuffix;
  if (suffix) {
    rootNames = filterPolyfillRootNames(rootNames, suffix);
  }

  // Build effective compiler options with performance flags
  const effectiveOptions: ts.CompilerOptions = {
    ...parsed.parsedConfig.options,
  };

  if (skipDecl) {
    effectiveOptions.declaration = false;
    effectiveOptions.declarationMap = false;
  }

  // Standard compilation path with shared SourceFile cache
  const program = ts.createProgram({
    rootNames: [...rootNames],
    options: effectiveOptions,
    host,
  });
  const preEmit = doTypeCheck ? ts.getPreEmitDiagnostics(program) : [];

  const emitResult = program.emit();
  const allDiagnostics: readonly ts.Diagnostic[] = [...preEmit, ...emitResult.diagnostics];

  const compileTimeMs = performance.now() - t0;

  return {
    target: parsed.target,
    diagnostics: allDiagnostics,
    success: !allDiagnostics.some((d) => d.category === ts.DiagnosticCategory.Error),
    outDir: parsed.outDir,
    rootDir: parsed.rootDir,
    compileTimeMs,
    deduped: false,
  };
}

/**
 * Compile all targets with deduplication, shared source caching,
 * and per-target polyfill substitution via getSourceFile interception.
 *
 * Performance strategy:
 * - **Type check once per source set**: targets sharing the same source
 *   files (same fileNames + polyfillSuffix) are grouped into "source groups".
 *   Only the first target in each source group runs type checking. Subsequent
 *   targets skip getPreEmitDiagnostics.
 * - **Declaration sharing**: when multiple targets differ only in module format
 *   (same source identity), declarations are emitted once by the first target
 *   and .d.ts files are copied to subsequent targets' outDirs.
 * - **Deduplication**: targets with fully identical options + files are compiled
 *   once and the entire outDir is copied.
 *
 * Accepts pre-parsed configs to avoid redundant tsconfig parsing.
 */
export async function compileAllTargets(
  parsedConfigs: ParsedTargetConfig[],
  options?: { clean?: boolean },
): Promise<CompileResult[]> {
  const clean = options?.clean ?? true;

  validateOutDirs(parsedConfigs);

  const log = getLogger();

  // Pre-discover polyfills for all targets in parallel.  Targets whose
  // configured suffix matches zero actual files on disk are treated as
  // no-polyfill targets during dedup — they can share type-checking and
  // output with other targets that also have no polyfills.
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
  // This lets targets with different configured suffixes but no real polyfills
  // share the same dedup group and source identity.
  const getEffectiveSuffix = (pc: ParsedTargetConfig): string | undefined => {
    const map = polyfillResults.get(pc.target.name);
    return map && map.size > 0 ? pc.target.polyfillSuffix : undefined;
  };

  const groups = groupBySignature(parsedConfigs, getEffectiveSuffix);
  const cache = new SharedSourceFileCache();

  const dedupCount = parsedConfigs.length - groups.length;
  if (dedupCount > 0) {
    log.info(`[warp] Dedup: ${groups.length} unique compilation(s), ${dedupCount} copied`);
  }

  // Clean outDirs before compilation (async / parallel) (#13)
  if (clean) {
    await Promise.all(parsedConfigs.map((pc) => cleanOutDir(pc.outDir)));
  }

  // Track which source groups have been type-checked already.
  // Key: sourceIdentity hash. Value: outDir of the target that first type-checked this source set.
  const typeCheckedSources = new Map<string, string>();

  const resultMap = new Map<string, CompileResult>();

  let completedCount = 0;
  const totalTargets = parsedConfigs.length;

  for (const group of groups) {
    const suffix = group.primary.target.polyfillSuffix;
    const polyfillMap = polyfillResults.get(group.primary.target.name);
    const hasPolyfills = polyfillMap != null && polyfillMap.size > 0;

    let host: ts.CompilerHost;
    if (hasPolyfills) {
      const polyfillEntries = polyfillMap;
      log.info(
        `[warp] [${group.primary.target.name}] ${polyfillEntries.size} polyfill(s) via "${suffix}"`,
      );
      ({ host } = createPolyfillHost(group.primary.parsedConfig.options, polyfillEntries, cache));
    } else {
      host = createCachedHost(group.primary.parsedConfig.options, cache);
    }

    // Use effective suffix for sourceIdentity — targets with a configured
    // suffix but no actual polyfill files share the same source identity
    // as unsuffixed targets, enabling type-check dedup across them.
    const effSuffix = getEffectiveSuffix(group.primary);
    const srcId = sourceIdentity(group.primary.parsedConfig.fileNames, effSuffix);
    const alreadyCheckedOutDir = typeCheckedSources.get(srcId);
    const needsTypeCheck = !alreadyCheckedOutDir;
    const canSkipDeclarations = !!alreadyCheckedOutDir;

    if (needsTypeCheck) {
      typeCheckedSources.set(srcId, group.primary.outDir);
    }

    const label = [];
    if (!needsTypeCheck) label.push("skip-typecheck");
    if (canSkipDeclarations) label.push("skip-dts");

    // Progress indicator
    log.info(
      `[warp] [${completedCount + 1}/${totalTargets}] ${group.primary.target.name}${label.length > 0 ? ` (${label.join(", ")})` : ""}...`,
    );

    // Fast path: when type-checking and declarations are both skipped,
    // use transpileFiles (ts.transpileModule per-file) to bypass program
    // creation entirely — ~3-10× faster for format-only re-emit.
    let primaryResult: CompileResult;
    if (!needsTypeCheck && canSkipDeclarations) {
      primaryResult = await transpileFiles(group.primary, hasPolyfills ? polyfillMap : undefined);
    } else {
      primaryResult = compileTarget(group.primary, host, {
        typeCheck: needsTypeCheck,
        skipDeclarations: canSkipDeclarations,
      });
    }

    completedCount++;
    log.info(
      `[warp] [${completedCount}/${totalTargets}] ${group.primary.target.name} done (${primaryResult.compileTimeMs.toFixed(0)}ms)`,
    );

    // If we skipped declarations, copy .d.ts from the source group's first target
    if (canSkipDeclarations && alreadyCheckedOutDir && primaryResult.success) {
      await copyDtsFiles(alreadyCheckedOutDir, group.primary.outDir);
    }

    resultMap.set(group.primary.target.name, primaryResult);

    // Copy output to secondary targets (full dedup) — run copies in parallel
    // since they write to independent outDirs.
    if (group.copies.length > 0) {
      const copyResults = await Promise.all(
        group.copies.map(async (copy) => {
          const t0 = performance.now();
          if (primaryResult.success) {
            await copyDir(group.primary.outDir, copy.outDir);
          }
          const copyTimeMs = performance.now() - t0;
          return { copy, copyTimeMs };
        }),
      );

      for (const { copy, copyTimeMs } of copyResults) {
        completedCount++;
        log.info(
          `[warp] [${completedCount}/${totalTargets}] ${copy.target.name} copied (${copyTimeMs.toFixed(0)}ms)`,
        );

        resultMap.set(copy.target.name, {
          target: copy.target,
          diagnostics: primaryResult.diagnostics,
          success: primaryResult.success,
          outDir: copy.outDir,
          rootDir: copy.rootDir,
          compileTimeMs: copyTimeMs,
          deduped: true,
        });
      }
    }
  }

  // Return results in original target declaration order
  return parsedConfigs.map((pc) => resultMap.get(pc.target.name)!);
}
