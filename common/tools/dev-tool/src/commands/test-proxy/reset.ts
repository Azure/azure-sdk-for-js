// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { leafCommand, makeCommandInfo } from "../../framework/command";
import { runTestProxyCommand } from "../../util/testProxyUtils";

export const commandInfo = makeCommandInfo(
  "test-proxy",
  "reset the assets, referenced by assets.json, from git to their original files referenced by the tag. Will prompt if there's pending changes",
  {},
);

export default leafCommand(commandInfo, async () => {
  await runTestProxyCommand(["reset", "-a", "assets.json"]);
  return true;
});
