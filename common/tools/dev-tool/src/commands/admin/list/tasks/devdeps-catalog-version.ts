import path from "node:path";
import { writeFile } from "node:fs/promises";
import { resolveProject } from "../../../../util/resolveProject";
import { RushJsonProject } from "../../../../util/synthesizedRushJson";

export default async function listPackageCallback(
  project: RushJsonProject,
  _paths: boolean,
  _cwd: string,
  root: string,
) {
  const { projectFolder, packageName } = project;
  const fullProjectPath = path.join(root, projectFolder);
  const { packageJson } = await resolveProject(fullProjectPath);

  let modified = false;

  const mainDeps = ["@types/node", "autorest", "eslint", "tslib", "tsx", "typescript"];
  const testingDeps = [
    '@rollup/plugin-inject',
    '@types/chai',
    '@types/chai-as-promised',
    '@vitest/browser',
    '@vitest/coverage-istanbul',
    '@vitest/expect',
    "chai",
    "chai-as-promised",
    "chai-exclude",
    "dotenv",
    "nock",
    "playwright",
    "vitest",
  ];
  const workspaceDeps = [
    "@azure-tools/test-credential",
    "@azure-tools/test-recorder",
    "@azure-tools/test-utils-vitest",
    "@azure/core-rest-pipeline",
    "@azure/core-util",
    "@azure/dev-tool",
    "@azure/eslint-plugin-azure-sdk",
  ];
  const internalDeps = [ "@azure/identity" ];
  const armDeps = ["@azure/arm-storage", "@azure/arm-cognitiveservices", "@azure/arm-webpubsub"];

  const depVersionReplacement: [string[], string][] = [
    [mainDeps, "catalog:"],
    [testingDeps, "catalog:testing"],
    [workspaceDeps, "workspace:^"],
    [internalDeps, "catalog:internal"],
    [armDeps, "catalog:arm"],
  ];
  for (const c of depVersionReplacement) {
    if (c[1] === "catalog:arm") {
      continue; // skipping ARM dependencies for now due to issue
    }
    for (const d of c[0]) {
      if (packageJson?.devDependencies?.[d]) {
        packageJson.devDependencies[d] = c[1];
        modified = true;
      }
    }
  }

  if (modified) {
    console.log(`    updating ${packageName} ${fullProjectPath} devDependencies`);
    const packScript = packageJson?.scripts?.["pack"];
    if (packScript) {
      packageJson.scripts["pack"] = packScript.replace("npm pack 2", "pnpm pack 2");
    }
    await writeFile(
      path.join(fullProjectPath, "package.json"),
      JSON.stringify(packageJson, undefined, 2) + "\n",
    );
  }
}
