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
    Node,
    Type,
    ExportedDeclarations,
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
} from "./extractors.js";
import {
    collectTypeRefsFromType,
    collectTypeRefsFromTypeNode,
} from "./type-refs.js";
import { isNodeBuiltinModule, isNodePackage } from "./node-builtins.js";

/**
 * Builds a map of type names to their resolved import declarations.
 * Uses the existing project's module resolution to find types in dependencies,
 * handling named imports, default imports, and re-exports.
 */
export function buildImportResolutionMap(project: Project): {
    typeMap: Map<string, { packageName: string; resolvedFile: SourceFile }>;
    packageMap: Map<string, SourceFile>;
} {
    const typeMap = new Map<string, { packageName: string; resolvedFile: SourceFile }>();
    const packageMap = new Map<string, SourceFile>();

    for (const sourceFile of project.getSourceFiles()) {
        const filePath = sourceFile.getFilePath();
        if (filePath.includes("node_modules")) continue;

        for (const importDecl of sourceFile.getImportDeclarations()) {
            const moduleSpecifier = importDecl.getModuleSpecifierValue();
            if (!moduleSpecifier || moduleSpecifier.startsWith(".")) continue;

            const resolvedFile = importDecl.getModuleSpecifierSourceFile();
            if (!resolvedFile) continue;

            // Named imports: import { Client, Foo } from "pkg"
            for (const namedImport of importDecl.getNamedImports()) {
                const importedName = namedImport.getName();
                const aliasName = namedImport.getAliasNode()?.getText();
                if (!typeMap.has(importedName)) {
                    typeMap.set(importedName, { packageName: moduleSpecifier, resolvedFile });
                }
                if (aliasName && !typeMap.has(aliasName)) {
                    typeMap.set(aliasName, { packageName: moduleSpecifier, resolvedFile });
                }
            }

            // Default imports: import OpenAI from "openai"
            const defaultImport = importDecl.getDefaultImport();
            if (defaultImport) {
                const typeName = defaultImport.getText();
                if (!typeMap.has(typeName)) {
                    typeMap.set(typeName, { packageName: moduleSpecifier, resolvedFile });
                }
            }

            // Namespace imports: import * as X from "pkg"
            // Store the package → resolvedFile mapping so types accessed via
            // namespace-qualified syntax (e.g., X.Foo) can be resolved even
            // though individual type names aren't in the per-type map.
            const nsImport = importDecl.getNamespaceImport();
            if (nsImport && !packageMap.has(moduleSpecifier)) {
                packageMap.set(moduleSpecifier, resolvedFile);
            }
        }

        // Re-exports: export { Foo } from "pkg"
        for (const exportDecl of sourceFile.getExportDeclarations()) {
            const moduleSpecifier = exportDecl.getModuleSpecifierValue();
            if (!moduleSpecifier || moduleSpecifier.startsWith(".")) continue;

            const resolvedFile = exportDecl.getModuleSpecifierSourceFile();
            if (!resolvedFile) continue;

            for (const namedExport of exportDecl.getNamedExports()) {
                const name = namedExport.getName();
                if (!typeMap.has(name)) {
                    typeMap.set(name, { packageName: moduleSpecifier, resolvedFile });
                }
            }
        }
    }

    return { typeMap, packageMap };
}

export type ExtractResult = {
    graphed: ClassInfo | InterfaceInfo | EnumInfo | TypeAliasInfo | FunctionInfo;
    declaration: Node;
    kind: "class" | "interface" | "enum" | "type" | "function";
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
    return null;
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
                                const r = extractDeclaration(classDecl, ctx);
                                if (r) return r;
                            }
                            for (const aDecl of aliasedDecls) {
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

    // Collect default-imported type names for proper lookup strategy
    const defaultImportedTypes = new Set<string>();
    for (const sourceFile of ctx.project.getSourceFiles()) {
        if (sourceFile.getFilePath().includes("node_modules")) continue;
        for (const importDecl of sourceFile.getImportDeclarations()) {
            const defImport = importDecl.getDefaultImport();
            if (defImport) defaultImportedTypes.add(defImport.getText());
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
            importResolutionMap.set(ref.name, { packageName: ref.packageName, resolvedFile });
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

    // Track type alias names: maps source-level alias name → original exported name.
    // For example, `import { ProxySettings as ProxyOptions }` produces:
    //   typeAliasMap.set("ProxyOptions", "ProxySettings")
    // When extraction fails for the alias name, we try the original name and
    // emit a synthetic `type ProxyOptions = ProxySettings` alias.
    const typeAliasMap = new Map<string, string>();
    for (const ref of externalRefs) {
        if (ref.originalName && ref.originalName !== ref.name) {
            typeAliasMap.set(ref.name, ref.originalName);
        }
    }

    // Resolve types iteratively using AST-based sub-dependency discovery.
    // When a dependency type is resolved, we use ts-morph's type system to
    // walk its declaration and find all referenced external types — no string
    // tokenization or heuristics.
    const allResolved = new Map<string, { packageName: string; type: ClassInfo | InterfaceInfo | EnumInfo | TypeAliasInfo | FunctionInfo; kind: "class" | "interface" | "enum" | "type" | "function" }>();
    const allUnresolved = new Set<string>();
    const processed = new Set<string>();

    // Pre-build packageName → SourceFile index for O(1) fallback lookups
    const packageToFile = new Map<string, SourceFile>();
    for (const [, entry] of importResolutionMap) {
        if (!packageToFile.has(entry.packageName)) {
            packageToFile.set(entry.packageName, entry.resolvedFile);
        }
    }

    let pendingTypes = new Map(typesByPackage);
    while (pendingTypes.size > 0) {
        const newPending = new Map<string, Set<string>>();

        for (const [packageName, typeNames] of pendingTypes) {
            // @types/node types are referenced as imports, not extracted.
            if (isNodePackage(packageName)) continue;
            for (const typeName of typeNames) {
                if (processed.has(typeName)) continue;
                processed.add(typeName);
                const resolution = importResolutionMap.get(typeName);
                let result: { graphed: ClassInfo | InterfaceInfo | EnumInfo | TypeAliasInfo | FunctionInfo; declaration: Node; kind: "class" | "interface" | "enum" | "type" | "function" } | null = null;

                if (resolution) {
                    const isDefault = defaultImportedTypes.has(typeName);
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
                if (!result && typeAliasMap.has(typeName)) {
                    const originalName = typeAliasMap.get(typeName)!;
                    // Try using the existing resolution for the alias name
                    const aliasResolution = resolution ?? importResolutionMap.get(originalName);
                    if (aliasResolution) {
                        const origResult = extractTypeFromResolvedModule(originalName, aliasResolution.resolvedFile, false, ctx);
                        if (origResult) {
                            // Ensure the original type is also resolved
                            if (!allResolved.has(originalName)) {
                                allResolved.set(originalName, { packageName, type: origResult.graphed, kind: origResult.kind });
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
                    allUnresolved.add(typeName);
                    continue;
                }

                allResolved.set(typeName, { packageName, type: result.graphed, kind: result.kind });

                // Use AST-based type traversal to discover sub-dependencies
                const subRefs = new Set<ResolvedTypeRef>();
                try {
                    const declType = getTypeFromDeclaration(result.declaration);
                    if (declType) {
                        collectTypeRefsFromType(declType, ctx, subRefs);
                    }
                    // For classes/interfaces, also traverse members' types
                    const decl = result.declaration;
                    if (Node.isClassDeclaration(decl) || Node.isInterfaceDeclaration(decl)) {
                        // Also traverse heritage clauses (implements/extends) to discover
                        // base types that getBaseTypes() on the class type might miss
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
                                // Also collect from TypeNodes to catch simple type aliases
                                // that TypeScript resolves away (e.g., type X = Y)
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
                                // Collect from return type node
                                if (Node.isMethodSignature(member) || Node.isMethodDeclaration(member)) {
                                    const retTypeNode = member.getReturnTypeNode();
                                    if (retTypeNode) collectTypeRefsFromTypeNode(retTypeNode, ctx, subRefs);
                                }
                            } catch (e) { ctx.warn("DEP_MEMBER_TRAVERSE", `Failed for member of '${typeName}': ${e instanceof Error ? e.message : String(e)}`, typeName); }
                        }
                    }
                    // For type aliases, also traverse the underlying type's structure
                    if (Node.isTypeAliasDeclaration(result.declaration)) {
                        const typeNode = result.declaration.getTypeNode();
                        if (typeNode) {
                            const resolvedType = typeNode.getType();
                            if (resolvedType) collectTypeRefsFromType(resolvedType, ctx, subRefs);
                        }
                    }
                    // For functions, traverse parameter and return types for sub-dependencies
                    if (Node.isFunctionDeclaration(result.declaration)) {
                        for (const param of result.declaration.getParameters()) {
                            try {
                                const pType = param.getType();
                                if (pType) collectTypeRefsFromType(pType, ctx, subRefs);
                                const pTypeNode = param.getTypeNode();
                                if (pTypeNode) collectTypeRefsFromTypeNode(pTypeNode, ctx, subRefs);
                            } catch (e) { ctx.warn("DEP_FUNC_PARAM_TRAVERSE", `Failed for param of '${typeName}': ${e instanceof Error ? e.message : String(e)}`, typeName); }
                        }
                        const retType = getReturnTypeFromDeclaration(result.declaration);
                        if (retType) collectTypeRefsFromType(retType, ctx, subRefs);
                        const retTypeNode = result.declaration.getReturnTypeNode();
                        if (retTypeNode) collectTypeRefsFromTypeNode(retTypeNode, ctx, subRefs);
                    }
                } catch (e) { ctx.warn("DEP_TYPE_TRAVERSE", `Failed for '${typeName}': ${e instanceof Error ? e.message : String(e)}`, typeName); }

                // Queue discovered sub-refs for resolution
                for (const subRef of subRefs) {
                    // Track alias relationships from sub-deps
                    if (subRef.originalName && subRef.originalName !== subRef.name) {
                        typeAliasMap.set(subRef.name, subRef.originalName);
                    }
                    if (!subRef.packageName) continue;
                    if (isNodePackage(subRef.packageName)) continue;
                    if (definedTypes.has(subRef.name)) continue;
                    if (processed.has(subRef.name)) continue;
                    if (allResolved.has(subRef.name)) continue;

                    // Register in import resolution map for resolution
                    if (!importResolutionMap.has(subRef.name)) {
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
                            importResolutionMap.set(subRef.name, { packageName: subRef.packageName, resolvedFile });
                            if (!packageToFile.has(subRef.packageName)) {
                                packageToFile.set(subRef.packageName, resolvedFile);
                            }
                        }
                    }

                    if (!newPending.has(subRef.packageName)) newPending.set(subRef.packageName, new Set());
                    newPending.get(subRef.packageName)!.add(subRef.name);
                }
            }
        }

        pendingTypes = newPending;
    }


    // Build dependency info grouped by package
    const depByPackage = new Map<string, DependencyInfo>();
    for (const [typeName, { packageName, type, kind }] of allResolved) {
        if (!depByPackage.has(packageName)) {
            depByPackage.set(packageName, { package: packageName, isNode: isNodePackage(packageName) || undefined });
        }
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
        }
    }

    // Add Node.js dependencies as simple type-name references (no extraction).
    // These are emitted as import statements, not declare module blocks.
    // Use the original node:* module paths (e.g., node:buffer, node:stream, node:events)
    // determined from the declaration file paths in @types/node.
    //
    // Build a lookup: type name → specific node:* module from declaration paths.
    // Also track which types are actual classes/interfaces (importable) vs internal
    // utility type aliases (DefaultEventMap, EventMap, etc.) that shouldn't be imported.
    const nodeTypeToModule = new Map<string, string>();
    const nodeImportableTypes = new Set<string>();
    for (const ref of externalRefs) {
        if (!ref.packageName || !isNodePackage(ref.packageName)) continue;
        if (ref.declarationPath) {
            // Extract module name from @types/node declaration file path
            // e.g., ".../node_modules/@types/node/events.d.ts" → "node:events"
            //        ".../node_modules/@types/node/stream.d.ts" → "node:stream"
            //        ".../node_modules/@types/node/buffer.buffer.d.ts" → "node:buffer"
            const match = ref.declarationPath.match(/@types\/node\/([^.]+)/);
            if (match) {
                const moduleName = match[1];
                // globals.d.ts has ambient types without a specific module —
                // they're available via /// <reference types="node" />, skip them.
                if (moduleName === "globals") continue;
                nodeTypeToModule.set(ref.name, `node:${moduleName}`);
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
    for (const typeName of allUnresolved) {
        // Find which package it was supposed to come from
        let pkg: string | undefined;
        for (const ref of externalRefs) {
            if (ref.name === typeName && ref.packageName) { pkg = ref.packageName; break; }
        }
        if (!pkg) {
            const res = importResolutionMap.get(typeName);
            if (res) pkg = res.packageName;
        }
        if (pkg) {
            if (isNodeBuiltinModule(pkg)) continue;
            if (isNodePackage(pkg)) continue;
            if (!depByPackage.has(pkg)) {
                depByPackage.set(pkg, { package: pkg, isNode: isNodePackage(pkg) || undefined });
            }
            (depByPackage.get(pkg)!.types ??= []).push({ name: typeName, type: "unresolved" } as TypeAliasInfo);
        }
    }

    // Populate export conditions from each dependency's package.json
    for (const [, depInfo] of depByPackage) {
        if (depInfo.isNode) continue;
        const conditions = getPackageExportConditions(rootPath, depInfo.package);
        if (conditions && conditions.length > 0) {
            depInfo.conditions = conditions;
        }
    }

    return Array.from(depByPackage.values()).sort((a, b) => a.package.localeCompare(b.package));
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

    // Check file-level exported declarations
    try {
        const exported = sf.getExportedDeclarations();
        const decls = exported.get(typeName);
        if (decls) {
            for (const decl of decls) {
                if (Node.isClassDeclaration(decl) || Node.isInterfaceDeclaration(decl)) {
                    return true;
                }
            }
        }
    } catch { /* benign */ }

    // Check ambient module declarations (e.g., `declare module "buffer" { ... }`)
    try {
        for (const mod of sf.getModules()) {
            const exported = mod.getExportedDeclarations();
            const decls = exported.get(typeName);
            if (decls) {
                for (const decl of decls) {
                    if (Node.isClassDeclaration(decl) || Node.isInterfaceDeclaration(decl)) {
                        return true;
                    }
                }
            }
        }
    } catch { /* benign */ }

    return false;
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
 */
export function findPackageInNodeModules(startDir: string, packageName: string): boolean {
    let current = path.resolve(startDir);
    const root = path.parse(current).root;
    while (true) {
        const candidate = path.join(current, "node_modules", packageName);
        if (fs.existsSync(candidate)) return true;
        const parent = path.dirname(current);
        if (parent === current || current === root) break;
        current = parent;
    }
    return false;
}

/**
 * Reads the export conditions from a dependency's package.json.
 * Looks at the "." entry in the "exports" field and returns the condition keys
 * (e.g. ["browser", "import", "require"]), filtering out meta-keys like
 * "react-native" and "types".
 */
export function getPackageExportConditions(startDir: string, packageName: string): string[] | undefined {
    let current = path.resolve(startDir);
    const root = path.parse(current).root;
    while (true) {
        const pkgJsonPath = path.join(current, "node_modules", packageName, "package.json");
        if (fs.existsSync(pkgJsonPath)) {
            try {
                const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, "utf-8"));
                const exports = pkgJson.exports;
                if (exports && typeof exports === "object" && exports["."] && typeof exports["."] === "object") {
                    const dotExport = exports["."];
                    // Filter to runtime conditions, excluding metadata keys
                    const skipKeys = new Set(["types", "react-native", "default"]);
                    const conditions = Object.keys(dotExport).filter(k => !skipKeys.has(k));
                    return conditions.length > 0 ? conditions : undefined;
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
 */
export function getPackageConditionTypePaths(startDir: string, packageName: string): Map<string, string> | undefined {
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

                if (exportsObj && typeof exportsObj === "object" && exportsObj["."] && typeof exportsObj["."] === "object") {
                    const dotExport = exportsObj["."];
                    // Skip metadata-only conditions
                    const skipKeys = new Set(["types", "react-native"]);

                    for (const [condition, value] of Object.entries(dotExport)) {
                        if (skipKeys.has(condition)) continue;
                        const typesPath = resolveTypesPathFromCondition(value);
                        if (typesPath) {
                            const absPath = path.resolve(pkgDir, typesPath);
                            if (fs.existsSync(absPath)) {
                                result.set(condition, absPath);
                            }
                        }
                    }
                }

                // If no "default" entry, use the top-level "types" field
                if (!result.has("default") && pkgJson.types) {
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

/** Extract the .d.ts types path from a condition value in package.json exports. */
export function resolveTypesPathFromCondition(value: unknown): string | undefined {
    if (typeof value === "string") {
        // Direct string — only if it's a .d.ts
        return /\.d\.[mc]?ts$/.test(value) ? value : undefined;
    }
    if (typeof value === "object" && value !== null) {
        const obj = value as Record<string, unknown>;
        if ("types" in obj) {
            const types = obj.types;
            if (typeof types === "string") return types;
            // Nested: { types: { import: "...", require: "..." } }
            if (typeof types === "object" && types !== null) {
                const nested = types as Record<string, unknown>;
                for (const key of ["import", "require", "default"]) {
                    if (typeof nested[key] === "string") return nested[key] as string;
                }
                // Take first string value
                for (const v of Object.values(nested)) {
                    if (typeof v === "string") return v as string;
                }
            }
        }
    }
    return undefined;
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
            + (dep.functions?.length ?? 0) > 0;
        if (!hasContent) continue;

        const conditionPaths = getPackageConditionTypePaths(rootPath, dep.package);

        if (!conditionPaths || conditionPaths.size === 0) {
            // No conditional exports — single unconditioned module with all types
            result.push({
                package: dep.package,
                modules: [{
                    name: dep.package,
                    classes: dep.classes,
                    interfaces: dep.interfaces,
                    enums: dep.enums,
                    types: dep.types?.filter(t => t.type !== "unresolved"),
                    functions: dep.functions,
                }]
            });
            continue;
        }

        const modules: ModuleInfo[] = [];

        for (const [condition, typesPath] of conditionPaths) {
            const exportedNames = getExportedTypeNamesFromFile(typesPath, ctx.project);
            if (exportedNames.size === 0) continue;

            const classes = (dep.classes ?? []).filter(c => exportedNames.has(c.name));
            const interfaces = (dep.interfaces ?? []).filter(i => exportedNames.has(i.name));
            const enums = (dep.enums ?? []).filter(e => exportedNames.has(e.name));
            // For type aliases, also include synthetic aliases (e.g. ProxyOptions = ProxySettings)
            // whose target type IS an exported name, even though the alias itself isn't exported.
            const types = (dep.types ?? []).filter(t =>
                t.type !== "unresolved" && (exportedNames.has(t.name) || exportedNames.has(t.type)));
            const functions = (dep.functions ?? []).filter(f => f.name && exportedNames.has(f.name));

            if (classes.length + interfaces.length + enums.length + types.length + functions.length === 0) continue;

            // "default" condition maps to undefined (null in C#), which the
            // formatter treats as the fallback condition.
            const conditionValue = condition === "default" ? undefined : condition;

            modules.push({
                name: dep.package,
                condition: conditionValue,
                classes: classes.length > 0 ? classes : undefined,
                interfaces: interfaces.length > 0 ? interfaces : undefined,
                enums: enums.length > 0 ? enums : undefined,
                types: types.length > 0 ? types : undefined,
                functions: functions.length > 0 ? functions : undefined,
            });
        }

        if (modules.length > 0) {
            result.push({
                package: dep.package,
                modules,
            });
        }
    }

    return result;
}

