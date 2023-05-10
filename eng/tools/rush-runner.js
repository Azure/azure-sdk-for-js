const fs = require("fs");
const path = require("path");
const process = require("process");
const { spawnSync } = require("child_process");

const reducedDependencyTestMatrix = {
  'core': ['@azure-rest/core-client',
    '@azure-tests/perf-storage-blob',
    '@azure/ai-text-analytics',
    '@azure/arm-compute',
    '@azure/dev-tool',
    '@azure/identity',
    '@azure/identity-cache-persistence',
    '@azure/identity-vscode',
    '@azure/service-bus',
    '@azure/storage-blob',
    '@azure/template',
    '@azure/test-utils',
    '@azure/test-utils-perf',
    '@azure-tools/test-recorder',
    '@azure/synapse-monitoring'
  ],
  'test-utils': [
    '@azure-tests/perf-storage-blob',
    '@azure-tests/perf-data-tables',
    '@azure/arm-eventgrid',
    '@azure/ai-text-analytics',
    '@azure/identity',
    '@azure/identity-cache-persistence',
    '@azure/identity-vscode',
    '@azure/storage-file-share',
    '@azure/template'
  ],
  'identity': [
    '@azure-rest/core-client',
    '@azure-tests/perf-storage-blob',
    '@azure/ai-text-analytics',
    '@azure/arm-compute',
    '@azure/identity-cache-persistence',
    '@azure/identity-vscode',
    '@azure/service-bus',
    '@azure/storage-blob',
    '@azure/template',
    '@azure/synapse-monitoring'
  ],
};

const parseArgs = () => {
  if (
    process.argv.length < 3 ||
    process.argv.some((a) => ["-h", "--help"].includes(a.toLowerCase()))
  ) {
    console.error("Usage: rush-runner.js <action> [<servicename>...] [args...]");
    console.error("Example: rush-runner.js build keyvault storage --verbose");
    process.exit(1);
  }

  let inFlags = false;
  let isPackageFilter = false;
  let artifactNames = "";
  const services = [],
    flags = [];
  const [scriptPath, action, ...givenArgs] = process.argv.slice(1);
  const baseDir = path.resolve(`${path.dirname(scriptPath)}/../..`);

  for (const arg of givenArgs) {
    if (arg === "-packages") {
      isPackageFilter = true;
      continue;
    }
    else if (!inFlags && arg.startsWith("-")) {
      inFlags = true;
    }

    if (inFlags) {
      flags.push(arg);
    }
    else if (isPackageFilter) {
      artifactNames = arg;
      isPackageFilter = false;
    }
    else {
      if (arg && arg !== "*") {
        // exclude empty value and special value "*" meaning all libraries
        services.push(arg);
      }
    }
  }
  return [baseDir, action, services, flags, artifactNames];
};

const getPackageJsons = (searchDir) => {
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

const getServicePackages = (baseDir, serviceDirs, artifactNames) => {
  const packageNames = [];
  const packageDirs = [];
  let validSdkTypes = ["client", "mgmt", "perf-test", "utility"]; // valid "sdk-type"s that we are looking for, to be able to apply rush-runner jobs on
  console.log(`Packages to build: ${artifactNames}`);
  const artifacts = artifactNames.split(",");
  for (const serviceDir of serviceDirs) {
    const searchDir = path.resolve(path.join(baseDir, "sdk", serviceDir));
    const packageJsons = getPackageJsons(searchDir);
    for (const filePath of packageJsons) {
      const contents = JSON.parse(fs.readFileSync(filePath, "utf8"));
      const artifactName = contents.name.replace("@", "").replace("/", "-");
      if (validSdkTypes.includes(contents["sdk-type"]) && (artifactNames.length === 0 || artifacts.includes(artifactName))) {
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
  return proc.status
};

const flatMap = (arr, f) => {
  const result = arr.map(f);
  return [].concat(...result);
};

const [baseDir, action, serviceDirs, rushParams, artifactNames] = parseArgs();

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
 * Helper function to get the relative path of a package directory from an absolute
 * one
 * 
 * @param {string} absolutePath absolute path to a package 
 * @returns either the relative path of the package starting from the "sdk" directory
 *          or the just the absolute path itself if "sdk" if not found
 */
function tryGetPkgRelativePath(absolutePath) {
  const sdkDirectoryPathStartIndex = absolutePath.lastIndexOf("sdk");
  return sdkDirectoryPathStartIndex === -1 ? absolutePath : absolutePath.substring(sdkDirectoryPathStartIndex);
}

const isReducedTestScopeEnabled = reducedDependencyTestMatrix[serviceDirs];
if (isReducedTestScopeEnabled) {
  // If a service is configured to have reduced test matrix then run rush for those reduced projects
  console.log(`Found reduced test matrix configured for ${serviceDirs}.`);
  packageNames.push(...reducedDependencyTestMatrix[serviceDirs]);
}
const rushx_runner_path = path.join(baseDir, "common/scripts/install-run-rushx.js");
if (serviceDirs.length === 0) {
  spawnNode(baseDir, "common/scripts/install-run-rush.js", action, ...rushParams);
} else {
  const actionComponents = action.toLowerCase().split(":");
  switch (actionComponents[0]) {
    case "build":
      // Build command without any additional option should build the project and downstream
      // If service is configured to run only a set of downstream projects then build all projects leading to them to support testing
      // if this is build:test for any non-configured package service then all impacted projects downstream and it's dependents should be built
      var rushCommandFlag = "--impacted-by";
      if (isReducedTestScopeEnabled) {
        // reduced preconfigured set of projects and it's required projects
        rushCommandFlag = "--to";
      }
      else if (actionComponents.length == 1) {
        rushCommandFlag = "--from";
      }

      rushRunAll(rushCommandFlag, packageNames);
      break;

    case "test":
    case "unit-test":
    case "integration-test":
      var rushCommandFlag = "--impacted-by";
      if (isReducedTestScopeEnabled) {
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
          console.log(`\nInvoke "rushx format" inside ${tryGetPkgRelativePath(packageDir)} to fix formatting\n`);
        }
      }
      break;

    default:
      rushRunAll("--to", packageNames);
      break;
  }
}
