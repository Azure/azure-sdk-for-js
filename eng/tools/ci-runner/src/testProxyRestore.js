// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// @ts-check
import { join as pathJoin } from "node:path";
import { execSync } from "node:child_process";
import { getBaseDir } from "./env.js";
import { existsSync, readFileSync } from "node:fs";

/**
 * Runs test-proxy restore for the given packages.
 *
 * @param {{ path: string; name: string;}[]} packages - An array of package names to restore.
 */
export function runTestProxyRestore(packages) {
  // Get the path to the proxy executable from the environment variable
  const proxyExe = process.env.PROXY_EXE; // Set in the pipeline before this script is run
  if (!proxyExe) {
    console.error("PROXY_EXE environment variable is not set");
    return;
  }

  console.log("Starting test-proxy restore for packages:", packages);
  const completedPackages = [];
  for (const pkg of packages) {
    // Get the directory of the target package
    const targetPackageDir = pkg.path;
    // Path to the assets.json file in the target package directory
    const assetsJsonPath = pathJoin(targetPackageDir, "assets.json");

    // Check if the assets.json file exists
    if (existsSync(assetsJsonPath)) {
      try {
        console.log(`Executing test-proxy restore for ${pkg.name}`);
        execSync(`${proxyExe} restore -a "assets.json"`, {
          cwd: targetPackageDir,
          stdio: "inherit",
        });
        completedPackages.push(pkg.name);
      } catch (error) {
        console.error(`Error executing test-proxy restore: ${error.message}`);
      }
    }
  }
  console.log("Completed test-proxy restore for the packages:", completedPackages);
}
