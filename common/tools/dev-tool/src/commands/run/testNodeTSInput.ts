// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

import { leafCommand, makeCommandInfo } from "../../framework/command";
import { runTestsWithProxyTool } from "../../util/testUtils";

export const commandInfo = makeCommandInfo(
  "test:node-ts-input",
  "runs the node tests using mocha with the default and the provided options; starts the proxy-tool in record and playback modes"
);

export default leafCommand(commandInfo, async (options) => {
  const defaultMochaArgs =
    "-r esm -r ts-node/register --reporter ../../../common/tools/mocha-multi-reporter.js --full-trace";
  const mochaArgs = options["--"]?.length
    ? options["--"]?.join(" ")
    : '--timeout 1200000 --exclude "test/**/browser/*.spec.ts" "test/**/*.spec.ts"';
  return runTestsWithProxyTool({
    command: `mocha ${defaultMochaArgs} ${mochaArgs}`,
    name: "node-tests",
  });
});
