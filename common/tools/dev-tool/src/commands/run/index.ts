// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License

import { makeCommandInfo, subCommand } from "../../framework/command";

export const commandInfo = makeCommandInfo("run", "run scripts such as test:node");

export default subCommand(commandInfo, {
  "test:node-tsx-ts": () => import("./testNodeTsxTS"),
  "test:node-ts-input": () => import("./testNodeTSInput"),
  "test:node-js-input": () => import("./testNodeJSInput"),
  "test:browser": () => import("./testBrowser"),
  "test:vitest": () => import("./testVitest"),
  "check-api": () => import("./check-api"),
  "extract-api": () => import("./extract-api"),
  bundle: () => import("./bundle"),
  "build-test": () => import("./build-test"),
  typecheck: () => import("./typecheck"),
  "start-browser-relay": () => import("./startBrowserRelay"),

  // "vendored" is a special command that passes through execution to dev-tool's own commands
  vendored: () => import("./vendored"),
});
