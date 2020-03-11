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
 * All of dev-tool's commands and the modules that define them
 */
export const commands: { [k: string]: () => Promise<Command> } = {
  "dev-samples": () => import("./dev-samples"),
  help: () => import("./help"),
  "prep-samples": () => import("./prep-samples"),
  "resolve-package": () => import("./resolve-package"),
  "run-samples": () => import("./run-samples")
};
