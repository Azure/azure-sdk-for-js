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
} from "ts-morph";
import * as fs from "fs";
import * as path from "path";
import type {
    ApiIndex,
    ModuleInfo,
    DependencyInfo,
} from "./models.js";
import { ExtractionContext } from "./context.js";
import { createExtractionContext } from "./type-refs.js";
import { extractModule } from "./extractors.js";
import {
    resolveEntryPointFiles,
    extractExportedSymbols,
    getConditionPriority,
} from "./entry-points.js";
import type { EngineOptions, ExportEntry } from "./entry-points.js";
import { computeReachableTypes, validateSelfContainment } from "./reachability.js";
import {
    resolveTransitiveDependencies,
    buildResolvedDependencies,
    findPackageInNodeModules,
} from "./dependencies.js";
import { isNodeBuiltinModule } from "./node-builtins.js";
import { formatStubs, toJson } from "./formatter.js";
import { analyzeUsage } from "./usage.js";

// ============================================================================
// Package Engine
// ============================================================================

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


export function extractPackage(rootPath: string, options: EngineOptions = { mode: "source" }): ApiIndex {
    const packageName = detectPackageName(rootPath, options.packageJsonPath);
    const packageVersion = detectPackageVersion(rootPath, options.packageJsonPath);

    // Find tsconfig or create minimal config
    const tsConfigPath = path.join(rootPath, "tsconfig.json");

    const project = new Project({
        tsConfigFilePath: fs.existsSync(tsConfigPath) ? tsConfigPath : undefined,
        skipAddingFilesFromTsConfig: true,
        compilerOptions: {
            allowJs: true,
            declaration: true,
            emitDeclarationOnly: true,
            skipLibCheck: true,
        },
    });

    // Initialize extraction context — consolidates all mutable state
    // (builtins, type collector, package name cache) for this extraction run.
    const ctx = createExtractionContext(project);

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
        ];

    for (const pattern of patterns) {
        project.addSourceFilesAtPaths(pattern);
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
        moduleName = moduleName.replace(/\.(ts|tsx|mts)$/, "");
        moduleName = moduleName.replace(/\\/g, "/");
        if (moduleName.endsWith("/index")) {
            moduleName = moduleName.slice(0, -6) || "index";
        }

        const module = extractModule(sourceFile, moduleName, ctx);
        if (module) {
            // Set module condition+exportPath from entryEntries by file path.
            // Pick the most general (lowest-priority) condition for the module itself,
            // since a module appearing in multiple conditions serves all of them.
            // Individual symbols within the module get their most specific condition
            // via extractExportedSymbols.
            const resolvedFilePath = path.resolve(sourceFile.getFilePath());
            const matchingEntry = entryEntries
                .filter(e => path.resolve(e.filePath) === resolvedFilePath)
                .sort((a, b) => getConditionPriority(a.condition) - getConditionPriority(b.condition))[0];
            if (matchingEntry) {
                module.condition = matchingEntry.condition;
                module.conditionChain = matchingEntry.conditionChain;
                module.exportPath = matchingEntry.exportPath;
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
                    const exportInfo = entryPointSymbols.get(cls.name);
                    if (exportInfo !== undefined) {
                        applyEntryPoint(cls, exportInfo);
                    }
                }
            }
            if (module.interfaces) {
                for (const iface of module.interfaces) {
                    const exportInfo = entryPointSymbols.get(iface.name);
                    if (exportInfo !== undefined) {
                        applyEntryPoint(iface, exportInfo);
                    }
                }
            }
            if (module.functions) {
                for (const func of module.functions) {
                    const exportInfo = entryPointSymbols.get(func.name);
                    if (exportInfo !== undefined) {
                        applyEntryPoint(func, exportInfo);
                    }
                }
            }
            // Mark enums and type aliases too
            if (module.enums) {
                for (const enumInfo of module.enums) {
                    const exportInfo = entryPointSymbols.get(enumInfo.name);
                    if (exportInfo !== undefined) {
                        applyEntryPoint(enumInfo, exportInfo);
                    }
                }
            }
            if (module.types) {
                for (const typeInfo of module.types) {
                    const exportInfo = entryPointSymbols.get(typeInfo.name);
                    if (exportInfo !== undefined) {
                        applyEntryPoint(typeInfo, exportInfo);
                    }
                }
            }
            modules.push(module);
            moduleSourceFileMap.push([module, sourceFile]);
        }
    }

    // Second pass: propagate conditions to non-entry modules that are imported
    // by entry point files. Assigns the most-fundamental (lowest-priority) condition
    // inherited from direct importers that are themselves entry points.
    // Example: shared.d.ts is imported by index.d.ts (condition "default"), so
    // it inherits "default" even though it's not a direct entry point in exports.
    const entryFileConditions = new Map<string, string>(); // absolute path → condition
    for (const entry of entryEntries) {
        const absPath = path.resolve(entry.filePath);
        const existing = entryFileConditions.get(absPath);
        if (!existing || getConditionPriority(entry.condition) < getConditionPriority(existing)) {
            entryFileConditions.set(absPath, entry.condition);
        }
    }
    for (const [module, sourceFile] of moduleSourceFileMap) {
        if (module.condition !== undefined) continue;
        let inheritedCondition: string | undefined;
        for (const refSf of sourceFile.getReferencingSourceFiles()) {
            const refPath = path.resolve(refSf.getFilePath());
            const cond = entryFileConditions.get(refPath);
            if (cond !== undefined) {
                if (inheritedCondition === undefined || getConditionPriority(cond) < getConditionPriority(inheritedCondition)) {
                    inheritedCondition = cond;
                }
            }
        }
        if (inheritedCondition !== undefined) {
            module.condition = inheritedCondition;
            // Inherited conditions don't have a chain — the chain belongs to the entry module
        }
    }

    const baseResult: ApiIndex = {
        package: packageName,
        version: packageVersion,
        modules: modules.sort((a, b) => a.name.localeCompare(b.name)),
    };

    // Populate referencedTypes on all entities from compiler-resolved type refs.
    // This must happen before computeReachableTypes so BFS can use the data.
    const contextRefNames = ctx.typeRefs.getContextRefNames();
    for (const mod of baseResult.modules) {
        for (const cls of mod.classes || []) {
            const refs = contextRefNames.get(cls.name);
            if (refs?.length) cls.referencedTypes = refs;
        }
        for (const iface of mod.interfaces || []) {
            const refs = contextRefNames.get(iface.name);
            if (refs?.length) iface.referencedTypes = refs;
        }
        for (const t of mod.types || []) {
            const refs = contextRefNames.get(t.name);
            if (refs?.length) t.referencedTypes = refs;
        }
        for (const fn of mod.functions || []) {
            if (!fn.name) continue;
            const refs = contextRefNames.get(fn.name);
            if (refs?.length) fn.referencedTypes = refs;
        }
    }

    // Compute types reachable from entry points
    const reachableTypes = computeReachableTypes(baseResult);

    // Filter modules to only include reachable types
    if (reachableTypes.size > 0) {
        for (const mod of baseResult.modules) {
            if (mod.classes) mod.classes = mod.classes.filter(c => reachableTypes.has(c.name));
            if (mod.interfaces) mod.interfaces = mod.interfaces.filter(i => reachableTypes.has(i.name));
            if (mod.enums) mod.enums = mod.enums.filter(e => reachableTypes.has(e.name));
            if (mod.types) mod.types = mod.types.filter(t => reachableTypes.has(t.name));
            if (mod.functions) mod.functions = mod.functions.filter(f => f.name && reachableTypes.has(f.name));
        }
        // Remove empty modules
        baseResult.modules = baseResult.modules.filter(m =>
            (m.classes?.length ?? 0) > 0 || (m.interfaces?.length ?? 0) > 0 ||
            (m.enums?.length ?? 0) > 0 || (m.types?.length ?? 0) > 0 ||
            (m.functions?.length ?? 0) > 0
        );
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
                const conditionExistingNames = new Map<string | undefined, Set<string>>();
                for (const mod of baseResult.modules) {
                    const key = mod.condition;
                    if (!conditionExistingNames.has(key)) conditionExistingNames.set(key, new Set());
                    const names = conditionExistingNames.get(key)!;
                    for (const c of mod.classes ?? []) names.add(c.name);
                    for (const i of mod.interfaces ?? []) names.add(i.name);
                    for (const e of mod.enums ?? []) names.add(e.name);
                    for (const t of mod.types ?? []) names.add(t.name);
                }
                const conditionsSeen = new Set<string | undefined>();
                for (const mod of baseResult.modules) {
                    const key = mod.condition;
                    if (conditionsSeen.has(key)) continue;
                    conditionsSeen.add(key);
                    const existingNames = conditionExistingNames.get(key) ?? new Set();
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
    }

    // Phase 8: Emit structured diagnostics to stderr for unresolved dependencies.
    // The C# host parses each stderr line as an ApiDiagnostic with level=Warning.
    const reportedPackages = new Set<string>();
    if (dependencies.length > 0) {
        for (const dep of dependencies) {
            if (dep.isNode) continue;
            const unresolvedTypes = (dep.types ?? []).filter(t => t.type === "unresolved");
            if (unresolvedTypes.length > 0) {
                const typeNames = unresolvedTypes.map(t => t.name).join(", ");
                console.error(`Unresolved dependency: package '${dep.package}' has ${unresolvedTypes.length} unresolved type(s): ${typeNames}`);
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
            console.error(`Unresolved dependency: package '${pkgName}' is referenced but not installed`);
            reportedPackages.add(pkgName);
        }
    }

    // Emit collected extraction diagnostics to stderr.
    // The C# host parses each stderr line as an ApiDiagnostic.
    // Deduplicate and summarize to avoid noise from repetitive type traversal warnings.
    if (ctx.diagnostics.length > 0) {
        const byCode = new Map<string, number>();
        for (const d of ctx.diagnostics) {
            byCode.set(d.code, (byCode.get(d.code) ?? 0) + 1);
        }
        for (const [code, count] of byCode) {
            console.error(`Extraction diagnostic: ${code} occurred ${count} time(s)`);
        }
    }

    // Self-containment validation: verify every type name appearing in
    // signatures is either (a) defined in the output, (b) a TypeScript
    // builtin, (c) a Node.js/@types/node type, or (d) from a resolved
    // dependency. This catches dangling references that would make the
    // .d.ts output incomplete.
    validateSelfContainment(baseResult, ctx);

    return baseResult;
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

