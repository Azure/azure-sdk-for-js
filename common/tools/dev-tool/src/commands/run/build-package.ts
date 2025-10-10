// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { leafCommand, makeCommandInfo } from "../../framework/command";
import { createPrinter } from "../../util/printer";
import path from "node:path";
import { spawnSync, StdioOptions } from "node:child_process";
import { isWindows } from "../../util/platform";
import { existsSync } from "node:fs";

const log = createPrinter("build-package");

export const commandInfo = makeCommandInfo("build-package", "build a package for production");

const TSHY_BIN_PATH = path.resolve(__dirname, "..", "..", "..", "node_modules", ".bin", "tshy");

export default leafCommand(commandInfo, async () => {
  const centralCommandPath = isWindows() ? `${TSHY_BIN_PATH}.CMD` : TSHY_BIN_PATH;
  const localBinPath = path.resolve(process.cwd(), "node_modules", ".bin", "tshy");
  const localCommandPath = isWindows() ? `${localBinPath}.CMD` : localBinPath;
  const commandPath = existsSync(localCommandPath) ? localCommandPath : centralCommandPath;

  log.info(`Building package with tshy from ${commandPath}`);

  const proc = spawnSync(commandPath, { stdio: "pipe" as StdioOptions, shell: isWindows() });

  if (proc.error) {
    log.error(proc.error.message);
    return false;
  }

  if (proc.status !== 0) {
    log.error(`Package failed to build:

stdout: ${proc.stdout.toString()}

stderr: ${proc.stderr.toString()}
`);
    return false;
  }

  log.info("Package built successfully.");

  return true;
});
