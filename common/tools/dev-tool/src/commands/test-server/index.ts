// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

import { subCommand, makeCommandInfo } from "../../framework/command";

export const commandInfo = makeCommandInfo("test-server", "runs the test server");

export default subCommand(commandInfo, {
  start: () => import("./start"),
  "wait-for-testserver-endpoint": () => import("./waitForTestServerEndpoint"),
});
