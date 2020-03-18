// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

import { subCommand } from "../../util/commandBuilder";

export const commandInfo = {
  name: "samples",
  description: "manage samples in an SDK package"
};

export default subCommand(commandInfo, {
  "dev": () => import("./dev"),
  "prep": () => import("./prep"),
  "run": () => import("./run")
});