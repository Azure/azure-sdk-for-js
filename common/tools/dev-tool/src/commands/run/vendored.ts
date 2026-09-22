// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This is a special subcommand that vendors commands from dev-tool's own node_modules folder so that dependent packages
 * can use them without themselves depending on that command's package.
 */

import { readdir } from "node:fs/promises";
import path from "node:path";
import { spawn, type SpawnOptions } from "@azure/core-process";
import { makeCommandInfo, subCommand } from "../../framework/command.ts";
import type { CommandOptions } from "../../framework/CommandInfo.ts";
import type { CommandModule } from "../../framework/CommandModule.ts";
import { resolveNodeBinTarget } from "../../util/nodeCli.ts";
import { createPrinter } from "../../util/printer.ts";

const log = createPrinter("vendored");

const DOT_BIN_PATH = path.resolve(import.meta.dirname, "..", "..", "..", "node_modules", ".bin");

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
  const spawnOptions = { ...options, stdio: "inherit" } satisfies SpawnOptions;

  return (...args: string[]) =>
    new Promise<boolean>((resolve, reject) => {
      const [executable, ...commandArgs] = buildVendoredCommand(commandName, args);
      log.debug("Running vendored command:", commandArgs[1]);
      const command = spawn(executable, commandArgs, spawnOptions);

      // If the command exited 0, then we treat that as a success
      command.on("exit", (code) => {
        resolve(code === 0);
      });
      command.on("error", reject);
    });
}

export function buildVendoredCommand(
  commandName: string,
  args: readonly string[],
  binPath: string = DOT_BIN_PATH,
): string[] {
  const commandPath = resolveNodeBinTarget(path.join(binPath, commandName));
  return [process.execPath, "--", commandPath, ...args];
}

export const commandInfo = makeCommandInfo("vendored", "run dev-tool's dependency commands");

async function getVendoredCommandNames(): Promise<string[]> {
  return (await readdir(DOT_BIN_PATH)).filter(
    (commandName) => !commandName.startsWith("_") && !/\.(?:cmd|ps1)$/i.test(commandName),
  );
}

export default async (...args: string[]): Promise<boolean> => {
  const commands = await getVendoredCommandNames();

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
  const commands = await getVendoredCommandNames();

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
