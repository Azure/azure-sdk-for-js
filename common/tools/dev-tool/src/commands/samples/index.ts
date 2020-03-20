// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

import { subCommand, describe } from "../../framework/command";

export const commandInfo = describe("samples", "manage samples in an SDK package");

export default subCommand(commandInfo, {
  dev: () => import("./dev"),
  prep: () => import("./prep"),
  run: () => import("./run")
});
