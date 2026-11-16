// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { getPackageManager } from "./packageManager.js";
import { InternalEnvironmentVariables } from "../common/constants.js";
import { spawnSync } from "@azure/core-process";
import { coreLogger } from "../common/logger.js";

export const getPlaywrightVersion = (): string => {
  if (process.env[InternalEnvironmentVariables.MPT_PLAYWRIGHT_VERSION]) {
    return process.env[InternalEnvironmentVariables.MPT_PLAYWRIGHT_VERSION]!;
  }

  const packageManager = getPackageManager();
  const command = packageManager.runCommand("playwright", ["--version"]);
  const result = spawnSync(command.command, command.args, {
    allowWindowsBatchFiles: true,
    encoding: "utf8",
  });
  if (result.error) {
    throw result.error;
  }
  if (result.status !== 0) {
    throw new Error(`Playwright exited with code ${result.status}.`);
  }
  const stdout = result.stdout.trim();
  const version = packageManager.getVersionFromStdout(stdout);
  process.env[InternalEnvironmentVariables.MPT_PLAYWRIGHT_VERSION] = version;
  coreLogger.info(
    `Playwright version being used - ${process.env[InternalEnvironmentVariables.MPT_PLAYWRIGHT_VERSION]}`,
  );
  return process.env[InternalEnvironmentVariables.MPT_PLAYWRIGHT_VERSION]!;
};
