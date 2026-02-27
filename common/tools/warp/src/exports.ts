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
    if (!/\.(?:ts|mts|cts)$/.test(sourcePath)) {
      exportsMap[subpath] = sourcePath;
      continue;
    }

    const conditions: Record<string, Record<string, string>> = {};

    for (const result of results) {
      const distPath = sourceToDistPath(sourcePath, result.rootDir, result.outDir, packageRoot);
      const distJsPath = distPath
        .replace(/\.mts$/, ".mjs")
        .replace(/\.cts$/, ".cjs")
        .replace(/\.ts$/, ".js");
      const distDtsPath = distPath
        .replace(/\.mts$/, ".d.mts")
        .replace(/\.cts$/, ".d.cts")
        .replace(/\.ts$/, ".d.ts");

      conditions[result.target.condition] = {
        types: distDtsPath,
        default: distJsPath,
      };
    }

    exportsMap[subpath] = conditions;
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
    const raw: unknown = JSON.parse(await fsp.readFile(pkgPath, "utf-8"));
    pkg = isRecord(raw) ? raw : {};
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

  // Skip write if exports are unchanged — avoids unnecessary I/O and
  // prevents tools watching package.json from triggering false rebuilds.
  const newContent = `${JSON.stringify(pkg, null, 2)}\n`;
  try {
    const existing = await fsp.readFile(pkgPath, "utf-8");
    if (existing === newContent) {
      // Exports and package.json are identical — skip write entirely.
      // Still write module-type shims below since outDirs were cleaned.
      await writeModuleTypeShims(results, compilerOptions);
      return;
    }
  } catch {
    // File doesn't exist or unreadable — proceed with write
  }

  // Atomic write: write to temp file then rename to avoid corruption (#22)
  const tmpFile = path.join(path.dirname(pkgPath), `.package.json.${process.pid}.tmp`);
  try {
    await fsp.writeFile(tmpFile, newContent, "utf-8");
    await fsp.rename(tmpFile, pkgPath);
  } catch (err) {
    throw new WarpError(
      "VALIDATION_ERROR",
      `[warp] Failed to write ${pkgPath}: ${err instanceof Error ? err.message : String(err)}`,
      { cause: err },
    );
  }

  // Write module-type shim into each target's outDir — in parallel since
  // they write to independent directories.
  await writeModuleTypeShims(results, compilerOptions);
}

/**
 * Write a `{"type": "module"|"commonjs"}` shim into each target's outDir.
 */
async function writeModuleTypeShims(
  results: CompileResult[],
  compilerOptions?: Map<string, number | undefined>,
): Promise<void> {
  await Promise.all(
    results.map(async (result) => {
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
    }),
  );
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
        (obj.endsWith(".js") ||
          obj.endsWith(".mjs") ||
          obj.endsWith(".cjs") ||
          obj.endsWith(".d.ts") ||
          obj.endsWith(".d.mts") ||
          obj.endsWith(".d.cts") ||
          obj.endsWith(".d.ts.map") ||
          obj.endsWith(".d.mts.map") ||
          obj.endsWith(".d.cts.map"))
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
  const raw: unknown = JSON.parse(await fsp.readFile(pkgPath, "utf-8"));
  const pkg = isRecord(raw) ? raw : {};

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
