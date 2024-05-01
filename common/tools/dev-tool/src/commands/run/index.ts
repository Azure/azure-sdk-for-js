// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

import { subCommand, makeCommandInfo } from "../../framework/command";

export const commandInfo = makeCommandInfo("run", "run scripts such as test:node");

export default subCommand(commandInfo, {
  "test:node-ts-input": () => import("./testNodeTSInput"),
  "test:node-js-input": () => import("./testNodeJSInput"),
  "test:browser": () => import("./testBrowser"),
  "check-api": () => import("./check-api"),
  bundle: () => import("./bundle"),

  // "vendored" is a special command that passes through execution to dev-tool's own commands
  vendored: () => import("./vendored"),
});
