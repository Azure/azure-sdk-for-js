// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { leafCommand, makeCommandInfo } from "../../framework/command.ts";
import { enableRecordingsPanel } from "../../util/vscodeSettings.ts";

export const commandInfo = makeCommandInfo(
  "show",
  "show test recording asset repos in the VS Code Source Control panel",
  {},
);

export default leafCommand(commandInfo, async () => {
  await enableRecordingsPanel();
  return true;
});
