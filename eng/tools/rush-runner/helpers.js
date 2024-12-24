// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// @ts-check

import * as fs from "node:fs";
import * as path from "node:path";

/** @type {Record<"core"|"test-utils"|"identity", string[]>} */
export const reducedDependencyTestMatrix = {
  core: [
    "@azure-rest/synapse-access-control",
    "@azure/arm-resources",
    "@azure/identity",
    "@azure/service-bus",
    "@azure/template",
  ],
  "test-utils": [
    "@azure-tests/perf-storage-blob",
    "@azure/arm-eventgrid",
    "@azure/ai-text-analytics",
    "@azure/identity",
    "@azure/template",
  ],
  identity: [
    "@azure-tests/perf-storage-blob",
    "@azure/ai-text-analytics",
    "@azure/arm-resources",
    "@azure/identity-cache-persistence",
    "@azure/identity-vscode",
    "@azure/storage-blob",
    "@azure/template",
  ],
};

/** @type {string[]} */
const restrictedToPackages = [
  "@azure/abort-controller",
  "@azure/core-amqp",
  "@azure/core-auth",
  "@azure/core-client",
  "@azure/core-http-compat",
  "@azure/core-lro",
  "@azure/core-paging",
  "@azure/core-rest-pipeline",
  "@azure/core-sse",
  "@azure/core-tracing",
  "@azure/core-util",
  "@azure/core-xml",
  "@azure/logger",
  "@azure-rest/core-client",
  "@typespec/ts-http-runtime",
  "@azure/identity",
  "@azure/arm-resources",
  "@azure-tools/test-perf",
  "@azure-tools/test-recorder",
  "@azure-tools/test-credential",
  "@azure-tools/test-utils",
  "@azure-tools/test-utils-vitest",
];

/**
 * Helper function that determines the rush command flag to use based on each individual package name for the 'build' check.
 *
 * If the targeted package is one of the restricted packages with a ton of dependents, we only want to run that package
 * and not all of its dependents.
 * @param {string[]} packageNames - An array of strings containing the packages names to run the action on.
 * @param {string[]} actionComponents - An array of strings containing the packages names to run the action on.
 */
export const getDirectionMappedPackages = (packageNames, actionComponents) => {
  const mappedPackages = [];

  for (const packageName of packageNames) {
    // Build command without any additional option should build the project and downstream
    // If service is configured to run only a set of downstream projects then build all projects leading to them to support testing
    // If the package is a core package, azure-identity or arm-resources then build only the package,
    // otherwise build the package and all its dependents
    var rushCommandFlag = "--impacted-by";

    if (restrictedToPackages.includes(packageName)) {
      // if this is one of our restricted packages with a ton of deps, make it targeted
      // as including all dependents will be too much
      rushCommandFlag = "--to";
    } else if (actionComponents.length == 1) {
      // else we are building the project and its dependents
      rushCommandFlag = "--from";
    }

    mappedPackages.push([rushCommandFlag, packageName]);
  }

  return mappedPackages;
};

/**
 * Returns an array of full paths to package.json files under a directory
 *
 * @param {string} searchDir - directory to search
 */
const getPackageJSONs = (searchDir) => {
  // This gets all the directories with package.json at the `sdk/<service>/<service-sdk>` level excluding "arm-" packages
  const sdkDirectories = fs
    .readdirSync(searchDir)
    .map((f) => path.join(searchDir, f, "package.json")); // turn potential directory names into package.json paths

  // This gets all the directories with package.json at the `sdk/<service>/<service-sdk>/perf-tests` level excluding "-track-1" perf test packages
  let perfTestDirectories = [];
  const searchPerfTestDir = path.join(searchDir, "perf-tests");
  if (fs.existsSync(searchPerfTestDir)) {
    perfTestDirectories = fs
      .readdirSync(searchPerfTestDir)
      .filter((f) => !f.endsWith("-track-1")) // exclude libraries ending with "-track-1" (perf test projects)
      .map((f) => path.join(searchPerfTestDir, f, "package.json")); // turn potential directory names into package.json paths
  }

  return sdkDirectories.concat(perfTestDirectories).filter((f) => fs.existsSync(f)); // only keep paths for files that actually exist
};

/**
 * Returns package names and package dirs arrays
 *
 * @param {string} baseDir -
 * @param {string[]} serviceDirs -
 * @param {string} artifactNames -
 */
export const getServicePackages = (baseDir, serviceDirs, artifactNames) => {
  const packageNames = [];
  const packageDirs = [];
  let validSdkTypes = ["client", "mgmt", "perf-test", "utility"]; // valid "sdk-type"s that we are looking for, to be able to apply rush-runner jobs on
  const artifacts = artifactNames.split(",");
  for (const serviceDir of serviceDirs) {
    const searchDir = path.resolve(path.join(baseDir, "sdk", serviceDir));
    const packageJSONs = getPackageJSONs(searchDir);
    for (const filePath of packageJSONs) {
      const contents = JSON.parse(fs.readFileSync(filePath, "utf8"));
      const artifactName = contents.name.replace("@", "").replace("/", "-");
      if (
        validSdkTypes.includes(contents["sdk-type"]) &&
        (artifactNames.length === 0 || artifacts.includes(artifactName))
      ) {
        packageNames.push(contents.name);
        packageDirs.push(path.dirname(filePath));
      }
    }
  }
  return {packageNames, packageDirs};
};
