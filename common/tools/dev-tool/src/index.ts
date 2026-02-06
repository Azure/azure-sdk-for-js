// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import chalk from "chalk";

import { baseCommand } from "./commands/index.ts";

// The main command is implemented using the same `subCommand` method.
baseCommand(...process.argv.slice(2)).catch((err) => {
  console.error(chalk.red("[Internal Error]", err.message));
  console.trace(chalk.red("[Internal Error]", err.stack));
  if (err.cause) {
    console.error(chalk.red("[Internal Error Cause]", err.cause.message));
    console.trace(chalk.red("[Internal Error Cause]", err.cause.stack));
  }
  process.exit(255);
});
