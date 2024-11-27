// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { leafCommand, makeCommandInfo } from "../../framework/command";
import { runTestProxyCommand } from "../../util/testProxyUtils";

export const commandInfo = makeCommandInfo(
  "test-proxy",
  "restore the assets, referenced by assets.json, from git",
  {},
);

export default leafCommand(commandInfo, async () => {
  await runTestProxyCommand(["restore", "-a", "assets.json"]);
  return true;
});
