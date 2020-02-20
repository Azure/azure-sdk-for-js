// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chalk from "chalk";
import getArgs from "minimist";

import { createPrinter } from "./util/printer";

const log = createPrinter("dev-tool");

const args = getArgs(process.argv.slice(2), {
  stopEarly: true
});

async function main() {
  const commandName = args._[0];
  const commandArgs = args._.slice(1);

  log.info(`$ ${commandName} ${commandArgs?.join(" ") ?? ""}`);

  const main = require("./commands/" + commandName + ".ts").default;

  const status = await main(...commandArgs);

  if (status) {
    log.success("Finished.");
  } else {
    log.error("Errors occurred. See the output above.");
  }
}

main().catch(err => {
  log.error("An exception occurred.");
  console.trace(chalk.red(err));
});

