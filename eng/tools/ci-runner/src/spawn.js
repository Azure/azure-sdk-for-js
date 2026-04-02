// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// @ts-check

import { spawnSync } from "node:child_process";

function isWindows() {
  return process.platform === "win32";
}

/**
 * Helper function to spawn a command
 *
 * @param {string} cmd - current working directory
 * @param {string} cwd - current working directory
 * @param {string[]} args - rest of arguments
 */
function spawnWithLog(cmd, cwd, ...args) {
  console.log(`Executing: "${cmd} ${args.join(" ")}" in ${cwd}\n\n`);
  const proc = spawnSync(cmd, args, { cwd, stdio: "inherit", shell: isWindows() });
  console.log(`\n\n${cmd} exited with code ${proc.status} `);

  return proc.status ?? 1;
}

/**
 * Helper function to spawn npx to run programs
 *
 * @param {string} cwd - current working directory
 * @param {string[]} args - rest of arguments
 */
export function spawnPnpm(cwd, ...args) {
  const command = isWindows() ? "pnpm.CMD" : "pnpm";
  return spawnWithLog(command, cwd, ...args);
}

/**
 * Helper function to spawn `npm run` commands
 *
 * @param {string} cwd - current working directory
 * @param {string[]} args - rest of arguments
 */
export function spawnPnpmRun(cwd, ...args) {
  const command = isWindows() ? "pnpm.CMD" : "pnpm";
  return spawnWithLog(command, cwd, "run", ...args);
}

export function spawnPnpmWithOutput(cwd, ...args) {
  const command = isWindows() ? "pnpm.CMD" : "pnpm";
  console.log(`Executing: "${command} ${args.join(" ")}" in ${cwd}\n\n`);
  const proc = spawnSync(command, args, { cwd, stdio: "pipe", shell: isWindows() });

  if (proc.error) {
    throw new Error(`Error executing command: ${proc.error.message}`);
  }

  const output = proc.stdout.toString();
  console.log(`\n\n${command} exited with code ${proc.status}`);

  return output;
}

/**
 * Helper function to spawn git commands and capture output
 *
 * @param {string} cwd - current working directory
 * @param {string[]} args - git arguments
 * @returns {{ status: number, stdout: string, stderr: string }}
 */
export function spawnGitWithOutput(cwd, ...args) {
  console.log(`Executing: "git ${args.join(" ")}" in ${cwd}\n\n`);
  const proc = spawnSync("git", args, { cwd, stdio: "pipe", shell: isWindows() });

  if (proc.error) {
    throw new Error(`Error executing command: ${proc.error.message}`);
  }

  const stdout = proc.stdout.toString();
  const stderr = proc.stderr.toString();
  console.log(`\n\ngit exited with code ${proc.status}`);

  return { status: proc.status ?? 1, stdout, stderr };
}
