// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// @ts-check

import fs from "node:fs";
import path from "node:path";

import { spawnPnpmWithOutput } from "./spawn.js";
import { spawnGitWithOutput } from "./spawn.js";
import { getBaseDir } from "./env.js";

/**
 * Checks if a specific version of a package is published on the npm registry.
 *
 * @param {string} packageName - the full package name (e.g. "@azure/storage-blob")
 * @param {string} version - the version string (e.g. "1.2.3")
 * @returns {boolean} true if the version is published, false otherwise
 */
export function isVersionPublished(packageName, version) {
  try {
    const output = spawnPnpmWithOutput(
      getBaseDir(),
      "view",
      `${packageName}@${version}`,
      "version",
    );
    return output.trim() === version;
  } catch {
    return false;
  }
}

/**
 * Returns the expected git release tag for a given package and version.
 * Follows the convention defined in eng/scripts/Language-Settings.ps1:
 *   ReleaseTag = "$($pkgId)_$($pkgVersion)"
 *
 * @param {string} packageName - the full package name (e.g. "@azure/storage-blob")
 * @param {string} version - the version string (e.g. "1.2.3")
 * @returns {string} the release tag (e.g. "@azure/storage-blob_1.2.3")
 */
export function getReleaseTag(packageName, version) {
  return `${packageName}_${version}`;
}

/**
 * Returns a list of files modified since the given git tag within a package directory.
 *
 * @param {string} tag - the git tag to diff against
 * @param {string} packageDir - absolute path to the package directory
 * @returns {string[]} list of modified file paths (relative to repo root), or empty array if tag doesn't exist
 */
export function getModifiedFilesSinceTag(tag, packageDir) {
  const baseDir = getBaseDir();
  const result = spawnGitWithOutput(baseDir, "diff", "--name-only", tag, "--", packageDir);

  if (result.status !== 0) {
    // Tag doesn't exist or other git error — treat as no modifications detectable
    console.warn(`Could not diff against tag "${tag}": ${result.stderr.trim()}`);
    return [];
  }

  return result.stdout
    .trim()
    .split("\n")
    .filter((line) => line.length > 0);
}

/**
 * Verifies that packages with already-published versions have no source modifications
 * since the release tag. Fails if a published version has modified files (indicating
 * the version needs to be bumped).
 *
 * @param {string[]} packageNames - array of package names
 * @param {string[]} packageDirs - array of corresponding package directory paths
 * @returns {number} 0 if all packages pass, 1 if any package fails
 */
export function verifyPackages(packageNames, packageDirs) {
  let exitCode = 0;

  for (let i = 0; i < packageNames.length; i++) {
    const packageName = packageNames[i];
    const packageDir = packageDirs[i];

    const packageJsonPath = path.join(packageDir, "package.json");
    if (!fs.existsSync(packageJsonPath)) {
      console.error(`package.json not found at ${packageJsonPath}`);
      exitCode = 1;
      continue;
    }

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
    const version = packageJson.version;

    console.log(`\nChecking ${packageName}@${version}...`);

    const published = isVersionPublished(packageName, version);
    if (!published) {
      console.log(`  ✓ Version ${version} is not yet published — OK`);
      continue;
    }

    const tag = getReleaseTag(packageName, version);
    const modifiedFiles = getModifiedFilesSinceTag(tag, packageDir);

    if (modifiedFiles.length === 0) {
      console.log(`  ✓ Version ${version} is published and no files modified since release — OK`);
    } else {
      console.error(
        `  ✗ Version ${version} is already published but files have been modified since tag "${tag}":`,
      );
      for (const file of modifiedFiles) {
        console.error(`    - ${file}`);
      }
      console.error(`  Please bump the version in ${packageJsonPath}`);
      exitCode = 1;
    }
  }

  return exitCode;
}
