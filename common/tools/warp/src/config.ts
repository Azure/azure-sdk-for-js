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
 * Find, parse, and validate Warp configuration from a directory.
 *
 * Resolution order (when `configPath` is not specified):
 * 1. `warp.config.yml`
 * 2. `warp.config.yaml`
 * 3. `warp.config.json`
 * 4. `package.json` `"warp"` key
 *
 * Only looks in `dir` — does NOT walk up the directory tree.
 *
 * When `configPath` is provided, that file is loaded directly (must exist).
 * tsconfig paths in targets are resolved relative to `dir`.
 *
 * Returns `undefined` when no config is found (and `configPath` was not
 * specified).  Throws on parse/validation errors or when an explicit
 * `configPath` doesn't exist.
 */
export async function findWarpConfig(
  dir: string,
  configPath?: string,
): Promise<ResolvedWarpConfig | undefined> {
  const resolved = path.resolve(dir);

  // Explicit config path: must exist
  if (configPath) {
    const fullPath = path.resolve(resolved, configPath);
    try {
      await fsp.access(fullPath);
    } catch {
      throw new WarpError("CONFIG_NOT_FOUND", `[warp] Config file not found: ${fullPath}`);
    }
    const content = await fsp.readFile(fullPath, "utf-8");
    const { parsed, sourceType } = parseConfigContent(content, fullPath);
    const source: ConfigSource = { type: sourceType, path: fullPath };
    return { config: validateConfig(parsed, fullPath), source };
  }

  // Probe YAML files — attempt readFile directly instead of access+read
  // to avoid redundant filesystem round-trips.
  for (const ext of ["yml", "yaml"] as const) {
    const yamlPath = path.join(resolved, `warp.config.${ext}`);
    let content: string | undefined;
    try {
      content = await fsp.readFile(yamlPath, "utf-8");
    } catch {
      // not found — try next extension
    }
    if (content !== undefined) {
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
      const pkgPath = path.join(resolved, "package.json");
      try {
        const pkgRaw: unknown = JSON.parse(await fsp.readFile(pkgPath, "utf-8"));
        if (isRecord(pkgRaw) && "warp" in pkgRaw) {
          getLogger().warn(
            `[warp] Warning: Both ${yamlPath} and package.json "warp" key found in ${resolved}. Using ${yamlPath}.`,
          );
        }
      } catch {
        // no package.json — ignore
      }

      return { config: validateConfig(parsed, yamlPath), source };
    }
  }

  // Probe JSON config file
  const jsonPath = path.join(resolved, "warp.config.json");
  try {
    const content = await fsp.readFile(jsonPath, "utf-8");
    const { parsed } = parseConfigContent(content, jsonPath);
    const source: ConfigSource = { type: "json", path: jsonPath };

    // Warn if package.json also has a "warp" key
    const pkgPath = path.join(resolved, "package.json");
    try {
      const pkgRaw: unknown = JSON.parse(await fsp.readFile(pkgPath, "utf-8"));
      if (isRecord(pkgRaw) && "warp" in pkgRaw) {
        getLogger().warn(
          `[warp] Warning: Both ${jsonPath} and package.json "warp" key found in ${resolved}. Using ${jsonPath}.`,
        );
      }
    } catch {
      // no package.json — ignore
    }

    return { config: validateConfig(parsed, jsonPath), source };
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code !== "ENOENT") {
      throw err;
    }
    // not found — continue to package.json fallback
  }

  // Check package.json fallback
  const pkgPath = path.join(resolved, "package.json");
  try {
    const pkgRaw: unknown = JSON.parse(await fsp.readFile(pkgPath, "utf-8"));
    if (isRecord(pkgRaw) && "warp" in pkgRaw) {
      const source: ConfigSource = { type: "package.json", path: pkgPath };
      const config = validateConfig(pkgRaw.warp, `${pkgPath} "warp" key`);
      return { config, source };
    }
  } catch {
    // no package.json — fall through
  }

  return undefined;
}

function parseConfigContent(
  content: string,
  filePath: string,
): { parsed: unknown; sourceType: "yaml" | "json" } {
  const ext = path.extname(filePath).toLowerCase();
  try {
    if (ext === ".json") {
      return { parsed: JSON.parse(content), sourceType: "json" };
    }
    return { parsed: parseYaml(content), sourceType: "yaml" };
  } catch (err) {
    throw new WarpError(
      "CONFIG_INVALID",
      `[warp] Failed to parse ${filePath}: ${err instanceof Error ? err.message : String(err)}`,
      { cause: err },
    );
  }
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
    for (const field of ["name", "tsconfig"] as const) {
      if (typeof entry[field] !== "string" || entry[field].length === 0) {
        throw new WarpError(
          "CONFIG_INVALID",
          `[warp] Invalid config in ${source}: targets[${i}].${field} must be a non-empty string`,
        );
      }
    }
    // condition is optional — defaults to name
    if (
      entry.condition !== undefined &&
      (typeof entry.condition !== "string" || entry.condition.length === 0)
    ) {
      throw new WarpError(
        "CONFIG_INVALID",
        `[warp] Invalid config in ${source}: targets[${i}].condition must be a non-empty string`,
      );
    }
    // polyfillSuffix: omitted/true → "-<name>", string → used as-is, false → disabled
    if (
      entry.polyfillSuffix !== undefined &&
      typeof entry.polyfillSuffix !== "string" &&
      typeof entry.polyfillSuffix !== "boolean"
    ) {
      throw new WarpError(
        "CONFIG_INVALID",
        `[warp] Invalid config in ${source}: targets[${i}].polyfillSuffix must be a string, true, or false`,
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
    const name = entry.name as string;
    const resolvedPolyfillSuffix =
      entry.polyfillSuffix === true
        ? `-${name}`
        : typeof entry.polyfillSuffix === "string"
          ? entry.polyfillSuffix
          : undefined;
    const target: WarpTarget = {
      name,
      condition: typeof entry.condition === "string" ? entry.condition : name,
      tsconfig: entry.tsconfig as string,
      ...(resolvedPolyfillSuffix !== undefined && { polyfillSuffix: resolvedPolyfillSuffix }),
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
  // Check all tsconfig paths in parallel — they are independent filesystem checks.
  await Promise.all(
    config.targets.map(async (target) => {
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
    }),
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
