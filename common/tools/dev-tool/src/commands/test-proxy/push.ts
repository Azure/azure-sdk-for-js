// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { leafCommand, makeCommandInfo } from "../../framework/command";
import { runTestProxyCommand } from "../../util/testProxyUtils";

export const commandInfo = makeCommandInfo(
  "test-proxy",
  "pushes the assets, referenced by assets.json, into git",
  {},
);

export default leafCommand(commandInfo, async () => {
  try {
    await runTestProxyCommand(["push", "-a", "assets.json"]);
  } catch {
    // The test-proxy binary already prints the git error to the console via
    // stdio inherit. Catching here prevents the dev-tool framework from
    // wrapping it in a noisy "[Internal Error]" with a stack trace.
    return false;
  }
  return true;
});
