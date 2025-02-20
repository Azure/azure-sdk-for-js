// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// @ts-check

import { spawnSync } from "node:child_process";

/**
 * Helper function to spawn NodeJS programs
 *
 * @param {string} cwd - current working directory
 * @param {string[]} args - rest of arguments
 */
export function spawnNode(cwd, ...args) {
  console.log(`Executing: "node ${args.join(" ")}" in ${cwd}\n\n`);
  const proc = spawnSync("node", args, { cwd, stdio: "inherit" });
  console.log(`\n\nNode process exited with code ${proc.status} `);

  return proc.status ?? 1;
}

/**
 * Helper function to spawn NodeJS programs and return the output
 *
 * @param {string} cwd - current working directory
 * @param {string[]} args - rest of arguments
 * @returns {string} - output of the command
 */
export function spawnNodeWithOutput(cwd, ...args) {
  console.log(`Executing: "node ${args.join(" ")}" in ${cwd}\n\n`);
  const proc = spawnSync("node", args, { cwd, stdio: "pipe" });

  if (proc.error) {
    throw new Error(`Error executing command: ${proc.error.message}`);
  }

  const output = proc.stdout.toString();
  console.log(`\n\nNode process exited with code ${proc.status}`);

  return output;
}
