// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// @ts-check

import { spawnPnpm, spawnPnpmRun, spawnPnpmWithOutput } from "./spawn.js";
import { getBaseDir } from "./env.js";
import { join as pathJoin } from "node:path";
import { runTestProxyRestore } from "./testProxyRestore.js";

/**
 * Helper to run a global pnpm command
 * @param {string} action - which action to execute
 * @param {string[]} runParams - what parameters to pass
 */
export function runGlobalAction(action, runParams) {
  return spawnPnpm(getBaseDir(), action, ...runParams);
}

/**
 * Helper function to invoke the run logic split up by direction.
 *
 * @param {string} action - which action to execute
 * @param {string[]} filters - Any array of strings containing ["direction packageName"...]
 * @param {string[]} extraParams - what parameters to pass
 * @param {boolean} ciFlag - whether it is in CI
 */
export function runAllWithDirection(action, filters, extraParams, ciFlag) {
  console.dir({
    action,
    label: `runAllWithDirection - 1`,
    filteredPackages: filters,
  });

  const packages = filters.flatMap((pkg) => {
    return ["--filter", pkg];
  });

  // Restore assets for packages that are being 'unit-test'-ed in the CI pipeline
  if (
    // 1. eng/tools/ci-runner/index.js is running in CI: "--ci" flag is set
    // Example: node eng/tools/ci-runner/index.js test:node servicebus template -packages "azure-service-bus,azure-template" --ci
    ciFlag &&
    // 2. Ensure not in "live" or "record" mode (run only in playback mode)
    !["live", "record"].includes(process.env.TEST_MODE) &&
    // 3. Ensure the action is either 'test:node' or 'test:browser' (unit tests)
    ["test:node", "test:browser"].includes(action)
  ) {
    console.log(`TODO: can we still find a way to list packages?`);

    // Get the list of packages to run the action on
    let listCommandOutput = spawnPnpmWithOutput(
      getBaseDir(),
      "list",
      "--json",
      "--depth",
      "-1",
      ...packages,
    );

    try {
      //TODO: find out list of packages to run unit tests
    } catch (error) {
      console.error("Error running list command:", error);
    }

    if (listCommandOutput) {
      // Parse the output to get package names
      const parsed = JSON.parse(listCommandOutput);
      // Run test-proxy restore for the parsed packages
      runTestProxyRestore(parsed);
    }
  }
  return spawnPnpm(getBaseDir(), action, ...packages, ...extraParams);
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
    let dirExitCode = spawnPnpmRun(packageDir, action);
    if (dirExitCode !== 0 && onError) {
      onError(packageDir);
    }
    exitCode = exitCode || dirExitCode;
  }
  return exitCode;
}
