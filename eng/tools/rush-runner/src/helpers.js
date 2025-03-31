// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// @ts-check

import * as fs from "node:fs";
import * as path from "node:path";

import { getBaseDir } from "./env.js";

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
    "@azure/arm-eventgrid",
    "@azure/ai-text-analytics",
    "@azure/identity",
    "@azure/template",
  ],
  identity: [
    "@azure/ai-text-analytics",
    "@azure/arm-resources",
    "@azure/identity-cache-persistence",
    "@azure/identity-vscode",
    "@azure/template",
  ],
};

/** @type {string[]} */
export const restrictedToPackages = [
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
 * Helper function that determines the rush command flag to use based on each individual package name
 *
 * If the targeted package is one of the restricted packages with a ton of dependents, we only want to run that package
 * and not all of its dependents.
 * @param {string[]} packageNames - An array of strings containing the packages names to run the action on.
 * @param {string} action - The action being performed ("build", "build:test", "build:samples", "unit-test:node", "unit-test:browser"
 * @param {string[]} serviceDirs - An array of strings containing the serviceDirs affected
 */
export const getDirectionMappedPackages = (packageNames, action, serviceDirs) => {
  const mappedPackages = [];

  let fullPackageNames = packageNames.slice();

  let isReducedTestScopeEnabled = serviceDirs.length > 1;
  for (const dir of serviceDirs) {
    // reducedDependencyTestMatrix is a little misleading, since if we want to test
    // these projects, we need to make sure they are built first, which requires them impacting
    // the build commands as well
    if (reducedDependencyTestMatrix[dir]) {
      isReducedTestScopeEnabled = true;
      for (const dep of reducedDependencyTestMatrix[dir]) {
        if (!fullPackageNames.includes(dep)) {
          fullPackageNames.push(dep);
        }
      }
    }
  }

  if (action.startsWith("build")) {
    for (const packageName of fullPackageNames) {
      /**  @type {string} */
      let rushCommandFlag;

      if (restrictedToPackages.includes(packageName)) {
        // if this is one of our restricted packages with a ton of deps, make it targeted
        // as including all dependents will be too much
        rushCommandFlag = "--to";
      } else if (action === "build") {
        rushCommandFlag = "--from";
      } else {
        // --impacted-by is only safe if the packages have already been built, since it won't build
        // unrelated dependencies
        rushCommandFlag = "--impacted-by";
      }

      mappedPackages.push([rushCommandFlag, packageName]);
    }
  } else {
    // we are in a test task of some kind
    const rushCommandFlag = isReducedTestScopeEnabled ? "--only" : "--impacted-by";

    mappedPackages.push(...fullPackageNames.map((p) => [rushCommandFlag, p]));
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
 * @param {string[]} serviceDirs -
 * @param {string} artifactNames -
 */
export const getServicePackages = (serviceDirs, artifactNames) => {
  /** @type {string[]} */
  const packageNames = [];
  /** @type {string[]} */
  const packageDirs = [];
  let validSdkTypes = ["client", "mgmt", "perf-test", "utility"]; // valid "sdk-type"s that we are looking for, to be able to apply rush-runner jobs on
  const artifacts = artifactNames.split(",");
  for (const serviceDir of serviceDirs) {
    const searchDir = path.resolve(path.join(getBaseDir(), "sdk", serviceDir));
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

  return { packageNames, packageDirs };
};

/**
 * Helper function to get the relative path of a package directory from an absolute
 * one
 *
 * @param {string} absolutePath absolute path to a package
 * @returns either the relative path of the package starting from the "sdk" directory
 *          or the just the absolute path itself if "sdk" if not found
 */
export function tryGetPkgRelativePath(absolutePath) {
  const sdkDirectoryPathStartIndex = absolutePath.lastIndexOf("sdk");
  return sdkDirectoryPathStartIndex === -1
    ? absolutePath
    : absolutePath.substring(sdkDirectoryPathStartIndex);
}
