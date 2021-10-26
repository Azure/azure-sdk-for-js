// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { leafCommand, makeCommandInfo } from "../../framework/command";
import { config } from "dotenv";
import { isProxyToolActive, startProxyTool } from "../../util/testProxyUtils";
config();

export const commandInfo = makeCommandInfo(
  "test-proxy",
  "runs the proxy-tool with the `docker run ...` command",
  {}
);

export default leafCommand(commandInfo, async (_options) => {
  const mode = process.env.TEST_MODE;
  if (mode === "live") {
    return true; // No need to start the proxy tool in the live mode
  } else {
    try {
      await isProxyToolActive();
      // No need to run a new one if it is already active
      // Especially, CI uses this path
      console.log(
        `Proxy tool seems to be active, not attempting to start the test proxy at http://localhost:5000 & https://localhost:5001.\n`
      );
      return true;
    } catch (error) {
      if ((error as { code: string }).code === "ECONNREFUSED") {
        // Proxy tool is not active, attempt to start the proxy tool now
        await startProxyTool(mode);
        return true;
      } else {
        throw error;
      }
    }
  }
});
