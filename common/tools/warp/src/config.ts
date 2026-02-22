// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as fsp from "node:fs/promises";
import * as path from "node:path";
import { parse as parseYaml } from "yaml";
import type {
  WarpConfig,
  WarpTarget,
  ResolvedWarpConfig,
  ConfigSource,
  ModuleType,
} from "./types.ts";
import { WarpError } from "./types.ts";
import { getLogger } from "./logger.ts";

/**
 * Check whether a directory contains a Warp configuration.
 *
 * Returns `true` when `dir` contains `warp.config.yml`, `warp.config.yaml`,
 * or a `package.json` with a `"warp"` key.
 */
export async function hasWarpConfig(dir: string): Promise<boolean> {
  const resolved = path.resolve(dir);

  // Check for YAML config files
  for (const ext of ["yml", "yaml"] as const) {
    try {
      await fsp.access(path.join(resolved, `warp.config.${ext}`));
      return true;
    } catch {
      // not found
    }
  }

  // Check for package.json "warp" key
  const pkgPath = path.join(resolved, "package.json");
  try {
    const pkg = JSON.parse(await fsp.readFile(pkgPath, "utf-8"));
    if (pkg.warp) return true;
  } catch {
    // missing or malformed package.json — treat as no config
  }

  return false;
}

/** Narrow `unknown` to a plain object record. */
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Validate that a parsed object conforms to the WarpConfig schema.
 * Throws with an actionable message if invalid.
 */
function validateConfig(raw: unknown, source: string): WarpConfig {
  if (!isRecord(raw)) {
    throw new WarpError("CONFIG_INVALID", `[warp] Invalid config in ${source}: expected an object`);
  }

  // Validate exports
  if (!isRecord(raw.exports)) {
    throw new WarpError(
      "CONFIG_INVALID",
      `[warp] Invalid config in ${source}: "exports" must be an object`,
    );
  }
  const exports: Record<string, unknown> = raw.exports;
  const seenExportKeys = new Set<string>();
  for (const [key, value] of Object.entries(exports)) {
    if (typeof value !== "string") {
      throw new WarpError(
        "CONFIG_INVALID",
        `[warp] Invalid config in ${source}: exports["${key}"] must be a string, got ${typeof value}`,
      );
    }
    if (key === "") {
      throw new WarpError(
        "CONFIG_INVALID",
        `[warp] Invalid config in ${source}: exports key must not be empty`,
      );
    }
    if (seenExportKeys.has(key)) {
      throw new WarpError(
        "CONFIG_INVALID",
        `[warp] Invalid config in ${source}: duplicate exports key "${key}"`,
      );
    }
    seenExportKeys.add(key);
    // Validate subpath pattern (#11): must be "." or start with "./"
    if (key !== "." && !key.startsWith("./")) {
      throw new WarpError(
        "VALIDATION_ERROR",
        `[warp] Invalid config in ${source}: exports key "${key}" must be "." or start with "./"`,
      );
    }
    // Reject trailing slashes — deprecated in Node.js, use subpath patterns instead
    if (key !== "." && key.endsWith("/")) {
      throw new WarpError(
        "VALIDATION_ERROR",
        `[warp] Invalid config in ${source}: exports key "${key}" must not end with "/". ` +
          `Trailing-slash patterns are deprecated in Node.js. Use a subpath pattern (e.g. "./${key.slice(2, -1)}/*") instead.`,
      );
    }
    // Reject wildcard/glob patterns — Warp maps each export to a single source file
    if (key.includes("*")) {
      throw new WarpError(
        "VALIDATION_ERROR",
        `[warp] Invalid config in ${source}: exports key "${key}" contains a wildcard. ` +
          `Warp requires each export to map to a single source file. List each entry explicitly.\n\n` +
          `Instead of:\n` +
          `  exports:\n` +
          `    "./*": "./src/*.ts"\n\n` +
          `Use:\n` +
          `  exports:\n` +
          `    "./models": "./src/models/index.ts"\n` +
          `    "./utils":  "./src/utils/index.ts"`,
      );
    }
  }

  // Validate targets
  if (!Array.isArray(raw.targets) || raw.targets.length === 0) {
    throw new WarpError(
      "CONFIG_INVALID",
      `[warp] Invalid config in ${source}: "targets" must be a non-empty array`,
    );
  }

  const seenNames = new Set<string>();
  const seenConditions = new Set<string>();
  const validatedTargets: WarpConfig["targets"] = [];

  for (const [i, entry] of (raw.targets as unknown[]).entries()) {
    if (!isRecord(entry)) {
      throw new WarpError(
        "CONFIG_INVALID",
        `[warp] Invalid config in ${source}: targets[${i}] must be an object`,
      );
    }
    for (const field of ["name", "condition", "tsconfig"] as const) {
      if (typeof entry[field] !== "string" || entry[field].length === 0) {
        throw new WarpError(
          "CONFIG_INVALID",
          `[warp] Invalid config in ${source}: targets[${i}].${field} must be a non-empty string`,
        );
      }
    }
    if (entry.polyfillSuffix !== undefined && typeof entry.polyfillSuffix !== "string") {
      throw new WarpError(
        "CONFIG_INVALID",
        `[warp] Invalid config in ${source}: targets[${i}].polyfillSuffix must be a string`,
      );
    }
    if (
      entry.moduleType !== undefined &&
      entry.moduleType !== "module" &&
      entry.moduleType !== "commonjs"
    ) {
      throw new WarpError(
        "CONFIG_INVALID",
        `[warp] Invalid config in ${source}: targets[${i}].moduleType must be "module" or "commonjs"`,
      );
    }

    // Build typed target — casts are safe: all fields validated above
    const target: WarpTarget = {
      name: entry.name as string,
      condition: entry.condition as string,
      tsconfig: entry.tsconfig as string,
      ...(typeof entry.polyfillSuffix === "string" && { polyfillSuffix: entry.polyfillSuffix }),
      ...(typeof entry.moduleType === "string" && { moduleType: entry.moduleType as ModuleType }),
    };

    if (seenNames.has(target.name)) {
      throw new WarpError(
        "VALIDATION_ERROR",
        `[warp] Invalid config in ${source}: duplicate target name "${target.name}"`,
      );
    }
    seenNames.add(target.name);

    if (seenConditions.has(target.condition)) {
      throw new WarpError(
        "VALIDATION_ERROR",
        `[warp] Invalid config in ${source}: duplicate target condition "${target.condition}"`,
      );
    }
    seenConditions.add(target.condition);

    validatedTargets.push(target);
  }

  return {
    exports: exports as Record<string, string>,
    targets: validatedTargets,
  };
}

/**
 * Validate that all tsconfig paths referenced by targets actually exist (#10).
 * Called after structural validation, with access to the package root.
 */
export async function validateTsconfigPaths(
  config: WarpConfig,
  dir: string,
  source: string,
): Promise<void> {
  for (const target of config.targets) {
    const tsconfigPath = path.resolve(dir, target.tsconfig);
    try {
      await fsp.access(tsconfigPath);
    } catch {
      throw new WarpError(
        "TSCONFIG_ERROR",
        `[warp] Invalid config in ${source}: target "${target.name}" references tsconfig "${target.tsconfig}" ` +
          `which does not exist at ${tsconfigPath}`,
      );
    }
  }
}

/**
 * Resolve Warp configuration from `startDir`.
 *
 * Resolution order (when configPath is not specified):
 * 1. warp.config.yml
 * 2. warp.config.yaml
 * 3. package.json "warp" key
 *
 * Only looks in `startDir` — does NOT walk up the directory tree.
 *
 * When `configPath` is provided, the file is loaded directly and
 * resolved as if it lives under `startDir` (tsconfig paths in targets
 * are relative to startDir, not to the config file's actual location).
 */
export async function resolveWarpConfig(
  startDir: string,
  configPath?: string,
): Promise<ResolvedWarpConfig> {
  const dir = path.resolve(startDir);

  // Explicit config path: load directly
  if (configPath) {
    const resolved = path.resolve(dir, configPath);
    try {
      await fsp.access(resolved);
    } catch {
      throw new WarpError("CONFIG_NOT_FOUND", `[warp] Config file not found: ${resolved}`);
    }
    const content = await fsp.readFile(resolved, "utf-8");
    let parsed: unknown;
    try {
      parsed = parseYaml(content);
    } catch (err) {
      throw new WarpError(
        "CONFIG_INVALID",
        `[warp] Failed to parse ${resolved}: ${err instanceof Error ? err.message : String(err)}`,
        { cause: err },
      );
    }
    const source: ConfigSource = { type: "yaml", path: resolved };
    const config = validateConfig(parsed, resolved);
    return { config, source };
  }

  // Check YAML files
  for (const ext of ["yml", "yaml"] as const) {
    const yamlPath = path.join(dir, `warp.config.${ext}`);
    let yamlExists = false;
    try {
      await fsp.access(yamlPath);
      yamlExists = true;
    } catch {
      // not found
    }
    if (yamlExists) {
      const content = await fsp.readFile(yamlPath, "utf-8");
      let parsed: unknown;
      try {
        parsed = parseYaml(content);
      } catch (err) {
        throw new WarpError(
          "CONFIG_INVALID",
          `[warp] Failed to parse ${yamlPath}: ${err instanceof Error ? err.message : String(err)}`,
          { cause: err },
        );
      }
      const source: ConfigSource = { type: "yaml", path: yamlPath };

      // Warn if package.json also has a "warp" key
      const pkgPath = path.join(dir, "package.json");
      try {
        const pkg = JSON.parse(await fsp.readFile(pkgPath, "utf-8"));
        if (pkg.warp) {
          getLogger().warn(
            `[warp] Warning: Both ${yamlPath} and package.json "warp" key found in ${dir}. Using ${yamlPath}.`,
          );
        }
      } catch {
        // no package.json — ignore
      }

      return { config: validateConfig(parsed, yamlPath), source };
    }
  }

  // Check package.json fallback
  const pkgPath = path.join(dir, "package.json");
  try {
    const pkg = JSON.parse(await fsp.readFile(pkgPath, "utf-8"));
    if (pkg.warp) {
      const source: ConfigSource = { type: "package.json", path: pkgPath };
      const config = validateConfig(pkg.warp, `${pkgPath} "warp" key`);
      return { config, source };
    }
  } catch {
    // no package.json — fall through
  }

  throw new WarpError(
    "CONFIG_NOT_FOUND",
    `[warp] No Warp configuration found in ${dir}.\nCreate a warp.config.yml file or add a "warp" key to package.json.`,
  );
}

/**
 * Infer module type from TypeScript compiler options.
 * CommonJS-family modules → "commonjs", everything else → "module".
 */
export function inferModuleType(moduleKind: number | undefined): ModuleType {
  // ts.ModuleKind.CommonJS = 1, ts.ModuleKind.Node16 = 100, ts.ModuleKind.NodeNext = 199
  // For Node16/NodeNext the package-level type matters; we default to "module"
  // since the parent package.json typically has "type": "module".
  if (moduleKind === 1 /* CommonJS */) {
    return "commonjs";
  }
  return "module";
}
