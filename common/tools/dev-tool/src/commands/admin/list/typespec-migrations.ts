// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { leafCommand, makeCommandInfo } from "../../../framework/command";
import { readdir } from "node:fs/promises";
import { resolveRoot } from "../../../util/resolveProject";
import path from "node:path";
import { getRushJson, type RushJsonProject } from "../../../util/synthesizedRushJson";

export const commandInfo = makeCommandInfo(
  "typespec-migrations",
  "list the status of the TypeSpec migrations",
  {
    "client-type": {
      description: "filter by client type (RLC or HLC)",
      kind: "string",
    },
  },
);

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

export default leafCommand(commandInfo, async (options) => {
  const root = await resolveRoot();
  const rushJson = await getRushJson();
  const projects = rushJson.projects;

  // Filter to only include client packages
  const clientProjects = projects.filter(
    (project: RushJsonProject) => project.versionPolicyName === "client",
  );

  // Filter by client type if specified
  const clientTypeFilter = options["client-type"]?.toUpperCase();
  let filteredProjects = clientProjects;

  if (clientTypeFilter) {
    if (clientTypeFilter !== "RLC" && clientTypeFilter !== "HLC") {
      console.error("Error: client-type must be either 'RLC' or 'HLC'");
      return false;
    }

    filteredProjects = clientProjects.filter((project: RushJsonProject) => {
      const clientType = project.packageName.startsWith("@azure-rest") ? "RLC" : "HLC";
      return clientType === clientTypeFilter;
    });
  }

  // Sort projects by package name for consistent output
  const sortedProjects = filteredProjects.sort((a: RushJsonProject, b: RushJsonProject) =>
    a.packageName.localeCompare(b.packageName),
  );

  // Calculate migration statistics
  let migratedCount = 0;
  let notMigratedCount = 0;
  let naCount = 0;

  const projectStatuses: Array<{
    project: RushJsonProject;
    clientType: string;
    typespecStatus: string;
  }> = [];

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
      migratedCount++;
    } else if (hasSwagger) {
      typespecStatus = "❌ Not Migrated";
      notMigratedCount++;
    } else {
      typespecStatus = "N/A";
      naCount++;
    }

    projectStatuses.push({ project, clientType, typespecStatus });
  }

  // Calculate completion percentage: (migrated + N/A) / total
  const totalFiltered = filteredProjects.length;
  const completedCount = migratedCount + naCount;
  const completionPercentage =
    totalFiltered > 0 ? ((completedCount / totalFiltered) * 100).toFixed(2) : "0.00";

  console.log("# TypeSpec Migration Report");
  console.log();
  console.log(`Total projects: ${projects.length}`);
  console.log(`Client projects: ${clientProjects.length}`);
  if (clientTypeFilter) {
    console.log(`Filtered by client type (${clientTypeFilter}): ${filteredProjects.length}`);
  }
  console.log();

  // Add summary section
  console.log("## Summary");
  console.log();
  console.log(`- ✅ Migrated: ${migratedCount}`);
  console.log(`- N/A (no migration needed): ${naCount}`);
  console.log(`- Total Completed (Migrated + N/A): ${migratedCount + naCount}`);
  console.log(`- ❌ Not Migrated: ${notMigratedCount}`);
  console.log(`- **Completion percentage: ${completionPercentage}%**`);
  console.log();

  // Generate markdown table header
  console.log("| Package Name | Project Folder | Version Policy | Client Type | TypeSpec Status |");
  console.log("| --- | --- | --- | --- | --- |");

  // Output the table using pre-calculated data
  for (const { project, clientType, typespecStatus } of projectStatuses) {
    console.log(
      `| ${project.packageName} | ${project.projectFolder} | ${project.versionPolicyName} | ${clientType} | ${typespecStatus} |`,
    );
  }

  return true;
});
