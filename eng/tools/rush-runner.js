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
  let buildTransitiveDep = false;

  for (const arg of givenArgs) {
    if (arg == "--TransitiveDep") {
      buildTransitiveDep = true;
      continue;
    }
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
  return [baseDir, action, services, flags, buildTransitiveDep];
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

const getPackageGraph = (baseDir) => {
  // Create a graph of packages with edges to packages that are dependent
  // for e.g.  C requires A and B and D requires A and C
  // Graph is as follows
  // { A: [C, D], B: [C], C: [D]}
  let packageGraph = new Map();
  const packageJsons = getAllPackageJsonPaths(baseDir);

  for (const filePath of packageJsons) {
    const contents = JSON.parse(fs.readFileSync(filePath, "utf8"));
    const pkgName = contents["name"];
    const dependencies = [];
    if (contents.hasOwnProperty("dependencies")) {
      for (const pkg in contents["dependencies"]) dependencies.push(pkg);
    }

    if (contents.hasOwnProperty("devDependencies")) {
      for (const pkg in contents["devDependencies"]) dependencies.push(pkg);
    }

    // Process each package dependency and build dependency graph that links all packages that are dependent on current package
    for (let dependentPkg of dependencies) {
      if (!packageGraph.has(dependentPkg)) {
        packageGraph.set(dependentPkg, new Set());
      }
      packageGraph.get(dependentPkg).add(pkgName);
    }
  }
  return packageGraph;
};

const getLeafPackages = (packageGraph, packageNames) => {
  // Return a set of packages that are dependent on other packages but not a dependency for any package
  let leafPackages = new Set();
  for (let pkgName of packageNames) {
    // if current package is added as dependent by other packages then find leaf packages recursively
    if (packageGraph.has(pkgName)) {
      // Rush doesn't build transitive dependency if package version is beta
      // Passing this package explicitly as a work around we can upgrade rush to latest version 5.38 or higher
      leafPackages.add(pkgName);
      for (const dependentPackage of getLeafPackages(packageGraph, packageGraph.get(pkgName))) {
        leafPackages.add(dependentPackage);
      }
    } else {
      // Current package has no further dependents. Add them to final list
      leafPackages.add(pkgName);
    }
  }
  return leafPackages;
};

const getPackagesToBuild = (packageNames, packageGraph) => {
  // Find all packages that takes current package as dependency recursively and add leaf packages into list to build
  // This will ensure all transitive dependencies are built
  // A -> D, C -> D. When A is built, it will build D and C also just by adding --to D
  for (const dependentPackage of getLeafPackages(packageGraph, packageNames)) {
    if (!packageNames.includes(dependentPackage)) packageNames.push(dependentPackage);
  }
  console.log(`Packages to build: ${packageNames}`);
  return packageNames;
};

const getPackageJsons = (searchDir) => {
  return fs
    .readdirSync(searchDir)
    .filter((f) => !f.startsWith("arm-")) // exclude libraries starting with "arm-"
    .map((f) => path.join(searchDir, f, "package.json")) // turn potential directory names into package.json paths
    .filter((f) => fs.existsSync(f)); // only keep paths for files that actually exist
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

const [baseDir, action, serviceDirs, rushParams, buildTransitiveDep] = parseArgs();
const pkgGraph = getPackageGraph(baseDir);

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

if (serviceDirs.length === 0) {
  spawnNode(baseDir, "common/scripts/install-run-rush.js", action, ...rushParams);
} else {
  const actionComponents = action.toLowerCase().split(":");
  switch (actionComponents[0]) {
    case "test":
    case "unit-test":
    case "integration-test":
      rushRunAll("--from", packageNames);
      break;

    case "lint":
      for (const packageDir of packageDirs) {
        spawnNode(packageDir, "../../../common/scripts/install-run-rushx.js", action);
      }
      break;
    case "check-format":
      for (const packageDir of packageDirs) {
        if (spawnNode(packageDir, "../../../common/scripts/install-run-rushx.js", action) !== 0) {
          console.log(`Invoke "rushx format" inside ${packageDir} to fix formatting`);
        }
      }
      break;

    case "build":
      if (actionComponents[1] === "samples") {
        // For sample builds, we use --from to run sample builds on dependents
        rushRunAll("--from", packageNames);
      } else {
        // For other builds, we use the transitive dependency logic if required, and build dependencies
        // using --to
        const requiredPackageNames = buildTransitiveDep
          ? getPackagesToBuild(packageNames, pkgGraph)
          : packageNames;

        rushRunAll("--to", requiredPackageNames);
      }
      break;

    default:
      rushRunAll("--to", packageNames);
      break;
  }
}
