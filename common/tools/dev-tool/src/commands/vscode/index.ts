// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { subCommand, makeCommandInfo } from "../../framework/command";

export const commandInfo = makeCommandInfo("vscode", "VS Code integration commands");

export default subCommand(commandInfo, {
  recordings: () => import("./recordings"),
});
