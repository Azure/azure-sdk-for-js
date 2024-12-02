// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License

import { resolve } from "node:path";
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
    "test-proxy-debug": {
      description:
        "Runs the test-proxy with debug logs enabled (Logging__LogLevel__Default=Debug); generates testProxyOutput.log",
      kind: "boolean",
      default: false,
    },
  },
);

const CROSS_ENV_PATH = resolve(__dirname, "..", "..", "..", "node_modules", ".bin", "cross-env");

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
        `${CROSS_ENV_PATH} TS_NODE_COMPILER_OPTIONS="{\\\"module\\\":\\\"commonjs\\\"}" mocha -r ts-node/register ${defaultMochaArgs} ${mochaArgs}`,
    name: "node-tests",
  };

  if (options["test-proxy"]) {
    if (options["test-proxy-debug"]) process.env["Logging__LogLevel__Default"] = "Debug";
    return runTestsWithProxyTool(command);
  }

  createPrinter("test-info").info("Running tests without test-proxy");
  await concurrently([command]).result;
  return true;
});
