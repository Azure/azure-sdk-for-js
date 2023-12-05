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
    "no-test-proxy": {
      shortName: "ntp",
      kind: "boolean",
      default: false,
      description: "whether to disable launching test-proxy",
    },
  }
);

export default leafCommand(commandInfo, async (options) => {
  const isModuleProj = await isModuleProject();
  const defaultMochaArgs = `${
    isModuleProj ? "" : "-r esm "
  }-r ts-node/register --reporter ../../../common/tools/mocha-multi-reporter.js --full-trace`;
  const updatedArgs = options["--"]?.map((opt) =>
    opt.includes("**") && !opt.startsWith("'") && !opt.startsWith('"') ? `"${opt}"` : opt
  );
  const mochaArgs = updatedArgs?.length
    ? updatedArgs.join(" ")
    : '--timeout 1200000 --exclude "test/**/browser/*.spec.ts" "test/**/*.spec.ts"';
  const command = {
    command: isModuleProj
      ? `mocha ${defaultMochaArgs} ${mochaArgs}`
      : // eslint-disable-next-line no-useless-escape
        `cross-env TS_NODE_COMPILER_OPTIONS="{\\\"module\\\":\\\"commonjs\\\"}" mocha ${defaultMochaArgs} ${mochaArgs}`,
    name: "node-tests",
  };

  if (!options["no-test-proxy"]) {
    return runTestsWithProxyTool(command);
  }

  createPrinter("test-info").info("Running tests without test-proxy");
  await concurrently([command]).result;
  return true;
});
