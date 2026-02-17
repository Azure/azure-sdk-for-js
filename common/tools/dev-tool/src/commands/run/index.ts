// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License

import { makeCommandInfo, subCommand } from "../../framework/command.ts";

export const commandInfo = makeCommandInfo("run", "run scripts such as test:node");

export default subCommand(commandInfo, {
  "test:vitest": () => import("./testVitest.ts"),
  "check-api": () => import("./check-api.ts"),
  "extract-api": () => import("./extract-api.ts"),
  "build-test": () => import("./build-test.ts"),
  typecheck: () => import("./typecheck.ts"),
  "start-browser-relay": () => import("./startBrowserRelay.ts"),
  "update-snippets": () => import("./update-snippets.ts"),
  "build-package": () => import("./build-package.ts"),

  // "vendored" is a special command that passes through execution to dev-tool's own commands
  vendored: () => import("./vendored.ts"),
});
