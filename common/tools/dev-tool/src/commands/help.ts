// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

import chalk from "chalk";
import { commands, CommandLoader } from ".";
import { resolveProject } from "../util/resolveProject";
import { createPrinter } from "../util/printer";

const log = createPrinter("help");

const banner = `\
       _______        __                __              __
      / / ___/   ____/ /__ _   __      / /_____  ____  / /
 __  / /\\__ \\   / __  / _ \\ | / /_____/ __/ __ \\/ __ \\/ / 
/ /_/ /___/ /  / /_/ /  __/ |/ /_____/ /_/ /_/ / /_/ / /  
\\____//____/   \\__,_/\\___/|___/      \\__/\\____/\\____/_/   

Developer quality-of-life command for the Azure SDK for JS
`;

const usage = `
Usage: dev-tool [OPTIONS] COMMAND [COMMAND-OPTIONS]

COMMAND indicates the subcommand to be run. It can be one of the following:
`;

export const helpText = "display this help message";

/**
 * Prints the one-line usage of each command.
 *
 * @param println
 */
export async function printCommandUsage(
  commands: CommandLoader,
  println: (...values: string[]) => void
) {
  println(usage);

  // Compute the number of tabs needed to separate commands from
  // docstrings assuming a default command-line tabstop of 8
  const tabs = Math.ceil(
    (Math.max(
      ...Object.keys(commands)
        .filter(key => commands.hasOwnProperty(key))
        .map(key => key.length + 2)
    ) +
      1) /
      8
  );

  for (const command in commands) {
    if (commands.hasOwnProperty(command)) {
      const module = await commands[command]();
      const indent = "\t".repeat(tabs - Math.floor((command.length + 2) / 8));
      println(`  ${command}${indent}${module.helpText}`);
    }
  }

  println();
}

export default async function(...args: string[]): Promise<boolean> {
  console.info(chalk.blueBright(banner));

  try {
    const packageInfo = await resolveProject(__dirname);
    console.info(
      chalk.blueBright(`  Name/Version:\t${packageInfo.name}@${packageInfo.version}`)
    );
    console.info(chalk.blueBright(`  Location:\t${packageInfo.path}`));
  } catch (error) {
    log.error("Could not locate dev-tool package.");
    log.error("Unable to display dev-tool version information.");
  }

  if (args.length > 0) {
    console.log();
    log.warn("Warning, unused arguments:", args);
  }

  await printCommandUsage(commands, console.info);

  console.info(
    "For more information about a given command, try `dev-tool COMMAND --help`"
  );

  console.info();

  return true;
}
