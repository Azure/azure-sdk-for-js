// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as fs from "node:fs";
import * as fsp from "node:fs/promises";
import * as path from "node:path";
import * as crypto from "node:crypto";
import { API, DiagnosticCategory, formatDiagnostics } from "typescript/async";
import type { Diagnostic, ParsedCommandLine, RawCompilerOptions } from "typescript/async";
import { createFileSystemLayer } from "typescript/fs";
import { nativePath, withCompilerApi } from "./compilerApi.ts";
import type { WarpTarget } from "./types.ts";
import { WarpError } from "./types.ts";
import { getLogger } from "./logger.ts";

export interface ParsedTargetConfig {
  target: WarpTarget;
  parsedConfig: ParsedCommandLine;
  outDir: string;
  rootDir: string;
  resolvedImports?: readonly string[];
}

export interface CompileResult {
  target: WarpTarget;
  diagnostics: readonly Diagnostic[];
  success: boolean;
  outDir: string;
  rootDir: string;
  compileTimeMs: number;
  deduped: boolean;
}

function isMissingFile(error: unknown): boolean {
  return error instanceof Error && "code" in error && error.code === "ENOENT";
}

/** Parse configs with the same native compiler used for diagnostics and emit. */
export async function parseTargetTsConfig(
  target: WarpTarget,
  packageRoot: string,
  api?: API,
): Promise<ParsedTargetConfig> {
  return withCompilerApi(api, async (client) => {
    const configPath = path.resolve(packageRoot, target.tsconfig);
    const external = path.relative(packageRoot, path.dirname(configPath)).startsWith("..");
    const parsedConfig = external
      ? await client.parseJsonConfigFileContent(
          { extends: nativePath(configPath) },
          {
            configFileName: nativePath(
              path.join(packageRoot, `__warp_virtual_${target.name}.json`),
            ),
          },
        )
      : await client.parseConfigFile(nativePath(configPath));
    if (parsedConfig.errors.length > 0) {
      throw new WarpError(
        "TSCONFIG_ERROR",
        `[warp] [${target.name}] Errors parsing ${configPath}:\n` +
          formatDiagnostics(parsedConfig.errors, client) +
          '\nIf this config uses "extends", verify that its base config exists.',
      );
    }
    const { outDir, rootDir } = parsedConfig.options;
    if (!outDir) {
      throw new WarpError(
        "TSCONFIG_ERROR",
        `[warp] [${target.name}] tsconfig ${configPath} must specify "outDir".`,
      );
    }
    if (parsedConfig.fileNames.length === 0) {
      throw new WarpError(
        "VALIDATION_ERROR",
        `[warp] [${target.name}] tsconfig ${configPath} matched zero source files.`,
      );
    }
    if (parsedConfig.projectReferences?.length) {
      throw new WarpError(
        "VALIDATION_ERROR",
        `[warp] [${target.name}] The native compiler prototype does not build project references yet.`,
      );
    }
    if (parsedConfig.options.noEmit || parsedConfig.options.emitDeclarationOnly) {
      throw new WarpError(
        "VALIDATION_ERROR",
        `[warp] [${target.name}] Warp requires JavaScript emit (noEmit and emitDeclarationOnly are unsupported).`,
      );
    }
    if (!rootDir) {
      getLogger().warn(
        `[warp] [${target.name}] Warning: tsconfig ${configPath} does not specify "rootDir". Output paths may be unpredictable.`,
      );
    }
    return {
      target,
      parsedConfig,
      outDir,
      rootDir: rootDir ?? (external ? packageRoot : path.dirname(configPath)),
    };
  });
}

export function validateOutDirs(
  configs: readonly Pick<ParsedTargetConfig, "target" | "outDir">[],
): void {
  const seen = new Map<string, string>();
  for (const config of configs) {
    const normalized = path.resolve(config.outDir);
    const existing = seen.get(normalized);
    if (existing) {
      throw new WarpError(
        "VALIDATION_ERROR",
        `[warp] Targets "${existing}" and "${config.target.name}" share the same outDir: ${normalized}. Each target must have a distinct outDir.`,
      );
    }
    seen.set(normalized, config.target.name);
  }
}

/** Discover replacements from the config's file list, respecting include/exclude. */
export async function discoverPolyfills(
  fileNames: readonly string[],
  suffix: string,
): Promise<Map<string, string>> {
  const replacements = new Map<string, string>();
  const byDir = new Map<string, string[]>();
  for (const file of fileNames) {
    if (!file.endsWith(".ts") || file.endsWith(".d.ts")) continue;
    const dir = path.dirname(file);
    const sources = byDir.get(dir) ?? [];
    sources.push(file);
    byDir.set(dir, sources);
  }
  await Promise.all(
    [...byDir].map(async ([dir, sources]) => {
      let entries: Set<string>;
      try {
        entries = new Set(await fsp.readdir(dir));
      } catch (error) {
        if (isMissingFile(error)) return;
        throw error;
      }
      for (const file of sources) {
        const stem = path.basename(file).slice(0, -3);
        const replacement = [".mts", ".cts", ".ts"]
          .map((ext) => `${stem}${suffix}${ext}`)
          .find((name) => entries.has(name));
        if (replacement) {
          replacements.set(path.resolve(file), path.join(dir, replacement));
        }
      }
    }),
  );
  return replacements;
}

function filterPolyfillRootNames(rootNames: readonly string[], suffix: string): string[] {
  return rootNames.filter((file) => {
    const base = path.basename(file);
    const ext = path.extname(base);
    return ![".ts", ".mts", ".cts"].includes(ext) || !base.slice(0, -ext.length).endsWith(suffix);
  });
}

function stableValue(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(stableValue);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([key, entry]) => [key, stableValue(entry)]),
    );
  }
  return value;
}

export function sourceIdentity(fileNames: readonly string[], polyfillSuffix?: string): string {
  const hash = crypto
    .createHash("sha256")
    .update([...fileNames].sort().join("\0"))
    .digest("hex");
  return `${hash}\0${polyfillSuffix ?? ""}`;
}

/** Full semantic options identity, including nested option values. */
export function optionsSignature(
  options: RawCompilerOptions,
  fileNames: readonly string[],
  polyfillSuffix?: string,
): string {
  const semanticOptions = { ...options, outDir: undefined, configFilePath: undefined };
  return `${JSON.stringify(stableValue(semanticOptions))}\0${sourceIdentity(fileNames, polyfillSuffix)}`;
}

export async function cleanOutDir(outDir: string): Promise<void> {
  await fsp.rm(outDir, { recursive: true, force: true });
}

/** Copy complete outputs, including maps and symlinks, with bounded I/O. */
export async function copyDir(src: string, dest: string): Promise<void> {
  const entries = await fsp.readdir(src, { withFileTypes: true, recursive: true });
  const dirs = new Set<string>([dest]);
  const copies: Array<() => Promise<unknown>> = [];
  for (const entry of entries) {
    const srcPath = path.join(entry.parentPath, entry.name);
    const destPath = path.join(dest, path.relative(src, srcPath));
    if (entry.isDirectory()) {
      dirs.add(destPath);
      continue;
    }
    dirs.add(path.dirname(destPath));
    if (entry.isSymbolicLink()) {
      copies.push(async () => {
        const link = await fsp.readlink(srcPath);
        const target = path.isAbsolute(link)
          ? link
          : path.relative(path.dirname(destPath), path.resolve(path.dirname(srcPath), link));
        await fsp.symlink(target, destPath);
      });
    } else {
      copies.push(() => fsp.copyFile(srcPath, destPath, fs.constants.COPYFILE_FICLONE));
    }
  }
  await Promise.all([...dirs].map((dir) => fsp.mkdir(dir, { recursive: true })));
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(64, copies.length) }, async () => {
      while (next < copies.length) await copies[next++]();
    }),
  );
}

function rebaseImportPaths(imports: unknown, realDir: string, virtualDir: string): unknown {
  if (typeof imports === "string" && imports.startsWith("./")) {
    return (
      "./" + path.relative(virtualDir, path.resolve(realDir, imports)).split(path.sep).join("/")
    );
  }
  if (Array.isArray(imports)) {
    return imports.map((entry: unknown) => rebaseImportPaths(entry, realDir, virtualDir));
  }
  if (imports && typeof imports === "object") {
    return Object.fromEntries(
      Object.entries(imports).map(([key, value]) => [
        key,
        rebaseImportPaths(value, realDir, virtualDir),
      ]),
    );
  }
  return imports;
}

async function commonJsOverlay(rootDir: string): Promise<[string, string][]> {
  const directories: string[] = [];
  let dir = path.resolve(rootDir);
  let realPackage: Record<string, unknown> | undefined;
  while (true) {
    directories.push(dir);
    const pkgPath = path.join(dir, "package.json");
    try {
      const pkg: unknown = JSON.parse(await fsp.readFile(pkgPath, "utf-8"));
      if (!pkg || typeof pkg !== "object" || Array.isArray(pkg)) {
        throw new WarpError("VALIDATION_ERROR", `[warp] Expected an object in ${pkgPath}.`);
      }
      realPackage = pkg as Record<string, unknown>;
      break;
    } catch (error) {
      if (!isMissingFile(error)) throw error;
    }
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return directories.map((virtualDir) => [
    nativePath(path.join(virtualDir, "package.json")),
    JSON.stringify({
      ...realPackage,
      type: "commonjs",
      imports: rebaseImportPaths(realPackage?.imports, dir, virtualDir),
    }),
  ]);
}

/**
 * One native process per build, reused for config parsing, all target snapshots,
 * import analysis, and optional size reporting. Native TypeScript schedules its
 * own threads; Warp never creates a CPU-sized pool of compiler processes.
 */
export class Compiler {
  readonly api: API;

  constructor(packageRoot: string) {
    this.api = new API({ cwd: nativePath(packageRoot) });
  }

  async close(): Promise<void> {
    await this.api.close();
  }

  async parseTargets(targets: WarpTarget[], packageRoot: string): Promise<ParsedTargetConfig[]> {
    const configs: ParsedTargetConfig[] = [];
    for (const target of targets) {
      configs.push(await parseTargetTsConfig(target, packageRoot, this.api));
    }
    validateOutDirs(configs);
    return configs;
  }

  async compileTargets(
    configs: ParsedTargetConfig[],
    options: { clean?: boolean },
  ): Promise<{ results: CompileResult[]; compileTimeMs: number }> {
    const started = performance.now();
    const log = getLogger();
    log.info("\n[warp] Native compiler: 1 process, 1 active target at a time");
    const emitted = new Map<string, string>();
    const results: CompileResult[] = [];
    if (options.clean ?? true) {
      await Promise.all(configs.map((config) => cleanOutDir(config.outDir)));
    }
    for (const config of configs) {
      const targetStart = performance.now();
      const { target, parsedConfig } = config;
      const polyfills = target.polyfillSuffix
        ? await discoverPolyfills(parsedConfig.fileNames, target.polyfillSuffix)
        : new Map<string, string>();
      const files: [string, string][] = [];
      for (const [original, replacement] of polyfills) {
        files.push([nativePath(original), await fsp.readFile(replacement, "utf-8")]);
      }
      if (target.moduleType === "commonjs") {
        files.push(...(await commonJsOverlay(config.rootDir)));
      }
      const rootFiles = target.polyfillSuffix
        ? filterPolyfillRootNames(parsedConfig.fileNames, target.polyfillSuffix)
        : parsedConfig.fileNames;

      // Exact semantic matches with sibling outDirs also have valid relative
      // source/declaration maps. External outputs and build info need their own emit.
      const opts = parsedConfig.options;
      const canCopy =
        !opts.incremental && !opts.composite && !opts.declarationDir && !opts.tsBuildInfoFile;
      const identity = JSON.stringify({
        signature: optionsSignature(opts, rootFiles),
        files: files.toSorted(([a], [b]) => a.localeCompare(b)),
        moduleType: target.moduleType ?? "module",
        outputParent: path.dirname(config.outDir),
        resolvedImports: config.resolvedImports,
      });
      const previous = canCopy ? emitted.get(identity) : undefined;
      let diagnostics: readonly Diagnostic[] = [];
      let emitSkipped = false;
      if (previous) {
        await copyDir(previous, config.outDir);
      } else {
        const snapshot = await this.api.createSnapshot({
          fileSystem: createFileSystemLayer(files),
          createPrograms: [{ rootFiles, compilerOptions: opts }],
        });
        try {
          const program = snapshot.operation.createdPrograms[0];
          try {
            diagnostics = [
              ...(await program.getConfigFileParsingDiagnostics()),
              ...(await program.getProgramDiagnostics()),
              ...(await program.getGlobalDiagnostics()),
              ...(await program.getSyntacticDiagnostics()),
              ...(await program.getSemanticDiagnostics()),
              ...(await program.getDeclarationDiagnostics()),
            ];
            const emit = await program.emit();
            diagnostics = [...diagnostics, ...emit.diagnostics];
            emitSkipped = emit.emitSkipped;
            if (emit.emitSkipped && diagnostics.length === 0) {
              throw new WarpError(
                "COMPILE_ERROR",
                `[warp] [${target.name}] Native compiler skipped emit without diagnostics.`,
              );
            }
          } finally {
            await program.dispose();
          }
        } finally {
          await snapshot.dispose();
        }
      }
      diagnostics = [...new Map(diagnostics.map((diag) => [JSON.stringify(diag), diag])).values()];
      const success =
        !emitSkipped && !diagnostics.some((diag) => diag.category === DiagnosticCategory.Error);
      results.push({
        target,
        diagnostics,
        success,
        outDir: config.outDir,
        rootDir: config.rootDir,
        compileTimeMs: performance.now() - targetStart,
        deduped: previous !== undefined,
      });
      log.info(
        `[warp] [${target.name}] ${previous ? "copied" : "compiled"} (${(performance.now() - targetStart).toFixed(0)}ms)`,
      );
      if (!success) break;
      if (canCopy) emitted.set(identity, config.outDir);
    }
    return { results, compileTimeMs: performance.now() - started };
  }
}
