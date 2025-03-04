// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// @ts-check

import { exit } from "node:process";
import { executeActions } from "./src/actions.js";
import { parseArgs } from "./src/args.js";

function main() {
  const { action, serviceDirs, rushParams, artifactNames, ciFlag } = parseArgs();
  exit(executeActions(action, serviceDirs, rushParams, artifactNames, ciFlag));
}

main();
