const path = require("path");
const util = require("util");
const fs = require("fs");
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
const parse = require("jju").parse;
const semver = require("semver");

const getRushPackages = async (rushPath) => {
  const baseDir = path.dirname(rushPath);
  const rushJson = parse(await readFile(rushPath, "utf8"));
  const packageData = {};

  for (const proj of rushJson.projects) {
    const filePath = path.join(baseDir, proj.projectFolder, "package.json");
    const packageJson = parse(await readFile(filePath, "utf8"));
    packageData[packageJson.name] = {
      src: filePath,
      json: packageJson,
      newVer: undefined
    };
  }

  return packageData;
};

const commitChanges = async (rushPackages, package) => {
  // Commit the new version to the JSON document
  rushPackages[package].json.version = rushPackages[package].newVer;
  try {
    // Write out the JSON document to disk
    await writeFile(rushPackages[package].src, JSON.stringify(rushPackages[package].json, null, 2));
    console.info(
      "File " + rushPackages[package].src + " created successfully with Node.js v10 fs/promises!"
    );
  } catch (e) {
    console.error(e);
  }
};

const updateDependencySection = (rushPackages, dependencySection) => {
  for (const [depName, depVersionRange] of dependencySection) {
    console.log(`checking ${depName}:${depVersionRange}...`);

    // If the dependency isn't part of the Rush workspace, skip it
    if (!rushPackages[depName]) {
      continue;
    }

    // Compare the dependency version range with the package's current version
    const packageVersion = rushPackages[depName].json.version;

    console.log(`version in package's dep = ${depVersionRange}`);
    console.log(`dep's version = ${packageVersion}`);

    // If the dependency range is satisfied by the package's current version,
    // replace it with an exact match to the package's new version
    if (semver.satisfies(packageVersion, depVersionRange)) {
      // Commit the dependency version to the JSON document
      dependencySection[depName] = rushPackages[depName].newVer;
    }
  }
};

const updateInternalDependencyVersions = (rushPackages, package) => {
  console.log("checking dependencies ..");
  updateDependencySection(rushPackages, rushPackages[package].json.dependencies);

  console.log("checking devDependencies ..");
  updateDependencySection(rushPackages, rushPackages[package].json.devDependencies);

  console.log("checking peerDependencies ..");
  updateDependencySection(rushPackages, rushPackages[package].json.peerDependencies);
};

const updatePackageVersion = (rushPackages, package, buildId) => {
  rushPackages[package].newVer = `${rushPackages[package].json.version}-dev-${buildId}`;
};

const [
  nodePath,   /* Ex: /bin/node */
  scriptPath, /* /repo/common/eng/tools/generate-dev-builds/index.js */
  buildId     /* buildNo of current build */
] = process.argv;
if (!nodePath || !scriptPath) {
  throw new Error("Unexpected exception: could not detect node path or script path");
}

const main = async () => {
  const rushPackages = await getRushPackages(path.resolve(`${__dirname}/../../../rush.json`));

  // Set all the new versions
  console.log(`Updating packages with build ID ${buildId}`);
  for (const package of Object.keys(rushPackages)) {
    updatePackageVersion(rushPackages, package, buildId);
  }

  // Update any references to internal projects with the new versions
  for (const package of Object.keys(rushPackages)) {
    updateInternalDependencyVersions(rushPackages, package);
  }

  // Commit the package and dependency version changes to disk
  for (const package of Object.keys(rushPackages)) {
    await commitChanges(rushPackages, package);
  }
};

main();
