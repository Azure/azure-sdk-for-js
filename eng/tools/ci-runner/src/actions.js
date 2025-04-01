// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// @ts-check

import { getFilteredPackages, getServicePackages, tryGetPkgRelativePath } from "./helpers.js";
import { runAllWithDirection, runInPackageDirs, runGlobalAction } from "./runner.js";

/**
 *
 * @param {string} action - the command being performed
 * @param {string[]} serviceDirs - list of service directories impacted
 * @param {string[]} extraParams - commandline flags to pass
 * @param {string} artifactNames - package names to filter to
 * @returns
 */
export function executeActions(action, serviceDirs, extraParams, artifactNames, ciFlag) {
  console.dir({
    action,
    serviceDirs,
    extraParams,
    artifactNames,
    ciFlag,
    label: "executeActions - 1",
  });
  const actionComponents = action.toLowerCase().split(":");

  console.log(`Packages to build: ${artifactNames}`);
  const { packageNames, packageDirs } = getServicePackages(serviceDirs, artifactNames);
  console.log(`Packages eligible to run task: ${packageNames}`);

  let exitCode = 0;
  if (serviceDirs.length === 0) {
    exitCode = runGlobalAction(action, extraParams);
  } else {
    switch (actionComponents[0]) {
      case "build":
      case "test":
      case "unit-test":
      case "integration-test":
        exitCode = runAllWithDirection(
          action,
          getFilteredPackages(packageNames, action, serviceDirs),
          extraParams,
          ciFlag,
        );
        break;

      case "lint":
        exitCode = runInPackageDirs(action, packageDirs);
        break;
      case "check-format":
        exitCode = runInPackageDirs(action, packageDirs, (packageDir) => {
          console.log(
            `\nInvoke "npm run format" inside ${tryGetPkgRelativePath(packageDir)} to fix formatting\n`,
          );
        });
        break;

      default:
        exitCode = runAllWithDirection(
          action,
          packageNames.map((p) => `${p}...`),
          extraParams,
          ciFlag,
        );
        break;
    }
  }

  return exitCode;
}
