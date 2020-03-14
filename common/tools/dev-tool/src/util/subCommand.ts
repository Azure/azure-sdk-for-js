// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

import getArgs from "minimist";

import { Command } from "../commands";
import { createPrinter } from "./printer";
import { printCommandUsage } from "../commands/help";

export function subCommand(name: string, commands: {
  [k: string]: () => Promise<Command>;
}): (...args: string[]) => Promise<boolean> {
  const log = createPrinter(name);
  return async (...rawArgs: string[]) => {
    const args = getArgs(rawArgs, {
      stopEarly: true,
      boolean: ["help"]
    });
    
    log.debug("Parsed command line:", JSON.stringify(args));

    const commandName = args._[0];
    const commandArgs = args._.slice(1);

    if (commandName === undefined) {
      log.error("No command provided.");
      await printCommandUsage(commands, console.error);
      process.exit(1);
    }

    log.info(`$ ${commandName} ${commandArgs?.join(" ") ?? ""}`);

    if (commands.hasOwnProperty(commandName)) {
      const commandModule = await commands[commandName]();
      const status = await commandModule.default(...commandArgs);

      if (status) {
        log.success("Finished.");
        return true;
      } else {
        log.error("Errors occurred. See the output above.");
        return false;
      }
    } else {
      log.error("No such command:", commandName);
      await printCommandUsage(commands, console.error);
      process.exit(1);
    }
  };
}
