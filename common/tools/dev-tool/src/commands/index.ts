// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

import { makeCommandInfo, subCommand } from "../framework/command";

import { createPrinter } from "../util/printer";

const log = createPrinter("dev-tool");

/**
 * All of dev-tool's base commands and the modules that define them
 */
export const baseCommands = {
  admin: () => import("./admin"),
  about: () => import("./about"),
  package: () => import("./package"),
  samples: () => import("./samples"),
  "test-proxy": () => import("./test-proxy"),
  run: () => import("./run"),
  migrate: () => import("./migrate"),
  customization: () => import("./customization"),
} as const;

/**
 * Metadata about the base command, only used in `dev-tool help`
 */
export const baseCommandInfo = makeCommandInfo("dev-tool", "Azure SDK for JS dev-tool");

/**
 * Default dev-tool subcommand
 */
export const baseCommand = async (...args: string[]): Promise<void> => {
  log.debug("dev-tool bootstrapped from command:", process.argv0);
  const status = await subCommand(baseCommandInfo, baseCommands)(...args);

  if (!status) {
    log.error("Errors occured. See the output above.");
    process.exit(1);
  }
};
