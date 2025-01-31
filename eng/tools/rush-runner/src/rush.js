// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// @ts-check

import { spawnNode, spawnNodeWithOutput } from "./spawn.js";
import { getBaseDir } from "./env.js";
import { join as pathJoin } from "node:path";
import { getRushSpec } from "@azure-tools/eng-package-utils";
import { execSync } from "node:child_process";
import { existsSync } from "node:fs";

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
export async function rushRunAllWithDirection(action, packagesWithDirection, rushParams) {
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
    // 1. Check if running in Public CI (process.env["BUILD_BUILDNUMBER"] is set)
    process.env["BUILD_BUILDNUMBER"]
    // 2. Ensure not in "live" or "record" mode (run only in playback mode)
    && (!["live", "record"].includes(process.env.TEST_MODE))
    // 3. Ensure the action is either 'unit-test:node' or 'unit-test:browser' (unit tests)
    && (['unit-test:node', 'unit-test:browser'].includes(action))
  ) {
    console.log(`Running rush list with ${invocation.join(" ")}`);

    // Get the list of packages to run the action on
    const output = spawnNodeWithOutput(
      getBaseDir(),
      "common/scripts/install-run-rush.js",
      "list",
      ...invocation,
    );

    // Parse the output to get package names
    const packages = parsePackageNames(output);

    // Run test-proxy restore for the parsed packages
    await runTestProxyRestore(packages);
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
 * Parses the output of the rush list command to extract package names.
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

/**
 * Runs test-proxy restore for the given packages.
 *
 * @param {string[]} packages - An array of package names to restore.
 */
async function runTestProxyRestore(packages) {
  console.log('Starting test-proxy restore for packages:', packages);
  const completedPackages = [];
  for (const packageName of packages) {
    const rushSpec = await getRushSpec(getBaseDir());

    // Find the target package
    const targetPackage = rushSpec.projects.find(
      packageSpec => packageSpec.packageName == packageName
    );

    // Get the directory of the target package
    const targetPackageDir = pathJoin(getBaseDir(), targetPackage.projectFolder);

    // Path to the assets.json file in the target package directory
    const assetsJsonPath = pathJoin(targetPackageDir, 'assets.json');

    // Check if the assets.json file exists
    if (existsSync(assetsJsonPath)) {
      try {
        // Get the path to the proxy executable from the environment variable
        const proxyExe = process.env.PROXY_EXE; // Set in the pipeline before this script is run
        if (!proxyExe) {
          console.error('PROXY_EXE environment variable is not set');
          return;
        }
        console.log(`Executing test-proxy restore for ${packageName}`);
        execSync(`${proxyExe} restore -a "assets.json"`, { cwd: targetPackageDir, stdio: 'inherit' });
        completedPackages.push(packageName);
      } catch (error) {
        console.error(`Error executing test-proxy restore: ${error.message}`);
      }
    }
  }
  console.log('Completed test-proxy restore for the packages:', completedPackages);
}
