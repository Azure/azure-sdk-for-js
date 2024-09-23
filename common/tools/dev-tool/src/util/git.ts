// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { spawn } from "node:child_process";
import { tmpdir } from "node:os";
import path from "node:path";

/**
 * Uses the git command line to ask whether a path has any tracked, unstaged changes (if they would appear in a git
 * diff).
 *
 * Equivalent to `git diff --quiet HEAD -- <path>`.
 *
 * @param treePath - path to a tree to test for a diff (relative or absolute)
 * @returns true if there are any changes to any tracked files
 */
export function hasDiff(treePath: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    if (treePath.startsWith(tmpdir())) {
      resolve(false);
    } else {
      const command = spawn("git", [
        "diff",
        "--quiet",
        "HEAD",
        "--",
        path.resolve(process.cwd(), treePath),
      ]);

      // git diff --quiet returns nonzero if a diff exists.
      command.on("exit", (code) => {
        resolve(code !== 0);
      });
      command.on("error", reject);
    }
  });
}

/**
 * Uses the git command line to commit changes to all tracked files.
 *
 * Equivalent to `git commit -a -m <message>`.
 *
 * @param message - commit message
 */
export function commitAll(message: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const command = spawn("git", ["commit", "-a", "-m", message], {
      stdio: "inherit",
    });

    command.on("exit", (code) => {
      return code === 0 ? resolve() : reject("git exited nonzero");
    });
    command.on("error", reject);
  });
}

/**
 * Uses the git command line to add a path to the index.
 *
 * Equivalent to `git add <path>`.
 *
 * @param paths - paths to add to the index (relative or absolute)
 */
export function add(...paths: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const command = spawn("git", ["add", ...paths], {
      stdio: "inherit",
    });

    command.on("exit", (code) => {
      return code === 0 ? resolve() : reject("git exited nonzero");
    });
    command.on("error", reject);
  });
}

/**
 * Uses the git command line to retrieve a configuration item.
 *
 * Equivalent to `git config --get <key>`.
 *
 * @param key - configuration key
 * @param options - options for the command
 * @returns configuration value or undefined if the key is not set
 */
export function getConfig(
  key: string,
  options: { global?: boolean } = {},
): Promise<string | undefined> {
  return new Promise((resolve, reject) => {
    const globalArg = options.global ? ["--global"] : [];
    const command = spawn("git", ["config", ...globalArg, "--get", key]);

    let output = "";
    command.stdout.on("data", (data) => (output += data.toString()));
    command.on("exit", (code) => {
      return code === 0 ? resolve(output.trim()) : resolve(undefined);
    });
    command.on("error", reject);
  });
}

export function checkout(name: string, options: { create?: boolean } = {}): Promise<void> {
  return new Promise((resolve, reject) => {
    const createArg = options.create ? ["-b"] : [];
    const command = spawn("git", ["checkout", ...createArg, name], {
      stdio: "inherit",
    });

    command.on("exit", (code) => {
      return code === 0 ? resolve() : reject("git exited nonzero");
    });
    command.on("error", reject);
  });
}

export function currentBranch(): Promise<string> {
  return new Promise((resolve, reject) => {
    const command = spawn("git", ["rev-parse", "--abbrev-ref", "HEAD"]);

    let output = "";
    command.stdout.on("data", (data) => (output += data.toString()));
    command.on("exit", (code) => {
      return code === 0 ? resolve(output.trim()) : reject("git exited nonzero");
    });
    command.on("error", reject);
  });
}
