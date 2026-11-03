// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// @ts-check

import fs from "node:fs";
import path from "node:path";

import { spawnGitWithOutput, spawnPnpmWithOutput } from "./spawn.js";
import { getBaseDir } from "./env.js";
import { reportFailure } from "./reporting.js";

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
 * @param {{ repositoryDir?: string, repositoryUrl?: string }} [options] - repository overrides
 * @returns {string} the commit hash for the tag
 * @throws {Error} if the tag is not found on the remote or git ls-remote fails
 */
export function resolveTagToCommit(tag, options = {}) {
  const repositoryDir = options.repositoryDir ?? getBaseDir();
  const repositoryUrl = options.repositoryUrl ?? REMOTE_URL;
  const tagRef = `refs/tags/${tag}`;
  const peeledTagRef = `${tagRef}^{}`;
  const result = spawnGitWithOutput(
    repositoryDir,
    "ls-remote",
    repositoryUrl,
    "--tags",
    `${tagRef}*`,
  );

  if (result.status !== 0) {
    throw new Error(
      `git ls-remote failed with exit code ${result.status}: ${result.stderr.trim()}`,
    );
  }

  const output = result.stdout.trim();
  if (!output) {
    throw new Error(`Tag "${tag}" not found on remote`);
  }

  const refs = output.split(/\r?\n/);
  const peeledTag = refs.find((line) => line.endsWith(`\t${peeledTagRef}`));
  const tagObject = refs.find((line) => line.endsWith(`\t${tagRef}`));
  const resolvedTag = peeledTag ?? tagObject;
  if (!resolvedTag) {
    throw new Error(`Tag "${tag}" not found on remote`);
  }
  return resolvedTag.split("\t")[0];
}

/**
 * Ensures the release commit exists locally without introducing a shallow boundary.
 *
 * @param {string} tag - the git tag to fetch
 * @param {string} commitHash - the resolved release commit
 * @param {string} repositoryDir - local repository directory
 * @param {string} repositoryUrl - remote repository URL
 * @throws {Error} if git fetch fails
 */
function ensureCommitAvailable(tag, commitHash, repositoryDir, repositoryUrl) {
  let result = spawnGitWithOutput(repositoryDir, "cat-file", "-e", commitHash);
  if (result.status === 0) {
    return;
  }

  result = spawnGitWithOutput(
    repositoryDir,
    "fetch",
    "--no-tags",
    repositoryUrl,
    `refs/tags/${tag}`,
  );

  if (result.status !== 0) {
    throw new Error(`git fetch failed with exit code ${result.status}: ${result.stderr.trim()}`);
  }

  result = spawnGitWithOutput(repositoryDir, "cat-file", "-e", commitHash);
  if (result.status !== 0) {
    throw new Error(`Fetched tag "${tag}" does not contain resolved commit ${commitHash}`);
  }
}

/**
 * Returns a list of files modified since the given git tag within a package directory.
 * Resolves and fetches the tag before diffing, since CI environments may not
 * have remote tags or their objects available locally.
 *
 * @param {string} tag - the git tag to diff against
 * @param {string} packageDir - absolute path to the package directory
 * @param {{ repositoryDir?: string, repositoryUrl?: string }} [options] - repository overrides
 * @returns {string[]} list of modified file paths (relative to repo root)
 * @throws {Error} if the tag cannot be resolved or fetched, or git diff fails
 */
export function getModifiedFilesSinceTag(tag, packageDir, options = {}) {
  const repositoryDir = options.repositoryDir ?? getBaseDir();
  const repositoryUrl = options.repositoryUrl ?? REMOTE_URL;
  const commitHash = resolveTagToCommit(tag, { repositoryDir, repositoryUrl });
  ensureCommitAvailable(tag, commitHash, repositoryDir, repositoryUrl);

  const relativePackageDir = path.relative(repositoryDir, packageDir).split(path.sep).join("/");
  const result = spawnGitWithOutput(
    repositoryDir,
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
 * Includes only JavaScript and TypeScript files (.ts, .js, .mts, .mjs, .cts, .cjs, .tsx, .jsx)
 * under the src/ directory, which contains the publishable source code.
 * Excludes test files, samples, config files in the package root (vitest, karma, etc.),
 * generated/ (raw codegen output not published directly), and other non-published directories.
 *
 * @param {string[]} files - list of file paths (relative to repo root)
 * @param {string} packageRelativeDir - the package directory relative to the repo root (forward-slash separated)
 * @returns {string[]} filtered list of relevant source file paths
 */
export function filterRelevantFiles(files, packageRelativeDir) {
  const sourceExtensions = /\.(ts|js|mts|mjs|cts|cjs|tsx|jsx)$/;
  const sourceDirPattern = /^src\//;
  const prefix = packageRelativeDir.endsWith("/") ? packageRelativeDir : `${packageRelativeDir}/`;

  return files.filter((file) => {
    const relativePath = file.startsWith(prefix) ? file.slice(prefix.length) : file;
    return sourceExtensions.test(relativePath) && sourceDirPattern.test(relativePath);
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
      reportFailure(
        `Package version check failed for ${packageName}: package.json not found at ${packageJsonPath}.`,
      );
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
      reportFailure(
        `Package version check failed for ${packageName}@${version}: could not diff against tag "${tag}": ${err instanceof Error ? err.message : String(err)}`,
      );
      exitCode = 1;
      continue;
    }

    const baseDir = getBaseDir();
    const relativePackageDir = path.relative(baseDir, packageDir).split(path.sep).join("/");
    const relevantFiles = filterRelevantFiles(modifiedFiles, relativePackageDir);

    if (relevantFiles.length === 0) {
      console.log(`  ✓ Version ${version} is published and no files modified since release — OK`);
    } else {
      reportFailure(
        `Package version check failed for ${packageName}@${version}: source files changed after published tag "${tag}". Run "npx dev-tool package increment-version" from ${relativePackageDir} and commit the resulting changes.`,
      );
      for (const file of relevantFiles) {
        console.error(`    - ${file}`);
      }
      exitCode = 1;
    }
  }

  return exitCode;
}
