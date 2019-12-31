const versionUtils = require("../eng/tools/versioning/VersionUtils");

async function main() {
  var rushPackages = await versionUtils.getRushPackageJsons(".");
  //console.log(Object.keys(rushPackages));
  await versionUtils.writeFile(
    "list-dataplane.json",
    Object.keys(rushPackages).toString()
  );
  dataplane = await versionUtils.readFile("list-dataplane.json");
  listDataplane = dataplane.split(",");
  console.log(listDataplane);
}
main();
