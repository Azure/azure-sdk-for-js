// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

import { subCommand, makeCommandInfo } from "../../framework/command";

export const commandInfo = makeCommandInfo("run", "run scripts such as test:node");

export default subCommand(commandInfo, {
  "test:node-ts-input": () => import("./testNodeTSInput"),
  "test:node-js-input": () => import("./testNodeJSInput"),
  "test:browser": () => import("./testBrowser")
});
