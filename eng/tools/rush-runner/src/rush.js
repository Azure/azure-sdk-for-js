// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// @ts-check

import { spawnNode } from "./spawn.js";
import { getBaseDir } from "./env.js";
import { join as pathJoin } from "node:path";

/**
 * Helper to run a global rush command
 * @param {string} action - which action to execute
 * @param {string[]} rushParams - what parameters to pass to rush
 */
export function rushGlobalAction(action, rushParams) {
  return spawnNode(getBaseDir(), "common/scripts/install-run-rush.js", action, ...rushParams);
}

/**
 * Helper function to provide the rush logic that is used frequently below
 * @param {string} action - which action to execute
 * @param {string} direction - which kind of rush tree selector to run (either "--from" or "--to")
 * @param {string[]} packages - the names of the packages to run the action on
 * @param {string[]} rushParams - what parameters to pass to rush
 */
export function rushRunAll(action, direction, packages, rushParams) {
  const params = packages.flatMap((p) => [direction, p]);
  return spawnNode(
    getBaseDir(),
    "common/scripts/install-run-rush.js",
    action,
    ...params,
    ...rushParams,
  );
}

/**
 * Helper function to invoke the rush logic split up by direction.
 *
 * @param {string} action - which action to execute
 * @param {string[][]} packagesWithDirection - Any array of strings containing ["direction packageName"...]
 * @param {string[]} rushParams - what parameters to pass to rush
 */
export function rushRunAllWithDirection(action, packagesWithDirection, rushParams) {
  const invocation = packagesWithDirection.flatMap(([direction, packageName]) => [
    direction,
    packageName,
  ]);
  console.dir({
    l: `rushRunAllWithDirection - 1`,
    packagesWithDirection,
    invocation,
  });

  return spawnNode(
    getBaseDir(),
    "common/scripts/install-run-rush.js",
    action,
    ...invocation,
    ...rushParams,
  );
}

/**
 * Helper function to invoke rushx in the specified package folders.
 *
 * @param {string} action - which action to execute
 * @param {string[]} packageDirs - An array of package folder paths
 * @param { (dir: string) => void} [onError] - An error callback when a command fails in a directory
 */
export function runRushInPackageDirs(action, packageDirs, onError) {
  const rushx_runner_path = pathJoin(getBaseDir(), "common/scripts/install-run-rushx.js");
  let exitCode = 0;
  for (const packageDir of packageDirs) {
    let dirExitCode = spawnNode(packageDir, rushx_runner_path, action);
    if (dirExitCode !== 0 && onError) {
      onError(packageDir);
    }
    exitCode = exitCode || dirExitCode;
  }
  return exitCode;
}
