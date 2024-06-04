// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { leafCommand, makeCommandInfo } from "../../../framework/command";
import { readFile, writeFile } from "node:fs/promises";
import { resolveRoot } from "../../../util/resolveProject";
import path from "node:path";
import stripJsonComments from "strip-json-comments";

export const commandInfo = makeCommandInfo(
  "esm-migrations",
  "list the status of the ESM migrations",
  {
    output: {
      description: "output the report to a file",
      kind: "string",
      shortName: "o",
    },
  },
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let _rushJson: any = undefined;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getRushJson(): Promise<any> {
  if (_rushJson) return _rushJson;

  const rushJsonText = await readFile(
    path.resolve(__dirname, "../../../../../../../rush.json"),
    "utf-8",
  );

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
}

interface MigrationResults {
  mocha: Record<string, string>;
  vitest: Record<string, string>;
  cjs: Record<string, string>;
  esm: Record<string, string>;
  totalProjects: number;
  totalCjs: number;
  totalEsm: number;
  totalMocha: number;
  totalVitest: number;
}

export default leafCommand(commandInfo, async ({ output }) => {
  const root = await resolveRoot();
  const cwd = process.cwd();

  const rushJson = await getRushJson();
  const projects = rushJson.projects;

  const results: MigrationResults = {
    mocha: {},
    vitest: {},
    cjs: {},
    esm: {},
    totalProjects: 0,
    totalCjs: 0,
    totalEsm: 0,
    totalMocha: 0,
    totalVitest: 0,
  };

  for (const project of projects) {
    const projectFolder = path.resolve(root, project.projectFolder);
    const packageJsonPath = path.resolve(projectFolder, "package.json");
    const packageJson = JSON.parse(await readFile(packageJsonPath, "utf-8"));

    if (packageJson.devDependencies) {
      if (packageJson.devDependencies["mocha"]) {
        results.totalMocha++;
        results.mocha[project.packageName] = project.projectFolder;
      }

      if (packageJson.devDependencies["vitest"]) {
        results.totalVitest++;
        results.vitest[project.packageName] = project.projectFolder;
      }

      if (packageJson.type === "module") {
        results.totalEsm++;
        results.esm[project.packageName] = project.projectFolder;
      } else {
        results.totalCjs++;
        results.cjs[project.packageName] = project.projectFolder;
      }

      results.totalProjects++;
    }
  }

  if (output) {
    const outputPath = path.resolve(cwd, output);
    await writeFile(outputPath, JSON.stringify(results, null, 2));
  }

  console.log(`Total projects: ${results.totalProjects}`);
  console.log(`Total CJS: ${results.totalCjs}`);
  console.log(`Total ESM: ${results.totalEsm}`);
  console.log(`Total Mocha: ${results.totalMocha}`);
  console.log(`Total Vitest: ${results.totalVitest}`);

  return true;
});
