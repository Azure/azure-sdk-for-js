import * as path from "path";
import * as fs from "fs";
const parse = require("../common/lib/jju/parse").parse;

export type PackageData = { packageList: string[]; folderList: string[] };

export function generateDataplaneList(): PackageData {
  //const rootRepo = path.resolve(__dirname, "..");
  const rushPackages = getRushPackages();
  return rushPackages;
}

//This gets the list of rush packages
const getRushPackages = () => {
  const rushPath = path.resolve(path.join(__dirname, "../rush.json"));
  const baseDir = path.dirname(rushPath);
  const rushJson = parse(fs.readFileSync(rushPath, "utf8"));
  const packageNames: string[] = [];
  const packageFolders: string[] = [];

  for (const proj of rushJson.projects) {
    const filePath = path.join(baseDir, proj.projectFolder, "package.json");
    packageFolders.push(path.basename(path.dirname(filePath)));
    const packageJson = parse(fs.readFileSync(filePath, "utf8"));
    packageNames.push(packageJson.name);
  }
  return { packageList: packageNames, folderList: packageFolders };
};
