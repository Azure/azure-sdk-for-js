// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
    Project,
    SourceFile,
    ExportedDeclarations,
    ts,
} from "ts-morph";
import * as fs from "fs";
import * as path from "path";
import { resolveExports } from "./exports-resolver.js";

// ============================================================================
// Entry Point Detection
// ============================================================================

export interface PackageJson {
    name?: string;
    main?: string;
    module?: string;
    types?: string;
    typings?: string;
    browser?: string | Record<string, string | false>;
    exports?: string | Record<string, unknown>;
}

/**
 * Resolves entry point files from package.json configuration.
 * Prioritizes the "." (root) export - this is what users get with `import { X } from "pkg"`.
 * Only falls back to subpath exports if root export is not found.
 * Supports: exports, types, typings, module, main, browser.
 */
export function resolveEntryPointFiles(rootPath: string, options: EngineOptions): ExportEntry[] {
    const pkgPath = options.packageJsonPath ?? path.join(rootPath, "package.json");
    if (!fs.existsSync(pkgPath)) {
        return [];
    }

    const pkg: PackageJson = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
    const entryEntries: ExportEntry[] = [];

    // Export paths in package.json are relative to the package.json location,
    // which may differ from rootPath (e.g. rootPath = .../pkg/src but package.json
    // is at .../pkg/).  Use the package.json directory as the resolve base.
    const pkgDir = path.dirname(path.resolve(pkgPath));
    const resolveBase = pkgDir !== path.resolve(rootPath) ? pkgDir : rootPath;

    // 1. Modern exports map (highest priority) - prefer "." export
    if (pkg.exports) {
        // First try root export only ("." entry)
        const rootExportPaths = extractExportPaths(pkg.exports, true);
        for (const entry of rootExportPaths) {
            const resolved = resolveToSourceFile(resolveBase, entry.filePath, options);
            if (resolved) entryEntries.push({ exportPath: entry.exportPath, condition: entry.condition, filePath: resolved });
        }

        // Also include all other exports (for subpath tracking)
        const allExportPaths = extractExportPaths(pkg.exports, false);
        for (const entry of allExportPaths) {
            // Skip if already added from root
            if (entryEntries.some(e => e.exportPath === entry.exportPath && e.condition === entry.condition)) continue;
            const resolved = resolveToSourceFile(resolveBase, entry.filePath, options);
            if (resolved) entryEntries.push({ exportPath: entry.exportPath, condition: entry.condition, filePath: resolved });
        }
    }

    // 2. TypeScript types/typings (these are root exports)
    if (entryEntries.length === 0 && pkg.types) {
        const resolved = resolveToSourceFile(resolveBase, pkg.types, options);
        if (resolved) entryEntries.push({ exportPath: ".", condition: "default", filePath: resolved });
    }
    if (entryEntries.length === 0 && pkg.typings && pkg.typings !== pkg.types) {
        const resolved = resolveToSourceFile(resolveBase, pkg.typings, options);
        if (resolved) entryEntries.push({ exportPath: ".", condition: "default", filePath: resolved });
    }

    // 3. ES module entry (root export)
    if (entryEntries.length === 0 && pkg.module) {
        const resolved = resolveToSourceFile(resolveBase, pkg.module, options);
        if (resolved) entryEntries.push({ exportPath: ".", condition: "default", filePath: resolved });
    }

    // 4. CommonJS entry (root export)
    if (entryEntries.length === 0 && pkg.main) {
        const resolved = resolveToSourceFile(resolveBase, pkg.main, options);
        if (resolved) entryEntries.push({ exportPath: ".", condition: "default", filePath: resolved });
    }

    return entryEntries;
}

/**
 * Entry for an export path mapping.
 */
export interface ExportEntry {
    /** The export subpath (e.g., "." or "./client") */
    exportPath: string;
    /** Resolved export condition context (e.g., "default", "node", "browser") */
    condition: string;
    /** Full chain of conditions before normalization, e.g. ["import", "types"] */
    conditionChain?: string[];
    /** The resolved source file path */
    filePath: string;
}

/**
 * Extracts path values from package.json exports field using the shared resolver.
 * Prioritizes the "." (root) export over subpath exports.
 * @param exports - The exports field from package.json
 * @param rootOnly - If true, only extract from the "." export
 * @returns Array of {exportPath, filePath} pairs
 */
const VALID_EXTENSIONS = [".ts", ".d.ts", ".mts", ".d.mts", ".cts", ".d.cts", ".js", ".mjs", ".cjs"];
function hasValidExtension(filePath: string): boolean {
    return VALID_EXTENSIONS.some(ext => filePath.endsWith(ext));
}

export function extractExportPaths(exports: string | Record<string, unknown>, rootOnly: boolean = false): ExportEntry[] {
    const resolved = resolveExports(exports);

    return resolved
        .filter((r) => !rootOnly || r.exportPath === ".")
        .filter((r) => hasValidExtension(r.filePath))
        .map((r) => ({
            exportPath: r.exportPath,
            condition: normalizeCondition(
                r.conditionChain.length > 0 ? r.conditionChain.join("|") : "default",
            ),
            conditionChain: r.conditionChain.length > 1 ? [...r.conditionChain] : undefined,
            filePath: r.filePath,
        }));
}

/**
 * Condition classification tiers (from most general to most specific).
 *
 * Based on the Node.js ESM resolution spec, conditions are checked in the
 * order they appear in the exports map. For sdk-chat's purposes (grouping
 * exports by target environment), we classify conditions into tiers:
 *
 *   Tier 0 – Catch-all:     "default"
 *   Tier 1 – Type metadata:  "types"
 *   Tier 2 – Module format:  "import", "require"
 *   Tier 3 – Runtime target: "node", "browser", "react-native", "workerd"
 *   Tier 4 – Build mode:     "production", "development"
 *
 * Lower tier = more general = higher priority when choosing a canonical
 * condition for a symbol exported under multiple conditions.
 */
const CONDITION_TIERS: ReadonlyMap<string, number> = new Map([
    // Tier 0 – catch-all
    ["default", 0],
    // Tier 1 – type metadata
    ["types", 1],
    // Tier 2 – module format
    ["import", 2],
    ["require", 3],
    // Tier 3 – runtime target
    ["node", 4],
    ["browser", 5],
    ["react-native", 6],
    ["workerd", 7],
    // Tier 4 – build mode
    ["production", 8],
    ["development", 9],
]);

const UNRECOGNIZED_PRIORITY = 100;

export function normalizeCondition(condition: string): string {
    const chain = condition.split("|").map(c => c.trim()).filter(Boolean);
    if (chain.length === 0) {
        return "default";
    }

    // Runtime conditions (tier 3+) represent meaningful target environments
    // and take priority over "default" so that e.g. "browser|default" keeps
    // the "browser" qualifier instead of collapsing to "default".
    const RUNTIME_CONDITIONS = new Set([
        "node", "browser", "react-native", "workerd", "worker",
        "production", "development",
    ]);
    // When multiple runtime conditions appear, pick the most specific one
    // (highest tier number in CONDITION_TIERS) so that e.g. "development|browser"
    // normalizes to "browser" (tier 5) rather than "development" (tier 9).
    // Among environment targets (tier 3), these are more specific than build modes (tier 4).
    let bestRuntime: string | undefined;
    let bestTier = -1;
    for (const c of chain) {
        if (RUNTIME_CONDITIONS.has(c)) {
            // Prefer runtime targets (tier 3: node=4, browser=5, react-native=6, workerd=7)
            // over build modes (tier 4: production=8, development=9).
            // Use CONDITION_TIERS for ordering — lower tier number is higher priority,
            // but among runtime conditions we want the ENVIRONMENT target, not build mode.
            const tier = CONDITION_TIERS.get(c) ?? UNRECOGNIZED_PRIORITY;
            // Environment targets (tiers 4-7) beat build modes (tiers 8-9).
            // Among same category, prefer the first one found.
            if (bestRuntime === undefined || tier < bestTier) {
                bestRuntime = c;
                bestTier = tier;
            }
        }
    }
    if (bestRuntime) {
        return bestRuntime;
    }

    // When "types" co-occurs with another classified condition, prefer the
    // non-types condition so platform-specific modules keep their context.
    const hasTypes = chain.includes("types");
    if (hasTypes) {
        const nonTypes = chain.find(c => c !== "types" && c !== "default" && CONDITION_TIERS.has(c));
        if (nonTypes) {
            return nonTypes;
        }
        return "types";
    }

    // Return the first condition that appears in our classification table,
    // skipping "default" so that e.g. "import|default" normalizes to "import"
    // rather than collapsing to "default".
    for (const c of chain) {
        if (c !== "default" && CONDITION_TIERS.has(c)) {
            return c;
        }
    }

    if (chain.includes("default")) {
        return "default";
    }

    return chain[chain.length - 1];
}

export function getConditionPriority(condition: string): number {
    const canonical = normalizeCondition(condition);
    return CONDITION_TIERS.get(canonical) ?? UNRECOGNIZED_PRIORITY;
}

/**
 * Resolves a package.json entry point path to the actual source/declaration file on disk.
 *
 * Resolution strategy (in order):
 * 1. Direct path or extension-converted path (e.g. .js → .d.ts in compiled mode)
 * 2. TypeScript module resolution via ts.resolveModuleName (respects tsconfig paths/rootDirs)
 */
export function resolveToSourceFile(rootPath: string, outputPath: string, options: EngineOptions): string | null {
    const filePath = outputPath.replace(/^\.\//, "");

    if (options.mode === "compiled") {
        return resolveCompiledFile(rootPath, filePath, options);
    }

    return resolveSourceFile(rootPath, filePath);
}

/**
 * Compiled mode: find the .d.ts declaration file directly.
 */
export function resolveCompiledFile(rootPath: string, filePath: string, options: EngineOptions): string | null {
    const candidatePaths = [
        filePath,
        filePath.replace(/\.js$/, ".d.ts").replace(/\.mjs$/, ".d.mts").replace(/\.cjs$/, ".d.cts"),
    ];

    for (const candidate of candidatePaths) {
        const direct = path.join(rootPath, candidate);
        if (fs.existsSync(direct)) {
            return direct;
        }

        if (options.dtsRoot) {
            const fromDtsRoot = path.join(options.dtsRoot, candidate);
            if (fs.existsSync(fromDtsRoot)) {
                return fromDtsRoot;
            }
        }
    }

    return null;
}

/**
 * Source mode: resolve an output path (e.g. ./dist/index.js) to the corresponding
 * source file (e.g. ./src/index.ts).
 *
 * Resolution strategy (in order):
 * 1. Direct path with extension conversion (handles paths already pointing at src/)
 * 2. TypeScript module resolution via ts.resolveModuleName (respects tsconfig paths/rootDirs)
 * 3. Relative path probe under project root (strip output dirs, look in src/)
 * 4. Returns null if no source file found
 */
export function resolveSourceFile(rootPath: string, filePath: string): string | null {
    // 1. Direct path with extension conversion (.js → .ts)
    const directPath = convertToSourceExtension(path.join(rootPath, filePath));
    if (fs.existsSync(directPath)) {
        return directPath;
    }

    // 2. TypeScript module resolution (respects tsconfig paths, rootDirs, etc.)
    const tsResolved = tryTypeScriptModuleResolution(rootPath, filePath);
    if (tsResolved && isSourceFile(tsResolved)) {
        return tsResolved;
    }

    // 3. Strip known output directory prefixes and look for source under src/
    const remainder = stripOutputPrefix(filePath);
    if (remainder !== null) {
        const srcPath = path.join(rootPath, "src", convertToSourceExtension(remainder));
        if (fs.existsSync(srcPath)) {
            return srcPath;
        }
    }

    return null;
}

/** Convert a file path's extension from output format to TypeScript source format. */
function convertToSourceExtension(p: string): string {
    return p
        .replace(/\.d\.ts$/, ".ts")
        .replace(/\.d\.mts$/, ".mts")
        .replace(/\.d\.cts$/, ".cts")
        .replace(/\.js$/, ".ts")
        .replace(/\.mjs$/, ".mts")
        .replace(/\.cjs$/, ".cts");
}

/** Returns true if the path points to a .ts/.mts/.cts source file (not .d.ts). */
function isSourceFile(p: string): boolean {
    return (p.endsWith(".ts") || p.endsWith(".mts") || p.endsWith(".cts"))
        && !p.endsWith(".d.ts") && !p.endsWith(".d.mts") && !p.endsWith(".d.cts");
}

/**
 * If the file path starts with a known output directory prefix (e.g. dist/esm/),
 * strips it and returns the remainder. Returns null if no prefix matched.
 */
function stripOutputPrefix(filePath: string): string | null {
    const match = /^dist\/(?:esm|commonjs|browser|react-native|workerd|cjs)\/(.+)$/.exec(filePath);
    if (match) return match[1];
    const plainDist = /^dist\/(.+)$/.exec(filePath);
    if (plainDist) return plainDist[1];
    return null;
}

/**
 * Attempt TypeScript module resolution for a file path.
 * This leverages tsconfig paths, rootDirs, and other compiler options.
 */
export function tryTypeScriptModuleResolution(rootPath: string, filePath: string): string | null {
    const tsconfigPath = path.join(rootPath, "tsconfig.json");
    if (!fs.existsSync(tsconfigPath)) {
        return null;
    }

    try {
        const configFile = ts.readConfigFile(tsconfigPath, ts.sys.readFile);
        if (configFile.error) return null;

        const parsed = ts.parseJsonConfigFileContent(configFile.config, ts.sys, rootPath);
        const specifier = "./" + filePath
            .replace(/\.d\.ts$/, "")
            .replace(/\.ts$/, "")
            .replace(/\.js$/, "")
            .replace(/\.mjs$/, "")
            .replace(/\.cjs$/, "");

        const result = ts.resolveModuleName(
            specifier,
            path.join(rootPath, "package.json"),
            parsed.options,
            ts.sys
        );

        if (result.resolvedModule) {
            return result.resolvedModule.resolvedFileName;
        }
    } catch {
        // tsconfig parsing failed — fall through to heuristic mappings
    }

    return null;
}

/**
 * Information about an exported symbol.
 */
export interface ExportedSymbolInfo {
    /** The export subpath (e.g., "." or "./client") */
    exportPath: string;
    /** Export condition (e.g., "default", "node", "browser") — the primary (most general) condition */
    condition: string;
    /** All conditions this symbol is exported under (includes the primary condition) */
    conditions: Set<string>;
    /** If re-exported from an external package, the package name */
    reExportedFrom?: string;
}

/**
 * Builds a declaration-qualified key for the exported symbols map.
 * Incorporates the declaration file path so that identically-named symbols
 * from different files (e.g., `./models::Client` vs `./rest::Client`) are
 * tracked separately.
 */
export function makeExportSymbolKey(declFilePath: string, name: string): string {
    return `${path.resolve(declFilePath)}::${name}`;
}

export interface EngineOptions {
    mode: "source" | "compiled";
    dtsRoot?: string;
    packageJsonPath?: string;
}

/**
 * Graphs exported symbol names from entry point files.
 * Returns a map from symbol name to its export info (path and optional re-export source).
 *
 * Uses declaration-site condition assignment: a symbol's condition is determined
 * by the entry file where it is DECLARED, not where it is re-exported from.
 * ts-morph's getExportedDeclarations() follows re-exports to the actual declaration,
 * so we compare the declaration's source file against the entry file to distinguish
 * local declarations from re-exports.
 *
 * Algorithm:
 *   For each entry file E with condition C:
 *     For each symbol S exported by E:
 *       If S is declared in E → assign condition C to S
 *       If S is re-exported from another file → skip (that file's condition wins)
 *   Symbols not claimed by any entry's declarations get the condition of the
 *   first entry that exports them (for non-entry files imported transitively).
 */
export function extractExportedSymbols(project: Project, entryEntries: ExportEntry[]): Map<string, ExportedSymbolInfo> {
    // Build set of entry file paths for quick lookup
    const entryFilePaths = new Set(entryEntries.map(e => path.resolve(e.filePath)));

    // Phase 1: Assign conditions based on declaration site.
    // A symbol gets the condition of the entry file where it is DECLARED (not re-exported).
    const exportedSymbols = new Map<string, ExportedSymbolInfo>();

    // Sort entries so "." exportPath comes first, then by condition priority (ascending)
    // for stable tie-breaking when a symbol is declared in multiple entry files.
    const sortedEntries = [...entryEntries].sort((a, b) => {
        if (a.exportPath === "." && b.exportPath !== ".") return -1;
        if (b.exportPath === "." && a.exportPath !== ".") return 1;
        const exportPathCmp = a.exportPath.localeCompare(b.exportPath);
        if (exportPathCmp !== 0) return exportPathCmp;

        const conditionCmp = getConditionPriority(a.condition) - getConditionPriority(b.condition);
        if (conditionCmp !== 0) return conditionCmp;

        return a.condition.localeCompare(b.condition);
    });

    for (const entry of sortedEntries) {
        const sourceFile = project.getSourceFile(entry.filePath);
        if (!sourceFile) continue;

        const entryAbsPath = path.resolve(entry.filePath);

        // Examine each exported symbol's declaration site
        for (const [name, declarations] of sourceFile.getExportedDeclarations()) {
            const qualifiedKey = makeExportSymbolKey(entryAbsPath, name);

            // If already recorded, merge the new condition into the existing entry
            const existingEntry = exportedSymbols.get(qualifiedKey);
            if (existingEntry) {
                existingEntry.conditions.add(entry.condition);
                continue;
            }

            // Check if any declaration lives in THIS entry file (= locally declared)
            const isDeclaredHere = declarations.some(decl => {
                const declFile = path.resolve(decl.getSourceFile().getFilePath());
                return declFile === entryAbsPath;
            });

            if (isDeclaredHere) {
                exportedSymbols.set(qualifiedKey, { exportPath: entry.exportPath, condition: entry.condition, conditions: new Set([entry.condition]) });

                // For aliased re-exports (e.g. `export { InternalClient as Client }`),
                // also store under the declared name so that main.ts lookups by
                // declaration name (from AST walking) find the entry-point info.
                for (const decl of declarations) {
                    const declName = 'getName' in decl && typeof (decl as any).getName === 'function'
                        ? (decl as any).getName() as string
                        : undefined;
                    if (declName && declName !== name) {
                        const declKey = makeExportSymbolKey(entryAbsPath, declName);
                        const existingDeclEntry = exportedSymbols.get(declKey);
                        if (existingDeclEntry) {
                            existingDeclEntry.conditions.add(entry.condition);
                        } else {
                            exportedSymbols.set(declKey, { exportPath: entry.exportPath, condition: entry.condition, conditions: new Set([entry.condition]) });
                        }
                    }
                }
            }
        }

        // Handle re-exports from external packages (these are always "declared" here
        // since the external package isn't part of our project)
        for (const exportDecl of sourceFile.getExportDeclarations()) {
            const moduleSpecifier = exportDecl.getModuleSpecifierValue();
            const isExternalPackage = moduleSpecifier && !moduleSpecifier.startsWith(".") && !moduleSpecifier.startsWith("/");

            if (isExternalPackage) {
                // Handle export * from "pkg" (star re-exports)
                if (exportDecl.getNamedExports().length === 0 && !exportDecl.isTypeOnly()) {
                    // Star re-export — record as a marker for dependency resolution
                    const markerName = `*:${moduleSpecifier}`;
                    const markerKey = makeExportSymbolKey(entryAbsPath, markerName);
                    const existingMarker = exportedSymbols.get(markerKey);
                    if (existingMarker) {
                        existingMarker.conditions.add(entry.condition);
                    } else {
                        exportedSymbols.set(markerKey, {
                            exportPath: entry.exportPath,
                            condition: entry.condition,
                            conditions: new Set([entry.condition]),
                            reExportedFrom: moduleSpecifier,
                        });
                    }
                }

                for (const namedExport of exportDecl.getNamedExports()) {
                    const name = namedExport.getAliasNode()?.getText() ?? namedExport.getName();
                    const qualifiedKey = makeExportSymbolKey(entryAbsPath, name);
                    const existingNamed = exportedSymbols.get(qualifiedKey);
                    if (existingNamed) {
                        existingNamed.conditions.add(entry.condition);
                    } else {
                        exportedSymbols.set(qualifiedKey, {
                            exportPath: entry.exportPath,
                            condition: entry.condition,
                            conditions: new Set([entry.condition]),
                            reExportedFrom: moduleSpecifier
                        });
                    }
                }


            }
        }
    }

    // Phase 2: Symbols declared in non-entry files that are re-exported by entry files.
    // These weren't claimed in phase 1. Assign them the condition of the first entry
    // that exports them (most general, since they're shared).
    for (const entry of sortedEntries) {
        const sourceFile = project.getSourceFile(entry.filePath);
        if (!sourceFile) continue;

        for (const [name, declarations] of sourceFile.getExportedDeclarations()) {
            if (declarations.length === 0) continue;
            // Use the actual declaration file for the qualified key so that
            // lookups from main.ts (keyed by source file path) match correctly.
            const declFile = path.resolve(declarations[0].getSourceFile().getFilePath());
            const qualifiedKey = makeExportSymbolKey(declFile, name);

            // If already recorded, merge the new condition into the existing entry
            const existingShared = exportedSymbols.get(qualifiedKey);
            if (existingShared) {
                existingShared.conditions.add(entry.condition);
                continue;
            }

            // Symbol is re-exported from a non-entry file — claim it with this entry's condition
            const isDeclaredInAnyEntry = declarations.some(decl => {
                const df = path.resolve(decl.getSourceFile().getFilePath());
                return entryFilePaths.has(df);
            });

            if (!isDeclaredInAnyEntry) {
                exportedSymbols.set(qualifiedKey, { exportPath: entry.exportPath, condition: entry.condition, conditions: new Set([entry.condition]) });

                // Also store under declared name(s) for aliased re-exports
                for (const decl of declarations) {
                    const declName = 'getName' in decl && typeof (decl as any).getName === 'function'
                        ? (decl as any).getName() as string
                        : undefined;
                    if (declName && declName !== name) {
                        const declNameKey = makeExportSymbolKey(declFile, declName);
                        const existingDeclName = exportedSymbols.get(declNameKey);
                        if (existingDeclName) {
                            existingDeclName.conditions.add(entry.condition);
                        } else {
                            exportedSymbols.set(declNameKey, { exportPath: entry.exportPath, condition: entry.condition, conditions: new Set([entry.condition]) });
                        }
                    }
                }
            }
        }
    }

    return exportedSymbols;
}

