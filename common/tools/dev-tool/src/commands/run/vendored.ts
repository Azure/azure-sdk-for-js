// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This is a special subcommand that vendors commands from dev-tool's own node_modules folder so that dependent packages
 * can use them without themselves depending on that command's package.
 */

import { readdir } from "node:fs/promises";
import path from "node:path";
import { spawn, SpawnOptions } from "node:child_process";
import { makeCommandInfo, subCommand } from "../../framework/command";
import { CommandOptions } from "../../framework/CommandInfo";
import { CommandModule } from "../../framework/CommandModule";
import { createPrinter } from "../../util/printer";
import { isWindows } from "../../util/platform";

const log = createPrinter("vendored");

const DOT_BIN_PATH = path.resolve(__dirname, "..", "..", "..", "node_modules", ".bin");

/**
 * Wraps a command in an executor that satisfies the dev-tool command interface.
 *
 * @param commandName - name of the command to run from DOT_BIN_PATH
 * @returns a function that executes the command and returns a boolean status
 */
function makeCommandExecutor(
  commandName: string,
  options?: SpawnOptions,
): (...args: string[]) => Promise<boolean> {
  const commandPath = isWindows()
    ? path.join(DOT_BIN_PATH, `${commandName}.CMD`)
    : path.join(DOT_BIN_PATH, commandName);

  const spawnOptions = options || {};
  spawnOptions.stdio = "inherit";
  spawnOptions.shell = isWindows();

  return (...args: string[]) =>
    new Promise<boolean>((resolve, reject) => {
      log.debug("Running vendored command:", commandPath);
      const command = spawn(commandPath, args, spawnOptions);

      // If the command exited 0, then we treat that as a success
      command.on("exit", (code) => {
        resolve(code === 0);
      });
      command.on("error", reject);
    });
}

export const commandInfo = makeCommandInfo("vendored", "run dev-tool's dependency commands");

export default async (...args: string[]): Promise<boolean> => {
  const commands = await readdir(DOT_BIN_PATH);

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

export async function vendoredWithOptions(
  options: SpawnOptions,
  ...args: string[]
): Promise<boolean> {
  const commands = (await readdir(DOT_BIN_PATH)).filter((cmd) => !cmd.startsWith("_"));

  const executor = subCommand(
    commandInfo,
    // Dynamically make a command dispatch from the command list in DOT_BIN_PATH
    Object.fromEntries(
      commands.map((commandName) => {
        const moduleSham: CommandModule<CommandOptions> = {
          commandInfo: makeCommandInfo(commandName, `run vendored "${commandName}" from dev-tool`),
          default: makeCommandExecutor(commandName, options),
        };

        return [commandName, () => Promise.resolve(moduleSham)];
      }),
    ),
  );

  return executor(...args);
}
