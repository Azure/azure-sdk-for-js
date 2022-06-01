// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as chai from "chai";
const should = chai.should();
import { ConnectionConfig, ConnectionContextBase } from "../../src";
import ws from "ws";

describe("ConnectionContextBase (node.js)", function () {
  it("should accept a websocket constructor", async () => {
    const host = "hostname.servicebus.windows.net";
    const connectionString = `Endpoint=sb://${host}/;SharedAccessKeyName=sakName;SharedAccessKey=sak;EntityPath=ep`;
    const path = "mypath";
    const config = ConnectionConfig.create(connectionString, path);

    config.webSocket = ws;
    config.webSocketEndpointPath = "ws";

    const context = ConnectionContextBase.create({
      config: config,
      connectionProperties: {
        product: "MSJSClient",
        userAgent: "/js-amqp-client",
        version: "1.0.0",
      },
    });

    should.exist(context);
    should.equal(context.connection["options"]["webSocketOptions"]?.url, `wss://${host}:443/ws`);
  });
});
