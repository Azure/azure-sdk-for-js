// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { leafCommand, makeCommandInfo } from "../../../framework/command";
import { readFile, readdir, stat } from "node:fs/promises";
import { resolveRoot } from "../../../util/resolveProject";
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

/**
 * Recursively checks if a directory contains a tsp-location.yaml file
 */
async function hasTypeSpecFile(dirPath: string): Promise<boolean> {
  try {
    const entries = await readdir(dirPath, { withFileTypes: true });

    // Check if tsp-location.yaml exists in current directory
    if (entries.some((entry) => entry.isFile() && entry.name === "tsp-location.yaml")) {
      return true;
    }

    // Recursively check subdirectories
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const subdirPath = path.join(dirPath, entry.name);
        if (await hasTypeSpecFile(subdirPath)) {
          return true;
        }
      }
    }

    return false;
  } catch (error) {
    // If we can't read the directory, assume no TypeSpec files
    return false;
  }
}

/**
 * Checks if a directory has a swagger folder with .md files
 */
async function hasSwaggerFiles(dirPath: string): Promise<boolean> {
  try {
    const swaggerPath = path.join(dirPath, "swagger");

    try {
      const swaggerEntries = await readdir(swaggerPath, { withFileTypes: true });
      // Check if there are any .md files in the swagger directory
      return swaggerEntries.some((entry) => entry.isFile() && entry.name.endsWith(".md"));
    } catch {
      // swagger directory doesn't exist or can't be read
      return false;
    }
  } catch (error) {
    // If we can't read the directory, assume no swagger files
    return false;
  }
}

export default leafCommand(commandInfo, async () => {
  const root = await resolveRoot();
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
  console.log("| Package Name | Project Folder | Version Policy | Client Type | TypeSpec Status |");
  console.log("| --- | --- | --- | --- | --- |");

  // Sort projects by package name for consistent output
  const sortedProjects = clientProjects.sort((a: RushJsonProject, b: RushJsonProject) =>
    a.packageName.localeCompare(b.packageName),
  );

  for (const project of sortedProjects) {
    const projectFolder = path.resolve(root, project.projectFolder);

    // Determine client type based on package name
    const clientType = project.packageName.startsWith("@azure-rest") ? "RLC" : "HLC";

    // Check if the project has been migrated to TypeSpec
    const hasTypeSpec = await hasTypeSpecFile(projectFolder);

    // Check if the project has swagger files (needs migration)
    const hasSwagger = await hasSwaggerFiles(projectFolder);

    let typespecStatus: string;
    if (hasTypeSpec) {
      typespecStatus = "✅ Migrated";
    } else if (hasSwagger) {
      typespecStatus = "❌ Not Migrated";
    } else {
      typespecStatus = "N/A";
    }

    console.log(
      `| ${project.packageName} | ${project.projectFolder} | ${project.versionPolicyName} | ${clientType} | ${typespecStatus} |`,
    );
  }

  return true;
});
