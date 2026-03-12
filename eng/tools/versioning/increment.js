// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// @ts-check

import process from "node:process";
import path from "node:path";
import { readFileJson, writePackageJson, getPackageSpec } from "@azure-tools/eng-package-utils";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import semver from "semver";
import { updatePackageConstants, updateChangelog } from "./VersionUtils.js";

const argv = yargs(hideBin(process.argv))
  .options({
    "artifact-name": {
      type: "string",
      describe:
        "name of the artifact to be incremented (e.g. azure-keyvault-secrets), will be translated to @azure/(package) format",
      demandOption: true,
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
    type: {
      type: "string",
      describe: "type of version increment (major, minor, or patch)",
      choices: ["major", "minor", "patch"],
      default: "patch",
    },
  })
  .help().argv;

/**
 * Increments the given semantic version string according to the specified type.
 * If the version is a prerelease, increments the prerelease version regardless of the type.
 *
 * @param {string} currentVersion - The current version string (must be a valid semver).
 * @param {"major" | "minor" | "patch"} [type="patch"] - The type of version increment.
 * @returns {string} The incremented version string.
 */
function incrementVersion(currentVersion, type = "patch") {
  const prerelease = semver.prerelease(currentVersion);
  if (prerelease) {
    console.log(
      `Package is in prerelease state. Ignoring version increment type '${type}' and using 'prerelease' instead.`,
    );
    return semver.inc(currentVersion, "prerelease");
  }

  return `${semver.inc(currentVersion, type)}`;
}

async function main(argv) {
  const artifactName = argv["artifact-name"];
  const repoRoot = argv["repo-root"];
  const dryRun = argv["dry-run"];
  const versionType = argv["type"];

  const packageSpec = await getPackageSpec(repoRoot);
  const targetPackage = packageSpec.projects.find(
    (packageSpec) => packageSpec.packageName.replace("@", "").replace("/", "-") === artifactName,
  );

  if (!targetPackage) {
    console.log(`Package is not found in rush.json for artifact ${artifactName}`);
    return;
  }

  const targetPackagePath = targetPackage.projectFolder;
  console.dir({ repoRoot, targetPackagePath });
  const packageJsonLocation = path.join(repoRoot, targetPackagePath, "package.json");

  const packageJsonContents = await readFileJson(packageJsonLocation);

  const oldVersion = packageJsonContents.version;
  const newVersion = incrementVersion(packageJsonContents.version, versionType);
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
  await updatePackageConstants(
    path.join(repoRoot, targetPackagePath),
    packageJsonContents,
    newVersion,
  );
  const updateStatus = updateChangelog(
    path.join(repoRoot, targetPackagePath),
    artifactName,
    repoRoot,
    newVersion,
    true,
    false,
  );
  if (!updateStatus) {
    process.exit(1);
  }
}
main(argv);
