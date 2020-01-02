const versionUtils = require("../eng/tools/versioning/VersionUtils");
const process = require("process");

const parseArgs = () => {
  if (
    process.argv.length < 4 ||
    process.argv.some(a => ["-h", "--help"].includes(a.toLowerCase()))
  ) {
    console.error("Usage: dataplane-list.js <pathToRepo> <pathToFileListName>");
    console.error("Example: dataplane-list.js . list-dataplane.json");
    process.exit(1);
  }
  var pathToRepo = process.argv[2];
  var pathToFileListName = process.argv[3];
  return [pathToRepo, pathToFileListName];
};

const listDataplanePackages = async pathToFileListName => {
  dataplane = await versionUtils.readFile(pathToFileListName);
  listDataplane = dataplane.split(",");
  return listDataplane;
};

async function main() {
  const [pathToRepo, pathToFileListName] = parseArgs();
  //const pathToFileListName = "list-dataplane.json";
  var rushPackages = await versionUtils.getRushPackageJsons(pathToRepo);

  await versionUtils.writeFile(
    pathToFileListName,
    Object.keys(rushPackages).toString()
  );
  var res = await listDataplanePackages(pathToFileListName);
  console.log(res[0]);
}
main();
