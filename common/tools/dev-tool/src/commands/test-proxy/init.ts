// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { leafCommand, makeCommandInfo } from "../../framework/command";
import { createAssetsJson } from "../../util/testProxyUtils";

export const commandInfo = makeCommandInfo(
  "test-proxy",
  "initialize the assets.json file required for the assets-sync mechanism to store recordings",
  {}
);

export default leafCommand(commandInfo, async () => {
  await createAssetsJson();
  return true;
});
