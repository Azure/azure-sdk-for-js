// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

import { leafCommand, makeCommandInfo } from "../../framework/command";

import concurrently from "concurrently";
import { createPrinter } from "../../util/printer";
import { runTestsWithProxyTool } from "../../util/testUtils";

export const commandInfo = makeCommandInfo(
  "test:node-tsx-ts",
  "runs the node tests using mocha with the default and the provided options; starts the proxy-tool in record and playback modes",
  {
    "no-test-proxy": {
      shortName: "ntp",
      kind: "boolean",
      default: false,
      description: "whether to disable launching test-proxy",
    },
  },
);

export default leafCommand(commandInfo, async (options) => {
  const reporterArgs =
    "--reporter ../../../common/tools/mocha-multi-reporter.js --reporter-option output=test-results.xml";
  const defaultMochaArgs = `${reporterArgs} --full-trace`;
  const updatedArgs = options["--"]?.map((opt) =>
    opt.includes("**") && !opt.startsWith("'") && !opt.startsWith('"') ? `"${opt}"` : opt,
  );
  const mochaArgs = updatedArgs?.length
    ? updatedArgs.join(" ")
    : '--timeout 1200000 --exclude "test/**/browser/*.spec.ts" "test/**/*.spec.ts"';
  const command = {
    command: `mocha --require tsx ${defaultMochaArgs} ${mochaArgs}`,
    name: "node-tests",
  };

  if (!options["no-test-proxy"]) {
    return runTestsWithProxyTool(command);
  }

  createPrinter("test-info").info("Running tests without test-proxy");
  await concurrently([command]).result;
  return true;
});
