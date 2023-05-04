// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

import { subCommand, makeCommandInfo } from "../../framework/command";

export const commandInfo = makeCommandInfo("admin", "run administrative tasks for the repository");

export default subCommand(commandInfo, {
  "create-migration": () => import("./create-migration"),
});
