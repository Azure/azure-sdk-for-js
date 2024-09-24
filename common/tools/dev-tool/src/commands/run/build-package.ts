// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { concurrently, ConcurrentlyCommandInput } from "concurrently";
import { leafCommand, makeCommandInfo } from "../../framework/command";
import { createPrinter } from "../../util/printer";
import { run } from "../../util/run";

const log = createPrinter("build-package");

export const commandInfo = makeCommandInfo("build-package", "build a package for production");

export default leafCommand(commandInfo, async () => {
  log.info("Building package with tshy...");
  const command: ConcurrentlyCommandInput = {
    command: "tshy",
  };

  log.info("Building with concurrently and no args");
  await concurrently([command]).result;
  log.info("success");

  log.info("Building with concurrently and env vars");
  await concurrently([
    {
      command: "tshy",
      env: {
        ...process.env,
        TSHY_VERBOSE: "2",
      },
    },
  ]).result;
  log.info("success");

  log.info("Building with run and no args");
  const output = await run("tshy", {
    captureOutput: true,
  });
  log.info("success");

  log.debug("tshy output:");
  log.debug(output);
  log.info("Package built successfully.");

  return true;
});
