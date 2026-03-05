#!/usr/bin/env node
/**
 * Graph public API surface from TypeScript/JavaScript packages.
 * Uses ts-morph for proper TypeScript parsing.
 */

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
    JSDocableNode,
    Node,
    Type,
    TypeNode,
    Symbol as TsSymbol,
    ExportedDeclarations,
    ts,
} from "ts-morph";
import * as fs from "fs";
import * as path from "path";

// ============================================================================
// API Models - Strongly Typed
// ============================================================================

export interface MethodInfo {
    name: string;
    typeParams?: string;
    sig: string;
    params?: ParameterInfo[];
    ret?: string;
    doc?: string;
    async?: boolean;
    static?: boolean;
    deprecated?: boolean;
    deprecatedMsg?: string;
}

export interface PropertyInfo {
    name: string;
    type: string;
    readonly?: boolean;
    optional?: boolean;
    doc?: string;
    deprecated?: boolean;
    deprecatedMsg?: string;
}

export interface IndexSignatureInfo {
    keyName: string;
    keyType: string;
    valueType: string;
    readonly?: boolean;
}

export interface ConstructorInfo {
    sig: string;
    params?: ParameterInfo[];
    deprecated?: boolean;
    deprecatedMsg?: string;
}

export interface ParameterInfo {
    name: string;
    type: string;
    default?: string;
    optional?: boolean;
    rest?: boolean;
}

export interface ClassInfo {
    name: string;
    entryPoint?: boolean;
    exportPath?: string;  // The subpath to import from (e.g., "." or "./client")
    reExportedFrom?: string;  // External package this is re-exported from (e.g., "@example/core-client")
    extends?: string;
    implements?: string[];
    typeParams?: string;
    doc?: string;
    deprecated?: boolean;
    deprecatedMsg?: string;
    constructors?: ConstructorInfo[];
    methods?: MethodInfo[];
    properties?: PropertyInfo[];
    indexSignatures?: IndexSignatureInfo[];
    /** Type names referenced by this entity's API surface, populated from compiler type resolution. */
    referencedTypes?: string[];
}

export interface InterfaceInfo {
    name: string;
    entryPoint?: boolean;
    exportPath?: string;  // The subpath to import from (e.g., "." or "./client")
    reExportedFrom?: string;  // External package this is re-exported from
    extends?: string[];
    typeParams?: string;
    doc?: string;
    deprecated?: boolean;
    deprecatedMsg?: string;
    methods?: MethodInfo[];
    properties?: PropertyInfo[];
    indexSignatures?: IndexSignatureInfo[];
    /** Type names referenced by this entity's API surface, populated from compiler type resolution. */
    referencedTypes?: string[];
}

export interface EnumInfo {
    name: string;
    entryPoint?: boolean;
    exportPath?: string;
    reExportedFrom?: string;  // External package this is re-exported from
    doc?: string;
    values: string[];
    deprecated?: boolean;
    deprecatedMsg?: string;
}

export interface TypeAliasInfo {
    name: string;
    type: string;
    typeParams?: string;
    entryPoint?: boolean;
    exportPath?: string;
    reExportedFrom?: string;  // External package this is re-exported from
    doc?: string;
    deprecated?: boolean;
    deprecatedMsg?: string;
    /** Type names referenced by this entity's API surface, populated from compiler type resolution. */
    referencedTypes?: string[];
}

export interface FunctionInfo {
    name: string;
    typeParams?: string;
    entryPoint?: boolean;
    exportPath?: string;  // The subpath to import from (e.g., "." or "./client")
    reExportedFrom?: string;  // External package this is re-exported from
    sig: string;
    params?: ParameterInfo[];
    ret?: string;
    doc?: string;
    async?: boolean;
    deprecated?: boolean;
    deprecatedMsg?: string;
    /** Type names referenced by this entity's API surface, populated from compiler type resolution. */
    referencedTypes?: string[];
}

export interface ModuleInfo {
    name: string;
    condition?: string;
    /** Full chain of export conditions, e.g. ["import", "types"]. */
    conditionChain?: string[];
    exportPath?: string;
    /** If this module is from a dependency, the package name */
    fromPackage?: string;
    classes?: ClassInfo[];
    interfaces?: InterfaceInfo[];
    enums?: EnumInfo[];
    types?: TypeAliasInfo[];
    functions?: FunctionInfo[];
}

export interface ApiIndex {
    package: string;
    version?: string;
    modules: ModuleInfo[];
    /** Types from dependency packages that appear in the public API */
    dependencies?: DependencyInfo[];
    /** Fully resolved dependency packages with condition-aware modules */
    resolvedDependencies?: ApiIndex[];
}

/**
 * Information about types from a dependency package.
 */
export interface DependencyInfo {
    /** The npm package name */
    package: string;
    /** Whether this dependency is from the Node.js runtime (@types/node) */
    isNode?: boolean;
    /** Export conditions from the dependency's package.json (e.g. ["browser","import","require"]) */
    conditions?: string[];
    /** Types from this package that are referenced in the API */
    classes?: ClassInfo[];
    interfaces?: InterfaceInfo[];
    enums?: EnumInfo[];
    types?: TypeAliasInfo[];
    functions?: FunctionInfo[];
}

// ============================================================================
// Builtin Type Detection
// ============================================================================

/**
 * Checks if a source file is from TypeScript's default library (lib.*.d.ts)
 * using the compiler's own classification rather than path-based heuristics.
 */
function isDefaultLibFile(project: Project, sf: SourceFile): boolean {
    try {
        return project.getProgram().compilerObject.isSourceFileDefaultLibrary(sf.compilerNode);
    } catch {
        return false;
    }
}

/**
 * Primitive type names that are always builtins (not resolvable to declarations).
 */
const PRIMITIVE_TYPES = new Set([
    "string", "number", "boolean", "symbol", "bigint",
    "undefined", "null", "void", "never", "any", "unknown", "object",
]);


// ============================================================================
// Extraction Context — encapsulates all mutable state for a single extraction
// ============================================================================

/** Structured diagnostic emitted during extraction. */
interface ExtractionDiagnostic {
    readonly level: "info" | "warning" | "error";
    readonly code: string;
    readonly message: string;
    readonly typeName?: string;
}

/**
 * Namespace import aliases (e.g., 'coreClient' from `import * as coreClient from "@azure/core-client"`)
 * collected from source files during extraction. Used by stripImportPrefix to remove qualified
 * type references (coreClient.OperationOptions → OperationOptions) so stubs are self-contained.
 */
let _namespaceAliases: Set<string> = new Set();

/**
 * Encapsulates all mutable state needed during a single package extraction.
 * Creating a new context for each extraction prevents state leaking between
 * runs and makes the extraction lifecycle explicit.
 */
class ExtractionContext {
    /** The ts-morph Project used for this extraction. */
    readonly project: Project;
    /** Collector for external type references found during extraction. */
    readonly typeRefs: TypeReferenceCollector;
    /** Cache for package.json name lookups by directory. */
    readonly pkgNameCache: Map<string, string | undefined>;
    /** Structured diagnostics collected during extraction. */
    readonly diagnostics: ExtractionDiagnostic[] = [];

    /** Lazily-resolved builtin type names from TypeScript lib files. */
    private _discoveredBuiltins: Set<string> | undefined;

    constructor(project: Project) {
        this.project = project;
        this.typeRefs = new TypeReferenceCollector(this);
        this.pkgNameCache = new Map();
    }

    /** Builtin type names discovered from TypeScript lib files (lazily initialized). */
    get discoveredBuiltins(): Set<string> {
        if (!this._discoveredBuiltins) {
            this._discoveredBuiltins = discoverBuiltinTypes(this.project);
        }
        return this._discoveredBuiltins;
    }

    /**
     * Checks if a type name is a language-level builtin using dynamically discovered type names.
     * Builtins are types defined in TypeScript's lib files (Promise, Array, Map, etc.).
     * Note: @types/node types are NOT builtins — they are stdlib dependencies.
     */
    isBuiltinType(typeName: string): boolean {
        if (PRIMITIVE_TYPES.has(typeName)) return true;
        return this.discoveredBuiltins.has(typeName);
    }

    /**
     * Walks up from a file path to find the nearest package.json and reads
     * the "name" field. Results are cached per directory.
     */
    resolvePackageNameFromAncestorPkgJson(filePath: string): string | undefined {
        let dir = path.dirname(filePath);
        const root = path.parse(dir).root;

        while (dir && dir !== root) {
            if (this.pkgNameCache.has(dir)) return this.pkgNameCache.get(dir);

            const pkgPath = path.join(dir, "package.json");
            if (fs.existsSync(pkgPath)) {
                try {
                    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
                    const name: string | undefined = pkg.name;
                    if (name) {
                        this.pkgNameCache.set(dir, name);
                        return name;
                    }
                    // package.json without "name" (e.g. {"type":"commonjs"}) — keep walking up
                } catch {
                    // Malformed JSON — keep walking up
                }
            }
            dir = path.dirname(dir);
        }
        this.pkgNameCache.set(dir, undefined);
        return undefined;
    }

    /** Records a structured diagnostic. */
    warn(code: string, message: string, typeName?: string): void {
        this.diagnostics.push({ level: "warning", code, message, typeName });
    }
}

/**
 * Scans all source files from TypeScript lib to collect
 * every declared interface, class, type alias, enum, and variable name.
 */
function discoverBuiltinTypes(project: Project): Set<string> {
    const builtins = new Set<string>();

    // Collect source files that the TypeScript compiler considers default lib files.
    // When skipAddingFilesFromTsConfig is true, lib files may not be in
    // project.getSourceFiles() but ARE in the compiler program's source files.
    const program = project.getProgram().compilerObject;
    const builtinFiles: SourceFile[] = [];

    // First try project source files
    for (const sf of project.getSourceFiles()) {
        if (isDefaultLibFile(project, sf)) builtinFiles.push(sf);
    }

    // If none found (common when skipAddingFilesFromTsConfig: true), discover
    // from the compiler program's source file list and wrap them.
    if (builtinFiles.length === 0) {
        for (const tsFile of program.getSourceFiles()) {
            if (program.isSourceFileDefaultLibrary(tsFile)) {
                try {
                    let sf = project.getSourceFile(tsFile.fileName);
                    if (!sf) sf = project.addSourceFileAtPath(tsFile.fileName);
                    builtinFiles.push(sf);
                } catch { /* skip unresolvable lib files */ }
            }
        }
    }

    for (const sourceFile of builtinFiles) {
        try {
            for (const iface of sourceFile.getInterfaces()) {
                builtins.add(iface.getName());
            }
            for (const cls of sourceFile.getClasses()) {
                const name = cls.getName();
                if (name) builtins.add(name);
            }
            for (const alias of sourceFile.getTypeAliases()) {
                builtins.add(alias.getName());
            }
            for (const enumDecl of sourceFile.getEnums()) {
                builtins.add(enumDecl.getName());
            }
            // Also collect variable declarations (e.g., "declare var console: Console")
            // which define global objects like JSON, Math, Reflect, Atomics, Intl
            for (const varStmt of sourceFile.getVariableStatements()) {
                for (const decl of varStmt.getDeclarations()) {
                    builtins.add(decl.getName());
                }
            }
        } catch {
            // Skip files that fail to parse (non-fatal)
        }
    }

    return builtins;
}

// ============================================================================
// AST-Based Type Reference Collection
// ============================================================================

/**
 * Information about an external type reference with full symbol resolution.
 */
interface ResolvedTypeRef {
    /** Simple type name (as used in source code) */
    name: string;
    /** Full type name with namespace */
    fullName: string;
    /** Original exported name when different from name (e.g., import { ProxySettings as ProxyOptions }) */
    originalName?: string;
    /** Source file path where the type is declared */
    declarationPath?: string;
    /** Package name (from package.json or path inference) */
    packageName?: string;
}

/**
 * Collects external type references from a Type object using proper AST traversal.
 * This recursively resolves generic type arguments, union/intersection members, etc.
 *
 * @param type The Type object to analyze
 * @param ctx The extraction context for this run
 * @param refs Set to collect resolved type references
 * @param visited Set of already visited type IDs to prevent infinite recursion
 */
function collectTypeRefsFromType(
    type: Type,
    ctx: ExtractionContext,
    refs: Set<ResolvedTypeRef>,
    visited: WeakSet<object> = new WeakSet()
): void {
    if (!type) return;

    // Wrap in try-catch to handle malformed declarations that can throw in ts-morph
    try {
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
                collectTypeRefsFromType(unionType, ctx, refs, visited);
            }
            return;
        }

        // Handle intersection types
        if (type.isIntersection()) {
            for (const intersectionType of type.getIntersectionTypes()) {
                collectTypeRefsFromType(intersectionType, ctx, refs, visited);
            }
            return;
        }

        // Handle array types
        if (type.isArray()) {
            const elementType = type.getArrayElementType();
            if (elementType) {
                collectTypeRefsFromType(elementType, ctx, refs, visited);
            }
            return;
        }

        // Handle tuple types
        if (type.isTuple()) {
            for (const tupleElement of type.getTupleElements()) {
                collectTypeRefsFromType(tupleElement, ctx, refs, visited);
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
                            if (paramType) collectTypeRefsFromType(paramType, ctx, refs, visited);
                        }
                    }
                    collectTypeRefsFromType(sig.getReturnType(), ctx, refs, visited);
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
                collectTypeRefsFromType(typeArg, ctx, refs, visited);
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
                        if (propType) collectTypeRefsFromType(propType, ctx, refs, visited);
                    }
                } catch (e) { ctx.warn("TYPE_TRAVERSE", e instanceof Error ? e.message : String(e)); }
            }
            for (const sig of type.getCallSignatures()) {
                try {
                    for (const param of sig.getParameters()) {
                        const paramDecls = param.getDeclarations();
                        if (paramDecls.length > 0) {
                            const paramType = getTypeFromDeclaration(paramDecls[0]);
                            if (paramType) collectTypeRefsFromType(paramType, ctx, refs, visited);
                        }
                    }
                    collectTypeRefsFromType(sig.getReturnType(), ctx, refs, visited);
                } catch (e) { ctx.warn("TYPE_TRAVERSE", e instanceof Error ? e.message : String(e)); }
            }
            // Traverse index signature value types (e.g. { [key: string]: FormDataValue })
            try {
                const stringIndexType = type.getStringIndexType();
                if (stringIndexType) collectTypeRefsFromType(stringIndexType, ctx, refs, visited);
            } catch (e) { ctx.warn("TYPE_TRAVERSE", e instanceof Error ? e.message : String(e)); }
            try {
                const numberIndexType = type.getNumberIndexType();
                if (numberIndexType) collectTypeRefsFromType(numberIndexType, ctx, refs, visited);
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
                    if (pType) collectTypeRefsFromType(pType, ctx, refs, visited);
                } catch (e) { ctx.warn("TYPE_TRAVERSE", e instanceof Error ? e.message : String(e)); }
            }
            const retType = getReturnTypeFromDeclaration(declaration);
            if (retType) collectTypeRefsFromType(retType, ctx, refs, visited);
            return;
        }

        const sourceFile = declaration.getSourceFile();
        const filePath = sourceFile.getFilePath();

        // Check if this is from TypeScript's default library
        if (isDefaultLibFile(ctx.project, sourceFile)) {
            // Still process type arguments for generic builtins (e.g. Promise<T>)
            const typeArgs = type.getTypeArguments();
            for (const typeArg of typeArgs) {
                collectTypeRefsFromType(typeArg, ctx, refs, visited);
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
            collectTypeRefsFromType(typeArg, ctx, refs, visited);
        }

        // Process base types for classes/interfaces
        const baseTypes = type.getBaseTypes();
        for (const baseType of baseTypes) {
            collectTypeRefsFromType(baseType, ctx, refs, visited);
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
                    if (propType) collectTypeRefsFromType(propType, ctx, refs, visited);
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
                        if (paramType) collectTypeRefsFromType(paramType, ctx, refs, visited);
                    }
                }
                collectTypeRefsFromType(sig.getReturnType(), ctx, refs, visited);
            } catch (e) { ctx.warn("TYPE_TRAVERSE", e instanceof Error ? e.message : String(e)); }
        }

        // Process construct signatures
        for (const sig of type.getConstructSignatures()) {
            try {
                for (const param of sig.getParameters()) {
                    const paramDecls = param.getDeclarations();
                    if (paramDecls.length > 0) {
                        const paramType = getTypeFromDeclaration(paramDecls[0]);
                        if (paramType) collectTypeRefsFromType(paramType, ctx, refs, visited);
                    }
                }
                collectTypeRefsFromType(sig.getReturnType(), ctx, refs, visited);
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
function resolvePackageNameFromPath(filePath: string, ctx: ExtractionContext): string | undefined {
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
function collectTypeRefsFromTypeNode(
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
class TypeReferenceCollector {
    private refs = new Set<ResolvedTypeRef>();
    private readonly ctx: ExtractionContext;
    private definedTypes = new Set<string>();
    private importedTypes = new Map<string, string>(); // typeName -> packageName
    private namespaceImports = new Set<string>(); // namespace import aliases (import * as X)

    /** Check if a name was imported as a namespace (import * as X). */
    hasNamespaceImport(name: string): boolean {
        return this.namespaceImports.has(name);
    }
    private contextStack: string[] = []; // stack of enclosing type names
    private refsByContext = new Map<string, Set<ResolvedTypeRef>>(); // context -> resolved refs

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
                this.refs.add(ref);
                if (contextName) {
                    if (!this.refsByContext.has(contextName)) this.refsByContext.set(contextName, new Set());
                    this.refsByContext.get(contextName)!.add(ref);
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
                this.refs.add(ref);
                if (contextName) {
                    if (!this.refsByContext.has(contextName)) this.refsByContext.set(contextName, new Set());
                    this.refsByContext.get(contextName)!.add(ref);
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
        let scopedRefs: Set<ResolvedTypeRef>;

        if (reachableTypes) {
            scopedRefs = new Set<ResolvedTypeRef>();
            for (const typeName of reachableTypes) {
                const contextRefs = this.refsByContext.get(typeName);
                if (contextRefs) {
                    for (const ref of contextRefs) {
                        scopedRefs.add(ref);
                    }
                }
            }
        } else {
            scopedRefs = this.refs;
        }

        // Filter out locally defined types and types without package info
        const resolved = Array.from(scopedRefs).filter(ref =>
            !this.definedTypes.has(ref.name) &&
            ref.packageName !== undefined
        );

        // Import-declaration fallback: include types that were imported from
        // external packages but not resolved by ts-morph (e.g., uninstalled deps).
        // This replaces the old string-tokenization approach with the compiler's
        // own import resolution.
        const resolvedNames = new Set(resolved.map(r => r.name));
        for (const [typeName, packageName] of this.importedTypes) {
            if (resolvedNames.has(typeName)) continue;
            if (this.definedTypes.has(typeName)) continue;
            // Skip namespace import aliases — they are module objects, not types
            if (this.namespaceImports.has(typeName)) continue;

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
            for (const ref of refs) {
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

// ============================================================================
// Engine Functions
// ============================================================================

function getDocString(node: JSDocableNode): string | undefined {
    const jsDocs = node.getJsDocs();
    if (!jsDocs?.length) return undefined;

    const comment = jsDocs[0].getComment();
    if (!comment) return undefined;

    const text =
        typeof comment === "string"
            ? comment
            : comment.filter((c): c is NonNullable<typeof c> => c != null)
                .map((c) => (typeof c === "string" ? c : c.getText()))
                .join("");

    const firstLine = text.split("\n")[0].trim();
    return firstLine.length > 120 ? firstLine.substring(0, 117) + "..." : firstLine;
}

// ============================================================================
// Phase 4: Type-safe node accessors — eliminate `as any` casts
// ============================================================================

/**
 * Safely get the type from a declaration node using ts-morph type guards.
 * Replaces `(decl as any).getType?.()` patterns.
 */
function getTypeFromDeclaration(decl: Node): Type | undefined {
    if (Node.isParameterDeclaration(decl)) return decl.getType();
    if (Node.isPropertyDeclaration(decl)) return decl.getType();
    if (Node.isPropertySignature(decl)) return decl.getType();
    if (Node.isVariableDeclaration(decl)) return decl.getType();
    if (Node.isTypeAliasDeclaration(decl)) return decl.getType();
    if (Node.isMethodDeclaration(decl)) return decl.getReturnType();
    if (Node.isMethodSignature(decl)) return decl.getReturnType();
    if (Node.isGetAccessorDeclaration(decl)) return decl.getReturnType();
    if (Node.isSetAccessorDeclaration(decl)) return decl.getParameters()[0]?.getType();
    if (Node.isFunctionDeclaration(decl)) return decl.getReturnType();
    if (Node.isClassDeclaration(decl)) return decl.getType();
    if (Node.isInterfaceDeclaration(decl)) return decl.getType();
    if (Node.isEnumDeclaration(decl)) return decl.getType();
    if (Node.isIndexSignatureDeclaration(decl)) return decl.getReturnType();
    return undefined;
}

/**
 * Safely get parameters from a declaration node using ts-morph type guards.
 * Replaces `(decl as any).getParameters?.()` patterns.
 */
function getParametersFromDeclaration(decl: Node): ParameterDeclaration[] {
    if (Node.isMethodDeclaration(decl)) return decl.getParameters();
    if (Node.isMethodSignature(decl)) return decl.getParameters();
    if (Node.isFunctionDeclaration(decl)) return decl.getParameters();
    if (Node.isConstructorDeclaration(decl)) return decl.getParameters();
    if (Node.isGetAccessorDeclaration(decl)) return decl.getParameters();
    if (Node.isSetAccessorDeclaration(decl)) return decl.getParameters();
    return [];
}

/**
 * Safely get the return type from a declaration node using ts-morph type guards.
 * Replaces `(decl as any).getReturnType?.()` patterns.
 */
function getReturnTypeFromDeclaration(decl: Node): Type | undefined {
    if (Node.isMethodDeclaration(decl)) return decl.getReturnType();
    if (Node.isMethodSignature(decl)) return decl.getReturnType();
    if (Node.isFunctionDeclaration(decl)) return decl.getReturnType();
    if (Node.isConstructorDeclaration(decl)) return decl.getReturnType();
    if (Node.isGetAccessorDeclaration(decl)) return decl.getReturnType();
    if (Node.isIndexSignatureDeclaration(decl)) return decl.getReturnType();
    return undefined;
}

/**
 * Checks if a node has @internal or @hidden JSDoc tags, indicating it should be excluded
 * from the public API surface.
 */
function hasInternalOrHiddenTag(node: JSDocableNode): boolean {
    const jsDocs = node.getJsDocs();
    if (!jsDocs?.length) return false;

    for (const jsDoc of jsDocs) {
        for (const tag of jsDoc.getTags()) {
            const tagName = tag.getTagName();
            if (tagName === "internal" || tagName === "hidden") {
                return true;
            }
        }
    }
    return false;
}

/**
 * Formats a type for display by stripping compiler-generated import() qualifiers.
 * Prefers the developer-written type annotation (typeNode text) when available;
 * falls back to compiler-inferred text scoped to the enclosing declaration.
 */
function displayType(typeNode: TypeNode | undefined, type: Type, enclosing?: Node): string {
    return stripImportPrefix(typeNode?.getText() || type.getText(enclosing));
}

function formatParameter(p: ParameterDeclaration, ctx: ExtractionContext): string {
    let sig = p.getName();
    if (p.isOptional()) sig += "?";
    const type = p.getType();
    const typeNode = p.getTypeNode();
    const typeText = displayType(typeNode, type, p);
    if (typeText && typeText !== "any") {
        sig += `: ${typeText}`;
        // Collect type reference for dependency tracking
        ctx.typeRefs.collectFromType(type);
        // Also collect from TypeNode to catch simple type aliases resolved away by TS
        if (typeNode) ctx.typeRefs.collectFromTypeNode(typeNode);
    } else {
        sig += ": any";
    }
    return sig;
}

function extractParameterInfo(p: ParameterDeclaration): ParameterInfo {
    const type = displayType(p.getTypeNode(), p.getType(), p) || "any";

    const info: ParameterInfo = {
        name: p.getName(),
        type,
    };

    if (p.getInitializer()) info.default = p.getInitializer()!.getText();
    if (p.isOptional()) info.optional = true;
    if (p.isRestParameter()) info.rest = true;

    return info;
}

function getDeprecatedInfo(node: Node | JSDocableNode): { deprecated?: boolean; deprecatedMsg?: string } {
    if (!("getJsDocs" in node)) return {};
    const jsDocs = node.getJsDocs();
    if (!jsDocs?.length) return {};

    for (const jsDoc of jsDocs) {
        for (const tag of jsDoc.getTags()) {
            if (tag.getTagName() !== "deprecated") continue;
            const comment = tag.getCommentText();
            return {
                deprecated: true,
                deprecatedMsg: typeof comment === "string" && comment.trim().length > 0 ? comment.trim() : undefined,
            };
        }
    }

    return {};
}

function extractMethod(method: MethodDeclaration, ctx: ExtractionContext): MethodInfo {
    const paramInfos = method.getParameters().map(extractParameterInfo);
    const params = method.getParameters().map(p => formatParameter(p, ctx)).join(", ");
    const returnType = method.getReturnType();
    const returnTypeNode = method.getReturnTypeNode();
    const ret = displayType(returnTypeNode, returnType, method);

    // Collect return type reference
    if (returnType) {
        ctx.typeRefs.collectFromType(returnType);
    }
    // Also collect from TypeNode to catch simple type aliases resolved away by TS
    if (returnTypeNode) ctx.typeRefs.collectFromTypeNode(returnTypeNode);

    const typeParams = method.getTypeParameters().map(t => t.getText()).join(", ");

    const result: MethodInfo = {
        name: method.getName(),
        sig: params,
    };

    if (typeParams) result.typeParams = typeParams;

    if (paramInfos.length) result.params = paramInfos;

    if (ret && ret !== "void") result.ret = ret;

    const doc = getDocString(method);
    if (doc) result.doc = doc;

    if (method.isAsync()) result.async = true;
    if (method.isStatic()) result.static = true;

    const deprecated = getDeprecatedInfo(method);
    if (deprecated.deprecated) result.deprecated = true;
    if (deprecated.deprecatedMsg) result.deprecatedMsg = deprecated.deprecatedMsg;

    return result;
}

function extractProperty(prop: PropertyDeclaration, ctx: ExtractionContext): PropertyInfo {
    const type = prop.getType();
    const typeNode = prop.getTypeNode();

    // Collect type reference for dependency tracking
    ctx.typeRefs.collectFromType(type);
    // Also collect from TypeNode to catch simple type aliases resolved away by TS
    if (typeNode) ctx.typeRefs.collectFromTypeNode(typeNode);

    const result: PropertyInfo = {
        name: prop.getName(),
        type: displayType(typeNode, type, prop),
    };

    if (prop.isReadonly()) result.readonly = true;
    if (prop.hasQuestionToken()) result.optional = true;

    const doc = getDocString(prop);
    if (doc) result.doc = doc;

    const deprecated = getDeprecatedInfo(prop);
    if (deprecated.deprecated) result.deprecated = true;
    if (deprecated.deprecatedMsg) result.deprecatedMsg = deprecated.deprecatedMsg;

    return result;
}

function extractConstructor(ctor: ConstructorDeclaration, ctx: ExtractionContext): ConstructorInfo {
    const paramInfos = ctor.getParameters().map(extractParameterInfo);
    const result: ConstructorInfo = {
        sig: ctor.getParameters().map(p => formatParameter(p, ctx)).join(", "),
    };

    if (paramInfos.length) result.params = paramInfos;

    const deprecated = getDeprecatedInfo(ctor);
    if (deprecated.deprecated) result.deprecated = true;
    if (deprecated.deprecatedMsg) result.deprecatedMsg = deprecated.deprecatedMsg;

    return result;
}

function extractClass(cls: ClassDeclaration, ctx: ExtractionContext): ClassInfo {
    const name = cls.getName();
    if (!name) throw new Error("Class must have a name");

    ctx.typeRefs.pushContext(name);

    const result: ClassInfo = { name };

    const deprecated = getDeprecatedInfo(cls);
    if (deprecated.deprecated) result.deprecated = true;
    if (deprecated.deprecatedMsg) result.deprecatedMsg = deprecated.deprecatedMsg;

    // Base class - collect type reference
    const ext = cls.getExtends();
    if (ext) {
        result.extends = stripImportPrefix(ext.getText());
        // Collect base class type
        const baseType = ext.getType();
        ctx.typeRefs.collectFromType(baseType);
        ctx.typeRefs.collectFromTypeNode(ext);
    }

    // Interfaces - collect type references
    const implExprs = cls.getImplements();
    const impl = implExprs.map((i) => stripImportPrefix(i.getText()));
    if (impl.length) {
        result.implements = impl;
        // Collect interface types
        for (const implExpr of implExprs) {
            const implType = implExpr.getType();
            ctx.typeRefs.collectFromType(implType);
            ctx.typeRefs.collectFromTypeNode(implExpr);
        }
    }

    // Type parameters
    const typeParams = cls.getTypeParameters().map((t) => t.getText());
    if (typeParams.length) result.typeParams = typeParams.join(", ");

    const doc = getDocString(cls);
    if (doc) result.doc = doc;

    // Constructors — extract overload signatures when present, skip implementation.
    // Exclude private and protected constructors — they are not part of the public API.
    const ctors = cls
        .getConstructors()
        .filter((c) => c.getScope() !== "private" && c.getScope() !== "protected")
        .filter((c) => c.isOverload() || c.getOverloads().length === 0)
        .map(c => extractConstructor(c, ctx));
    if (ctors.length) result.constructors = ctors;

    // Methods — extract overload signatures when present, skip implementation.
    // Exclude private and protected methods — they are not part of the public API.
    const methods = cls
        .getMethods()
        .filter((m) => m.getScope() !== "private" && m.getScope() !== "protected" && !hasInternalOrHiddenTag(m))
        .filter((m) => m.isOverload() || m.getOverloads().length === 0)
        .map(m => extractMethod(m, ctx));
    if (methods.length) result.methods = methods;

    // Properties — exclude private, protected, and ES private (#field) members.
    // Protected members are implementation details whose types should not
    // leak into the public API type reference graph.
    // ES private fields (#field) use ECMAScript private name syntax rather
    // than TypeScript's `private` keyword, so getScope() returns undefined
    // for them — we must also check the field name prefix.
    const props = cls
        .getProperties()
        .filter((p) => p.getScope() !== "private" && p.getScope() !== "protected"
            && !p.getName().startsWith("#") && !hasInternalOrHiddenTag(p))
        .map(p => extractProperty(p, ctx));

    // Get/Set Accessors — extract as properties with correct readonly flag.
    // Exclude private and protected accessors — they are not part of the public API.
    const setAccessorNames = new Set(
        cls.getSetAccessors()
            .filter((a) => a.getScope() !== "private" && a.getScope() !== "protected")
            .map((a) => a.getName())
    );
    const accessorProps: PropertyInfo[] = cls
        .getGetAccessors()
        .filter((a) => a.getScope() !== "private" && a.getScope() !== "protected" && !hasInternalOrHiddenTag(a))
        .map((getter) => {
            const returnType = getter.getReturnType();
            const typeText = displayType(getter.getReturnTypeNode(), returnType, getter);
            if (returnType) {
                ctx.typeRefs.collectFromType(returnType);
            }
            const accessorResult: PropertyInfo = {
                name: getter.getName(),
                type: typeText,
            };
            if (!setAccessorNames.has(getter.getName())) {
                accessorResult.readonly = true;
            }
            const doc = getDocString(getter);
            if (doc) accessorResult.doc = doc;
            const deprecated = getDeprecatedInfo(getter);
            if (deprecated.deprecated) accessorResult.deprecated = true;
            if (deprecated.deprecatedMsg) accessorResult.deprecatedMsg = deprecated.deprecatedMsg;
            return accessorResult;
        });

    const allProps = [...props, ...accessorProps];
    if (allProps.length) result.properties = allProps;

    // Index signatures — e.g., [key: string]: unknown
    // ClassDeclaration doesn't have getIndexSignatures(), so filter getMembers() by kind.
    const classIndexSigNodes: IndexSignatureDeclaration[] = cls
        .getMembers()
        .filter((m) => Node.isIndexSignatureDeclaration(m)) as IndexSignatureDeclaration[];
    const classIndexSigs: IndexSignatureInfo[] = classIndexSigNodes
        .map((sig) => {
            const keyParam = sig.getKeyName();
            const keyType = sig.getKeyType().getText();
            const valueType = displayType(sig.getReturnTypeNode(), sig.getReturnType(), sig);
            ctx.typeRefs.collectFromType(sig.getReturnType());
            const indexSig: IndexSignatureInfo = { keyName: keyParam, keyType, valueType };
            if (sig.isReadonly()) indexSig.readonly = true;
            return indexSig;
        });
    if (classIndexSigs.length) result.indexSignatures = classIndexSigs;

    ctx.typeRefs.popContext();
    return result;
}

function extractInterfaceMethod(method: Node, ctx: ExtractionContext): MethodInfo | undefined {
    if (!Node.isMethodSignature(method)) return undefined;

    const paramInfos = method.getParameters().map(extractParameterInfo);
    const params = method.getParameters().map(p => formatParameter(p, ctx)).join(", ");
    const returnType = method.getReturnType();
    const returnTypeNode = method.getReturnTypeNode();
    const ret = displayType(returnTypeNode, returnType, method);

    // Collect return type reference
    if (returnType) {
        ctx.typeRefs.collectFromType(returnType);
    }
    // Also collect from TypeNode to catch simple type aliases resolved away by TS
    if (returnTypeNode) ctx.typeRefs.collectFromTypeNode(returnTypeNode);

    const typeParams = method.getTypeParameters().map(t => t.getText()).join(", ");

    const result: MethodInfo = {
        name: method.getName(),
        sig: params,
    };

    if (typeParams) result.typeParams = typeParams;

    if (paramInfos.length) result.params = paramInfos;

    if (ret && ret !== "void") result.ret = ret;

    const doc = getDocString(method);
    if (doc) result.doc = doc;

    const deprecated = getDeprecatedInfo(method);
    if (deprecated.deprecated) result.deprecated = true;
    if (deprecated.deprecatedMsg) result.deprecatedMsg = deprecated.deprecatedMsg;

    return result;
}

function extractInterfaceCallableProperty(prop: Node, ctx: ExtractionContext): MethodInfo | undefined {
    if (!Node.isPropertySignature(prop)) return undefined;

    const typeNode = prop.getTypeNode();
    if (!typeNode || !Node.isFunctionTypeNode(typeNode)) return undefined;

    const paramInfos = typeNode.getParameters().map(extractParameterInfo);
    const params = typeNode.getParameters().map(p => formatParameter(p, ctx)).join(", ");
    const returnType = typeNode.getReturnType();
    const returnTypeNode = typeNode.getReturnTypeNode();
    const ret = displayType(returnTypeNode, returnType, prop);

    // Collect return type reference
    if (returnType) {
        ctx.typeRefs.collectFromType(returnType);
    }
    // Also collect from TypeNode to catch simple type aliases resolved away by TS
    if (returnTypeNode) ctx.typeRefs.collectFromTypeNode(returnTypeNode);

    const result: MethodInfo = {
        name: prop.getName(),
        sig: params,
    };

    if (paramInfos.length) result.params = paramInfos;

    if (ret && ret !== "void") result.ret = ret;

    const doc = getDocString(prop);
    if (doc) result.doc = doc;

    const deprecated = getDeprecatedInfo(prop);
    if (deprecated.deprecated) result.deprecated = true;
    if (deprecated.deprecatedMsg) result.deprecatedMsg = deprecated.deprecatedMsg;

    return result;
}

function extractInterfaceProperty(prop: Node, ctx: ExtractionContext): PropertyInfo | undefined {
    if (!Node.isPropertySignature(prop)) return undefined;

    const typeNode = prop.getTypeNode();
    const typeText = displayType(typeNode, prop.getType(), prop);

    // Collect type reference for dependency tracking
    ctx.typeRefs.collectFromType(prop.getType());
    // Also collect from TypeNode to catch simple type aliases resolved away by TS
    if (typeNode) ctx.typeRefs.collectFromTypeNode(typeNode);

    const result: PropertyInfo = {
        name: prop.getName(),
        type: typeText,
    };

    if (prop.isReadonly()) result.readonly = true;
    if (prop.hasQuestionToken()) result.optional = true;

    const doc = getDocString(prop);
    if (doc) result.doc = doc;

    const deprecated = getDeprecatedInfo(prop);
    if (deprecated.deprecated) result.deprecated = true;
    if (deprecated.deprecatedMsg) result.deprecatedMsg = deprecated.deprecatedMsg;

    return result;
}

function extractInterface(iface: InterfaceDeclaration, ctx: ExtractionContext): InterfaceInfo {
    const name = iface.getName();
    ctx.typeRefs.pushContext(name);

    const result: InterfaceInfo = { name };

    // Extends — collect type references for dependency tracking
    const extExprs = iface.getExtends();
    const ext = extExprs.map((e) => stripImportPrefix(e.getText()));
    if (ext.length) result.extends = ext;
    for (const extExpr of extExprs) {
        ctx.typeRefs.collectFromType(extExpr.getType());
        ctx.typeRefs.collectFromTypeNode(extExpr);
    }

    // Type parameters
    const typeParams = iface.getTypeParameters().map((t) => t.getText());
    if (typeParams.length) result.typeParams = typeParams.join(", ");

    const doc = getDocString(iface);
    if (doc) result.doc = doc;

    const deprecated = getDeprecatedInfo(iface);
    if (deprecated.deprecated) result.deprecated = true;
    if (deprecated.deprecatedMsg) result.deprecatedMsg = deprecated.deprecatedMsg;

    // Methods
    const methods: MethodInfo[] = [];
    methods.push(
        ...iface
            .getMethods()
            .filter((m) => !hasInternalOrHiddenTag(m))
            .map((m) => extractInterfaceMethod(m, ctx))
            .filter((m): m is MethodInfo => m !== undefined),
    );

    // Properties
    const props: PropertyInfo[] = [];
    for (const prop of iface.getProperties()) {
        if (Node.isPropertySignature(prop) && hasInternalOrHiddenTag(prop)) continue;
        const callable = extractInterfaceCallableProperty(prop, ctx);
        if (callable) {
            methods.push(callable);
            continue;
        }
        const graphed = extractInterfaceProperty(prop, ctx);
        if (graphed) props.push(graphed);
    }

    if (methods.length) result.methods = methods;
    if (props.length) result.properties = props;

    // Index signatures — e.g., [key: string]: unknown
    const indexSigs: IndexSignatureInfo[] = iface
        .getIndexSignatures()
        .map((sig) => {
            const keyParam = sig.getKeyName();
            const keyType = sig.getKeyType().getText();
            const valueType = displayType(sig.getReturnTypeNode(), sig.getReturnType(), sig);
            ctx.typeRefs.collectFromType(sig.getReturnType());
            const indexSig: IndexSignatureInfo = { keyName: keyParam, keyType, valueType };
            if (sig.isReadonly()) indexSig.readonly = true;
            return indexSig;
        });
    if (indexSigs.length) result.indexSignatures = indexSigs;

    ctx.typeRefs.popContext();
    return result;
}

function extractEnum(en: EnumDeclaration, ctx: ExtractionContext): EnumInfo {
    ctx.typeRefs.pushContext(en.getName());
    const result: EnumInfo = {
        name: en.getName(),
        doc: getDocString(en),
        values: en.getMembers().map((m) => m.getName()),
    };

    const deprecated = getDeprecatedInfo(en);
    if (deprecated.deprecated) result.deprecated = true;
    if (deprecated.deprecatedMsg) result.deprecatedMsg = deprecated.deprecatedMsg;

    ctx.typeRefs.popContext();
    return result;
}

function extractTypeAlias(alias: TypeAliasDeclaration, ctx: ExtractionContext): TypeAliasInfo {
    const name = alias.getName();
    ctx.typeRefs.pushContext(name);
    const type = alias.getType();

    // Collect type reference for dependency tracking.
    // Both the resolved-type traversal AND the type-node traversal are needed:
    // collectFromType follows the compiler-resolved types (catches transitive deps),
    // collectFromTypeNode follows the TypeNode AST (catches import alias patterns
    // like `import { X as Y }` via the ImportSpecifier handler).
    ctx.typeRefs.collectFromType(type);

    // Use the type node text (original source) rather than Type.getText()
    // which can resolve to the alias name itself for complex types.
    // However, for indexed access types (e.g., AppSettings["database"]),
    // prefer the compiler-resolved type since it gives the concrete type name.
    const typeNode = alias.getTypeNode();
    if (typeNode) ctx.typeRefs.collectFromTypeNode(typeNode);
    let typeText: string;
    if (typeNode && typeNode.getKind() === ts.SyntaxKind.IndexedAccessType) {
        // Indexed access type — use compiler-resolved type for the concrete name.
        typeText = displayType(undefined, type, alias);
    } else {
        typeText = displayType(typeNode, type, alias);
    }

    const result: TypeAliasInfo = {
        name,
        type: typeText,
        doc: getDocString(alias),
    };

    // Capture type parameters (e.g., <T> on type aliases)
    const typeParams = alias.getTypeParameters().map(tp => tp.getText());
    if (typeParams.length > 0) result.typeParams = typeParams.join(", ");

    const deprecated = getDeprecatedInfo(alias);
    if (deprecated.deprecated) result.deprecated = true;
    if (deprecated.deprecatedMsg) result.deprecatedMsg = deprecated.deprecatedMsg;

    ctx.typeRefs.popContext();
    return result;
}

function extractFunction(fn: FunctionDeclaration, ctx: ExtractionContext): FunctionInfo | undefined {
    const name = fn.getName();
    if (!name) return undefined;

    ctx.typeRefs.pushContext(name);

    const paramInfos = fn.getParameters().map(extractParameterInfo);
    const params = fn.getParameters().map(p => formatParameter(p, ctx)).join(", ");
    const returnType = fn.getReturnType();
    const ret = displayType(fn.getReturnTypeNode(), returnType, fn);

    // Collect return type reference
    if (returnType) {
        ctx.typeRefs.collectFromType(returnType);
    }

    const typeParams = fn.getTypeParameters().map(t => t.getText()).join(", ");

    const result: FunctionInfo = {
        name,
        sig: params,
    };

    if (typeParams) result.typeParams = typeParams;

    if (paramInfos.length) result.params = paramInfos;

    if (ret && ret !== "void") result.ret = ret;

    const doc = getDocString(fn);
    if (doc) result.doc = doc;

    if (fn.isAsync()) result.async = true;

    const deprecated = getDeprecatedInfo(fn);
    if (deprecated.deprecated) result.deprecated = true;
    if (deprecated.deprecatedMsg) result.deprecatedMsg = deprecated.deprecatedMsg;

    ctx.typeRefs.popContext();
    return result;
}

function extractModule(sourceFile: SourceFile, moduleName: string, ctx: ExtractionContext): ModuleInfo | null {
    const result: ModuleInfo = { name: moduleName };

    // Get exported declarations, filtering out @internal/@hidden tagged items
    const classes = sourceFile
        .getClasses()
        .filter((c) => c.isExported() && c.getName() && !hasInternalOrHiddenTag(c))
        .map(c => extractClass(c, ctx));
    if (classes.length) result.classes = classes;

    const interfaces = sourceFile
        .getInterfaces()
        .filter((i) => i.isExported() && !hasInternalOrHiddenTag(i))
        .map(i => extractInterface(i, ctx));
    if (interfaces.length) result.interfaces = interfaces;

    const enums = sourceFile
        .getEnums()
        .filter((e) => e.isExported() && !hasInternalOrHiddenTag(e))
        .map(e => extractEnum(e, ctx));
    if (enums.length) result.enums = enums;

    const typeAliases = sourceFile
        .getTypeAliases()
        .filter((t) => t.isExported() && !hasInternalOrHiddenTag(t))
        .map(t => extractTypeAlias(t, ctx));
    if (typeAliases.length) result.types = typeAliases;

    const functions = sourceFile
        .getFunctions()
        .filter((f) => f.isExported() && !hasInternalOrHiddenTag(f))
        .filter((f) => f.isOverload() || f.getOverloads().length === 0)
        .map(f => extractFunction(f, ctx))
        .filter((f): f is FunctionInfo => f !== undefined);
    if (functions.length) result.functions = functions;

    // Check if anything was graphed
    if (
        !result.classes &&
        !result.interfaces &&
        !result.enums &&
        !result.types &&
        !result.functions
    ) {
        return null;
    }

    return result;
}

// ============================================================================
// Entry Point Detection
// ============================================================================

interface PackageJson {
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
function resolveEntryPointFiles(rootPath: string, options: EngineOptions): ExportEntry[] {
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
interface ExportEntry {
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
function extractExportPaths(exports: string | Record<string, unknown>, rootOnly: boolean = false): ExportEntry[] {
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

function normalizeCondition(condition: string): string {
    const chain = condition.split("|").map(c => c.trim()).filter(Boolean);
    if (chain.length === 0) {
        return "default";
    }

    if (chain.includes("default")) {
        return "default";
    }

    // When "types" co-occurs with an environment condition (node, browser),
    // prefer the environment condition so platform-specific modules retain
    // their context instead of collapsing to a generic "types" label.
    const environmentConditions = new Set(["node", "browser", "import", "require", "workerd", "react-native"]);
    const hasTypes = chain.includes("types");
    if (hasTypes) {
        const envCondition = chain.find(c => environmentConditions.has(c));
        if (envCondition) {
            return envCondition;
        }
        return "types";
    }

    // Return the first recognized condition to provide a stable canonical form.
    const recognized = new Set(["import", "require", "node", "browser", "workerd", "react-native", "development", "production"]);
    for (const c of chain) {
        if (recognized.has(c)) {
            return c;
        }
    }

    return chain[chain.length - 1];
}

function getConditionPriority(condition: string): number {
    const canonical = normalizeCondition(condition);

    switch (canonical) {
        case "default": return 0;
        case "types": return 1;
        case "import": return 2;
        case "require": return 3;
        case "node": return 4;
        case "browser": return 5;
        case "production": return 6;
        case "development": return 7;
        default: return 100;
    }
}

/**
 * Resolves a package.json entry point path to the actual source/declaration file on disk.
 *
 * Resolution strategy (in order):
 * 1. Direct path or extension-converted path (e.g. .js → .d.ts in compiled mode)
 * 2. TypeScript module resolution via ts.resolveModuleName (respects tsconfig paths/rootDirs)
 */
function resolveToSourceFile(rootPath: string, outputPath: string, options: EngineOptions): string | null {
    const filePath = outputPath.replace(/^\.\//, "");

    if (options.mode === "compiled") {
        return resolveCompiledFile(rootPath, filePath, options);
    }

    return resolveSourceFile(rootPath, filePath);
}

/**
 * Compiled mode: find the .d.ts declaration file directly.
 */
function resolveCompiledFile(rootPath: string, filePath: string, options: EngineOptions): string | null {
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
 * Tries direct lookup first, then TypeScript module resolution.
 */
function resolveSourceFile(rootPath: string, filePath: string): string | null {
    // 1. Direct path with extension conversion (.js → .ts)
    const directPath = path.join(rootPath, filePath)
        .replace(/\.d\.ts$/, ".ts")
        .replace(/\.js$/, ".ts")
        .replace(/\.mjs$/, ".mts")
        .replace(/\.cjs$/, ".cts");
    if (fs.existsSync(directPath)) {
        return directPath;
    }

    // 2. TypeScript module resolution (respects tsconfig paths, rootDirs, etc.)
    const tsResolved = tryTypeScriptModuleResolution(rootPath, filePath);
    if (tsResolved) {
        return tsResolved;
    }

    return null;
}

/**
 * Attempt TypeScript module resolution for a file path.
 * This leverages tsconfig paths, rootDirs, and other compiler options.
 */
function tryTypeScriptModuleResolution(rootPath: string, filePath: string): string | null {
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
interface ExportedSymbolInfo {
    /** The export subpath (e.g., "." or "./client") */
    exportPath: string;
    /** Export condition (e.g., "default", "node", "browser") */
    condition: string;
    /** If re-exported from an external package, the package name */
    reExportedFrom?: string;
}

interface EngineOptions {
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
function extractExportedSymbols(project: Project, entryEntries: ExportEntry[]): Map<string, ExportedSymbolInfo> {
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
    const ctx = new ExtractionContext(project);

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
    _namespaceAliases = new Set<string>();
    for (const sf of sourceFilesForImports) {
        for (const imp of sf.getImportDeclarations()) {
            const nsImport = imp.getNamespaceImport();
            if (nsImport) {
                _namespaceAliases.add(nsImport.getText());
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
// Self-Containment Validation
// ============================================================================

/**
 * Tokenizes type strings to extract type-position identifiers.
 * Skips keywords, primitives, literals, and punctuation to yield only
 * names that must be resolvable in the output.
 */
const TYPE_TOKEN_RE = /\b([A-Z][A-Za-z0-9_$]*)\b/g;
const TYPE_KEYWORDS = new Set([
    "extends", "implements", "readonly", "static", "async", "new",
    "void", "null", "undefined", "true", "false", "keyof", "typeof",
    "infer", "in", "out", "const", "declare", "export", "import",
    "type", "interface", "class", "enum", "function", "namespace",
]);
// Matches identifiers that are ALL_CAPS with underscores — these are constants, not types.
const ALL_CAPS_RE = /^[A-Z][A-Z0-9_]*$/;
// Strip JSDoc/block comments, line comments, and string literals from type strings
// before tokenizing to avoid matching words inside documentation.
const COMMENT_AND_STRING_RE = /\/\*[\s\S]*?\*\/|\/\/[^\n]*|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`/g;

function extractTypeNamesFromSignature(sig: string): Set<string> {
    // Remove comments and string literals to avoid matching prose words
    const cleaned = sig.replace(COMMENT_AND_STRING_RE, " ");
    const names = new Set<string>();
    let m: RegExpExecArray | null;
    TYPE_TOKEN_RE.lastIndex = 0;
    while ((m = TYPE_TOKEN_RE.exec(cleaned)) !== null) {
        const name = m[1];
        if (!PRIMITIVE_TYPES.has(name) && !TYPE_KEYWORDS.has(name) && !ALL_CAPS_RE.test(name)) {
            names.add(name);
        }
    }
    return names;
}

/**
 * Extracts declared type parameter names from a typeParams string.
 * E.g., "<T, K extends string, V = number>" → {"T", "K", "V"}
 */
function extractDeclaredTypeParamNames(typeParamStr: string | undefined): Set<string> {
    if (!typeParamStr) return new Set();
    const params = new Set<string>();
    // Split by comma, then take the first identifier in each segment
    for (const segment of typeParamStr.split(",")) {
        const match = segment.trim().match(/^([A-Z_$][A-Za-z0-9_$]*)/);
        if (match) params.add(match[1]);
    }
    return params;
}

/**
 * Validates that the API index is self-contained: every type name referenced
 * in method signatures, property types, extends/implements clauses, and type
 * alias bodies is either defined in the output or is a known builtin/node type.
 *
 * Emits SELF_CONTAINMENT diagnostics to stderr for each dangling reference.
 */
function validateSelfContainment(api: ApiIndex, ctx: ExtractionContext): void {
    // Collect all defined type names (from main modules + dependencies)
    const defined = new Set<string>();
    for (const mod of api.modules) {
        for (const c of mod.classes || []) defined.add(c.name);
        for (const i of mod.interfaces || []) defined.add(i.name);
        for (const e of mod.enums || []) defined.add(e.name);
        for (const t of mod.types || []) defined.add(t.name);
        for (const f of mod.functions || []) { if (f.name) defined.add(f.name); }
    }
    if (api.dependencies) {
        for (const dep of api.dependencies) {
            for (const c of dep.classes || []) defined.add(c.name);
            for (const i of dep.interfaces || []) defined.add(i.name);
            for (const e of dep.enums || []) defined.add(e.name);
            for (const t of dep.types || []) defined.add(t.name);
            for (const f of dep.functions || []) { if (f.name) defined.add(f.name); }
        }
    }

    // Collect declared generic type parameter names to exclude from dangling check.
    // These are declaration-site names (T, K, V, TResult, etc.) that appear in
    // signatures but are not standalone types — they are bound by the enclosing
    // generic declaration.
    const declaredTypeParams = new Set<string>();

    function collectTypeParams(typeParamStr: string | undefined): void {
        for (const name of extractDeclaredTypeParamNames(typeParamStr)) {
            declaredTypeParams.add(name);
        }
    }

    // Collect all type names referenced in signatures
    const referenced = new Set<string>();

    function scanType(typeStr: string | undefined): void {
        if (!typeStr) return;
        for (const name of extractTypeNamesFromSignature(typeStr)) {
            referenced.add(name);
        }
    }

    function scanMethodSigs(methods: MethodInfo[] | undefined): void {
        for (const m of methods || []) {
            collectTypeParams(m.typeParams);
            scanType(m.sig);
            scanType(m.ret);
            scanType(m.typeParams);
            for (const p of m.params || []) scanType(p.type);
        }
    }

    function scanProperties(props: PropertyInfo[] | undefined): void {
        for (const p of props || []) scanType(p.type);
    }

    function scanIndexSigs(sigs: IndexSignatureInfo[] | undefined): void {
        for (const s of sigs || []) {
            scanType(s.keyType);
            scanType(s.valueType);
        }
    }

    for (const mod of api.modules) {
        for (const c of mod.classes || []) {
            collectTypeParams(c.typeParams);
            scanType(c.extends);
            for (const impl of c.implements || []) scanType(impl);
            scanType(c.typeParams);
            scanMethodSigs(c.methods);
            scanProperties(c.properties);
            scanIndexSigs(c.indexSignatures);
            for (const ctor of c.constructors || []) {
                scanType(ctor.sig);
                for (const p of ctor.params || []) scanType(p.type);
            }
        }
        for (const i of mod.interfaces || []) {
            collectTypeParams(i.typeParams);
            for (const ext of i.extends || []) scanType(ext);
            scanType(i.typeParams);
            scanMethodSigs(i.methods);
            scanProperties(i.properties);
            scanIndexSigs(i.indexSignatures);
        }
        for (const t of mod.types || []) {
            collectTypeParams(t.typeParams);
            scanType(t.type);
            scanType(t.typeParams);
        }
        for (const f of mod.functions || []) {
            collectTypeParams(f.typeParams);
            scanType(f.sig);
            scanType(f.ret);
            scanType(f.typeParams);
            for (const p of f.params || []) scanType(p.type);
        }
    }

    // Check each referenced name: is it defined, builtin, or node/web?
    const dangling: string[] = [];
    for (const name of referenced) {
        if (defined.has(name)) continue;
        if (PRIMITIVE_TYPES.has(name)) continue;
        if (ctx.isBuiltinType(name)) continue;
        if (declaredTypeParams.has(name)) continue;
        dangling.push(name);
    }

    if (dangling.length > 0) {
        const sorted = dangling.sort();
        console.error(`Self-containment: ${sorted.length} type(s) referenced in signatures but not defined: ${sorted.join(", ")}`);
    }
}

// ============================================================================
// Transitive Dependency Resolution
// ============================================================================

/**
 * Gets all type names defined in the API.
 */
function getDefinedTypes(api: ApiIndex): Set<string> {
    const defined = new Set<string>();
    for (const mod of api.modules) {
        for (const cls of mod.classes || []) defined.add(cls.name);
        for (const iface of mod.interfaces || []) defined.add(iface.name);
        for (const en of mod.enums || []) defined.add(en.name);
        for (const t of mod.types || []) defined.add(t.name);
    }
    return defined;
}

/**
 * Computes the set of type names reachable from entry points.
 * Walks the type reference graph starting from entry-point types,
 * using pre-computed referencedTypes from compiler type resolution.
 */
function computeReachableTypes(api: ApiIndex): Set<string> {
    const allTypeNames = getDefinedTypes(api);

    // Build reference graph from pre-computed referencedTypes fields.
    // These were populated from TypeReferenceCollector's compiler-resolved refs.
    const references = new Map<string, Set<string>>();
    for (const mod of api.modules) {
        for (const cls of mod.classes || []) {
            const refs = (cls.referencedTypes ?? []).filter(t => allTypeNames.has(t));
            if (refs.length) references.set(cls.name, new Set(refs));
        }
        for (const iface of mod.interfaces || []) {
            const refs = (iface.referencedTypes ?? []).filter(t => allTypeNames.has(t));
            if (refs.length) references.set(iface.name, new Set(refs));
        }
        for (const t of mod.types || []) {
            const refs = (t.referencedTypes ?? []).filter(t2 => allTypeNames.has(t2));
            if (refs.length) references.set(t.name, new Set(refs));
        }
        for (const fn of mod.functions || []) {
            if (!fn.name) continue;
            const refs = (fn.referencedTypes ?? []).filter(t => allTypeNames.has(t));
            if (refs.length) references.set(fn.name, new Set(refs));
        }
    }

    // BFS from entry points
    const reachable = new Set<string>();
    const queue: string[] = [];

    for (const mod of api.modules) {
        for (const cls of mod.classes || []) {
            if (cls.entryPoint) { reachable.add(cls.name); queue.push(cls.name); }
        }
        for (const iface of mod.interfaces || []) {
            if (iface.entryPoint) { reachable.add(iface.name); queue.push(iface.name); }
        }
        for (const en of mod.enums || []) {
            if (en.entryPoint) { reachable.add(en.name); queue.push(en.name); }
        }
        for (const t of mod.types || []) {
            if (t.entryPoint) { reachable.add(t.name); queue.push(t.name); }
        }
        for (const fn of mod.functions || []) {
            if (fn.entryPoint && fn.name) { reachable.add(fn.name); queue.push(fn.name); }
        }
    }

    while (queue.length > 0) {
        const current = queue.shift()!;
        const refs = references.get(current);
        if (refs) {
            for (const ref of refs) {
                if (!reachable.has(ref)) {
                    reachable.add(ref);
                    queue.push(ref);
                }
            }
        }
    }

    return reachable;
}

/**
 * Builds a map of type names to their resolved import declarations.
 * Uses the existing project's module resolution to find types in dependencies,
 * handling named imports, default imports, and re-exports.
 */
function buildImportResolutionMap(project: Project): {
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
                const typeName = aliasName || importedName;
                if (!typeMap.has(importedName)) {
                    typeMap.set(importedName, { packageName: moduleSpecifier, resolvedFile });
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

type ExtractResult = {
    graphed: ClassInfo | InterfaceInfo | EnumInfo | TypeAliasInfo | FunctionInfo;
    declaration: Node;
    kind: "class" | "interface" | "enum" | "type" | "function";
};

/**
 * Attempts to extract a type from a single AST declaration node.
 * Handles ClassDeclaration, InterfaceDeclaration, EnumDeclaration,
 * TypeAliasDeclaration, and FunctionDeclaration.
 */
function extractDeclaration(
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
function extractTypeFromResolvedModule(
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
function resolveTransitiveDependencies(api: ApiIndex, ctx: ExtractionContext, rootPath: string, reachableTypes?: Set<string>): DependencyInfo[] {
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
                            for (const [, entry] of importResolutionMap) {
                                if (entry.packageName === subRef.packageName) {
                                    resolvedFile = entry.resolvedFile;
                                    break;
                                }
                            }
                        }
                        if (resolvedFile) {
                            importResolutionMap.set(subRef.name, { packageName: subRef.packageName, resolvedFile });
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
 * Extracts type names referenced in a resolved dependency type's signatures.
 * Only extracts type-position tokens, not parameter names or literals.
 */

/**
 * Checks if a package is part of the Node.js runtime.
 * Currently only @types/node is considered a Node.js runtime package.
 */
function isNodePackage(packageName: string): boolean {
    return packageName === "@types/node" || packageName.startsWith("@types/node/") || isNodeBuiltinModule(packageName);
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
function isNodeTypeImportable(typeName: string, declarationPath: string, ctx: ExtractionContext): boolean {
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
function isModuleNamespaceSymbol(typeName: string, ctx: ExtractionContext): boolean {
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

/** Node.js built-in modules — comprehensive static fallback set. */
const NODE_BUILTIN_MODULES_STATIC = new Set([
    "assert", "assert/strict", "async_hooks", "buffer", "child_process",
    "cluster", "console", "constants", "crypto", "dgram",
    "diagnostics_channel", "dns", "dns/promises", "domain", "events",
    "fs", "fs/promises", "http", "http2", "https", "inspector",
    "inspector/promises", "module", "net", "os", "path", "path/posix",
    "path/win32", "perf_hooks", "process", "punycode", "querystring",
    "readline", "readline/promises", "repl", "stream", "stream/consumers",
    "stream/promises", "stream/web", "string_decoder", "sys", "test",
    "timers", "timers/promises", "tls", "trace_events", "tty", "url",
    "util", "util/types", "v8", "vm", "wasi", "worker_threads", "zlib",
]);

/**
 * Lazily-resolved set of built-in module names. Prefers the runtime's own
 * `module.builtinModules` list (always correct for the running Node version)
 * and falls back to the static set when unavailable (e.g., older Node, Bun).
 */
let _resolvedBuiltinModules: Set<string> | undefined;
function getBuiltinModules(): Set<string> {
    if (_resolvedBuiltinModules) return _resolvedBuiltinModules;
    try {
        // Use dynamic require to avoid ts-morph/bundler issues
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const mod = require("module");
        if (Array.isArray(mod.builtinModules) && mod.builtinModules.length > 0) {
            _resolvedBuiltinModules = new Set(mod.builtinModules as string[]);
            return _resolvedBuiltinModules;
        }
    } catch { /* runtime doesn't expose builtinModules — use static set */ }
    _resolvedBuiltinModules = NODE_BUILTIN_MODULES_STATIC;
    return _resolvedBuiltinModules;
}

function isNodeBuiltinModule(packageName: string): boolean {
    if (packageName.startsWith("node:")) return true;
    return getBuiltinModules().has(packageName);
}

/**
 * Walk up the directory tree from startDir to find a node_modules directory
 * that contains the given package. This mimics Node.js module resolution,
 * which is necessary when rootPath is a subdirectory (e.g. sdk/src) but
 * node_modules lives at the project root (e.g. sdk/node_modules).
 */
function findPackageInNodeModules(startDir: string, packageName: string): boolean {
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
function getPackageExportConditions(startDir: string, packageName: string): string[] | undefined {
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
function getPackageConditionTypePaths(startDir: string, packageName: string): Map<string, string> | undefined {
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
function resolveTypesPathFromCondition(value: unknown): string | undefined {
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
function getExportedTypeNamesFromFile(dtsPath: string, project: Project): Set<string> {
    const names = new Set<string>();
    let sf = project.getSourceFile(dtsPath);
    if (!sf) {
        try { sf = project.addSourceFileAtPath(dtsPath); }
        catch { return names; }
    }
    try {
        for (const [name] of sf.getExportedDeclarations()) {
            names.add(name);
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
function buildResolvedDependencies(
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

// ============================================================================
// Formatters
// ============================================================================

export function formatStubs(api: ApiIndex): string {
    const lines: string[] = [
        `// ${api.package} - Public API Surface`,
        "// Graphed by PublicApiGraphEngine.TypeScript",
        "",
    ];

    // Group modules by condition to emit each as a separate declare module block.
    // This prevents type collisions when multiple conditions declare the same name
    // (e.g., AzureCliCredential in both default and browser conditions).
    const conditionGroups = new Map<string, ModuleInfo[]>();
    for (const module of api.modules) {
        const cond = module.condition ?? "(unconditioned)";
        if (!conditionGroups.has(cond)) conditionGroups.set(cond, []);
        conditionGroups.get(cond)!.push(module);
    }

    // Sort conditions: "default" first, then alphabetically
    const sortedConditions = [...conditionGroups.keys()].sort((a, b) => {
        if (a === "default") return -1;
        if (b === "default") return 1;
        return a.localeCompare(b);
    });

    const needsModuleBlocks = sortedConditions.length > 1;

    for (const condition of sortedConditions) {
        const modules = conditionGroups.get(condition)!;

        if (needsModuleBlocks) {
            lines.push(`declare module "${api.package}/${condition}" {`);
            lines.push("");
        }

        const indent = needsModuleBlocks ? "    " : "";

        for (const module of modules) {
            lines.push(`${indent}// Module: ${module.name}`);
            lines.push("");

            // Functions
            for (const fn of module.functions || []) {
                if (fn.doc) lines.push(`${indent}/** ${fn.doc} */`);
                const async = fn.async ? "async " : "";
                const ret = fn.ret ? `: ${fn.ret}` : "";
                lines.push(`${indent}export ${async}function ${fn.name}(${fn.sig})${ret};`);
                lines.push("");
            }

            // Type aliases
            for (const t of module.types || []) {
                if (t.doc) lines.push(`${indent}/** ${t.doc} */`);
                lines.push(`${indent}export type ${t.name} = ${t.type};`);
                lines.push("");
            }

            // Enums
            for (const e of module.enums || []) {
                if (e.doc) lines.push(`${indent}/** ${e.doc} */`);
                lines.push(`${indent}export enum ${e.name} {`);
                lines.push(`${indent}    ${e.values.join(", ")}`);
                lines.push(`${indent}}`);
                lines.push("");
            }

            // Interfaces
            for (const iface of module.interfaces || []) {
                if (iface.doc) lines.push(`${indent}/** ${iface.doc} */`);
                const ext = iface.extends?.length ? ` extends ${iface.extends.join(", ")}` : "";
                const typeParams = iface.typeParams ? `<${iface.typeParams}>` : "";
                lines.push(`${indent}export interface ${iface.name}${typeParams}${ext} {`);

                for (const prop of iface.properties || []) {
                    const opt = prop.optional ? "?" : "";
                    const ro = prop.readonly ? "readonly " : "";
                    lines.push(`${indent}    ${ro}${prop.name}${opt}: ${prop.type};`);
                }

                for (const sig of iface.indexSignatures || []) {
                    const ro = sig.readonly ? "readonly " : "";
                    lines.push(`${indent}    ${ro}[${sig.keyName}: ${sig.keyType}]: ${sig.valueType};`);
                }

                for (const m of iface.methods || []) {
                    const async = m.async ? "async " : "";
                    const ret = m.ret ? `: ${m.ret}` : "";
                    lines.push(`${indent}    ${async}${m.name}(${m.sig})${ret};`);
                }

                lines.push(`${indent}}`);
                lines.push("");
            }

            // Classes
            for (const cls of module.classes || []) {
                if (cls.doc) lines.push(`${indent}/** ${cls.doc} */`);
                const ext = cls.extends ? ` extends ${cls.extends}` : "";
                const impl = cls.implements?.length ? ` implements ${cls.implements.join(", ")}` : "";
                const typeParams = cls.typeParams ? `<${cls.typeParams}>` : "";
                lines.push(`${indent}export class ${cls.name}${typeParams}${ext}${impl} {`);

                for (const prop of cls.properties || []) {
                    const opt = prop.optional ? "?" : "";
                    const ro = prop.readonly ? "readonly " : "";
                    lines.push(`${indent}    ${ro}${prop.name}${opt}: ${prop.type};`);
                }

                for (const sig of cls.indexSignatures || []) {
                    const ro = sig.readonly ? "readonly " : "";
                    lines.push(`${indent}    ${ro}[${sig.keyName}: ${sig.keyType}]: ${sig.valueType};`);
                }

                for (const ctor of cls.constructors || []) {
                    lines.push(`${indent}    constructor(${ctor.sig});`);
                }

                for (const m of cls.methods || []) {
                    const async = m.async ? "async " : "";
                    const stat = m.static ? "static " : "";
                    const ret = m.ret ? `: ${m.ret}` : "";
                    lines.push(`${indent}    ${stat}${async}${m.name}(${m.sig})${ret};`);
                }

                if (!cls.properties?.length && !cls.constructors?.length && !cls.methods?.length) {
                    lines.push(`${indent}    // empty`);
                }

                lines.push(`${indent}}`);
                lines.push("");
            }
        }

        if (needsModuleBlocks) {
            lines.push("}");
            lines.push("");
        }
    }

    // Add dependency types if present, each wrapped in a declare module block
    if (api.dependencies && api.dependencies.length > 0) {
        lines.push("");
        lines.push("// ============================================================================");
        lines.push("// Dependencies");
        lines.push("// ============================================================================");

        for (const dep of api.dependencies) {
            if (dep.isNode) {
                // Emit @types/node types as simple import references
                const typeNames = [
                    ...(dep.classes ?? []).map(c => c.name),
                    ...(dep.interfaces ?? []).map(i => i.name),
                    ...(dep.enums ?? []).map(e => e.name),
                    ...(dep.types ?? []).map(t => t.name),
                    ...(dep.functions ?? []).filter(f => f.name).map(f => f.name),
                ].filter(Boolean);
                if (typeNames.length > 0) {
                    lines.push("");
                    lines.push(`import { ${typeNames.join(", ")} } from "${dep.package}";`);
                }
                continue;
            }
            lines.push("");
            lines.push(`declare module "${dep.package}" {`);
            lines.push("");

            const indent = "    ";

            // Interfaces
            for (const iface of dep.interfaces || []) {
                if (iface.doc) lines.push(`${indent}/** ${iface.doc} */`);
                const ext = iface.extends?.length ? ` extends ${iface.extends.join(", ")}` : "";
                const typeParams = iface.typeParams ? `<${iface.typeParams}>` : "";
                lines.push(`${indent}export interface ${iface.name}${typeParams}${ext} {`);

                for (const prop of iface.properties || []) {
                    const opt = prop.optional ? "?" : "";
                    const ro = prop.readonly ? "readonly " : "";
                    lines.push(`${indent}    ${ro}${prop.name}${opt}: ${prop.type};`);
                }

                for (const sig of iface.indexSignatures || []) {
                    const ro = sig.readonly ? "readonly " : "";
                    lines.push(`${indent}    ${ro}[${sig.keyName}: ${sig.keyType}]: ${sig.valueType};`);
                }

                for (const m of iface.methods || []) {
                    const ret = m.ret ? `: ${m.ret}` : "";
                    lines.push(`${indent}    ${m.name}(${m.sig})${ret};`);
                }

                lines.push(`${indent}}`);
                lines.push("");
            }

            // Classes
            for (const cls of dep.classes || []) {
                if (cls.doc) lines.push(`${indent}/** ${cls.doc} */`);
                const ext = cls.extends ? ` extends ${cls.extends}` : "";
                const typeParams = cls.typeParams ? `<${cls.typeParams}>` : "";
                lines.push(`${indent}export class ${cls.name}${typeParams}${ext} {`);

                for (const prop of cls.properties || []) {
                    const opt = prop.optional ? "?" : "";
                    const ro = prop.readonly ? "readonly " : "";
                    lines.push(`${indent}    ${ro}${prop.name}${opt}: ${prop.type};`);
                }

                for (const sig of cls.indexSignatures || []) {
                    const ro = sig.readonly ? "readonly " : "";
                    lines.push(`${indent}    ${ro}[${sig.keyName}: ${sig.keyType}]: ${sig.valueType};`);
                }

                for (const m of cls.methods || []) {
                    const ret = m.ret ? `: ${m.ret}` : "";
                    lines.push(`${indent}    ${m.name}(${m.sig})${ret};`);
                }

                if (!cls.properties?.length && !cls.methods?.length) {
                    lines.push(`${indent}    // empty`);
                }

                lines.push(`${indent}}`);
                lines.push("");
            }

            // Enums
            for (const e of dep.enums || []) {
                if (e.doc) lines.push(`${indent}/** ${e.doc} */`);
                lines.push(`${indent}export enum ${e.name} {`);
                lines.push(`${indent}    ${e.values.join(", ")}`);
                lines.push(`${indent}}`);
                lines.push("");
            }

            // Type aliases
            for (const t of dep.types || []) {
                if (t.doc) lines.push(`${indent}/** ${t.doc} */`);
                lines.push(`${indent}export type ${t.name} = ${t.type};`);
                lines.push("");
            }

            // Functions
            for (const fn of dep.functions || []) {
                if (fn.doc) lines.push(`${indent}/** ${fn.doc} */`);
                const async = fn.async ? "async " : "";
                const ret = fn.ret ? `: ${fn.ret}` : "";
                const typeParams = fn.typeParams ? `<${fn.typeParams}>` : "";
                lines.push(`${indent}export ${async}function ${fn.name}${typeParams}(${fn.sig})${ret};`);
                lines.push("");
            }

            lines.push("}");
        }
    }

    return lines.join("\n");
}

export function toJson(api: ApiIndex, pretty: boolean = false): string {
    return pretty ? JSON.stringify(api, null, 2) : JSON.stringify(api);
}

// ============================================================================
// CLI Entry Point
// ============================================================================

function main(): void {
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

// ============================================================================
// Usage Analysis - Find which API operations are used in samples
// ============================================================================

/**
 * Extracts the outermost type constructor from a type string.
 * E.g., "Map<K, V>" → "Map", "Promise<Response>" → "Promise", "Foo" → "Foo".
 * For non-generic type strings, returns the input unchanged (trimmed).
 */
function baseTypeName(typeStr: string): string {
    return stripImportPrefix(typeStr, true);
}

/**
 * Internal: Strips compiler-generated `import("…")` qualifiers from type text.
 * Used by `displayType()` and `baseTypeName()`.
 *
 *   import("./path").TypeName         → TypeName
 *   import("./path").Foo<import("./p").Bar> → Foo<Bar>
 *   typeof import("./path")           → typeof path-last-segment
 *
 * When `baseOnly` is true, also strips generic parameters.
 */
function stripImportPrefix(text: string, baseOnly = false): string {
    let result = text;
    if (result.includes("import(")) {
        // Strip import("..."). (with trailing dot) leaving what follows
        result = result.replace(/import\([^)]+\)\./g, "");
        // typeof import("path") → typeof <last-segment>
        result = result.replace(/typeof\s+import\(["']([^"']+)["']\)/g, (_, p: string) => {
            const seg = p.split("/");
            return `typeof ${seg[seg.length - 1]}`;
        });
        // Bare import("path") → last-segment
        result = result.replace(/import\(["']([^"']+)["']\)/g, (_, p: string) => {
            const seg = p.split("/");
            return seg[seg.length - 1];
        });
    }
    // Strip namespace import qualifiers (e.g., coreClient.OperationOptions → OperationOptions).
    // These come from `import * as coreClient from "@azure/core-client"` in source files.
    // The underlying types are already tracked as dependencies; we just need the unqualified name.
    if (_namespaceAliases.size > 0) {
        for (const alias of _namespaceAliases) {
            if (result.includes(`${alias}.`)) {
                result = result.replace(new RegExp(`\\b${alias}\\.`, "g"), "");
            }
        }
    }
    if (baseOnly) {
        const idx = result.indexOf("<");
        return (idx >= 0 ? result.slice(0, idx) : result).trim();
    }
    return result;
}

interface UsageResult {
    file_count: number;
    covered: CoveredOp[];
    uncovered: UncoveredOp[];
    patterns: string[];
}

interface CoveredOp {
    client: string;
    method: string;
    file: string;
    line: number;
}

interface UncoveredOp {
    client: string;
    method: string;
    sig: string;
}

/**
 * Build a variable → client type map for a source file.
 *
 * Tracks patterns:
 *   - const client = new BlobClient(...)           → client maps to BlobClient
 *   - const client: BlobClient = ...               → client maps to BlobClient
 *   - let client: BlobClient                       → client maps to BlobClient
 *   - const client = createBlobClient(...)          → client maps to BlobClient (via function return type map)
 *   - const client = service.getBlobClient(...)     → client maps to BlobClient (via method return type map)
 *   - const blob = storage.blobs                   → client maps to BlobClient (via property type map)
 *
 * All type resolution is driven by API index data — no name-based heuristics.
 */
function buildVarTypeMap(
    sourceFile: SourceFile,
    clientNames: Set<string>,
    propertyTypeMap: Map<string, string>,
    methodReturnTypeMap: Map<string, string>,
    functionReturnTypeMap: Map<string, string>
): Map<string, string> {
    const varTypes = new Map<string, string>();

    sourceFile.forEachDescendant((node) => {
        // Variable declarations: const client = new BlobClient() / const client: BlobClient = ...
        if (Node.isVariableDeclaration(node)) {
            const nameNode = node.getNameNode();
            if (!Node.isIdentifier(nameNode)) return;
            const varName = nameNode.getText();

            // Check type annotation first: const client: BlobClient
            const typeNode = node.getTypeNode();
            if (typeNode) {
                const typeName = baseTypeName(typeNode.getText());
                if (clientNames.has(typeName)) {
                    varTypes.set(varName, typeName);
                    return;
                }
            }

            // Check initializer
            const initializer = node.getInitializer();
            if (initializer) {
                // new BlobClient(...)
                if (Node.isNewExpression(initializer)) {
                    const exprNode = initializer.getExpression();
                    if (Node.isIdentifier(exprNode)) {
                        const name = exprNode.getText();
                        if (clientNames.has(name)) {
                            varTypes.set(varName, name);
                            return;
                        }
                    }
                    if (Node.isPropertyAccessExpression(exprNode)) {
                        const name = exprNode.getName();
                        if (clientNames.has(name)) {
                            varTypes.set(varName, name);
                            return;
                        }
                    }
                }

                // Call expression: createBlobClient() or service.getBlobClient()
                if (Node.isCallExpression(initializer)) {
                    const callExpr = initializer.getExpression();

                    // Standalone function: createBlobClient(...)
                    if (Node.isIdentifier(callExpr)) {
                        const retType = functionReturnTypeMap.get(callExpr.getText());
                        if (retType) {
                            varTypes.set(varName, retType);
                            return;
                        }
                    }

                    // Method call: service.getBlobClient(...) or BlobClient.create(...)
                    if (Node.isPropertyAccessExpression(callExpr)) {
                        const objExpr = callExpr.getExpression();
                        const calledMethodName = callExpr.getName();

                        // Static factory: BlobClient.create(...)
                        if (Node.isIdentifier(objExpr) && clientNames.has(objExpr.getText())) {
                            const staticKey = `${objExpr.getText()}.${calledMethodName}`;
                            const staticRet = methodReturnTypeMap.get(staticKey);
                            varTypes.set(varName, staticRet ?? objExpr.getText());
                            return;
                        }

                        // Instance method: service.getBlobClient(...)
                        if (Node.isIdentifier(objExpr)) {
                            const receiverType = varTypes.get(objExpr.getText());
                            if (receiverType) {
                                const methodKey = `${baseTypeName(receiverType)}.${calledMethodName}`;
                                const retType = methodReturnTypeMap.get(methodKey);
                                if (retType) {
                                    varTypes.set(varName, retType);
                                    return;
                                }
                            }
                        }
                    }
                }

                // Type assertion: expr as BlobClient
                if (Node.isAsExpression(initializer)) {
                    const asTypeNode = initializer.getTypeNode();
                    if (asTypeNode) {
                        const typeName = baseTypeName(asTypeNode.getText());
                        if (clientNames.has(typeName)) {
                            varTypes.set(varName, typeName);
                            return;
                        }
                    }
                }

                // Property access: const blob = storage.blobs → infer from property type map
                if (Node.isPropertyAccessExpression(initializer)) {
                    const objExpr = initializer.getExpression();
                    if (Node.isIdentifier(objExpr)) {
                        const sourceVar = objExpr.getText();
                        const sourceType = varTypes.get(sourceVar);
                        if (sourceType) {
                            const propName = initializer.getName();
                            const propKey = `${baseTypeName(sourceType)}.${propName}`;
                            const propType = propertyTypeMap.get(propKey);
                            if (propType) {
                                varTypes.set(varName, propType);
                                return;
                            }
                        }
                    }
                }
            }
        }

        // Property/field assignments: this.client = new BlobClient(...)
        if (Node.isPropertyDeclaration(node)) {
            const nameNode = node.getNameNode();
            if (Node.isIdentifier(nameNode)) {
                const propName = nameNode.getText();
                const typeNode = node.getTypeNode();
                if (typeNode) {
                    const typeName = baseTypeName(typeNode.getText());
                    if (clientNames.has(typeName)) {
                        varTypes.set(propName, typeName);
                        return;
                    }
                }
                const declInit = node.getInitializer();
                if (declInit && Node.isNewExpression(declInit)) {
                    const exprNode = declInit.getExpression();
                    if (Node.isIdentifier(exprNode)) {
                        const name = exprNode.getText();
                        if (clientNames.has(name)) {
                            varTypes.set(propName, name);
                        }
                    }
                }
            }
        }
    });

    return varTypes;
}

/**
 * Unwrap async wrapper types from a TypeScript return type string.
 * E.g., "Promise<BlobClient>" → "BlobClient", "Promise<Map<K, V>>" → "Map<K, V>".
 * Uses bracket-depth matching to correctly handle nested generics.
 */
function unwrapAsyncReturnType(returnType: string): string {
    const wrappers = ["Promise", "PromiseLike", "AsyncIterable", "AsyncIterableIterator"];
    for (const wrapper of wrappers) {
        if (returnType.startsWith(wrapper + "<")) {
            // Find the matching closing bracket using depth tracking
            let depth = 0;
            for (let i = wrapper.length; i < returnType.length; i++) {
                if (returnType[i] === "<") depth++;
                else if (returnType[i] === ">") {
                    depth--;
                    if (depth === 0) {
                        // Only unwrap if the closing bracket is at the end
                        if (i === returnType.length - 1) {
                            return returnType.slice(wrapper.length + 1, i);
                        }
                        break;
                    }
                }
            }
        }
    }
    return returnType;
}

/**
 * Build a map of (OwnerType.methodName) → return type from API method data.
 * Uses actual method return types from the API index for precise resolution.
 */
function buildMethodReturnTypeMap(
    usageClasses: ClassInfo[],
    usageInterfaces: InterfaceInfo[],
    clientMethods: Map<string, Set<string>>
): Map<string, string> {
    const map = new Map<string, string>();
    for (const cls of usageClasses) {
        for (const method of cls.methods || []) {
            if (method.ret) {
                const returnType = baseTypeName(unwrapAsyncReturnType(method.ret));
                if (clientMethods.has(returnType)) {
                    map.set(`${cls.name}.${method.name}`, returnType);
                }
            }
        }
    }
    for (const iface of usageInterfaces) {
        for (const method of iface.methods || []) {
            if (method.ret) {
                const returnType = baseTypeName(unwrapAsyncReturnType(method.ret));
                if (clientMethods.has(returnType)) {
                    map.set(`${iface.name}.${method.name}`, returnType);
                }
            }
        }
    }
    return map;
}

/**
 * Build a map of functionName → return type from API function data.
 * For module-level functions that return client types.
 */
function buildFunctionReturnTypeMap(
    api: ApiIndex,
    clientMethods: Map<string, Set<string>>
): Map<string, string> {
    const map = new Map<string, string>();
    for (const mod of api.modules) {
        for (const func of mod.functions || []) {
            if (func.ret) {
                const returnType = baseTypeName(unwrapAsyncReturnType(func.ret));
                if (clientMethods.has(returnType)) {
                    map.set(func.name, returnType);
                }
            }
        }
    }
    return map;
}

/**
 * Build a map of (OwnerType.propertyName) → client type name from API property data.
 * Uses actual property return types from the API index for precise resolution.
 */
function buildPropertyTypeMap(
    usageClasses: ClassInfo[],
    usageInterfaces: InterfaceInfo[],
    clientMethods: Map<string, Set<string>>
): Map<string, string> {
    const map = new Map<string, string>();
    for (const cls of usageClasses) {
        for (const prop of cls.properties || []) {
            const returnType = baseTypeName(prop.type);
            if (clientMethods.has(returnType)) {
                map.set(`${cls.name}.${prop.name}`, returnType);
            }
        }
    }
    for (const iface of usageInterfaces) {
        for (const prop of iface.properties || []) {
            const returnType = baseTypeName(prop.type);
            if (clientMethods.has(returnType)) {
                map.set(`${iface.name}.${prop.name}`, returnType);
            }
        }
    }
    return map;
}

function analyzeUsage(samplesPath: string, api: ApiIndex): UsageResult {
    const allClasses: ClassInfo[] = [];
    const allInterfaces: InterfaceInfo[] = [];
    const allTypeNames = new Set<string>();
    const interfaceNames = new Set<string>();

    for (const mod of api.modules) {
        for (const cls of mod.classes || []) {
            allClasses.push(cls);
            allTypeNames.add(cls.name);
        }
        for (const iface of mod.interfaces || []) {
            allInterfaces.push(iface);
            interfaceNames.add(iface.name);
            allTypeNames.add(iface.name);
        }
    }

    const interfaceImplementers = new Map<string, ClassInfo[]>();
    for (const cls of allClasses) {
        for (const iface of cls.implements || []) {
            const ifaceName = baseTypeName(iface);
            const list = interfaceImplementers.get(ifaceName) ?? [];
            list.push(cls);
            interfaceImplementers.set(ifaceName, list);
        }
    }

    const interfacesByName = new Map<string, InterfaceInfo>();
    for (const iface of allInterfaces) {
        if (!interfacesByName.has(iface.name)) {
            interfacesByName.set(iface.name, iface);
        }
    }

    const references = new Map<string, Set<string>>();
    for (const cls of allClasses) {
        references.set(cls.name, getReferencedTypes(cls, allTypeNames));
    }
    for (const iface of allInterfaces) {
        references.set(iface.name, getReferencedTypesForInterface(iface, allTypeNames));
    }

    const referencedBy = new Map<string, number>();
    for (const [typeName, refs] of references) {
        for (const target of refs) {
            if (target !== typeName) { // Skip self-references
                referencedBy.set(target, (referencedBy.get(target) ?? 0) + 1);
            }
        }
    }

    const operationTypes = new Set<string>();
    for (const cls of allClasses) {
        if ((cls.methods?.length ?? 0) > 0) {
            operationTypes.add(cls.name);
        }
    }
    for (const iface of allInterfaces) {
        if ((iface.methods?.length ?? 0) > 0) {
            operationTypes.add(iface.name);
        }
    }

    // Root classes: entry points (from package exports) with methods, or unreferenced types with operations
    let rootClasses = allClasses.filter((cls) => {
        const hasOperations = (cls.methods?.length ?? 0) > 0;
        const refs = references.get(cls.name);
        const referencesOperations = refs ? Array.from(refs).some((r) => operationTypes.has(r)) : false;
        return (cls.entryPoint && hasOperations) || (!referencedBy.has(cls.name) && (hasOperations || referencesOperations));
    });

    if (rootClasses.length === 0) {
        rootClasses = allClasses.filter((cls) => {
            const hasOperations = (cls.methods?.length ?? 0) > 0;
            const refs = references.get(cls.name);
            const referencesOperations = refs ? Array.from(refs).some((r) => operationTypes.has(r)) : false;
            return hasOperations || referencesOperations;
        });
    }

    const reachable = new Set<string>();
    const queue: string[] = [];

    for (const cls of rootClasses) {
        if (!reachable.has(cls.name)) {
            reachable.add(cls.name);
            queue.push(cls.name);
        }
    }

    while (queue.length > 0) {
        const current = queue.shift()!;
        const refs = references.get(current);
        if (refs) {
            for (const ref of refs) {
                if (!reachable.has(ref)) {
                    reachable.add(ref);
                    queue.push(ref);
                }
            }
        }

        if (interfaceNames.has(current)) {
            for (const impl of interfaceImplementers.get(current) ?? []) {
                if (!reachable.has(impl.name)) {
                    reachable.add(impl.name);
                    queue.push(impl.name);
                }
            }
        }
    }

    const usageClasses = allClasses.filter(
        (cls) => reachable.has(cls.name) && (cls.methods?.length ?? 0) > 0
    );

    const usageInterfaces = allInterfaces.filter(
        (iface) => reachable.has(iface.name) && (iface.methods?.length ?? 0) > 0
    );

    // Build map of client methods from API
    const clientMethods: Map<string, Set<string>> = new Map();

    for (const cls of usageClasses) {
        const methods = new Set<string>();
        for (const method of cls.methods || []) {
            methods.add(method.name);
        }
        if (methods.size > 0) {
            if (!clientMethods.has(cls.name)) {
                clientMethods.set(cls.name, methods);
            }
        }
    }

    for (const iface of usageInterfaces) {
        const methods = new Set<string>();
        for (const method of iface.methods || []) {
            methods.add(method.name);
        }
        if (methods.size > 0) {
            if (!clientMethods.has(iface.name)) {
                clientMethods.set(iface.name, methods);
            }
        }
    }

    if (clientMethods.size === 0) {
        return { file_count: 0, covered: [], uncovered: [], patterns: [] };
    }

    const covered: CoveredOp[] = [];
    const seenOps: Set<string> = new Set();
    const patterns: Set<string> = new Set();
    let fileCount = 0;

    // Build set of known client type names for local type inference
    const clientNames = new Set(clientMethods.keys());

    // Expand clientNames to include container types — reachable classes that
    // have properties pointing to client types (e.g., EmptyClient with widgets: WidgetClient)
    const allReachableClasses = allClasses.filter(cls => reachable.has(cls.name));
    for (const cls of allReachableClasses) {
        if (clientNames.has(cls.name)) continue;
        for (const prop of cls.properties || []) {
            const propType = baseTypeName(prop.type);
            if (clientMethods.has(propType)) {
                clientNames.add(cls.name);
                break;
            }
        }
    }

    // Build property type map from API data for precise subclient resolution
    // Use all reachable classes (not just usageClasses) so container types are included
    const propertyTypeMap = buildPropertyTypeMap(allReachableClasses, usageInterfaces, clientMethods);

    // Build method and function return type maps from API data for precise factory/getter resolution
    const methodReturnTypeMap = buildMethodReturnTypeMap(usageClasses, usageInterfaces, clientMethods);
    const functionReturnTypeMap = buildFunctionReturnTypeMap(api, clientMethods);

    // Create a project for parsing samples
    const project = new Project({
        compilerOptions: { allowJs: true, noEmit: true },
        skipFileDependencyResolution: true,
    });

    // Find all TS/JS files in samples
    const files = findFiles(samplesPath, [".ts", ".js", ".mjs", ".tsx", ".jsx"])
        .filter(f => !f.includes("node_modules") && !f.includes("/dist/") && !f.endsWith(".d.ts"));

    for (const filePath of files) {
        fileCount++;

        try {
            const sourceFile = project.addSourceFileAtPath(filePath);
            const relPath = path.relative(samplesPath, filePath);

            // Build variable → client type map for this file
            const varTypes = buildVarTypeMap(sourceFile, clientNames, propertyTypeMap, methodReturnTypeMap, functionReturnTypeMap);

            // Use ts-morph to find all call expressions
            sourceFile.forEachDescendant((node) => {
                if (Node.isCallExpression(node)) {
                    const expr = node.getExpression();
                    if (Node.isPropertyAccessExpression(expr)) {
                        const methodName = expr.getName();
                        const line = node.getStartLineNumber();

                        // Strategy 1: Resolve receiver type from local variable tracking
                        let resolvedClient: string | undefined;
                        const receiver = expr.getExpression();
                        if (Node.isIdentifier(receiver)) {
                            const varType = varTypes.get(receiver.getText());
                            if (varType && clientMethods.has(varType)) {
                                const methods = clientMethods.get(varType)!;
                                if (methods.has(methodName)) {
                                    resolvedClient = varType;
                                }
                            }
                        } else if (Node.isPropertyAccessExpression(receiver)) {
                            // Strategy 1c: Field access — obj.field.method()
                            const propName = receiver.getName();
                            const propExpr = receiver.getExpression();
                            if (Node.isIdentifier(propExpr)) {
                                const objType = varTypes.get(propExpr.getText());
                                if (objType) {
                                    const propKey = `${baseTypeName(objType)}.${propName}`;
                                    const fieldType = propertyTypeMap.get(propKey);
                                    if (fieldType && clientMethods.has(fieldType)) {
                                        const methods = clientMethods.get(fieldType)!;
                                        if (methods.has(methodName)) {
                                            resolvedClient = fieldType;
                                        }
                                    }
                                }
                            }
                            // Fallback: check varTypes for the property name directly
                            if (!resolvedClient) {
                                const varType = varTypes.get(propName);
                                if (varType && clientMethods.has(varType)) {
                                    const methods = clientMethods.get(varType)!;
                                    if (methods.has(methodName)) {
                                        resolvedClient = varType;
                                    }
                                }
                            }
                        } else if (Node.isCallExpression(receiver)) {
                            // getClient().method() - resolve return type from API data
                            const innerExpr = receiver.getExpression();

                            if (Node.isIdentifier(innerExpr)) {
                                // Standalone function: createClient().method()
                                const retType = functionReturnTypeMap.get(innerExpr.getText());
                                if (retType && clientMethods.has(retType)) {
                                    const methods = clientMethods.get(retType)!;
                                    if (methods.has(methodName)) {
                                        resolvedClient = retType;
                                    }
                                }
                            } else if (Node.isPropertyAccessExpression(innerExpr)) {
                                // Instance method: service.getClient().method()
                                const chainedObj = innerExpr.getExpression();
                                const chainedMethodName = innerExpr.getName();

                                // Static factory: ClientType.create().method()
                                if (Node.isIdentifier(chainedObj) && clientNames.has(chainedObj.getText())) {
                                    const staticKey = `${chainedObj.getText()}.${chainedMethodName}`;
                                    const retType = methodReturnTypeMap.get(staticKey) ?? chainedObj.getText();
                                    if (clientMethods.has(retType)) {
                                        const methods = clientMethods.get(retType)!;
                                        if (methods.has(methodName)) {
                                            resolvedClient = retType;
                                        }
                                    }
                                } else if (Node.isIdentifier(chainedObj)) {
                                    // service.getClient().method()
                                    const receiverType = varTypes.get(chainedObj.getText());
                                    if (receiverType) {
                                        const methodKey = `${baseTypeName(receiverType)}.${chainedMethodName}`;
                                        const retType = methodReturnTypeMap.get(methodKey);
                                        if (retType && clientMethods.has(retType)) {
                                            const methods = clientMethods.get(retType)!;
                                            if (methods.has(methodName)) {
                                                resolvedClient = retType;
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        if (resolvedClient) {
                            const key = `${resolvedClient}.${methodName}`;
                            if (!seenOps.has(key)) {
                                seenOps.add(key);
                                covered.push({ client: resolvedClient, method: methodName, file: relPath, line });
                            }
                        }
                    }
                }
            });

            // Detect patterns
            detectPatterns(sourceFile, patterns);

            project.removeSourceFile(sourceFile);
        } catch {
            // Skip files that can't be parsed
        }
    }

    // Build bidirectional interface ↔ implementation mapping for coverage cross-referencing
    const ifaceToImplNames = new Map<string, string[]>();
    const implToIfaceNames = new Map<string, string[]>();
    for (const cls of allClasses) {
        for (const iface of cls.implements || []) {
            const ifaceName = baseTypeName(iface);
            const impls = ifaceToImplNames.get(ifaceName) ?? [];
            impls.push(cls.name);
            ifaceToImplNames.set(ifaceName, impls);

            const ifaces = implToIfaceNames.get(cls.name) ?? [];
            ifaces.push(ifaceName);
            implToIfaceNames.set(cls.name, ifaces);
        }
    }

    // Build uncovered list with interface/implementation cross-referencing
    const uncovered: UncoveredOp[] = [];
    for (const [clientName, methods] of clientMethods) {
        for (const method of methods) {
            const key = `${clientName}.${method}`;
            if (seenOps.has(key)) {
                continue;
            }

            // Check if covered through an interface/implementation relationship
            let coveredViaRelated = false;

            // If this is an implementation, check if any of its interfaces has the method covered
            const implementedIfaces = implToIfaceNames.get(clientName);
            if (implementedIfaces) {
                coveredViaRelated = implementedIfaces.some(
                    (iface) => seenOps.has(`${iface}.${method}`),
                );
            }

            // If this is an interface, check if any implementation has the method covered
            if (!coveredViaRelated) {
                const implementations = ifaceToImplNames.get(clientName);
                if (implementations) {
                    coveredViaRelated = implementations.some(
                        (impl) => seenOps.has(`${impl}.${method}`),
                    );
                }
            }

            if (!coveredViaRelated) {
                uncovered.push({
                    client: clientName,
                    method,
                    sig: `${method}(...)`,
                });
            }
        }
    }

    return {
        file_count: fileCount,
        covered,
        uncovered,
        patterns: Array.from(patterns).sort(),
    };
}

function getReferencedTypes(cls: ClassInfo, allTypeNames: Set<string>): Set<string> {
    return new Set((cls.referencedTypes ?? []).filter(t => allTypeNames.has(t)));
}

function getReferencedTypesForInterface(iface: InterfaceInfo, allTypeNames: Set<string>): Set<string> {
    return new Set((iface.referencedTypes ?? []).filter(t => allTypeNames.has(t)));
}

function detectPatterns(sourceFile: SourceFile, patterns: Set<string>): void {
    // Detect patterns using purely structural AST analysis — no keyword matching
    sourceFile.forEachDescendant((node) => {
        if (Node.isAwaitExpression(node)) {
            patterns.add("async");
        }
        if (Node.isTryStatement(node)) {
            patterns.add("error-handling");
        }
        if (Node.isForOfStatement(node) && node.isAwaited()) {
            patterns.add("streaming");
        }
    });
}

function findFiles(dir: string, extensions: string[]): string[] {
    const results: string[] = [];

    if (!fs.existsSync(dir)) return results;

    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            results.push(...findFiles(fullPath, extensions));
        } else if (extensions.some(ext => entry.name.endsWith(ext))) {
            results.push(fullPath);
        }
    }
    return results;
}

// Run CLI - ES module entry point
main();
