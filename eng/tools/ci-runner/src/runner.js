// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// @ts-check

import { spawnPnpm, spawnPnpmRun, spawnPnpmWithOutput } from "./spawn.js";
import { getBaseDir } from "./env.js";
import { runTestProxyRestore } from "./testProxyRestore.js";

/**
 * Helper to run a global pnpm command
 * @param {string} action - which action to execute
 * @param {string[]} runParams - what parameters to pass
 */
export function runGlobalAction(action, runParams) {
  return spawnPnpm(getBaseDir(), action, ...runParams);
}

// Windows cmd.exe has an 8191-character command line limit. When a PR changes
// hundreds of packages, the `--filter !pkg` exclusions alone can produce a 16K+
// command. We trigger two-pass resolution below this threshold to stay safe.
const CMD_LENGTH_THRESHOLD = 7000;

/**
 * When the full pnpm command would exceed the Windows cmd.exe limit, resolve
 * the inclusion filters to concrete package names via `pnpm list`, apply
 * exclusions in JavaScript, and return short `--filter name` args.
 *
 * @param {string[]} filters - The full filter list from getFilteredPackages (may contain `!pkg` exclusions)
 * @returns {string[]} - flat `["-F", "name", ...]` args safe for any shell
 */
function resolveFiltersToConcreteNames(filters) {
  const inclusionFilters = filters.filter((f) => !f.startsWith("!"));
  const exclusionSet = new Set(filters.filter((f) => f.startsWith("!")).map((f) => f.slice(1)));

  const inclusionArgs = inclusionFilters.flatMap((f) => ["-F", f]);

  let resolvedNames;
  try {
    const listOutput = spawnPnpmWithOutput(
      getBaseDir(),
      "list",
      "--json",
      "--depth",
      "-1",
      ...inclusionArgs,
    );
    const parsed = JSON.parse(listOutput);
    resolvedNames = parsed.map((/** @type {{ name: string }} */ p) => p.name);
  } catch (e) {
    console.error("Failed to resolve packages via pnpm list, falling back to original filters", e);
    return filters.flatMap((f) => ["-F", f]);
  }

  const filtered = resolvedNames.filter((/** @type {string} */ name) => !exclusionSet.has(name));

  // If resolution yields no packages (either pnpm list returned nothing or all were
  // excluded), fall back to the original filters. Returning an empty filter list
  // would cause the caller to run the action with no --filter at all, which
  // would unintentionally target the entire monorepo.
  if (filtered.length === 0) {
    console.warn(
      "Filter resolution produced no concrete packages; falling back to original filter list",
    );
    return filters.flatMap((f) => ["-F", f]);
  }

  console.log(
    `Resolved ${resolvedNames.length} packages from inclusion filters, ` +
      `excluded ${resolvedNames.length - filtered.length}, testing ${filtered.length}`,
  );

  return filtered.flatMap((/** @type {string} */ name) => ["-F", name]);
}

/**
 * Helper function to invoke the run logic split up by direction.
 *
 * @param {string} action - which action to execute
 * @param {string[]} filters - Any array of strings containing ["direction packageName"...]
 * @param {string[]} extraParams - what parameters to pass
 * @param {boolean|undefined} [ciFlag=undefined] ciFlag - whether it is in CI
 */
export function runAllWithDirection(action, filters, extraParams, ciFlag) {
  console.dir({
    action,
    label: `runAllWithDirection - 1`,
    filteredPackages: filters,
  });

  let packages = filters.flatMap((pkg) => {
    return ["-F", pkg];
  });

  // If the command line would exceed the Windows cmd.exe 8191-char limit,
  // resolve the filter list to concrete package names. This replaces hundreds
  // of `--filter !pkg` exclusions with a short list of `--filter name` entries.
  const filterArgsLength =
    packages.reduce((sum, arg) => sum + arg.length, 0) + Math.max(packages.length - 1, 0);
  if (filterArgsLength > CMD_LENGTH_THRESHOLD) {
    console.log(
      `Filter args are ${filterArgsLength} chars (exceeds ${CMD_LENGTH_THRESHOLD}), ` +
        `using two-pass resolution to shorten command line`,
    );
    packages = resolveFiltersToConcreteNames(filters);
  }

  // Restore assets for packages that are being 'unit-test'-ed in the CI pipeline
  if (
    // 1. eng/tools/ci-runner/index.js is running in CI: "--ci" flag is set
    // Example: node eng/tools/ci-runner/index.js test:node servicebus template -packages "azure-service-bus,azure-template" --ci
    ciFlag &&
    // 2. Ensure not in "live" or "record" mode (run only in playback mode)
    (!process.env.TEST_MODE || !["live", "record"].includes(process.env.TEST_MODE)) &&
    // 3. Ensure the action is either 'test:node' or 'test:browser' (unit tests)
    ["test:node", "test:browser"].includes(action)
  ) {
    // Get the list of packages to run the action on
    let listCommandOutput = spawnPnpmWithOutput(
      getBaseDir(),
      "list",
      "--json",
      "--depth",
      "-1",
      ...packages,
    );

    try {
      //TODO: find out list of packages to run unit tests
    } catch (error) {
      console.error("Error running list command:", error);
    }

    if (listCommandOutput) {
      // Parse the output to get package names
      const parsed = JSON.parse(listCommandOutput);
      // Run test-proxy restore for the parsed packages
      runTestProxyRestore(parsed);
    }
  }
  return spawnPnpm(getBaseDir(), action, ...packages, ...extraParams);
}

/**
 * Helper function to invoke `npm run` in the specified package folders.
 *
 * @param {string} action - which action to execute
 * @param {string[]} packageDirs - An array of package folder paths
 * @param { (dir: string) => void} [onError] - An error callback when a command fails in a directory
 */
export function runInPackageDirs(action, packageDirs, onError) {
  let exitCode = 0;
  for (const packageDir of packageDirs) {
    let dirExitCode = spawnPnpmRun(packageDir, action);
    if (dirExitCode !== 0 && onError) {
      onError(packageDir);
    }
    exitCode = exitCode || dirExitCode;
  }
  return exitCode;
}
