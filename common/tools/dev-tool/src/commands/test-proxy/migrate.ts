// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { leafCommand, makeCommandInfo } from "../../framework/command";
import { getTestProxyExecutable, runCommand } from "../../util/testProxyUtils";

export const commandInfo = makeCommandInfo(
  "test-proxy",
  "Migrate the recordings in the current directory to the asset sync tool",
  {}
);

export default leafCommand(commandInfo, async () => {
  const migrationScript = process.env.TEST_PROXY_MIGRATION_SCRIPT;
  if (!migrationScript) {
    throw new Error("Need to set process.env.TEST_PROXY_MIGRATION_SCRIPT");
  }

  await runCommand("pwsh", [
    migrationScript,
    "-InitialPush",
    "-TestProxyExe",
    await getTestProxyExecutable(),
  ]);

  return true;
});
