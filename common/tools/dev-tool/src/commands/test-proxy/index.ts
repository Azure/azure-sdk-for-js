// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

import { subCommand, makeCommandInfo } from "../../framework/command";

export const commandInfo = makeCommandInfo(
  "test-proxy",
  "runs the proxy-tool using the .NET standalone executable"
);

export default subCommand(commandInfo, {
  "wait-for-proxy-endpoint": () => import("./waitForProxyEndpoint"),
  push: () => import("./push"),
  restore: () => import("./restore"),
  reset: () => import("./reset"),
  migrate: () => import("./migrate"),
});
