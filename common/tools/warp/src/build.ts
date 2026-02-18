// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as path from "node:path";
import { resolveWarpConfig, validateTsconfigPaths } from "./config.ts";
import { compileAllTargets, parseTargetTsConfig } from "./compiler.ts";
import type { CompileResult, ParsedTargetConfig } from "./compiler.ts";
import { formatDiagnostics } from "./diagnostics.ts";
import {
  resolveExportsMap,
  writeExportsToPackageJson,
  getExportsDiff,
  verifyDistFiles,
} from "./exports.ts";
import { generateSizeReport, formatSizeReport, writeSizeReportJson } from "./sizeReport.ts";
import type { SizeReport } from "./sizeReport.ts";
import type { WarpConfig, ResolvedWarpConfig } from "./types.ts";
import { getLogger } from "./logger.ts";

export interface BuildOptions {
  /** Working directory. Defaults to process.cwd(). */
  cwd?: string;
  /** Explicit path to a warp config file. Resolved as if it lives under cwd. */
  configPath?: string;
  /** When true, validate config and show exports diff without compiling. */
  dryRun?: boolean;
  /** When true (default), remove outDirs before compilation. */
  clean?: boolean;
  /** When true, use incremental compilation with .tsbuildinfo for faster warm builds. */
  incremental?: boolean;
  /** When true, compile independent targets in parallel using worker threads. */
  parallel?: boolean;
  /** When true, compute and display the size/API-surface report after building. */
  stats?: boolean;
}

export interface BuildResult {
  success: boolean;
  config: WarpConfig;
  /** Total wall-clock time in milliseconds. */
  totalTimeMs: number;
  /** Per-target compilation results (populated after compile step) (#18). */
  compileResults?: CompileResult[];
  /** Size report (populated on successful build) (#18). */
  sizeReport?: SizeReport;
}

// ---------------------------------------------------------------------------
// Pipeline steps (#17)
// ---------------------------------------------------------------------------

/** Step 1: Resolve and validate configuration. */
async function resolveStep(
  packageRoot: string,
  configPath?: string,
): Promise<{ resolved: ResolvedWarpConfig; parsedConfigs: ParsedTargetConfig[] }> {
  const log = getLogger();
  const resolved = await resolveWarpConfig(packageRoot, configPath);
  const { config, source } = resolved;

  // Validate tsconfig paths exist on disk (#10)
  const sourceLabel = source.type === "yaml" ? source.path : "package.json";
  await validateTsconfigPaths(config, packageRoot, sourceLabel);

  log.info(
    `[warp] Config: ${source.type === "yaml" ? path.relative(packageRoot, source.path) : "package.json"}`,
  );
  log.info(`[warp] Targets: ${config.targets.map((t) => `${t.name} (${t.condition})`).join(", ")}`);

  const parsedConfigs = config.targets.map((t) => parseTargetTsConfig(t, packageRoot));

  log.info("");
  for (const pc of parsedConfigs) {
    const relOut = path.relative(packageRoot, pc.outDir);
    const relRoot = path.relative(packageRoot, pc.rootDir);
    log.info(
      `[warp] ${pc.target.name}  tsconfig: ${pc.target.tsconfig}  outDir: ${relOut}  rootDir: ${relRoot}`,
    );
  }

  return { resolved, parsedConfigs };
}

/** Step 2: Compile all targets. */
async function compileStep(
  parsedConfigs: ParsedTargetConfig[],
  options: BuildOptions,
  packageRoot: string,
): Promise<{ results: CompileResult[]; compileTimeMs: number }> {
  const log = getLogger();
  log.info("");
  log.info("[warp] Compiling...");
  const compileStart = performance.now();

  let results: CompileResult[];

  if (options.parallel) {
    const { createWorkerPool, compileAllTargetsParallel } = await import("./parallel.js");
    const groups = (await import("./compiler.js")).groupBySignature(parsedConfigs);
    const pool = await createWorkerPool(groups.length);
    try {
      results = await compileAllTargetsParallel(
        parsedConfigs,
        {
          clean: options.clean ?? true,
          incremental: options.incremental ?? false,
          packageRoot,
        },
        pool,
      );
    } finally {
      pool.terminate();
    }
  } else {
    results = await compileAllTargets(parsedConfigs, {
      clean: options.clean ?? true,
      incremental: options.incremental ?? false,
    });
  }

  return { results, compileTimeMs: performance.now() - compileStart };
}

/** Step 3: Report diagnostics, rewrite exports, optionally generate size report. */
async function postCompileStep(
  results: CompileResult[],
  config: WarpConfig,
  parsedConfigs: ParsedTargetConfig[],
  packageRoot: string,
  parallel: boolean,
  stats: boolean,
): Promise<{ sizeReport: SizeReport | undefined; missingFiles: string[] }> {
  const log = getLogger();

  // Report diagnostics
  if (!parallel) {
    const diagnosticOutput = formatDiagnostics(results);
    if (diagnosticOutput) {
      log.info("");
      log.info(diagnosticOutput);
    }
  }

  // Rewrite exports in package.json
  const exportsMap = resolveExportsMap(config, results, packageRoot);
  const compilerModuleKinds = new Map<string, number | undefined>();
  for (const pc of parsedConfigs) {
    compilerModuleKinds.set(pc.target.name, pc.parsedConfig.options.module);
  }
  writeExportsToPackageJson(exportsMap, results, packageRoot, compilerModuleKinds);
  log.info("[warp] Updated exports in package.json");

  // Verify dist files exist
  const missingFiles = verifyDistFiles(exportsMap, packageRoot);
  if (missingFiles.length > 0) {
    log.warn(`[warp] Warning: ${missingFiles.length} dist file(s) missing:`);
    for (const f of missingFiles) {
      log.warn(`  - ${f}`);
    }
  }

  // Size report (opt-in via --stats)
  let sizeReport: SizeReport | undefined;
  if (stats) {
    sizeReport = await generateSizeReport(results, config, packageRoot);
    log.info("");
    log.info(formatSizeReport(sizeReport));

    if (process.env.CI === "true") {
      writeSizeReportJson(sizeReport, packageRoot);
      log.info("\n[warp] Wrote warp-size-report.json");
    }
  }

  return { sizeReport, missingFiles };
}

// ---------------------------------------------------------------------------
// Main build function
// ---------------------------------------------------------------------------

/**
 * Run the Warp build pipeline.
 */
export async function build(options: BuildOptions = {}): Promise<BuildResult> {
  const log = getLogger();
  const buildStart = performance.now();
  const cwd = options.cwd ?? process.cwd();
  const packageRoot = path.resolve(cwd);

  // Step 1: Resolve config
  const { resolved, parsedConfigs } = await resolveStep(packageRoot, options.configPath);
  const { config } = resolved;

  if (options.dryRun) {
    const mockResults = parsedConfigs.map((pc) => ({
      target: pc.target,
      diagnostics: [] as const,
      success: true,
      outDir: pc.outDir,
      rootDir: pc.rootDir,
      compileTimeMs: 0,
      deduped: false,
    }));

    const exportsMap = resolveExportsMap(config, mockResults, packageRoot);
    const diff = getExportsDiff(exportsMap, packageRoot);

    log.info("");
    log.info("[warp] Exports diff:");
    log.info(diff);
    log.info("");
    log.info("[warp] Dry run complete. No files written.");

    return { success: true, config, totalTimeMs: performance.now() - buildStart };
  }

  // Step 2: Compile
  const { results, compileTimeMs } = await compileStep(parsedConfigs, options, packageRoot);

  // Check for errors
  const hasErrors = results.some((r) => !r.success);
  if (hasErrors) {
    if (!options.parallel) {
      const diagnosticOutput = formatDiagnostics(results);
      if (diagnosticOutput) {
        log.info("");
        log.info(diagnosticOutput);
      }
    }
    const failedTargets = results.filter((r) => !r.success).map((r) => r.target.name);
    log.error(`\n[warp] Build failed for targets: ${failedTargets.join(", ")}`);
    return {
      success: false,
      config,
      totalTimeMs: performance.now() - buildStart,
      compileResults: results,
    };
  }

  // Step 3: Post-compile (exports, size report)
  const { sizeReport } = await postCompileStep(
    results,
    config,
    parsedConfigs,
    packageRoot,
    !!options.parallel,
    !!options.stats,
  );

  // Timing summary
  const totalTimeMs = performance.now() - buildStart;
  log.info("");
  log.info("[warp] Timing:");
  log.info(`  compile: ${compileTimeMs.toFixed(0)}ms`);
  for (const r of results) {
    const label = r.deduped ? "(copied)" : "(compiled)";
    log.info(`    ${r.target.name}: ${r.compileTimeMs.toFixed(0)}ms ${label}`);
  }
  log.info(`  total: ${totalTimeMs.toFixed(0)}ms`);

  log.info("\n[warp] Build complete.");
  return { success: true, config, totalTimeMs, compileResults: results, sizeReport };
}
