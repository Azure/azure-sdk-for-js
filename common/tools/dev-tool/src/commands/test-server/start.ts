// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { leafCommand, makeCommandInfo } from "../../framework/command";
import { config } from "dotenv";
import { startTestServer } from "../../util/testServerUtils";
config();

export const commandInfo = makeCommandInfo("test-server", "runs the test server", {});

export default leafCommand(commandInfo, async () => {
  await startTestServer();
  return true;
});
