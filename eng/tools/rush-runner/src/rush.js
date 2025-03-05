// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// @ts-check

import { spawnNode, spawnNodeWithOutput } from "./spawn.js";
import { getBaseDir } from "./env.js";
import { join as pathJoin } from "node:path";
import { runTestProxyRestore } from "./testProxyRestore.js";

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
export function rushRunAllWithDirection(action, packagesWithDirection, rushParams, ciFlag) {
  const invocation = packagesWithDirection.flatMap(([direction, packageName]) => [
    direction,
    packageName,
  ]);
  console.dir({
    l: `rushRunAllWithDirection - 1`,
    packagesWithDirection,
    invocation,
  });

  // Restore assets for packages that are being 'unit-test'-ed in the CI pipeline
  if (
    // 1. eng/tools/rush-runner/index.js is running in CI: "--ci" flag is set
    // Example: node eng/tools/rush-runner/index.js unit-test:node servicebus template -packages "azure-service-bus,azure-template" --ci --verbose -p max
    ciFlag
    // 2. Ensure not in "live" or "record" mode (run only in playback mode)
    && (!["live", "record"].includes(process.env.TEST_MODE))
    // 3. Ensure the action is either 'unit-test:node' or 'unit-test:browser' (unit tests)
    && (['unit-test:node', 'unit-test:browser'].includes(action))
  ) {
    console.log(`Running rush list with ${invocation.join(" ")}`);

    // Get the list of packages to run the action on
    let listCommandOutput = "";
    try {
      listCommandOutput = spawnNodeWithOutput(
        getBaseDir(),
        "common/scripts/install-run-rush.js",
        "list",
        ...invocation,
      );
    } catch (error) {
      console.error("Error running rush list command:", error);
    }

    if (listCommandOutput) {
      // Parse the output to get package names
      const packages = parsePackageNames(listCommandOutput);

      // Run test-proxy restore for the parsed packages
      runTestProxyRestore(packages);
    }
  }

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

/**
 * Parses the output of the `rush list ...` command to extract package names.
 *
 * @param {string} rushListOutput - The output string from the rush list command.
 * @returns {string[]} - An array of package names that start with '@azure'.
 */
function parsePackageNames(rushListOutput) {
  const packageNames = [];
  const lines = rushListOutput.split('\n'); // Split the output into lines

  for (const line of lines) {
    const trimmedLine = line.trim(); // Trim whitespace
    if (trimmedLine.startsWith('@azure')) { // Assuming package names start with '@azure'
      packageNames.push(trimmedLine);
    }
  }

  return packageNames;
}
