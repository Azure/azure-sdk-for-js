// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// @ts-check

import { spawnSync } from "node:child_process";

/**
 * Helper function to spawn a command
 *
 * @param {string} cmd - current working directory
 * @param {string} cwd - current working directory
 * @param {string[]} args - rest of arguments
 */
function spawnWithLog(cmd, cwd, ...args) {
  console.log(`Executing: "${cmd} ${args.join(" ")}" in ${cwd}\n\n`);
  const proc = spawnSync(cmd, args, { cwd, stdio: "inherit" });
  console.log(`\n\n${cmd} exited with code ${proc.status} `);

  return proc.status ?? 1;
}

/**
 * Helper function to spawn npx to run programs
 *
 * @param {string} cwd - current working directory
 * @param {string[]} args - rest of arguments
 */
export function spawnNpx(cwd, ...args) {
  return spawnWithLog("npx", cwd, ...args);
}

/**
 * Helper function to spawn npm to run programs
 *
 * @param {string} cwd - current working directory
 * @param {string[]} args - rest of arguments
 */
export function spawnNpm(cwd, ...args) {
  return spawnWithLog("npm", cwd, ...args);
}

/**
 * Helper function to spawn npx to run programs and return the output
 *
 * @param {string} cwd - current working directory
 * @param {string[]} args - rest of arguments
 * @returns {string} - output of the command
 */
export function spawnNpxWithOutput(cwd, ...args) {
  console.log(`Executing: "npx ${args.join(" ")}" in ${cwd}\n\n`);
  const proc = spawnSync("npx", args, { cwd, stdio: "pipe" });

  if (proc.error) {
    throw new Error(`Error executing command: ${proc.error.message}`);
  }

  const output = proc.stdout.toString();
  console.log(`\n\nNpx exited with code ${proc.status}`);

  return output;
}
