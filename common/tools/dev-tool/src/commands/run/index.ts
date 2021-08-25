// Copyright (c) Microsoft Corporation
// Licensed under the MIT license.

import { makeCommandInfo, subCommand } from "../../framework/command";

export const commandInfo = makeCommandInfo("run", "run default (managed) scripts");

export default subCommand(commandInfo, {
  karma: () => import("./karma")
});
