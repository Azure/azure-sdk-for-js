// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { leafCommand, makeCommandInfo } from "../../framework/command.ts";
import { config } from "dotenv";
import { isProxyToolActive } from "../../util/testProxyUtils.ts";
import { checkWithTimeout } from "../../util/checkWithTimeout.ts";
config();

export const commandInfo = makeCommandInfo(
  "test-proxy",
  "waits for the proxy tool to be active or fails in 2 minutes",
  {},
);

export default leafCommand(commandInfo, async () => {
  const result = await checkWithTimeout(isProxyToolActive, 1000, 120000);
  return result;
});
