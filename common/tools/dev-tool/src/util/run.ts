// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { spawn, type SpawnOptions } from "@azure/core-process";
import { createPrinter } from "./printer.ts";

export interface RunOptions extends SpawnOptions {
  captureOutput?: boolean;

  /**
   * By default a non-zero exit code will cause an exception to be thrown.
   * Set this option to true to not throw in this case.
   */
  captureExitCode?: boolean;
}

export interface RunResult {
  exitCode: number;
}

export interface RunResultWithOutput extends RunResult {
  output: string;
}

const log = createPrinter("run");

/**
 * Run the given command as a child process.
 *
 * @param command - The executable followed by its individual arguments.
 */
export async function run(command: readonly string[]): Promise<RunResult>;

/**
 * Run the given command as a child process.
 *
 * @param command - The executable followed by its individual arguments.
 * @param options - options passed to `spawn`, plus additional options: if `captureOutput` is true, the output of the command will be returned as a string.
 */
export async function run(
  command: readonly string[],
  options: RunOptions & { captureOutput: true },
): Promise<RunResultWithOutput>;

/**
 * Run the given command as a child process.
 *
 * @param command - The executable followed by its individual arguments.
 * @param options - options passed to `spawn`, plus additional options: if `captureOutput` is false, output will not be captured and returned.
 */
export async function run(
  command: readonly string[],
  options: RunOptions & { captureOutput?: false },
): Promise<RunResult>;

export async function run(
  command: readonly string[],
  options: RunOptions = {},
): Promise<RunResult | RunResultWithOutput> {
  const [executable, ...argv] = command;
  if (!executable) {
    throw new Error("A command must include an executable.");
  }

  let output = "";
  const { captureExitCode, captureOutput, ...spawnOptions } = options;

  const exitCode = await new Promise<number>((resolve, reject) => {
    const proc = spawn(executable, argv, spawnOptions);
    log.debug(`Running command: ${[executable, ...argv].join(" ")}`);

    proc.stderr?.setEncoding("utf8");
    proc.on("exit", (exitCode, signal) => {
      if (exitCode === null) {
        if (output) {
          log.warn(output);
        }
        reject(new Error(`subprocess exited with signal ${signal}`));
      } else {
        resolve(exitCode);
      }
    });

    proc.on("error", reject);

    if (captureOutput) {
      proc.stdout?.on("data", (data) => {
        output += data;
      });
      proc.stderr?.on("data", (data) => {
        output += data;
      });
    }
  });

  if (!captureExitCode && exitCode !== 0) {
    if (output) {
      log.warn(output);
    }
    throw new Error(`Process exited with exit code ${exitCode}`);
  }

  if (exitCode !== 0 && output) {
    log.warn(output);
  }
  return { output, exitCode };
}
