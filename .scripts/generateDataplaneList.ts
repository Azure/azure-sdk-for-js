import * as path from "path";
import * as fs from "fs";
const parse = require("../common/lib/jju/parse").parse;

export function generateDataplaneList(): string[] {
  //const rootRepo = path.resolve(__dirname, "..");
  const rushPackages: string[] = getRushPackages();
  return rushPackages;
}

//This gets the list of rush packages
const getRushPackages = () => {
  const rushPath = path.resolve(path.join(__dirname, "../rush.json"));
  const baseDir = path.dirname(rushPath);
  const rushJson = parse(fs.readFileSync(rushPath, "utf8"));
  const packageData: string[] = [];

  for (const proj of rushJson.projects) {
    const filePath = path.join(baseDir, proj.projectFolder, "package.json");
    const packageJson = parse(fs.readFileSync(filePath, "utf8"));
    packageData.push(packageJson.name);
  }
  return packageData;
};
