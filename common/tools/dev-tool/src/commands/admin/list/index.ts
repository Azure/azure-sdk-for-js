// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License

import { subCommand, makeCommandInfo } from "../../../framework/command.ts";

export const commandInfo = makeCommandInfo("list", "list monorepo elements");

export default subCommand(commandInfo, {
  packages: () => import("./packages.ts"),
  "service-folders": () => import("./service-folders.ts"),
  "typespec-migrations": () => import("./typespec-migrations.ts"),
});
