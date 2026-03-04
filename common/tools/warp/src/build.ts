// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as path from "node:path";
import { findWarpConfig, validateTsconfigPaths } from "./config.ts";
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
import { WarpError } from "./types.ts";
import { getLogger } from "./logger.ts";

export interface BuildOptions {
  /** Working directory. Defaults to process.cwd(). */
  cwd?: string;
  /** Explicit path to a warp config file. Resolved as if it lives under cwd. */
  configPath?: string;
  /** Pre-resolved config from {@link findWarpConfig}. Skips file discovery when provided. */
  config?: ResolvedWarpConfig;
  /** When true, validate config and show exports diff without compiling. */
  dryRun?: boolean;
  /** When true (default), remove outDirs before compilation. */
  clean?: boolean;
  /** When true, compile independent targets in parallel using worker threads. */
  parallel?: boolean;
  /** When true, compute and display the size/API-surface report after building. */
  stats?: boolean;
  /** Only build targets whose name matches one of the given values. */
  target?: string[];
  /** When true, suppress human-readable output (for machine-readable JSON from CLI). */
  json?: boolean;
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
  target?: string[],
  preResolved?: ResolvedWarpConfig,
): Promise<{ resolved: ResolvedWarpConfig; parsedConfigs: ParsedTargetConfig[] }> {
  const log = getLogger();

  const found = preResolved ?? (await findWarpConfig(packageRoot, configPath));
  if (!found) {
    throw new WarpError(
      "CONFIG_NOT_FOUND",
      `[warp] No Warp configuration found in ${packageRoot}.\nCreate a warp.config.yml/warp.config.json file or add a "warp" key to package.json.`,
    );
  }

  let resolved = found;
  let { config } = resolved;
  const { source } = resolved;

  // Apply --target: reduce targets to only those matching the given names
  if (target && target.length > 0) {
    const filtered = config.targets.filter((t) => target.includes(t.name));
    const unknown = target.filter((f) => !config.targets.some((t) => t.name === f));
    if (unknown.length > 0) {
      const available = config.targets.map((t) => t.name).join(", ");
      throw new WarpError(
        "VALIDATION_ERROR",
        `[warp] Unknown target(s) in --target: ${unknown.join(", ")}. Available: ${available}`,
      );
    }
    if (filtered.length === 0) {
      throw new WarpError("VALIDATION_ERROR", `[warp] --target matched zero targets.`);
    }
    config = { ...config, targets: filtered };
    resolved = { config, source };
    log.info(`[warp] Target filter: building ${filtered.map((t) => t.name).join(", ")} only`);
  }

  // Validate tsconfig paths exist on disk (#10)
  const sourceLabel = source.type === "package.json" ? "package.json" : source.path;
  await validateTsconfigPaths(config, packageRoot, sourceLabel);

  log.info(
    `[warp] Config: ${source.type === "package.json" ? "package.json" : path.relative(packageRoot, source.path)}`,
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
  const targetCount = parsedConfigs.length;
  log.info("");
  log.info(`[warp] Compiling ${targetCount} target(s)...`);
  const compileStart = performance.now();

  let results: CompileResult[];

  if (options.parallel) {
    const { compileAllTargetsParallel } = await import("./parallel.js");
    results = await compileAllTargetsParallel(parsedConfigs, {
      clean: options.clean ?? true,
      packageRoot,
    });
  } else {
    results = await compileAllTargets(parsedConfigs, {
      clean: options.clean ?? true,
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
  skipPackageJsonUpdate: boolean,
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
  if (skipPackageJsonUpdate) {
    log.info("[warp] Filtered build: skipping package.json exports update");
  } else {
    const compilerModuleKinds = new Map<string, number | undefined>();
    for (const pc of parsedConfigs) {
      compilerModuleKinds.set(pc.target.name, pc.parsedConfig.options.module);
    }
    await writeExportsToPackageJson(exportsMap, results, packageRoot, compilerModuleKinds);
    log.info("[warp] Updated exports in package.json");
  }

  // Verify dist files exist
  const missingFiles = await verifyDistFiles(exportsMap, packageRoot);
  if (missingFiles.length > 0) {
    log.error(`[warp] ${missingFiles.length} dist file(s) missing after compilation:`);
    for (const f of missingFiles) {
      log.error(`  - ${f}`);
    }
  }

  // Size report (opt-in via --stats)
  let sizeReport: SizeReport | undefined;
  if (stats) {
    sizeReport = await generateSizeReport(results, config, packageRoot);
    log.info("");
    log.info(formatSizeReport(sizeReport));

    if (process.env.CI === "true") {
      await writeSizeReportJson(sizeReport, packageRoot);
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
  const { resolved, parsedConfigs } = await resolveStep(
    packageRoot,
    options.configPath,
    options.target,
    options.config,
  );
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
    const diff = await getExportsDiff(exportsMap, packageRoot);

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
    log.flush();
    return {
      success: false,
      config,
      totalTimeMs: performance.now() - buildStart,
      compileResults: results,
    };
  }

  // Step 3: Post-compile (exports, size report)
  const { sizeReport, missingFiles } = await postCompileStep(
    results,
    config,
    parsedConfigs,
    packageRoot,
    !!options.parallel,
    !!options.stats,
    !!(options.target && options.target.length > 0),
  );

  // Fail the build if expected dist files are missing
  if (missingFiles.length > 0) {
    log.error(
      `[warp] Build failed (DIST_MISSING): ${missingFiles.length} expected output file(s) were not produced.`,
    );
    log.flush();
    return {
      success: false,
      config,
      totalTimeMs: performance.now() - buildStart,
      compileResults: results,
      sizeReport,
    };
  }

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
  log.clear();
  return { success: true, config, totalTimeMs, compileResults: results, sizeReport };
}
