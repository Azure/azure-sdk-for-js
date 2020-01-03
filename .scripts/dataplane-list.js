const versionUtils = require("../eng/tools/versioning/VersionUtils");
const process = require("process");
const dataplaneListFilename = "list-dataplane.json";
module.exports.filename = dataplaneListFilename;
const parseArgs = () => {
  if (
    process.argv.length < 3 ||
    process.argv.some(a => ["-h", "--help"].includes(a.toLowerCase()))
  ) {
    console.error("Usage: dataplane-list.js <pathToRepo>");
    console.error("Example: dataplane-list.js .");
    process.exit(1);
  }
  var pathToRepo = process.argv[2];
  return [pathToRepo];
};

async function main() {
  const [pathToRepo] = parseArgs();
  const pathToFileListName = dataplaneListFilename;
  var rushPackages = await versionUtils.getRushPackageJsons(pathToRepo);

  await versionUtils.writeFile(
    pathToFileListName,
    Object.keys(rushPackages).toString()
  );
}

main();
