// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { leafCommand, makeCommandInfo } from "../../framework/command";
import { config } from "dotenv";
import { isProxyToolActive } from "../../util/testProxyUtils";
import { checkWithTimeout } from "../../util/checkWithTimeout";
config();

export const commandInfo = makeCommandInfo(
  "test-proxy",
  "waits for the proxy tool to be active or fails in 2 minutes",
  {}
);

export default leafCommand(commandInfo, async () => {
  const result = await checkWithTimeout(isProxyToolActive, 1000, 120000);
  return result;
});
