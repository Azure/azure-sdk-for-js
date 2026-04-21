// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
    Project,
    SourceFile,
    ClassDeclaration,
    InterfaceDeclaration,
    FunctionDeclaration,
    TypeAliasDeclaration,
    EnumDeclaration,
    ModuleDeclaration,
    Node,
    Type,
    ExportedDeclarations,
    ImportDeclaration,
    ts,
} from "ts-morph";
import * as fs from "fs";
import * as path from "path";
import type {
    ClassInfo,
    InterfaceInfo,
    EnumInfo,
    TypeAliasInfo,
    FunctionInfo,
    DependencyInfo,
    ApiIndex,
    ModuleInfo,
    ResolvedTypeRef,
    NamespaceInfo,
} from "./models.js";
import { ExtractionContext, PRIMITIVE_TYPES } from "./context.js";
import { getDefinedTypes } from "./reachability.js";
import {
    getTypeFromDeclaration,
    getParametersFromDeclaration,
    getReturnTypeFromDeclaration,
    extractClass,
    extractInterface,
    extractEnum,
    extractTypeAlias,
    extractFunction,
    extractNamespace,
} from "./extractors.js";
import {
    collectTypeRefsFromType,
    collectTypeRefsFromTypeNode,
} from "./type-refs.js";
import { isNodeBuiltinModule, isNodePackage } from "./node-builtins.js";
import { stripImportPrefix } from "./formatter.js";
import { resolveExports, findDotExport, findSubpathExport, hasNonRootSubpaths } from "./exports-resolver.js";

// ── Package-qualified key helpers ──────────────────────────────────────────
// Multiple packages can export types with the same name.  All internal maps
// (importResolutionMap, allResolved, processed, entitySubRefNames, …) use
// composite keys  packageName + "\0" + typeName  so that same-named types
// from different packages never collide.

/** Build a package-qualified key for internal lookup maps.
 *  When a non-root subpath is provided the key includes it so that
 *  same-named types from different subpaths of the same package
 *  (e.g. `pkg` vs `pkg/subpath`) never collide.
 */
export function makeDepKey(packageName: string, typeName: string, subpath?: string): string {
    if (subpath && subpath !== ".") {
        return `${packageName}\0${subpath}\0${typeName}`;
    }
    return `${packageName}\0${typeName}`;
}

/** Split a package-qualified key back into its components. */
export function splitDepKey(key: string): { packageName: string; typeName: string; subpath?: string } {
    const first = key.indexOf("\0");
    const last = key.lastIndexOf("\0");
    if (first !== last) {
        // Three-part key: packageName \0 subpath \0 typeName
        return {
            packageName: key.substring(0, first),
            subpath: key.substring(first + 1, last),
            typeName: key.substring(last + 1),
        };
    }
    return { packageName: key.substring(0, first), typeName: key.substring(first + 1) };
}

// Re-export from shared utility to avoid circular imports (type-refs ↔ dependencies).
// The local import makes the function available in this module; the re-export
// keeps backward compatibility for consumers that import from dependencies.ts.
import { getPackageRoot, getImportSubpath } from "./utils.js";
export { getPackageRoot, getImportSubpath };

/**
 * Builds a map of (package, type) → resolvedFile for dependency resolution.
 * Keys are package-qualified via {@link makeDepKey} so that same-named types
 * from different packages never collide.  Package names are canonicalized to
 * package roots via {@link getPackageRoot}.
 */
export function buildImportResolutionMap(project: Project): {
    typeMap: Map<string, { packageName: string; resolvedFile: SourceFile; subpath: string }>;
    packageMap: Map<string, SourceFile>;
} {
    const typeMap = new Map<string, { packageName: string; resolvedFile: SourceFile; subpath: string }>();
    const packageMap = new Map<string, SourceFile>();

    for (const sourceFile of project.getSourceFiles()) {
        const filePath = sourceFile.getFilePath();
        if (filePath.includes("node_modules")) continue;

        for (const importDecl of sourceFile.getImportDeclarations()) {
            const moduleSpecifier = importDecl.getModuleSpecifierValue();
            if (!moduleSpecifier || moduleSpecifier.startsWith(".")) continue;

            const resolvedFile = importDecl.getModuleSpecifierSourceFile();
            if (!resolvedFile) continue;

            const packageName = getPackageRoot(moduleSpecifier);
            const subpath = getImportSubpath(moduleSpecifier);

            // Named imports: import { Client, Foo } from "pkg"
            for (const namedImport of importDecl.getNamedImports()) {
                const importedName = namedImport.getName();
                const aliasName = namedImport.getAliasNode()?.getText();
                // Subpath-qualified key prevents collision when different
                // subpaths of the same package export the same name.
                const fullKey = makeDepKey(packageName, importedName, subpath);
                if (!typeMap.has(fullKey)) {
                    typeMap.set(fullKey, { packageName, resolvedFile, subpath });
                }
                // Root key (without subpath) for backward-compatible lookups.
                const rootKey = makeDepKey(packageName, importedName);
                if (!typeMap.has(rootKey)) {
                    typeMap.set(rootKey, { packageName, resolvedFile, subpath });
                }
                if (aliasName) {
                    const aliasFullKey = makeDepKey(packageName, aliasName, subpath);
                    if (!typeMap.has(aliasFullKey)) {
                        typeMap.set(aliasFullKey, { packageName, resolvedFile, subpath });
                    }
                    const aliasRootKey = makeDepKey(packageName, aliasName);
                    if (!typeMap.has(aliasRootKey)) {
                        typeMap.set(aliasRootKey, { packageName, resolvedFile, subpath });
                    }
                }
            }

            // Default imports: import OpenAI from "openai"
            const defaultImport = importDecl.getDefaultImport();
            if (defaultImport) {
                const typeName = defaultImport.getText();
                const fullKey = makeDepKey(packageName, typeName, subpath);
                if (!typeMap.has(fullKey)) {
                    typeMap.set(fullKey, { packageName, resolvedFile, subpath });
                }
                const rootKey = makeDepKey(packageName, typeName);
                if (!typeMap.has(rootKey)) {
                    typeMap.set(rootKey, { packageName, resolvedFile, subpath });
                }
            }

            // Namespace imports: import * as X from "pkg"
            const nsImport = importDecl.getNamespaceImport();
            if (nsImport && !packageMap.has(packageName)) {
                packageMap.set(packageName, resolvedFile);
            }
        }

        // Re-exports: export { Foo } from "pkg"
        for (const exportDecl of sourceFile.getExportDeclarations()) {
            const moduleSpecifier = exportDecl.getModuleSpecifierValue();
            if (!moduleSpecifier || moduleSpecifier.startsWith(".")) continue;

            const resolvedFile = exportDecl.getModuleSpecifierSourceFile();
            if (!resolvedFile) continue;

            const packageName = getPackageRoot(moduleSpecifier);
            const subpath = getImportSubpath(moduleSpecifier);
            for (const namedExport of exportDecl.getNamedExports()) {
                const name = namedExport.getName();
                const fullKey = makeDepKey(packageName, name, subpath);
                if (!typeMap.has(fullKey)) {
                    typeMap.set(fullKey, { packageName, resolvedFile, subpath });
                }
                const rootKey = makeDepKey(packageName, name);
                if (!typeMap.has(rootKey)) {
                    typeMap.set(rootKey, { packageName, resolvedFile, subpath });
                }
            }
        }
    }

    return { typeMap, packageMap };
}

export type ExtractResult = {
    graphed: ClassInfo | InterfaceInfo | EnumInfo | TypeAliasInfo | FunctionInfo | NamespaceInfo;
    declaration: Node;
    kind: "class" | "interface" | "enum" | "type" | "function" | "namespace";
    /** True when the type was found via non-exported fallback (file-scoped declarations). */
    fromFallback?: boolean;
};

/**
 * Attempts to extract a type from a single AST declaration node.
 * Handles ClassDeclaration, InterfaceDeclaration, EnumDeclaration,
 * TypeAliasDeclaration, and FunctionDeclaration.
 */
export function extractDeclaration(
    decl: Node,
    ctx: ExtractionContext,
): ExtractResult | null {
    // Pre-collect namespace import aliases from the declaration's source file
    // so that displayType / stripImportPrefix can strip qualified names
    // (e.g., TranscriptionSessionsAPI.TranscriptionSessions → TranscriptionSessions)
    // during extraction.  This covers both top-level extraction and nested
    // namespace member extraction (companion namespaces).
    preCollectNsAliases(decl.getSourceFile(), ctx);

    const kind = decl.getKindName();
    if (kind === "ClassDeclaration") {
        return { graphed: extractClass(decl as ClassDeclaration, ctx), declaration: decl, kind: "class" };
    }
    if (kind === "InterfaceDeclaration") {
        return { graphed: extractInterface(decl as InterfaceDeclaration, ctx), declaration: decl, kind: "interface" };
    }
    if (kind === "EnumDeclaration") {
        return { graphed: extractEnum(decl as EnumDeclaration, ctx), declaration: decl, kind: "enum" };
    }
    if (kind === "TypeAliasDeclaration") {
        return { graphed: extractTypeAlias(decl as TypeAliasDeclaration, ctx), declaration: decl, kind: "type" };
    }
    if (kind === "FunctionDeclaration") {
        const fnInfo = extractFunction(decl as FunctionDeclaration, ctx);
        if (fnInfo) return { graphed: fnInfo, declaration: decl, kind: "function" };
    }
    if (kind === "ModuleDeclaration") {
        const nsInfo = extractNamespace(decl as ModuleDeclaration, ctx);
        if (nsInfo) return { graphed: nsInfo, declaration: decl, kind: "namespace" };
    }
    // Handle variable declarations (e.g., `export declare function toFile(...)`,
    // `declare const brand: unique symbol`) by emitting a synthetic type alias.
    // These are values referenced via `typeof` in the public API surface.
    if (kind === "VariableDeclaration") {
        const varDecl = decl as import("ts-morph").VariableDeclaration;
        const name = varDecl.getName();
        if (name) {
            const typeNode = varDecl.getTypeNode();
            const typeText = typeNode
                ? typeNode.getText()
                : varDecl.getType()?.getText() ?? "unknown";
            const syntheticAlias: TypeAliasInfo = { name, type: typeText };
            return { graphed: syntheticAlias, declaration: decl, kind: "type" };
        }
    }
    return null;
}

/**
 * Eagerly collects namespace import aliases from a source file so that
 * `displayType` / `stripImportPrefix` can strip qualified names
 * (e.g., `AudioAPI.AudioResponseFormat` → `AudioResponseFormat`) during
 * type extraction.  Must be called BEFORE `extractDeclaration` to ensure the
 * aliases are already in `ctx.namespaceAliases` when type text is rendered.
 *
 * Handles two patterns:
 * 1. `import * as X from "..."` — X is a namespace alias.
 * 2. `import { X } from "..."` where X is a value (class/function) that also
 *    has a companion namespace (declaration merging). In this case X.Y in type
 *    text refers to a namespace member, and the X. prefix should be stripped
 *    because the member Y is extracted as a top-level dependency.
 */

/**
 * Detects named imports that have companion namespaces (declaration merging)
 * and adds them to `ctx.namespaceAliases` so that qualified references like
 * `Runs.RunStep` get their prefix stripped during type text rendering.
 *
 * A companion namespace exists when a named import resolves to a symbol that
 * has both a value declaration (class, function, or variable) and a namespace
 * declaration (declaration merging pattern).
 */
export function collectCompanionNamespaceAliases(
    imp: ImportDeclaration,
    ctx: ExtractionContext,
): void {
    for (const named of imp.getNamedImports()) {
        try {
            const sym = named.getSymbol();
            if (!sym) continue;
            const target = sym.getAliasedSymbol() ?? sym;
            const decls = target.getDeclarations();
            const hasNamespace = decls.some(d => Node.isModuleDeclaration(d));
            if (hasNamespace) {
                const hasValue = decls.some(d =>
                    Node.isClassDeclaration(d) ||
                    Node.isFunctionDeclaration(d) ||
                    Node.isVariableDeclaration(d));
                if (hasValue) {
                    // Use the local binding name (alias), not the original export name
                    const localName = named.getAliasNode()?.getText() ?? named.getName();
                    ctx.namespaceAliases.add(localName);
                }
            }
        } catch { /* benign — symbol resolution may fail for unresolved imports */ }
    }
}

const _preCollectedFiles = new WeakSet<SourceFile>();
function preCollectNsAliases(sf: SourceFile, ctx: ExtractionContext): void {
    if (_preCollectedFiles.has(sf)) return;
    _preCollectedFiles.add(sf);
    for (const imp of sf.getImportDeclarations()) {
        const nsImport = imp.getNamespaceImport();
        if (nsImport) {
            ctx.namespaceAliases.add(nsImport.getText());
        }
        collectCompanionNamespaceAliases(imp, ctx);
    }
}

/**
 * Extracts a type definition from a resolved dependency module.
 * Uses getExportedDeclarations() to follow re-exports to the actual declaration.
 * Returns both the graphed info and the AST declaration node for further analysis.
 */
export function extractTypeFromResolvedModule(
    typeName: string,
    resolvedFile: SourceFile,
    isDefaultImport: boolean,
    ctx: ExtractionContext,
): ExtractResult | null {
    try {
        // For default imports, check both "default" and the type name
        const lookupKeys = isDefaultImport
            ? ["default", typeName]
            : [typeName];

        // Collect all export sources: file-level exports + ambient module
        // declarations (e.g., `declare module "buffer" { ... }`). Ambient
        // modules are a standard TypeScript pattern used by @types/* packages
        // and other libraries that augment the global scope or declare modules.
        const exportSources: ReadonlyMap<string, ExportedDeclarations[]>[] = [
            resolvedFile.getExportedDeclarations(),
        ];
        for (const mod of resolvedFile.getModules()) {
            exportSources.push(mod.getExportedDeclarations());
        }

        for (const exportedDecls of exportSources) {
            for (const key of lookupKeys) {
                const decls = exportedDecls.get(key);
                if (!decls) continue;

                for (const decl of decls) {
                    // Pre-collect namespace import aliases from the declaration's
                    // source file BEFORE extracting it.  displayType() uses
                    // ctx.namespaceAliases to strip qualified names such as
                    // `AudioAPI.AudioResponseFormat` → `AudioResponseFormat`.
                    // Without this, the aliases are only collected after extraction
                    // (in the caller) and the qualified names leak into the output.
                    preCollectNsAliases(decl.getSourceFile(), ctx);

                    const result = extractDeclaration(decl, ctx);
                    if (result) return result;

                    // Follow symbol alias chains for re-export patterns
                    // (e.g., `export = EventEmitter` in @types/node events.d.ts).
                    // The aliased symbol points to the actual declaration behind
                    // the import, which may be a class, interface, etc.
                    if (decl.getKindName() === "ImportEqualsDeclaration") {
                        const aliased = decl.getSymbol()?.getAliasedSymbol();
                        if (aliased) {
                            const aliasedDecls = aliased.getDeclarations();
                            // Prefer ClassDeclaration when both class and interface
                            // exist (TypeScript declaration merging).
                            const classDecl = aliasedDecls.find(d => d.getKindName() === "ClassDeclaration");
                            if (classDecl) {
                                preCollectNsAliases(classDecl.getSourceFile(), ctx);
                                const r = extractDeclaration(classDecl, ctx);
                                if (r) return r;
                            }
                            for (const aDecl of aliasedDecls) {
                                preCollectNsAliases(aDecl.getSourceFile(), ctx);
                                const r = extractDeclaration(aDecl, ctx);
                                if (r) return r;
                            }
                        }
                    }
                }
            }
        }
    } catch (e) {
        ctx.warn("DEP_EXTRACT", `Failed to extract '${typeName}': ${e instanceof Error ? e.message : String(e)}`, typeName);
    }

    // Fallback: search for file-scoped (non-exported) declarations.
    // Some dependency-internal types (e.g., `type HeaderValue = ...` or
    // `declare const brand_privateNullableHeaders: unique symbol`) are not
    // exported but appear in the rendered text of exported types. We emit
    // them as synthetic type aliases so the output compiles.
    //
    // Results from this fallback are marked with `fromFallback: true` so
    // the caller can skip sub-dependency discovery — non-exported types
    // often reference other internal types that would cascade into
    // unresolvable chains.
    try {
        for (const stmt of resolvedFile.getStatements()) {
            if (Node.isTypeAliasDeclaration(stmt) && stmt.getName() === typeName) {
                preCollectNsAliases(stmt.getSourceFile(), ctx);
                // Use the compiler's resolved type text rather than source text.
                // Non-exported type aliases often contain internal references
                // (e.g., `NotAny<BunRequestInit>`) that won't resolve in output.
                // The compiler resolves these to their actual types.
                const resolvedType = stmt.getType();
                const rawText = resolvedType?.getText(stmt) ?? "unknown";
                const typeText = stripImportPrefix(rawText, false, ctx.namespaceAliases);
                const typeParams = stmt.getTypeParameters().map(
                    tp => stripImportPrefix(tp.getText(), false, ctx.namespaceAliases)
                );
                const syntheticAlias: TypeAliasInfo = {
                    name: typeName,
                    type: typeText,
                };
                if (typeParams.length > 0) {
                    syntheticAlias.typeParams = typeParams.join(", ");
                }
                return { graphed: syntheticAlias, declaration: stmt, kind: "type", fromFallback: true };
            }
            if (Node.isInterfaceDeclaration(stmt) && stmt.getName() === typeName) {
                preCollectNsAliases(stmt.getSourceFile(), ctx);
                const result = extractDeclaration(stmt, ctx);
                if (result) return { ...result, fromFallback: true };
            }
            if (Node.isClassDeclaration(stmt) && stmt.getName() === typeName) {
                preCollectNsAliases(stmt.getSourceFile(), ctx);
                const result = extractDeclaration(stmt, ctx);
                if (result) return { ...result, fromFallback: true };
            }
            if (Node.isEnumDeclaration(stmt) && stmt.getName() === typeName) {
                preCollectNsAliases(stmt.getSourceFile(), ctx);
                const result = extractDeclaration(stmt, ctx);
                if (result) return { ...result, fromFallback: true };
            }
            if (Node.isFunctionDeclaration(stmt) && stmt.getName() === typeName) {
                preCollectNsAliases(stmt.getSourceFile(), ctx);
                const result = extractDeclaration(stmt, ctx);
                if (result) return { ...result, fromFallback: true };
            }
            // Handle variable declarations (e.g., `declare const x: unique symbol`)
            // by emitting a synthetic type alias with `typeof` semantics.
            if (Node.isVariableStatement(stmt)) {
                for (const varDecl of stmt.getDeclarationList().getDeclarations()) {
                    if (varDecl.getName() === typeName) {
                        const typeNode = varDecl.getTypeNode();
                        const typeText = typeNode
                            ? typeNode.getText()
                            : varDecl.getType()?.getText() ?? "unknown";
                        const syntheticAlias: TypeAliasInfo = {
                            name: typeName,
                            type: typeText,
                        };
                        return { graphed: syntheticAlias, declaration: varDecl, kind: "type", fromFallback: true };
                    }
                }
            }
        }
    } catch (e) {
        ctx.warn("DEP_EXTRACT_FALLBACK", `Fallback failed for '${typeName}': ${e instanceof Error ? e.message : String(e)}`, typeName);
    }

    return null;
}

/**
 * Resolves transitive dependencies from the API surface.
 * Uses AST-based type collection for accurate dependency tracking.
 */
export function resolveTransitiveDependencies(api: ApiIndex, ctx: ExtractionContext, rootPath: string, reachableTypes?: Set<string>): DependencyInfo[] {
    // Register all defined types with the collector (to exclude from dependencies)
    const definedTypes = getDefinedTypes(api);
    for (const typeName of definedTypes) {
        ctx.typeRefs.addDefinedType(typeName);
    }

    // Get the AST-collected external type references, scoped to reachable types
    const externalRefs = ctx.typeRefs.getExternalRefs(reachableTypes);

    if (externalRefs.length === 0) {
        return [];
    }

    // Build import resolution map using the existing project's module resolution
    const { typeMap: importResolutionMap, packageMap: packageResolutionMap } = buildImportResolutionMap(ctx.project);

    // Build per-type subpath map from the import resolution map.
    // Tracks which import subpath each type came from, used later to split
    // DependencyInfo entries by subpath when the package uses subpath exports.
    const typeSubpathMap = new Map<string, string>(); // makeDepKey → subpath
    for (const [key, entry] of importResolutionMap) {
        if (entry.subpath !== ".") {
            typeSubpathMap.set(key, entry.subpath);
        }
    }

    // Collect default-imported type names for proper lookup strategy.
    // Keyed by makeDepKey(packageName, typeName) to handle collisions.
    const defaultImportedTypes = new Set<string>();
    for (const sourceFile of ctx.project.getSourceFiles()) {
        if (sourceFile.getFilePath().includes("node_modules")) continue;
        for (const importDecl of sourceFile.getImportDeclarations()) {
            const defImport = importDecl.getDefaultImport();
            if (defImport) {
                const spec = importDecl.getModuleSpecifierValue();
                if (spec) {
                    defaultImportedTypes.add(makeDepKey(getPackageRoot(spec), defImport.getText()));
                }
            }
        }
    }

    // Lazily add resolved dependency source files to the project.
    // Only add the specific resolved files, not the entire directory tree.
    // Additional files are added on-demand during sub-dependency traversal.
    for (const [, entry] of importResolutionMap) {
        const filePath = entry.resolvedFile.getFilePath();
        if (!ctx.project.getSourceFile(filePath)) {
            try {
                ctx.project.addSourceFileAtPath(filePath);
            } catch { /* benign — file may already be added */ }
        }
    }
    for (const [, resolvedFile] of packageResolutionMap) {
        const filePath = resolvedFile.getFilePath();
        if (!ctx.project.getSourceFile(filePath)) {
            try {
                ctx.project.addSourceFileAtPath(filePath);
            } catch { /* benign — file may already be added */ }
        }
    }

    // Enrich the import resolution map with compiler-resolved declaration paths.
    // The TypeScript compiler resolves type declarations during type-checking
    // using the full `exports` condition map in package.json (e.g., "import"
    // vs "require" conditions), while ts-morph's getModuleSpecifierSourceFile()
    // uses simpler heuristics (the top-level "types" field). When both resolve,
    // the compiler result is authoritative because it reflects the actual
    // declaration file the type-checker used. We always prefer it.
    for (const ref of externalRefs) {
        if (!ref.packageName || !ref.declarationPath) continue;
        // Skip self-package refs ONLY if the type is publicly defined.
        // Internal types (referenced but not exported) from the same package
        // need resolution map entries so they can be extracted.
        if (ref.packageName === api.package && definedTypes.has(ref.name)) continue;

        let resolvedFile = ctx.project.getSourceFile(ref.declarationPath) ?? undefined;
        if (!resolvedFile && fs.existsSync(ref.declarationPath)) {
            try { resolvedFile = ctx.project.addSourceFileAtPath(ref.declarationPath); } catch { /* benign */ }
        }
        if (resolvedFile) {
            // Override any existing mapping — the compiler resolution
            // is more precise than ts-morph's module specifier resolution.
            const existingSubpath = importResolutionMap.get(makeDepKey(ref.packageName, ref.name))?.subpath ?? ".";
            importResolutionMap.set(makeDepKey(ref.packageName, ref.name), { packageName: ref.packageName, resolvedFile, subpath: existingSubpath });
        }
    }

    // Group initial refs by package name, skipping self-references only for
    // types that are publicly defined. Internal types (referenced in method
    // signatures but not exported) from the same package need to be extracted
    // as transitive dependencies.
    const typesByPackage = new Map<string, Set<string>>();
    for (const ref of externalRefs) {
        if (!ref.packageName) continue;
        if (ref.packageName === api.package && definedTypes.has(ref.name)) {
            continue;
        }
        if (!typesByPackage.has(ref.packageName)) {
            typesByPackage.set(ref.packageName, new Set());
        }
        typesByPackage.get(ref.packageName)!.add(ref.name);
    }

    // Track type alias names: maps (package, aliasName) → originalExportedName.
    // For example, `import { ProxySettings as ProxyOptions } from "pkg"` produces:
    //   typeAliasMap.set(makeDepKey("pkg", "ProxyOptions"), "ProxySettings")
    // When extraction fails for the alias name, we try the original name and
    // emit a synthetic `type ProxyOptions = ProxySettings` alias.
    const typeAliasMap = new Map<string, string>();
    for (const ref of externalRefs) {
        if (ref.originalName && ref.originalName !== ref.name && ref.packageName) {
            typeAliasMap.set(makeDepKey(ref.packageName, ref.name), ref.originalName);
        }
    }

    // Resolve types iteratively using AST-based sub-dependency discovery.
    // When a dependency type is resolved, we use ts-morph's type system to
    // walk its declaration and find all referenced external types — no string
    // tokenization or heuristics.
    // All maps use package-qualified keys (makeDepKey) to prevent collisions
    // when different packages export the same type name.
    const allResolved = new Map<string, { packageName: string; subpath?: string; type: ClassInfo | InterfaceInfo | EnumInfo | TypeAliasInfo | FunctionInfo | NamespaceInfo; kind: "class" | "interface" | "enum" | "type" | "function" | "namespace" }>();
    const allUnresolved = new Map<string, string>(); // qualified key → packageName
    const processed = new Set<string>(); // qualified keys

    // Track per-entity sub-dependency names so we can populate referencedTypes.
    // Keyed by makeDepKey(packageName, typeName).
    const entitySubRefNames = new Map<string, Set<string>>();

    // Pre-build packageName → SourceFile index for O(1) fallback lookups
    const packageToFile = new Map<string, SourceFile>();
    for (const [, entry] of importResolutionMap) {
        if (!packageToFile.has(entry.packageName)) {
            packageToFile.set(entry.packageName, entry.resolvedFile);
        }
    }

    // Collect namespace import aliases from dependency source files so that
    // type text like `API.AllModels` or `Shared.Response` is stripped to just
    // `AllModels` / `Response`. Without this, dep-internal barrel aliases
    // leak into the generated output as unresolved namespace references.
    const visitedDepFiles = new Set<string>();
    function collectNsAliasesFromFile(sf: SourceFile): void {
        const fp = sf.getFilePath();
        if (visitedDepFiles.has(fp)) return;
        visitedDepFiles.add(fp);
        for (const imp of sf.getImportDeclarations()) {
            const nsImport = imp.getNamespaceImport();
            if (nsImport) {
                ctx.namespaceAliases.add(nsImport.getText());
            }
            // Also detect named imports with companion namespaces
            collectCompanionNamespaceAliases(imp, ctx);
        }
    }
    for (const [, entry] of importResolutionMap) {
        collectNsAliasesFromFile(entry.resolvedFile);
    }

    /**
     * Collects sub-dependency type references from a single AST declaration node.
     * Handles class/interface members, type alias bodies, function parameters/returns,
     * and namespace members (recursively). This centralises the traversal logic so
     * that both top-level dependency types and companion/nested namespaces share the
     * same discovery path.
     */
    function collectSubRefsFromDeclaration(
        decl: Node,
        ctx: ExtractionContext,
        subRefs: Set<ResolvedTypeRef>,
        parentName: string,
    ): void {
        try {
            const declType = getTypeFromDeclaration(decl);
            if (declType) {
                collectTypeRefsFromType(declType, ctx, subRefs);
            }
        } catch { /* benign */ }

        if (Node.isClassDeclaration(decl) || Node.isInterfaceDeclaration(decl)) {
            for (const tp of decl.getTypeParameters()) {
                try {
                    const constraint = tp.getConstraint();
                    if (constraint) collectTypeRefsFromTypeNode(constraint, ctx, subRefs);
                    const defaultType = tp.getDefault();
                    if (defaultType) collectTypeRefsFromTypeNode(defaultType, ctx, subRefs);
                } catch { /* benign */ }
            }
            if (Node.isClassDeclaration(decl)) {
                const extendsExpr = decl.getExtends();
                if (extendsExpr) {
                    try {
                        const extendsType = extendsExpr.getType();
                        if (extendsType) collectTypeRefsFromType(extendsType, ctx, subRefs);
                    } catch { /* benign */ }
                }
                for (const impl of decl.getImplements()) {
                    try {
                        const implType = impl.getType();
                        if (implType) collectTypeRefsFromType(implType, ctx, subRefs);
                    } catch { /* benign */ }
                }
            }
            if (Node.isInterfaceDeclaration(decl)) {
                for (const ext of decl.getExtends()) {
                    try {
                        const extType = ext.getType();
                        if (extType) collectTypeRefsFromType(extType, ctx, subRefs);
                    } catch { /* benign */ }
                }
            }
            for (const member of decl.getMembers()) {
                try {
                    const memberType = getTypeFromDeclaration(member);
                    if (memberType) collectTypeRefsFromType(memberType, ctx, subRefs);
                    if (Node.isPropertySignature(member) || Node.isPropertyDeclaration(member)) {
                        const memberTypeNode = member.getTypeNode();
                        if (memberTypeNode) collectTypeRefsFromTypeNode(memberTypeNode, ctx, subRefs);
                    }
                    const params = getParametersFromDeclaration(member);
                    for (const p of params) {
                        const pType = p.getType();
                        if (pType) collectTypeRefsFromType(pType, ctx, subRefs);
                        const pTypeNode = p.getTypeNode();
                        if (pTypeNode) collectTypeRefsFromTypeNode(pTypeNode, ctx, subRefs);
                    }
                    const retType = getReturnTypeFromDeclaration(member);
                    if (retType) collectTypeRefsFromType(retType, ctx, subRefs);
                    if (Node.isMethodSignature(member) || Node.isMethodDeclaration(member)) {
                        const retTypeNode = member.getReturnTypeNode();
                        if (retTypeNode) collectTypeRefsFromTypeNode(retTypeNode, ctx, subRefs);
                        // Traverse method-level type parameter constraints and defaults
                        // (e.g., `parse<Params extends SomeType, P = ExtractFoo<Params>>(...)`)
                        for (const tp of member.getTypeParameters()) {
                            try {
                                const constraint = tp.getConstraint();
                                if (constraint) collectTypeRefsFromTypeNode(constraint, ctx, subRefs);
                                const defaultType = tp.getDefault();
                                if (defaultType) collectTypeRefsFromTypeNode(defaultType, ctx, subRefs);
                            } catch { /* benign */ }
                        }
                    }
                } catch (e) { ctx.warn("DEP_MEMBER_TRAVERSE", `Failed for member of '${parentName}': ${e instanceof Error ? e.message : String(e)}`, parentName); }
            }
        }

        if (Node.isTypeAliasDeclaration(decl)) {
            for (const tp of decl.getTypeParameters()) {
                try {
                    const constraint = tp.getConstraint();
                    if (constraint) collectTypeRefsFromTypeNode(constraint, ctx, subRefs);
                    const defaultType = tp.getDefault();
                    if (defaultType) collectTypeRefsFromTypeNode(defaultType, ctx, subRefs);
                } catch { /* benign */ }
            }
            const typeNode = decl.getTypeNode();
            if (typeNode) {
                try {
                    const resolvedType = typeNode.getType();
                    if (resolvedType) collectTypeRefsFromType(resolvedType, ctx, subRefs);
                } catch { /* benign */ }
                // Also walk the TypeNode AST to catch type names that the
                // compiler erases (e.g., simple aliases like `HeaderValue` → `string | undefined | null`)
                try {
                    collectTypeRefsFromTypeNode(typeNode, ctx, subRefs);
                } catch { /* benign */ }
            }
        }

        if (Node.isFunctionDeclaration(decl)) {
            for (const tp of decl.getTypeParameters()) {
                try {
                    const constraint = tp.getConstraint();
                    if (constraint) collectTypeRefsFromTypeNode(constraint, ctx, subRefs);
                    const defaultType = tp.getDefault();
                    if (defaultType) collectTypeRefsFromTypeNode(defaultType, ctx, subRefs);
                } catch { /* benign */ }
            }
            for (const param of decl.getParameters()) {
                try {
                    const pType = param.getType();
                    if (pType) collectTypeRefsFromType(pType, ctx, subRefs);
                    const pTypeNode = param.getTypeNode();
                    if (pTypeNode) collectTypeRefsFromTypeNode(pTypeNode, ctx, subRefs);
                } catch (e) { ctx.warn("DEP_FUNC_PARAM_TRAVERSE", `Failed for param of '${parentName}': ${e instanceof Error ? e.message : String(e)}`, parentName); }
            }
            try {
                const retType = getReturnTypeFromDeclaration(decl);
                if (retType) collectTypeRefsFromType(retType, ctx, subRefs);
                const retTypeNode = decl.getReturnTypeNode();
                if (retTypeNode) collectTypeRefsFromTypeNode(retTypeNode, ctx, subRefs);
            } catch { /* benign */ }
        }

        if (Node.isModuleDeclaration(decl)) {
            collectSubRefsFromNamespace(decl, ctx, subRefs, parentName);
        }
    }

    /**
     * Recursively traverses a namespace (ModuleDeclaration) and collects
     * sub-dependency type references from all its exported members.
     */
    function collectSubRefsFromNamespace(
        mod: ModuleDeclaration,
        ctx: ExtractionContext,
        subRefs: Set<ResolvedTypeRef>,
        parentName: string,
    ): void {
        try {
            for (const [, decls] of mod.getExportedDeclarations()) {
                for (const d of decls) {
                    collectSubRefsFromDeclaration(d, ctx, subRefs, parentName);
                }
            }
        } catch (e) { ctx.warn("DEP_NS_TRAVERSE", `Failed for namespace '${parentName}': ${e instanceof Error ? e.message : String(e)}`, parentName); }
    }

    /**
     * Collects type reference names from a single declaration node.
     * Returns a Set of referenced type names (similar to collectSubRefsFromDeclaration
     * but returns just names, not full ResolvedTypeRef objects).
     */
    function collectRefNamesFromDeclaration(
        decl: Node,
        ctx: ExtractionContext,
    ): Set<string> {
        const refs = new Set<ResolvedTypeRef>();
        // Per-call visited sets are now created inside collectTypeRefsFromType,
        // so no manual reset is needed.
        try {
            collectSubRefsFromDeclaration(decl, ctx, refs, "");
        } catch { /* benign */ }
        const names = new Set<string>();
        for (const r of refs) {
            names.add(r.name);
        }
        return names;
    }

    /**
     * Recursively populates `referencedTypes` on every member inside a
     * NamespaceInfo by finding the corresponding declaration in the
     * ModuleDeclaration AST and collecting its type references.
     */
    function populateNamespaceMemberRefs(
        nsInfo: NamespaceInfo,
        mod: ModuleDeclaration,
        ctx: ExtractionContext,
    ): void {
        // Build a map of exported declaration names → nodes for quick lookup
        const declsByName = new Map<string, Node[]>();
        try {
            for (const [exportName, decls] of mod.getExportedDeclarations()) {
                declsByName.set(exportName, [...decls]);
            }
        } catch { /* benign */ }

        // Also add direct child declarations (classes, interfaces, etc.)
        // that may not appear in getExportedDeclarations in ambient contexts
        for (const c of mod.getClasses()) {
            const n = c.getName();
            if (n && !declsByName.has(n)) declsByName.set(n, [c]);
        }
        for (const i of mod.getInterfaces()) {
            const n = i.getName();
            if (n && !declsByName.has(n)) declsByName.set(n, [i]);
        }
        for (const t of mod.getTypeAliases()) {
            const n = t.getName();
            if (n && !declsByName.has(n)) declsByName.set(n, [t]);
        }
        for (const f of mod.getFunctions()) {
            const n = f.getName();
            if (n && !declsByName.has(n)) declsByName.set(n, [f]);
        }

        function populateEntity(entity: { name: string; referencedTypes?: string[] }): void {
            const decls = declsByName.get(entity.name);
            if (!decls || decls.length === 0) return;
            const allNames = new Set<string>();
            for (const d of decls) {
                for (const name of collectRefNamesFromDeclaration(d, ctx)) {
                    allNames.add(name);
                }
            }
            if (allNames.size > 0) {
                entity.referencedTypes = Array.from(allNames);
            }
        }

        for (const cls of nsInfo.classes || []) populateEntity(cls);
        for (const iface of nsInfo.interfaces || []) populateEntity(iface);
        for (const t of nsInfo.types || []) populateEntity(t);
        for (const fn of nsInfo.functions || []) {
            if (fn.name) populateEntity(fn);
        }

        // Recurse into nested namespaces
        for (const nested of nsInfo.namespaces || []) {
            const nestedMod = mod.getModules().find(m => m.getName() === nested.name);
            if (nestedMod) {
                populateNamespaceMemberRefs(nested, nestedMod, ctx);
            }
        }
    }

    let pendingTypes = new Map(typesByPackage);
    while (pendingTypes.size > 0) {
        const newPending = new Map<string, Set<string>>();

        for (const [packageName, typeNames] of pendingTypes) {
            // @types/node types are referenced as imports, not extracted.
            if (isNodePackage(packageName)) continue;
            for (const typeName of typeNames) {
                const rootKey = makeDepKey(packageName, typeName);
                const resolution = importResolutionMap.get(rootKey);
                const subpath = resolution?.subpath;
                const qKey = makeDepKey(packageName, typeName, subpath);
                if (processed.has(qKey)) continue;
                processed.add(qKey);
                let result: ExtractResult | null = null;

                if (resolution) {
                    const isDefault = defaultImportedTypes.has(rootKey);
                    result = extractTypeFromResolvedModule(typeName, resolution.resolvedFile, isDefault, ctx);
                } else {
                    // For namespace-imported types (e.g., extLib.INetworkModule),
                    // the per-type map has no entry because the type was accessed
                    // via qualified syntax, not a named import. Use the package-
                    // level resolved file from the namespace import.
                    const pkgFile = packageResolutionMap.get(packageName);
                    if (pkgFile) {
                        result = extractTypeFromResolvedModule(typeName, pkgFile, false, ctx);
                    }
                }

                // If extraction failed and this type is a renamed import alias,
                // try extracting with the original exported name and emit a type alias.
                // Example: `import { ProxySettings as ProxyOptions }` — extract
                // ProxySettings and add `type ProxyOptions = ProxySettings`.
                if (!result && typeAliasMap.has(rootKey)) {
                    const originalName = typeAliasMap.get(rootKey)!;
                    // Try using the existing resolution for the alias name
                    const aliasResolution = resolution ?? importResolutionMap.get(makeDepKey(packageName, originalName));
                    if (aliasResolution) {
                        const origResult = extractTypeFromResolvedModule(originalName, aliasResolution.resolvedFile, false, ctx);
                        if (origResult) {
                            // Ensure the original type is also resolved
                            const origKey = makeDepKey(packageName, originalName, subpath);
                            if (!allResolved.has(origKey)) {
                                allResolved.set(origKey, { packageName, subpath, type: origResult.graphed, kind: origResult.kind });
                            }
                            // Create synthetic type alias.
                            // For self-package aliases (e.g., `import { X as XInternal }
                            // from "./generated"`), inline the type body to avoid circular
                            // references when the original name is re-exported with a
                            // different wrapper type. For external packages, keep the name
                            // reference (e.g., `type HttpRequestBody = RequestBodyType`)
                            // since the dep module defines the original — no circularity.
                            const isSelfPackage = packageName === api.package;
                            const typeBody = isSelfPackage && origResult.kind === "type" && "type" in origResult.graphed
                                ? (origResult.graphed as TypeAliasInfo).type
                                : originalName;
                            const aliasType: TypeAliasInfo = { name: typeName, type: typeBody };
                            result = { graphed: aliasType, declaration: origResult.declaration, kind: "type" };
                        }
                    }
                }

                if (!result) {
                    allUnresolved.set(qKey, packageName);
                    continue;
                }

                // If the extracted entity has a different name than requested (aliased re-export),
                // store the real type under the extracted name and a synthetic alias under the requested name.
                const extractedName = (result.graphed as { name?: string }).name;
                const needsAlias = extractedName && extractedName !== typeName;

                if (needsAlias) {
                    const realKey = makeDepKey(packageName, extractedName, subpath);
                    if (!allResolved.has(realKey)) {
                        allResolved.set(realKey, { packageName, subpath, type: result.graphed, kind: result.kind });
                    }
                    const aliasType: TypeAliasInfo = { name: typeName, type: extractedName };
                    allResolved.set(qKey, { packageName, subpath, type: aliasType, kind: "type" });
                } else {
                    allResolved.set(qKey, { packageName, subpath, type: result.graphed, kind: result.kind });
                }

                // For directly-resolved namespaces, populate per-member referencedTypes
                if (result.kind === "namespace" && Node.isModuleDeclaration(result.declaration)) {
                    populateNamespaceMemberRefs(result.graphed as NamespaceInfo, result.declaration, ctx);
                }

                // Collect namespace aliases from the declaration's source file
                // (catches dep-internal barrel aliases from files reached via
                // re-exports, not just the initial barrel).
                collectNsAliasesFromFile(result.declaration.getSourceFile());

                // Companion namespace extraction: if the resolved type is an
                // interface/class/type and the same file has a namespace with
                // the same name (declaration merging), extract it too.
                // Use the declaration's source file (not the barrel/re-export file)
                // so we find the namespace where it's actually defined.
                let companionMod: ModuleDeclaration | undefined;
                if (result.kind !== "namespace") {
                    const declFile = result.declaration.getSourceFile();
                    companionMod = declFile.getModules().find(m => m.getName() === typeName);
                    // If not found at file level, check the parent namespace.
                    // Handles nested declaration merging (e.g., ChatCompletion.Choice
                    // interface + ChatCompletion.Choice namespace).
                    if (!companionMod) {
                        const parent = result.declaration.getParent();
                        if (Node.isModuleBlock(parent)) {
                            const parentMod = parent.getParent();
                            if (Node.isModuleDeclaration(parentMod)) {
                                companionMod = parentMod.getModules().find(m => m.getName() === typeName);
                            }
                        }
                    }
                    if (companionMod) {
                        const nsInfo = extractNamespace(companionMod, ctx);
                        if (nsInfo) {
                            allResolved.set(makeDepKey(packageName, `__ns__${typeName}`, subpath), { packageName, subpath, type: nsInfo, kind: "namespace" });
                            // Populate per-member referencedTypes from AST declarations
                            populateNamespaceMemberRefs(nsInfo, companionMod, ctx);
                        }
                    }
                }

                // Use AST-based type traversal to discover sub-dependencies.
                // Always collect sub-refs so that referencedTypes is populated
                // even for fallback-resolved types. Only the transitive
                // resolution (queueing new types) is skipped for fallback types
                // whose sub-references often cascade into unresolvable chains
                // (e.g., platform-specific globals, deep internal types).

                // Each call to collectTypeRefsFromType now creates its own
                // per-call visited set, so types discovered for one entity are
                // never skipped when traversing another entity's type graph.
                const subRefs = new Set<ResolvedTypeRef>();
                try {
                    collectSubRefsFromDeclaration(result.declaration, ctx, subRefs, typeName);
                    // Also traverse companion namespace members for sub-dependencies
                    if (companionMod) {
                        collectSubRefsFromNamespace(companionMod, ctx, subRefs, typeName);
                    }
                } catch (e) { ctx.warn("DEP_TYPE_TRAVERSE", `Failed for '${typeName}': ${e instanceof Error ? e.message : String(e)}`, typeName); }

                // Record sub-ref names for referencedTypes population (always,
                // including fallback types, so they get non-empty referencedTypes).
                const refNames = new Set<string>();
                for (const subRef of subRefs) {
                    refNames.add(subRef.name);
                }
                if (refNames.size > 0) {
                    entitySubRefNames.set(qKey, refNames);
                }

                // Queue discovered sub-refs for resolution — skip for fallback
                // types to avoid chasing unresolvable transitive chains.
                if (!result.fromFallback) {
                for (const subRef of subRefs) {
                    // Track alias relationships from sub-deps
                    if (subRef.originalName && subRef.originalName !== subRef.name && subRef.packageName) {
                        typeAliasMap.set(makeDepKey(subRef.packageName, subRef.name), subRef.originalName);
                    }
                    if (!subRef.packageName) continue;
                    if (isNodePackage(subRef.packageName)) continue;
                    if (subRef.packageName === api.package && definedTypes.has(subRef.name)) continue;
                    const subRootKey = makeDepKey(subRef.packageName, subRef.name);
                    const subResolution = importResolutionMap.get(subRootKey);
                    const subQKey = makeDepKey(subRef.packageName, subRef.name, subResolution?.subpath);
                    if (processed.has(subQKey)) continue;
                    if (allResolved.has(subQKey)) continue;

                    // Register in import resolution map for resolution
                    if (!importResolutionMap.has(subRootKey)) {
                        let resolvedFile: SourceFile | undefined;
                        // Prefer the exact declaration file when available — this handles
                        // multi-module packages where different types live in different files
                        if (subRef.declarationPath) {
                            resolvedFile = ctx.project.getSourceFile(subRef.declarationPath) ?? undefined;
                            // Lazy loading: add the declaration file to the project on-demand
                            if (!resolvedFile && fs.existsSync(subRef.declarationPath)) {
                                try {
                                    resolvedFile = ctx.project.addSourceFileAtPath(subRef.declarationPath);
                                } catch { /* benign — file may already be added */ }
                            }
                        }
                        // Fall back to any existing entry for the same package
                        if (!resolvedFile) {
                            resolvedFile = packageToFile.get(subRef.packageName);
                        }
                        if (resolvedFile) {
                            // Propagate parent subpath only for same-package transitive types.
                            // Use the already-resolved `subpath` from the outer loop (line 897)
                            // instead of re-looking up via qKey — the resolution is stored
                            // under rootKey, not qKey, so a qualified-key lookup would miss.
                            const parentSubpath = (subRef.packageName === packageName)
                                ? (subpath ?? ".")
                                : ".";
                            importResolutionMap.set(subQKey, { packageName: subRef.packageName, resolvedFile, subpath: parentSubpath });
                            if (!importResolutionMap.has(subRootKey)) {
                                importResolutionMap.set(subRootKey, { packageName: subRef.packageName, resolvedFile, subpath: parentSubpath });
                            }
                            if (!packageToFile.has(subRef.packageName)) {
                                packageToFile.set(subRef.packageName, resolvedFile);
                            }
                        }
                    }

                    if (!newPending.has(subRef.packageName)) newPending.set(subRef.packageName, new Set());
                    newPending.get(subRef.packageName)!.add(subRef.name);
                }
                } // end if (!result.fromFallback)
            }
        }

        pendingTypes = newPending;
    }


    // Build dependency info grouped by package.
    // Also track entity → subpath so splitDependenciesBySubpath and
    // entitySubRefNames lookups use identity-based subpath resolution
    // instead of name-based lookups that collapse same-named types.
    const depByPackage = new Map<string, DependencyInfo>();
    const entityToSubpath = new Map<object, string>();
    for (const [, { packageName, subpath: resolvedSubpath, type, kind }] of allResolved) {
        if (!depByPackage.has(packageName)) {
            depByPackage.set(packageName, {
                package: packageName,
                version: getPackageVersion(rootPath, packageName),
                isNode: isNodePackage(packageName) || undefined,
            });
        }
        entityToSubpath.set(type, resolvedSubpath ?? ".");
        const depInfo = depByPackage.get(packageName)!;
        switch (kind) {
            case "class":
                (depInfo.classes ??= []).push(type as ClassInfo);
                break;
            case "interface":
                (depInfo.interfaces ??= []).push(type as InterfaceInfo);
                break;
            case "enum":
                (depInfo.enums ??= []).push(type as EnumInfo);
                break;
            case "type":
                (depInfo.types ??= []).push(type as TypeAliasInfo);
                break;
            case "function":
                (depInfo.functions ??= []).push(type as FunctionInfo);
                break;
            case "namespace":
                (depInfo.namespaces ??= []).push(type as NamespaceInfo);
                break;
        }
    }

    // Populate referencedTypes on dependency entities from sub-ref tracking.
    // entitySubRefNames is keyed by makeDepKey(packageName, typeName, subpath).
    for (const [pkgName, dep] of depByPackage) {
        for (const cls of dep.classes || []) {
            const sp = entityToSubpath.get(cls);
            const refs = entitySubRefNames.get(makeDepKey(pkgName, cls.name, sp));
            if (refs?.size) cls.referencedTypes = Array.from(refs);
        }
        for (const iface of dep.interfaces || []) {
            const sp = entityToSubpath.get(iface);
            const refs = entitySubRefNames.get(makeDepKey(pkgName, iface.name, sp));
            if (refs?.size) iface.referencedTypes = Array.from(refs);
        }
        for (const t of dep.types || []) {
            const sp = entityToSubpath.get(t);
            const refs = entitySubRefNames.get(makeDepKey(pkgName, t.name, sp));
            if (refs?.size) t.referencedTypes = Array.from(refs);
        }
        for (const fn of dep.functions || []) {
            if (!fn.name) continue;
            const sp = entityToSubpath.get(fn);
            const refs = entitySubRefNames.get(makeDepKey(pkgName, fn.name, sp));
            if (refs?.size) fn.referencedTypes = Array.from(refs);
        }
    }

    // Filter namespace members to only include those reachable from the API surface.
    // Companion namespaces are extracted eagerly (all exported members), but only
    // members whose names appear as type references in the non-namespace resolved
    // types should be retained. This prevents unreferenced type aliases (e.g.,
    // Conversations.Items.InputTextContent) from appearing in the output.
    filterUnreachableNamespaceMembers(allResolved, depByPackage, api, definedTypes, entityToSubpath);

    // Add Node.js dependencies as simple type-name references (no extraction).
    // These are emitted as import statements, not declare module blocks.
    // Use the original node:* module paths (e.g., node:buffer, node:stream, node:events)
    // determined from ambient `declare module "..."` blocks in @types/node .d.ts files.
    //
    // Build a lookup: type name → specific node:* module from module declarations.
    // Also track which types are actual classes/interfaces (importable) vs internal
    // utility type aliases (DefaultEventMap, EventMap, etc.) that shouldn't be imported.
    const nodeTypeToModule = new Map<string, string>();
    const nodeImportableTypes = new Set<string>();
    for (const ref of externalRefs) {
        if (!ref.packageName || !isNodePackage(ref.packageName)) continue;
        if (ref.declarationPath) {
            // Extract module name from ambient module declarations in the .d.ts file.
            // Instead of inferring from file paths (fragile for dotted filenames or
            // layout changes), we read `declare module "..."` blocks via ts-morph and
            // find which one exports the type.
            const moduleName = getNodeModuleNameFromDeclarations(ref.name, ref.declarationPath, ctx);
            if (moduleName !== undefined) {
                nodeTypeToModule.set(ref.name, moduleName);
            }

            // Use AST-based declaration kind check to determine if the type is
            // importable (class/interface) vs an internal utility type alias.
            // Only classes and interfaces should appear as imports — type aliases
            // like DefaultEventMap = [never] are internal marker types used in
            // generic defaults, not meant to be imported by consumers.
            if (isNodeTypeImportable(ref.name, ref.declarationPath, ctx)) {
                nodeImportableTypes.add(ref.name);
            }
        } else if (ref.packageName.startsWith("node:")) {
            // Already has the correct node:* module name
            nodeTypeToModule.set(ref.name, ref.packageName);
            nodeImportableTypes.add(ref.name);
        }
    }

    for (const [packageName, typeNames] of typesByPackage) {
        if (!isNodePackage(packageName)) continue;
        for (const typeName of typeNames) {
            // Skip module namespace objects (e.g., "fs" from `import * as fs from "node:fs"`).
            // Use the compiler's symbol declaration kind: ModuleDeclaration or
            // NamespaceImport symbols are not types — they are module namespaces.
            if (isModuleNamespaceSymbol(typeName, ctx)) continue;

            // Skip types from globals.d.ts (ambient, available via <reference types="node" />)
            // and internal utility type aliases (non-class/interface declarations).
            if (!nodeTypeToModule.has(typeName) || !nodeImportableTypes.has(typeName)) continue;

            // Determine the specific node:* module for this type
            const nodeModule = nodeTypeToModule.get(typeName)!;
            if (!depByPackage.has(nodeModule)) {
                depByPackage.set(nodeModule, { package: nodeModule, isNode: true });
            }
            const depInfo = depByPackage.get(nodeModule)!;
            const existingNames = new Set((depInfo.types ?? []).map(t => t.name));
            if (existingNames.has(typeName)) continue;
            (depInfo.types ??= []).push({ name: typeName, type: typeName } as TypeAliasInfo);
        }
    }

    // Add unresolved types (skip Node built-in modules — they don't have
    // installable type packages and would always be unresolved)
    for (const [qKey, pkg] of allUnresolved) {
        const { typeName } = splitDepKey(qKey);
        if (isNodeBuiltinModule(pkg)) continue;
        if (isNodePackage(pkg)) continue;
        if (!depByPackage.has(pkg)) {
            depByPackage.set(pkg, { package: pkg, isNode: isNodePackage(pkg) || undefined });
        }
        (depByPackage.get(pkg)!.types ??= []).push({ name: typeName, type: "unresolved" } as TypeAliasInfo);
    }

    // Populate export conditions from each dependency's package.json
    for (const [, depInfo] of depByPackage) {
        if (depInfo.isNode) continue;
        const conditions = getPackageExportConditions(rootPath, depInfo.package);
        if (conditions && conditions.length > 0) {
            depInfo.conditions = conditions;
        }
    }

    const flatDeps = Array.from(depByPackage.values()).sort((a, b) => a.package.localeCompare(b.package));
    return splitDependenciesBySubpath(flatDeps, typeSubpathMap, rootPath, entityToSubpath);
}

/**
 * Determines whether a @types/node type is importable (class or interface)
 * using ts-morph's AST rather than regex on file content.
 *
 * Only classes and interfaces are importable as values/types from node:*
 * modules. Type aliases (e.g., `type DefaultEventMap = [never]`) are
 * internal marker types used in generic defaults and should not be emitted
 * as import targets.
 */
export function isNodeTypeImportable(typeName: string, declarationPath: string, ctx: ExtractionContext): boolean {
    let sf = ctx.project.getSourceFile(declarationPath);
    if (!sf) {
        try { sf = ctx.project.addSourceFileAtPath(declarationPath); }
        catch { return false; }
    }

    // Checks whether any declaration is a class/interface, following
    // ImportEqualsDeclaration aliases (e.g., `export { internal as EventEmitter }`
    // in @types/node/events.d.ts resolves to the actual EventEmitter class).
    function isClassOrInterface(decls: readonly import("ts-morph").ExportedDeclarations[]): boolean {
        for (const decl of decls) {
            if (Node.isClassDeclaration(decl) || Node.isInterfaceDeclaration(decl)) {
                return true;
            }
            if (Node.isImportEqualsDeclaration(decl)) {
                try {
                    const sym = decl.getType().getSymbol();
                    if (sym) {
                        for (const td of sym.getDeclarations()) {
                            if (Node.isClassDeclaration(td) || Node.isInterfaceDeclaration(td)) {
                                return true;
                            }
                        }
                    }
                } catch { /* benign */ }
            }
        }
        return false;
    }

    // Check file-level exported declarations
    try {
        const exported = sf.getExportedDeclarations();
        const decls = exported.get(typeName);
        if (decls && isClassOrInterface(decls)) {
            return true;
        }
    } catch { /* benign */ }

    // Check ambient module declarations (e.g., `declare module "buffer" { ... }`)
    try {
        for (const mod of sf.getModules()) {
            const exported = mod.getExportedDeclarations();
            const decls = exported.get(typeName);
            if (decls && isClassOrInterface(decls)) {
                return true;
            }
        }
    } catch { /* benign */ }

    return false;
}

/**
 * Extracts the `node:*` module name for a type declared in a `@types/node` .d.ts file
 * by inspecting the ambient `declare module "..."` blocks via ts-morph, rather than
 * inferring the module name from the file path (which is fragile for dotted filenames
 * or layout changes).
 *
 * Returns the canonical `node:*` module name (e.g., `"node:events"`) if the type is
 * exported from an ambient module declaration, or `undefined` if no matching module
 * is found (e.g., for globals.d.ts ambient types that lack a module declaration).
 */
export function getNodeModuleNameFromDeclarations(
    typeName: string,
    declarationPath: string,
    ctx: ExtractionContext,
): string | undefined {
    let sf = ctx.project.getSourceFile(declarationPath);
    if (!sf) {
        try { sf = ctx.project.addSourceFileAtPath(declarationPath); }
        catch { return undefined; }
    }

    try {
        for (const mod of sf.getModules()) {
            // Module name is the string literal from `declare module "fs"` (with quotes).
            const rawName = mod.getName();
            // Strip surrounding quotes (single or double).
            const modName = rawName.replace(/^["']|["']$/g, "");
            if (!modName) continue;

            // Check if this ambient module exports the type we're looking for.
            const exported = mod.getExportedDeclarations();
            if (!exported.has(typeName)) continue;

            // The module name already has the canonical form (e.g., "fs" or "node:fs").
            // Normalize to always use the `node:` prefix.
            return modName.startsWith("node:") ? modName : `node:${modName}`;
        }
    } catch { /* benign — some files may not parse cleanly */ }

    return undefined;
}

/**
 * Determines whether a symbol name refers to a module namespace object
 * (e.g., `fs` from `import * as fs from "node:fs"`) rather than a type.
 *
 * Uses the TypeScript compiler's symbol table to check declaration kinds.
 * Returns true if the symbol resolves to a ModuleDeclaration, NamespaceImport,
 * or other non-type entity, meaning it should be excluded from Node.js type imports.
 */
export function isModuleNamespaceSymbol(typeName: string, ctx: ExtractionContext): boolean {
    // Fast path: reuse the already-collected namespace import set from the
    // TypeReferenceCollector (populated during type reference collection).
    if (ctx.typeRefs.hasNamespaceImport(typeName)) return true;

    // Slow path: check if the symbol resolves to a module declaration rather
    // than a type by looking in the source files' local symbols.
    for (const sf of ctx.project.getSourceFiles()) {
        if (sf.getFilePath().includes("/node_modules/")) continue;
        try {
            const local = sf.getLocal(typeName);
            if (local) {
                const decls = local.getDeclarations();
                // If ALL declarations are namespace imports or module declarations,
                // this is a module namespace, not a type.
                if (decls.length > 0 && decls.every(d =>
                    Node.isNamespaceImport(d) ||
                    Node.isModuleDeclaration(d) ||
                    Node.isImportEqualsDeclaration(d)
                )) {
                    return true;
                }
            }
        } catch { /* benign — some files may not resolve locals */ }
    }

    return false;
}

/**
 * Walk up the directory tree from startDir to find a node_modules directory
 * that contains the given package. This mimics Node.js module resolution,
 * which is necessary when rootPath is a subdirectory (e.g. sdk/src) but
 * node_modules lives at the project root (e.g. sdk/node_modules).
 *
 * Verifies that the candidate directory's package.json "name" field matches
 * the requested package name so that pnpm virtual store or aliased packages
 * do not produce false positives.
 */
export function findPackageInNodeModules(startDir: string, packageName: string): boolean {
    let current = path.resolve(startDir);
    const root = path.parse(current).root;
    while (true) {
        const candidate = path.join(current, "node_modules", packageName);
        if (fs.existsSync(candidate)) {
            // Verify the package.json name matches when one exists
            const pkgJsonPath = path.join(candidate, "package.json");
            if (fs.existsSync(pkgJsonPath)) {
                try {
                    const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, "utf-8"));
                    if (pkg.name === packageName) return true;
                    // name mismatch — keep searching up
                } catch {
                    // Malformed JSON — keep searching up
                }
            } else {
                // Directory exists but no package.json (rare) — accept it
                return true;
            }
        }
        const parent = path.dirname(current);
        if (parent === current || current === root) break;
        current = parent;
    }
    return false;
}

/**
 * Reads the installed version of a dependency package.
 */
export function getPackageVersion(startDir: string, packageName: string): string | undefined {
    let current = path.resolve(startDir);
    const root = path.parse(current).root;
    while (true) {
        const pkgJsonPath = path.join(current, "node_modules", packageName, "package.json");
        if (fs.existsSync(pkgJsonPath)) {
            try {
                const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, "utf-8"));
                return pkgJson.version || undefined;
            } catch { /* benign */ }
            return undefined;
        }
        const parent = path.dirname(current);
        if (parent === current || current === root) break;
        current = parent;
    }
    return undefined;
}

/**
 * Reads the export conditions from a dependency's package.json.
 * Looks at the "." entry in the "exports" field and returns the condition keys
 * (e.g. ["browser", "import", "require"]), filtering out meta-keys like
 * "react-native" and "types".
 */
export function getPackageExportConditions(startDir: string, packageName: string, subpath: string = "."): string[] | undefined {
    let current = path.resolve(startDir);
    const root = path.parse(current).root;
    while (true) {
        const pkgJsonPath = path.join(current, "node_modules", packageName, "package.json");
        if (fs.existsSync(pkgJsonPath)) {
            try {
                const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, "utf-8"));
                const exportsField = pkgJson.exports;
                if (exportsField && typeof exportsField === "object") {
                    const targetExport = findSubpathExport(exportsField, subpath);
                    if (targetExport && typeof targetExport === "object") {
                        // Use the shared resolver to walk the export and
                        // collect unique runtime condition keys.
                        const skipKeys = new Set(["types", "default"]);
                        const resolved = resolveExports(targetExport);
                        const conditionSet = new Set<string>();
                        for (const entry of resolved) {
                            for (const c of entry.conditionChain) {
                                if (!c.startsWith(".") && !skipKeys.has(c)) {
                                    conditionSet.add(c);
                                }
                            }
                        }
                        const conditions = [...conditionSet];
                        return conditions.length > 0 ? conditions : undefined;
                    }
                }
            } catch { /* benign — can't read package.json */ }
            return undefined;
        }
        const parent = path.dirname(current);
        if (parent === current || current === root) break;
        current = parent;
    }
    return undefined;
}

/**
 * Resolves the ".d.ts" type entry point for each export condition in a package.
 * Returns a map of condition name → absolute path to the .d.ts file.
 * Includes a "default" entry from the package's top-level "types" field.
 *
 * Uses the shared `resolveExports` resolver to walk the exports object, then
 * attributes each `.d.ts` path to the appropriate runtime condition from its
 * condition chain.
 */
export function getPackageConditionTypePaths(startDir: string, packageName: string, subpath: string = "."): Map<string, string> | undefined {
    let current = path.resolve(startDir);
    const root = path.parse(current).root;
    while (true) {
        const pkgJsonPath = path.join(current, "node_modules", packageName, "package.json");
        if (fs.existsSync(pkgJsonPath)) {
            const pkgDir = path.dirname(pkgJsonPath);
            try {
                const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, "utf-8"));
                const result = new Map<string, string>();
                const exportsObj = pkgJson.exports;

                if (exportsObj && typeof exportsObj === "object") {
                    const targetExport = findSubpathExport(exportsObj, subpath);
                    if (targetExport && typeof targetExport === "object") {
                        // Walk the target export with the shared resolver
                        const resolved = resolveExports(targetExport);
                        const skipKeys = new Set(["types"]);

                        for (const entry of resolved) {
                            // Only interested in .d.ts files
                            if (!/\.d\.[mc]?ts$/.test(entry.filePath)) continue;

                            // Determine the condition to attribute this types path to:
                            // use the last runtime (non-skip) condition in the chain, or "default".
                            const runtimeCondition = findBestRuntimeCondition(entry.conditionChain, skipKeys);
                            const condition = runtimeCondition ?? "default";

                            const absPath = path.resolve(pkgDir, entry.filePath);
                            if (fs.existsSync(absPath) && !result.has(condition)) {
                                result.set(condition, absPath);
                            }
                        }
                    }
                }

                // If no "default" entry and looking at root, use the top-level "types" field
                if (!result.has("default") && subpath === "." && pkgJson.types) {
                    const absPath = path.resolve(pkgDir, pkgJson.types);
                    if (fs.existsSync(absPath)) {
                        result.set("default", absPath);
                    }
                }

                return result.size > 0 ? result : undefined;
            } catch { /* benign */ }
            return undefined;
        }
        const parent = path.dirname(current);
        if (parent === current || current === root) break;
        current = parent;
    }
    return undefined;
}

/**
 * Finds the lowest-tier (highest priority) runtime condition in a condition chain.
 * Lower tier = higher priority (e.g., node < browser < development).
 * Returns undefined if no runtime condition is found.
 */
function findBestRuntimeCondition(chain: string[], skipKeys: Set<string>): string | undefined {
    // Only runtime target conditions — module format (import/require) handled by fallback
    const RUNTIME_TIERS: Record<string, number> = {
        "node": 4, "browser": 5, "react-native": 6, "workerd": 7, "worker": 7,
        "production": 8, "development": 9,
    };
    let best: string | undefined;
    let bestTier = Infinity;
    for (const c of chain) {
        if (skipKeys.has(c) || c.startsWith(".")) continue;
        const tier = RUNTIME_TIERS[c];
        if (tier !== undefined && tier < bestTier) {
            best = c;
            bestTier = tier;
        }
    }
    // If no known condition matched, fall back to the first non-skip condition
    if (!best) {
        for (const c of chain) {
            if (!skipKeys.has(c) && !c.startsWith(".")) {
                return c;
            }
        }
    }
    return best;
}

/**
 * Gets the set of exported type/value names from a .d.ts file.
 * Uses ts-morph's getExportedDeclarations() which follows re-exports.
 */
export function getExportedTypeNamesFromFile(dtsPath: string, project: Project): Set<string> {
    const names = new Set<string>();
    let sf = project.getSourceFile(dtsPath);
    if (!sf) {
        try { sf = project.addSourceFileAtPath(dtsPath); }
        catch { return names; }
    }
    try {
        for (const [name, decls] of sf.getExportedDeclarations()) {
            names.add(name);
            // Also include the original declaration name when an export uses an
            // alias (e.g. `export { AddPolicyOptions as AddPipelineOptions }`).
            // Dependency types are resolved by their declaration name, so the
            // filter in buildResolvedDependencies must match both the alias and
            // the original name.
            for (const decl of decls) {
                try {
                    if (Node.isClassDeclaration(decl) || Node.isInterfaceDeclaration(decl)
                        || Node.isEnumDeclaration(decl) || Node.isTypeAliasDeclaration(decl)
                        || Node.isFunctionDeclaration(decl)) {
                        const declName = decl.getName();
                        if (declName && declName !== name) {
                            names.add(declName);
                        }
                    }
                } catch { /* benign */ }
            }
        }
    } catch { /* benign — file may have parse errors */ }
    return names;
}

/**
 * Splits DependencyInfo entries by import subpath when the package has subpath
 * exports in its package.json. Types imported from different subpaths of the
 * same package (e.g., `@azure/core-rest-pipeline` vs `@azure/core-rest-pipeline/policies`)
 * are separated into distinct DependencyInfo entries so the C# side knows which
 * subpath to import from.
 *
 * Only splits when the package declares non-root subpath exports (e.g., `"./policies"`
 * in the exports map). Packages without subpath exports are left unchanged.
 */
function splitDependenciesBySubpath(
    deps: DependencyInfo[],
    subpathMap: Map<string, string>,
    rootPath: string,
    entityToSubpath?: Map<object, string>,
): DependencyInfo[] {
    const result: DependencyInfo[] = [];
    for (const dep of deps) {
        // Skip Node.js deps — they don't use subpath exports
        if (dep.isNode) {
            result.push(dep);
            continue;
        }

        // Check if the package actually has subpath exports
        if (!packageHasSubpathExports(rootPath, dep.package)) {
            result.push(dep);
            continue;
        }

        // Collect subpath for each entity using identity-based lookup
        // to avoid cross-subpath collapse when same-named types exist.
        const entitySubpathById = new Map<object, string>();
        const allSubpaths = new Set<string>();

        function recordEntity(entity: { name: string }): void {
            const subpath = entityToSubpath?.get(entity)
                ?? subpathMap.get(makeDepKey(dep.package, entity.name))
                ?? ".";
            entitySubpathById.set(entity, subpath);
            allSubpaths.add(subpath);
        }

        for (const c of dep.classes ?? []) recordEntity(c);
        for (const i of dep.interfaces ?? []) recordEntity(i);
        for (const e of dep.enums ?? []) recordEntity(e);
        for (const t of dep.types ?? []) recordEntity(t);
        for (const f of dep.functions ?? []) { if (f.name) recordEntity(f); }
        for (const ns of dep.namespaces ?? []) recordEntity(ns);

        // If only root subpath, keep as-is
        if (allSubpaths.size <= 1 && (allSubpaths.has(".") || allSubpaths.size === 0)) {
            result.push(dep);
            continue;
        }

        // Split by subpath
        for (const subpath of [...allSubpaths].sort()) {
            const isForSubpath = (entity: object) => (entitySubpathById.get(entity) ?? ".") === subpath;
            const splitDep: DependencyInfo = {
                package: dep.package,
                subpath: subpath !== "." ? subpath : undefined,
                version: dep.version,
                isNode: dep.isNode,
            };
            // Recompute conditions for this specific subpath
            const conditions = getPackageExportConditions(rootPath, dep.package, subpath);
            if (conditions && conditions.length > 0) {
                splitDep.conditions = conditions;
            }

            if (dep.classes) {
                const f = dep.classes.filter(c => isForSubpath(c));
                if (f.length) splitDep.classes = f;
            }
            if (dep.interfaces) {
                const f = dep.interfaces.filter(i => isForSubpath(i));
                if (f.length) splitDep.interfaces = f;
            }
            if (dep.enums) {
                const f = dep.enums.filter(e => isForSubpath(e));
                if (f.length) splitDep.enums = f;
            }
            if (dep.types) {
                const f = dep.types.filter(t => isForSubpath(t));
                if (f.length) splitDep.types = f;
            }
            if (dep.functions) {
                const f = dep.functions.filter(fn => isForSubpath(fn));
                if (f.length) splitDep.functions = f;
            }
            if (dep.namespaces) {
                const f = dep.namespaces.filter(ns => isForSubpath(ns));
                if (f.length) splitDep.namespaces = f;
            }

            const hasContent = splitDep.classes || splitDep.interfaces || splitDep.enums
                || splitDep.types || splitDep.functions || splitDep.namespaces;
            if (hasContent) result.push(splitDep);
        }
    }
    return result;
}

/**
 * Returns true when a package's package.json exports field contains non-root
 * subpath keys (e.g., `"./policies"`, `"./browser"`).
 */
function packageHasSubpathExports(startDir: string, packageName: string): boolean {
    let current = path.resolve(startDir);
    const root = path.parse(current).root;
    while (true) {
        const pkgJsonPath = path.join(current, "node_modules", packageName, "package.json");
        if (fs.existsSync(pkgJsonPath)) {
            try {
                const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, "utf-8"));
                const exportsField = pkgJson.exports;
                if (exportsField && typeof exportsField === "object" && !Array.isArray(exportsField)) {
                    return hasNonRootSubpaths(exportsField as Record<string, unknown>);
                }
            } catch { /* benign */ }
            return false;
        }
        const parent = path.dirname(current);
        if (parent === current || current === root) break;
        current = parent;
    }
    return false;
}

/**
 * Builds condition-aware resolved dependencies from flat DependencyInfo[].
 * For each dep, reads its package.json exports to discover conditions,
 * resolves the .d.ts entry point per condition, checks which of the needed
 * types are exported from each, and builds ApiIndex[] with per-condition modules.
 */
export function buildResolvedDependencies(
    flatDeps: DependencyInfo[],
    rootPath: string,
    ctx: ExtractionContext
): ApiIndex[] {
    const result: ApiIndex[] = [];

    for (const dep of flatDeps) {
        if (dep.isNode) continue;

        const hasContent = (dep.classes?.length ?? 0) + (dep.interfaces?.length ?? 0)
            + (dep.enums?.length ?? 0) + (dep.types?.filter(t => t.type !== "unresolved").length ?? 0)
            + (dep.functions?.length ?? 0) + (dep.namespaces?.length ?? 0) > 0;
        if (!hasContent) continue;

        const conditionPaths = getPackageConditionTypePaths(rootPath, dep.package, dep.subpath ?? ".");

        if (!conditionPaths || conditionPaths.size === 0) {
            // No conditional exports — single unconditioned module with all types
            result.push({
                package: dep.package,
                subpath: dep.subpath,
                modules: [{
                    name: dep.package,
                    exportPath: dep.subpath,
                    classes: dep.classes,
                    interfaces: dep.interfaces,
                    enums: dep.enums,
                    types: dep.types?.filter(t => t.type !== "unresolved"),
                    functions: dep.functions,
                    namespaces: dep.namespaces,
                }]
            });
            continue;
        }

        const modules: ModuleInfo[] = [];

        // Collect all exported names across ALL conditions to identify
        // non-exported (internal) types that need special handling.
        const allExportedNames = new Set<string>();
        const conditionExports = new Map<string, Set<string>>();
        for (const [condition, typesPath] of conditionPaths) {
            const exportedNames = getExportedTypeNamesFromFile(typesPath, ctx.project);
            conditionExports.set(condition, exportedNames);
            for (const name of exportedNames) allExportedNames.add(name);
        }

        // Internal types: present in the dependency but not exported from any
        // condition. These are non-exported types (e.g., openai's internal
        // EventListener<Events, Event>) that are referenced by exported types.
        // They must be included in every condition module so the output compiles.
        const internalTypes = (dep.types ?? []).filter(t =>
            t.type !== "unresolved" && !allExportedNames.has(t.name) && !allExportedNames.has(t.type));

        for (const [condition, exportedNames] of conditionExports) {
            if (exportedNames.size === 0) continue;

            const classes = (dep.classes ?? []).filter(c => exportedNames.has(c.name));
            const interfaces = (dep.interfaces ?? []).filter(i => exportedNames.has(i.name));
            const enums = (dep.enums ?? []).filter(e => exportedNames.has(e.name));
            // For type aliases, also include synthetic aliases (e.g. ProxyOptions = ProxySettings)
            // whose target type IS an exported name, even though the alias itself isn't exported.
            // Also include internal (non-exported) types used by exported types.
            const types = (dep.types ?? []).filter(t =>
                t.type !== "unresolved" && (exportedNames.has(t.name) || exportedNames.has(t.type)));
            // Merge internal types, avoiding duplicates
            const seenTypeNames = new Set(types.map(t => t.name));
            for (const it of internalTypes) {
                if (!seenTypeNames.has(it.name)) {
                    types.push(it);
                    seenTypeNames.add(it.name);
                }
            }
            const functions = (dep.functions ?? []).filter(f => f.name && exportedNames.has(f.name));
            // Filter namespace members: keep namespaces where the namespace name or
            // any member name is in the exported set
            const namespaces = (dep.namespaces ?? []).map(ns =>
                filterNamespaceByExports(ns, exportedNames)
            ).filter((ns): ns is NamespaceInfo => ns !== null);

            if (classes.length + interfaces.length + enums.length + types.length + functions.length + namespaces.length === 0) continue;

            // "default" condition maps to undefined (null in C#), which the
            // formatter treats as the fallback condition.
            const conditionValue = condition === "default" ? undefined : condition;

            modules.push({
                name: dep.package,
                exportPath: dep.subpath,
                condition: conditionValue,
                classes: classes.length > 0 ? classes : undefined,
                interfaces: interfaces.length > 0 ? interfaces : undefined,
                enums: enums.length > 0 ? enums : undefined,
                types: types.length > 0 ? types : undefined,
                functions: functions.length > 0 ? functions : undefined,
                namespaces: namespaces.length > 0 ? namespaces : undefined,
            });
        }

        if (modules.length > 0) {
            result.push({
                package: dep.package,
                subpath: dep.subpath,
                modules,
            });
        }
    }

    return result;
}

// ============================================================================
// Namespace Member Reachability Filtering
// ============================================================================

/**
 * Collects type names referenced by a single entity's type signatures.
 * Scans extends, implements, type alias bodies, method/constructor/function
 * signatures, property types, and type parameter constraints.
 */
/**
 * Collects type names referenced by an entity using its pre-computed
 * `referencedTypes` array (populated from TypeReferenceCollector or
 * entitySubRefNames during extraction).
 */
function collectReferencedNamesFromEntity(
    entity: ClassInfo | InterfaceInfo | EnumInfo | TypeAliasInfo | FunctionInfo,
    _kind: "class" | "interface" | "enum" | "type" | "function",
    refs: Set<string>,
): void {
    if ("referencedTypes" in entity) {
        for (const name of (entity as { referencedTypes?: string[] }).referencedTypes ?? []) refs.add(name);
    }
}

/**
 * Collects type names referenced by all members of a namespace (recursively)
 * using their pre-computed `referencedTypes` arrays.
 */
function collectReferencedNamesFromNamespace(ns: NamespaceInfo, refs: Set<string>): void {
    for (const c of ns.classes ?? []) for (const name of c.referencedTypes ?? []) refs.add(name);
    for (const i of ns.interfaces ?? []) for (const name of i.referencedTypes ?? []) refs.add(name);
    for (const _e of ns.enums ?? []) { /* enums have no type references */ }
    for (const t of ns.types ?? []) for (const name of t.referencedTypes ?? []) refs.add(name);
    for (const f of ns.functions ?? []) for (const name of f.referencedTypes ?? []) refs.add(name);
    for (const nested of ns.namespaces ?? []) collectReferencedNamesFromNamespace(nested, refs);
}

/**
 * Filters namespace members to only include those reachable from the main
 * package's API surface and non-namespace dependency types.
 *
 * Uses a rooted BFS: seeds from (1) all types defined in the main package's
 * modules, and (2) all non-namespace resolved dependency types. Then walks
 * into namespace members, only retaining members whose names appear in the
 * accumulated reference set.
 *
 * This prevents eagerly-extracted companion namespace members from appearing
 * in the output when nothing in the API surface references them.
 */
function filterUnreachableNamespaceMembers(
    allResolved: Map<string, { packageName: string; subpath?: string; type: ClassInfo | InterfaceInfo | EnumInfo | TypeAliasInfo | FunctionInfo | NamespaceInfo; kind: "class" | "interface" | "enum" | "type" | "function" | "namespace" }>,
    depByPackage: Map<string, DependencyInfo>,
    api: ApiIndex,
    definedTypes: Set<string>,
    entityToSubpath: Map<object, string>,
): void {
    // Phase 1: Collect all type names referenced by non-namespace root types.
    // These are the "seed" references that determine which namespace members
    // are needed. We exclude namespace members themselves to prevent dead
    // members from self-justifying their retention.
    const referencedNames = new Set<string>();
    // Package-qualified referenced names to prevent cross-package contamination
    const qualifiedReferencedNames = new Set<string>();

    // Seed from main package modules
    for (const mod of api.modules) {
        for (const c of mod.classes ?? []) collectReferencedNamesFromEntity(c, "class", referencedNames);
        for (const i of mod.interfaces ?? []) collectReferencedNamesFromEntity(i, "interface", referencedNames);
        for (const t of mod.types ?? []) collectReferencedNamesFromEntity(t, "type", referencedNames);
        for (const f of mod.functions ?? []) collectReferencedNamesFromEntity(f, "function", referencedNames);
        for (const e of mod.enums ?? []) collectReferencedNamesFromEntity(e, "enum", referencedNames);
        // Also scan namespace members within main package modules
        for (const ns of mod.namespaces ?? []) collectReferencedNamesFromNamespace(ns, referencedNames);
    }

    // Seed from non-namespace resolved dependency types
    for (const [key, { packageName, subpath: resolvedSubpath, type, kind }] of allResolved) {
        if (kind === "namespace") continue; // Skip namespaces — they contain the members we're filtering
        const entitySubpath = resolvedSubpath ?? entityToSubpath.get(type) ?? ".";
        const pkgRefs = new Set<string>();
        collectReferencedNamesFromEntity(type as ClassInfo | InterfaceInfo | EnumInfo | TypeAliasInfo | FunctionInfo, kind, pkgRefs);
        for (const name of pkgRefs) {
            referencedNames.add(name);
            qualifiedReferencedNames.add(makeDepKey(packageName, name, entitySubpath));
        }
    }

    // Also add all defined types — main package type names are always reachable
    for (const name of definedTypes) referencedNames.add(name);

    // Also add all non-namespace resolved type names — these are directly needed
    for (const [key, { packageName, kind }] of allResolved) {
        if (kind !== "namespace") {
            const { typeName, subpath: keySubpath } = splitDepKey(key);
            if (!typeName.startsWith("__ns__")) {
                referencedNames.add(typeName);
                qualifiedReferencedNames.add(makeDepKey(packageName, typeName, keySubpath));
            }
        }
    }

    // Phase 2: BFS walk into namespaces. When a namespace member is retained
    // (its name is in the reference set), scan its type signatures to discover
    // additional referenced names, potentially retaining further members.
    // Track which entity objects have been expanded to avoid redundant re-scanning.
    // Uses object identity (not names) because different types at different namespace
    // depths can share the same name (e.g., ChatCompletion.Choice vs ChatCompletionChunk.Choice).
    const expandedEntities = new WeakSet<object>();
    let changed = true;
    while (changed) {
        changed = false;
        for (const [pkgName, depInfo] of depByPackage) {
            for (const ns of depInfo.namespaces ?? []) {
                if (expandReachableFromNamespaceQualified(ns, referencedNames, qualifiedReferencedNames, expandedEntities, pkgName, entityToSubpath)) {
                    changed = true;
                }
            }
        }
    }

    // Phase 3: Filter namespace members, keeping only reachable ones.
    // Use package-qualified filtering per dependency to avoid cross-contamination.
    for (const [pkgName, depInfo] of depByPackage) {
        if (depInfo.namespaces) {
            depInfo.namespaces = depInfo.namespaces
                .map(ns => filterNamespaceMembersQualified(ns, referencedNames, qualifiedReferencedNames, pkgName, entityToSubpath))
                .filter((ns): ns is NamespaceInfo => ns !== null);
            if (depInfo.namespaces.length === 0) depInfo.namespaces = undefined;
        }
    }
}

/**
 * Package-qualified version of expandReachableFromNamespace.
 * Adds both simple and package-qualified names to the reference sets.
 */
function expandReachableFromNamespaceQualified(
    ns: NamespaceInfo,
    refs: Set<string>,
    qualifiedRefs: Set<string>,
    expanded: WeakSet<object>,
    packageName: string,
    entityToSubpath: Map<object, string>,
): boolean {
    let added = false;

    const tryExpand = (entity: ClassInfo | InterfaceInfo | EnumInfo | TypeAliasInfo | FunctionInfo, name: string, kind: "class" | "interface" | "enum" | "type" | "function") => {
        const sp = entityToSubpath.get(entity);
        // Check both simple name and package-qualified name (with subpath)
        if ((refs.has(name) || qualifiedRefs.has(makeDepKey(packageName, name, sp))) && !expanded.has(entity)) {
            expanded.add(entity);
            const before = refs.size;
            const newRefs = new Set<string>();
            collectReferencedNamesFromEntity(entity, kind, newRefs);
            for (const r of newRefs) {
                refs.add(r);
                qualifiedRefs.add(makeDepKey(packageName, r, sp));
            }
            if (refs.size > before) added = true;
        }
    };

    for (const c of ns.classes ?? []) tryExpand(c, c.name, "class");
    for (const i of ns.interfaces ?? []) tryExpand(i, i.name, "interface");
    for (const e of ns.enums ?? []) tryExpand(e, e.name, "enum");
    for (const t of ns.types ?? []) tryExpand(t, t.name, "type");
    for (const f of ns.functions ?? []) { if (f.name) tryExpand(f, f.name, "function"); }

    for (const nested of ns.namespaces ?? []) {
        const nestedSubpath = entityToSubpath.get(nested);
        const nestedQKey = makeDepKey(packageName, nested.name, nestedSubpath);
        if ((refs.has(nested.name) || qualifiedRefs.has(nestedQKey)) && !nested.isCompanion) {
            const before = refs.size;
            addAllMemberNamesQualified(nested, refs, qualifiedRefs, packageName, entityToSubpath);
            if (refs.size > before) added = true;
        }
        if (expandReachableFromNamespaceQualified(nested, refs, qualifiedRefs, expanded, packageName, entityToSubpath)) added = true;
    }

    return added;
}

/**
 * Package-qualified version of addAllMemberNames.
 */
function addAllMemberNamesQualified(ns: NamespaceInfo, refs: Set<string>, qualifiedRefs: Set<string>, packageName: string, entityToSubpath: Map<object, string>): void {
    for (const c of ns.classes ?? []) { refs.add(c.name); qualifiedRefs.add(makeDepKey(packageName, c.name, entityToSubpath.get(c))); }
    for (const i of ns.interfaces ?? []) { refs.add(i.name); qualifiedRefs.add(makeDepKey(packageName, i.name, entityToSubpath.get(i))); }
    for (const e of ns.enums ?? []) { refs.add(e.name); qualifiedRefs.add(makeDepKey(packageName, e.name, entityToSubpath.get(e))); }
    for (const t of ns.types ?? []) { refs.add(t.name); qualifiedRefs.add(makeDepKey(packageName, t.name, entityToSubpath.get(t))); }
    for (const f of ns.functions ?? []) { if (f.name) { refs.add(f.name); qualifiedRefs.add(makeDepKey(packageName, f.name, entityToSubpath.get(f))); } }
    for (const nested of ns.namespaces ?? []) { refs.add(nested.name); qualifiedRefs.add(makeDepKey(packageName, nested.name, entityToSubpath.get(nested))); }
}

/**
 * Package-qualified version of filterNamespaceMembers.
 * Checks both simple name and package-qualified name for membership.
 */
function filterNamespaceMembersQualified(
    ns: NamespaceInfo,
    refs: Set<string>,
    qualifiedRefs: Set<string>,
    packageName: string,
    entityToSubpath: Map<object, string>,
): NamespaceInfo | null {
    const isReachable = (name: string, entity?: object) => {
        const sp = entity ? entityToSubpath.get(entity) : undefined;
        return refs.has(name) || qualifiedRefs.has(makeDepKey(packageName, name, sp));
    };

    const result: NamespaceInfo = { name: ns.name };

    if (ns.classes) {
        const filtered = ns.classes.filter(c => isReachable(c.name, c));
        if (filtered.length) result.classes = filtered;
    }
    if (ns.interfaces) {
        const filtered = ns.interfaces.filter(i => isReachable(i.name, i));
        if (filtered.length) result.interfaces = filtered;
    }
    if (ns.enums) {
        const filtered = ns.enums.filter(e => isReachable(e.name, e));
        if (filtered.length) result.enums = filtered;
    }
    if (ns.types) {
        const filtered = ns.types.filter(t => isReachable(t.name, t));
        if (filtered.length) result.types = filtered;
    }
    if (ns.functions) {
        const filtered = ns.functions.filter(f => f.name && isReachable(f.name, f));
        if (filtered.length) result.functions = filtered;
    }
    if (ns.namespaces) {
        const filtered = ns.namespaces
            .map(n => filterNamespaceMembersQualified(n, refs, qualifiedRefs, packageName, entityToSubpath))
            .filter((n): n is NamespaceInfo => n !== null);
        if (filtered.length) result.namespaces = filtered;
    }

    if (!result.classes && !result.interfaces && !result.enums &&
        !result.types && !result.functions && !result.namespaces) {
        return null;
    }

    return result;
}


/**
 * Scans a namespace's members and adds newly-reachable member references
 * to the reference set. Returns true if any new names were added.
 * Uses `expanded` to skip members that have already been scanned.
 *
 * Companion namespaces (declaration-merged with a class/interface/type,
 * detected via `isCompanion` flag set during extraction) are skipped for
 * bulk member expansion — for companions, the name in refs means the
 * CLASS/INTERFACE is referenced, not the namespace members. For pure
 * (non-companion) namespaces, the name in refs means the namespace is
 * used as a type and all members form the type's structure.
 */
function expandReachableFromNamespace(ns: NamespaceInfo, refs: Set<string>, expanded: WeakSet<object>): boolean {
    let added = false;

    const tryExpand = (entity: ClassInfo | InterfaceInfo | EnumInfo | TypeAliasInfo | FunctionInfo, name: string, kind: "class" | "interface" | "enum" | "type" | "function") => {
        if (refs.has(name) && !expanded.has(entity)) {
            expanded.add(entity);
            const before = refs.size;
            collectReferencedNamesFromEntity(entity, kind, refs);
            if (refs.size > before) added = true;
        }
    };

    for (const c of ns.classes ?? []) tryExpand(c, c.name, "class");
    for (const i of ns.interfaces ?? []) tryExpand(i, i.name, "interface");
    for (const e of ns.enums ?? []) tryExpand(e, e.name, "enum");
    for (const t of ns.types ?? []) tryExpand(t, t.name, "type");
    for (const f of ns.functions ?? []) { if (f.name) tryExpand(f, f.name, "function"); }

    for (const nested of ns.namespaces ?? []) {
        // When a nested namespace's name is in refs and it's NOT a companion
        // (not declaration-merged with a class/interface/type), the namespace
        // itself is used as a type (e.g., `delta: Choice.Delta`). Add all its
        // direct members to refs since they form the type's structure.
        if (refs.has(nested.name) && !nested.isCompanion) {
            const before = refs.size;
            addAllMemberNames(nested, refs);
            if (refs.size > before) added = true;
        }
        if (expandReachableFromNamespace(nested, refs, expanded)) added = true;
    }

    return added;
}

/**
 * Adds all direct member names of a namespace to the reference set.
 * Used when a namespace is referenced as a type position.
 */
function addAllMemberNames(ns: NamespaceInfo, refs: Set<string>): void {
    for (const c of ns.classes ?? []) refs.add(c.name);
    for (const i of ns.interfaces ?? []) refs.add(i.name);
    for (const e of ns.enums ?? []) refs.add(e.name);
    for (const t of ns.types ?? []) refs.add(t.name);
    for (const f of ns.functions ?? []) { if (f.name) refs.add(f.name); }
    for (const nested of ns.namespaces ?? []) refs.add(nested.name);
}

/**
 * Filters a namespace to only include members whose names are in the
 * reference set. Returns null if the namespace becomes empty.
 * Processes bottom-up: nested namespaces are filtered first, and a
 * parent namespace is retained if any child survives.
 */
export function filterNamespaceMembers(ns: NamespaceInfo, refs: Set<string>): NamespaceInfo | null {
    const result: NamespaceInfo = { name: ns.name };

    if (ns.classes) {
        const filtered = ns.classes.filter(c => refs.has(c.name));
        if (filtered.length) result.classes = filtered;
    }
    if (ns.interfaces) {
        const filtered = ns.interfaces.filter(i => refs.has(i.name));
        if (filtered.length) result.interfaces = filtered;
    }
    if (ns.enums) {
        const filtered = ns.enums.filter(e => refs.has(e.name));
        if (filtered.length) result.enums = filtered;
    }
    if (ns.types) {
        const filtered = ns.types.filter(t => refs.has(t.name));
        if (filtered.length) result.types = filtered;
    }
    if (ns.functions) {
        const filtered = ns.functions.filter(f => f.name && refs.has(f.name));
        if (filtered.length) result.functions = filtered;
    }
    // Filter nested namespaces bottom-up
    if (ns.namespaces) {
        const filtered = ns.namespaces
            .map(n => filterNamespaceMembers(n, refs))
            .filter((n): n is NamespaceInfo => n !== null);
        if (filtered.length) result.namespaces = filtered;
    }

    // Keep namespace if any member survived
    if (!result.classes && !result.interfaces && !result.enums &&
        !result.types && !result.functions && !result.namespaces) {
        return null;
    }

    return result;
}

/**
 * Filters a namespace for buildResolvedDependencies by export names.
 * Keeps members whose names are in the exported set.
 * Returns null if the namespace becomes empty.
 */
export function filterNamespaceByExports(ns: NamespaceInfo, exportedNames: Set<string>): NamespaceInfo | null {
    // If the namespace itself is exported, keep it with all its members
    if (exportedNames.has(ns.name)) {
        return { ...ns };
    }

    const result: NamespaceInfo = { name: ns.name };

    if (ns.classes) {
        const f = ns.classes.filter(c => exportedNames.has(c.name));
        if (f.length) result.classes = f;
    }
    if (ns.interfaces) {
        const f = ns.interfaces.filter(i => exportedNames.has(i.name));
        if (f.length) result.interfaces = f;
    }
    if (ns.enums) {
        const f = ns.enums.filter(e => exportedNames.has(e.name));
        if (f.length) result.enums = f;
    }
    if (ns.types) {
        const f = ns.types.filter(t => exportedNames.has(t.name));
        if (f.length) result.types = f;
    }
    if (ns.functions) {
        const f = ns.functions.filter(fn => fn.name && exportedNames.has(fn.name));
        if (f.length) result.functions = f;
    }
    if (ns.namespaces) {
        const childNs = ns.namespaces
            .map(n => filterNamespaceByExports(n, exportedNames))
            .filter((n): n is NamespaceInfo => n !== null);
        if (childNs.length) result.namespaces = childNs;
    }

    if (result.classes || result.interfaces ||
        result.enums || result.types || result.functions || result.namespaces) {
        return result;
    }
    return null;
}
