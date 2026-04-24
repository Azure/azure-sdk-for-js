// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License

import chalk from "chalk";
import { baseCommands, baseCommandInfo } from ".";
import { resolveProject } from "../util/resolveProject";
import { createPrinter } from "../util/printer";
import { leafCommand, makeCommandInfo } from "../framework/command";
import { printCommandUsage } from "../framework/printCommandUsage";
import * as pwsh from "../util/pwsh";
import { writeStdout } from "../util/stdio.js";

const log = createPrinter("about");

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
  writeStdout(chalk.blueBright(banner));

  try {
    const packageInfo = await resolveProject(__dirname);
    writeStdout(chalk.blueBright(`  Name/Version:\t${packageInfo.name}@${packageInfo.version}`));
    writeStdout(chalk.blueBright(`  Location:\t${packageInfo.path}`));
    writeStdout("");
  } catch (error: unknown) {
    log.error("Could not locate dev-tool package.");
    log.error("Unable to display dev-tool version information.");
  }

  const hasPowerShell = await pwsh.hasPowerShell();

  if (hasPowerShell) {
    writeStdout(chalk.blueBright("  PowerShell: Found"));
  } else {
    writeStdout(chalk.yellow("  PowerShell: Not found"));
  }
  writeStdout("");

  if (options.args.length || options["--"]?.length) {
    writeStdout("");
    log.warn("Warning, unused options:", JSON.stringify(options, null, 2));
  }

  await printCommandUsage(baseCommandInfo, baseCommands);

  writeStdout("For more information about a given command, try `dev-tool COMMAND --help`");

  writeStdout("");

  return true;
});
