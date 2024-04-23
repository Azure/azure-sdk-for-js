import * as path from "node:path";
import { writeFile } from "node:fs/promises";
import { resolveProject } from "../../../../util/resolveProject";
import { RushJsonProject } from "../packages";

export default async function IdentifyPackage(
  project: RushJsonProject,
  _paths: boolean,
  _cwd: string,
  root: string,
) {
  const { projectFolder, packageName } = project;
  const fullProjectPath = path.join(root, projectFolder);
  const { packageJson } = await resolveProject(fullProjectPath);

  const buildTestScript = packageJson.scripts["build:test"];

  if (buildTestScript?.startsWith("echo")) {
    return;
  }
  if (projectFolder.includes("sdk/core")) {
    // example: make changes, then save.
    let updated = false;
    if (buildTestScript.includes("dev-tool run build-test")) {
      // inline into browser test script
      if (packageJson.scripts["unit-test:browser"].includes("npm run build:test")) {
        packageJson.scripts["unit-test:browser"] = packageJson.scripts["unit-test:browser"].replace(
          "npm run build:test",
          buildTestScript,
        );
        updated = true;
      }
      if (packageJson.scripts["integration-test:browser"].includes("npm run build:test")) {
        packageJson.scripts["integration-test:browser"] = packageJson.scripts[
          "integration-test:browser"
        ].replace("npm run build:test", buildTestScript);
        updated = true;
      }
    }
    if (updated) {
      console.log(`    updating ${packageName} ${fullProjectPath} testing scripts`);
      packageJson.scripts["build:test"] =
        "echo skipped. actual commands inlined in browser test scripts";
      await writeFile(
        path.join(fullProjectPath, "package.json"),
        JSON.stringify(packageJson, undefined, 2) + "\n",
      );
    }
  }
}
