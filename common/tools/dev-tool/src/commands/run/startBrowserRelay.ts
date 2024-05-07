// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

import { leafCommand, makeCommandInfo } from "../../framework/command";

import { startRelayServer } from "../../util/browserRelayServer";

export const commandInfo = makeCommandInfo(
  "start-browser-relay",
  "Start the browser credential relay, used for authenticating browser tests.",
  {
    listenHost: {
      kind: "string",
      default: "localhost",
      description: "Host to listen on",
    },
    port: {
      kind: "string",
      default: "4895",
      description: "Port to listen on",
    },
  },
);

export default leafCommand(commandInfo, async (options) => {
  startRelayServer({
    listenHost: options.listenHost,
    port: Number(options.port),
  });

  return true;
});
