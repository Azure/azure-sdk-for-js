// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { leafCommand, makeCommandInfo } from "../../framework/command";
import { createPrinter } from "../../util/printer";
import { build, setLogLevel } from "@microsoft/warp";

const log = createPrinter("build-package");

export const commandInfo = makeCommandInfo("build-package", "build a package for production", {
  target: {
    shortName: "t",
    kind: "string",
    allowMultiple: true,
    description: "only build matching warp target name(s) (repeatable)",
  },
});

export default leafCommand(commandInfo, async (options) => {
  const cwd = process.cwd();
  const cliTargets = options["target"];
  const positionalTargets = options.args;
  const targets =
    cliTargets && cliTargets.length > 0
      ? cliTargets
      : positionalTargets.length > 0
        ? positionalTargets
        : undefined;

  // Mirror dev-tool's log level into warp
  if (process.env.DEBUG) {
    setLogLevel("verbose");
  }

  try {
    const result = await build({ cwd, target: targets });

    if (!result.success) {
      log.error("warp build failed.");
      return false;
    }

    log.info("Package built successfully.");
    return true;
  } catch (err: unknown) {
    log.error(`warp build threw: ${err instanceof Error ? err.message : String(err)}`);
    return false;
  }
});
