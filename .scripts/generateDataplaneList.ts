import * as path from "path";
import * as fs from "fs";
const parse = require("../common/lib/jju/parse").parse;

export type PackageData = { packageList: string[]; folderList: string[] };

export function generateDataplaneList(): PackageData {
  const rushPackages = getRushPackages();
  return rushPackages;
}

//This gets the list of rush package names and list of rush package folder names
const getRushPackages = () => {
  const rushPath = path.resolve(path.join(__dirname, "../rush.json"));
  const baseDir = path.dirname(rushPath);
  const rushJson = parse(fs.readFileSync(rushPath, "utf8"));
  const packageNames: string[] = [];
  const packageFolders: string[] = [];

  for (const proj of rushJson.projects) {
    const filePath = path.join(baseDir, proj.projectFolder, "package.json");
    packageFolders.push(path.basename(path.dirname(filePath)));
    packageNames.push(proj.packageName);
  }
  return { packageList: packageNames, folderList: packageFolders };
};
