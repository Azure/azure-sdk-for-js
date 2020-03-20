// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

import { subCommand } from "../framework/command";

/**
 * All of dev-tool's base commands and the modules that define them
 */
export const baseCommands = {
  about: () => import("./about"),
  package: () => import("./package"),
  samples: () => import("./samples")
} as const;

/**
 * Metadata about the base command, only used in `dev-tool help`
 */
export const baseCommandInfo = {
  name: "dev-tool",
  description: "Azure SDK for JS dev-tool"
} as const;

/**
 * Default dev-tool subcommand
 */
export const baseCommand = subCommand(baseCommandInfo, baseCommands);
