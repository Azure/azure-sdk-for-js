// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { accessSync, constants, realpathSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ProcessError } from "./errors.js";
import type { ResolveExecutableOptions } from "./types.js";

const WINDOWS_NATIVE_EXTENSIONS = [".exe", ".com"] as const;
const WINDOWS_BATCH_EXTENSIONS = [".cmd", ".bat"] as const;
const WINDOWS_DRIVE_ABSOLUTE_PATH = /^[a-z]:[\\/]/i;

/**
 * Immutable values used to resolve and launch a process consistently.
 */
export interface ProcessContext {
  cwd: string;
  env: NodeJS.ProcessEnv;
  allowWindowsBatchFiles: boolean;
}

interface WindowsCommandInterpreter {
  executablePath: string;
  systemRoot: string;
}

function getEnvironmentValue(environment: NodeJS.ProcessEnv, name: string): string | undefined {
  if (process.platform !== "win32") {
    return environment[name];
  }

  const normalizedName = name.toLowerCase();
  for (const [key, value] of Object.entries(environment)) {
    if (key.toLowerCase() === normalizedName) {
      return value;
    }
  }
  return undefined;
}

function setEnvironmentValue(environment: NodeJS.ProcessEnv, name: string, value: string): void {
  const normalizedName = name.toLowerCase();
  const existingKey = Object.keys(environment).find((key) => key.toLowerCase() === normalizedName);
  environment[existingKey ?? name] = value;
}

function snapshotEnvironment(environment: NodeJS.ProcessEnv): NodeJS.ProcessEnv {
  const snapshot: NodeJS.ProcessEnv = {};
  const windowsKeys = new Set<string>();

  for (const [key, value] of Object.entries(environment)) {
    if (process.platform === "win32") {
      const normalizedKey = key.toLowerCase();
      if (windowsKeys.has(normalizedKey)) {
        throw new ProcessError(
          "The environment contains duplicate case-insensitive variable names.",
          { code: "ERR_INVALID_ENVIRONMENT" },
        );
      }
      windowsKeys.add(normalizedKey);
    }

    if (value !== undefined && typeof value !== "string") {
      throw new ProcessError("The environment contains a non-string value.", {
        code: "ERR_INVALID_ENVIRONMENT",
      });
    }
    snapshot[key] = value;
  }

  return snapshot;
}

function normalizeCwd(cwd: string | URL | undefined): string {
  const cwdPath = cwd instanceof URL ? fileURLToPath(cwd) : cwd;
  return path.resolve(cwdPath ?? process.cwd());
}

/**
 * Snapshots and validates process resolution options.
 *
 * @param options - Resolution options to snapshot.
 * @returns The immutable context used for resolution and launch.
 */
export function createProcessContext(options: ResolveExecutableOptions = {}): ProcessContext {
  if (
    options.allowWindowsBatchFiles !== undefined &&
    typeof options.allowWindowsBatchFiles !== "boolean"
  ) {
    throw new ProcessError("The Windows batch option must be a boolean.", {
      code: "ERR_INVALID_PROCESS_OPTION",
    });
  }

  return {
    cwd: normalizeCwd(options.cwd),
    env: snapshotEnvironment(options.env ?? process.env),
    allowWindowsBatchFiles: options.allowWindowsBatchFiles === true,
  };
}

function isExecutableFile(filePath: string): boolean {
  try {
    if (!statSync(filePath).isFile()) {
      return false;
    }
    if (process.platform !== "win32") {
      accessSync(filePath, constants.X_OK);
    }
    return true;
  } catch {
    return false;
  }
}

function isNativeExtension(extension: string): boolean {
  return WINDOWS_NATIVE_EXTENSIONS.some((candidate) => candidate === extension);
}

function isBatchExtension(extension: string): boolean {
  return WINDOWS_BATCH_EXTENSIONS.some((candidate) => candidate === extension);
}

function resolveWindowsCandidate(
  candidate: string,
  allowWindowsBatchFiles: boolean,
): string | undefined {
  const extension = path.extname(candidate).toLowerCase();
  if (extension) {
    if (!isNativeExtension(extension) && !(allowWindowsBatchFiles && isBatchExtension(extension))) {
      return undefined;
    }
    return isExecutableFile(candidate) ? candidate : undefined;
  }

  for (const nativeExtension of WINDOWS_NATIVE_EXTENSIONS) {
    const nativeCandidate = candidate + nativeExtension;
    if (isExecutableFile(nativeCandidate)) {
      return nativeCandidate;
    }
  }

  if (allowWindowsBatchFiles) {
    for (const batchExtension of WINDOWS_BATCH_EXTENSIONS) {
      const batchCandidate = candidate + batchExtension;
      if (isExecutableFile(batchCandidate)) {
        return batchCandidate;
      }
    }
  }

  return undefined;
}

function getSearchPaths(context: ProcessContext): string[] {
  const pathValue = getEnvironmentValue(context.env, "PATH") ?? "";
  const paths: string[] = [];
  const seen = new Set<string>();

  for (const entry of pathValue.split(path.delimiter)) {
    let candidate = entry.trim();
    if (candidate.startsWith('"') && candidate.endsWith('"')) {
      candidate = candidate.slice(1, -1);
    }
    if (!candidate || !path.isAbsolute(candidate)) {
      continue;
    }

    const normalized = path.resolve(candidate);
    const key = process.platform === "win32" ? normalized.toLowerCase() : normalized;
    if (!seen.has(key)) {
      seen.add(key);
      paths.push(normalized);
    }
  }

  return paths;
}

function hasPathSeparator(command: string): boolean {
  return command.includes("/") || (process.platform === "win32" && command.includes("\\"));
}

function validateCommand(command: string): void {
  if (!command || command.includes("\0") || /[\r\n]/.test(command)) {
    throw new ProcessError("The executable name is invalid.", {
      code: "ERR_INVALID_EXECUTABLE",
    });
  }

  if (process.platform === "win32" && /^[a-z]:[^\\/]/i.test(command)) {
    throw new ProcessError("Drive-relative executable paths are not supported.", {
      code: "ERR_INVALID_EXECUTABLE",
    });
  }
}

/**
 * Resolves an executable using a previously snapshotted process context.
 *
 * @param command - The executable name or path.
 * @param context - The context used for path and environment resolution.
 * @returns The absolute executable path, or `undefined` when no supported file is found.
 */
export function resolveExecutableWithContext(
  command: string,
  context: ProcessContext,
): string | undefined {
  validateCommand(command);

  if (hasPathSeparator(command) || path.isAbsolute(command)) {
    const candidate = path.resolve(context.cwd, command);
    if (process.platform === "win32") {
      return resolveWindowsCandidate(candidate, context.allowWindowsBatchFiles);
    }
    return isExecutableFile(candidate) ? candidate : undefined;
  }

  const searchPaths = getSearchPaths(context);
  if (process.platform !== "win32") {
    for (const searchPath of searchPaths) {
      const candidate = path.join(searchPath, command);
      if (isExecutableFile(candidate)) {
        return candidate;
      }
    }
    return undefined;
  }

  const extension = path.extname(command).toLowerCase();
  if (extension) {
    if (
      !isNativeExtension(extension) &&
      !(context.allowWindowsBatchFiles && isBatchExtension(extension))
    ) {
      return undefined;
    }
    for (const searchPath of searchPaths) {
      const candidate = path.join(searchPath, command);
      if (isExecutableFile(candidate)) {
        return candidate;
      }
    }
    return undefined;
  }

  for (const searchPath of searchPaths) {
    for (const nativeExtension of WINDOWS_NATIVE_EXTENSIONS) {
      const candidate = path.join(searchPath, command + nativeExtension);
      if (isExecutableFile(candidate)) {
        return candidate;
      }
    }
  }

  if (context.allowWindowsBatchFiles) {
    for (const searchPath of searchPaths) {
      for (const batchExtension of WINDOWS_BATCH_EXTENSIONS) {
        const candidate = path.join(searchPath, command + batchExtension);
        if (isExecutableFile(candidate)) {
          return candidate;
        }
      }
    }
  }

  return undefined;
}

/**
 * Resolves an executable using an explicit working directory and environment.
 *
 * @param command - The executable name or path. It must not contain arguments.
 * @param options - Resolution options.
 * @returns The absolute executable path, or `undefined` when no supported file is found.
 */
export function resolveExecutable(
  command: string,
  options: ResolveExecutableOptions = {},
): string | undefined {
  return resolveExecutableWithContext(command, createProcessContext(options));
}

function canonicalizeWindowsPath(filePath: string): string {
  try {
    return realpathSync.native(filePath).toLowerCase();
  } catch {
    return path.resolve(filePath).toLowerCase();
  }
}

function isWindowsDriveAbsolutePath(filePath: string): boolean {
  return WINDOWS_DRIVE_ABSOLUTE_PATH.test(filePath);
}

/**
 * Resolves and validates the trusted Windows command interpreter.
 *
 * @param childEnvironment - The child environment to validate and normalize.
 * @returns The validated command interpreter and Windows system root.
 */
export function resolveWindowsCommandInterpreter(
  childEnvironment: NodeJS.ProcessEnv,
): WindowsCommandInterpreter {
  const hostEnvironment = snapshotEnvironment(process.env);
  const systemRoot = getEnvironmentValue(hostEnvironment, "SystemRoot");
  if (!systemRoot || !isWindowsDriveAbsolutePath(systemRoot)) {
    throw new ProcessError("A trusted Windows system directory could not be established.", {
      code: "ERR_UNTRUSTED_COMMAND_INTERPRETER",
    });
  }

  const executablePath = path.join(systemRoot, "System32", "cmd.exe");
  if (!isExecutableFile(executablePath)) {
    throw new ProcessError("The Windows command interpreter could not be found.", {
      code: "ERR_UNTRUSTED_COMMAND_INTERPRETER",
    });
  }

  const comSpec = getEnvironmentValue(hostEnvironment, "ComSpec");
  if (
    comSpec &&
    (!isWindowsDriveAbsolutePath(comSpec) ||
      canonicalizeWindowsPath(comSpec) !== canonicalizeWindowsPath(executablePath))
  ) {
    throw new ProcessError("The Windows command interpreter is not trusted.", {
      code: "ERR_UNTRUSTED_COMMAND_INTERPRETER",
    });
  }

  const childSystemRoot = getEnvironmentValue(childEnvironment, "SystemRoot");
  if (
    childSystemRoot &&
    (!isWindowsDriveAbsolutePath(childSystemRoot) ||
      canonicalizeWindowsPath(childSystemRoot) !== canonicalizeWindowsPath(systemRoot))
  ) {
    throw new ProcessError("The child environment contains an untrusted system directory.", {
      code: "ERR_UNTRUSTED_COMMAND_INTERPRETER",
    });
  }

  const childComSpec = getEnvironmentValue(childEnvironment, "ComSpec");
  if (
    childComSpec &&
    (!isWindowsDriveAbsolutePath(childComSpec) ||
      canonicalizeWindowsPath(childComSpec) !== canonicalizeWindowsPath(executablePath))
  ) {
    throw new ProcessError("The child environment contains an untrusted command interpreter.", {
      code: "ERR_UNTRUSTED_COMMAND_INTERPRETER",
    });
  }

  setEnvironmentValue(childEnvironment, "SystemRoot", systemRoot);
  setEnvironmentValue(childEnvironment, "ComSpec", executablePath);
  return { executablePath, systemRoot };
}
