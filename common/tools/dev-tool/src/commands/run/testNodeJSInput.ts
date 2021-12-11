// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

import { leafCommand, makeCommandInfo } from "../../framework/command";
import { runTestsWithProxyTool } from "../../util/testUtils";

export const commandInfo = makeCommandInfo(
  "test:node-js-input",
  "runs the node tests using mocha with the default and the provided options; starts the proxy-tool in record and playback modes",
  {
    mocha: {
      kind: "string",
      description:
        "Mocha options along with the bundled test file(JS) with rollup as expected by mocha",
      default: '--timeout 5000000 "dist-esm/test/{,!(browser)/**/}/*.spec.js"'
    }
  }
);

export default leafCommand(commandInfo, async (_options) => {
  return runTestsWithProxyTool({
    command: `nyc mocha -r esm --require source-map-support/register --reporter ../../../common/tools/mocha-multi-reporter.js --full-trace --timeout 1200000 \"dist-test/index.node.js\"`,
    name: "node-tests"
  });
});
