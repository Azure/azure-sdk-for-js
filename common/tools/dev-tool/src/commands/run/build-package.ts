// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { concurrently } from "concurrently";
import { leafCommand, makeCommandInfo } from "../../framework/command";
import { createPrinter } from "../../util/printer";
import path from "node:path";

const log = createPrinter("build-package");

export const commandInfo = makeCommandInfo("build-package", "build a package for production");

const TSHY_BIN_PATH = path.resolve(__dirname, "..", "..", "..", "node_modules", ".bin", "tshy");

export default leafCommand(commandInfo, async () => {
  log.info(`Building package with tshy from ${TSHY_BIN_PATH}`);

  await concurrently(
    [
      {
        command: TSHY_BIN_PATH,
      },
    ],
    { raw: true },
  ).result;

  log.info("Package built successfully.");

  return true;
});
