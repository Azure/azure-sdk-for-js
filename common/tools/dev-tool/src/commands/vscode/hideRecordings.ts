// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { leafCommand, makeCommandInfo } from "../../framework/command";
import { disableRecordingsPanel } from "../../util/vscodeSettings";

export const commandInfo = makeCommandInfo(
  "hide",
  "hide test recording asset repos from the VS Code Source Control panel",
  {},
);

export default leafCommand(commandInfo, async () => {
  await disableRecordingsPanel();
  return true;
});
