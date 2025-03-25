// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// @ts-check

export function parseArgs() {
  if (
    process.argv.length < 3 ||
    process.argv.some((a) => ["-h", "--help"].includes(a.toLowerCase()))
  ) {
    console.error("Usage: rush-runner/index.js <action> [<servicename>...] [args...]");
    console.error("Example: rush-runner/index.js build keyvault storage --verbose");
    process.exit(1);
  }

  let inFlags = false;
  let isPackageFilter = false;
  let artifactNames = "";
  let ciFlag = false;
  const services = [],
    flags = [];
  const [_scriptPath, action, ...givenArgs] = process.argv.slice(1);

  for (const arg of givenArgs) {
    if (arg === "-packages") {
      isPackageFilter = true;
      continue;
    } else if (!inFlags && arg.startsWith("-")) {
      inFlags = true;
    }

    if (inFlags) {
      if (arg === "--ci") {
        ciFlag = true;
      } else {
        flags.push(arg);
      }
    } else if (isPackageFilter) {
      artifactNames = arg;
      isPackageFilter = false;
    } else {
      if (arg && arg !== "*") {
        // exclude empty value and special value "*" meaning all libraries
        services.push(...arg.split(" "));
      }
    }
  }

  return { action, serviceDirs: services, rushParams: flags, artifactNames, ciFlag };
}
