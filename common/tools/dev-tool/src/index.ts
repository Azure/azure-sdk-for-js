// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import getArgs from "minimist";

import { createPrinter } from "./util/printer";

import { commands } from "./commands";
import { printCommandUsage } from "./commands/help";

const log = createPrinter("dev-tool");

/**
 * Entry point for the dev-tool command.
 */
async function main() {
  const args = getArgs(process.argv.slice(2), {
    stopEarly: true
  });

  log.debug("Parsed command line:", JSON.stringify(args));

  const commandName = args._[0];
  const commandArgs = args._.slice(1);

  if (commandName === undefined) {
    log.error("No command provided.");
    await printCommandUsage(console.error);
    process.exit(1);
  }

  log.info(`$ ${commandName} ${commandArgs?.join(" ") ?? ""}`);

  if (commands.hasOwnProperty(commandName)) {
    const commandModule = await commands[commandName]();
    const status = await commandModule.default(...commandArgs);

    if (status) {
      log.success("Finished.");
    } else {
      log.error("Errors occurred. See the output above.");
    }
  } else {
    log.error("No such command:", commandName);
    await printCommandUsage(console.error);
    process.exit(1);
  }
}

main().catch(err => {
  log.error("An exception occurred:", err);
  process.exit(1);
});
