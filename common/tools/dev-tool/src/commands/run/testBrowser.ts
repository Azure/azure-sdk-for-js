// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

import { leafCommand, makeCommandInfo } from "../../framework/command";
import { runTestsWithProxyTool } from "../../util/testUtils";

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

export default leafCommand(commandInfo, async (options) => {
  return runTestsWithProxyTool({
    command: `karma start ${options.karma}`,
    name: "browser-tests"
  });
});
