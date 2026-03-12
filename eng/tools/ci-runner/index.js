// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// @ts-check

import { exit } from "node:process";
import { executeActions } from "./src/actions.js";
import { parseProcessArgs } from "./src/args.js";
import { getChangedInfo } from "./src/changed.js";

async function main() {
  const {
    action,
    serviceDirs,
    extraParams,
    artifactNames,
    ciFlag,
    packageInfoPath,
    changeInfoPath,
  } = parseProcessArgs();
  const changedInfo = await getChangedInfo(packageInfoPath, changeInfoPath);
  exit(executeActions(action, serviceDirs, extraParams, artifactNames, ciFlag, changedInfo));
}

main().catch((err) => {
  console.error(err);
  exit(1);
});
