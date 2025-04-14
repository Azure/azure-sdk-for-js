// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { leafCommand, makeCommandInfo } from "../../../framework/command";
import { readFile, writeFile } from "node:fs/promises";
import { resolveRoot } from "../../../util/resolveProject";
import os from "node:os";
import path from "node:path";
import stripJsonComments from "strip-json-comments";

export const commandInfo = makeCommandInfo(
  "snippets-migrations",
  "list the status of the snippets migrations",
  {
    output: {
      description: "output the report to a file",
      kind: "string",
      shortName: "o",
    },
    verbose: {
      description: "generate a detailed report by package",
      kind: "boolean",
      default: false,
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
  snippets: Record<string, string>;
  nonSnippets: Record<string, string>;
  totalProjects: number;
  totalSnippets: number;
  totalNonSnippets: number;
}

function createMigrationResult(): MigrationResult {
  return {
    snippets: {},
    nonSnippets: {},
    totalProjects: 0,
    totalSnippets: 0,
    totalNonSnippets: 0,
  };
}

function setMigrationResult(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  packageJson: any,
  project: RushJsonProject,
  results: MigrationResult,
): void {
  if (
    packageJson.scripts &&
    packageJson.scripts["update-snippets"] &&
    packageJson.scripts["update-snippets"].includes("dev-tool run update-snippets")
  ) {
    results.snippets[project.packageName] = project.projectFolder;
    results.totalSnippets++;
  } else {
    results.nonSnippets[project.packageName] = project.projectFolder;
    results.totalNonSnippets++;
  }

  results.totalProjects++;
}

function echoMigrationResult(category: string, result: MigrationResult, verbose: boolean): void {
  console.log(`## Category: ${category}`);
  console.log();
  console.log(`- Total projects: ${result.totalProjects}`);
  console.log(`- Total snippets: ${result.totalSnippets}`);

  console.log(
    `- Converted to snippets percentage: ${((result.totalSnippets / result.totalProjects) * 100).toFixed(2)}%`,
  );

  if (verbose) {
    generateDetailedReport(category, result);
  }
}

function generateDetailedReport(category: string, result: MigrationResult): void {
  const header = `${os.EOL}| Package Name | Project Folder | Type | Migrated to Snippets |`;
  const separator = `| --- | --- | --- | --- |`;

  console.log(header);
  console.log(separator);

  const allEntries = [
    ...Object.entries(result.snippets).map((f) => [...f, "✅"]),
    ...Object.entries(result.nonSnippets).map((f) => [...f, "❌"]),
  ].sort((a, b) => a[0].localeCompare(b[0]));

  for (const [packageName, projectFolder, migrated] of allEntries) {
    console.log(`| ${packageName} | ${projectFolder} | ${category} | ${migrated} |`);
  }
}

export default leafCommand(commandInfo, async ({ output, verbose }) => {
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

  console.log(`# Migration report${os.EOL}`);
  echoMigrationResult("core", results.core, verbose);
  console.log(`${os.EOL}---------------------------------${os.EOL}`);
  echoMigrationResult("management", results.management, verbose);
  console.log(`${os.EOL}---------------------------------${os.EOL}`);
  echoMigrationResult("client", results.client, verbose);
  console.log(`${os.EOL}---------------------------------${os.EOL}`);
  echoMigrationResult("utility", results.utility, verbose);
  console.log(`${os.EOL}---------------------------------${os.EOL}`);
  echoMigrationResult("test", results.test, verbose);
  console.log(`${os.EOL}---------------------------------${os.EOL}`);

  return true;
});
