// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Graph public API surface from TypeScript/JavaScript packages.
 * Uses ts-morph for proper TypeScript parsing.
 *
 * This barrel file re-exports the public API and serves as the CLI entry point.
 */

// Re-export all public types and functions
export type {
    MethodInfo,
    PropertyInfo,
    IndexSignatureInfo,
    ConstructorInfo,
    ParameterInfo,
    ClassInfo,
    InterfaceInfo,
    EnumInfo,
    TypeAliasInfo,
    FunctionInfo,
    ModuleInfo,
    ApiIndex,
    DependencyInfo,
    ResolvedTypeRef,
    ExtractionDiagnostic,
} from "./models.js";

export { ExtractionContext, PRIMITIVE_TYPES } from "./context.js";
export { TypeReferenceCollector, createExtractionContext } from "./type-refs.js";

export {
    getDocString,
    getTypeFromDeclaration,
    getParametersFromDeclaration,
    getReturnTypeFromDeclaration,
    hasInternalOrHiddenTag,
    formatParameter,
    extractParameterInfo,
    getDeprecatedInfo,
    extractMethod,
    extractProperty,
    extractConstructor,
    extractClass,
    extractInterface,
    extractEnum,
    extractTypeAlias,
    extractFunction,
    extractModule,
} from "./extractors.js";

export type { EngineOptions, ExportEntry, ExportedSymbolInfo } from "./entry-points.js";
export {
    resolveEntryPointFiles,
    extractExportPaths,
    normalizeCondition,
    getConditionPriority,
    resolveToSourceFile,
    resolveCompiledFile,
    resolveSourceFile,
    tryTypeScriptModuleResolution,
    extractExportedSymbols,
} from "./entry-points.js";

export {
    extractTypeNamesFromSignature,
    extractDeclaredTypeParamNames,
    validateSelfContainment,
    getDefinedTypes,
    computeReachableTypes,
} from "./reachability.js";

export {
    buildImportResolutionMap,
    resolveTransitiveDependencies,
    isNodePackage,
    isNodeTypeImportable,
    isModuleNamespaceSymbol,
    isNodeBuiltinModule,
    findPackageInNodeModules,
    getPackageExportConditions,
    getPackageConditionTypePaths,
    resolveTypesPathFromCondition,
    getExportedTypeNamesFromFile,
    buildResolvedDependencies,
    getBuiltinModules,
} from "./dependencies.js";

export { formatStubs, toJson, displayType, stripImportPrefix, baseTypeName } from "./formatter.js";
export { analyzeUsage } from "./usage.js";
export { extractPackage } from "./main.js";

// CLI entry point — import and run main
import "./main.js";
