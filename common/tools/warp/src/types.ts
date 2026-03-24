// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Configuration types for Warp multi-format build system.
 */

/** Structured error codes for programmatic handling. */
export type WarpErrorCode =
  | "CONFIG_NOT_FOUND"
  | "CONFIG_INVALID"
  | "TSCONFIG_ERROR"
  | "COMPILE_ERROR"
  | "VALIDATION_ERROR"
  | "DIST_MISSING";

/**
 * Structured error class for Warp. Includes an error code for
 * programmatic handling and an optional cause for chaining.
 */
export class WarpError extends Error {
  readonly code: WarpErrorCode;

  constructor(code: WarpErrorCode, message: string, options?: { cause?: unknown }) {
    super(message, options);
    this.name = "WarpError";
    this.code = code;
  }
}

/** Module type for the target output directory's package.json shim. */
export type ModuleType = "module" | "commonjs";

/**
 * A single build target: a named, self-describing build variant.
 */
export interface WarpTarget {
  /** Identifier for this target, used in log output and the size report. */
  name: string;
  /**
   * The Node.js exports condition key written into package.json
   * (e.g. "import", "require", "browser", "react-native", or any custom string).
   *
   * Defaults to `name` when omitted.
   */
  condition: string;
  /** Path to the tsconfig for this target. Must include outDir and rootDir. */
  tsconfig: string;
  /**
   * Module type for the output directory's package.json shim.
   * Defaults to inferring from compiler options: CommonJS module → "commonjs",
   * everything else → "module".
   */
  moduleType?: ModuleType;
}

/**
 * Full Warp configuration.
 */
export interface WarpConfig {
  /**
   * Exports map expressed in terms of source files.
   * Keys are subpath patterns (e.g. ".", "./models").
   * Values are either:
   * - A source file path string (e.g. "./src/index.ts") — same file for all targets
   * - A literal pass-through string (e.g. "./package.json")
   * - A target override object mapping target names (or "default") to source file paths,
   *   for exports that resolve to different files per platform.
   */
  exports: Record<string, string | Record<string, string>>;
  /** Ordered list of build targets. Declaration order determines condition key order. */
  targets: WarpTarget[];
}

/**
 * The source from which config was resolved.
 */
export type ConfigSource =
  | { type: "yaml"; path: string }
  | { type: "json"; path: string }
  | { type: "package.json"; path: string };

/**
 * Resolved config with metadata about where it was found.
 */
export interface ResolvedWarpConfig {
  config: WarpConfig;
  source: ConfigSource;
}
