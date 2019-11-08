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

async function getRushSpec(repoRoot) {
  const rushPath = path.resolve(path.join(repoRoot, "rush.json"));
  return await readFileJson(rushPath);
}

// This is done to update files which are only periodically generated and
// checked in. Since these files could be generated once between many versions
// we need to make sure that the versions in the generated files move up
// as well
async function updatePackageConstants(packagePath, packageJson, newVersion) {
  // No constant metadata, skip
  if (!("//metadata" in packageJson)) {
    return;
  }

  for (const constantFileSpec of packageJson["//metadata"].constantPaths) {
    const targetPath = path.join(packagePath, constantFileSpec.path);
    const fileContents = await readFile(targetPath);

    const versionExpression = buildSemverRegex(constantFileSpec.prefix);
    const updatedContents = fileContents.replace(
      versionExpression,
      `$1${newVersion}`
    );

    if (updatedContents == fileContents) {
      continue;
    }

    await writeFile(targetPath, updatedContents);
  }
}

function buildSemverRegex(prefix) {
  return new RegExp(`(${prefix}.*?)(${semverRegex.toString()})`, "g");
}

// This regex is taken from # https://semver.org/#is-there-a-suggested-regular-expression-regex-to-check-a-semver-string
// and adapted to exclude beginning of line (^) and end of line ($) anchors.
const semverRegex = `(0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)(?:-((?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\\.(?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\\+([0-9a-zA-Z-]+(?:\\.[0-9a-zA-Z-]+)*))?`;

module.exports.readFile = readFile;
module.exports.readFileJson = readFileJson;
module.exports.writeFile = writeFile;
module.exports.writePackageJson = writePackageJson;
module.exports.getRushSpec = getRushSpec;
module.exports.updatePackageConstants = updatePackageConstants;
