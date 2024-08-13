// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

import concurrently from "concurrently";
import { leafCommand, makeCommandInfo } from "../../framework/command";
import { isModuleProject } from "../../util/resolveProject";
import { runTestsWithProxyTool } from "../../util/testUtils";
import { createPrinter } from "../../util/printer";

export const commandInfo = makeCommandInfo(
  "test:node-ts-input",
  "runs the node tests using mocha with the default and the provided options; starts the proxy-tool in record and playback modes",
  {
    "test-proxy": {
      shortName: "tp",
      kind: "boolean",
      default: true,
      description: "whether to enable launching test-proxy",
    },
  },
);

export default leafCommand(commandInfo, async (options) => {
  const isModuleProj = await isModuleProject();
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
    command: isModuleProj
      ? `mocha --loader=ts-node/esm ${defaultMochaArgs} ${mochaArgs}`
      : // eslint-disable-next-line no-useless-escape
        `cross-env TS_NODE_COMPILER_OPTIONS="{\\\"module\\\":\\\"commonjs\\\"}" mocha -r ts-node/register ${defaultMochaArgs} ${mochaArgs}`,
    name: "node-tests",
  };

  if (options["test-proxy"]) {
    return runTestsWithProxyTool(command);
  }

  createPrinter("test-info").info("Running tests without test-proxy");
  await concurrently([command]).result;
  return true;
});
