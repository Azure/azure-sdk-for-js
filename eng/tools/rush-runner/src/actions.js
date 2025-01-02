// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// @ts-check

import {
  getDirectionMappedPackages,
  getServicePackages,
  reducedDependencyTestMatrix,
  tryGetPkgRelativePath
} from "./helpers.js";
import { parseArgs } from "./args.js";
import { rushRunAll, rushRunAllWithDirection, runRushInPackageDirs, rushGlobalAction } from "./rush.js";

export function executeActions() {
  const { action, services: serviceDirs, flags: rushParams, artifactNames } = parseArgs();
  const actionComponents = action.toLowerCase().split(":");

  console.log(`Packages to build: ${artifactNames}`);
  const { packageNames, packageDirs } = getServicePackages(serviceDirs, artifactNames);
  console.log(`Packages eligible to run rush task: ${packageNames}`);

  let isReducedTestScopeEnabled = false;

  for (const dir of serviceDirs) {
    if (reducedDependencyTestMatrix[dir]) {
      isReducedTestScopeEnabled = true;
      // If a service is configured to have reduced test matrix then run rush for those reduced projects
      console.log(`Found reduced test matrix configured for ${serviceDirs}.`);
      packageNames.push(...reducedDependencyTestMatrix[dir]);
    }
  }

  let exitCode = 0;
  if (serviceDirs.length === 0) {
    exitCode = rushGlobalAction(action, rushParams);
  } else {
    switch (actionComponents[0]) {
      case "build":
        exitCode = rushRunAllWithDirection(action, getDirectionMappedPackages(packageNames, actionComponents), rushParams);
        break;

      case "test":
      case "unit-test":
      case "integration-test":
        let rushCommandFlag = "--impacted-by";

        if (isReducedTestScopeEnabled || serviceDirs.length > 1) {
          // If a service is configured to have reduced test matrix then run rush test only for those projects
          rushCommandFlag = "--only";
        }

        exitCode = rushRunAll(action, rushCommandFlag, packageNames, rushParams);
        break;

      case "lint":
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
