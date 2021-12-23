// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { leafCommand, makeCommandInfo } from "../../framework/command";
import { config } from "dotenv";
import { isTestServerActive } from "../../util/testServerUtils";
import { checkWithTimeout } from "../../util/checkWithTimeout";
config();

export const commandInfo = makeCommandInfo(
  "test-server",
  "waits for the test server to be active or fails in 2 minutes",
  {}
);

export default leafCommand(commandInfo, async () => {
  const result = await checkWithTimeout(isTestServerActive, 1000, 120000);
  return result;
});
