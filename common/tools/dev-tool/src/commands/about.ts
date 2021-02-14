// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

import chalk from "chalk";

import { baseCommands, baseCommandInfo } from ".";
import { resolveProject } from "../util/resolveProject";
import { createPrinter } from "../util/printer";
import { leafCommand, makeCommandInfo } from "../framework/command";
import { printCommandUsage } from "../framework/printCommandUsage";

const log = createPrinter("help");

const banner = `\
       _______        __                __              __
      / / ___/   ____/ /__ _   __      / /_____  ____  / /
 __  / /\\__ \\   / __  / _ \\ | / /_____/ __/ __ \\/ __ \\/ / 
/ /_/ /___/ /  / /_/ /  __/ |/ /_____/ /_/ /_/ / /_/ / /  
\\____//____/   \\__,_/\\___/|___/      \\__/\\____/\\____/_/   

Developer quality-of-life command for the Azure SDK for JS
`;

export const commandInfo = makeCommandInfo("about", "display command help and information");

export default leafCommand(commandInfo, async (options) => {
  console.log(chalk.blueBright(banner));

  try {
    const packageInfo = await resolveProject(__dirname);
    console.log(chalk.blueBright(`  Name/Version:\t${packageInfo.name}@${packageInfo.version}`));
    console.log(chalk.blueBright(`  Location:\t${packageInfo.path}`));
    console.log();
  } catch (error) {
    log.error("Could not locate dev-tool package.");
    log.error("Unable to display dev-tool version information.");
  }

  if (options.args.length || options["--"]?.length) {
    console.log();
    log.warn("Warning, unused options:", JSON.stringify(options));
  }

  await printCommandUsage(baseCommandInfo, baseCommands);

  console.log("For more information about a given command, try `dev-tool COMMAND --help`");

  console.log();

  return true;
});
