// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// @ts-check

import * as path from "node:path";
import * as process from "node:process";
import { spawnSync } from "node:child_process";
import {
  getDirectionMappedPackages,
  getServicePackages,
  reducedDependencyTestMatrix,
} from "./helpers.js";

const parseArgs = () => {
  if (
    process.argv.length < 3 ||
    process.argv.some((a) => ["-h", "--help"].includes(a.toLowerCase()))
  ) {
    console.error("Usage: rush-runner/index.js <action> [<servicename>...] [args...]");
    console.error("Example: rush-runner/index.js build keyvault storage --verbose");
    process.exit(1);
  }

  let inFlags = false;
  let isPackageFilter = false;
  let artifactNames = "";
  const services = [],
    flags = [];
  const [scriptPath, action, ...givenArgs] = process.argv.slice(1);
  const baseDir = path.resolve(`${path.dirname(scriptPath)}/../../..`);

  for (const arg of givenArgs) {
    if (arg === "-packages") {
      isPackageFilter = true;
      continue;
    } else if (!inFlags && arg.startsWith("-")) {
      inFlags = true;
    }

    if (inFlags) {
      flags.push(arg);
    } else if (isPackageFilter) {
      artifactNames = arg;
      isPackageFilter = false;
    } else {
      if (arg && arg !== "*") {
        // exclude empty value and special value "*" meaning all libraries
        services.push(...arg.split(" "));
      }
    }
  }

  return { baseDir, action, services, flags, artifactNames };
};

/**
 * Helper function to spawn NodeJS programs
 *
 * @param {string} cwd - current working directory
 * @param {string[]} args - rest of arguments
 */
const spawnNode = (cwd, ...args) => {
  console.log(`Executing: "node ${args.join(" ")}" in ${cwd}\n\n`);
  const proc = spawnSync("node", args, { cwd, stdio: "inherit" });
  console.log(`\n\nNode process exited with code ${proc.status} `);

  return proc.status ?? 1;
};

/**
 * flatMap
 *
 * @param {string[]} arr - string array
 * @param {(a: string) => string[]} f - function
 */
const flatMap = (arr, f) => {
  const result = arr.map(f);
  return [].concat(...result);
};

const { baseDir, action, services: serviceDirs, flags: rushParams, artifactNames } = parseArgs();
const actionComponents = action.toLowerCase().split(":");

console.log(`Packages to build: ${artifactNames}`);
const { packageNames, packageDirs } = getServicePackages(baseDir, serviceDirs, artifactNames);
console.log(`Packages eligible to run rush task: ${packageNames}`);

/**
 * Helper function to provide the rush logic that is used frequently below
 *
 * @param {string} direction - which kind of rush tree selector to run (either "--from" or "--to")
 * @param {string[]} packages - the names of the packages to run the action on
 */
function rushRunAll(direction, packages) {
  const params = flatMap(packages, (p) => [direction, p]);
  return spawnNode(baseDir, "common/scripts/install-run-rush.js", action, ...params, ...rushParams);
}

/**
 * Helper function to invoke the rush logic split up by direction.
 *
 * @param {string[][]} packagesWithDirection - Any array of strings containing ["direction packageName"...]
 */
function rushRunAllWithDirection(packagesWithDirection) {
  const invocation = packagesWithDirection.flatMap(([direction, packageName]) => [
    direction,
    packageName,
  ]);
  console.dir({
    l: `rushRunAllWithDirection - 1`,
    packagesWithDirection,
    invocation,
  });
  spawnNode(baseDir, "common/scripts/install-run-rush.js", action, ...invocation, ...rushParams);

  return spawnNode(
    baseDir,
    "common/scripts/install-run-rush.js",
    action,
    ...invocation,
    ...rushParams,
  );
}

/**
 * Helper function to get the relative path of a package directory from an absolute
 * one
 *
 * @param {string} absolutePath absolute path to a package
 * @returns either the relative path of the package starting from the "sdk" directory
 *          or the just the absolute path itself if "sdk" if not found
 */
function tryGetPkgRelativePath(absolutePath) {
  const sdkDirectoryPathStartIndex = absolutePath.lastIndexOf("sdk");
  return sdkDirectoryPathStartIndex === -1
    ? absolutePath
    : absolutePath.substring(sdkDirectoryPathStartIndex);
}

let isReducedTestScopeEnabled = false;

for (const dir of serviceDirs) {
  if (reducedDependencyTestMatrix[dir]) {
    isReducedTestScopeEnabled = true;
    // If a service is configured to have reduced test matrix then run rush for those reduced projects
    console.log(`Found reduced test matrix configured for ${serviceDirs}.`);
    packageNames.push(...reducedDependencyTestMatrix[dir]);
  }
}

const packagesWithDirection = getDirectionMappedPackages(packageNames, actionComponents);
const rushx_runner_path = path.join(baseDir, "common/scripts/install-run-rushx.js");
let exitCode = 0;
if (serviceDirs.length === 0) {
  exitCode = spawnNode(baseDir, "common/scripts/install-run-rush.js", action, ...rushParams);
} else {
  switch (actionComponents[0]) {
    case "build":
      exitCode = rushRunAllWithDirection(packagesWithDirection);
      break;

    case "test":
    case "unit-test":
    case "integration-test":
      let rushCommandFlag = "--impacted-by";

      if (isReducedTestScopeEnabled || serviceDirs.length > 1) {
        // If a service is configured to have reduced test matrix then run rush test only for those projects
        rushCommandFlag = "--only";
      }

      exitCode = rushRunAll(rushCommandFlag, packageNames);
      break;

    case "lint":
      for (const packageDir of packageDirs) {
        exitCode = spawnNode(packageDir, rushx_runner_path, action);
      }
      break;
    case "check-format":
      for (const packageDir of packageDirs) {
        exitCode = spawnNode(packageDir, rushx_runner_path, action);
        if (exitCode !== 0) {
          console.log(
            `\nInvoke "rushx format" inside ${tryGetPkgRelativePath(packageDir)} to fix formatting\n`,
          );
        }
      }
      break;

    default:
      exitCode = rushRunAll("--to", packageNames);
      break;
  }
}

process.exit(exitCode);
