// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

import { leafCommand, makeCommandInfo } from "../../framework/command";
import { exec } from "../../util/exec";

// import { createPrinter } from "../../util/printer";

// const log = createPrinter("format");

export const commandInfo = makeCommandInfo("format", "format the current package");

export default leafCommand(commandInfo, async () => {
  return (await exec("npm", ["run", "format"])) === 0;
});
