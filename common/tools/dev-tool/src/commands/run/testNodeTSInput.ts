// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

import { leafCommand, makeCommandInfo } from "../../framework/command";
import { runTestsWithProxyTool } from "../../util/testUtils";

export const commandInfo = makeCommandInfo(
  "test:node-ts-input",
  "runs the node tests using mocha with the default and the provided options; starts the proxy-tool in record and playback modes",
  {
    mocha: {
      kind: "string",
      description:
        "Mocha options along with the test files(glob pattern) in TS as expected by mocha",
      default: '--timeout 1200000 --exclude "test/**/browser/*.spec.ts" "test/**/*.spec.ts"'
    }
  }
);

export default leafCommand(commandInfo, async (options) => {
  return runTestsWithProxyTool({
    command: `mocha -r esm -r ts-node/register --reporter ../../../common/tools/mocha-multi-reporter.js --full-trace ${options.mocha}`,
    name: "node-tests"
  });
});
