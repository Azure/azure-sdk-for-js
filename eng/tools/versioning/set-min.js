let argv = require("yargs")
  .options({
    "repo-root": {
      type: "string",
      default: "../../../",
      describe: "root of the repository (e.g. ../../../)",
      demandOption: true
    },
    service: {
      type: "string",
      describe:
        "service directory whose packages should be updated (if not set updates all directories)"
    }
  })
  .help().argv;

const path = require("path");
const semver = require("semver");
const versionUtils = require("./VersionUtils");

const updateDependencySection = (rushPackages, dependencySection) => {
  //console.log(dependencySection);
  if (dependencySection) {
    for (const [depName, depVersionRange] of Object.entries(
      dependencySection
    )) {
      console.log(`checking ${depName}:${depVersionRange}...`);

      // If the dependency isn't part of the Rush workspace, skip it
      if (!rushPackages[depName]) {
        continue;
      }

      // Compare the dependency version range with the package's current version
      const packageVersion = rushPackages[depName].json.version;

      console.log(`version in package's dep = ${depVersionRange}`); //^1.0.0
      console.log(`dep's version = ${packageVersion}`); //1.0.0

      const parsedPackageVersion = semver.parse(packageVersion);
      const parsedDepMinVersion = semver.minVersion(depVersionRange);

      if (
        parsedDepMinVersion.major == parsedPackageVersion.major &&
        parsedDepMinVersion.minor == parsedPackageVersion.minor &&
        parsedDepMinVersion.patch == parsedPackageVersion.patch
      ) {
        rushPackages = updatePackageVersion(rushPackages, depName, buildId);
      }
    }
  }
  return rushPackages;
};

const updateInternalDependencyVersions = (rushPackages, package) => {
  console.log("updateInternalDep");
  console.log(package);
  console.log("checking dependencies ..");
  rushPackages = updateDependencySection(
    rushPackages,
    rushPackages[package].json.dependencies
  );

  // console.log("checking devDependencies ..");
  // rushPackages = updateDependencySection(
  //   rushPackages,
  //   rushPackages[package].json.devDependencies
  // );

  // console.log("checking peerDependencies ..");
  // rushPackages = updateDependencySection(
  //   rushPackages,
  //   rushPackages[package].json.peerDependencies
  // );

  return rushPackages;
};

async function main(argv) {
  const repoRoot = argv["repo-root"];
  const service = argv["service"];

  var rushPackages = await versionUtils.getRushPackageJsons(repoRoot);

  let targetPackages = [];
  for (const package of Object.keys(rushPackages)) {
    if (
      ["client", "core"].includes(rushPackages[package].versionPolicy) &&
      rushPackages[package].projectFolder.startsWith(`sdk/${service}`)
    ) {
      targetPackages.push(package);
    }
  }

  // Set all the new versions & update any references to internal projects with the new versions

  for (const package of targetPackages) {
    console.log("package updated = ");
    console.log(package);
    rushPackages = updateInternalDependencyVersions(rushPackages, package, buildId);
  }

  for (const package of Object.keys(rushPackages)) {
    await commitChanges(rushPackages, package);
  }
}

main(argv);
