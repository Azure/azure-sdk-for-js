#!/usr/bin/env node
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Graph public API surface from TypeScript/JavaScript packages.
 * Uses ts-morph for proper TypeScript parsing.
 */

import {
    Project,
    SourceFile,
    ts,
} from "ts-morph";
import * as fs from "fs";
import * as path from "path";
import type {
    ApiIndex,
    ModuleInfo,
    DependencyInfo,
    NamespaceInfo,
    TypeAliasInfo,
} from "./models.js";
import { ExtractionContext } from "./context.js";
import { createExtractionContext, clearTypeRefCache } from "./type-refs.js";
import { extractModule } from "./extractors.js";
import {
    resolveEntryPointFiles,
    extractExportedSymbols,
    getConditionPriority,
    makeExportSymbolKey,
} from "./entry-points.js";
import type { EngineOptions, ExportEntry, ExportedSymbolInfo } from "./entry-points.js";
import { computeReachableTypes, validateSelfContainment, computeAmbientTypes, makeQualifiedKey } from "./reachability.js";
import {
    resolveTransitiveDependencies,
    buildResolvedDependencies,
    findPackageInNodeModules,
    clearResolvedPackageCache,
} from "./dependencies.js";
import { isNodeBuiltinModule } from "./node-builtins.js";
import { formatStubs, toJson } from "./formatter.js";
import { analyzeUsage } from "./usage.js";
import { resolveCollisions } from "./collision.js";
import { emitDiagnostic } from "./diagnostics.js";

// ============================================================================
// Helpers
// ============================================================================

/**
 * Checks whether a context entity key (possibly dotted, e.g. "NS.Client")
 * is reachable given a set of qualified keys (e.g. "mod/NS/Client").
 * Builds a qualified key from the module name and entity key segments,
 * then checks if it exists in the reachable set.
 * Falls back to checking if any segment matches the last part of any qualified key
 * when no module context is available.
 */
export function isEntityKeyReachable(entityKey: string, reachableTypes: Set<string>, moduleName?: string): boolean {
    if (moduleName) {
        // Build qualified key from module + entity key
        // entityKey may be dotted like "NS.Client" → nsPath="NS", name="Client"
        const parts = entityKey.split(".");
        const entityName = parts.pop()!;
        const nsPath = parts.length > 0 ? parts.join(".") : undefined;
        return reachableTypes.has(makeQualifiedKey(moduleName, entityName, nsPath));
    }
    // Without module context, check if any qualified key ends with the entity name
    for (const qk of reachableTypes) {
        const lastSlash = qk.lastIndexOf("/");
        const simpleName = lastSlash >= 0 ? qk.substring(lastSlash + 1) : qk;
        if (entityKey.split(".").some(seg => seg === simpleName)) {
            return true;
        }
    }
    return false;
}

// ============================================================================
// Entry-Point Symbol Lookup
// ============================================================================

/**
 * Looks up an exported symbol from the declaration-qualified entry-point map.
 * Uses the source file path where the entity is declared to build the
 * qualified key, matching the key format produced by extractExportedSymbols.
 */
function lookupEntryPointSymbol(
    entryPointSymbols: Map<string, ExportedSymbolInfo>,
    sourceFilePath: string,
    name: string,
): ExportedSymbolInfo | undefined {
    return entryPointSymbols.get(makeExportSymbolKey(sourceFilePath, name));
}

// ============================================================================
// Package Engine
// ============================================================================

/**
 * Resolves a package.json "imports" field condition map to a file path string.
 * Walks the condition tree preferring "default", falling back to first string value.
 */
function resolveImportCondition(mapping: unknown): string | undefined {
    if (typeof mapping === "string") return mapping;
    if (mapping && typeof mapping === "object" && !Array.isArray(mapping)) {
        const obj = mapping as Record<string, unknown>;
        // Prefer "default" condition, then fall back to first available
        if (obj["default"] !== undefined) return resolveImportCondition(obj["default"]);
        for (const value of Object.values(obj)) {
            const result = resolveImportCondition(value);
            if (result) return result;
        }
    }
    return undefined;
}

function detectPackageName(rootPath: string, packageJsonPath?: string): string {
    const pkgPath = packageJsonPath ?? path.join(rootPath, "package.json");
    if (fs.existsSync(pkgPath)) {
        const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
        return pkg.name || path.basename(rootPath);
    }
    return path.basename(rootPath);
}

function detectPackageVersion(rootPath: string, packageJsonPath?: string): string | undefined {
    const pkgPath = packageJsonPath ?? path.join(rootPath, "package.json");
    if (fs.existsSync(pkgPath)) {
        const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
        return pkg.version || undefined;
    }
    return undefined;
}

/**
 * Resolves the ES lib target from the package's tsconfig chain.
 * Tries tsconfig.src.json first (common in azure-sdk-for-js), then tsconfig.json.
 * Returns a normalized lowercase lib name like "es2023", or undefined if not found.
 */
function detectEsLib(rootPath: string, packageJsonPath?: string): string | undefined {
    const pkgPath = packageJsonPath ?? path.join(rootPath, "package.json");
    const packageRoot = fs.existsSync(pkgPath) ? path.dirname(pkgPath) : rootPath;
    // Prefer tsconfig.src.json (azure-sdk convention for source compilation options)
    const candidates = [
        path.join(packageRoot, "tsconfig.src.json"),
        path.join(packageRoot, "tsconfig.json"),
    ];
    for (const configPath of candidates) {
        if (!fs.existsSync(configPath)) continue;
        try {
            const configFile = ts.readConfigFile(configPath, ts.sys!.readFile);
            if (configFile.error) continue;
            const parsed = ts.parseJsonConfigFileContent(
                configFile.config, ts.sys!, path.dirname(configPath),
            );
            // Check explicit lib array first — it's more specific than target
            if (parsed.options.lib && parsed.options.lib.length > 0) {
                // Find the highest ES lib (e.g. "lib.es2023.d.ts" → "es2023")
                const esLibs = parsed.options.lib
                    .map((l: string) => l.replace(/^lib\./, "").replace(/\.d\.ts$/, ""))
                    .filter((l: string) => /^es\d{4,}$/i.test(l))
                    .sort();
                if (esLibs.length > 0) return esLibs[esLibs.length - 1].toLowerCase();
            }
            // Fall back to target
            if (parsed.options.target !== undefined) {
                const targetName = ts.ScriptTarget[parsed.options.target];
                if (targetName && /^ES\d{4,}$/i.test(targetName)) {
                    return targetName.toLowerCase();
                }
            }
        } catch {
            continue;
        }
    }
    return undefined;
}


export function extractPackage(rootPath: string, options: EngineOptions = { mode: "source" }): ApiIndex {
    // Clear process-global caches so repeated calls within the same process
    // don't leak state from a previous extraction run.
    clearTypeRefCache();
    clearResolvedPackageCache();

    const packageName = detectPackageName(rootPath, options.packageJsonPath);
    const packageVersion = detectPackageVersion(rootPath, options.packageJsonPath);

    // Find tsconfig or create minimal config
    const tsConfigPath = path.join(rootPath, "tsconfig.json");

    // Resolve package.json "imports" field (e.g. #platform/*) into TypeScript
    // path mappings so that ts-morph can follow re-exports through subpath imports.
    const pkgJsonPathForImports = options.packageJsonPath ?? path.join(rootPath, "package.json");
    const tsPaths: Record<string, string[]> = {};
    if (fs.existsSync(pkgJsonPathForImports)) {
        try {
            const pkg = JSON.parse(fs.readFileSync(pkgJsonPathForImports, "utf-8"));
            if (pkg.imports && typeof pkg.imports === "object") {
                for (const [specifier, mapping] of Object.entries(pkg.imports)) {
                    // Resolve the "default" condition to a source file path
                    const resolved = resolveImportCondition(mapping);
                    if (resolved) {
                        tsPaths[specifier] = [path.join(rootPath, resolved)];
                    }
                }
            }
        } catch { /* non-fatal */ }
    }

    const project = new Project({
        tsConfigFilePath: fs.existsSync(tsConfigPath) ? tsConfigPath : undefined,
        skipAddingFilesFromTsConfig: true,
        compilerOptions: {
            allowJs: true,
            declaration: true,
            emitDeclarationOnly: true,
            skipLibCheck: true,
            ...(Object.keys(tsPaths).length > 0 ? { paths: tsPaths, baseUrl: rootPath } : {}),
        },
    });

    // Initialize extraction context — consolidates all mutable state
    // (builtins, type collector, package name cache) for this extraction run.
    const ctx = createExtractionContext(project);

    // Populate direct dependencies from the main package's package.json.
    // This tells the collision detector which packages are expected deps
    // vs transitive deps that shouldn't be pulled in.
    const mainPkgJsonPath = options.packageJsonPath ?? path.join(rootPath, "package.json");
    if (fs.existsSync(mainPkgJsonPath)) {
        try {
            const mainPkg = JSON.parse(fs.readFileSync(mainPkgJsonPath, "utf-8"));
            for (const depName of [
                ...Object.keys(mainPkg.dependencies ?? {}),
                ...Object.keys(mainPkg.peerDependencies ?? {}),
            ]) {
                ctx.directDependencies.add(depName);
            }
        } catch { /* non-fatal */ }
    }

    // Find source files
    const srcDir = path.join(rootPath, "src");
    const sourceDir = options.mode === "compiled"
        ? (options.dtsRoot ?? rootPath)
        : (fs.existsSync(srcDir) ? srcDir : rootPath);

    // Add source files
    const patterns = options.mode === "compiled"
        ? [path.join(sourceDir, "**/*.d.ts"), path.join(sourceDir, "**/*.d.mts"), path.join(sourceDir, "**/*.d.cts")]
        : [
            path.join(sourceDir, "**/*.ts"),
            path.join(sourceDir, "**/*.tsx"),
            path.join(sourceDir, "**/*.mts"),
            path.join(sourceDir, "**/*.cts"),
        ];

    for (const pattern of patterns) {
        project.addSourceFilesAtPaths(pattern);
    }

    // Fail fast if no source files were discovered
    const loadedFiles = project.getSourceFiles();
    if (loadedFiles.length === 0) {
        emitDiagnostic({
            code: "NO_SOURCE_FILES",
            message: `No source files found in ${sourceDir} (mode: ${options.mode})`,
            severity: "error",
        });
        throw new Error(`No source files found in ${sourceDir} (mode: ${options.mode}). Check that the package path and tsconfig are correct.`);
    }

    // Check for critical compilation errors before extraction
    const preDiagnostics = project.getPreEmitDiagnostics();
    const errors = preDiagnostics.filter(d => d.getCategory() === ts.DiagnosticCategory.Error);
    if (errors.length > 0) {
        for (const err of errors.slice(0, 10)) {
            emitDiagnostic({
                code: "SYNTAX_ERROR",
                message: typeof err.getMessageText() === "string" 
                    ? err.getMessageText() as string 
                    : (err.getMessageText() as any).getMessageText?.() ?? String(err.getMessageText()),
                severity: "error",
                target: err.getSourceFile()?.getFilePath(),
            });
        }
        emitDiagnostic({
            code: "SYNTAX_ERRORS_FOUND",
            message: `${errors.length} compilation error(s) found; extraction may be incomplete`,
            severity: "warning",
        });
    }

    // Detect entry point files and extract exported symbols
    const entryEntries = resolveEntryPointFiles(rootPath, options);
    const entryPointSymbols = extractExportedSymbols(project, entryEntries);

    // Collect import declarations from all source files for import-based
    // dependency tracking (handles uninstalled packages)
    const sourceFilesForImports = project.getSourceFiles().filter(sf => {
        const fp = sf.getFilePath();
        return !fp.includes("node_modules");
    });
    ctx.typeRefs.collectFromImportDeclarations(sourceFilesForImports);

    // Collect namespace import aliases (import * as X from "pkg") so that
    // type display text like coreClient.OperationOptions gets stripped to
    // just OperationOptions, making stubs self-contained.
    ctx.namespaceAliases = new Set<string>();
    for (const sf of sourceFilesForImports) {
        for (const imp of sf.getImportDeclarations()) {
            const nsImport = imp.getNamespaceImport();
            if (nsImport) {
                ctx.namespaceAliases.add(nsImport.getText());
            }
        }
    }

    const modules: ModuleInfo[] = [];
    const moduleSourceFileMap: Array<[ModuleInfo, SourceFile]> = []; // for condition propagation

    for (const sourceFile of project.getSourceFiles()) {
        const filePath = sourceFile.getFilePath();

        // Skip tests, node_modules, etc (but allow TestFixtures for engine tests)
        const isTestFixture = filePath.includes("TestFixtures");
        if (
            !isTestFixture &&
            (filePath.includes("node_modules") ||
            filePath.includes(".test.") ||
            filePath.includes(".spec.") ||
            filePath.includes("/test/") ||
            filePath.includes("/tests/"))
        ) {
            continue;
        }

        // Calculate module name
        let moduleName = path.relative(sourceDir, filePath);
        moduleName = moduleName.replace(/\.d\.(ts|mts|cts)$/, "");
        moduleName = moduleName.replace(/\.(ts|tsx|mts|cts)$/, "");
        moduleName = moduleName.replace(/\\/g, "/");
        if (moduleName.endsWith("/index")) {
            moduleName = moduleName.slice(0, -6) || "index";
        }

        ctx.typeRefs.setModule(moduleName);
        const module = extractModule(sourceFile, moduleName, ctx);
        if (module) {
            // Set module condition+exportPath from entryEntries by file path.
            // Pick the most general (lowest-priority) condition for the module itself,
            // since a module appearing in multiple conditions serves all of them.
            // Individual symbols within the module get their most specific condition
            // via extractExportedSymbols.
            const resolvedFilePath = path.resolve(sourceFile.getFilePath());
            const matchingEntries = entryEntries
                .filter(e => path.resolve(e.filePath) === resolvedFilePath)
                .sort((a, b) => getConditionPriority(a.condition) - getConditionPriority(b.condition));
            if (matchingEntries.length > 0) {
                const primary = matchingEntries[0];
                module.condition = primary.condition;
                module.conditionChain = primary.conditionChain;
                module.exportPath = primary.exportPath;
            }

            // Mark entry points based on package.json exports
            const applyEntryPoint = (item: { entryPoint?: boolean; exportPath?: string; reExportedFrom?: string }, info: { exportPath: string; reExportedFrom?: string }) => {
                item.entryPoint = true;
                item.exportPath = info.exportPath;
                if (info.reExportedFrom) {
                    item.reExportedFrom = info.reExportedFrom;
                }
            };

            if (module.classes) {
                for (const cls of module.classes) {
                    const exportInfo = lookupEntryPointSymbol(entryPointSymbols, sourceFile.getFilePath(), cls.name);
                    if (exportInfo !== undefined) {
                        applyEntryPoint(cls, exportInfo);
                    }
                }
            }
            if (module.interfaces) {
                for (const iface of module.interfaces) {
                    const exportInfo = lookupEntryPointSymbol(entryPointSymbols, sourceFile.getFilePath(), iface.name);
                    if (exportInfo !== undefined) {
                        applyEntryPoint(iface, exportInfo);
                    }
                }
            }
            if (module.functions) {
                for (const func of module.functions) {
                    const exportInfo = lookupEntryPointSymbol(entryPointSymbols, sourceFile.getFilePath(), func.name);
                    if (exportInfo !== undefined) {
                        applyEntryPoint(func, exportInfo);
                    }
                }
            }
            // Mark enums and type aliases too
            if (module.enums) {
                for (const enumInfo of module.enums) {
                    const exportInfo = lookupEntryPointSymbol(entryPointSymbols, sourceFile.getFilePath(), enumInfo.name);
                    if (exportInfo !== undefined) {
                        applyEntryPoint(enumInfo, exportInfo);
                    }
                }
            }
            if (module.types) {
                for (const typeInfo of module.types) {
                    const exportInfo = lookupEntryPointSymbol(entryPointSymbols, sourceFile.getFilePath(), typeInfo.name);
                    if (exportInfo !== undefined) {
                        applyEntryPoint(typeInfo, exportInfo);
                    }
                }
            }
            if (module.variables) {
                for (const varInfo of module.variables) {
                    const exportInfo = lookupEntryPointSymbol(entryPointSymbols, sourceFile.getFilePath(), varInfo.name);
                    if (exportInfo !== undefined) {
                        applyEntryPoint(varInfo, exportInfo);
                    }
                }
            }
            // Mark namespaces that are exported from entry points
            if (module.namespaces) {
                markEntryPointNamespaces(module.namespaces, entryPointSymbols, sourceFile.getFilePath());
            }

            // Create synthetic type aliases for aliased re-exports where the
            // exported name differs from the declaration name.
            const sourceExports = sourceFile.getExportedDeclarations();
            for (const [exportedName, decls] of sourceExports) {
                if (exportedName === "default") continue;
                for (const decl of decls) {
                    const declName = decl.getSymbol()?.getName();
                    if (!declName || declName === exportedName) continue;
                    // Check if the declaration name exists as an entity in this module
                    const hasEntity =
                        module.classes?.some(c => c.name === declName) ||
                        module.interfaces?.some(i => i.name === declName) ||
                        module.functions?.some(f => f.name === declName) ||
                        module.enums?.some(e => e.name === declName) ||
                        module.types?.some(t => t.name === declName) ||
                        module.variables?.some(v => v.name === declName);
                    if (hasEntity) {
                        // Check we don't already have an entity or alias with the exported name
                        const alreadyExists =
                            module.classes?.some(c => c.name === exportedName) ||
                            module.interfaces?.some(i => i.name === exportedName) ||
                            module.types?.some(t => t.name === exportedName);
                        if (!alreadyExists) {
                            const alias: TypeAliasInfo = {
                                name: exportedName,
                                type: declName,
                                entryPoint: true,
                                exportPath: module.exportPath,
                            };
                            (module.types ??= []).push(alias);
                        }
                    }
                }
            }

            modules.push(module);
            moduleSourceFileMap.push([module, sourceFile]);

            // Clone module for additional export paths so that the same source
            // file exported from e.g. "." and "./models" produces separate modules.
            if (matchingEntries.length > 1) {
                for (let i = 1; i < matchingEntries.length; i++) {
                    const extra = matchingEntries[i];
                    if (extra.exportPath === matchingEntries[0].exportPath && extra.condition === matchingEntries[0].condition) continue;
                    const clone: ModuleInfo = {
                        ...module,
                        condition: extra.condition,
                        conditionChain: extra.conditionChain,
                        exportPath: extra.exportPath,
                        classes: module.classes?.map(c => ({ ...c, exportPath: extra.exportPath })),
                        interfaces: module.interfaces?.map(ifc => ({ ...ifc, exportPath: extra.exportPath })),
                        functions: module.functions?.map(f => ({ ...f, exportPath: extra.exportPath })),
                        enums: module.enums?.map(e => ({ ...e, exportPath: extra.exportPath })),
                        types: module.types?.map(t => ({ ...t, exportPath: extra.exportPath })),
                        variables: module.variables?.map(v => ({ ...v, exportPath: extra.exportPath })),
                        namespaces: module.namespaces
                            ? JSON.parse(JSON.stringify(module.namespaces)).map((ns: any) => {
                                ns.exportPath = extra.exportPath;
                                return ns;
                            })
                            : undefined,
                    };
                    modules.push(clone);
                    moduleSourceFileMap.push([clone, sourceFile]);
                }
            }
        }
    }

    // Second pass: propagate conditions transitively to non-entry modules.
    // Uses BFS: entry files seed the queue, then any file that gains a condition
    // propagates it to the files it imports, continuing until no more changes.
    const fileConditions = new Map<string, Set<string>>(); // absolute path → set of conditions
    for (const entry of entryEntries) {
        const absPath = path.resolve(entry.filePath);
        if (!fileConditions.has(absPath)) fileConditions.set(absPath, new Set());
        fileConditions.get(absPath)!.add(entry.condition);
    }

    // Build a map from source file path → module for quick lookup
    const pathToModuleSource = new Map<string, [ModuleInfo, SourceFile][]>();
    for (const pair of moduleSourceFileMap) {
        const absPath = path.resolve(pair[1].getFilePath());
        if (!pathToModuleSource.has(absPath)) pathToModuleSource.set(absPath, []);
        pathToModuleSource.get(absPath)!.push(pair);
    }

    // BFS: propagate conditions through import edges (union of parent conditions)
    let changed = true;
    while (changed) {
        changed = false;
        for (const [, sourceFile] of moduleSourceFileMap) {
            const thisPath = path.resolve(sourceFile.getFilePath());
            const currentSet = fileConditions.get(thisPath);
            for (const refSf of sourceFile.getReferencingSourceFiles()) {
                const refPath = path.resolve(refSf.getFilePath());
                const parentSet = fileConditions.get(refPath);
                if (!parentSet || parentSet.size === 0) continue;
                if (!currentSet) {
                    fileConditions.set(thisPath, new Set(parentSet));
                    changed = true;
                } else {
                    for (const c of parentSet) {
                        if (!currentSet.has(c)) {
                            currentSet.add(c);
                            changed = true;
                        }
                    }
                }
            }
        }
    }

    // Assign the most general (lowest-priority) inherited condition to modules
    // that don't already have one from a direct entry-point match.
    for (const [module, sourceFile] of moduleSourceFileMap) {
        if (module.condition !== undefined) continue;
        const thisPath = path.resolve(sourceFile.getFilePath());
        const condSet = fileConditions.get(thisPath);
        if (condSet && condSet.size > 0) {
            let best: string | undefined;
            for (const c of condSet) {
                if (best === undefined || getConditionPriority(c) < getConditionPriority(best)) {
                    best = c;
                }
            }
            if (best !== undefined) {
                module.condition = best;
            }
        }
    }

    // Clone modules for shared files whose symbols are exported under multiple conditions.
    // Entry-file modules already got cloned above (matchingEntries > 1). This pass handles
    // non-entry shared files whose symbols were claimed by multiple conditions in
    // extractExportedSymbols, plus conditions inherited through the import graph.
    const additionalModules: ModuleInfo[] = [];
    // Pre-populate a HashSet of existing dedup keys for O(1) lookup during clone pass.
    const existingDedupKeys = new Set<string>();
    for (let i = 0; i < moduleSourceFileMap.length; i++) {
        const [m, sf] = moduleSourceFileMap[i];
        const fk = path.resolve(sf.getFilePath());
        existingDedupKeys.add(`${m.name}\0${m.exportPath ?? ""}\0${m.condition}\0${fk}`);
    }
    for (const [module, sourceFile] of moduleSourceFileMap) {
        // Collect all conditions this module's symbols are exported under
        const allConditions = new Set<string>();
        if (module.condition) allConditions.add(module.condition);

        // Include conditions inherited through the import graph (file-level)
        const sfAbsPath = path.resolve(sourceFile.getFilePath());
        const inheritedConditions = fileConditions.get(sfAbsPath);
        if (inheritedConditions) {
            for (const c of inheritedConditions) allConditions.add(c);
        }

        const sfPath = sourceFile.getFilePath();
        for (const entityList of [module.classes, module.interfaces, module.functions, module.enums, module.types, module.variables]) {
            if (!entityList) continue;
            for (const entity of entityList) {
                const entityName = (entity as { name?: string }).name;
                if (!entityName) continue;
                const info = lookupEntryPointSymbol(entryPointSymbols, sfPath, entityName);
                if (info?.conditions) {
                    for (const c of info.conditions) allConditions.add(c);
                }
            }
        }
        if (module.namespaces) {
            for (const ns of module.namespaces) {
                const info = lookupEntryPointSymbol(entryPointSymbols, sfPath, ns.name);
                if (info?.conditions) {
                    for (const c of info.conditions) allConditions.add(c);
                }
            }
        }

        // If the original module has no condition but symbols do, promote the
        // best-priority condition to the original so we don't leak a bogus
        // unconditioned module alongside condition clones.
        if (module.condition === undefined && allConditions.size > 0) {
            let best: string | undefined;
            for (const c of allConditions) {
                if (best === undefined || getConditionPriority(c) < getConditionPriority(best)) {
                    best = c;
                }
            }
            if (best !== undefined) {
                module.condition = best;
            }
        }

        // Clone module for any conditions not already covered
        for (const cond of allConditions) {
            if (cond === module.condition) continue;
            // Include exportPath in dedup key so the same source module exposed
            // through two subpaths produces separate clones.
            // Include source file path in dedup key so that two different files
            // normalizing to the same module name produce separate clones.
            const sfKey = path.resolve(sourceFile.getFilePath());
            const dedupKey = `${module.name}\0${module.exportPath ?? ""}\0${cond}\0${sfKey}`;
            if (existingDedupKeys.has(dedupKey)) continue;

            const clone: ModuleInfo = {
                ...module,
                condition: cond,
                classes: module.classes?.map(c => ({ ...c })),
                interfaces: module.interfaces?.map(ifc => ({ ...ifc })),
                functions: module.functions?.map(f => ({ ...f })),
                enums: module.enums?.map(e => ({ ...e })),
                types: module.types?.map(t => ({ ...t })),
                variables: module.variables?.map(v => ({ ...v })),
                namespaces: module.namespaces
                    ? JSON.parse(JSON.stringify(module.namespaces))
                    : undefined,
            };
            additionalModules.push(clone);
            moduleSourceFileMap.push([clone, sourceFile]);
            existingDedupKeys.add(dedupKey);
        }
    }
    modules.push(...additionalModules);

    const baseResult: ApiIndex = {
        package: packageName,
        version: packageVersion,
        modules: modules.sort((a, b) => a.name.localeCompare(b.name)),
        esLib: detectEsLib(rootPath, options.packageJsonPath),
    };

    // Populate referencedTypes on all entities from compiler-resolved type refs.
    // This must happen before computeReachableTypes so BFS can use the data.
    function populateEntityRefs(source: { classes?: { name: string; referencedTypes?: string[] }[]; interfaces?: { name: string; referencedTypes?: string[] }[]; enums?: { name: string; referencedTypes?: string[] }[]; types?: { name: string; referencedTypes?: string[] }[]; functions?: { name?: string; referencedTypes?: string[] }[]; variables?: { name: string; referencedTypes?: string[] }[]; namespaces?: NamespaceInfo[] }, contextRefNames: Map<string, string[]>, prefix = ""): void {
        for (const cls of source.classes || []) {
            const key = prefix ? `${prefix}.${cls.name}` : cls.name;
            const refs = contextRefNames.get(key);
            if (refs?.length) cls.referencedTypes = refs;
        }
        for (const iface of source.interfaces || []) {
            const key = prefix ? `${prefix}.${iface.name}` : iface.name;
            const refs = contextRefNames.get(key);
            if (refs?.length) iface.referencedTypes = refs;
        }
        for (const en of source.enums || []) {
            const key = prefix ? `${prefix}.${en.name}` : en.name;
            const refs = contextRefNames.get(key);
            if (refs?.length) en.referencedTypes = refs;
        }
        for (const t of source.types || []) {
            const key = prefix ? `${prefix}.${t.name}` : t.name;
            const refs = contextRefNames.get(key);
            if (refs?.length) t.referencedTypes = refs;
        }
        for (const fn of source.functions || []) {
            if (!fn.name) continue;
            const key = prefix ? `${prefix}.${fn.name}` : fn.name;
            const refs = contextRefNames.get(key);
            if (refs?.length) fn.referencedTypes = refs;
        }
        for (const v of source.variables || []) {
            const key = prefix ? `${prefix}.${v.name}` : v.name;
            const refs = contextRefNames.get(key);
            if (refs?.length) v.referencedTypes = refs;
        }
        for (const ns of source.namespaces || []) {
            const nsPrefix = prefix ? `${prefix}.${ns.name}` : ns.name;
            populateEntityRefs(ns, contextRefNames, nsPrefix);
        }
    }
    for (const mod of baseResult.modules) {
        const contextRefNames = ctx.typeRefs.getContextRefNames(mod.name);
        populateEntityRefs(mod, contextRefNames);
    }

    // Compute types reachable from entry points
    const reachableTypes = computeReachableTypes(baseResult);

    // Filter modules to only include reachable types (using qualified keys)
    if (reachableTypes.size > 0) {
        for (const mod of baseResult.modules) {
            if (mod.classes) mod.classes = mod.classes.filter(c => reachableTypes.has(makeQualifiedKey(mod.name, c.name)));
            if (mod.interfaces) mod.interfaces = mod.interfaces.filter(i => reachableTypes.has(makeQualifiedKey(mod.name, i.name)));
            if (mod.enums) mod.enums = mod.enums.filter(e => reachableTypes.has(makeQualifiedKey(mod.name, e.name)));
            if (mod.types) mod.types = mod.types.filter(t => reachableTypes.has(makeQualifiedKey(mod.name, t.name)));
            if (mod.functions) mod.functions = mod.functions.filter(f => f.name && reachableTypes.has(makeQualifiedKey(mod.name, f.name)));
            if (mod.variables) mod.variables = mod.variables.filter(v => reachableTypes.has(makeQualifiedKey(mod.name, v.name)));
            // Filter namespace members against the reachable set
            if (mod.namespaces) {
                mod.namespaces = filterNamespaces(mod.namespaces, reachableTypes, mod.name);
            }
        }
        // Remove empty modules (including modules with only empty namespaces)
        baseResult.modules = baseResult.modules.filter(m =>
            (m.classes?.length ?? 0) > 0 || (m.interfaces?.length ?? 0) > 0 ||
            (m.enums?.length ?? 0) > 0 || (m.types?.length ?? 0) > 0 ||
            (m.functions?.length ?? 0) > 0 || (m.variables?.length ?? 0) > 0 || (m.namespaces?.length ?? 0) > 0
        );
    }

    if (baseResult.modules.length === 0) {
        emitDiagnostic({
            code: "NO_MODULES_EXTRACTED",
            message: "No modules with public API surface were extracted",
            severity: "warning",
        });
    }

    // Collect qualified (dotted) type references for ambient type display (e.g., NodeJS.ReadableStream).
    // Placed after reachability pruning so downstream computeAmbientTypes sees the filtered API.
    // Only include refs from entities that survived pruning (reachable).
    const qualifiedRefs = ctx.typeRefs.getAllQualifiedRefNames();
    if (qualifiedRefs.size > 0) {
        if (reachableTypes.size > 0) {
            // Filter to only include qualified refs whose owning entity is reachable.
            // Iterate per-module so we can build proper qualified keys for comparison.
            const reachableQualifiedRefs = new Set<string>();
            for (const mod of baseResult.modules) {
                const moduleContextRefNames = ctx.typeRefs.getContextRefNames(mod.name);
                for (const [entityKey, refs] of moduleContextRefNames) {
                    if (isEntityKeyReachable(entityKey, reachableTypes, mod.name)) {
                        for (const ref of refs) {
                            if (qualifiedRefs.has(ref)) {
                                reachableQualifiedRefs.add(ref);
                            }
                        }
                    }
                }
            }
            if (reachableQualifiedRefs.size > 0) {
                baseResult.qualifiedReferencedTypes = [...reachableQualifiedRefs];
            }
        } else {
            baseResult.qualifiedReferencedTypes = [...qualifiedRefs];
        }
    }

    // Resolve transitive dependencies (scoped to reachable types)
    const dependencies = resolveTransitiveDependencies(baseResult, ctx, rootPath, reachableTypes);
    if (dependencies.length > 0) {
        // Separate self-package entries (internal aliases) from external deps.
        // Internal import aliases (e.g., `import { X as Y } from "./generated"`)
        // produce same-package "deps" that should be injected back as type aliases
        // into the main package modules, not emitted as external dependencies.
        const selfPkgIdx = dependencies.findIndex(d => d.package === packageName);
        if (selfPkgIdx !== -1) {
            const selfPkgDep = dependencies.splice(selfPkgIdx, 1)[0];
            const selfTypes = selfPkgDep.types?.filter(t => t.type !== "unresolved") ?? [];
            if (selfTypes.length > 0) {
                // Add internal aliases to one module per condition group so they
                // are visible in every condition's declare module block without
                // causing duplicates within a single block.
                // Build a set of all names already defined across ALL modules per condition
                // group, since the formatter combines all modules of the same condition
                // into one `declare module` block.
                const compositeExistingNames = new Map<string, Set<string>>();
                for (const mod of baseResult.modules) {
                    const key = `${mod.exportPath ?? "."}|${mod.condition ?? "default"}`;
                    if (!compositeExistingNames.has(key)) compositeExistingNames.set(key, new Set());
                    const names = compositeExistingNames.get(key)!;
                    for (const c of mod.classes ?? []) names.add(c.name);
                    for (const i of mod.interfaces ?? []) names.add(i.name);
                    for (const e of mod.enums ?? []) names.add(e.name);
                    for (const t of mod.types ?? []) names.add(t.name);
                }
                const compositeKeysSeen = new Set<string>();
                for (const mod of baseResult.modules) {
                    const key = `${mod.exportPath ?? "."}|${mod.condition ?? "default"}`;
                    if (compositeKeysSeen.has(key)) continue;
                    compositeKeysSeen.add(key);
                    const existingNames = compositeExistingNames.get(key) ?? new Set();
                    const filtered = selfTypes.filter(t => !existingNames.has(t.name));
                    if (filtered.length > 0) {
                        (mod.types ??= []).push(...filtered);
                    }
                }
            }
        }
        baseResult.dependencies = dependencies;
        // Build condition-aware resolved dependencies for proper declare module rendering
        const resolvedDeps = buildResolvedDependencies(dependencies, rootPath, ctx);
        if (resolvedDeps.length > 0) {
            baseResult.resolvedDependencies = resolvedDeps;
        }

        // Principled collision resolution: detect type name collisions between
        // main and deps (and between deps), build an alias map, and rewrite
        // main entity bodies to use aliased names where needed.
        const contextRefPackages = ctx.typeRefs.getContextRefNamesWithPackages();
        const collisionAliases = resolveCollisions(baseResult, contextRefPackages);
        if (Object.keys(collisionAliases).length > 0) {
            baseResult.collisionAliases = collisionAliases;
        }
    }

    // Phase 8: Emit structured diagnostics to stderr for unresolved dependencies.
    // The C# host parses each stderr JSON line into a typed ApiDiagnostic.
    const reportedPackages = new Set<string>();
    if (dependencies.length > 0) {
        for (const dep of dependencies) {
            if (dep.isNode) continue;
            const unresolvedTypes = (dep.types ?? []).filter(t => t.type === "unresolved");
            if (unresolvedTypes.length > 0) {
                const typeNames = unresolvedTypes.map(t => t.name).join(", ");
                emitDiagnostic({
                    code: "UNRESOLVED_DEPENDENCY",
                    target: dep.package,
                    message: `Unresolved dependency: package '${dep.package}' has ${unresolvedTypes.length} unresolved type(s): ${typeNames}`,
                    severity: "warning",
                });
            }
            // Track all resolved dependency packages so the "not installed" check
            // below skips them. The dependency engine already resolved these types
            // regardless of where node_modules lives.
            reportedPackages.add(dep.package);
        }
    }

    // Also check for imported packages that couldn't be resolved at all.
    // Walk up the directory tree to find node_modules (standard Node.js resolution)
    // since rootPath may be a subdirectory like sdk/src rather than the project root.
    const importedPackages = ctx.typeRefs.getImportedPackages();
    for (const [, pkgName] of importedPackages) {
        if (reportedPackages.has(pkgName)) continue;
        // Node built-in modules are never in node_modules — skip them
        if (isNodeBuiltinModule(pkgName)) continue;
        if (!findPackageInNodeModules(rootPath, pkgName)) {
            emitDiagnostic({
                code: "UNRESOLVED_DEPENDENCY",
                target: pkgName,
                message: `Unresolved dependency: package '${pkgName}' is referenced but not installed`,
                severity: "warning",
            });
            reportedPackages.add(pkgName);
        }
    }

    // Emit collected extraction diagnostics to stderr as structured JSON.
    if (ctx.diagnostics.length > 0) {
        const MAX_INDIVIDUAL = 20;
        const emitted = Math.min(ctx.diagnostics.length, MAX_INDIVIDUAL);
        for (let i = 0; i < emitted; i++) {
            const d = ctx.diagnostics[i];
            emitDiagnostic({ code: d.code, message: d.message, severity: d.level, target: d.typeName });
        }
        if (ctx.diagnostics.length > MAX_INDIVIDUAL) {
            emitDiagnostic({
                code: "EXTRACTION_DIAGNOSTICS_TRUNCATED",
                message: `${ctx.diagnostics.length - MAX_INDIVIDUAL} additional diagnostics suppressed`,
                severity: "info",
            });
        }
    }

    // Self-containment validation: verify every type name appearing in
    // signatures is either (a) defined in the output, (b) a TypeScript
    // builtin, (c) a Node.js/@types/node type, or (d) from a resolved
    // dependency. This catches dangling references that would make the
    // .d.ts output incomplete.
    validateSelfContainment(baseResult, ctx);

    // Compute ambient types: unresolved references classified by source (dom/es/node)
    const ambientTypes = computeAmbientTypes(baseResult, ctx);
    if (Object.keys(ambientTypes).length > 0) {
        baseResult.ambientTypes = ambientTypes;
    }

    return baseResult;
}

/**
 * Recursively filters namespace members against a reachable set.
 * Removes namespaces that become empty after filtering.
 */
function filterNamespaces(namespaces: NamespaceInfo[], reachableSet: Set<string>, moduleName: string, nsPath?: string): NamespaceInfo[] | undefined {
    const filtered: NamespaceInfo[] = [];
    for (const ns of namespaces) {
        const currentNsPath = nsPath ? `${nsPath}.${ns.name}` : ns.name;
        const result: NamespaceInfo = { name: ns.name };
        if (ns.entryPoint) result.entryPoint = ns.entryPoint;
        if (ns.exportPath) result.exportPath = ns.exportPath;

        if (ns.classes) {
            const f = ns.classes.filter(c => reachableSet.has(makeQualifiedKey(moduleName, c.name, currentNsPath)));
            if (f.length) result.classes = f;
        }
        if (ns.interfaces) {
            const f = ns.interfaces.filter(i => reachableSet.has(makeQualifiedKey(moduleName, i.name, currentNsPath)));
            if (f.length) result.interfaces = f;
        }
        if (ns.enums) {
            const f = ns.enums.filter(e => reachableSet.has(makeQualifiedKey(moduleName, e.name, currentNsPath)));
            if (f.length) result.enums = f;
        }
        if (ns.types) {
            const f = ns.types.filter(t => reachableSet.has(makeQualifiedKey(moduleName, t.name, currentNsPath)));
            if (f.length) result.types = f;
        }
        if (ns.functions) {
            const f = ns.functions.filter(fn => fn.name && reachableSet.has(makeQualifiedKey(moduleName, fn.name, currentNsPath)));
            if (f.length) result.functions = f;
        }
        if (ns.namespaces) {
            const childNs = filterNamespaces(ns.namespaces, reachableSet, moduleName, currentNsPath);
            if (childNs?.length) result.namespaces = childNs;
        }

        // Keep namespace if any member survived
        if (result.classes || result.interfaces || result.enums ||
            result.types || result.functions || result.namespaces) {
            filtered.push(result);
        }
    }
    return filtered.length > 0 ? filtered : undefined;
}

/**
 * Recursively marks namespaces that are exported from entry points.
 */
function markEntryPointNamespaces(
    namespaces: NamespaceInfo[],
    entryPointSymbols: Map<string, ExportedSymbolInfo>,
    sourceFilePath: string,
): void {
    for (const ns of namespaces) {
        const exportInfo = lookupEntryPointSymbol(entryPointSymbols, sourceFilePath, ns.name);
        if (exportInfo !== undefined) {
            ns.entryPoint = true;
            ns.exportPath = exportInfo.exportPath;
        }
        if (ns.namespaces) {
            markEntryPointNamespaces(ns.namespaces, entryPointSymbols, sourceFilePath);
        }
    }
}


// ============================================================================
// CLI Entry Point
// ============================================================================

export function main(): void {
    const args = process.argv.slice(2);

    if (args.length < 1 || args.includes("--help") || args.includes("-h")) {
        console.log(`
TypeScript Public API Graph Engine

Usage: graph_api <path> [options]

Options:
    --json        Output JSON format
    --stub        Output TypeScript stub format (default)
    --pretty      Pretty-print JSON output
    --mode <m>    Engine mode: source (default) or compiled
    --dts-root <path>  Compiled mode root containing declaration files
    --package-json <path>  Optional package.json path for export conditions
    --usage <api> <samples>  Analyze usage in samples against API
    --help, -h    Show this help

Examples:
    graph_api ./my-package --json
    graph_api ./my-package --json --mode compiled --dts-root ./dist/types
    graph_api ./my-package --stub
    graph_api --usage api.json ./samples
`);
        process.exit(args.includes("--help") || args.includes("-h") ? 0 : 1);
    }

    // Check for usage analysis mode
    const usageIdx = args.indexOf("--usage");
    if (usageIdx >= 0) {
        if (args.length < usageIdx + 3) {
            console.error("--usage requires <api_json_path> <samples_path>");
            process.exit(1);
        }
        const apiJsonPath = args[usageIdx + 1];
        const samplesPath = path.resolve(args[usageIdx + 2]);

        try {
            // Read from stdin when path is '-'
            let apiJson: string;
            if (apiJsonPath === '-') {
                apiJson = fs.readFileSync(0, 'utf-8');
            } else {
                apiJson = fs.readFileSync(apiJsonPath, 'utf-8');
            }
            const api = JSON.parse(apiJson) as ApiIndex;
            const usage = analyzeUsage(samplesPath, api);
            console.log(JSON.stringify(usage, null, 2));
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            console.error("Error:", message);
            process.exit(1);
        }
        return;
    }

    const rootPath = path.resolve(args[0]);
    const outputJson = args.includes("--json");
    const pretty = args.includes("--pretty");
    const modeIndex = args.indexOf("--mode");
    const dtsRootIndex = args.indexOf("--dts-root");
    const packageJsonIndex = args.indexOf("--package-json");

    const mode = modeIndex >= 0 && modeIndex + 1 < args.length ? args[modeIndex + 1] : "source";
    const dtsRoot = dtsRootIndex >= 0 && dtsRootIndex + 1 < args.length ? path.resolve(args[dtsRootIndex + 1]) : undefined;
    const packageJsonPath = packageJsonIndex >= 0 && packageJsonIndex + 1 < args.length ? path.resolve(args[packageJsonIndex + 1]) : undefined;

    if (mode !== "source" && mode !== "compiled") {
        console.error(`Invalid --mode value '${mode}'. Expected 'source' or 'compiled'.`);
        process.exit(1);
    }

    if (mode === "compiled" && !dtsRoot) {
        console.error("Compiled mode requires --dts-root <path>.");
        process.exit(1);
    }

    try {
        const api = extractPackage(rootPath, {
            mode: mode as "source" | "compiled",
            dtsRoot,
            packageJsonPath,
        });

        if (outputJson) {
            console.log(toJson(api, pretty));
        } else {
            console.log(formatStubs(api));
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error("Error:", message);
        process.exit(1);
    }
}

