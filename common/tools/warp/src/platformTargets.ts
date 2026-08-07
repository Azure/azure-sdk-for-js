// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Automatic pruning of redundant platform build targets.
 *
 * A package only needs a platform-specific build target (e.g. `browser` or
 * `react-native`) when it actually ships platform-specific source code. That
 * code is expressed through one of two mechanisms:
 *
 * 1. **Polyfill substitution** — a `polyfillSuffix` on the target plus files
 *    like `foo-browser.mts` that replace `foo.ts` during compilation.
 * 2. **Subpath imports** — a `#`-prefixed `"imports"` mapping in package.json
 *    that resolves a platform condition to distinct files
 *    (e.g. `"browser": "./src/*-browser.mts"`).
 *
 * When neither mechanism contributes any real file for a platform target, that
 * target compiles to output that is byte-identical to the ESM build. In that
 * case the target is redundant: dropping it lets browser / React Native
 * consumers fall through to the `import` (ESM) condition, which produces the
 * same result while saving build time and shrinking the published package.
 *
 * This module detects that situation up front (before compilation) and removes
 * the redundant platform targets, mirroring the manual change in
 * https://github.com/Azure/azure-sdk-for-js/pull/38870.
 */

import * as fsp from "node:fs/promises";
import * as path from "node:path";
import type { ParsedTargetConfig } from "./compiler.ts";
import { buildImportTargetIndex } from "./resolveImports.ts";
import type { ImportsMap } from "./resolveImports.ts";
import { getLogger } from "./logger.ts";

/**
 * Mapping from a platform export condition to the legacy top-level
 * `package.json` field that historically pointed at the same build output.
 * Used to keep those fields valid after a platform target is pruned.
 */
export const LEGACY_PLATFORM_FIELD_BY_CONDITION: Readonly<Record<string, string>> = {
  browser: "browser",
  "react-native": "react-native",
};

/**
 * The platform conditions Warp is allowed to prune. Restricting pruning to this
 * known set keeps the behavior conservative: only the recognized platform
 * polyfill conditions (`browser`, `react-native`) — which always fall back to
 * the `import` condition — are ever considered. Other custom conditions
 * (e.g. `workerd`, `deno`) are left untouched.
 */
const PRUNABLE_PLATFORM_CONDITIONS: ReadonlySet<string> = new Set(
  Object.keys(LEGACY_PLATFORM_FIELD_BY_CONDITION),
);

/** Source file extensions Warp considers when scanning for platform files. */
const SOURCE_EXTENSIONS: ReadonlySet<string> = new Set([".ts", ".mts", ".cts"]);

/**
 * The outcome of planning platform-target pruning.
 */
export interface PlatformPrunePlan {
  /** Targets that survive and should be built. */
  kept: ParsedTargetConfig[];
  /** Redundant platform targets that were pruned (no platform-specific code). */
  pruned: ParsedTargetConfig[];
}

/**
 * Recursively collect absolute paths of TypeScript source files under the given
 * directories. Paths are normalized with {@link path.resolve} so they line up
 * with the absolute targets produced by {@link buildImportTargetIndex}.
 */
async function collectSourceFiles(dirs: Iterable<string>): Promise<string[]> {
  const files = new Set<string>();

  await Promise.all(
    [...new Set(dirs)].map(async (dir) => {
      let entries: import("node:fs").Dirent[];
      try {
        entries = await fsp.readdir(dir, { withFileTypes: true, recursive: true });
      } catch {
        return; // directory doesn't exist or is unreadable — skip
      }
      for (const entry of entries) {
        if (!entry.isFile()) continue;
        if (!SOURCE_EXTENSIONS.has(path.extname(entry.name))) continue;
        const parentPath = entry.parentPath ?? (entry as unknown as { path: string }).path;
        files.add(path.resolve(parentPath, entry.name));
      }
    }),
  );

  return [...files];
}

/**
 * Determine whether a platform target ships any platform-specific source code.
 *
 * Returns `true` (the target must be kept) when:
 * - a `polyfillSuffix` file exists for the target, or
 * - a `#`-imports mapping for the target's condition resolves to a file that
 *   actually exists on disk.
 *
 * Returns `false` only when no platform-specific file is found, meaning the
 * target's output would be identical to the ESM build and is safe to prune.
 */
function targetHasPlatformCode(
  pc: ParsedTargetConfig,
  importIndex: ReturnType<typeof buildImportTargetIndex> | undefined,
  sourceFiles: readonly string[],
  sourceFileSet: ReadonlySet<string>,
): boolean {
  const { target } = pc;

  // 1. Polyfill-substitution files (e.g. `foo-browser.mts`).
  const suffix = target.polyfillSuffix;
  if (suffix) {
    for (const file of sourceFiles) {
      const base = path.basename(file).replace(/\.(?:m|c)?ts$/, "");
      // The base original file (`foo`) never ends with the suffix, so this only
      // matches genuine polyfill variants (`foo-browser`).
      if (base.endsWith(suffix) && base.length > suffix.length) return true;
    }
  }

  // 2. Subpath-imports files mapped under this target's platform condition.
  if (importIndex) {
    const condition = target.condition;
    for (const [absPath, entry] of importIndex.exactPaths) {
      if (entry.condition === condition && sourceFileSet.has(absPath)) return true;
    }
    for (const pattern of importIndex.wildcardPatterns) {
      if (pattern.condition !== condition) continue;
      for (const file of sourceFiles) {
        if (pattern.regex.test(file)) return true;
      }
    }
  }

  return false;
}

/**
 * Plan which platform targets can be pruned because the package has no
 * platform-specific source code.
 *
 * Only the recognized platform conditions ({@link PRUNABLE_PLATFORM_CONDITIONS}
 * — `browser` / `react-native`) are eligible. Pruning only happens when a base
 * ESM target (condition `import`) remains to serve as the fallback for the
 * pruned conditions. Base module targets (`import` / `require`) and any other
 * custom conditions are never pruned.
 *
 * Detection runs against the actual files on disk under the targets' `rootDir`s,
 * so it is independent of tsconfig `include` globs (which typically match only
 * `*.ts`, excluding platform `*.mts` variants).
 */
export async function planPlatformTargetPruning(
  parsedConfigs: ParsedTargetConfig[],
  importsMap: ImportsMap | undefined,
  packageRoot: string,
): Promise<PlatformPrunePlan> {
  const platformCandidates = parsedConfigs.filter((pc) =>
    PRUNABLE_PLATFORM_CONDITIONS.has(pc.target.condition),
  );

  // Nothing to consider, or no ESM fallback to absorb the pruned conditions.
  const hasEsmFallback = parsedConfigs.some((pc) => pc.target.condition === "import");
  if (platformCandidates.length === 0 || !hasEsmFallback) {
    return { kept: parsedConfigs, pruned: [] };
  }

  const sourceDirs = parsedConfigs.map((pc) => path.resolve(packageRoot, pc.rootDir));
  const sourceFiles = await collectSourceFiles(sourceDirs);
  const sourceFileSet = new Set(sourceFiles);
  const importIndex = importsMap ? buildImportTargetIndex(importsMap, packageRoot) : undefined;

  const pruned: ParsedTargetConfig[] = [];
  const kept: ParsedTargetConfig[] = [];

  for (const pc of parsedConfigs) {
    if (!PRUNABLE_PLATFORM_CONDITIONS.has(pc.target.condition)) {
      kept.push(pc);
      continue;
    }
    if (targetHasPlatformCode(pc, importIndex, sourceFiles, sourceFileSet)) {
      kept.push(pc);
    } else {
      pruned.push(pc);
    }
  }

  if (pruned.length > 0) {
    getLogger().info(
      `[warp] No platform-specific code detected; pruning redundant target(s): ${pruned
        .map((pc) => `${pc.target.name} (${pc.target.condition})`)
        .join(", ")}`,
    );
  }

  return { kept, pruned };
}
