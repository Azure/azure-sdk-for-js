// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { leafCommand, makeCommandInfo } from "../../framework/command";
import { runTestsWithProxyTool } from "../../util/testUtils";

export const commandInfo = makeCommandInfo(
  "test:browser",
<<<<<<< HEAD
  "runs the browser tests using karma with the default and the provided options; starts the proxy-tool in record and playback modes",
  {
    karma: {
      kind: "string",
      description: "Karma options (such as --single-run)",
      default: "--single-run",
    },
  }
=======
  "runs the browser tests using karma with the default and the provided options; starts the proxy-tool in record and playback modes"
>>>>>>> upstream/main
);

export default leafCommand(commandInfo, async (options) => {
  const karmaArgs = options["--"]?.length ? options["--"]?.join(" ") : "--single-run";
  return runTestsWithProxyTool({
<<<<<<< HEAD
    command: `karma start ${options.karma}`,
=======
    command: `karma start ${karmaArgs}`,
>>>>>>> upstream/main
    name: "browser-tests",
  });
});
