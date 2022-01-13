// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { leafCommand, makeCommandInfo } from "../../framework/command";
import { config } from "dotenv";
import { startProxyTool } from "../../util/testProxyUtils";
config();

export const commandInfo = makeCommandInfo(
  "test-proxy",
  "runs the proxy-tool with the `docker run ...` command",
  {}
);

export default leafCommand(commandInfo, async () => {
  await startProxyTool();
  return true;
});
