// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

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


