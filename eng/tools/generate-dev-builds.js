const path = require("path");
const util = require("util");
const fs = require("fs");
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
const parse = require("../../common/lib/jju/parse").parse;

const parseArg = () => {
  if (process.argv.length !== 3 || process.argv.some(a => ['-h', '--help'].includes(a.toLowerCase()))) {
    console.error('Usage: generate-dev-builds.js <build-id>');
    console.error('Example: generate-dev-builds 20190101.1');
    process.exit(1);
  }

  return process.argv[2];
}

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
    console.log(`File ${rushPackages[package].src} version updated to ${rushPackages[package].json.version}`);
  } catch (e) {
    console.error(e);
  }
};

const updatePackageVersion = (rushPackages, package, buildId) => {
  rushPackages[package].newVer = `${rushPackages[package].json.version}-dev-${buildId}`;
};

const main = async () => {
  const buildId = parseArg();
  const rushPackages = await getRushPackages(path.resolve(`${__dirname}/../../rush.json`));

  // Set all the new versions and commit the package version changes to disk
  console.log(`Updating packages with build ID ${buildId}`);
  for (const package of Object.keys(rushPackages)) {
    updatePackageVersion(rushPackages, package, buildId);
    await commitChanges(rushPackages, package);
  }

};

main();
