import fs from "fs";
import path from "path";

export function addApiViewInfo(
  outputPackageInfo: any,
  packagePath: string,
  changedPackageDirectory: string,
) {
  const tempDir = path.join(packagePath, "temp");
  if (!fs.existsSync(tempDir)) return;

  const files = fs.readdirSync(tempDir);

  // Prefer -node.api.json files, fall back to .api.json files
  const apiFile =
    files.find((file) => file.endsWith("-node.api.json")) ||
    files.find((file) => file.endsWith(".api.json"));

  if (apiFile) {
    outputPackageInfo.apiViewArtifact = path.join(changedPackageDirectory, "temp", apiFile);
    outputPackageInfo.language = "JavaScript";
  }
}
