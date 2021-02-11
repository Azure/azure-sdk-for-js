const fs = require("fs");
const path = require("path");
const parse = require("../../../common/lib/jju/parse").parse;
const { promisify } = require("util");

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

async function readFile(filename) {
  return await readFileAsync(filename, { encoding: "utf-8" });
}

async function writeFile(filename, contents) {
  return await writeFileAsync(filename, contents);
}

async function readFileJson(filename) {
  try {
    const fileContents = await readFile(filename);
    const jsonResult = parse(fileContents);
    return jsonResult;
  } catch (ex) {
    console.error(ex);
  }
}

async function writePackageJson(filename, contentObject) {
  try {
    const contentString = JSON.stringify(contentObject, null, 2);
    await writeFile(filename, `${contentString}\n`);
  } catch (ex) {
    console.error(ex);
  }
}

//This gets the list of rush packages as well as their packageJsons
//This is specifically used in set-dev-dependencies script
const getRushPackageJsons = async repoRoot => {
  const rushPath = path.resolve(path.join(repoRoot, "rush.json"));
  const baseDir = path.dirname(rushPath);
  const rushJson = parse(await readFile(rushPath, "utf8"));
  const packageData = {};

  for (const proj of rushJson.projects) {
    const filePath = path.join(baseDir, proj.projectFolder, "package.json");
    const packageJson = parse(await readFile(filePath, "utf8"));
    packageData[packageJson.name] = {
      src: filePath,
      json: packageJson,
      versionPolicy: proj.versionPolicyName,
      projectFolder: proj.projectFolder,
      newVer: undefined
    };
  }
  return packageData;
};

async function getRushSpec(repoRoot) {
  const rushPath = path.resolve(path.join(repoRoot, "rush.json"));
  return await readFileJson(rushPath);
}

async function getRushCommonVersions(repoRoot) {
  const commonVersionsPath = path.resolve(path.join(repoRoot, "/common/config/rush/common-versions.json"));
  return await readFileJson(commonVersionsPath);
}

// This regex is taken from # https://semver.org/#is-there-a-suggested-regular-expression-regex-to-check-a-semver-string
// and adapted to exclude beginning of line (^) and end of line ($) anchors.
const semverRegex = `(0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)(?:-((?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\\.(?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\\+([0-9a-zA-Z-]+(?:\\.[0-9a-zA-Z-]+)*))?`;

module.exports.readFile = readFile;
module.exports.readFileJson = readFileJson;
module.exports.writeFile = writeFile;
module.exports.writePackageJson = writePackageJson;
module.exports.getRushSpec = getRushSpec;
module.exports.getRushPackageJsons = getRushPackageJsons;
module.exports.getRushCommonVersions = getRushCommonVersions;
