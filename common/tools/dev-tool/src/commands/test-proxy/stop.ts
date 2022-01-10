// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { leafCommand, makeCommandInfo } from "../../framework/command";
import { stopProxyTool } from "../../util/testProxyUtils";

export const commandInfo = makeCommandInfo(
  "test-proxy",
  "stops the test proxy that was started with test-proxy start, if it was running",
  {}
);

export default leafCommand(commandInfo, async () => {
  await stopProxyTool();
  return true;
});
