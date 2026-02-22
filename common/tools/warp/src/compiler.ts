// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as ts from "typescript";
import * as fsp from "node:fs/promises";
import * as path from "node:path";
import * as crypto from "node:crypto";
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
}

/**
 * Parse and validate a target's tsconfig file.
 * Returns the parsed config along with resolved outDir and rootDir.
 */
export function parseTargetTsConfig(target: WarpTarget, packageRoot: string): ParsedTargetConfig {
  const tsconfigPath = path.resolve(packageRoot, target.tsconfig);
  const configFile = ts.readConfigFile(tsconfigPath, ts.sys.readFile);

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
    return this.cache.get(this.makeKey(fileName, target));
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

  for (const fileName of fileNames) {
    // Only .ts files can be polyfilled (skip .d.ts, .mts, .cts, .json, etc.)
    if (!fileName.endsWith(".ts") || fileName.endsWith(".d.ts")) continue;

    const stem = fileName.slice(0, -3); // strip .ts

    // Prefer .mts polyfill — use try/stat to avoid TOCTOU races (#5)
    const mtsPolyfill = `${stem}${suffix}.mts`;
    try {
      await fsp.stat(mtsPolyfill);
      // Use path.resolve for the key so it matches the lookup in createPolyfillHost,
      // which also uses path.resolve(fileName). This ensures correct behavior on
      // Windows where TypeScript normalizes paths to forward slashes but
      // path.resolve() returns backslashes.
      polyfillMap.set(path.resolve(fileName), mtsPolyfill);
      continue;
    } catch {
      // not found — fall through
    }

    // Fall back to .ts polyfill
    const tsPolyfill = `${stem}${suffix}.ts`;
    try {
      await fsp.stat(tsPolyfill);
      polyfillMap.set(path.resolve(fileName), tsPolyfill);
    } catch {
      // not found — no polyfill for this file
    }
  }

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
          const cacheKey2 = `${absPath}\0${scriptTarget}`;
          polyfillCache.set(cacheKey2, sf);
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
 */
export function groupBySignature(configs: ParsedTargetConfig[]): DedupGroup[] {
  const map = new Map<string, DedupGroup>();
  for (const pc of configs) {
    const sig = optionsSignature(
      pc.parsedConfig.options,
      pc.parsedConfig.fileNames,
      pc.target.polyfillSuffix,
    );
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
  try {
    await fsp.rm(outDir, { recursive: true, force: true });
  } catch {
    // directory does not exist — nothing to clean
  }
}

/**
 * Recursively copy a directory tree, correctly handling symlinks (#14).
 */
export async function copyDir(src: string, dest: string): Promise<void> {
  await fsp.mkdir(dest, { recursive: true });
  const entries = await fsp.readdir(src, { withFileTypes: true });
  await Promise.all(
    entries.map(async (entry) => {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);
      if (entry.isSymbolicLink()) {
        const linkTarget = await fsp.readlink(srcPath);
        if (path.isAbsolute(linkTarget)) {
          await fsp.symlink(linkTarget, destPath);
        } else {
          const absTarget = path.resolve(path.dirname(srcPath), linkTarget);
          const relTarget = path.relative(path.dirname(destPath), absTarget);
          await fsp.symlink(relTarget, destPath);
        }
      } else if (entry.isDirectory()) {
        await copyDir(srcPath, destPath);
      } else {
        await fsp.copyFile(srcPath, destPath);
      }
    }),
  );
}

/**
 * Copy only .d.ts and .d.ts.map files from src to dest, preserving directory structure (#14).
 */
export async function copyDtsFiles(src: string, dest: string): Promise<void> {
  await fsp.mkdir(dest, { recursive: true });
  const entries = await fsp.readdir(src, { withFileTypes: true });
  await Promise.all(
    entries.map(async (entry) => {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);
      if (entry.isDirectory()) {
        await copyDtsFiles(srcPath, destPath);
      } else if (entry.name.endsWith(".d.ts") || entry.name.endsWith(".d.ts.map")) {
        await fsp.copyFile(srcPath, destPath);
      }
    }),
  );
}

// ---------------------------------------------------------------------------
// Compilation
// ---------------------------------------------------------------------------

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
  /** When true, use incremental compilation with .tsbuildinfo. Default: false. */
  incremental?: boolean;
}

/**
 * Compile a single target using the TypeScript compiler API.
 *
 * Performance optimizations controlled by options:
 * - `typeCheck: false` — skip getPreEmitDiagnostics (~30% faster)
 * - `skipDeclarations: true` — emit JS only (~17% faster)
 * - `incremental: true` — use .tsbuildinfo for warm build speedup (~60% faster on warm)
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
  const incremental = compileOptions?.incremental ?? false;

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

  if (incremental) {
    effectiveOptions.incremental = true;
    effectiveOptions.tsBuildInfoFile = path.join(parsed.outDir, ".tsbuildinfo");
  }

  let allDiagnostics: readonly ts.Diagnostic[];

  if (incremental) {
    // Incremental compilation uses .tsbuildinfo for warm build speedup.
    // We use a plain incremental host (no custom cache) because the
    // incremental builder requires source files with version metadata
    // that createIncrementalCompilerHost provides. The .tsbuildinfo file
    // replaces the SharedSourceFileCache for incremental builds.
    const incrHost = ts.createIncrementalCompilerHost(effectiveOptions);
    const builder = ts.createIncrementalProgram({
      rootNames: [...rootNames],
      options: effectiveOptions,
      host: incrHost,
    });
    const program = builder.getProgram();
    const preEmit = doTypeCheck ? ts.getPreEmitDiagnostics(program) : [];
    const emitResult = builder.emit();
    allDiagnostics = [...preEmit, ...emitResult.diagnostics];
  } else {
    // Standard compilation path with shared SourceFile cache
    const program = ts.createProgram({
      rootNames: [...rootNames],
      options: effectiveOptions,
      host,
    });
    const preEmit = doTypeCheck ? ts.getPreEmitDiagnostics(program) : [];
    const emitResult = program.emit();
    allDiagnostics = [...preEmit, ...emitResult.diagnostics];
  }

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
 * - **Incremental compilation**: when enabled, uses .tsbuildinfo files for
 *   ~60% faster warm builds.
 * - **Deduplication**: targets with fully identical options + files are compiled
 *   once and the entire outDir is copied.
 *
 * Accepts pre-parsed configs to avoid redundant tsconfig parsing.
 */
export async function compileAllTargets(
  parsedConfigs: ParsedTargetConfig[],
  options?: { clean?: boolean; incremental?: boolean },
): Promise<CompileResult[]> {
  const clean = options?.clean ?? true;
  const incremental = options?.incremental ?? false;

  validateOutDirs(parsedConfigs);
  const groups = groupBySignature(parsedConfigs);
  const cache = new SharedSourceFileCache();

  const log = getLogger();

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

  for (const group of groups) {
    const suffix = group.primary.target.polyfillSuffix;

    let host: ts.CompilerHost;
    if (suffix) {
      const polyfillMap = await discoverPolyfills(group.primary.parsedConfig.fileNames, suffix);
      if (polyfillMap.size > 0) {
        log.info(
          `[warp] [${group.primary.target.name}] ${polyfillMap.size} polyfill(s) via "${suffix}"`,
        );
      }
      ({ host } = createPolyfillHost(group.primary.parsedConfig.options, polyfillMap, cache));
    } else {
      host = createCachedHost(group.primary.parsedConfig.options, cache);
    }

    // Determine if this source set has already been type-checked
    const srcId = sourceIdentity(group.primary.parsedConfig.fileNames, suffix);
    const alreadyCheckedOutDir = typeCheckedSources.get(srcId);
    const needsTypeCheck = !alreadyCheckedOutDir;
    const canSkipDeclarations = !!alreadyCheckedOutDir;

    if (needsTypeCheck) {
      typeCheckedSources.set(srcId, group.primary.outDir);
    }

    const label = [];
    if (!needsTypeCheck) label.push("skip-typecheck");
    if (canSkipDeclarations) label.push("skip-dts");
    if (label.length > 0) {
      log.info(`[warp] [${group.primary.target.name}] ${label.join(", ")}`);
    }

    const primaryResult = compileTarget(group.primary, host, {
      typeCheck: needsTypeCheck,
      skipDeclarations: canSkipDeclarations,
      // Incremental mode is incompatible with polyfill host (custom getSourceFile
      // returns SourceFiles without version metadata required by the builder).
      incremental: incremental && !suffix,
    });

    // If we skipped declarations, copy .d.ts from the source group's first target
    if (canSkipDeclarations && alreadyCheckedOutDir && primaryResult.success) {
      await copyDtsFiles(alreadyCheckedOutDir, group.primary.outDir);
    }

    resultMap.set(group.primary.target.name, primaryResult);

    // Copy output to secondary targets (full dedup)
    for (const copy of group.copies) {
      const t0 = performance.now();
      if (primaryResult.success) {
        await copyDir(group.primary.outDir, copy.outDir);
      }
      const copyTimeMs = performance.now() - t0;

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

  // Return results in original target declaration order
  return parsedConfigs.map((pc) => resultMap.get(pc.target.name)!);
}
