// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

import { subCommand, makeCommandInfo } from "../../../framework/command";

export const commandInfo = makeCommandInfo("list", "list monorepo elements");

export default subCommand(commandInfo, {
  packages: () => import("./packages"),
  "service-folders": () => import("./service-folders"),
  "esm-migrations": () => import("./esm-migrations"),
});
