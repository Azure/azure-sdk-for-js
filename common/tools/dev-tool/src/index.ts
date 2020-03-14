// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chalk from "chalk";

import { commands } from "./commands";
import { subCommand } from "./util/subCommand";

// The main command is implemented using the same `subCommand` method,
// making the command semantics truly recursive.
subCommand("dev-tool", commands)(...process.argv.slice(2)).catch(err => {
  console.trace(chalk.red("[Internal Error] An unhandled exception occurred:", err));
  process.exit(1);
});
