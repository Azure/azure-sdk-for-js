import fs from "fs";
import path from "path";
import { isBetaVersion } from "../../utils/version.js";

export function changeReadmeMd(packageFolderPath: string) {
  let isPreview = false;
  if (fs.existsSync(path.join(packageFolderPath, "package.json"))) {
    const packageJson = JSON.parse(
      fs.readFileSync(path.join(packageFolderPath, "package.json"), { encoding: "utf-8" }),
    );
    isPreview = isBetaVersion(packageJson.version);
  }
  if (fs.existsSync(path.join(packageFolderPath, "README.md"))) {
    let content = fs.readFileSync(path.join(packageFolderPath, "README.md"), { encoding: "utf-8" });
    content = content.replace(/\?view=azure-node-preview/, "");
    if (isPreview) {
      const match = /API reference documentation[^ )]*/.exec(content);
      if (!!match) {
        content = content.replace(match[0], `${match[0]}?view=azure-node-preview`);
      }
    }
    fs.writeFileSync(path.join(packageFolderPath, "README.md"), content, { encoding: "utf-8" });
  }
}
