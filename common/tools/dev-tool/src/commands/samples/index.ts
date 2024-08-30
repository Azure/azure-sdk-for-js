// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License

import { subCommand, makeCommandInfo } from "../../framework/command";

export const commandInfo = makeCommandInfo("samples", "manage samples in an SDK package");

export default subCommand(commandInfo, {
  dev: () => import("./dev"),
  prep: () => import("./prep"),
  publish: () => import("./publish"),
  run: () => import("./run"),
  "check-node-versions": () => import("./checkNodeVersions"),
});
