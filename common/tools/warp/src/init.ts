// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * `warp init` — scaffold a new warp.config.yml in the current directory.
 *
 * Detects existing tsconfigs and package.json to infer a reasonable starting
 * config, then writes a commented YAML file the user can customise.
 */

import * as fsp from "node:fs/promises";
import * as path from "node:path";
import { findWarpConfig } from "./config.ts";
import { getLogger } from "./logger.ts";

export interface InitOptions {
  /** Working directory. Defaults to process.cwd(). */
  cwd?: string;
}

interface DetectedTarget {
  name: string;
  condition?: string;
  tsconfig: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Detect likely entry point from package.json or file system. */
async function detectEntryPoint(packageRoot: string): Promise<string> {
  // Try reading package.json for "main" or "module" fields
  try {
    const pkgRaw: unknown = JSON.parse(
      await fsp.readFile(path.join(packageRoot, "package.json"), "utf-8"),
    );
    if (isRecord(pkgRaw) && typeof pkgRaw.main === "string" && pkgRaw.main.includes("src/")) {
      return pkgRaw.main;
    }
  } catch {
    // ignore
  }

  // Probe common source entry points
  for (const candidate of ["./src/index.ts", "./src/index.mts", "./src/main.ts"]) {
    try {
      await fsp.access(path.join(packageRoot, candidate));
      return candidate;
    } catch {
      // not found
    }
  }

  return "./src/index.ts";
}

/**
 * Scaffold a new warp.config.yml.
 */
export async function init(options: InitOptions = {}): Promise<void> {
  const log = getLogger();
  const cwd = options.cwd ?? process.cwd();
  const packageRoot = path.resolve(cwd);

  // Guard: don't overwrite existing config
  const existing = await findWarpConfig(packageRoot);
  if (existing) {
    log.error("[warp] A warp config already exists in this directory. Aborting init.");
    return;
  }

  // Default to a dual-format scaffold pointing at tsconfig.json.
  // Users can split into per-target tsconfigs later if needed.
  const detectedTargets: DetectedTarget[] = [
    { name: "esm", condition: "import", tsconfig: "tsconfig.json" },
    { name: "cjs", condition: "require", tsconfig: "tsconfig.json" },
  ];

  const entryPoint = await detectEntryPoint(packageRoot);

  // Build YAML content
  const targetsYaml = detectedTargets
    .map((t) => {
      let yaml = `  - name: ${t.name}\n    tsconfig: ${t.tsconfig}`;
      if (t.condition && t.condition !== t.name) {
        yaml = `  - name: ${t.name}\n    condition: ${t.condition}\n    tsconfig: ${t.tsconfig}`;
      }
      return yaml;
    })
    .join("\n");

  const yaml = `# Warp build configuration
# See: https://github.com/Azure/azure-sdk-for-js/blob/main/common/tools/warp/README.md

exports:
  "./package.json": "./package.json"
  ".": "${entryPoint}"

targets:
${targetsYaml}
`;

  const configPath = path.join(packageRoot, "warp.config.yml");
  await fsp.writeFile(configPath, yaml, "utf-8");
  log.info(`[warp] Created ${path.relative(packageRoot, configPath)}`);
  log.info("");
  log.info("[warp] Detected targets:");
  for (const t of detectedTargets) {
    const cond = t.condition ?? t.name;
    log.info(`  ${t.name} (${cond}) → ${t.tsconfig}`);
  }
  log.info("");
  log.info("[warp] Next steps:");
  log.info("  1. Review and edit warp.config.yml");
  log.info("  2. Ensure each tsconfig sets outDir and rootDir");
  log.info("  3. Run: warp build");
}
