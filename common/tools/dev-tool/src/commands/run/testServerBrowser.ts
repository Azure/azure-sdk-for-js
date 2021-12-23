// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

import { leafCommand, makeCommandInfo } from "../../framework/command";
import { runTestsWithTestServer } from "../../util/testUtils";

export const commandInfo = makeCommandInfo(
  "testserver:browser",
  "runs the browser tests using karma with the default and the provided options; starts the proxy-tool in record and playback modes"
);

export default leafCommand(commandInfo, async (options) => {
  const karmaArgs = options["--"]?.length ? options["--"]?.join(" ") : "--single-run";

  return runTestsWithTestServer({
    command: `karma start ${karmaArgs}`,
    name: "browser-tests",
  });
});
