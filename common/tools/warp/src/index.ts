// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Public API for @microsoft/warp
export { build } from "./build.ts";
export type { BuildOptions, BuildResult } from "./build.ts";
export { findWarpConfig, validateTsconfigPaths } from "./config.ts";
export type {
  WarpConfig,
  WarpTarget,
  ResolvedWarpConfig,
  ConfigSource,
  WarpErrorCode,
  ModuleType,
} from "./types.ts";
export { WarpError } from "./types.ts";
export type { CompileResult, ParsedTargetConfig } from "./compiler.ts";
export {
  SharedSourceFileCache,
  createCachedHost,
  createPolyfillHost,
  discoverPolyfills,
  optionsSignature,
  programIdentity,
  sourceIdentity,
  groupBySignature,
  copyDtsFiles,
  validateOutDirs,
  cleanOutDir,
  copyDir,
  buildTransformedOutput,
} from "./compiler.ts";
export { verifyDistFiles } from "./exports.ts";
export type { SizeReport, TargetSizeMetrics, ApiSurfaceMetrics } from "./sizeReport.ts";
export {
  formatDiagnostics,
  formatSingleDiagnostic,
  diagnosticCategoryLabel,
} from "./diagnostics.ts";
export {
  resolveSubpathImport,
  resolveImportsInContent,
  resolveImportsInDir,
  readPackageImports,
  buildConditionsSet,
  sourcePathToOutputPath,
} from "./resolveImports.ts";
export type {
  ImportsMap,
  ResolveImportsResult,
  UnresolvedSpecifier,
  MissingResolvedTarget,
} from "./resolveImports.ts";
export { Logger, getLogger, setLogLevel } from "./logger.ts";
export type { LogLevel } from "./logger.ts";
export { watch } from "./watch.ts";
export type { WatchOptions } from "./watch.ts";
export { init } from "./init.ts";
export type { InitOptions } from "./init.ts";
