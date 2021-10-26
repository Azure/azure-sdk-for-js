// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

import { leafCommand, makeCommandInfo } from "../framework/command";
import concurrently from "concurrently";

export const commandInfo = makeCommandInfo(
  "test:node",
  "runs the node tests using mocha with the default and the provided options; starts the proxy-tool in record and playback modes",
  {
    "mocha-options": {
      kind: "string",
      description: "Mocha options along with the test files(glob pattern) as expected by mocha",
      default: ""
    }
  }
);

export default leafCommand(commandInfo, async (_) => {
  if (process.argv[3] !== "--mocha-options" && !process.argv[4]) {
    throw new Error(
      "unexpected command provided; expected = `dev-tool test:node --mocha-options '<options>'`"
    );
  }

  const testProxyStart = "dev-tool test-proxy start";
  const mochaCMDWithDefaults =
    "nyc mocha -r esm --require ts-node/register --reporter ../../../common/tools/mocha-multi-reporter.js --full-trace";
  const mochaCommand = `${mochaCMDWithDefaults} ${process.argv[4]}`;
  const command = `concurrently "${testProxyStart}" "${mochaCommand}" --kill-others --success first`;
  console.log(command);

  concurrently([testProxyStart, mochaCommand, { command: mochaCommand, name: "abcd" }], {
    prefix: "name",
    killOthers: ["failure", "success"]
  });
  return true;
});
