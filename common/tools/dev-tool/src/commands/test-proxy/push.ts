// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { leafCommand, makeCommandInfo } from "../../framework/command.ts";
import { runTestProxyCommand } from "../../util/testProxyUtils.ts";

export const commandInfo = makeCommandInfo(
  "test-proxy",
  "pushes the assets, referenced by assets.json, into git",
  {},
);

export default leafCommand(commandInfo, async () => {
  await runTestProxyCommand(["push", "-a", "assets.json"]);
  return true;
});
