// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { leafCommand, makeCommandInfo } from "../../framework/command";
import { getServiceFolders } from "./list/service-folders";

import * as git from "../../util/git";
import { resolveRoot } from "../../util/resolveProject";
import { createPrinter } from "../../util/printer";
import { getProjects } from "./list/packages";
import { MigrationReport, runUnattendedMigrationPass } from "../migrate";

const log = createPrinter("stage-migrations");

export const commandInfo = makeCommandInfo(
  "stage-migrations",
  "stage migration passes over the whole monorepo",
  {
    "service-list": {
      description: "path to a list of service folders to stage migrations for (default: all)",
      kind: "string",
    },
    force: {
      description: "force the staging of migrations, even if the working tree is dirty",
      kind: "boolean",
      default: !!process.env.DEV_TOOL_UNSAFE_FORCE,
      shortName: "f",
    },
    output: {
      description: "path to write the migration manifest to (default: repo root)",
      kind: "string",
      shortName: "o",
    },
  },
);

/**
 * Describes the result of attempting to stage unattended migrations for a set of service folders.
 */
export interface MigrationManifest {
  /**
   * The manifest entry for a given service folder.
   */
  [service: string]: ServiceManifestEntry;
}

/**
 * Describes the result of attempting to stage unattended migrations for a single service folder.
 */
export interface ServiceManifestEntry {
  /**
   * The name of the git branch where the migrations are staged.
   */
  serviceBranch: string;
  /**
   * The state of the migration for each project in the service folder.
   */
  projects: {
    /**
     * The report of all migrations executed on a package.
     */
    [packageName: string]: MigrationReport[];
  };
}

export default leafCommand(
  commandInfo,
  async ({ "service-list": serviceListPath, force, output }) => {
    const root = await resolveRoot();

    const serviceList = serviceListPath
      ? (await readFile(serviceListPath, "utf-8")).trim().split(/\r?\n/)
      : await getServiceFolders();

    if (serviceList.length === 0) {
      log.warn("Service list is empty. Nothing to do.");
      return true;
    }

    // Create a clean branch. Ensure that the current working tree is clean before proceeding.
    if (!force && (await git.hasDiff(root))) {
      log.error("Working tree is dirty. Please commit or stash your changes before proceeding.");
      return false;
    }

    const workingBranch = await git.currentBranch();

    log.info(`Staging migrations beginning from ${workingBranch}`);

    // A 4 digit hex id, to ensure the branch name is unique
    const id = Math.floor(Math.random() * 0x10000)
      .toString(16)
      .padStart(4, "0");
    // The clean branch name is `migration/{YYYY-MM-DD}/{id}`
    const cleanBranchBase = `migration/${new Date().toISOString().slice(0, 10)}`;
    const cleanBranchName = `${cleanBranchBase}/${id}`;

    log.info(`Creating branch ${cleanBranchName}...`);

    log.info("Services:", serviceList.join(", "));

    await git.checkout(cleanBranchName, { create: true });

    // For each service folder, check out a new git branch, apply migrations to each project in the service folder, then
    // check out the clean branch

    const manifest: MigrationManifest = {};

    let anyServiceFolderFailed = false;

    for (const serviceFolder of serviceList) {
      const projects = await getProjects(serviceFolder);

      log.info(`Migrating service folder '${serviceFolder}'...`);

      const serviceBranchName = `${cleanBranchBase}/${serviceFolder}/${id}`;

      manifest[serviceFolder] = {
        serviceBranch: serviceBranchName,
        projects: {},
      };

      await git.checkout(serviceBranchName, { create: true });

      // Start a migration pass for each project in the service folder.

      let failed = false;

      for (const project of projects) {
        log.info(`Migrating project ${project.packageName}`);

        const migrationReports = await runUnattendedMigrationPass(
          path.resolve(root, project.projectFolder),
        );

        manifest[serviceFolder].projects[project.packageName] = migrationReports;

        // The pass succeeded if the last migration in the reports is a success or skip.
        const passSucceeded = ["success", "skipped"].includes(
          migrationReports[migrationReports.length - 1].exitState.kind,
        );

        if (!passSucceeded) {
          log.error(
            `Failed to migrate '${project.packageName}' in service folder '${serviceFolder}'.`,
          );
          failed = true;
          anyServiceFolderFailed = true;
        }
      }

      if (failed) {
        log.error(`Failed to migrate ${serviceFolder}.`);
      }

      await git.checkout(cleanBranchName);
    }

    await git.checkout(workingBranch);

    const manifestOutputPath =
      output || path.resolve(root, `manifest-${cleanBranchBase.split("/").join("_")}.json`);

    await writeFile(manifestOutputPath, JSON.stringify(manifest, null, 2));

    log.info(`Migration manifest written to ${manifestOutputPath}`);

    if (anyServiceFolderFailed) {
      log.error(
        "Some service folders failed to migrate. Please check the migration manifest for details.",
      );
      return false;
    } else {
      log.success("All service folders migrated successfully.");
    }

    return true;
  },
);
