// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Secure, cross-platform process launching for Node.js.
 *
 * @packageDocumentation
 */

export { ProcessError, isProcessError, type ProcessErrorOptions } from "./errors.js";
export { execFile, spawn, spawnSync } from "./process.js";
export { resolveExecutable } from "./resolveExecutable.js";
export type {
  ExecFileOptions,
  ExecFileOptionsWithBufferEncoding,
  ExecFileOptionsWithStringEncoding,
  ExecFileResult,
  ProcessOptions,
  ResolveExecutableOptions,
  SpawnOptions,
  SpawnSyncOptions,
  SpawnSyncOptionsWithBufferEncoding,
  SpawnSyncOptionsWithStringEncoding,
} from "./types.js";
