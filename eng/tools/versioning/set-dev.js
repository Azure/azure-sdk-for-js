// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// @ts-check

import process from "node:process";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import semver from "semver";
import { getConfig } from "@pnpm/config";
import { resolveFromCatalog } from "@pnpm/catalogs.resolver";

import { getPackageJsons, writePackageJson } from "@azure-tools/eng-package-utils";

const argv = yargs(hideBin(process.argv))
  .options({
    "build-id": {
      type: "string",
      describe: "build ID suffix to give the package (e.g. usually YYYYMMDD.r)",
      demandOption: true,
    },
    "repo-root": {
      type: "string",
      default: "../../../",
      describe: "root of the repository (e.g. ../../../)",
      demandOption: true,
    },
    service: {
      type: "string",
      describe:
        "service directory whose packages should be updated (if not set updates all directories)",
    },
  })
  .help().argv;

async function commitChanges(repoPackages, pkg) {
  // Commit the new version to the JSON document
  if (repoPackages[pkg].newVer) {
    repoPackages[pkg].json.version = repoPackages[pkg].newVer;
  }
  try {
    // Write out the JSON document to disk
    await writePackageJson(repoPackages[pkg].src, repoPackages[pkg].json);
    console.info("File " + repoPackages[pkg].src + " created successfully!");
  } catch (e) {
    console.error(e);
  }
}

function updatePackageVersion(repoPackages, pkg, buildId, catalogs) {
  const currentVersion = repoPackages[pkg].json.version;
  const parsedVersion = semver.parse(currentVersion);
  repoPackages[pkg].newVer =
    `${parsedVersion.major}.${parsedVersion.minor}.${parsedVersion.patch}-alpha.${buildId}`;
  console.log(`version updated for ${pkg}`);
  for (const p of Object.keys(repoPackages)) {
    repoPackages = updateOtherProjectDependencySections(repoPackages, p, pkg, catalogs);
  }
  return repoPackages;
}

function updateDependencySection(repoPackages, dependencySection, buildId, catalogs) {
  //console.log(dependencySection);
  if (dependencySection) {
    for (const [depName, depVersionRange] of Object.entries(dependencySection)) {
      console.log(`checking ${depName}:${depVersionRange}...`);

      // If the dependency isn't part of the workspace, skip it
      if (!repoPackages[depName]) {
        continue;
      }

      // Compare the dependency version range with the package's current version
      const packageVersion = repoPackages[depName].json.version;

      console.log(`version in package's dep = ${depVersionRange}`); //^1.0.0
      console.log(`dep's version = ${packageVersion}`); //1.0.0
      if (depVersionRange === "workspace:^") {
        continue;
      } else if (depVersionRange.startsWith("catalog:")) {
        const parsedPackageVersion = semver.parse(packageVersion);
        const resolvedVersion = resolveFromCatalog(catalogs, {
          alias: depName,
          bareSpecifier: depVersionRange,
        });
        if (resolvedVersion.type === "found") {
          const parsedDepMinVersion = semver.minVersion(resolvedVersion.resolution.specifier);
          if (semver.eq(parsedDepMinVersion, parsedPackageVersion)) {
            repoPackages = updatePackageVersion(repoPackages, depName, buildId, catalogs);
          }
        }
      } else {
        const parsedPackageVersion = semver.parse(packageVersion);
        const parsedDepMinVersion = semver.minVersion(depVersionRange);
        if (semver.eq(parsedDepMinVersion, parsedPackageVersion)) {
          repoPackages = updatePackageVersion(repoPackages, depName, buildId, catalogs);
        }
      }
    }
  }
  return repoPackages;
}

function updateInternalDependencyVersions(repoPackages, pkg, buildId, catalogs) {
  console.log("updateInternalDep");
  console.log(pkg);
  console.log("checking dependencies ..");
  repoPackages = updateDependencySection(
    repoPackages,
    repoPackages[pkg].json.dependencies,
    buildId,
    catalogs,
  );

  console.log("checking devDependencies ..");
  repoPackages = updateDependencySection(
    repoPackages,
    repoPackages[pkg].json.devDependencies,
    buildId,
    catalogs,
  );

  console.log("checking peerDependencies ..");
  repoPackages = updateDependencySection(
    repoPackages,
    repoPackages[pkg].json.peerDependencies,
    buildId,
    catalogs,
  );

  return repoPackages;
}

function makeDependencySectionConsistentForPackage(
  repoPackages,
  dependencySection,
  depName,
  catalogs,
) {
  if (dependencySection && dependencySection[depName]) {
    const depVersionRange = dependencySection[depName];

    console.log(`checking ${depName}:${depVersionRange}...`);

    // If the dependency isn't part of the workspace, skip it
    if (!repoPackages[depName]) {
      return repoPackages;
    }

    // Compare the dependency version range with the package's current version
    const packageVersion = repoPackages[depName].json.version;

    console.log(`version in package's dep = ${depVersionRange}`);
    console.log(`dep's version = ${packageVersion}`);
    const parsedPackageVersion = semver.parse(packageVersion);
    if (!parsedPackageVersion) {
      throw new Error(`Invalid version format: ${packageVersion}`);
    }
    let shouldReplace = false;
    if (depVersionRange.startsWith("workspace:")) {
      shouldReplace = false;
    } else if (depVersionRange.startsWith("catalog:")) {
      const resolvedVersion = resolveFromCatalog(catalogs, {
        alias: depName,
        bareSpecifier: depVersionRange,
      });
      if (resolvedVersion.type === "found") {
        const parsedDepMinVersion = semver.minVersion(resolvedVersion.resolution.specifier);
        shouldReplace = semver.eq(parsedDepMinVersion, parsedPackageVersion);
      }
    } else {
      const parsedDepMinVersion = semver.minVersion(depVersionRange);
      shouldReplace = semver.eq(parsedDepMinVersion, parsedPackageVersion);
    }
    // If the dependency range is satisfied by the package's current version,
    // replace it with an exact match to the package's new version
    if (shouldReplace && repoPackages[depName].newVer !== undefined) {
      // Setting version to >=[major.minor.patch]-alpha <[major.minor.patch]-alphb so that this automatically matches
      // with the latest dev version published on npm
      const versionPrefix = `${parsedPackageVersion.major}.${parsedPackageVersion.minor}.${parsedPackageVersion.patch}`;
      dependencySection[depName] = `>=${versionPrefix}-alpha <${versionPrefix}-alphb`;
    }
  }
  return repoPackages;
}

function updateOtherProjectDependencySections(repoPackages, pkg, depName, catalogs) {
  console.log("updateOtherProjectDependencySections");
  console.log("package = " + pkg);
  console.log("depName=" + depName);
  console.log("checking dependencies ..");

  repoPackages = makeDependencySectionConsistentForPackage(
    repoPackages,
    repoPackages[pkg].json.dependencies,
    depName,
    catalogs,
  );

  console.log("checking devDependencies ..");
  repoPackages = makeDependencySectionConsistentForPackage(
    repoPackages,
    repoPackages[pkg].json.devDependencies,
    depName,
    catalogs,
  );

  console.log("checking peerDependencies ..");
  repoPackages = makeDependencySectionConsistentForPackage(
    repoPackages,
    repoPackages[pkg].json.peerDependencies,
    depName,
    catalogs,
  );
  return repoPackages;
}

async function main(argv) {
  const buildId = argv["build-id"];
  const repoRoot = argv["repo-root"];
  const service = argv["service"];

  const { config } = await getConfig({
    cliOptions: {},
    packageManager: {
      name: "pnpm",
      version: "10.0.0",
    },
    workspaceDir: repoRoot,
  });

  let repoPackages = await getPackageJsons(repoRoot);

  let targetPackages = [];
  for (const pkg of Object.keys(repoPackages)) {
    if (
      ["client", "core", "management"].includes(repoPackages[pkg].versionPolicy) &&
      repoPackages[pkg].projectFolder.startsWith(`sdk/${service}`) &&
      !repoPackages[pkg].json["private"]
    ) {
      targetPackages.push(pkg);
    }
  }

  if (targetPackages.length === 0) {
    console.error(
      `Empty array targetPackages! There is no package that qualifies for dev versioning in the given service folder ${service}`,
    );
    process.exit(1);
  }
  // Set all the new versions & update any references to internal projects with the new versions
  console.log(`Updating packages with build ID ${buildId}`);

  for (const pkg of targetPackages) {
    console.log("package updated = ");
    console.log(pkg);
    repoPackages = updatePackageVersion(repoPackages, pkg, buildId, config.catalogs);
    repoPackages = updateInternalDependencyVersions(repoPackages, pkg, buildId, config.catalogs);
    console.log(repoPackages[pkg].newVer);
  }

  for (const pkg of Object.keys(repoPackages)) {
    await commitChanges(repoPackages, pkg);
  }
}

main(argv).catch((e) => {
  console.error(e);
  process.exit(1);
});
