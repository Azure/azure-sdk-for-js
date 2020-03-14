// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

/**
 * A command for use with the dev-tool
 */
export interface Command {
  /**
   * The main async function of the command.
   *
   * @param args the arguments passed to the command
   *
   * @returns a promise resolving to `true` if the command succeeded, `false` otherwise
   */
  default: (...args: string[]) => Promise<boolean>;
  /**
   * One line of help text to be printed by the `dev-tool help` command
   */
  helpText: string;
}

/**
 * A map from command name to an async function that loads its module
 */
export type CommandLoader = { [k: string]: () => Promise<Command> };

/**
 * All of dev-tool's base commands and the modules that define them
 */
export const commands: CommandLoader = {
  help: () => import("./help"),
  "resolve-package": () => import("./resolve-package"),
  "samples": () => import("./samples")
};
