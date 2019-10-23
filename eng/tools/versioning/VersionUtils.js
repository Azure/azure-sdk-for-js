const fs = require("fs");
const path = require("path");
const parse = require("../../../common/lib/jju/parse").parse;

async function readFile(filename) {
  return await fs.promises.readFile(filename, { encoding: "utf-8" });
}

async function writeFile(filename, contents) {
  return await fs.promises.writeFile(filename, contents);
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
    await writeFile(filename, contentString);
  } catch (ex) {
    console.error(ex);
  }
}

async function getRushSpec(repoRoot) {
  const rushPath = path.resolve(path.join(repoRoot, "rush.json"));
  return await readFileJson(rushPath);
}

// This regex is taken from # https://semver.org/#is-there-a-suggested-regular-expression-regex-to-check-a-semver-string
// and adapted to exclude beginning of line (^) and end of line ($) anchors.
// Given JS regex semantics the lack of a global flag (/g) means that this regex
// only matches the first instance of a regular expression in a file.
const semverRegex = /(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?/;

module.exports.semverRegex = semverRegex;
module.exports.readFile = readFile;
module.exports.readFileJson = readFileJson;
module.exports.writeFile = writeFile;
module.exports.writePackageJson = writePackageJson;
module.exports.getRushSpec = getRushSpec;
