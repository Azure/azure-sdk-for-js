// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// @ts-check

import process from "node:process";
import path from "node:path";
import { spawnSync } from "node:child_process";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import semver from "semver";
import { getPackageJsons, readFileJson } from "@azure-tools/eng-package-utils";

const argv = yargs(hideBin(process.argv))
  .options({
    "repo-root": {
      type: "string",
      default: "../../../",
      describe: "root of the repository (e.g. ../../../)",
      demandOption: true,
    },
    "base-ref": {
      type: "string",
      default: "origin/main",
      describe: "base reference to compare against for changes",
      demandOption: false,
    },
  })
  .help().argv;

/**
 * Get list of changed files using git diff
 * @param {string} repoRoot - The root directory of the repository
 * @param {string} baseRef - The base reference to compare against
 * @returns {string[]} Array of changed file paths
 */
function getChangedFiles(repoRoot, baseRef) {
  try {
    const result = spawnSync("git", ["diff", "--name-only", baseRef, "HEAD"], {
      cwd: repoRoot,
      encoding: "utf8",
      stdio: ["pipe", "pipe", "pipe"],
    });

    if (result.status !== 0) {
      console.warn(`Failed to get changed files (exit code ${result.status}): ${result.stderr}`);
      console.warn(`Command: git diff --name-only ${baseRef} HEAD`);
      console.warn(`Working directory: ${repoRoot}`);
      return [];
    }

    const files = result.stdout.split("\n").filter((file) => file.trim().length > 0);

    console.log(`Found ${files.length} changed files`);
    if (files.length > 0) {
      console.log("Sample changed files:", files.slice(0, 5));
    }

    return files;
  } catch (error) {
    console.error("Error getting changed files:", error);
    return [];
  }
}

/**
 * Get packages that have changes in their src/ directory
 * @param {string} repoRoot - The root directory of the repository
 * @param {string} baseRef - The base reference to compare against
 * @returns {Promise<Map<string, string>>} Map of package names to their paths
 */
async function getPackagesWithSrcChanges(repoRoot, baseRef) {
  try {
    const changedFiles = getChangedFiles(repoRoot, baseRef);
    const allPackages = await getPackageJsons(repoRoot);
    const packagesWithSrcChanges = new Map();

    // Check each package to see if it has src/ changes
    for (const [packageName, packageInfo] of Object.entries(allPackages)) {
      const packagePath = packageInfo.projectFolder;
      const hasSourceChanges = changedFiles.some((file) => {
        const normalizedFile = file.replace(/\\/g, "/");
        const packageSrcPattern = `${packagePath}/src/`;
        return normalizedFile.startsWith(packageSrcPattern);
      });

      if (hasSourceChanges) {
        packagesWithSrcChanges.set(packageName, path.join(repoRoot, packagePath));
      }
    }

    return packagesWithSrcChanges;
  } catch (error) {
    console.error("Error getting packages with src changes:", error);
    return new Map();
  }
}

/**
 * Get the last published stable or beta version for a package
 * @param {string} packageName - The name of the package
 * @returns {Promise<string|null>} The last published stable/beta version or null if not found
 */
async function getLastPublishedStableBetaVersion(packageName) {
  try {
    // Use npm view to get all versions with their publication times
    const result = spawnSync("npm", ["view", packageName, "time", "--json"], {
      encoding: "utf8",
      stdio: ["pipe", "pipe", "pipe"],
    });

    if (result.status !== 0) {
      console.warn(`Failed to get version info for ${packageName}: ${result.stderr}`);
      return null;
    }

    const timeData = JSON.parse(result.stdout);

    // Get all version entries except 'created' and 'modified'
    const versions = Object.keys(timeData).filter(
      (key) => key !== "created" && key !== "modified" && semver.valid(key),
    );

    if (versions.length === 0) {
      return null;
    }

    // Sort versions by publication time (most recent first)
    versions.sort((a, b) => {
      const timeA = new Date(timeData[a]);
      const timeB = new Date(timeData[b]);
      return timeB.getTime() - timeA.getTime();
    });

    // Find the latest stable or beta version (not alpha)
    for (const version of versions) {
      const parsed = semver.parse(version);
      if (parsed) {
        // Check if it's stable (no prerelease) or beta (contains 'beta' in prerelease)
        if (
          !parsed.prerelease.length ||
          parsed.prerelease.some((part) => typeof part === "string" && part.includes("beta"))
        ) {
          return version;
        }
      }
    }

    return null;
  } catch (error) {
    console.error(`Error getting version info for ${packageName}:`, error);
    return null;
  }
}

/**
 * Get the current version of a package from its package.json
 * @param {string} packagePath - Path to the package directory
 * @returns {Promise<string|null>} The current version or null if not found
 */
async function getCurrentPackageVersion(packagePath) {
  try {
    const packageJsonPath = path.join(packagePath, "package.json");
    const packageJson = await readFileJson(packageJsonPath);
    return packageJson.version || null;
  } catch (error) {
    console.error(`Error reading package.json for ${packagePath}:`, error);
    return null;
  }
}

/**
 * Main validation function
 * @param {string} repoRoot - The root directory of the repository
 * @param {string} baseRef - The base reference to compare against
 */
async function validatePullRequestVersions(repoRoot, baseRef) {
  console.log("🔍 Checking for packages with src/ changes but no version bump...");

  const packagesWithSrcChanges = await getPackagesWithSrcChanges(repoRoot, baseRef);

  if (packagesWithSrcChanges.size === 0) {
    console.log("✅ No packages with src/ changes found.");
    return true;
  }

  console.log(`📦 Found ${packagesWithSrcChanges.size} package(s) with src/ changes:`);
  for (const [packageName] of packagesWithSrcChanges) {
    console.log(`  - ${packageName}`);
  }

  const violations = [];

  for (const [packageName, packagePath] of packagesWithSrcChanges) {
    console.log(`\n🔍 Checking ${packageName}...`);

    const currentVersion = await getCurrentPackageVersion(packagePath);
    if (!currentVersion) {
      console.warn(`⚠️  Could not read current version for ${packageName}`);
      continue;
    }

    const lastPublishedVersion = await getLastPublishedStableBetaVersion(packageName);
    if (!lastPublishedVersion) {
      console.log(
        `📝 ${packageName}: No published stable/beta version found, assuming new package`,
      );
      continue;
    }

    console.log(`📊 ${packageName}:`);
    console.log(`   Current version: ${currentVersion}`);
    console.log(`   Last published stable/beta: ${lastPublishedVersion}`);

    // Compare versions
    if (semver.eq(currentVersion, lastPublishedVersion)) {
      console.log(`❌ Version not bumped despite src/ changes`);
      violations.push({
        packageName,
        currentVersion,
        lastPublishedVersion,
      });
    } else {
      console.log(`✅ Version has been updated`);
    }
  }

  if (violations.length > 0) {
    console.log(
      `\n❌ Found ${violations.length} package(s) with src/ changes but no version bump:`,
    );
    for (const violation of violations) {
      console.log(
        `  - ${violation.packageName}: ${violation.currentVersion} (unchanged from published)`,
      );
    }
    console.log("\n💡 Please bump the version for packages with source code changes.");
    return false;
  }

  console.log("\n✅ All packages with src/ changes have appropriate version bumps!");
  return true;
}

async function main(argv) {
  const repoRoot = path.resolve(argv["repo-root"]);
  const baseRef = argv["base-ref"];

  console.log(`Repository root: ${repoRoot}`);
  console.log(`Base reference: ${baseRef}`);

  try {
    const isValid = await validatePullRequestVersions(repoRoot, baseRef);

    if (!isValid) {
      process.exit(1);
    }

    process.exit(0);
  } catch (error) {
    console.error("❌ Validation failed with error:", error);
    process.exit(1);
  }
}

main(argv);
