// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * tsgo compiler helpers for Warp.
 *
 * Provides resolution and single-target compilation via the TypeScript 7.0+
 * native compiler (`tsgo`). The orchestration (dedup, CJS derivation, polyfill
 * fallback) is handled by `compileAllTargets` in compiler.ts — tsgo is just
 * swapped in for individual eligible targets.
 */

import { execFile } from "node:child_process";
import * as fsp from "node:fs/promises";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import type { CompileResult, ParsedTargetConfig } from "./compiler.ts";
import { getLogger } from "./logger.ts";

const execFileAsync = promisify(execFile);

// ---------------------------------------------------------------------------
// tsgo binary resolution
// ---------------------------------------------------------------------------

/**
 * Locate the `tsgo` binary from the `@typescript/native-preview` package
 * (a direct dependency of warp).
 */
export function resolveTsgo(): string {
  const pkgUrl = import.meta.resolve("@typescript/native-preview/package.json");
  return fileURLToPath(new URL("bin/tsgo.js", pkgUrl));
}

/**
 * Get the tsgo version string by reading the package.json of @typescript/native-preview.
 */
export async function getTsgoVersion(): Promise<string | undefined> {
  try {
    const pkgUrl = import.meta.resolve("@typescript/native-preview/package.json");
    const pkgJson: { version?: string } = JSON.parse(
      await fsp.readFile(fileURLToPath(pkgUrl), "utf-8"),
    ) as { version?: string };
    return pkgJson.version;
  } catch {
    return undefined;
  }
}

// ---------------------------------------------------------------------------
// Single-target compilation via tsgo
// ---------------------------------------------------------------------------

/**
 * Compile a single target by invoking `tsgo --project <tsconfig>`.
 *
 * When the tsconfig lives outside the package root (virtual-extends case),
 * a temporary tsconfig is written that extends the real one, matching
 * warp's programmatic parsing behavior.
 */
export async function compileTargetWithTsgo(
  tsgoPath: string,
  parsed: ParsedTargetConfig,
  packageRoot: string,
  options?: { noEmit?: boolean },
): Promise<CompileResult> {
  const t0 = performance.now();
  const log = getLogger();

  const tsconfigPath = path.resolve(packageRoot, parsed.target.tsconfig);
  const tsconfigDir = path.dirname(tsconfigPath);
  const needsVirtualExtends = path.relative(packageRoot, tsconfigDir).startsWith("..");

  let projectArg: string;
  let tempConfigPath: string | undefined;

  if (needsVirtualExtends) {
    // Write a temporary tsconfig in the package root that extends the real one.
    // This ensures ${configDir} resolves to the package root, matching warp's
    // virtual-extends behavior in parseTargetTsConfig.
    tempConfigPath = path.join(
      packageRoot,
      `__warp_tsgo_${parsed.target.name}_${process.pid}_${Date.now()}.json`,
    );
    const virtualConfig = { extends: tsconfigPath };
    await fsp.writeFile(tempConfigPath, JSON.stringify(virtualConfig, null, 2));
    projectArg = tempConfigPath;
  } else {
    projectArg = tsconfigPath;
  }

  const args = ["--project", projectArg];

  if (options?.noEmit) {
    args.push("--noEmit");
  }

  try {
    log.verbose(`[warp] [${parsed.target.name}] Running: ${tsgoPath} ${args.join(" ")}`);

    const { stdout, stderr } = await execFileAsync(process.execPath, [tsgoPath, ...args], {
      cwd: packageRoot,
      timeout: 300_000, // 5 min timeout
      maxBuffer: 10 * 1024 * 1024, // 10MB
    });

    // Log informational output but don't treat it as diagnostics
    const output = [stdout, stderr].filter(Boolean).join("\n").trim();
    if (output) {
      log.verbose(`[warp] [${parsed.target.name}] tsgo output:\n${output}`);
    }

    return {
      target: parsed.target,
      diagnostics: [],
      success: true,
      outDir: parsed.outDir,
      rootDir: parsed.rootDir,
      compileTimeMs: performance.now() - t0,
      deduped: false,
    };
  } catch (err) {
    const execError = err as {
      stdout?: string;
      stderr?: string;
      code?: number;
      signal?: string;
      killed?: boolean;
    };
    const diagnosticOutput = [execError.stdout, execError.stderr].filter(Boolean).join("\n").trim();

    let failureReason: string;
    if (execError.killed || execError.signal === "SIGTERM") {
      failureReason = `[${parsed.target.name}] tsgo timed out after ${(300_000 / 1000).toFixed(0)}s`;
    } else if (diagnosticOutput) {
      failureReason = `[${parsed.target.name}] tsgo diagnostics:\n${diagnosticOutput}`;
    } else {
      failureReason = `[${parsed.target.name}] tsgo failed (exit code ${execError.code ?? "unknown"})`;
    }

    return {
      target: parsed.target,
      diagnostics: [],
      diagnosticText: failureReason,
      success: false,
      outDir: parsed.outDir,
      rootDir: parsed.rootDir,
      compileTimeMs: performance.now() - t0,
      deduped: false,
    };
  } finally {
    // Clean up temp config
    if (tempConfigPath) {
      await fsp.unlink(tempConfigPath).catch(() => {});
    }
  }
}

// ---------------------------------------------------------------------------
// Multi-target orchestration
// ---------------------------------------------------------------------------
