// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License

import { subCommand, makeCommandInfo } from "../../framework/command.ts";

export const commandInfo = makeCommandInfo("admin", "run administrative tasks for the repository");

export default subCommand(commandInfo, {
  "create-migration": () => import("./create-migration.ts"),
  "stage-migrations": () => import("./stage-migrations.ts"),
  "migrate-source": () => import("./migrate-source.ts"),
  list: () => import("./list/index.ts"),
});
