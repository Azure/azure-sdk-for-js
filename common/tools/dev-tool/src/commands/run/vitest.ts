// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

import concurrently from "concurrently";
import { leafCommand, makeCommandInfo } from "../../framework/command";
import { runTestsWithProxyTool } from "../../util/testUtils";
import { createPrinter } from "../../util/printer";

export const commandInfo = makeCommandInfo(
  "test-vi",
  "runs the node tests using mocha with the default and the provided options; starts the proxy-tool in record and playback modes",
  {
    "no-test-proxy": {
      shortName: "ntp",
      kind: "boolean",
      default: false,
      description: "whether to disable launching test-proxy",
    },
    "browser": {
      shortName: "brwsr",
      kind: "boolean",
      default: false,
      description: "whether to run browser tests",
    },
  },
);

export default leafCommand(commandInfo, async (options) => {
  const args = options["browser"] ? "-c vitest.browser.config.mts": "";
  const updatedArgs = options["--"]?.map((opt) =>
    opt.includes("**") && !opt.startsWith("'") && !opt.startsWith('"') ? `"${opt}"` : opt,
  );
  const vitestArgs = updatedArgs?.length
    ? updatedArgs.join(" ")
    : '';
  const command = {
    command: `vitest ${args} ${vitestArgs}`,
    name: "vi-tests",
  };

  if (!options["no-test-proxy"]) {
    return runTestsWithProxyTool(command);
  }

  createPrinter("test-info").info("Running vitest without test-proxy");
  await concurrently([command]).result;
  return true;
});
