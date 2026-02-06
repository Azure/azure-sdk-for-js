// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License

import { subCommand, makeCommandInfo } from "../../framework/command.ts";

export const commandInfo = makeCommandInfo(
  "test-proxy",
  "runs the proxy-tool using the .NET standalone executable",
);

export default subCommand(commandInfo, {
  "wait-for-proxy-endpoint": () => import("./waitForProxyEndpoint.ts"),
  init: () => import("./init.ts"),
  push: () => import("./push.ts"),
  restore: () => import("./restore.ts"),
  reset: () => import("./reset.ts"),
  migrate: () => import("./migrate.ts"),
});
