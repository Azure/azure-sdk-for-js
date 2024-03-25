// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * This is a special subcommand that vendors commands from dev-tool's own node_modules folder so that dependent packages
 * can use them without themselves depending on that command's package.
 */

import fs from "fs-extra";
import path from "node:path";
import { spawn } from "node:child_process";
import { makeCommandInfo, subCommand } from "../../framework/command";
import { CommandOptions } from "../../framework/CommandInfo";
import { CommandModule } from "../../framework/CommandModule";
import { createPrinter } from "../../util/printer";

const log = createPrinter("vendored");

const DOT_BIN_PATH = path.resolve(__dirname, "..", "..", "..", "node_modules", ".bin");

/**
 * Wraps a command in an executor that satisfies the dev-tool command interface.
 *
 * @param commandName - name of the command to run from DOT_BIN_PATH
 * @returns a function that executes the command and returns a boolean status
 */
function makeCommandExecutor(commandName: string): (...args: string[]) => Promise<boolean> {
  const commandPath =
    process.platform !== "win32"
      ? path.join(DOT_BIN_PATH, commandName)
      : path.join(DOT_BIN_PATH, `${commandName}.CMD`);

  return (...args: string[]) =>
    new Promise<boolean>((resolve, reject) => {
      log.debug("Running vendored command:", commandPath);
      const command = spawn(commandPath, args, { stdio: "inherit" });

      // If the command exited 0, then we treat that as a success
      command.on("exit", (code) => {
        resolve(code === 0);
      });
      command.on("error", reject);
    });
}

export const commandInfo = makeCommandInfo("vendored", "run dev-tool's dependency commands");

export default async (...args: string[]): Promise<boolean> => {
  // I'm not 100% sure what underscore-prefixed commands do, but the only one we have now is _mocha.
  const commands = (await fs.readdir(DOT_BIN_PATH)).filter((cmd) => !cmd.startsWith("_"));

  const executor = subCommand(
    commandInfo,
    // Dynamically make a command dispatch from the command list in DOT_BIN_PATH
    Object.fromEntries(
      commands.map((commandName) => {
        const moduleSham: CommandModule<CommandOptions> = {
          commandInfo: makeCommandInfo(commandName, `run vendored "${commandName}" from dev-tool`),
          default: makeCommandExecutor(commandName),
        };

        return [commandName, () => Promise.resolve(moduleSham)];
      }),
    ),
  );

  return executor(...args);
};
