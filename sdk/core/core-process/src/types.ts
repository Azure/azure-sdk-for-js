// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type * as childProcess from "node:child_process";

/**
 * Options used while resolving an executable.
 */
export interface ResolveExecutableOptions {
  /**
   * The working directory used to resolve explicit relative paths.
   */
  cwd?: string | URL;

  /**
   * The environment whose `PATH` is searched.
   */
  env?: NodeJS.ProcessEnv;

  /**
   * Whether `.cmd` and `.bat` files may be selected on Windows.
   *
   * Batch files only support a restricted argument set and are disabled by
   * default.
   */
  allowWindowsBatchFiles?: boolean;
}

/**
 * Options shared by safe process operations.
 */
export interface ProcessOptions extends ResolveExecutableOptions {
  /**
   * The numeric group identity of the process.
   */
  gid?: number;

  /**
   * The signal used to terminate the process.
   */
  killSignal?: NodeJS.Signals | number;

  /**
   * Shell execution is not supported.
   */
  shell?: never;

  /**
   * The maximum execution time in milliseconds.
   */
  timeout?: number;

  /**
   * The numeric user identity of the process.
   */
  uid?: number;

  /**
   * Whether to hide the subprocess console window on Windows.
   */
  windowsHide?: boolean;

  /**
   * Windows command-line encoding is controlled by this package.
   */
  windowsVerbatimArguments?: never;
}

/**
 * Options for {@link spawn}.
 */
export interface SpawnOptions extends ProcessOptions {
  /**
   * The value used for `argv[0]` in the child process.
   */
  argv0?: string;

  /**
   * Whether the child runs independently of its parent.
   */
  detached?: boolean;

  /**
   * The serialization mode used for IPC messages.
   */
  serialization?: childProcess.SerializationType;

  /**
   * An abort signal for process cancellation.
   */
  signal?: AbortSignal;

  /**
   * Standard input, output, and error mappings.
   */
  stdio?: childProcess.StdioOptions;
}

/**
 * Options for {@link spawnSync}.
 */
export interface SpawnSyncOptions extends ProcessOptions {
  /**
   * The value used for `argv[0]` in the child process.
   */
  argv0?: string;

  /**
   * The encoding used for captured output.
   */
  encoding?: BufferEncoding | "buffer" | null;

  /**
   * Content written to the child process's standard input.
   */
  input?: string | NodeJS.ArrayBufferView;

  /**
   * The maximum number of bytes allowed on stdout or stderr.
   */
  maxBuffer?: number;

  /**
   * Standard input, output, and error mappings.
   */
  stdio?: childProcess.StdioOptions;
}

/**
 * String-encoding options for {@link spawnSync}.
 */
export interface SpawnSyncOptionsWithStringEncoding extends Omit<SpawnSyncOptions, "encoding"> {
  /**
   * The character encoding used for captured output.
   */
  encoding: BufferEncoding;
}

/**
 * Buffer-encoding options for {@link spawnSync}.
 */
export interface SpawnSyncOptionsWithBufferEncoding extends Omit<SpawnSyncOptions, "encoding"> {
  /**
   * Selects buffer output.
   */
  encoding?: "buffer" | null;
}

/**
 * Options for {@link execFile}.
 */
export interface ExecFileOptions extends ProcessOptions {
  /**
   * The character encoding used for buffered output.
   */
  encoding?: BufferEncoding | "buffer" | null;

  /**
   * The maximum number of bytes allowed on stdout or stderr.
   */
  maxBuffer?: number;

  /**
   * An abort signal for process cancellation.
   */
  signal?: AbortSignal;
}

/**
 * String-encoding options for {@link execFile}.
 */
export interface ExecFileOptionsWithStringEncoding extends Omit<ExecFileOptions, "encoding"> {
  /**
   * The character encoding used for captured output.
   */
  encoding?: BufferEncoding;
}

/**
 * Buffer-encoding options for {@link execFile}.
 */
export interface ExecFileOptionsWithBufferEncoding extends Omit<ExecFileOptions, "encoding"> {
  /**
   * Selects buffer output.
   */
  encoding: "buffer" | null;
}

/**
 * Buffered output from {@link execFile}.
 */
export interface ExecFileResult<TOutput extends string | Buffer> {
  /**
   * Standard output from the process.
   */
  stdout: TOutput;

  /**
   * Standard error from the process.
   */
  stderr: TOutput;
}
