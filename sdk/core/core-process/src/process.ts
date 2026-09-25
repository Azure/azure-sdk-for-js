// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as childProcess from "node:child_process";
import { createExecutionError, isProcessError, ProcessError } from "./errors.js";
import { normalizeCommand, type NormalizedCommand } from "./normalizeCommand.js";
import { createProcessContext } from "./resolveExecutable.js";
import type {
  ExecFileOptions,
  ExecFileOptionsWithBufferEncoding,
  ExecFileOptionsWithStringEncoding,
  ExecFileResult,
  SpawnOptions,
  SpawnSyncOptions,
  SpawnSyncOptionsWithBufferEncoding,
  SpawnSyncOptionsWithStringEncoding,
} from "./types.js";

type SafeOptions =
  SpawnOptions | SpawnSyncOptions | ExecFileOptions | ExecFileOptionsWithBufferEncoding;

interface PreparedProcess {
  command: NormalizedCommand;
  nodeOptions: Record<string, unknown>;
}

const commonOptionNames = ["gid", "killSignal", "timeout", "uid", "windowsHide"] as const;
const spawnOptionNames = [
  ...commonOptionNames,
  "argv0",
  "detached",
  "serialization",
  "signal",
  "stdio",
] as const;
const spawnSyncOptionNames = [
  ...commonOptionNames,
  "argv0",
  "encoding",
  "input",
  "maxBuffer",
  "stdio",
] as const;
const execFileOptionNames = [...commonOptionNames, "encoding", "maxBuffer", "signal"] as const;

function sanitizeChildProcessError(error: unknown): unknown {
  return error instanceof Error && !isProcessError(error) ? createExecutionError(error) : error;
}

function callWithSanitizedChildProcessErrors<T>(callback: () => T): T {
  try {
    return callback();
  } catch (error: unknown) {
    throw sanitizeChildProcessError(error);
  }
}

function sanitizeChildProcessErrors(child: childProcess.ChildProcess): childProcess.ChildProcess {
  const originalEmit = child.emit;
  child.emit = ((eventName: string | symbol, ...args: unknown[]): boolean => {
    if (eventName === "error") {
      args[0] = sanitizeChildProcessError(args[0]);
    }
    return Reflect.apply(originalEmit, child, [eventName, ...args]) as boolean;
  }) as typeof child.emit;
  return child;
}

function prepareProcess(
  executable: string,
  args: readonly string[],
  options: SafeOptions,
  allowedOptionNames: readonly string[],
): PreparedProcess {
  if (options.shell !== undefined || options.windowsVerbatimArguments !== undefined) {
    throw new ProcessError("Shell-related process options are not supported.", {
      code: "ERR_UNSAFE_PROCESS_OPTION",
    });
  }

  const copiedOptions = { ...options } as Record<string, unknown>;
  const { cwd, env, allowWindowsBatchFiles } = copiedOptions;
  const resolutionOptionNames = new Set(["cwd", "env", "allowWindowsBatchFiles"]);
  const allowedOptions = new Set(allowedOptionNames);
  const nodeOptions: Record<string, unknown> = {};
  for (const [name, value] of Object.entries(copiedOptions)) {
    if ((name === "shell" || name === "windowsVerbatimArguments") && value === undefined) {
      continue;
    }
    if (resolutionOptionNames.has(name)) {
      continue;
    }
    if (!allowedOptions.has(name)) {
      throw new ProcessError("The process options contain an unsupported property.", {
        code: "ERR_UNSUPPORTED_PROCESS_OPTION",
      });
    }
    nodeOptions[name] = value;
  }
  const context = createProcessContext({
    cwd: cwd as string | URL | undefined,
    env: env as NodeJS.ProcessEnv | undefined,
    allowWindowsBatchFiles: allowWindowsBatchFiles as boolean | undefined,
  });

  const command = normalizeCommand(executable, args, context);
  if (command.windowsVerbatimArguments && nodeOptions.argv0 !== undefined) {
    throw new ProcessError("The argv0 option is not supported for Windows batch files.", {
      code: "ERR_UNSAFE_PROCESS_OPTION",
    });
  }

  return { command, nodeOptions };
}

/**
 * Starts a process without using an ambient operating-system shell.
 *
 * @param command - The executable name or path.
 * @param args - Arguments passed to the executable.
 * @param options - Process options.
 * @returns The started child process.
 */
export function spawn(
  command: string,
  args: readonly string[] = [],
  options: SpawnOptions = {},
): childProcess.ChildProcess {
  const prepared = prepareProcess(command, args, options, spawnOptionNames);
  const child = callWithSanitizedChildProcessErrors(() =>
    childProcess.spawn(prepared.command.executable, prepared.command.args, {
      ...prepared.nodeOptions,
      cwd: prepared.command.cwd,
      env: prepared.command.env,
      shell: false,
      windowsVerbatimArguments: prepared.command.windowsVerbatimArguments,
    }),
  );
  return sanitizeChildProcessErrors(child);
}

/**
 * Starts a process synchronously without using an ambient operating-system shell.
 *
 * @param command - The executable name or path.
 * @param args - Arguments passed to the executable.
 * @param options - Process options.
 * @returns The synchronous process result.
 */
export function spawnSync(
  command: string,
  args: readonly string[] | undefined,
  options: SpawnSyncOptionsWithStringEncoding,
): childProcess.SpawnSyncReturns<string>;
/**
 * Starts a process synchronously without using an ambient operating-system shell.
 *
 * @param command - The executable name or path.
 * @param args - Arguments passed to the executable.
 * @param options - Process options.
 * @returns The synchronous process result.
 */
export function spawnSync(
  command: string,
  args?: readonly string[],
  options?: SpawnSyncOptionsWithBufferEncoding,
): childProcess.SpawnSyncReturns<Buffer>;
/**
 * Starts a process synchronously without using an ambient operating-system shell.
 *
 * @param command - The executable name or path.
 * @param args - Arguments passed to the executable.
 * @param options - Process options.
 * @returns The synchronous process result.
 */
export function spawnSync(
  command: string,
  args: readonly string[] | undefined,
  options: SpawnSyncOptions,
): childProcess.SpawnSyncReturns<string | Buffer>;
export function spawnSync(
  command: string,
  args: readonly string[] = [],
  options: SpawnSyncOptions = {},
): childProcess.SpawnSyncReturns<string | Buffer> {
  const prepared = prepareProcess(command, args, options, spawnSyncOptionNames);
  const result = callWithSanitizedChildProcessErrors(() =>
    childProcess.spawnSync(prepared.command.executable, prepared.command.args, {
      ...prepared.nodeOptions,
      cwd: prepared.command.cwd,
      env: prepared.command.env,
      shell: false,
      windowsVerbatimArguments: prepared.command.windowsVerbatimArguments,
    }),
  );

  if (result.error) {
    return {
      ...result,
      error: createExecutionError(result.error),
    };
  }
  return result;
}

/**
 * Runs a process to completion and buffers its output.
 *
 * @param command - The executable name or path.
 * @param args - Arguments passed to the executable.
 * @returns Buffered standard output and standard error.
 */
export function execFile(
  command: string,
  args?: readonly string[],
): Promise<ExecFileResult<string>>;
/**
 * Runs a process to completion and buffers its output.
 *
 * @param command - The executable name or path.
 * @param args - Arguments passed to the executable.
 * @param options - Process options.
 * @returns Buffered standard output and standard error.
 */
export function execFile(
  command: string,
  args: readonly string[] | undefined,
  options: ExecFileOptionsWithBufferEncoding,
): Promise<ExecFileResult<Buffer>>;
/**
 * Runs a process to completion and buffers its output.
 *
 * @param command - The executable name or path.
 * @param args - Arguments passed to the executable.
 * @param options - Process options.
 * @returns Buffered standard output and standard error.
 */
export function execFile(
  command: string,
  args: readonly string[] | undefined,
  options: ExecFileOptionsWithStringEncoding,
): Promise<ExecFileResult<string>>;
/**
 * Runs a process to completion and buffers its output.
 *
 * @param command - The executable name or path.
 * @param args - Arguments passed to the executable.
 * @param options - Process options.
 * @returns Buffered standard output and standard error.
 */
export function execFile(
  command: string,
  args?: readonly string[],
  options?: ExecFileOptions,
): Promise<ExecFileResult<string | Buffer>>;
export async function execFile(
  command: string,
  args: readonly string[] = [],
  options: ExecFileOptions | ExecFileOptionsWithBufferEncoding = {},
): Promise<ExecFileResult<string | Buffer>> {
  const prepared = prepareProcess(command, args, options, execFileOptionNames);

  return new Promise((resolve, reject) => {
    callWithSanitizedChildProcessErrors(() =>
      childProcess.execFile(
        prepared.command.executable,
        prepared.command.args,
        {
          ...prepared.nodeOptions,
          cwd: prepared.command.cwd,
          env: prepared.command.env,
          shell: false,
          windowsVerbatimArguments: prepared.command.windowsVerbatimArguments,
          windowsHide: options.windowsHide,
        },
        (
          error: childProcess.ExecFileException | null,
          stdout: string | Buffer,
          stderr: string | Buffer,
        ) => {
          if (error) {
            reject(createExecutionError(error, stdout, stderr));
            return;
          }
          resolve({ stdout, stderr });
        },
      ),
    );
  });
}
