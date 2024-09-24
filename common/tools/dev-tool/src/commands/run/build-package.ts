// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { leafCommand, makeCommandInfo } from "../../framework/command";
import { createPrinter } from "../../util/printer";
import { run } from "../../util/run";

const log = createPrinter("build-package");

export const commandInfo = makeCommandInfo("build-package", "build a package for production");

export default leafCommand(commandInfo, async () => {
  log.info("Building package with tshy...");
  const output = await run("tshy", {
    captureOutput: true,
    env: { TSHY_VERBOSE: "2", ...process.env },
  });

  log.debug("tshy output:");
  log.debug(output);
  log.info("Package built successfully.");

  return true;
});
