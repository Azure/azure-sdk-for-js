import { CommandInfo, CommandOptions } from "./CommandInfo";

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

/**
 * A command for use with the dev-tool
 */
export interface CommandModule<Options extends CommandOptions> {
  /**
   * The main async function of the command.
   *
   * @param args the arguments passed to the command
   *
   * @returns a promise resolving to `true` if the command succeeded, `false` otherwise
   */
  default: (...args: string[]) => Promise<boolean>;

  /**
   * Metadata information about this subcommand
   */
  commandInfo: CommandInfo<Options>;
}

/**
 * A map from command name to an async function that loads its module
 */
export type CommandLoader = { [k: string]: () => Promise<CommandModule<{}>> };
