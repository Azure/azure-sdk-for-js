// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License

import { subCommand, makeCommandInfo } from "../../framework/command.ts";

export const commandInfo = makeCommandInfo("samples", "manage samples in an SDK package");

export default subCommand(commandInfo, {
  dev: () => import("./dev.ts"),
  prep: () => import("./prep.ts"),
  publish: () => import("./publish.ts"),
  run: () => import("./run.ts"),
  "check-node-versions": () => import("./checkNodeVersions.ts"),
});
