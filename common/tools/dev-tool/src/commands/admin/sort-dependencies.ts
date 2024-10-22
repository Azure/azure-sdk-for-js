// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

import { leafCommand, makeCommandInfo } from "../../framework/command";
import { createPrinter } from "../../util/printer";
import { readFile, writeFile } from "fs/promises";
import { resolve } from "node:path";
import { resolveRoot } from "../../util/resolveProject";
import stripJsonComments from "strip-json-comments";

const log = createPrinter("migrate-package");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _rushJson: any = undefined;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getRushJson(): Promise<any> {
  if (_rushJson) return _rushJson;

  const rushJsonText = await readFile(resolve(__dirname, "../../../../../../rush.json"), "utf-8");

  return (_rushJson = JSON.parse(stripJsonComments(rushJsonText)));
}

/**
 * The shape of a rush.json `projects` entry.
 */
export interface RushJsonProject {
  /**
   * The name of the package.
   */
  packageName: string;
  /**
   * The path to the project, relative to the monorepo root.
   */
  projectFolder: string;

  /**
   * The version policy name.
   */
  versionPolicyName: string;
}

export const commandInfo = makeCommandInfo(
  "sort-dependencies",
  "migrates a package to ESM and vitest",
  {
    "package-name": {
      description: "The name of the package to sort dependencies for",
      kind: "string",
    },
  },
);

export default leafCommand(commandInfo, async ({ "package-name": packageName }) => {
  const root = await resolveRoot();

  const rushJson = await getRushJson();
  const projects = rushJson.projects;

  if (!packageName) {
    for (const project of projects) {
      await upgradePackage(root, project);
    }
  } else {
    const project = projects.find((p: RushJsonProject) => p.packageName === packageName);
    if (!project) {
      log.error(`Package ${packageName} not found in rush.json`);
      return false;
    }

    await upgradePackage(root, project);
  }

  return true;
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function upgradePackage(root: string, project: any): Promise<void> {
  const projectFolder = resolve(root, project.projectFolder);
  await upgradePackageJson(resolve(projectFolder, "package.json"));
}

async function upgradePackageJson(packageJsonPath: string): Promise<void> {
  const packageJson = JSON.parse(await readFile(packageJsonPath, "utf-8"));

  // Sort the devDependencies
  sortDependencies(packageJson);

  // Save the updated package.json
  await writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
}

function sortObjectByKeys(unsortedObj: { [key: string]: string }): { [key: string]: string } {
  const sortedEntries = Object.entries(unsortedObj).sort((a, b) => a[0].localeCompare(b[0]));
  return Object.fromEntries(sortedEntries);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function sortDependencies(packageJson: any): void {
  if (packageJson.devDependencies) {
    packageJson.devDependencies = sortObjectByKeys(packageJson.devDependencies);
  }

  if (packageJson.dependencies) {
    packageJson.dependencies = sortObjectByKeys(packageJson.dependencies);
  }
}
