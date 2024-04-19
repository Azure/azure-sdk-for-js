// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

import { subCommand, makeCommandInfo } from "../../framework/command";

export const commandInfo = makeCommandInfo("customization", "applies customizations to the SDK");

export default subCommand(commandInfo, {
  apply: () => import("./apply"),
  ["apply-v2"]: () => import("./apply-v2"),
});
