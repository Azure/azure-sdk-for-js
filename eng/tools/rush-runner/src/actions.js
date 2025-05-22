// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// @ts-check

import {
  getDirectionMappedPackages,
  getServicePackages,
  tryGetPkgRelativePath,
} from "./helpers.js";
import {
  rushRunAll,
  rushRunAllWithDirection,
  runRushInPackageDirs,
  rushGlobalAction,
} from "./rush.js";

/**
 *
 * @param {string} action - the command being performed
 * @param {string[]} serviceDirs - list of service directories impacted
 * @param {string[]} rushParams - commandline flags to pass directly to rush
 * @param {string} artifactNames - package names to filter to
 * @returns
 */
export function executeActions(action, serviceDirs, rushParams, artifactNames, ciFlag) {
  const actionComponents = action.toLowerCase().split(":");

  console.log(`Packages to build: ${artifactNames}`);
  const { packageNames, packageDirs } = getServicePackages(serviceDirs, artifactNames);
  console.log(`Packages eligible to run rush task: ${packageNames}`);

  let exitCode = 0;
  if (serviceDirs.length === 0) {
    exitCode = rushGlobalAction(action, rushParams);
  } else {
    switch (actionComponents[0]) {
      case "build":
      case "test":
        exitCode = rushRunAllWithDirection(
          action,
          getDirectionMappedPackages(packageNames, action, serviceDirs),
          rushParams,
          ciFlag
        );
        break;

      case "lint":
      case "update-snippets":
        exitCode = runRushInPackageDirs(action, packageDirs);
        break;
      case "check-format":
        exitCode = runRushInPackageDirs(action, packageDirs, (packageDir) => {
          console.log(
            `\nInvoke "rushx format" inside ${tryGetPkgRelativePath(packageDir)} to fix formatting\n`,
          );
        });
        break;

      default:
        exitCode = rushRunAll(action, "--to", packageNames, rushParams);
        break;
    }
  }

  return exitCode;
}
