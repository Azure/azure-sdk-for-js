// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as ts from "typescript";
import * as fs from "node:fs";
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

  return `${optionsStr}\0files:${filesHash}`;
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
  "sourceMap",
  "inlineSourceMap",
  "inlineSources",
  "importHelpers",
  "downlevelIteration",
  "esModuleInterop",
  "verbatimModuleSyntax",
  "isolatedModules",
  "emitDecoratorMetadata",
];

export function programIdentity(
  options: ts.CompilerOptions,
  fileNames: readonly string[],
  resolvedImports?: readonly string[],
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
  return hash.digest("hex").slice(0, 16);
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
// ---------------------------------------------------------------------------
// Compilation
// ---------------------------------------------------------------------------

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

}

/**
 * Compile a single target using the TypeScript compiler API.
 *
 * Performance optimizations controlled by options:
 * - `typeCheck: false` — skip getPreEmitDiagnostics (~30% faster)
 * - `skipEmit: true` — type-check only, no output files
 *
 * CJS→Node16 upgrade: when the tsconfig specifies `module: CommonJS`,
 * the effective options are upgraded to `module: Node16` +
 * `moduleResolution: Node16` so TypeScript can resolve package.json
 * `exports` and `imports` fields. A fresh host is created with these
 * options and patched to return `{"type":"commonjs"}` for the source
 * root's package.json, ensuring Node16 still emits CommonJS output.
 */
export function compileTarget(
  parsed: ParsedTargetConfig,
  host?: ts.CompilerHost,
  compileOptions?: CompileTargetOptions,
): CompileResult {
  const t0 = performance.now();
  const doTypeCheck = compileOptions?.typeCheck ?? true;
  const skipEmit = compileOptions?.skipEmit ?? false;

  const rootNames: readonly string[] = parsed.parsedConfig.fileNames;

  // Build effective compiler options with performance flags
  const effectiveOptions: ts.CompilerOptions = {
    ...parsed.parsedConfig.options,
  };

  if (skipEmit) {
    effectiveOptions.declaration = false;
    effectiveOptions.declarationMap = false;
    effectiveOptions.noEmit = true;
  }

  // Upgrade CommonJS to Node16 for modern module resolution.
  // CommonJS forces moduleResolution to Node10, which cannot resolve
  // package.json `exports`/`imports` fields. Node16 resolves them correctly
  // while still emitting CJS when the source root has {"type":"commonjs"}.
  let effectiveHost = host;
  if (effectiveOptions.module === ts.ModuleKind.CommonJS) {
    effectiveOptions.module = ts.ModuleKind.Node16;
    effectiveOptions.moduleResolution = ts.ModuleResolutionKind.Node16;

    // Build package.json override: inject {"type":"commonjs"} for the
    // source root directory (and its ancestors up to the real package.json).
    const overridePaths = new Map<string, string>();
    const cjsPackageJson = '{"type":"commonjs"}';
    const rootDir = parsed.rootDir ?? path.dirname(rootNames[0] ?? "");
    const absRoot = path.resolve(rootDir);

    let dir = absRoot;
    while (dir) {
      overridePaths.set(path.resolve(dir, "package.json"), cjsPackageJson);
      if (fs.existsSync(path.join(dir, "package.json"))) break;
      const parent = path.dirname(dir);
      if (parent === dir) break;
      dir = parent;
    }

    // Create a fresh host with the upgraded options so TypeScript's internal
    // resolution algorithms match the Node16 module kind.
    //
    // IMPORTANT: We do NOT use the shared SourceFile cache here. Under Node16,
    // TypeScript embeds `impliedNodeFormat` (CJS vs ESM) in each SourceFile
    // based on the nearest package.json. Our virtual {"type":"commonjs"}
    // override changes that format, so cached SourceFiles from ESM targets
    // would poison CJS output (and vice versa).
    const baseHost = ts.createCompilerHost(effectiveOptions);

    effectiveHost = {
      ...baseHost,
      readFile(fileName: string) {
        const override = overridePaths.get(path.resolve(fileName));
        if (override !== undefined) return override;
        return baseHost.readFile(fileName);
      },
    };
  }

  // Standard compilation path with shared SourceFile cache
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
 *
 * Within a dedup group (same optionsSignature), secondary targets are
 * fully identical and get copyDir without any compilation.
 */
export async function compileAllTargets(
  parsedConfigs: ParsedTargetConfig[],
  options?: { clean?: boolean },
): Promise<CompileResult[]> {
  const clean = options?.clean ?? true;

  validateOutDirs(parsedConfigs);

  const log = getLogger();
  const cache = new SharedSourceFileCache();

  // Clean outDirs before compilation (async / parallel) (#13)
  if (clean) {
    await Promise.all(parsedConfigs.map((pc) => cleanOutDir(pc.outDir)));
  }

  // Two-dimensional deduplication:
  //   emittedPrograms  → tracks emit identity (controls output reuse via copyDir)
  //   typeCheckedIds   → tracks type-check identity (controls whether we can skip tsc)
  const emittedPrograms = new Map<string, string>(); // emitId → outDir
  const typeCheckedIds = new Set<string>();

  const results: CompileResult[] = [];
  const total = parsedConfigs.length;

  for (let i = 0; i < total; i++) {
    const parsed = parsedConfigs[i];
    const host = createCachedHost(parsed.parsedConfig.options, cache);

    const typeCheckId = optionsSignature(parsed.parsedConfig.options, parsed.parsedConfig.fileNames);
    const emitId = programIdentity(
      parsed.parsedConfig.options,
      parsed.parsedConfig.fileNames,
      parsed.resolvedImports,
    );

    const alreadyEmittedOutDir = emittedPrograms.get(emitId);
    const canReuseOutput = !!alreadyEmittedOutDir;
    const needsTypeCheck = !typeCheckedIds.has(typeCheckId);

    if (needsTypeCheck) typeCheckedIds.add(typeCheckId);
    if (!canReuseOutput) emittedPrograms.set(emitId, parsed.outDir);

    const label = [];
    if (!needsTypeCheck) label.push("skip-typecheck");
    if (canReuseOutput) label.push("reuse-output");

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
    } else if (canReuseOutput) {
      // Need type-check but can reuse output — skipEmit + copy
      result = compileTarget(parsed, host, { typeCheck: true, skipEmit: true });
      if (result.success) {
        await copyDir(alreadyEmittedOutDir, parsed.outDir);
      }
    } else {
      // First time seeing this emit identity — full or typecheck-less compile
      result = compileTarget(parsed, host, { typeCheck: needsTypeCheck });
    }

    const timeLabel = canReuseOutput && !needsTypeCheck ? "copied" : "done";
    log.info(
      `[warp] [${i + 1}/${total}] ${parsed.target.name} ${timeLabel} (${result.compileTimeMs.toFixed(0)}ms)`,
    );

    results.push(result);

    // Fail-fast on first error
    if (!result.success) break;
  }

  return results;
}
