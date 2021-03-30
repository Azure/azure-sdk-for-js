const fs = require("fs");
const path = require("path");
const process = require("process");
const { spawnSync } = require("child_process");

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
  const services = [],
    flags = [];
  const [scriptPath, action, ...givenArgs] = process.argv.slice(1);
  const baseDir = path.resolve(`${path.dirname(scriptPath)}/../..`);

  for (const arg of givenArgs) {
    if (!inFlags && arg.startsWith("-")) {
      inFlags = true;
    }

    if (inFlags) {
      flags.push(arg);
    } else {
      if (arg && arg !== "*") {
        // exclude empty value and special value "*" meaning all libraries
        services.push(arg);
      }
    }
  }
  return [baseDir, action, services, flags];
};

const getAllPackageJsonPaths = (baseDir) => {
  // Find and return path to all packages in repo
  const packagePaths = [];
  const serviceDirs = fs
    .readdirSync(path.resolve(path.join(baseDir, "sdk")))
    .filter((f) => !f.startsWith("."))
    .map((f) => path.resolve(path.join(baseDir, "sdk", f)));

  for (const serviceDir of serviceDirs) {
    for (const pkgPath of getPackageJsons(serviceDir)) packagePaths.push(pkgPath);
  }
  return packagePaths;
};

const getPackageJsons = (searchDir) => {
  // This gets all the directories with package.json at the `sdk/<service>/<service-sdk>` level excluding "arm-" packages
  const sdkDirectories = fs
    .readdirSync(searchDir)
    .filter((f) => !f.startsWith("arm-")) // exclude libraries starting with "arm-"
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

const getServicePackages = (baseDir, serviceDirs) => {
  const packageNames = [],
    packageDirs = [];
  for (const serviceDir of serviceDirs) {
    const searchDir = path.resolve(path.join(baseDir, "sdk", serviceDir));
    const packageJsons = getPackageJsons(searchDir);
    for (const filePath of packageJsons) {
      const contents = JSON.parse(fs.readFileSync(filePath, "utf8"));
      if (contents["sdk-type"] === "client") {
        packageNames.push(contents.name);
        packageDirs.push(path.dirname(filePath));
      }
    }
  }

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

const [baseDir, action, serviceDirs, rushParams] = parseArgs();

const [packageNames, packageDirs] = getServicePackages(baseDir, serviceDirs);

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

if (serviceDirs.length === 0) {
  spawnNode(baseDir, "common/scripts/install-run-rush.js", action, ...rushParams);
} else {
  const actionComponents = action.toLowerCase().split(":");
  switch (actionComponents[0]) {
    case "build":
      if (actionComponents.length == 1) {
        rushRunAll("--from", packageNames);
      }
      else {
        // build:samples or build:test doesn't have to build dependent packages
        // This should use impacted-by to build from current package to downstream
        rushRunAll("--impacted-by", packageNames);
      }
      break;

    case "test":
    case "unit-test":
    case "integration-test":
      rushRunAll("--impacted-by", packageNames);
      break;

    case "lint":
      for (const packageDir of packageDirs) {
        spawnNode(packageDir, "../../../common/scripts/install-run-rushx.js", action);
      }
      break;
    case "check-format":
      for (const packageDir of packageDirs) {
        if (spawnNode(packageDir, "../../../common/scripts/install-run-rushx.js", action) !== 0) {
          console.log(`\nInvoke "rushx format" inside ${tryGetPkgRelativePath(packageDir)} to fix formatting\n`);
        }
      }
      break;

    default:
      rushRunAll("--to", packageNames);
      break;
  }
}
