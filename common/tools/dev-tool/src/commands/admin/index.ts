// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License

import { subCommand, makeCommandInfo } from "../../framework/command";

export const commandInfo = makeCommandInfo("admin", "run administrative tasks for the repository");

export default subCommand(commandInfo, {
  "create-migration": () => import("./create-migration"),
  "stage-migrations": () => import("./stage-migrations"),
  "migrate-package": () => import("./migrate-package"),
  list: () => import("./list"),
});
