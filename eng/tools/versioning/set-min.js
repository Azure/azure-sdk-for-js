let argv = require("yargs")
  .options({
    "repoRoot": {
      type: "string",
      default: "../../../",
      describe: "root of the repository (e.g. ../../../)",
      demandOption: true
    },
    service: {
      type: "string",
      describe:
        "service directory whose packages should be updated (if not set updates all directories)",
      demandOption: true
    },
    depLevel: {
      type: "string",
      describe:
        "setting dependencies to min matching published version or max matching published version(eg. min / eg. max)",
      demandOption: true
    }
  })
  .help().argv;

const path = require("path");
const semver = require("semver");
const versionUtils = require("./VersionUtils");
const spawn = require('cross-spawn');

const repoRoot = argv["repoRoot"];
const service = argv["service"];
const depLevel = argv["depLevel"];

const commitChanges = async (rushPackages, package) => {
  try {
    // Write out the JSON document to disk
    await versionUtils.writePackageJson(
      rushPackages[package].src,
      rushPackages[package].json
    );
    console.info(
      "File " +
      rushPackages[package].src +
      " created successfully with Node.js v10 fs/promises!"
    );
  } catch (e) {
    console.error(e);
  }
};

const updateDependencySection = async (rushPackages, dependencySection, parentPackage) => {
  if (dependencySection) {
    for (const [depName, depVersionRange] of Object.entries(dependencySection)) {
      console.log(`checking ${depName}:${depVersionRange}...`);

      // If the dependency isn't part of the Rush workspace, skip it
      if (!rushPackages[depName]) {
        continue;
      }
      const packageName = rushPackages[depName].json.name;
      // Compare the dependency version range with the package's current version
      const packageVersion = rushPackages[depName].json.version;
      var result = { "package": packageName, "data": [], "version": depVersionRange, "parent": parentPackage };
      console.log(`version in package's dep = ${depVersionRange}`); //^1.0.0
      console.log(`dep's version = ${packageVersion}`); //1.0.0

      if (semver.satisfies(packageVersion, depVersionRange)) {
        try {
          let npmProcess = new Promise((resolve, reject) => {
            let proc = spawn('npm', ['view', packageName, 'versions', '--json'], { stdout: 'inherit' });
            let processOutput = "";
            proc.stdout.on('data', async (data) => {
              processOutput += data.toString();
            })
            proc.on('close', (code) => {
              console.log('Process exit code: ' + code);
              if (code !== 0) {
                reject();
                return;
              }
              result.data = JSON.parse(processOutput);
              result.package = packageName;
              result.version = depVersionRange;
              result.parent = parentPackage;
              const maxVersion = semver.maxSatisfying(result["data"], result["version"]);
              const minVersion = semver.minSatisfying(result["data"], result["version"]);
              console.log("maxVersion=" + maxVersion);
              console.log("minVersion=" + minVersion);
              if (depLevel == "min") {
                console.log(`setting dependency in ${parentPackage} for ${packageName} from ${dependencySection[depName]} to ${minVersion}`)
                dependencySection[depName] = minVersion;
              }
              else if (depLevel == "max") {
                console.log(`setting dependency in ${parentPackage} for ${packageName} from ${dependencySection[depName]} to ${maxVersion}`)
                dependencySection[depName] = maxVersion;
              }
              resolve();
            });
          });
          await npmProcess;
        }
        catch (error) {
          console.error(error);
        }

      }
    }
  }
  return rushPackages;
};

const updateInternalDependencyVersions = async (rushPackages, package) => {
  console.log("updateInternalDep");
  console.log(package);
  console.log("checking dependencies ..");
  rushPackages = await updateDependencySection(rushPackages, rushPackages[package].json.dependencies, package);
  rushPackages = await updateDependencySection(rushPackages, rushPackages[package].json.devDependencies, package)
  return rushPackages;
};

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

async function main() {
  var rushPackages = await versionUtils.getRushPackageJsons(repoRoot);
  let targetPackages = [];

  for (const package of Object.keys(rushPackages)) {
    if (["client", "core", "utility"].includes(rushPackages[package].versionPolicy)) {
      targetPackages.push(package);
    }
  }

  console.log("target packages:");
  console.log(targetPackages);

  // Set any internal dependencies to min or max published versions
  for (const package of targetPackages) {
    console.log("package updated = ");
    console.log(package);
    rushPackages = await updateInternalDependencyVersions(rushPackages, package);
  }

  for (const package of Object.keys(rushPackages)) {
    await commitChanges(rushPackages, package);
  }
}

main(argv);
