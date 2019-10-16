const fs = require("fs");
const parse = require("../../../common/lib/jju/parse").parse;

async function readFileJson(filename) {
  try {
    const fileContents = await fs.promises.readFile(filename, {
      encoding: "utf-8"
    });
    const jsonResult = parse(fileContents);
    return jsonResult;
  } catch (ex) {
    console.error(ex);
  }
}

async function writePackageJson(filename, contentObject) {
  try {
    const contentString = JSON.stringify(contentObject, null, "  ");
    await fs.promises.writeFile(filename, contentString);
  } catch (ex) {
    console.error(ex);
  }
}

async function getRushSpec(repoRoot) {
  const rushPath = path.resolve(path.join(repoRoot, "rush.json"));
  return await versionUtils.readFileJson(rushPath);
}

module.exports.readFileJson = readFileJson;
module.exports.writePackageJson = writePackageJson;
module.exports.getRushSpec = getRushSpec;
