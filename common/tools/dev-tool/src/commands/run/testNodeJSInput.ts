// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

import { leafCommand, makeCommandInfo } from "../../framework/command";
import { runTestsWithProxyTool } from "./testUtils";

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

export default leafCommand(commandInfo, async (_) => {
  if (process.argv[4] !== "--mocha" && !process.argv[5]) {
    throw new Error(
      "unexpected command provided; expected = `dev-tool run test:node-js-input --mocha '<options>'`"
    );
  }

  const testProxyStart = "dev-tool test-proxy start";
  const mochaCMDWithDefaults =
    "nyc mocha -r esm --require source-map-support/register --reporter ../../../common/tools/mocha-multi-reporter.js --full-trace";
  const mochaCommand = `${mochaCMDWithDefaults} ${process.argv[5]}`;

  await runTestsWithProxyTool(testProxyStart, {
    command: mochaCommand,
    name: "node-tests"
  });
  return true;
});
