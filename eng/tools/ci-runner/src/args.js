// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// @ts-check

export function parseProcessArgs() {
  return parseArgs(process.argv);
}

export function parseArgs(argv) {
  if (argv.length < 3 || argv.some((a) => ["-h", "--help"].includes(a.toLowerCase()))) {
    console.error("Usage: index.js <action> [<servicename>...] [args...]");
    console.error("Example: index.js build keyvault storage --verbose");
    process.exit(1);
  }

  let inFlags = false;
  let isPackageFilter = false;
  let artifactNames = "";
  let ciFlag = false;
  let isPackageInfo = false;
  let packageInfoPath = "";
  let isChangeInfo = false;
  let changeInfoPath = "";
  const services = [],
    flags = [];
  const [_scriptPath, action, ...givenArgs] = argv.slice(1);

  for (const arg of givenArgs) {
    if (arg === "-packages") {
      isPackageFilter = true;
      continue;
    } else if (arg === "-packageInfo") {
      isPackageInfo = true;
      continue;
    } else if (arg === "-changeInfo") {
      isChangeInfo = true;
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
    } else if (isPackageInfo) {
      packageInfoPath = arg;
      isPackageInfo = false;
    } else if (isChangeInfo) {
      changeInfoPath = arg;
      isChangeInfo = false;
    } else {
      if (arg && arg !== "*") {
        // exclude empty value and special value "*" meaning all libraries
        services.push(...arg.split(" "));
      }
    }
  }

  return {
    action,
    serviceDirs: services,
    extraParams: flags,
    artifactNames,
    ciFlag,
    packageInfoPath,
    changeInfoPath,
  };
}
