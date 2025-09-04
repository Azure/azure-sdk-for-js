// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License

import { makeCommandInfo, subCommand } from "../../framework/command";

export const commandInfo = makeCommandInfo("run", "run scripts such as test:node");

export default subCommand(commandInfo, {
  "test:vitest": () => import("./testVitest"),
  "check-api": () => import("./check-api"),
  "extract-api": () => import("./extract-api"),
  "build-test": () => import("./build-test"),
  typecheck: () => import("./typecheck"),
  "start-browser-relay": () => import("./startBrowserRelay"),
  "update-snippets": () => import("./update-snippets"),
  "build-package": () => import("./build-package"),
  "npm-script": () => import("./npm-script"),

  // "vendored" is a special command that passes through execution to dev-tool's own commands
  vendored: () => import("./vendored"),
});
