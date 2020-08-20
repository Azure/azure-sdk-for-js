// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chalk from "chalk";

import { baseCommand } from "./commands";

// The main command is implemented using the same `subCommand` method.
baseCommand(...process.argv.slice(2)).catch((err) => {
  console.trace(chalk.red("[Internal Error]", err.stack));
  process.exit(1);
});
