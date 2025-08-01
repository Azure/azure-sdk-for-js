// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { leafCommand, makeCommandInfo } from "../../../framework/command";
import { readFile } from "node:fs/promises";
import path from "node:path";
import stripJsonComments from "strip-json-comments";

export const commandInfo = makeCommandInfo(
  "typespec-migrations",
  "list the status of the TypeSpec migrations",
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

export default leafCommand(commandInfo, async () => {
  const rushJson = await getRushJson();
  const projects = rushJson.projects;

  // Filter to only include client packages
  const clientProjects = projects.filter(
    (project: RushJsonProject) => project.versionPolicyName === "client",
  );

  console.log("# TypeSpec Migration Report");
  console.log();
  console.log(`Total projects: ${projects.length}`);
  console.log(`Client projects: ${clientProjects.length}`);
  console.log();

  // Generate markdown table header
  console.log("| Package Name | Project Folder | Version Policy | TypeSpec Status |");
  console.log("| --- | --- | --- | --- |");

  // Sort projects by package name for consistent output
  const sortedProjects = clientProjects.sort((a: RushJsonProject, b: RushJsonProject) =>
    a.packageName.localeCompare(b.packageName),
  );

  for (const project of sortedProjects) {
    // For now, we'll mark all as "Not Migrated" - this can be enhanced later
    // to check for actual TypeSpec files or configuration
    const typespecStatus = "❌ Not Migrated";

    console.log(
      `| ${project.packageName} | ${project.projectFolder} | ${project.versionPolicyName} | ${typespecStatus} |`,
    );
  }

  return true;
});
