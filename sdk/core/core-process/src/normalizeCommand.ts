// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import path from "node:path";
import { ProcessError } from "./errors.js";
import {
  resolveExecutableWithContext,
  resolveWindowsCommandInterpreter,
  type ProcessContext,
} from "./resolveExecutable.js";

const UNSAFE_BATCH_ARGUMENT = /[%!^&|<>()]/;
const UNSAFE_BATCH_PATH = /[%!]/;
const BATCH_META_CHARACTER = /([()\][%!^"`<>&|;, *?])/g;

/**
 * A fully resolved command ready to pass to Node's child-process API.
 */
export interface NormalizedCommand {
  executable: string;
  args: string[];
  cwd: string;
  env: NodeJS.ProcessEnv;
  windowsVerbatimArguments: boolean;
}

function containsControlCharacter(value: string): boolean {
  for (const character of value) {
    const codePoint = character.codePointAt(0)!;
    if (codePoint <= 0x1f || codePoint === 0x7f) {
      return true;
    }
  }
  return false;
}

function snapshotArguments(args: readonly string[]): string[] {
  return args.map((arg, index) => {
    if (typeof arg !== "string" || arg.includes("\0")) {
      throw new ProcessError(`Process argument ${index} is invalid.`, {
        code: "ERR_INVALID_PROCESS_ARGUMENT",
      });
    }
    return arg;
  });
}

function validateBatchArguments(args: readonly string[]): void {
  for (const [index, arg] of args.entries()) {
    if (
      containsControlCharacter(arg) ||
      UNSAFE_BATCH_ARGUMENT.test(arg) ||
      /\\"/.test(arg) ||
      /\\{2,}$/.test(arg)
    ) {
      throw new ProcessError(`Windows batch argument ${index} is unsafe.`, {
        code: "ERR_UNSAFE_WINDOWS_BATCH_ARGUMENT",
      });
    }
  }
}

function escapeBatchCommand(filePath: string): string {
  if (containsControlCharacter(filePath) || UNSAFE_BATCH_PATH.test(filePath)) {
    throw new ProcessError("The Windows batch path cannot be represented safely.", {
      code: "ERR_UNSAFE_WINDOWS_BATCH_PATH",
    });
  }
  return filePath.replace(BATCH_META_CHARACTER, "^$1");
}

function escapeBatchArgument(argument: string): string {
  let escaped = argument;
  escaped = escaped.replace(/(?=(\\+?)?)\1"/g, '$1$1\\"');
  escaped = escaped.replace(/(?=(\\+?)?)\1$/g, "$1$1");
  escaped = `"${escaped}"`;
  return escaped.replace(BATCH_META_CHARACTER, "^$1");
}

/**
 * Resolves a command and prepares its platform-specific argument list.
 *
 * @param command - The executable name or path.
 * @param args - Arguments to pass to the executable.
 * @param context - The snapshotted process context.
 * @returns A command normalized for direct execution.
 */
export function normalizeCommand(
  command: string,
  args: readonly string[],
  context: ProcessContext,
): NormalizedCommand {
  const copiedArgs = snapshotArguments(args);
  const resolvedPath = resolveExecutableWithContext(command, context);
  if (!resolvedPath) {
    throw new ProcessError("The executable could not be found.", { code: "ENOENT" });
  }

  if (process.platform !== "win32") {
    return {
      executable: resolvedPath,
      args: copiedArgs,
      cwd: context.cwd,
      env: context.env,
      windowsVerbatimArguments: false,
    };
  }

  const extension = path.extname(resolvedPath).toLowerCase();
  if (extension === ".exe" || extension === ".com") {
    return {
      executable: resolvedPath,
      args: copiedArgs,
      cwd: context.cwd,
      env: context.env,
      windowsVerbatimArguments: false,
    };
  }

  if (extension !== ".cmd" && extension !== ".bat") {
    throw new ProcessError("The executable type is not supported on Windows.", {
      code: "ERR_UNSUPPORTED_WINDOWS_EXECUTABLE",
    });
  }
  if (!context.allowWindowsBatchFiles) {
    throw new ProcessError("Windows batch execution was not enabled.", {
      code: "ERR_WINDOWS_BATCH_DISABLED",
    });
  }
  if (context.cwd.startsWith("\\\\")) {
    throw new ProcessError("Windows batch execution does not support a UNC working directory.", {
      code: "ERR_UNSUPPORTED_WINDOWS_CWD",
    });
  }

  validateBatchArguments(copiedArgs);
  const commandInterpreter = resolveWindowsCommandInterpreter(context.env);
  const commandLine = [
    escapeBatchCommand(resolvedPath),
    ...copiedArgs.map(escapeBatchArgument),
  ].join(" ");

  return {
    executable: commandInterpreter.executablePath,
    args: ["/d", "/s", "/v:off", "/c", `"${commandLine}"`],
    cwd: context.cwd,
    env: context.env,
    windowsVerbatimArguments: true,
  };
}
