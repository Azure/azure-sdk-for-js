// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

import { subCommand, makeCommandInfo } from "../../framework/command";

export const commandInfo = makeCommandInfo("samples", "manage samples in an SDK package");

export default subCommand(commandInfo, {
  dev: () => import("./dev"),
  prep: () => import("./prep"),
  run: () => import("./run"),
  "ts-to-js": () => import("./tsToJs")
});
