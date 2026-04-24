// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export interface MethodInfo {
    name: string;
    typeParams?: string;
    declaredTypeParamNames?: string[];
    sig: string;
    params?: ParameterInfo[];
    ret?: string;
    doc?: string;
    async?: boolean;
    static?: boolean;
    abstract?: boolean;
    deprecated?: boolean;
    deprecatedMsg?: string;
}

export interface PropertyInfo {
    name: string;
    type: string;
    readonly?: boolean;
    optional?: boolean;
    static?: boolean;
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
    declaredTypeParamNames?: string[];
    abstract?: boolean;
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

export interface CallSignatureInfo {
    typeParams?: string;
    sig: string;
    ret?: string;
}

export interface ConstructSignatureInfo {
    typeParams?: string;
    sig: string;
    ret?: string;
}

export interface InterfaceInfo {
    name: string;
    entryPoint?: boolean;
    exportPath?: string;  // The subpath to import from (e.g., "." or "./client")
    reExportedFrom?: string;  // External package this is re-exported from
    extends?: string[];
    typeParams?: string;
    declaredTypeParamNames?: string[];
    doc?: string;
    deprecated?: boolean;
    deprecatedMsg?: string;
    methods?: MethodInfo[];
    properties?: PropertyInfo[];
    indexSignatures?: IndexSignatureInfo[];
    callSignatures?: CallSignatureInfo[];
    constructSignatures?: ConstructSignatureInfo[];
    /** Type names referenced by this entity's API surface, populated from compiler type resolution. */
    referencedTypes?: string[];
}

export interface EnumInfo {
    name: string;
    entryPoint?: boolean;
    exportPath?: string;
    reExportedFrom?: string;  // External package this is re-exported from
    doc?: string;
    /** Member declarations, e.g. ["A", "B = \"hello\"", "C = 42"]. */
    values: string[];
    deprecated?: boolean;
    deprecatedMsg?: string;
    /** True when the enum is declared as `const enum`. */
    isConst?: boolean;
}

export interface TypeAliasInfo {
    name: string;
    type: string;
    typeParams?: string;
    declaredTypeParamNames?: string[];
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
    declaredTypeParamNames?: string[];
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

export interface VariableInfo {
    name: string;
    type: string;
    isConst?: boolean;
    entryPoint?: boolean;
    exportPath?: string;
    reExportedFrom?: string;
    doc?: string;
    deprecated?: boolean;
    deprecatedMsg?: string;
    referencedTypes?: string[];
}

export interface ModuleInfo {
    name: string;
    condition?: string;
    /** Full chain of export conditions, e.g. ["import", "types"]. */
    conditionChain?: string[];
    exportPath?: string;
    classes?: ClassInfo[];
    interfaces?: InterfaceInfo[];
    enums?: EnumInfo[];
    types?: TypeAliasInfo[];
    functions?: FunctionInfo[];
    variables?: VariableInfo[];
    namespaces?: NamespaceInfo[];
}

export interface NamespaceInfo {
    name: string;
    entryPoint?: boolean;
    exportPath?: string;
    /** True when this namespace is declaration-merged with a class, interface, or type alias. */
    isCompanion?: boolean;
    classes?: ClassInfo[];
    interfaces?: InterfaceInfo[];
    enums?: EnumInfo[];
    types?: TypeAliasInfo[];
    functions?: FunctionInfo[];
    variables?: VariableInfo[];
    namespaces?: NamespaceInfo[];
}

export interface ApiIndex {
    package: string;
    /** Import subpath when the dependency was imported from a subpath export (e.g. "./policies") */
    subpath?: string;
    version?: string;
    modules: ModuleInfo[];
    /** Types from dependency packages that appear in the public API */
    dependencies?: DependencyInfo[];
    /** Fully resolved dependency packages with condition-aware modules */
    resolvedDependencies?: ApiIndex[];
    /**
     * Ambient types needed by the API surface — referenced but not defined in the output.
     * Keyed by source category ("dom", "es", "node"), values are sorted type name arrays.
     * Only includes types that must come from the runtime environment.
     */
    ambientTypes?: Record<string, string[]>;
    /** The ES lib target resolved from the package's tsconfig (e.g. "es2023") */
    esLib?: string;
    /**
     * Qualified (dotted) type references from compiler resolution (e.g., "NodeJS.ReadableStream").
     * Used for expanding namespace prefixes in ambient type display.
     * Not serialized to JSON — populated transiently during extraction.
     */
    qualifiedReferencedTypes?: string[];
    /**
     * Collision alias map: typeName → { packageName → aliasName }.
     * When a type name appears in multiple packages, this records the alias
     * each package's version should use. The "winner" (bare-name keeper)
     * maps to the original name; others get `_<pkgSuffix>_<Name>`.
     * Used by the C# formatter to emit aliased imports.
     */
    collisionAliases?: Record<string, Record<string, string>>;
}

/**
 * Information about types from a dependency package.
 */
export interface DependencyInfo {
    /** The npm package name */
    package: string;
    /** Import subpath when the type was imported from a subpath export (e.g. "./policies") */
    subpath?: string;
    /** The installed package version (e.g. "2.1.0") */
    version?: string;
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
    namespaces?: NamespaceInfo[];
}

/**
 * Information about an external type reference with full symbol resolution.
 */
export interface ResolvedTypeRef {
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

export interface ExtractionDiagnostic {
    readonly level: "info" | "warning" | "error";
    readonly code: string;
    readonly message: string;
    readonly typeName?: string;
}


