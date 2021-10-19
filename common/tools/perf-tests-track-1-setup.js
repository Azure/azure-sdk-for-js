// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Track 1 perf tests are not maintained through rush in this repository.
 *
 * This helper script is meant to be used to "build" and "install"
 * the `@azure/test-utils-perf` package in the track-1 perf-test projects
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

const navigateToPerfFolder = `cd ${path.resolve(
  "..",
  "..",
  "..",
  "test-utils",
  "perf"
)}`;
const buildPerfPackage = `rush build -t test-utils-perf`;
const rushxPack = `rushx pack`;

console.log(`\nGetting perf package...`);
spawn(`${navigateToPerfFolder} && ${buildPerfPackage} && ${rushxPack}`);

console.log(`\nRunning "npm install"...`);
spawn(`npm install`);
