// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// @ts-check

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

import { getBaseDir } from "./env.js";

/** @type {Record<"core"|"test-utils"|"identity", string[]>} */
export const reducedDependencyTestMatrix = {
  core: [
    "@azure-rest/synapse-access-control",
    "@azure/arm-resources",
    "@azure/identity",
    "@azure/service-bus",
    "@azure/template",
  ],
  "test-utils": [
    "@azure/arm-eventgrid",
    "@azure/ai-text-analytics",
    "@azure/identity",
    "@azure/template",
  ],
  identity: [
    "@azure/ai-text-analytics",
    "@azure/arm-resources",
    "@azure/identity-cache-persistence",
    "@azure/identity-vscode",
    "@azure/template",
  ],
};

/** @type {string[]} */
export const restrictedToPackages = [
  "@azure/abort-controller",
  "@azure/core-amqp",
  "@azure/core-auth",
  "@azure/core-client",
  "@azure/core-http-compat",
  "@azure/core-lro",
  "@azure/core-paging",
  "@azure/core-rest-pipeline",
  "@azure/core-sse",
  "@azure/core-tracing",
  "@azure/core-util",
  "@azure/core-xml",
  "@azure/logger",
  "@azure-rest/core-client",
  "@typespec/ts-http-runtime",
  "@azure/identity",
  "@azure/arm-resources",
  "@azure-tools/test-perf",
  "@azure-tools/test-recorder",
  "@azure-tools/test-credential",
  "@azure-tools/test-utils",
  "@azure-tools/test-utils-vitest",
];

/**
 * Returns the union of all packages that transitively depend on any of the given packages.
 * Uses a single `turbo ls` call with multiple filters for efficiency.
 *
 * @param {string[]} packageNames - The packages to query dependents for
 * @returns {Set<string> | null} - Set of all package names in the dependency closure
 *   (including the input packages themselves), or null on query failure
 */
function getDependencyClosure(packageNames) {
  const command = process.platform === "win32" ? "pnpm.CMD" : "pnpm";
  const args = ["turbo", "ls"];
  for (const pkg of packageNames) {
    args.push("--filter", `...${pkg}`);
  }
  const result = spawnSync(command, args, {
    cwd: getBaseDir(),
    encoding: "utf-8",
    stdio: ["pipe", "pipe", "pipe"],
  });

  if (result.status !== 0) {
    return null;
  }

  const closure = new Set();
  for (const line of result.stdout.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const name = trimmed.split(/\s+/)[0];
    if (name && name.startsWith("@")) {
      closure.add(name);
    }
  }
  return closure;
}

/**
 * Determines the test filters for changed packages, avoiding cross-batch duplication.
 *
 * For each changed non-restricted package P, the `...P` filter causes turbo to test P
 * plus all packages that depend on P. This catches regressions in dependents but causes
 * duplication when those dependents are also changed and will be tested in their own batch.
 *
 * This function resolves the dependency closure of all packages in this batch using a
 * single turbo query, then checks which "extra" packages (dependents pulled in by `...`)
 * are NOT already changed in the PR. Only packages with such unchained dependents need
 * the `...` prefix; the rest can use a plain filter.
 *
 * @param {string[]} packageNames - packages in this batch that are changed and non-restricted
 * @param {Set<string>} changedPackages - all packages changed in this PR (across all batches)
 * @returns {Map<string, boolean>} - map from package name to whether it needs `...` prefix
 */
function computeDependentFilters(packageNames, changedPackages) {
  const result = new Map();
  const closure = getDependencyClosure(packageNames);

  if (closure === null) {
    // Query failed — be conservative: use `...` for all
    console.log("  turbo query failed, using '...' for all changed packages as fallback");
    for (const p of packageNames) {
      result.set(p, true);
    }
    return result;
  }

  // Extra packages = packages in the closure that are NOT in the batch itself.
  // These are dependents that would be pulled in by `...` filters.
  const batchSet = new Set(packageNames);
  const extraPackages = [...closure].filter((pkg) => !batchSet.has(pkg));

  // If every extra package is already in changedPackages, they'll be tested in their
  // own batch. No package in THIS batch needs `...` to pull them in.
  const allExtrasCovered = extraPackages.every((pkg) => changedPackages.has(pkg));

  if (allExtrasCovered) {
    console.log(
      `  All ${extraPackages.length} dependents are changed in PR, using plain filters for batch`,
    );
    for (const p of packageNames) {
      result.set(p, false);
    }
    return result;
  }

  // Some dependents are NOT changed — we need per-package resolution to determine
  // which packages need `...`. Fall back to individual queries.
  for (const p of packageNames) {
    const pkgClosure = getDependencyClosure([p]);
    if (pkgClosure === null) {
      result.set(p, true);
      continue;
    }
    const hasUnchangedDeps = [...pkgClosure].some(
      (dep) => dep !== p && !changedPackages.has(dep),
    );
    if (hasUnchangedDeps) {
      console.log(`  ${p} -> ...${p} (has dependents not changed in this PR)`);
    } else {
      console.log(`  ${p} -> ${p} (all dependents already changed, skipping ...)`);
    }
    result.set(p, hasUnchangedDeps);
  }
  return result;
}

/**
 * Helper function that determines the filter to use based on each individual package name
 *
 * If the targeted package is one of the restricted packages with a ton of dependents, we only want to run that package
 * and not all of its dependents.
 * @param {string[]} packageNames - An array of strings containing the packages names to run the action on.
 * @param {string} action - The action being performed ("build", "build:test", "build:samples", "test:node", "test:browser"
 * @param {string[]} serviceDirs - An array of strings containing the serviceDirs affected
 * @param {{changedPackages: Set<string>, diff: { changedFiles: string[], changedServices: string[] }} | undefined} [changedInfo=undefined] - information about changed packages
 * @returns {string[]} - An array of workspace filters
 */
export const getFilteredPackages = (packageNames, action, serviceDirs, changedInfo) => {
  /** @type {string[]} */
  const mappedPackages = [];

  let fullPackageNames = packageNames.slice();

  let isReducedTestScopeEnabled = serviceDirs.length > 1;
  for (const dir of serviceDirs) {
    // reducedDependencyTestMatrix is a little misleading, since if we want to test
    // these projects, we need to make sure they are built first, which requires them impacting
    // the build commands as well
    if (reducedDependencyTestMatrix[dir]) {
      isReducedTestScopeEnabled = true;
      for (const dep of reducedDependencyTestMatrix[dir]) {
        if (!fullPackageNames.includes(dep)) {
          fullPackageNames.push(dep);
        }
      }
    }
  }

  if (action.startsWith("build")) {
    for (const packageName of fullPackageNames) {
      /**  @type {string} */
      let filter;

      if (restrictedToPackages.includes(packageName)) {
        // if this is one of our restricted packages with a ton of deps, make it targeted
        // as including all dependents will be too much
        filter = `${packageName}...`; // package and its dependencies
      } else if (action === "build") {
        filter = `...${packageName}...`; // package and its dependents
      } else {
        filter = `...${packageName}...`;
      }

      mappedPackages.push(filter);
    }
  } else {
    // For test actions, we need `...P` to test P's dependents (catch regressions).
    // However, if ALL of P's dependents are also changed in this PR, they will be
    // tested in their own batches and `...P` just causes cross-batch duplication.
    const changedNonRestricted = changedInfo?.changedPackages
      ? fullPackageNames.filter(
          (p) => !restrictedToPackages.includes(p) && changedInfo.changedPackages.has(p),
        )
      : [];
    const filterMap =
      changedNonRestricted.length > 0
        ? computeDependentFilters(changedNonRestricted, changedInfo.changedPackages)
        : new Map();

    mappedPackages.push(
      ...fullPackageNames.map((p) => {
        if (filterMap.has(p)) {
          return filterMap.get(p) ? `...${p}` : p;
        }
        // Restricted, unchanged, or no changedInfo — plain filter
        return p;
      }),
    );
  }

  return mappedPackages;
};

/**
 * Returns an array of full paths to package.json files under a directory
 *
 * @param {string} searchDir - directory to search
 */
const getPackageJSONs = (searchDir) => {
  // This gets all the directories with package.json at the `sdk/<service>/<service-sdk>` level excluding "arm-" packages
  const sdkDirectories = fs
    .readdirSync(searchDir)
    .map((f) => path.join(searchDir, f, "package.json")); // turn potential directory names into package.json paths

  // This gets all the directories with package.json at the `sdk/<service>/<service-sdk>/perf-tests` level excluding "-track-1" perf test packages
  let perfTestDirectories = [];
  const searchPerfTestDir = path.join(searchDir, "perf-tests");
  if (fs.existsSync(searchPerfTestDir)) {
    perfTestDirectories = fs
      .readdirSync(searchPerfTestDir)
      .filter((f) => !f.endsWith("-track-1")) // exclude libraries ending with "-track-1" (perf test projects)
      .map((f) => path.join(searchPerfTestDir, f, "package.json")); // turn potential directory names into package.json paths
  }

  return sdkDirectories.concat(perfTestDirectories).filter((f) => fs.existsSync(f)); // only keep paths for files that actually exist
};

/**
 * Returns package names and package dirs arrays
 *
 * @param {string[]} serviceDirs -
 * @param {string} artifactNames -
 */
export const getServicePackages = (serviceDirs, artifactNames) => {
  /** @type {string[]} */
  const packageNames = [];
  /** @type {string[]} */
  const packageDirs = [];
  let validSdkTypes = ["client", "mgmt", "perf-test", "utility"]; // valid "sdk-type"s that we are looking for, to be able to apply ci-runner jobs on
  const artifacts = artifactNames.split(",");
  for (const serviceDir of serviceDirs) {
    const searchDir = path.resolve(path.join(getBaseDir(), "sdk", serviceDir));
    const packageJSONs = getPackageJSONs(searchDir);
    for (const filePath of packageJSONs) {
      const contents = JSON.parse(fs.readFileSync(filePath, "utf8"));
      const artifactName = contents.name.replace("@", "").replace("/", "-");
      if (
        validSdkTypes.includes(contents["sdk-type"]) &&
        (artifactNames.length === 0 || artifacts.includes(artifactName))
      ) {
        packageNames.push(contents.name);
        packageDirs.push(path.dirname(filePath));
      }
    }
  }

  return {
    packageNames: Array.from(new Set(packageNames)),
    packageDirs: Array.from(new Set(packageDirs)),
  };
};

/**
 * Helper function to get the relative path of a package directory from an absolute
 * one
 *
 * @param {string} absolutePath absolute path to a package
 * @returns either the relative path of the package starting from the "sdk" directory
 *          or the just the absolute path itself if "sdk" if not found
 */
export function tryGetPkgRelativePath(absolutePath) {
  const sdkDirectoryPathStartIndex = absolutePath.lastIndexOf("sdk");
  return sdkDirectoryPathStartIndex === -1
    ? absolutePath
    : absolutePath.substring(sdkDirectoryPathStartIndex);
}
