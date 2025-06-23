// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// @ts-check

import path from "node:path";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import { getPackageSpec, readFileJson, writePackageJson } from "@azure-tools/eng-package-utils";
import { updateChangelog, updatePackageConstants } from "./VersionUtils.js";

const argv = yargs(hideBin(process.argv))
  .options({
    "artifact-name": {
      type: "string",
      describe:
        "name of the artifact to be set (e.g. azure-keyvault-secrets), will be translated to @azure/(package) format",
      demandOption: true,
    },
    "new-version": {
      type: "string",
      describe: "package version string",
      demandOption: true,
    },
    "release-date": {
      type: "string",
      default: new Date().toISOString().slice(0, 10),
      describe: "the date of intended release",
      demandOption: false,
    },
    "replace-latest-entry-title": {
      type: "string",
      default: true,
      describe: "indicates if to replace the latest changelog entry",
      demandOption: false,
    },
    "repo-root": {
      type: "string",
      default: "../../../",
      describe: "root of the repository (e.g. ../../../)",
      demandOption: true,
    },
    "dry-run": {
      type: "boolean",
    },
  })
  .help().argv;

async function main(argv) {
  const artifactName = argv["artifact-name"];
  const newVersion = argv["new-version"];
  const releaseDate = argv["release-date"];
  const replaceLatestEntryTitle = argv["replace-latest-entry-title"];
  const repoRoot = argv["repo-root"];
  const dryRun = argv["dry-run"];

  const rushSpec = await getPackageSpec(repoRoot);

  const targetPackage = rushSpec.projects.find(
    (packageSpec) => packageSpec.packageName.replace("@", "").replace("/", "-") == artifactName,
  );

  const targetPackagePath = path.join(repoRoot, targetPackage.projectFolder);
  const packageJsonLocation = path.join(targetPackagePath, "package.json");

  const packageJsonContents = await readFileJson(packageJsonLocation);

  const oldVersion = packageJsonContents.version;
  console.log(`${packageJsonContents.name}: ${oldVersion} -> ${newVersion}`);

  if (dryRun) {
    console.log("Dry run only, no changes");
    return;
  }

  const updatedPackageJson = {
    ...packageJsonContents,
    version: newVersion,
  };
  await writePackageJson(packageJsonLocation, updatedPackageJson);

  await updatePackageConstants(targetPackagePath, packageJsonContents, newVersion);

  const updateStatus = updateChangelog(
    targetPackagePath,
    artifactName,
    repoRoot,
    newVersion,
    false,
    replaceLatestEntryTitle,
    releaseDate,
  );
  if (!updateStatus) {
    process.exit(1);
  }
}

main(argv);
