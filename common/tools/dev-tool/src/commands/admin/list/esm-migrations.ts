// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

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

  /**
   * The version policy name.
   */
  versionPolicyName: string;
}

interface MigrationResults {
  core: MigrationResult;
  management: MigrationResult;
  client: MigrationResult;
  utility: MigrationResult;
  test: MigrationResult;
}

export interface MigrationResult {
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

function createMigrationResult(): MigrationResult {
  return {
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
}

function setMigrationResult(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  packageJson: any,
  project: RushJsonProject,
  results: MigrationResult,
): void {
  if (packageJson.devDependencies) {
    if (packageJson.devDependencies["mocha"]) {
      results.totalMocha++;
      results.mocha[project.packageName] = project.projectFolder;
    }

    if (packageJson.devDependencies["vitest"]) {
      results.totalVitest++;
      results.vitest[project.packageName] = project.projectFolder;
    }
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

function echoMigrationResult(category: string, result: MigrationResult): void {
  console.log(`Category: ${category}`);
  console.log(`Total projects: ${result.totalProjects}`);
  console.log(`Total CJS: ${result.totalCjs}`);
  console.log(`Total ESM: ${result.totalEsm}`);
  console.log(`Total Mocha: ${result.totalMocha}`);
  console.log(`Total Vitest: ${result.totalVitest}`);

  console.log(
    `Converted to ESM percentage: ${((result.totalEsm / result.totalProjects) * 100).toFixed(2)}%`,
  );
  console.log(
    `Converted to vitest percentage: ${((result.totalVitest / result.totalProjects) * 100).toFixed(2)}%`,
  );
}

export default leafCommand(commandInfo, async ({ output }) => {
  const root = await resolveRoot();
  const cwd = process.cwd();

  const rushJson = await getRushJson();
  const projects = rushJson.projects;

  const results: MigrationResults = {
    core: createMigrationResult(),
    management: createMigrationResult(),
    client: createMigrationResult(),
    utility: createMigrationResult(),
    test: createMigrationResult(),
  };

  for (const project of projects) {
    const projectFolder = path.resolve(root, project.projectFolder);
    const packageJsonPath = path.resolve(projectFolder, "package.json");
    const packageJson = JSON.parse(await readFile(packageJsonPath, "utf-8"));

    switch (project.versionPolicyName) {
      case "core":
        setMigrationResult(packageJson, project, results.core);
        break;
      case "management":
        setMigrationResult(packageJson, project, results.management);
        break;
      case "client":
        setMigrationResult(packageJson, project, results.client);
        break;
      case "utility":
        setMigrationResult(packageJson, project, results.utility);
        break;
      case "test":
        setMigrationResult(packageJson, project, results.test);
        break;
      default:
        break;
    }
  }

  if (output) {
    const outputPath = path.resolve(cwd, output);
    await writeFile(outputPath, JSON.stringify(results, null, 2));
  }

  echoMigrationResult("core", results.core);
  console.log(`\n---------------------------------\n`);
  echoMigrationResult("management", results.management);
  console.log(`\n---------------------------------\n`);
  echoMigrationResult("client", results.client);
  console.log(`\n---------------------------------\n`);
  echoMigrationResult("utility", results.utility);
  console.log(`\n---------------------------------\n`);
  echoMigrationResult("test", results.test);

  return true;
});
