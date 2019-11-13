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

const path = require("path");
const semver = require("semver");
const versionUtils = require("./VersionUtils");

const commitChanges = async (rushPackages, package) => {
  // Commit the new version to the JSON document
  if(rushPackages[package].newVer){
    rushPackages[package].json.version = rushPackages[package].newVer;
  }
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

const updatePackageVersion = (rushPackages, package, buildId) => {
  const currentVersion = rushPackages[package].json.version;
  const parsedVersion = semver.parse(currentVersion);
  rushPackages[package].newVer = `${parsedVersion.major}.${parsedVersion.minor}.${parsedVersion.patch}-dev.${buildId}`;
  console.log(`version updated for ${package}`);
  return rushPackages;
};

const updateDependencySection = (rushPackages, dependencySection,buildId) => {
  console.log(dependencySection);
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

      console.log(`version in package's dep = ${depVersionRange}`);//^1.0.0
      console.log(`dep's version = ${packageVersion}`);//1.0.0

      const parsedPackageVersion = semver.parse(packageVersion);
      const parsedDepMinVersion = semver.minVersion(depVersionRange);
    
      if (parsedDepMinVersion.major == parsedPackageVersion.major && parsedDepMinVersion.minor == parsedPackageVersion.minor && parsedDepMinVersion.patch == parsedPackageVersion.patch) {
        rushPackages[depName].newVer = `${parsedPackageVersion.major}.${parsedPackageVersion.minor}.${parsedPackageVersion.patch}-dev.${buildId}`;
        dependencySection[depName] = `^${parsedPackageVersion.major}.${parsedPackageVersion.minor}.${parsedPackageVersion.patch}-dev`;
      }
      //console.log(semver.satisfies("1.0.0-dev-2019.02.34","^1.0.0-dev"));
      // // If the dependency range is satisfied by the package's current version,
      // // replace it with an exact match to the package's new version
      // if (semver.satisfies(packageVersion, depVersionRange)) {
      //   // Commit the dependency version to the JSON document
      //   if(rushPackages[depName].newVer !== undefined){
      //     dependencySection[depName] = rushPackages[depName].newVer;
      //   }
      // }
    }
  }
  return rushPackages;
};

const updateInternalDependencyVersions = (rushPackages, package, buildId) => {
  console.log(package);
  console.log("checking dependencies ..");
  rushPackages = updateDependencySection(rushPackages,rushPackages[package].json.dependencies,buildId);

  console.log("checking devDependencies ..");
  rushPackages = updateDependencySection(rushPackages,rushPackages[package].json.devDependencies,buildId);

  console.log("checking peerDependencies ..");
  rushPackages = updateDependencySection(rushPackages,rushPackages[package].json.peerDependencies,buildId);

  return rushPackages;
};


async function main(argv) {
  const buildId = argv["build-id"];
  const repoRoot = argv["repo-root"];
  const service = argv["service"];

  var rushPackages = await versionUtils.getRushPackageJsons(repoRoot);

  // Set all the new versions
  console.log(`Updating packages with build ID ${buildId}`);
  for (const package of Object.keys(rushPackages)) {
    if ((rushPackages[package].versionPolicy == "client"||rushPackages[package].versionPolicy == "core") && (rushPackages[package].projectFolder.startsWith(`sdk/${service}`))){
      console.log("package updated = ");
      console.log(package);
      rushPackages = updatePackageVersion(rushPackages, package, buildId);
      console.log(rushPackages[package].newVer);
    }
  };

  // Update any references to internal projects with the new versions
  for (const package of Object.keys(rushPackages)) {
    if ((rushPackages[package].versionPolicy == "client"||rushPackages[package].versionPolicy == "core") && (rushPackages[package].projectFolder.startsWith(`sdk/${service}`))){
      rushPackages = updateInternalDependencyVersions(rushPackages, package, buildId);
    }
  }

  for (const package of Object.keys(rushPackages)) {
      await commitChanges(rushPackages, package);
  }
};

main(argv);
