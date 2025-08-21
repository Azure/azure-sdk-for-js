// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// @ts-check

import process from "node:process";
import path from "node:path";
import { readFileJson, writePackageJson, getPackageSpec } from "@azure-tools/eng-package-utils";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { findPackages } from "@pnpm/fs.find-packages";
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
  })
  .help().argv;

function incrementVersion(currentVersion) {
  const prerelease = semver.prerelease(currentVersion);
  if (prerelease) {
    return semver.inc(currentVersion, "prerelease");
  }

  return `${semver.inc(currentVersion, "patch")}`;
}

async function main(argv) {
  const artifactName = argv["artifact-name"];
  const repoRoot = argv["repo-root"];
  const dryRun = argv["dry-run"];

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
  const newVersion = incrementVersion(packageJsonContents.version);
  console.log(`${packageJsonContents.name}: ${oldVersion} -> ${newVersion}`);

  if (dryRun) {
    console.log("Dry run only, no changes");
    return;
  }

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
