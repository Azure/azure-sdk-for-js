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
    MethodDeclaration,
    PropertyDeclaration,
    ConstructorDeclaration,
    ParameterDeclaration,
    IndexSignatureDeclaration,
    Node,
    Type,
    TypeNode,
    Symbol as TsSymbol,
    ts,
} from "ts-morph";
import * as fs from "fs";
import * as path from "path";
import type { ResolvedTypeRef } from "./models.js";
import { ExtractionContext, PRIMITIVE_TYPES, isDefaultLibFile } from "./context.js";
import { isNodeBuiltinModule } from "./node-builtins.js";
import {
    getTypeFromDeclaration,
    getParametersFromDeclaration,
    getReturnTypeFromDeclaration,
} from "./extractors.js";

/**
 * Collects external type references from a Type object using proper AST traversal.
 * This recursively resolves generic type arguments, union/intersection members, etc.
 *
 * @param type The Type object to analyze
 * @param ctx The extraction context for this run
 * @param refs Set to collect resolved type references
 * @param visited Set of already visited type IDs to prevent infinite recursion
 */
export function collectTypeRefsFromType(
    type: Type,
    ctx: ExtractionContext,
    refs: Set<ResolvedTypeRef>,
): void {
    if (!type) return;

    // Wrap in try-catch to handle malformed declarations that can throw in ts-morph
    try {
        // Use the collector's shared visited set for cross-call deduplication.
        const visited = ctx.typeRefs.typeVisited;

        // Use the compiler's internal type object identity to detect cycles.
        // Unlike getText()-based keys, object identity has zero collisions
        // and cannot conflate structurally similar but distinct types.
        const compilerType = type.compilerType;
        if (visited.has(compilerType)) return;
        visited.add(compilerType);

        // Get the underlying TypeScript type
        const tsType = type.compilerType;

        // Skip primitive types
        if (tsType.flags & (
            ts.TypeFlags.String | ts.TypeFlags.Number | ts.TypeFlags.Boolean |
            ts.TypeFlags.Void | ts.TypeFlags.Undefined | ts.TypeFlags.Null |
            ts.TypeFlags.Never | ts.TypeFlags.Any | ts.TypeFlags.Unknown |
            ts.TypeFlags.BigInt | ts.TypeFlags.ESSymbol
        )) {
            return;
        }

        // Check for type alias symbols BEFORE union/intersection handling.
        // Type aliases like `HttpMethods = "GET" | "PUT" | ...` are resolved
        // by TypeScript to their underlying union type, erasing the alias.
        // We need to capture the alias as a type reference before recursing.
        const aliasSymbol = type.getAliasSymbol();
        if (aliasSymbol) {
            const aliasName = aliasSymbol.getName();
            if (aliasName && aliasName !== "__type" && aliasName !== "__object" &&
                !PRIMITIVE_TYPES.has(aliasName) && !ctx.isBuiltinType(aliasName)) {
                const aliasDecls = aliasSymbol.getDeclarations();
                if (aliasDecls && aliasDecls.length > 0) {
                    const aliasDecl = aliasDecls[0];
                    if (Node.isTypeAliasDeclaration(aliasDecl)) {
                        const sf = aliasDecl.getSourceFile();
                        if (!isDefaultLibFile(ctx.project, sf)) {
                            const fp = sf.getFilePath();
                            refs.add({
                                name: aliasName,
                                fullName: aliasSymbol.getFullyQualifiedName?.() ?? aliasName,
                                declarationPath: fp,
                                packageName: resolvePackageNameFromPath(fp, ctx),
                            });
                        }
                    }
                }
            }
        }

        // Handle union types
        if (type.isUnion()) {
            for (const unionType of type.getUnionTypes()) {
                collectTypeRefsFromType(unionType, ctx, refs);
            }
            return;
        }

        // Handle intersection types
        if (type.isIntersection()) {
            for (const intersectionType of type.getIntersectionTypes()) {
                collectTypeRefsFromType(intersectionType, ctx, refs);
            }
            return;
        }

        // Handle array types
        if (type.isArray()) {
            const elementType = type.getArrayElementType();
            if (elementType) {
                collectTypeRefsFromType(elementType, ctx, refs);
            }
            return;
        }

        // Handle tuple types
        if (type.isTuple()) {
            for (const tupleElement of type.getTupleElements()) {
                collectTypeRefsFromType(tupleElement, ctx, refs);
            }
            return;
        }

        // Get the symbol for the type
        const symbol = type.getSymbol() || type.getAliasSymbol();
        if (!symbol) {
            // No symbol — still recurse into call signatures for function types
            // e.g. `(options: Foo) => Bar`
            for (const sig of type.getCallSignatures()) {
                try {
                    for (const param of sig.getParameters()) {
                        const paramDecls = param.getDeclarations();
                        if (paramDecls.length > 0) {
                            const paramType = getTypeFromDeclaration(paramDecls[0]);
                            if (paramType) collectTypeRefsFromType(paramType, ctx, refs);
                        }
                    }
                    collectTypeRefsFromType(sig.getReturnType(), ctx, refs);
                } catch (e) { ctx.warn("TYPE_TRAVERSE", e instanceof Error ? e.message : String(e)); }
            }
            return;
        }

        // Get the type name
        const typeName = symbol.getName();

        // Skip primitives and builtins — but still process type arguments
        // for generic builtins like Promise<T>, Map<K,V>, Array<T>, etc.
        if (!typeName || PRIMITIVE_TYPES.has(typeName) || ctx.isBuiltinType(typeName)) {
            const typeArgs = type.getTypeArguments();
            for (const typeArg of typeArgs) {
                collectTypeRefsFromType(typeArg, ctx, refs);
            }
            return;
        }

        // For anonymous/inline object types, recurse into their properties,
        // call signatures, and index signatures so we discover named type
        // references within them
        // (e.g. `{ tracingContext?: TracingContext }` → discovers TracingContext)
        // (e.g. `{ [key: string]: FormDataValue }` → discovers FormDataValue)
        if (typeName === "__type" || typeName === "__object") {
            for (const prop of type.getProperties()) {
                try {
                    const propDecls = prop.getDeclarations();
                    if (propDecls.length > 0) {
                        const propType = getTypeFromDeclaration(propDecls[0]);
                        if (propType) collectTypeRefsFromType(propType, ctx, refs);
                    }
                } catch (e) { ctx.warn("TYPE_TRAVERSE", e instanceof Error ? e.message : String(e)); }
            }
            for (const sig of type.getCallSignatures()) {
                try {
                    for (const param of sig.getParameters()) {
                        const paramDecls = param.getDeclarations();
                        if (paramDecls.length > 0) {
                            const paramType = getTypeFromDeclaration(paramDecls[0]);
                            if (paramType) collectTypeRefsFromType(paramType, ctx, refs);
                        }
                    }
                    collectTypeRefsFromType(sig.getReturnType(), ctx, refs);
                } catch (e) { ctx.warn("TYPE_TRAVERSE", e instanceof Error ? e.message : String(e)); }
            }
            // Traverse index signature value types (e.g. { [key: string]: FormDataValue })
            try {
                const stringIndexType = type.getStringIndexType();
                if (stringIndexType) collectTypeRefsFromType(stringIndexType, ctx, refs);
            } catch (e) { ctx.warn("TYPE_TRAVERSE", e instanceof Error ? e.message : String(e)); }
            try {
                const numberIndexType = type.getNumberIndexType();
                if (numberIndexType) collectTypeRefsFromType(numberIndexType, ctx, refs);
            } catch (e) { ctx.warn("TYPE_TRAVERSE", e instanceof Error ? e.message : String(e)); }
            return;
        }

        // Get the declaration to find source file
        const declarations = symbol.getDeclarations();
        if (!declarations || declarations.length === 0) return;

        const declaration = declarations[0];

        // Only track type-level declarations (class, interface, enum, type alias).
        // Method/property/function declarations are NOT types — but we still
        // recurse into their parameter and return types below.
        const isTypeDeclaration =
            Node.isClassDeclaration(declaration) ||
            Node.isInterfaceDeclaration(declaration) ||
            Node.isEnumDeclaration(declaration) ||
            Node.isTypeAliasDeclaration(declaration);

        if (!isTypeDeclaration) {
            // For method/function-like declarations, recurse into param & return types
            const params = getParametersFromDeclaration(declaration);
            for (const p of params) {
                try {
                    const pType = p.getType();
                    if (pType) collectTypeRefsFromType(pType, ctx, refs);
                } catch (e) { ctx.warn("TYPE_TRAVERSE", e instanceof Error ? e.message : String(e)); }
            }
            const retType = getReturnTypeFromDeclaration(declaration);
            if (retType) collectTypeRefsFromType(retType, ctx, refs);
            // For non-function-like declarations (properties, variables) where
            // getParametersFromDeclaration and getReturnTypeFromDeclaration both
            // return nothing, traverse the declaration's own type so references
            // in `typeof someVariable` or property types are not silently dropped.
            if (params.length === 0 && !retType) {
                const declType = getTypeFromDeclaration(declaration);
                if (declType) collectTypeRefsFromType(declType, ctx, refs);
            }
            return;
        }

        const sourceFile = declaration.getSourceFile();
        const filePath = sourceFile.getFilePath();

        // Check if this is from TypeScript's default library
        if (isDefaultLibFile(ctx.project, sourceFile)) {
            // Still process type arguments for generic builtins (e.g. Promise<T>)
            const typeArgs = type.getTypeArguments();
            for (const typeArg of typeArgs) {
                collectTypeRefsFromType(typeArg, ctx, refs);
            }
            return;
        }

        // Determine the package name from the source file path
        const packageName = resolvePackageNameFromPath(filePath, ctx);

        // Add the resolved reference
        refs.add({
            name: typeName,
            fullName: symbol.getFullyQualifiedName?.() ?? typeName,
            declarationPath: filePath,
            packageName,
        });

        // Recursively process generic type arguments
        const typeArgs = type.getTypeArguments();
        for (const typeArg of typeArgs) {
            collectTypeRefsFromType(typeArg, ctx, refs);
        }

        // Process base types for classes/interfaces
        const baseTypes = type.getBaseTypes();
        for (const baseType of baseTypes) {
            collectTypeRefsFromType(baseType, ctx, refs);
        }

        // Process PUBLIC members (properties, methods, call/construct/index signatures)
        // of named class/interface types to discover type references within
        // their declarations (e.g., method parameter and return types).
        // This ensures transitive dependency resolution discovers types like
        // WebResource, HttpOperationResponse, ProxyOptions, etc. that appear
        // in member signatures of dep types.
        //
        // IMPORTANT: Skip private and protected members — they are implementation
        // details and should not contribute to the public API type reference graph.
        // Without this filter, protected members like StorageClient.storageClientContext
        // leak generated operation interfaces (e.g. Blob, Container) and their
        // transitive types (e.g. BlobDownloadResponse) into referencedTypes.
        for (const prop of type.getProperties()) {
            try {
                const propDecls = prop.getDeclarations();
                if (propDecls.length > 0) {
                    const decl = propDecls[0];
                    // Check for private/protected access modifiers on the declaration.
                    // Interface members are always public (no modifiers), so this
                    // only filters class members with explicit private/protected scope.
                    const modFlags = ts.getCombinedModifierFlags(decl.compilerNode as ts.Declaration);
                    if (modFlags & (ts.ModifierFlags.Private | ts.ModifierFlags.Protected)) {
                        continue;
                    }
                    // Also skip ECMAScript private fields (e.g. #field) which use
                    // NamedDeclaration with a PrivateIdentifier name.
                    const name = prop.getName();
                    if (name.startsWith("#")) {
                        continue;
                    }
                    const propType = getTypeFromDeclaration(decl);
                    if (propType) collectTypeRefsFromType(propType, ctx, refs);
                }
            } catch (e) { ctx.warn("TYPE_TRAVERSE", e instanceof Error ? e.message : String(e)); }
        }

        // Process call signatures (for callable interfaces/types)
        for (const sig of type.getCallSignatures()) {
            try {
                for (const param of sig.getParameters()) {
                    const paramDecls = param.getDeclarations();
                    if (paramDecls.length > 0) {
                        const paramType = getTypeFromDeclaration(paramDecls[0]);
                        if (paramType) collectTypeRefsFromType(paramType, ctx, refs);
                    }
                }
                collectTypeRefsFromType(sig.getReturnType(), ctx, refs);
            } catch (e) { ctx.warn("TYPE_TRAVERSE", e instanceof Error ? e.message : String(e)); }
        }

        // Process construct signatures
        for (const sig of type.getConstructSignatures()) {
            try {
                for (const param of sig.getParameters()) {
                    const paramDecls = param.getDeclarations();
                    if (paramDecls.length > 0) {
                        const paramType = getTypeFromDeclaration(paramDecls[0]);
                        if (paramType) collectTypeRefsFromType(paramType, ctx, refs);
                    }
                }
                collectTypeRefsFromType(sig.getReturnType(), ctx, refs);
            } catch (e) { ctx.warn("TYPE_TRAVERSE", e instanceof Error ? e.message : String(e)); }
        }
    } catch (e) {
        // Non-fatal — skip types that fail resolution (malformed declarations, circular refs, etc.)
        ctx.warn("TYPE_TRAVERSE", e instanceof Error ? e.message : String(e));
    }
}

/**
 * Resolves the package name from a source file path.
 * Handles node_modules paths, and falls back to walking up directories
 * to find the nearest package.json (for monorepo symlink-resolved paths).
 */
export function resolvePackageNameFromPath(filePath: string, ctx: ExtractionContext): string | undefined {
    // Check if it's in node_modules
    const nodeModulesIndex = filePath.lastIndexOf("node_modules");
    if (nodeModulesIndex !== -1) {
        // Extract the package path after node_modules
        const afterNodeModules = filePath.substring(nodeModulesIndex + "node_modules".length + 1);

        // Handle scoped packages (@org/package)
        if (afterNodeModules.startsWith("@")) {
            const parts = afterNodeModules.split(/[/\\]/);
            if (parts.length >= 2) {
                return `${parts[0]}/${parts[1]}`;
            }
        } else {
            // Regular package
            const parts = afterNodeModules.split(/[/\\]/);
            if (parts.length >= 1) {
                return parts[0];
            }
        }
        return undefined;
    }

    // No node_modules in the path — walk up directories to find package.json
    // This handles monorepo setups where symlinks resolve to real paths
    return ctx.resolvePackageNameFromAncestorPkgJson(filePath);
}

/**
 * Collects type references from a TypeNode AST annotation.
 * This catches type aliases that TypeScript resolves away at the type level.
 * For example, `type OperationRequest = PipelineRequest` — the resolved type is
 * PipelineRequest, but the source annotation says OperationRequest. The
 * `getAliasSymbol()` approach in `collectTypeRefsFromType` only works for
 * complex aliases (union, intersection, generic); simple direct aliases are
 * fully erased by the type checker. Walking the TypeNode AST captures them.
 */
export function collectTypeRefsFromTypeNode(
    node: Node,
    ctx: ExtractionContext,
    refs: Set<ResolvedTypeRef>,
): void {
    try {
        // TypeReference nodes: `Foo`, `Promise<Bar>`, `Map<K, V>`
        if (Node.isTypeReference(node)) {
            const typeName = node.getTypeName();
            const name = Node.isQualifiedName(typeName)
                ? typeName.getRight().getText()
                : typeName.getText();

            if (!PRIMITIVE_TYPES.has(name) && !ctx.isBuiltinType(name)) {
                try {
                    const symbol = typeName.getSymbol();
                    if (symbol) {
                        const decls = symbol.getDeclarations();
                        if (decls && decls.length > 0) {
                            const decl = decls[0];
                            if (
                                Node.isTypeAliasDeclaration(decl) ||
                                Node.isClassDeclaration(decl) ||
                                Node.isInterfaceDeclaration(decl) ||
                                Node.isEnumDeclaration(decl)
                            ) {
                                const sf = decl.getSourceFile();
                                if (!isDefaultLibFile(ctx.project, sf)) {
                                    const fp = sf.getFilePath();
                                    refs.add({
                                        name,
                                        fullName: symbol.getFullyQualifiedName?.() ?? name,
                                        declarationPath: fp,
                                        packageName: resolvePackageNameFromPath(fp, ctx),
                                    });
                                }
                            } else if (Node.isImportSpecifier(decl) || Node.isExportSpecifier(decl)) {
                                // Handle import/export specifiers: follow alias chain to the original declaration.
                                // For `import { ProxySettings as ProxyOptions } from "..."`, name = "ProxyOptions"
                                // and we need to find the original "ProxySettings" declaration.
                                // Similarly for `export { X as Y } from "..."`.
                                try {
                                    const aliasedSymbol = symbol.getAliasedSymbol();
                                    const targetSymbol = aliasedSymbol ?? symbol;
                                    const targetDecls = targetSymbol.getDeclarations();
                                    if (targetDecls && targetDecls.length > 0) {
                                        const targetDecl = targetDecls[0];
                                        if (
                                            Node.isTypeAliasDeclaration(targetDecl) ||
                                            Node.isClassDeclaration(targetDecl) ||
                                            Node.isInterfaceDeclaration(targetDecl) ||
                                            Node.isEnumDeclaration(targetDecl)
                                        ) {
                                            const sf = targetDecl.getSourceFile();
                                            if (!isDefaultLibFile(ctx.project, sf)) {
                                                const fp = sf.getFilePath();
                                                const resolvedName = aliasedSymbol?.getName();
                                                refs.add({
                                                    name,
                                                    originalName: resolvedName && resolvedName !== name ? resolvedName : undefined,
                                                    fullName: targetSymbol.getFullyQualifiedName?.() ?? name,
                                                    declarationPath: fp,
                                                    packageName: resolvePackageNameFromPath(fp, ctx),
                                                });
                                            }
                                        }
                                    }
                                } catch { /* non-fatal */ }
                            }
                        }
                    }
                } catch (e) { ctx.warn("TYPE_RESOLVE", `Unresolvable symbol '${name}': ${e instanceof Error ? e.message : String(e)}`, name); }
            }

            // Recurse into type arguments: Promise<Foo> → visit Foo
            for (const typeArg of node.getTypeArguments()) {
                collectTypeRefsFromTypeNode(typeArg, ctx, refs);
            }
            return;
        }

        // ExpressionWithTypeArguments nodes appear in heritage clauses
        // (e.g., `extends Foo`, `implements Bar<T>`). The expression is
        // typically an Identifier, not a TypeName, so the TypeReference
        // handler above doesn't catch it.
        if (Node.isExpressionWithTypeArguments(node)) {
            const expr = node.getExpression();
            const name = expr.getText();
            // Skip namespace-qualified names (e.g., coreClient.OperationOptions) —
            // these are handled by the normal type resolution via collectFromType.
            if (!name.includes(".") && !PRIMITIVE_TYPES.has(name) && !ctx.isBuiltinType(name)) {
                try {
                    const symbol = expr.getSymbol();
                    if (symbol) {
                        const decls = symbol.getDeclarations();
                        if (decls && decls.length > 0) {
                            const decl = decls[0];
                            if (
                                Node.isImportSpecifier(decl) ||
                                Node.isExportSpecifier(decl)
                            ) {
                                // Follow alias chain to original declaration
                                const aliasedSymbol = symbol.getAliasedSymbol();
                                const targetSymbol = aliasedSymbol ?? symbol;
                                const targetDecls = targetSymbol.getDeclarations();
                                if (targetDecls && targetDecls.length > 0) {
                                    const targetDecl = targetDecls[0];
                                    if (
                                        Node.isTypeAliasDeclaration(targetDecl) ||
                                        Node.isClassDeclaration(targetDecl) ||
                                        Node.isInterfaceDeclaration(targetDecl) ||
                                        Node.isEnumDeclaration(targetDecl)
                                    ) {
                                        const sf = targetDecl.getSourceFile();
                                        if (!isDefaultLibFile(ctx.project, sf)) {
                                            const fp = sf.getFilePath();
                                            const resolvedName = aliasedSymbol?.getName();
                                            const pkg = resolvePackageNameFromPath(fp, ctx);
                                            refs.add({
                                                name,
                                                originalName: resolvedName && resolvedName !== name ? resolvedName : undefined,
                                                fullName: targetSymbol.getFullyQualifiedName?.() ?? name,
                                                declarationPath: fp,
                                                packageName: pkg,
                                            });
                                        }
                                    }
                                }
                            } else if (
                                Node.isTypeAliasDeclaration(decl) ||
                                Node.isClassDeclaration(decl) ||
                                Node.isInterfaceDeclaration(decl) ||
                                Node.isEnumDeclaration(decl)
                            ) {
                                const sf = decl.getSourceFile();
                                if (!isDefaultLibFile(ctx.project, sf)) {
                                    const fp = sf.getFilePath();
                                    refs.add({
                                        name,
                                        fullName: symbol.getFullyQualifiedName?.() ?? name,
                                        declarationPath: fp,
                                        packageName: resolvePackageNameFromPath(fp, ctx),
                                    });
                                }
                            }
                        }
                    }
                } catch { /* non-fatal */ }
            }

            // Recurse into type arguments
            for (const typeArg of node.getTypeArguments()) {
                collectTypeRefsFromTypeNode(typeArg, ctx, refs);
            }
            return;
        }

        // For compound type nodes (union, intersection, tuple, array, function, etc.)
        // recurse into all child nodes
        for (const child of node.forEachChildAsArray()) {
            collectTypeRefsFromTypeNode(child, ctx, refs);
        }
    } catch (e) { ctx.warn("TYPE_NODE_TRAVERSE", e instanceof Error ? e.message : String(e)); }
}

/**
 * Collector for type references during engine run.
 * Accumulates all external type references found in the API surface.
 * Tracks both resolved (via ts-morph type system) and unresolved
 * (via import declarations) type references.
 */
export class TypeReferenceCollector {
    private refs = new Map<string, ResolvedTypeRef>();
    private readonly ctx: ExtractionContext;
    private definedTypes = new Set<string>();
    private importedTypes = new Map<string, string>(); // typeName -> packageName
    private namespaceImports = new Set<string>(); // namespace import aliases (import * as X)
    private _visited = new WeakSet<object>();

    /** Shared visited-types set for preventing redundant type traversals. */
    get typeVisited(): WeakSet<object> { return this._visited; }

    /** Resets the visited set (for use between extraction phases). */
    resetVisited(): void { this._visited = new WeakSet<object>(); }

    /** Check if a name was imported as a namespace (import * as X). */
    hasNamespaceImport(name: string): boolean {
        return this.namespaceImports.has(name);
    }
    private contextStack: string[] = []; // stack of enclosing type names
    private refsByContext = new Map<string, Map<string, ResolvedTypeRef>>(); // context -> deduped refs

    private static refKey(ref: ResolvedTypeRef): string {
        return `${ref.name}|${ref.packageName || ''}`;
    }

    constructor(ctx: ExtractionContext) {
        this.ctx = ctx;
    }

    addDefinedType(name: string): void {
        // Entity names from getName() never include generic parameters.
        this.definedTypes.add(name);
    }

    /** Push a context (enclosing type name) before extracting a class/interface/etc. */
    pushContext(typeName: string): void {
        this.contextStack.push(typeName);
    }

    /** Pop the context after extracting a class/interface/etc. */
    popContext(): void {
        this.contextStack.pop();
    }

    private currentContext(): string | null {
        return this.contextStack.length > 0 ? this.contextStack[this.contextStack.length - 1] : null;
    }

    collectFromType(type: Type): void {
        try {
            const newRefs = new Set<ResolvedTypeRef>();
            collectTypeRefsFromType(type, this.ctx, newRefs);
            const contextName = this.currentContext();
            for (const ref of newRefs) {
                const key = TypeReferenceCollector.refKey(ref);
                this.refs.set(key, ref);
                if (contextName) {
                    if (!this.refsByContext.has(contextName)) this.refsByContext.set(contextName, new Map());
                    this.refsByContext.get(contextName)!.set(key, ref);
                }
            }
        } catch (e) {
            // Non-fatal — skip types that fail resolution
            this.ctx.warn("TYPE_COLLECT", e instanceof Error ? e.message : String(e));
        }
    }

    /**
     * Collect type references from a TypeNode AST annotation.
     * Catches type aliases that TypeScript resolves away at the type level
     * (e.g., `type OperationRequest = PipelineRequest`).
     */
    collectFromTypeNode(typeNode: Node): void {
        try {
            const newRefs = new Set<ResolvedTypeRef>();
            collectTypeRefsFromTypeNode(typeNode, this.ctx, newRefs);
            const contextName = this.currentContext();
            for (const ref of newRefs) {
                const key = TypeReferenceCollector.refKey(ref);
                this.refs.set(key, ref);
                if (contextName) {
                    if (!this.refsByContext.has(contextName)) this.refsByContext.set(contextName, new Map());
                    this.refsByContext.get(contextName)!.set(key, ref);
                }
            }
        } catch (e) {
            // Non-fatal
            this.ctx.warn("TYPE_COLLECT", e instanceof Error ? e.message : String(e));
        }
    }

    /**
     * Collect import declarations from source files to build a map of
     * imported type names to their package names. This enables dependency
     * tracking even when packages are not installed (node_modules missing).
     */
    collectFromImportDeclarations(sourceFiles: SourceFile[]): void {
        for (const sf of sourceFiles) {
            for (const imp of sf.getImportDeclarations()) {
                const moduleSpecifier = imp.getModuleSpecifierValue();
                // Only external packages (not relative imports)
                if (moduleSpecifier.startsWith(".")) continue;

                // Default import
                const defaultImport = imp.getDefaultImport();
                if (defaultImport) {
                    // Default imports from Node.js built-in modules
                    // (e.g., `import childProcess from "node:child_process"`)
                    // are CJS module namespace objects via esModuleInterop, not types.
                    // Track them as namespace imports so they don't leak as false
                    // type references.
                    if (isNodeBuiltinModule(moduleSpecifier)) {
                        this.namespaceImports.add(defaultImport.getText());
                    } else {
                        this.importedTypes.set(defaultImport.getText(), moduleSpecifier);
                    }
                }

                // Named imports
                for (const named of imp.getNamedImports()) {
                    this.importedTypes.set(named.getName(), moduleSpecifier);
                }

                // Namespace import — track separately since these are module
                // namespace aliases (e.g. `import * as msal from "pkg"`), not types.
                // The compiler resolves qualified accesses like `msal.Foo` to the
                // actual type `Foo`, so the namespace alias itself should not
                // appear as an unresolved dependency type.
                const nsImport = imp.getNamespaceImport();
                if (nsImport) {
                    this.namespaceImports.add(nsImport.getText());
                }
            }
        }
    }

    /**
     * Get external type references, optionally scoped to types reachable
     * from the given set of type names. Uses compiler-resolved references
     * (via collectFromType) with import-declaration-based fallback for
     * types from uninstalled packages.
     */
    getExternalRefs(reachableTypes?: Set<string>): ResolvedTypeRef[] {
        // Build scoped refs based on reachable types
        let scopedRefs: Map<string, ResolvedTypeRef>;

        if (reachableTypes) {
            scopedRefs = new Map<string, ResolvedTypeRef>();
            for (const typeName of reachableTypes) {
                const contextRefs = this.refsByContext.get(typeName);
                if (contextRefs) {
                    for (const [key, ref] of contextRefs) {
                        scopedRefs.set(key, ref);
                    }
                }
            }
        } else {
            scopedRefs = this.refs;
        }

        // Filter out locally defined types and types without package info
        const resolved = Array.from(scopedRefs.values()).filter(ref =>
            !this.definedTypes.has(ref.name) &&
            ref.packageName !== undefined
        );

        // Import-declaration fallback: include types that were imported from
        // external packages but not resolved by ts-morph (e.g., uninstalled deps).
        // When scoped to reachable types, only include fallback types that appear
        // in at least one reachable entity's signatures (via refsByContext keys).
        const resolvedNames = new Set(resolved.map(r => r.name));
        const scopedContextNames = reachableTypes ?? null;
        for (const [typeName, packageName] of this.importedTypes) {
            if (resolvedNames.has(typeName)) continue;
            if (this.definedTypes.has(typeName)) continue;
            // Skip namespace import aliases — they are module objects, not types
            if (this.namespaceImports.has(typeName)) continue;
            // When scoped, only include fallback types referenced by reachable entities
            if (scopedContextNames) {
                let referencedByReachable = false;
                for (const ctxName of scopedContextNames) {
                    const ctxRefs = this.refsByContext.get(ctxName);
                    if (ctxRefs) {
                        for (const ref of ctxRefs.values()) {
                            if (ref.name === typeName) { referencedByReachable = true; break; }
                        }
                    }
                    if (referencedByReachable) break;
                }
                if (!referencedByReachable) continue;
            }

            resolved.push({
                name: typeName,
                fullName: typeName,
                declarationPath: "",
                packageName: packageName,
            });
        }

        return resolved;
    }

    /**
     * Returns per-entity type reference names.
     * Each entity (class, interface, function, type alias) context name maps
     * to the set of type names it references, extracted from compiler type resolution.
     */
    getContextRefNames(): Map<string, string[]> {
        const result = new Map<string, string[]>();
        for (const [ctx, refs] of this.refsByContext) {
            const names = new Set<string>();
            for (const ref of refs.values()) {
                names.add(ref.name);
            }
            result.set(ctx, Array.from(names));
        }
        return result;
    }

    clear(): void {
        this.refs.clear();
        this.definedTypes.clear();
        this.importedTypes.clear();
        this.contextStack.length = 0;
        this.refsByContext.clear();
    }

    /** Returns a read-only view of type → package mappings from import declarations. */
    getImportedPackages(): ReadonlyMap<string, string> {
        return this.importedTypes;
    }
}


/**
 * Creates a fully initialized ExtractionContext with its TypeReferenceCollector.
 * This factory breaks the circular construction dependency between the two classes.
 */
export function createExtractionContext(project: Project): ExtractionContext {
    const ctx = new ExtractionContext(project);
    ctx.typeRefs = new TypeReferenceCollector(ctx);
    return ctx;
}
