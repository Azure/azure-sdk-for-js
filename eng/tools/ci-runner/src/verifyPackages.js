// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// @ts-check

import fs from "node:fs";
import path from "node:path";

import { spawnGitWithOutput, spawnPnpmWithOutput } from "./spawn.js";
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

const REMOTE_URL = "https://github.com/Azure/azure-sdk-for-js.git";

/**
 * Resolves a git tag to its commit hash by querying the remote repository.
 * This is needed in CI where remote tags are not fetched locally.
 *
 * @param {string} tag - the git tag to resolve
 * @returns {string} the commit hash for the tag
 * @throws {Error} if the tag is not found on the remote or git ls-remote fails
 */
export function resolveTagToCommit(tag) {
  const baseDir = getBaseDir();
  const result = spawnGitWithOutput(baseDir, "ls-remote", REMOTE_URL, "--tags", tag);

  if (result.status !== 0) {
    throw new Error(
      `git ls-remote failed with exit code ${result.status}: ${result.stderr.trim()}`,
    );
  }

  const output = result.stdout.trim();
  if (!output) {
    throw new Error(`Tag "${tag}" not found on remote`);
  }

  // git ls-remote output format: "<commit>\trefs/tags/<tagName>"
  const commitHash = output.split("\t")[0];
  return commitHash;
}

/**
 * Returns a list of files modified since the given git tag within a package directory.
 * Resolves the tag to a commit hash via git ls-remote before diffing, since CI
 * environments may not have remote tags fetched locally.
 *
 * @param {string} tag - the git tag to diff against
 * @param {string} packageDir - absolute path to the package directory
 * @returns {string[]} list of modified file paths (relative to repo root)
 * @throws {Error} if the tag cannot be resolved or git diff fails
 */
export function getModifiedFilesSinceTag(tag, packageDir) {
  const commitHash = resolveTagToCommit(tag);

  const baseDir = getBaseDir();
  const relativePackageDir = path.relative(baseDir, packageDir).split(path.sep).join("/");
  const result = spawnGitWithOutput(
    baseDir,
    "diff",
    "--name-only",
    commitHash,
    "--",
    relativePackageDir,
  );

  if (result.status !== 0) {
    throw new Error(`git diff failed with exit code ${result.status}: ${result.stderr.trim()}`);
  }

  return result.stdout
    .trim()
    .split("\n")
    .filter((line) => line.length > 0);
}

/**
 * Filters a list of modified files to only those that are relevant source changes.
 * Includes only JavaScript and TypeScript files (.ts, .js, .mts, .mjs, .cts, .cjs, .tsx, .jsx),
 * excluding files under test/, samples/, or samples-dev/ directories (relative to the package root).
 *
 * @param {string[]} files - list of file paths (relative to repo root)
 * @param {string} packageRelativeDir - the package directory relative to the repo root (forward-slash separated)
 * @returns {string[]} filtered list of relevant source file paths
 */
export function filterRelevantFiles(files, packageRelativeDir) {
  const sourceExtensions = /\.(ts|js|mts|mjs|cts|cjs|tsx|jsx)$/;
  const ignoredDirPattern = /^(test|samples|samples-dev)\//;
  const prefix = packageRelativeDir.endsWith("/") ? packageRelativeDir : `${packageRelativeDir}/`;

  return files.filter((file) => {
    const relativePath = file.startsWith(prefix) ? file.slice(prefix.length) : file;
    return sourceExtensions.test(relativePath) && !ignoredDirPattern.test(relativePath);
  });
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

    /** @type {string[]} */
    let modifiedFiles;
    try {
      modifiedFiles = getModifiedFilesSinceTag(tag, packageDir);
    } catch (err) {
      console.error(`  ✗ Could not diff against tag "${tag}": ${err.message}`);
      exitCode = 1;
      continue;
    }

    const baseDir = getBaseDir();
    const relativePackageDir = path.relative(baseDir, packageDir).split(path.sep).join("/");
    const relevantFiles = filterRelevantFiles(modifiedFiles, relativePackageDir);

    if (relevantFiles.length === 0) {
      console.log(`  ✓ Version ${version} is published and no files modified since release — OK`);
    } else {
      console.error(
        `  ✗ Version ${version} is already published but files have been modified since tag "${tag}":`,
      );
      for (const file of relevantFiles) {
        console.error(`    - ${file}`);
      }
      console.error(
        `  Please bump the version in ${packageJsonPath}. You can do this using "dev-tool package increment-version" from the package folder.`,
      );
      exitCode = 1;
    }
  }

  return exitCode;
}
