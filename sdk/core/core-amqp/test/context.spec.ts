// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as chai from "chai";
const should = chai.should();
import {
  ConnectionConfig,
  ConnectionContextBase,
  SasTokenProvider,
  DefaultDataTransformer,
  CbsClient
} from "../src";
import { Connection } from "rhea-promise";
import { isNode } from "../src/util/utils";

describe("ConnectionContextBase", function() {
  it("should be created with required parameters", function(done) {
    const connectionString =
      "Endpoint=sb://hostname.servicebus.windows.net/;SharedAccessKeyName=sakName;SharedAccessKey=sak;EntityPath=ep";
    const path = "mypath";
    const config = ConnectionConfig.create(connectionString, path);
    const context = ConnectionContextBase.create({
      config: config,
      connectionProperties: {
        product: "MSJSClient",
        userAgent: "/js-amqp-client",
        version: "1.0.0"
      }
    });
    should.exist(context.config);
    should.exist(context.connection);
    should.exist(context.connectionId);
    should.exist(context.connectionLock);
    should.exist(context.negotiateClaimLock);
    should.exist(context.tokenProvider);
    should.exist(context.dataTransformer);
    context.wasConnectionCloseCalled.should.equal(false);
    context.tokenProvider.should.instanceOf(SasTokenProvider);
    context.connection.should.instanceOf(Connection);
    context.connection.options.properties!.product.should.equal("MSJSClient");
    context.connection.options.properties!["user-agent"].should.equal(
      "/js-amqp-client"
    );
    context.connection.options.properties!.version.should.equal("1.0.0");
    context.cbsSession.should.instanceOf(CbsClient);
    context.dataTransformer.should.instanceOf(DefaultDataTransformer);
    done();
  });

  if (isNode) {
    it("should accept a websocket constructor in Node", async () => {
      const connectionString =
        "Endpoint=sb://hostname.servicebus.windows.net/;SharedAccessKeyName=sakName;SharedAccessKey=sak;EntityPath=ep";
      const path = "mypath";
      const config = ConnectionConfig.create(connectionString, path);

      config.webSocket = require("ws");
      config.webSocketEndpointPath = "/ws";

      const context = ConnectionContextBase.create({
        config: config,
        connectionProperties: {
          product: "MSJSClient",
          userAgent: "/js-amqp-client",
          version: "1.0.0"
        }
      });

      should.exist(context);
    });
  } else {
    it("should default to using a websocket in the browser", async () => {
      const connectionString =
        "Endpoint=sb://hostname.servicebus.windows.net/;SharedAccessKeyName=sakName;SharedAccessKey=sak;EntityPath=ep";
      const path = "mypath";
      const config = ConnectionConfig.create(connectionString, path);

      config.webSocketEndpointPath = "/ws";

      const context = ConnectionContextBase.create({
        config: config,
        connectionProperties: {
          product: "MSJSClient",
          userAgent: "/js-amqp-client",
          version: "1.0.0"
        }
      });

      should.exist(context);
      should.exist(context.connection.options.connection_details);
    });
  }

  it("Throws error if user-agent string length is greater than 512 characters", function(done) {
    const connectionString =
      "Endpoint=sb://hostname.servicebus.windows.net/;SharedAccessKeyName=sakName;SharedAccessKey=sak;EntityPath=ep";
    const path = "mypath";
    const config = ConnectionConfig.create(connectionString, path);

    const userAgentString = "user-agent-string".repeat(32);

    should.throw(() => {
      ConnectionContextBase.create({
        config: config,
        connectionProperties: {
          product: "MSJSClient",
          userAgent: userAgentString,
          version: "1.0.0"
        }
      });
    }, /user-agent string cannot be more than 512 characters/);

    done();
  });
});
