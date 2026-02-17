// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License

import { makeCommandInfo, subCommand } from "../framework/command.ts";

import { createPrinter } from "../util/printer.ts";

const log = createPrinter("dev-tool");

/**
 * All of dev-tool's base commands and the modules that define them
 */
export const baseCommands = {
  admin: () => import("./admin/index.ts"),
  about: () => import("./about.ts"),
  package: () => import("./package/index.ts"),
  samples: () => import("./samples/index.ts"),
  "test-proxy": () => import("./test-proxy/index.ts"),
  run: () => import("./run/index.ts"),
  migrate: () => import("./migrate.ts"),
  customization: () => import("./customization/index.ts"),
  check: () => import("./check.ts"),
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
    log.error("Errors occurred. See the output above.");
    process.exit(1);
  }
};
