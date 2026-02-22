// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as fsp from "node:fs/promises";
import * as path from "node:path";
import { WarpError } from "./types.ts";
import type { WarpConfig, ModuleType } from "./types.ts";
import type { CompileResult } from "./compiler.ts";
import { inferModuleType } from "./config.ts";

/** Narrow `unknown` to a plain object record. */
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Resolve source exports map to dist exports map using compile results.
 *
 * For each export entry, maps the source path to dist paths for each target,
 * creating the nested condition structure.
 */
export function resolveExportsMap(
  config: WarpConfig,
  results: CompileResult[],
  packageRoot: string,
): Record<string, unknown> {
  const exportsMap: Record<string, unknown> = {};

  for (const [subpath, sourcePath] of Object.entries(config.exports)) {
    // Pass-through entries (e.g. "./package.json": "./package.json")
    if (!sourcePath.endsWith(".ts")) {
      exportsMap[subpath] = sourcePath;
      continue;
    }

    const conditions: Record<string, Record<string, string>> = {};

    for (const result of results) {
      const distPath = sourceToDistPath(sourcePath, result.rootDir, result.outDir, packageRoot);
      const distJsPath = distPath.replace(/\.ts$/, ".js");
      const distDtsPath = distPath.replace(/\.ts$/, ".d.ts");

      conditions[result.target.condition] = {
        types: distDtsPath,
        default: distJsPath,
      };
    }

    exportsMap[subpath] = conditions;
  }

  // Auto-inject "./package.json" pass-through if not explicitly listed.
  // Without this, tools that load `<pkg>/package.json` through Node.js exports
  // resolution get ERR_PACKAGE_PATH_NOT_EXPORTED.
  if (!("./package.json" in exportsMap)) {
    exportsMap["./package.json"] = "./package.json";
  }

  return exportsMap;
}

/**
 * Map a source file path to its corresponding dist file path.
 */
function sourceToDistPath(
  sourcePath: string,
  rootDir: string,
  outDir: string,
  packageRoot: string,
): string {
  // Normalize to relative paths from package root
  const absSource = path.resolve(packageRoot, sourcePath);
  const absRootDir = path.resolve(packageRoot, rootDir);
  const absOutDir = path.resolve(packageRoot, outDir);

  // Get relative path from rootDir
  const relFromRoot = path.relative(absRootDir, absSource);

  // Construct dist path
  const distAbs = path.join(absOutDir, relFromRoot);

  // Return as relative from package root with ./
  const rel = path.relative(packageRoot, distAbs);
  return `./` + rel.split(path.sep).join("/");
}

/**
 * Write the resolved exports map to package.json, merging with existing
 * non-Warp-managed entries. Also writes module type shims into outDirs.
 *
 * Warp-managed entries are those whose keys appear in `config.exports`.
 * Any existing entries with different keys are preserved.
 */
export async function writeExportsToPackageJson(
  exportsMap: Record<string, unknown>,
  results: CompileResult[],
  packageRoot: string,
  compilerOptions?: Map<string, number | undefined>,
): Promise<void> {
  const pkgPath = path.join(packageRoot, "package.json");
  let pkg: Record<string, unknown>;
  try {
    pkg = JSON.parse(await fsp.readFile(pkgPath, "utf-8"));
  } catch (err) {
    throw new WarpError(
      "VALIDATION_ERROR",
      `[warp] Failed to read ${pkgPath}: ${err instanceof Error ? err.message : String(err)}`,
      { cause: err },
    );
  }

  // Merge: preserve existing exports entries not managed by Warp
  const existingExports = isRecord(pkg.exports) ? pkg.exports : {};

  const merged: Record<string, unknown> = {};
  // First add Warp-managed entries (in Warp's declaration order)
  for (const [key, value] of Object.entries(exportsMap)) {
    merged[key] = value;
  }
  // Then preserve any unmanaged entries
  for (const [key, value] of Object.entries(existingExports)) {
    if (!(key in merged)) {
      merged[key] = value;
    }
  }

  pkg.exports = merged;

  // Atomic write: write to temp file then rename to avoid corruption (#22)
  const tmpFile = path.join(path.dirname(pkgPath), `.package.json.${process.pid}.tmp`);
  try {
    await fsp.writeFile(tmpFile, `${JSON.stringify(pkg, null, 2)}\n`, "utf-8");
    await fsp.rename(tmpFile, pkgPath);
  } catch (err) {
    throw new WarpError(
      "VALIDATION_ERROR",
      `[warp] Failed to write ${pkgPath}: ${err instanceof Error ? err.message : String(err)}`,
      { cause: err },
    );
  }

  // Write module-type shim into each target's outDir
  for (const result of results) {
    const shimPath = path.join(result.outDir, "package.json");
    await fsp.mkdir(path.dirname(shimPath), { recursive: true });

    let moduleType: ModuleType;
    if (result.target.moduleType) {
      moduleType = result.target.moduleType;
    } else if (compilerOptions) {
      moduleType = inferModuleType(compilerOptions.get(result.target.name));
    } else {
      moduleType = "module";
    }

    await fsp.writeFile(shimPath, `${JSON.stringify({ type: moduleType }, null, 2)}\n`, "utf-8");
  }
}

/**
 * Verify that all dist files referenced by the exports map actually exist.
 * Returns a list of missing file paths.
 */
export async function verifyDistFiles(
  exportsMap: Record<string, unknown>,
  packageRoot: string,
): Promise<string[]> {
  const toCheck: string[] = [];

  function collectPaths(obj: unknown): void {
    if (typeof obj === "string") {
      if (
        obj.startsWith("./") &&
        (obj.endsWith(".js") || obj.endsWith(".d.ts") || obj.endsWith(".d.ts.map"))
      ) {
        toCheck.push(obj);
      }
      return;
    }
    if (isRecord(obj)) {
      for (const value of Object.values(obj)) {
        collectPaths(value);
      }
    }
  }

  collectPaths(exportsMap);

  const results = await Promise.all(
    toCheck.map(async (relPath) => {
      const absPath = path.resolve(packageRoot, relPath);
      try {
        await fsp.access(absPath);
        return null;
      } catch {
        return relPath;
      }
    }),
  );

  return results.filter((r): r is string => r !== null);
}

/**
 * Get the exports diff between current package.json and what would be written.
 * Uses key-level comparison instead of line-index alignment (#2).
 */
export async function getExportsDiff(
  exportsMap: Record<string, unknown>,
  packageRoot: string,
): Promise<string> {
  const pkgPath = path.join(packageRoot, "package.json");
  const pkg = JSON.parse(await fsp.readFile(pkgPath, "utf-8"));

  const current = (pkg.exports ?? {}) as Record<string, unknown>;
  const currentStr = JSON.stringify(current, null, 2);
  const newStr = JSON.stringify(exportsMap, null, 2);

  if (currentStr === newStr) {
    return "[warp] Exports: no changes needed";
  }

  const lines: string[] = [];
  const allKeys = new Set([...Object.keys(current), ...Object.keys(exportsMap)]);

  for (const key of allKeys) {
    const oldVal = key in current ? JSON.stringify(current[key], null, 2) : undefined;
    const newVal = key in exportsMap ? JSON.stringify(exportsMap[key], null, 2) : undefined;

    if (oldVal === newVal) {
      for (const line of (oldVal ?? "").split("\n")) {
        lines.push(`  ${key}: ${line}`);
      }
    } else {
      if (oldVal !== undefined) {
        for (const line of oldVal.split("\n")) {
          lines.push(`- ${key}: ${line}`);
        }
      }
      if (newVal !== undefined) {
        for (const line of newVal.split("\n")) {
          lines.push(`+ ${key}: ${line}`);
        }
      }
    }
  }

  return lines.join("\n");
}
