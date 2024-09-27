// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { concurrently } from "concurrently";
import { leafCommand, makeCommandInfo } from "../../framework/command";
import { createPrinter } from "../../util/printer";
import path from "node:path";

const log = createPrinter("build-package");

export const commandInfo = makeCommandInfo("build-package", "build a package for production");

const DOT_BIN_PATH = path.resolve(__dirname, "..", "..", "..", "node_modules", ".bin");

export default leafCommand(commandInfo, async () => {
  const command = path.join(DOT_BIN_PATH, "tshy");
  log.info(`Building package with tshy from ${command}`);

  await concurrently(
    [
      {
        command,
      },
    ],
    { raw: true },
  ).result;

  log.info("Package built successfully.");

  return true;
});
