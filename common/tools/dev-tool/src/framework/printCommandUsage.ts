// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

import { CommandLoader } from "./CommandModule";
import { CommandInfo, CommandOptions } from "./CommandInfo";

/**
 * The stack of subcommands executed so far
 *
 * Used in help output.
 */
export const commandStack: string[] = [];

/**
 * Prints the help information for a given command
 *
 * @param info CommandInfo structure to use in printing command information
 * @param subCommands optional CommandLoader structure that defines subcommand usage
 * @param println optionally override the default printer
 */
export async function printCommandUsage(
  info: CommandInfo<CommandOptions>,
  subCommands?: CommandLoader,
  println: (...values: string[]) => void = console.log
): Promise<void> {
  println(`${info.name} - ${info.description}\n`);
  println(
    `Usage: ${commandStack.join(" ")} [OPTIONS] ${
      subCommands !== undefined ? "COMMAND [... COMMAND-OPTIONS]" : ""
    }\n`
  );

  // OPTIONS info
  println("Options:");
  println("  --help\t<boolean> display this help message");
  if (info.options) {
    for (const [k, option] of Object.entries(info.options)) {
      const shortName = option.shortName !== undefined ? `-${option.shortName},` : "";
      const valueType = option.kind !== "boolean" ? "<string>" : "<boolean>";
      const acceptsMulti =
        option.kind === "string" && option.allowMultiple ? " (can be set multiple times)" : "";
      println(`  ${shortName}--${k}\t${valueType} ${option.description}${acceptsMulti}`);
    }
  }

  // COMMAND info
  if (subCommands) {
    println();
    println("COMMAND indicates the subcommand to be run. It can be one of the following:\n");

    // Compute the number of tabs needed to separate commands from
    // docstrings assuming a default command-line tabstop of 8
    const tabs = Math.ceil(
      (Math.max(...Object.keys(subCommands).map((key) => key.length + 2)) + 1) / 8
    );

    for (const [command, load] of Object.entries(subCommands)) {
      const module = await load();
      const indent = "\t".repeat(tabs - Math.floor((command.length + 2) / 8));
      println(`  ${command}${indent}${module.commandInfo.description}`);
    }
  }

  println();
}
