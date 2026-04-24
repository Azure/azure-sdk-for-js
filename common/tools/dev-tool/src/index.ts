// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import chalk from "chalk";

import { baseCommand } from "./commands";
import { writeStderr } from "./util/stdio.js";

// The main command is implemented using the same `subCommand` method.
baseCommand(...process.argv.slice(2)).catch((err) => {
  writeStderr(chalk.red("[Internal Error]", err.message));
  writeStderr(chalk.red("[Internal Error]", err.stack));
  if (err.cause) {
    writeStderr(chalk.red("[Internal Error Cause]", err.cause.message));
    writeStderr(chalk.red("[Internal Error Cause]", err.cause.stack));
  }
  process.exit(255);
});
