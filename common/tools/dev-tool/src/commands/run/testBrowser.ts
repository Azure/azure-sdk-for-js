// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

import { leafCommand, makeCommandInfo } from "../../framework/command";
import { runTestsWithProxyTool } from "./testUtils";

export const commandInfo = makeCommandInfo(
  "test:browser",
  "runs the browser tests using karma with the default and the provided options; starts the proxy-tool in record and playback modes",
  {
    karma: {
      kind: "string",
      description: "Karma options (such as --single-run)",
      default: "--single-run"
    }
  }
);

export default leafCommand(commandInfo, async (_) => {
  if (process.argv[4] !== "--karma" && !process.argv[5]) {
    throw new Error(
      "unexpected command provided; expected = `dev-tool run test:browser --karma '<options>'`"
    );
  }

  const testProxyStart = "dev-tool test-proxy start";
  const karmaCMD = `karma start ${process.argv[5]}`;

  await runTestsWithProxyTool(testProxyStart, {
    command: karmaCMD,
    name: "browser-tests"
  });
  return true;
});
