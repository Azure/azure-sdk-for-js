// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Graph public API surface from TypeScript/JavaScript packages.
 * Uses ts-morph for proper TypeScript parsing.
 *
 * This barrel file re-exports the public API and serves as the CLI entry point.
 */

// Model types
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

// Core infrastructure
export { ExtractionContext } from "./context.js";
export { TypeReferenceCollector, createExtractionContext } from "./type-refs.js";

// Main entry points
import { extractPackage, main } from "./main.js";
export { extractPackage, main };
export { analyzeUsage } from "./usage.js";

// Formatters
export { formatStubs, toJson } from "./formatter.js";

// Node.js built-in utilities
export {
    isNodeBuiltinModule,
    isNodePackage,
    getBuiltinModules,
    NODE_BUILTIN_MODULES_STATIC,
} from "./node-builtins.js";

// CLI entry point — execute when run as script
main();
