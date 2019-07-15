// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
// See the @microsoft/rush package's LICENSE file for license information.

// This script searches for package.json files recursively under a given path
// excluding packages under a node_modules folder and opens them to determine
// whether they contain a "sdk-archetype" field with the value of "client".
//
// If they do, then the package name is recorded and then after all package.json files
// have been scanned a single string is output using the Azure Pipelines Commands special
// syntax which creates a variable for use within a later stage of the pipeine.
var glob = require("glob");

let logLineCounter = 0;
const log = message => {
  console.log(`select-packages(${logLineCounter++}): ${message}`);
};

log(`Working directory is "${process.cwd()}".`);

let filter = process.argv[2];
log(`Specified glob filter is "${filter}".`);

// This code assumes that in the service directory, packages that we want to publish
// exist only in directories that are immediate children of the service directory.
glob(filter, (err, files) => {
  if (err) {
    log(`An error occured: ${err}`);
    process.exit(1);
  }

  let packageTargets = "";

  if (files) {
    log(`Found ${files.length} packages under service directory.`);

    for (let fileIndex in files) {
      log(`Processing package file ${fileIndex} at "${files[fileIndex]}"`);
      let packageContents = require(files[fileIndex]);

      log(
        `Package name for package ${fileIndex} is "${packageContents.name}".`
      );

      if (packageContents["sdk-type"] == "client") {
        log(
          `Package "${packageContents.name}" has sdk-type of "${
            packageContents["sdk-type"]
          }".`
        );
        packageTargets += `--to "${packageContents.name}" `;
      } else {
        log(
          `Package "${
            packageContents.name
          }" DOES NOT have an sdk-type of "client".`
        );
      }
    }

    log(
      `Finished processing packages. Emitting variable using: ${packageTargets}`
    );

    // Can't use regular logging here because the pattern for Azure Pipelines requires ##vso to be the first chars.
    console.log(
      `##vso[task.setvariable variable=GeneratedPackageTargets]${packageTargets}`
    );

    log(
      `Emitted variable "GeneratedPackageTargets" with content: ${packageTargets}`
    );
  } else {
    log("Did not find any packages under service directory.");
    process.exit(2);
  }

  log("Done!");
});
