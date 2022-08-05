// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

import { leafCommand, makeCommandInfo } from "../../framework/command";
import { runTestsWithProxyTool } from "../../util/testUtils";

export const commandInfo = makeCommandInfo(
  "test:node-js-input",
  "runs the node tests using mocha with the default and the provided options; starts the proxy-tool in record and playback modes"
);

export default leafCommand(commandInfo, async (options) => {
  const defaultMochaArgs =
    "-r esm --require source-map-support/register --reporter ../../../common/tools/mocha-multi-reporter.js --full-trace";
  for (let i = 0; i < (options["--"]?.length ?? 0); i++) {
    const opt = options["--"]![i];
    if (opt.includes("**") && !opt.startsWith("'") && !opt.startsWith('"')) {
      options["--"]![i] = `"${opt}"`
    }
  }
  const mochaArgs = options["--"]?.length
    ? options["--"]?.join(" ")
    : '--timeout 5000000 "dist-esm/test/{,!(browser)/**/}/*.spec.js"';
  return runTestsWithProxyTool({
    command: `nyc mocha ${defaultMochaArgs} ${mochaArgs}`,
    name: "node-tests",
  });
});
