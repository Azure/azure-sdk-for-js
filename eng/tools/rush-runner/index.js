// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// @ts-check

import { exit } from "node:process";
import { executeActions } from "./src/actions.js";
import { parseArgs } from "./src/args.js";

async function main() {
  const { action, serviceDirs, rushParams, artifactNames } = parseArgs();
  const exitCode = await executeActions(action, serviceDirs, rushParams, artifactNames);
  exit(exitCode);
}

main().catch(err => {
  console.error(err);
  exit(1);
});
