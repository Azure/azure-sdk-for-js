// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

import { leafCommand, makeCommandInfo } from "../../framework/command";

import { createPrinter } from "../../util/printer";

const log = createPrinter("check-config");

export const commandInfo = makeCommandInfo(
  "check-config",
  "checks the current package's configuration using simple rules"
);

export default leafCommand(commandInfo, async () => {
  return false;
});
