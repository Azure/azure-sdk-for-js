// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License

import { subCommand, makeCommandInfo } from "../../framework/command";

export const commandInfo = makeCommandInfo("package", "manage SDK packages in the monorepo");

export default subCommand(commandInfo, {
  resolve: () => import("./resolve"),
});
