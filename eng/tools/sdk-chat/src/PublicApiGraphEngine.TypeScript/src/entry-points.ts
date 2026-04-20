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
 * Graphs path values from package.json exports field.
 * Prioritizes the "." (root) export over subpath exports.
 * @param exports - The exports field from package.json
 * @param rootOnly - If true, only extract from the "." export
 * @returns Array of {exportPath, filePath} pairs
 */
export function extractExportPaths(exports: string | Record<string, unknown>, rootOnly: boolean = false): ExportEntry[] {
    const results: ExportEntry[] = [];
    const MAX_DEPTH = 10;
    const visited = new Set<unknown>();

    function visit(value: unknown, exportPath: string, conditions: string[], depth: number = 0): void {
        if (depth > MAX_DEPTH) {
            return;
        }

        if (typeof value === "object" && value !== null) {
            if (visited.has(value)) {
                return;
            }
            visited.add(value);
        }

        if (typeof value === "string") {
            const rawCondition = conditions.length > 0 ? conditions.join("|") : "default";
            const condition = normalizeCondition(rawCondition);
            const conditionChain = conditions.length > 1 ? [...conditions] : undefined;
            results.push({ exportPath, condition, conditionChain, filePath: value });
            return;
        }

        if (typeof value !== "object" || value === null) {
            return;
        }

        const obj = value as Record<string, unknown>;
        const entries = Object.entries(obj);
        for (const [key, nested] of entries) {
            if (key.startsWith(".")) {
                if (!rootOnly || key === ".") {
                    visit(nested, key, conditions, depth + 1);
                }
                continue;
            }

            visit(nested, exportPath, [...conditions, key], depth + 1);
        }
    }

    if (typeof exports === "string") {
        // Simple string export is the root export
        results.push({ exportPath: ".", condition: "default", filePath: exports });
    } else if (typeof exports === "object" && exports !== null) {
        visit(exports, ".", [], 0);
    }

    return results.filter((r) =>
        r.filePath.endsWith(".ts") || r.filePath.endsWith(".d.ts") ||
        r.filePath.endsWith(".js") || r.filePath.endsWith(".mjs")
    );
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

    if (chain.includes("default")) {
        return "default";
    }

    // When "types" co-occurs with another classified condition, prefer the
    // non-types condition so platform-specific modules keep their context.
    const hasTypes = chain.includes("types");
    if (hasTypes) {
        const nonTypes = chain.find(c => c !== "types" && CONDITION_TIERS.has(c));
        if (nonTypes) {
            return nonTypes;
        }
        return "types";
    }

    // Return the first condition that appears in our classification table.
    for (const c of chain) {
        if (CONDITION_TIERS.has(c)) {
            return c;
        }
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
    /** Export condition (e.g., "default", "node", "browser") */
    condition: string;
    /** If re-exported from an external package, the package name */
    reExportedFrom?: string;
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
            if (exportedSymbols.has(name)) continue;

            // Check if any declaration lives in THIS entry file (= locally declared)
            const isDeclaredHere = declarations.some(decl => {
                const declFile = path.resolve(decl.getSourceFile().getFilePath());
                return declFile === entryAbsPath;
            });

            if (isDeclaredHere) {
                exportedSymbols.set(name, { exportPath: entry.exportPath, condition: entry.condition });
            }
        }

        // Handle re-exports from external packages (these are always "declared" here
        // since the external package isn't part of our project)
        for (const exportDecl of sourceFile.getExportDeclarations()) {
            const moduleSpecifier = exportDecl.getModuleSpecifierValue();
            const isExternalPackage = moduleSpecifier && !moduleSpecifier.startsWith(".") && !moduleSpecifier.startsWith("/");

            if (isExternalPackage) {
                for (const namedExport of exportDecl.getNamedExports()) {
                    const name = namedExport.getAliasNode()?.getText() ?? namedExport.getName();
                    if (!exportedSymbols.has(name)) {
                        exportedSymbols.set(name, {
                            exportPath: entry.exportPath,
                            condition: entry.condition,
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
            if (exportedSymbols.has(name)) continue;

            // Symbol is re-exported from a non-entry file — claim it with this entry's condition
            const isDeclaredInAnyEntry = declarations.some(decl => {
                const declFile = path.resolve(decl.getSourceFile().getFilePath());
                return entryFilePaths.has(declFile);
            });

            if (!isDeclaredInAnyEntry) {
                exportedSymbols.set(name, { exportPath: entry.exportPath, condition: entry.condition });
            }
        }
    }

    return exportedSymbols;
}

