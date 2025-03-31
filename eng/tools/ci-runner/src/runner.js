// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// @ts-check

import { spawnNpx, spawnNpmRun } from "./spawn.js";
import { getBaseDir } from "./env.js";
import { join as pathJoin } from "node:path";
import { runTestProxyRestore } from "./testProxyRestore.js";

/**
 * Helper to run a global turbo command
 * @param {string} action - which action to execute
 * @param {string[]} runParams - what parameters to pass
 */
export function runGlobalAction(action, runParams) {
  return spawnNpx(getBaseDir(), "turbo", "run", action, ...runParams);
}

/**
 * Helper function to invoke the run logic split up by direction.
 *
 * @param {string} action - which action to execute
 * @param {string[]} filteredPackages - Any array of strings containing ["direction packageName"...]
 * @param {string[]} extraParams - what parameters to pass
 * @param {boolean} ciFlag - whether it is in CI
 */
export function runAllWithDirection(action, filteredPackages, extraParams, ciFlag) {
  console.dir({
    action,
    label: `runAllWithDirection - 1`,
    filteredPackages,
  });

  // Restore assets for packages that are being 'unit-test'-ed in the CI pipeline
  if (
    // 1. eng/tools/ci-runner/index.js is running in CI: "--ci" flag is set
    // Example: node eng/tools/ci-runner/index.js unit-test:node servicebus template -packages "azure-service-bus,azure-template" --ci --concurrency=100% -v
    ciFlag &&
    // 2. Ensure not in "live" or "record" mode (run only in playback mode)
    !["live", "record"].includes(process.env.TEST_MODE) &&
    // 3. Ensure the action is either 'unit-test:node' or 'unit-test:browser' (unit tests)
    ["unit-test:node", "unit-test:browser"].includes(action)
  ) {
    console.log(`TODO: can we still find a way to list packages?`);

    // Get the list of packages to run the action on
    let listCommandOutput = "";
    try {
      //TODO: find out list of packages to run unit tests
    } catch (error) {
      console.error("Error running list command:", error);
    }

    if (listCommandOutput) {
      // Parse the output to get package names
      const packages = parsePackageNames(listCommandOutput);

      // Run test-proxy restore for the parsed packages
      runTestProxyRestore(packages);
    }
  }

  return spawnNpx(getBaseDir(), "turbo", "run", action, ...filteredPackages, ...extraParams);
}

/**
 * Helper function to invoke `npm run` in the specified package folders.
 *
 * @param {string} action - which action to execute
 * @param {string[]} packageDirs - An array of package folder paths
 * @param { (dir: string) => void} [onError] - An error callback when a command fails in a directory
 */
export function runInPackageDirs(action, packageDirs, onError) {
  let exitCode = 0;
  for (const packageDir of packageDirs) {
    let dirExitCode = spawnNpmRun(packageDir, action);
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
  const lines = rushListOutput.split("\n"); // Split the output into lines

  for (const line of lines) {
    const trimmedLine = line.trim(); // Trim whitespace
    if (trimmedLine.startsWith("@azure")) {
      // Assuming package names start with '@azure'
      packageNames.push(trimmedLine);
    }
  }

  return packageNames;
}
