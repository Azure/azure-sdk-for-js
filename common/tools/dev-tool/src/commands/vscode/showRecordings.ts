// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { leafCommand, makeCommandInfo } from "../../framework/command";
import { enableRecordingsPanel } from "../../util/vscodeSettings";

export const commandInfo = makeCommandInfo(
  "vscode",
  "show test recording asset repos in the VS Code Source Control panel",
  {},
);

export default leafCommand(commandInfo, async () => {
  await enableRecordingsPanel();
  return true;
});
