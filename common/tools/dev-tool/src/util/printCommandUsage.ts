// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

import { CommandInfo, CommandLoader } from "./commandModule";

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
  info: CommandInfo,
  subCommands?: CommandLoader,
  println: (...values: string[]) => void = console.log
) {
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
    for (const k in info.options) {
      if (info.options.hasOwnProperty(k)) {
        const shortName =
          info.options[k].shortName !== undefined
            ? `-${info.options[k].shortName},`
            : "";
        const valueType = info.options[k].kind !== "boolean"
            ? "<string>"
            : "<boolean>";
        const acceptsMulti = info.options[k].kind === "multistring"
            ? " (can be set multiple times)"
            : "";
        println(`  ${shortName}--${k}\t${valueType} ${info.options[k].description}${acceptsMulti}`);
      }
    }
  }

  // COMMAND info
  if (subCommands) {
    println();
    println(
      "COMMAND indicates the subcommand to be run. It can be one of the following:\n"
    );

    // Compute the number of tabs needed to separate commands from
    // docstrings assuming a default command-line tabstop of 8
    const tabs = Math.ceil(
      (Math.max(
        ...Object.keys(subCommands)
          .filter(key => subCommands.hasOwnProperty(key))
          .map(key => key.length + 2)
      ) +
        1) /
        8
    );

    for (const command in subCommands) {
      if (subCommands.hasOwnProperty(command)) {
        const module = await subCommands[command]();
        const indent = "\t".repeat(tabs - Math.floor((command.length + 2) / 8));
        println(`  ${command}${indent}${module.commandInfo.description}`);
      }
    }
  }

  println();
}
