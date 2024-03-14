// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { SpawnOptions, spawn } from "node:child_process";

export interface RunOptions extends SpawnOptions {
  captureOutput?: boolean;
}

/**
 * Run the given command as a child process.
 *
 * @param command - the command to run. If an array of strings is passed, the first element will be the executable to run and the remaining elements will be the arguments. If a string is passed, it will be split on space (' ') and
 *                  then treated the same as a string array (quoting etc will not work for escaping).
 */
export async function run(command: string[] | string): Promise<void>;

/**
 * Run the given command as a child process.
 *
 * @param command - the command to run. If an array of strings is passed, the first element will be the executable to run and the remaining elements will be the arguments. If a string is passed, it will be split on space (' ') and
 *                  then treated the same as a string array (quoting etc will not work for escaping).
 * @param options - options passed to `spawn`, plus additional options: if `captureOutput` is true, the output of the command will be returned as a string.
 */
export async function run(
  command: string[] | string,
  options: RunOptions & { captureOutput: true },
): Promise<string>;

/**
 * Run the given command as a child process.
 *
 * @param command - the command to run. If an array of strings is passed, the first element will be the executable to run and the remaining elements will be the arguments. If a string is passed, it will be split on space (' ') and
 *                  then treated the same as a string array (quoting etc will not work for escaping).
 * @param options - options passed to `spawn`, plus additional options: if `captureOutput` is false, output will not be captured and returned.
 */
export async function run(
  command: string[] | string,
  options: RunOptions & { captureOutput?: false },
): Promise<void>;

export async function run(
  command: string[] | string,
  options: RunOptions = {},
): Promise<string | void> {
  const [executable, ...argv] = typeof command === "string" ? command.split(" ") : command;

  let output = "";

  await new Promise((resolve, reject) => {
    const proc = spawn(executable, argv, options);

    proc.stderr?.setEncoding("utf8");
    proc.on("exit", (exitCode, signal) => {
      if (exitCode === null) {
        reject(new Error(`subprocess exited with signal ${signal}`));
      } else if (exitCode === 0) {
        resolve(output);
      } else {
        reject(new Error(`subprocess exited with exit code ${exitCode}.\nOutput:\n${output}`));
      }
    });

    proc.on("error", reject);

    if (options.captureOutput) {
      proc.stdout?.on("data", (data) => {
        output += data;
      });
      proc.stderr?.on("data", (data) => {
        output += data;
      });
    }
  });

  if (options.captureOutput) {
    return output;
  }
}
