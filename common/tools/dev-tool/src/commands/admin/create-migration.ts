// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { leafCommand, makeCommandInfo } from "../../framework/command";

export const commandInfo = makeCommandInfo("create-migration", "scaffolds a new migration", {});

export default leafCommand(commandInfo, async (_options) => {
  return true;
});
