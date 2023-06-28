// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { readFile, writeFile } from "fs/promises";
import path from "path";

import { leafCommand, makeCommandInfo } from "../../framework/command";
import { getServiceFolders } from "./list/service-folders";

import * as git from "../../util/git";
import { resolveRoot } from "../../util/resolveProject";
import { createPrinter } from "../../util/printer";
import { getProjects } from "./list/packages";
import { runUnattendedMigrationPass } from "../migrate";
import { MigrationExitState } from "../../util/migrations";

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
  }
);

export interface MigrationManifest {
  [service: string]: ServiceManifestEntry;
}

export interface ServiceManifestEntry {
  serviceBranch: string;
  projects: { [packageName: string]: MigrationExitState };
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

    for (const serviceFolder of serviceList) {
      const projects = await getProjects(serviceFolder);

      log.info(`Migrating ${serviceFolder}...`);

      const serviceBranchName = `${cleanBranchBase}/${serviceFolder}/${id}`;

      manifest[serviceFolder] = {
        serviceBranch: serviceBranchName,
        projects: {},
      };

      await git.checkout(serviceBranchName, { create: true });

      // Start a migration pass for each project in the service folder.

      for (const project of projects) {
        console.log("Migrating", project.packageName);

        const exitState = await runUnattendedMigrationPass(
          path.resolve(root, project.projectFolder)
        );

        manifest[serviceFolder].projects[project.packageName] = exitState;
      }

      await git.checkout(cleanBranchName);
    }

    await git.checkout(workingBranch);

    const manifestOutputPath =
      output || path.resolve(root, `manifest-${cleanBranchBase.split("/").join("_")}.json`);

    await writeFile(manifestOutputPath, JSON.stringify(manifest, null, 2));

    return true;
  }
);
