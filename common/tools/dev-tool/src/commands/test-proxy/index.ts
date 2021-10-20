// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

import { subCommand, makeCommandInfo } from "../../framework/command";

export const commandInfo = makeCommandInfo("test-proxy", "manage SDK packages in the monorepo");

export default subCommand(commandInfo, {
  start: () => import("./start"),
  stop: () => import("./start")
});
