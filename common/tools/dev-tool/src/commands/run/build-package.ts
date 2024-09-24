// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { concurrently } from "concurrently";
import { leafCommand, makeCommandInfo } from "../../framework/command";
import { createPrinter } from "../../util/printer";

const log = createPrinter("build-package");

export const commandInfo = makeCommandInfo("build-package", "build a package for production");

// // Create an output stream to capture the output of the build command
// const outStream = new WriteStream();

export default leafCommand(commandInfo, async () => {
  log.info("Building package with tshy...");

  await concurrently(
    [
      {
        command: "tshy",
      },
    ],
    { raw: true },
  ).result;

  log.info("Package built successfully.");

  return true;
});
