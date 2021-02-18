// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Track 1 perf tests are not maintained through rush in this repository.
 * 
 * This helper script is meant to be used to "build" and "install" 
 * the `@azure/test-utils-perfstress` package in the track-1 perf-test projects
 * so that the track 1 perf tests can leverage the perf framework.
 * 
 * Additionally, this runs `npm install` in the track-1 perf test projects.
 */
const { spawnSync } = require("child_process");
const path = require("path");

function spawn(command) {
  const ret = spawnSync(command, { shell: true, stdio: "inherit" });

  if (ret.status !== 0) {
    throw new Error(`${command} failed with exit code ${ret.status}`);
  }
}

const navigateToPerfStressFolder = `cd ${path.resolve(
  "..",
  "..",
  "..",
  "test-utils",
  "perfstress"
)}`;
const buildPerfStressPackage = `rush build -t test-utils-perfstress`;
const rushxPack = `rushx pack`;

console.log(`\nGetting perfstress package...`);
spawn(`${navigateToPerfStressFolder} && ${buildPerfStressPackage} && ${rushxPack}`);

console.log(`\nRunning "npm install"...`);
spawn(`npm install`);
