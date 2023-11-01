// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Syntax:
 *    Run the following command from `common/tools` folder:
 *    node generate-package-for-commit.js <commit> <service-folder> <package-name>
 * 
 * Example:
 *    node generate-package-for-commit.js 09111131ef090ce9d93b218525d13a98bcbb7e87 eventhub event-hubs
 */
const { spawnSync } = require("child_process");
const path = require("path");

function spawn(command) {
  const ret = spawnSync(command, { shell: true, stdio: "inherit" });

  if (ret.status !== 0) {
    throw new Error(`${command} failed with exit code ${ret.status}`);
  }
}
const gitCheckout = `git checkout ${process.argv[2]}`;
const serviceDir = process.argv[3];
const packageDir = process.argv[4];
const navigateToPackage = `cd ${path.resolve("..", "..", "sdk", serviceDir, packageDir)}`;
const rushUpdate = `rush update`;
const buildPackage = `rush build -t .`;
const rushxPack = `rushx pack`;

console.log(`\nGetting package...`);
spawn(`${gitCheckout} && ${navigateToPackage} && ${rushUpdate} && ${buildPackage} && ${rushxPack}`);
