// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// @ts-check

import * as fs from "node:fs";
import * as path from "node:path";
import * as process from "node:process";
import { spawnSync } from "node:child_process";

/** @type {Record<"core"|"test-utils"|"identity", string[]>} */
const reducedDependencyTestMatrix = {
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
        arg.split(" ").forEach((serviceDirectory) => services.push(serviceDirectory));
      }
    }
  }
  return [baseDir, action, services, flags, artifactNames];
};

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
  "@azure-tools/test-utils-vitest"
];

/**
 * Helper function that determines the rush command flag to use based on each individual package name for the 'build' check.
 *
 * If the targeted package is one of the restricted packages with a ton of dependents, we only want to run that package
 * and not all of its dependents.
 * @param packageNames string[] An array of strings containing the packages names to run the action on.
 */
const getDirectionMappedPackages = (packageNames) => {
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

const getServicePackages = (baseDir, serviceDirs, artifactNames) => {
  const packageNames = [];
  const packageDirs = [];
  let validSdkTypes = ["client", "mgmt", "perf-test", "utility"]; // valid "sdk-type"s that we are looking for, to be able to apply rush-runner jobs on
  console.log(`Packages to build: ${artifactNames}`);
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
  console.log(`Packages eligible to run rush task: ${packageNames}`);
  return [packageNames, packageDirs];
};

const spawnNode = (cwd, ...args) => {
  console.log(`Executing: "node ${args.join(" ")}" in ${cwd}\n\n`);
  const proc = spawnSync("node", args, { cwd, stdio: "inherit" });
  console.log(`\n\nNode process exited with code ${proc.status} `);

  if (proc.status !== 0) {
    // proc.status will be null if the subprocess terminated due to a signal, which I don't think
    // should ever happen, but if it does it's safer to fail.
    process.exitCode = proc.status || 1;
  }
  return proc.status;
};

const flatMap = (arr, f) => {
  const result = arr.map(f);
  return [].concat(...result);
};

const [baseDir, action, serviceDirs, rushParams, artifactNames] = parseArgs();
const actionComponents = action.toLowerCase().split(":");

const [packageNames, packageDirs] = getServicePackages(baseDir, serviceDirs, artifactNames);

/**
 * Helper function to provide the rush logic that is used frequently below
 *
 * @param direction string which kind of rush tree selector to run (either "--from" or "--to")
 * @param packages string[] the names of the packages to run the action on
 */
function rushRunAll(direction, packages) {
  const params = flatMap(packages, (p) => [direction, p]);
  spawnNode(baseDir, "common/scripts/install-run-rush.js", action, ...params, ...rushParams);
}

/**
 * Helper function to invoke the rush logic split up by direction.
 *
 * @param packagesWithDirection string[] Any array of strings containing ["direction packageName"...]
 */
function rushRunAllWithDirection(packagesWithDirection) {
  const invocation = packagesWithDirection.flatMap(([direction, packageName]) => [
    direction,
    packageName,
  ]);
  spawnNode(baseDir, "common/scripts/install-run-rush.js", action, ...invocation, ...rushParams);
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

const isReducedTestScopeEnabled = reducedDependencyTestMatrix[serviceDirs];
if (isReducedTestScopeEnabled) {
  // If a service is configured to have reduced test matrix then run rush for those reduced projects
  console.log(`Found reduced test matrix configured for ${serviceDirs}.`);
  packageNames.push(...reducedDependencyTestMatrix[serviceDirs]);
}
const packagesWithDirection = getDirectionMappedPackages(packageNames);
const rushx_runner_path = path.join(baseDir, "common/scripts/install-run-rushx.js");
if (serviceDirs.length === 0) {
  spawnNode(baseDir, "common/scripts/install-run-rush.js", action, ...rushParams);
} else {
  switch (actionComponents[0]) {
    case "build":
      rushRunAllWithDirection(packagesWithDirection);
      break;

    case "test":
    case "unit-test":
    case "integration-test":
      var rushCommandFlag = "--impacted-by";

      if (isReducedTestScopeEnabled || serviceDirs.length > 1) {
        // If a service is configured to have reduced test matrix then run rush test only for those projects
        rushCommandFlag = "--only";
      }

      rushRunAll(rushCommandFlag, packageNames);
      break;

    case "lint":
      for (const packageDir of packageDirs) {
        spawnNode(packageDir, rushx_runner_path, action);
      }
      break;
    case "check-format":
      for (const packageDir of packageDirs) {
        if (spawnNode(packageDir, rushx_runner_path, action) !== 0) {
          console.log(
            `\nInvoke "rushx format" inside ${tryGetPkgRelativePath(packageDir)} to fix formatting\n`,
          );
        }
      }
      break;

    default:
      rushRunAll("--to", packageNames);
      break;
  }
}
