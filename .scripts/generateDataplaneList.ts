import * as path from "path";
const versionUtils = require("../eng/tools/versioning/VersionUtils");
export function generateDataplaneList(): string[]{
  console.warn("is this printing even?");
  console.warn(__dirname);
  const rootRepo = path.resolve(__dirname, "..");
  console.warn(rootRepo);
  var rushPackages = versionUtils.getRushPackageJsons(rootRepo);
  console.warn(Object.keys(rushPackages));
  return Object.keys(rushPackages);
}
