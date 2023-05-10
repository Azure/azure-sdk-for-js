let argv = require("yargs")
  .options({
    "build-id": {
      type: "string",
      describe: "build ID suffix to give the package (e.g. usually YYYYMMDD.r)",
      demandOption: true
    },
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

const process = require("process");
const semver = require("semver");
const path = require("path");
const packageUtils = require("@azure-tools/eng-package-utils");

const commitChanges = async (rushPackages, package) => {
  // Commit the new version to the JSON document
  if (rushPackages[package].newVer) {
    rushPackages[package].json.version = rushPackages[package].newVer;
  }
  try {
    // Write out the JSON document to disk
    await packageUtils.writePackageJson(
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

const updatePackageVersion = (rushPackages, package, buildId) => {
  const currentVersion = rushPackages[package].json.version;
  const parsedVersion = semver.parse(currentVersion);
  rushPackages[package].newVer = `${parsedVersion.major}.${parsedVersion.minor}.${parsedVersion.patch}-alpha.${buildId}`;
  console.log(`version updated for ${package}`);
  for (const pkg of Object.keys(rushPackages)) {
    rushPackages = updateOtherProjectDependencySections(rushPackages, pkg, package);
  }
  return rushPackages;
};

const updateDependencySection = (rushPackages, dependencySection, buildId) => {
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
      if (semver.eq(parsedDepMinVersion, parsedPackageVersion)) {
        rushPackages = updatePackageVersion(rushPackages, depName, buildId);
      }
    }
  }
  return rushPackages;
};

const updateInternalDependencyVersions = (rushPackages, package, buildId) => {
  console.log("updateInternalDep");
  console.log(package);
  console.log("checking dependencies ..");
  rushPackages = updateDependencySection(
    rushPackages,
    rushPackages[package].json.dependencies,
    buildId
  );

  console.log("checking devDependencies ..");
  rushPackages = updateDependencySection(
    rushPackages,
    rushPackages[package].json.devDependencies,
    buildId
  );

  console.log("checking peerDependencies ..");
  rushPackages = updateDependencySection(
    rushPackages,
    rushPackages[package].json.peerDependencies,
    buildId
  );

  return rushPackages;
};

const makeDependencySectionConsistentForPackage = (rushPackages, dependencySection, depName) => {
  if (dependencySection && dependencySection[depName]) {
    depVersionRange = dependencySection[depName];

    console.log(`checking ${depName}:${depVersionRange}...`);

    // If the dependency isn't part of the Rush workspace, skip it
    if (!rushPackages[depName]) {
      return rushPackages;
    }

    // Compare the dependency version range with the package's current version
    const packageVersion = rushPackages[depName].json.version;

    console.log(`version in package's dep = ${depVersionRange}`);
    console.log(`dep's version = ${packageVersion}`);
    const parsedPackageVersion = semver.parse(packageVersion);
    const parsedDepMinVersion = semver.minVersion(depVersionRange);
    // If the dependency range is satisfied by the package's current version,
    // replace it with an exact match to the package's new version
    if (semver.eq(parsedDepMinVersion, parsedPackageVersion) &&
      rushPackages[depName].newVer !== undefined
    ) {

      // Setting version to >=[major.minor.patch]-alpha <[major.minor.patch]-alphb so that this automatically matches 
      // with the latest dev version published on npm
      const versionPrefix = `${parsedPackageVersion.major}.${parsedPackageVersion.minor}.${parsedPackageVersion.patch}`;
      dependencySection[depName] = `>=${versionPrefix}-alpha <${versionPrefix}-alphb`;
    }
  }
  return rushPackages;
};

const updateOtherProjectDependencySections = (rushPackages, package, depName) => {
  console.log("updateOtherProjectDependencySections");
  console.log("package = " + package);
  console.log("depName=" + depName);
  console.log("checking dependencies ..");

  rushPackages = makeDependencySectionConsistentForPackage(rushPackages, rushPackages[package].json.dependencies, depName);

  console.log("checking devDependencies ..");
  rushPackages = makeDependencySectionConsistentForPackage(rushPackages, rushPackages[package].json.devDependencies, depName);

  console.log("checking peerDependencies ..");
  rushPackages = makeDependencySectionConsistentForPackage(rushPackages, rushPackages[package].json.peerDependencies, depName);
  return rushPackages;
};

/*
Check rush common-versions for the exact version to replace dev tags for - if that version is present 
in common-versions - then update common-versions adding the dev version as an exception
*/
const updateCommonVersions = async (repoRoot, commonVersionsConfig, package, searchVersion) => {
  var allowedAlternativeVersions = commonVersionsConfig["allowedAlternativeVersions"];
  const parsedSearchVersion = semver.parse(searchVersion);

  if (allowedAlternativeVersions[package]) {
    for (var version of allowedAlternativeVersions[package]) {
      const parsedPackageVersion = semver.minVersion(version);
      if (semver.eq(parsedPackageVersion, parsedSearchVersion)) {
        const versionPrefix = `${parsedSearchVersion.major}.${parsedSearchVersion.minor}.${parsedSearchVersion.patch}`;
        var devVersionRange = ">=" + versionPrefix + "-alpha <" + versionPrefix + "-alphb";
        allowedAlternativeVersions[package].push(devVersionRange);
        break;
      }
    }
  }

  var newConfig = commonVersionsConfig;
  newConfig["allowedAlternativeVersions"] = allowedAlternativeVersions;
  const commonVersionsPath = path.resolve(path.join(repoRoot, "/common/config/rush/common-versions.json"));
  console.log("updated common versions config =");
  console.log(newConfig);
  await packageUtils.writePackageJson(commonVersionsPath, newConfig);
}

async function main(argv) {
  const buildId = argv["build-id"];
  const repoRoot = argv["repo-root"];
  const service = argv["service"];

  var rushPackages = await packageUtils.getRushPackageJsons(repoRoot);
  const commonVersionsConfig = await packageUtils.getRushCommonVersions(repoRoot);

  let targetPackages = [];
  for (const package of Object.keys(rushPackages)) {
    if (
      ["client", "core", "management"].includes(rushPackages[package].versionPolicy) &&
      rushPackages[package].projectFolder.startsWith(`sdk/${service}`) &&
      !rushPackages[package].json["private"]
    ) {
      targetPackages.push(package);
    }
  }
  if (targetPackages.length === 0) {
    console.error(`Empty array targetPackages! There is no package that qualifies for dev versioning in the given service folder ${service}`);
    process.exit(1);
  }
  // Set all the new versions & update any references to internal projects with the new versions
  console.log(`Updating packages with build ID ${buildId}`);
  for (const package of targetPackages) {
    console.log("package updated = ");
    console.log(package);
    rushPackages = updatePackageVersion(rushPackages, package, buildId);
    rushPackages = updateInternalDependencyVersions(rushPackages, package, buildId);
    await updateCommonVersions(repoRoot, commonVersionsConfig, package, rushPackages[package].json.version);
    console.log(rushPackages[package].newVer);
  }

  for (const package of Object.keys(rushPackages)) {
    await commitChanges(rushPackages, package);
  }
}

main(argv);
