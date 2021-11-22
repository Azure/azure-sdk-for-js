// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

import { subCommand, makeCommandInfo } from "../../framework/command";

export const commandInfo = makeCommandInfo(
  "test-proxy",
  "runs the proxy-tool with the `docker run ...` command"
);

export default subCommand(commandInfo, {
  start: () => import("./start"),
  "wait-for-proxy-endpoint": () => import("./waitForProxyEndpoint")
});
