// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License

import { subCommand, makeCommandInfo } from "../../framework/command.ts";

export const commandInfo = makeCommandInfo("customization", "applies customizations to the SDK");

export default subCommand(commandInfo, {
  apply: () => import("./apply.ts"),
  ["apply-v2"]: () => import("./apply-v2.ts"),
});
