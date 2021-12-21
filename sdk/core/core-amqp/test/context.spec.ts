// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as chai from "chai";
const should = chai.should();
import { CbsClient, ConnectionConfig, ConnectionContextBase } from "../src";
import { Connection } from "rhea-promise";

describe("ConnectionContextBase", function () {
  it("should be created with required parameters", function (done) {
    const connectionString =
      "Endpoint=sb://hostname.servicebus.windows.net/;SharedAccessKeyName=sakName;SharedAccessKey=sak;EntityPath=ep";
    const path = "mypath";
    const config = ConnectionConfig.create(connectionString, path);
    const context = ConnectionContextBase.create({
      config: config,
      connectionProperties: {
        product: "MSJSClient",
        userAgent: "/js-amqp-client",
        version: "1.0.0",
      },
    });
    should.exist(context.config);
    should.exist(context.connection);
    should.exist(context.connectionId);
    should.exist(context.connectionLock);
    should.exist(context.negotiateClaimLock);
    context.wasConnectionCloseCalled.should.equal(false);
    context.connection.should.instanceOf(Connection);
    context.connection.options.properties!.product.should.equal("MSJSClient");
    context.connection.options.properties!["user-agent"].should.equal("/js-amqp-client");
    context.connection.options.properties!.version.should.equal("1.0.0");
    context.cbsSession.should.instanceOf(CbsClient);
    done();
  });

  it("should set host and hostname to the same value by default", function () {
    const connectionString =
      "Endpoint=sb://hostname.servicebus.windows.net/;SharedAccessKeyName=sakName;SharedAccessKey=sak;EntityPath=ep";
    const path = "mypath";
    const config = ConnectionConfig.create(connectionString, path);
    const context = ConnectionContextBase.create({
      config: config,
      connectionProperties: {
        product: "MSJSClient",
        userAgent: "/js-amqp-client",
        version: "1.0.0",
      },
    });
    should.exist(context.config);
    should.exist(context.connection);
    should.exist(context.connectionId);
    should.exist(context.connectionLock);
    should.exist(context.negotiateClaimLock);
    context.connection.options.hostname!.should.equal("hostname.servicebus.windows.net");
    context.connection.options.host!.should.equal("hostname.servicebus.windows.net");
    context.wasConnectionCloseCalled.should.equal(false);
    context.connection.should.instanceOf(Connection);
    context.connection.options.properties!.product.should.equal("MSJSClient");
    context.connection.options.properties!["user-agent"].should.equal("/js-amqp-client");
    context.connection.options.properties!.version.should.equal("1.0.0");
    context.cbsSession.should.instanceOf(CbsClient);
  });

  it("should allow setting host and hostname to different values", function () {
    const connectionString =
      "Endpoint=sb://hostname.servicebus.windows.net/;SharedAccessKeyName=sakName;SharedAccessKey=sak;EntityPath=ep";
    const path = "mypath";
    const config = ConnectionConfig.create(connectionString, path);
    config.amqpHostname = "127.0.0.1";
    const context = ConnectionContextBase.create({
      config: config,
      connectionProperties: {
        product: "MSJSClient",
        userAgent: "/js-amqp-client",
        version: "1.0.0",
      },
    });
    should.exist(context.config);
    should.exist(context.connection);
    should.exist(context.connectionId);
    should.exist(context.connectionLock);
    should.exist(context.negotiateClaimLock);
    context.connection.options.hostname!.should.equal("127.0.0.1");
    context.connection.options.host!.should.equal("hostname.servicebus.windows.net");
    context.wasConnectionCloseCalled.should.equal(false);
    context.connection.should.instanceOf(Connection);
    context.connection.options.properties!.product.should.equal("MSJSClient");
    context.connection.options.properties!["user-agent"].should.equal("/js-amqp-client");
    context.connection.options.properties!.version.should.equal("1.0.0");
    context.cbsSession.should.instanceOf(CbsClient);
  });

  it("should allow specifying a port", function () {
    const connectionString =
      "Endpoint=sb://hostname.servicebus.windows.net/;SharedAccessKeyName=sakName;SharedAccessKey=sak;EntityPath=ep";
    const path = "mypath";
    const config = ConnectionConfig.create(connectionString, path);
    config.port = 1111;
    const context = ConnectionContextBase.create({
      config: config,
      connectionProperties: {
        product: "MSJSClient",
        userAgent: "/js-amqp-client",
        version: "1.0.0",
      },
    });
    should.exist(context.config);
    should.exist(context.connection);
    should.exist(context.connectionId);
    should.exist(context.connectionLock);
    should.exist(context.negotiateClaimLock);
    context.connection.options.port!.should.equal(1111);
    context.wasConnectionCloseCalled.should.equal(false);
    context.connection.should.instanceOf(Connection);
    context.connection.options.properties!.product.should.equal("MSJSClient");
    context.connection.options.properties!["user-agent"].should.equal("/js-amqp-client");
    context.connection.options.properties!.version.should.equal("1.0.0");
    context.cbsSession.should.instanceOf(CbsClient);
  });

  it("should have a default port (5671)", function () {
    const connectionString =
      "Endpoint=sb://hostname.servicebus.windows.net/;SharedAccessKeyName=sakName;SharedAccessKey=sak;EntityPath=ep";
    const path = "mypath";
    const config = ConnectionConfig.create(connectionString, path);
    const context = ConnectionContextBase.create({
      config: config,
      connectionProperties: {
        product: "MSJSClient",
        userAgent: "/js-amqp-client",
        version: "1.0.0",
      },
    });
    should.exist(context.config);
    should.exist(context.connection);
    should.exist(context.connectionId);
    should.exist(context.connectionLock);
    should.exist(context.negotiateClaimLock);
    context.connection.options.port!.should.equal(5671);
    context.wasConnectionCloseCalled.should.equal(false);
    context.connection.should.instanceOf(Connection);
    context.connection.options.properties!.product.should.equal("MSJSClient");
    context.connection.options.properties!["user-agent"].should.equal("/js-amqp-client");
    context.connection.options.properties!.version.should.equal("1.0.0");
    context.cbsSession.should.instanceOf(CbsClient);
  });

  it("should allow setting host and hostname to different values when using websockets", function () {
    const websockets: any = () => {
      /** Empty function on purpose for the sake of mocking */
    };
    const connectionString =
      "Endpoint=sb://hostname.servicebus.windows.net/;SharedAccessKeyName=sakName;SharedAccessKey=sak;EntityPath=ep";
    const path = "mypath";
    const config = ConnectionConfig.create(connectionString, path);
    config.webSocket = websockets;
    config.amqpHostname = config.host;
    config.host = "127.0.0.1";
    const context = ConnectionContextBase.create({
      config: config,
      connectionProperties: {
        product: "MSJSClient",
        userAgent: "/js-amqp-client",
        version: "1.0.0",
      },
    });
    should.exist(context.config);
    should.exist(context.connection);
    should.exist(context.connectionId);
    should.exist(context.connectionLock);
    should.exist(context.negotiateClaimLock);
    context.connection.options.host!.should.equal("127.0.0.1");
    context.connection.options.hostname!.should.equal("hostname.servicebus.windows.net");
    context.wasConnectionCloseCalled.should.equal(false);
    context.connection.should.instanceOf(Connection);
    context.connection.options.properties!.product.should.equal("MSJSClient");
    context.connection.options.properties!["user-agent"].should.equal("/js-amqp-client");
    context.connection.options.properties!.version.should.equal("1.0.0");
    context.connection.options.webSocketOptions!.url.should.equal(`wss://127.0.0.1:443/`);
    context.cbsSession.should.instanceOf(CbsClient);
  });

  it("should have a default port when using websockets (443)", function () {
    const websockets: any = () => {
      /** Empty function on purpose for the sake of mocking */
    };
    const connectionString =
      "Endpoint=sb://hostname.servicebus.windows.net/;SharedAccessKeyName=sakName;SharedAccessKey=sak;EntityPath=ep";
    const path = "mypath";
    const config = ConnectionConfig.create(connectionString, path);
    config.webSocket = websockets;
    const context = ConnectionContextBase.create({
      config: config,
      connectionProperties: {
        product: "MSJSClient",
        userAgent: "/js-amqp-client",
        version: "1.0.0",
      },
    });
    should.exist(context.config);
    should.exist(context.connection);
    should.exist(context.connectionId);
    should.exist(context.connectionLock);
    should.exist(context.negotiateClaimLock);
    context.wasConnectionCloseCalled.should.equal(false);
    context.connection.should.instanceOf(Connection);
    context.connection.options.properties!.product.should.equal("MSJSClient");
    context.connection.options.properties!["user-agent"].should.equal("/js-amqp-client");
    context.connection.options.properties!.version.should.equal("1.0.0");
    context.connection.options.webSocketOptions!.url.should.equal(
      `wss://hostname.servicebus.windows.net:443/`
    );
    context.cbsSession.should.instanceOf(CbsClient);
  });

  it("should allow specifying a port when using websockets", function () {
    const websockets: any = () => {
      /** Empty function on purpose for the sake of mocking */
    };
    const connectionString =
      "Endpoint=sb://hostname.servicebus.windows.net/;SharedAccessKeyName=sakName;SharedAccessKey=sak;EntityPath=ep";
    const path = "mypath";
    const config = ConnectionConfig.create(connectionString, path);
    config.webSocket = websockets;
    config.port = 1111;
    const context = ConnectionContextBase.create({
      config: config,
      connectionProperties: {
        product: "MSJSClient",
        userAgent: "/js-amqp-client",
        version: "1.0.0",
      },
    });
    should.exist(context.config);
    should.exist(context.connection);
    should.exist(context.connectionId);
    should.exist(context.connectionLock);
    should.exist(context.negotiateClaimLock);
    context.connection.options.port!.should.equal(1111);
    context.wasConnectionCloseCalled.should.equal(false);
    context.connection.should.instanceOf(Connection);
    context.connection.options.properties!.product.should.equal("MSJSClient");
    context.connection.options.properties!["user-agent"].should.equal("/js-amqp-client");
    context.connection.options.properties!.version.should.equal("1.0.0");
    context.connection.options.webSocketOptions!.url.should.equal(
      `wss://hostname.servicebus.windows.net:1111/`
    );
    context.cbsSession.should.instanceOf(CbsClient);
  });

  it("Throws error if user-agent string length is greater than 512 characters", function (done) {
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
          version: "1.0.0",
        },
      });
    }, /user-agent string cannot be more than 512 characters/);

    done();
  });

  describe("#refreshConnection", function () {
    it("should update fields on the context", function () {
      const connectionString =
        "Endpoint=sb://hostname.servicebus.windows.net/;SharedAccessKeyName=sakName;SharedAccessKey=sak;EntityPath=ep";
      const path = "mypath";
      const config = ConnectionConfig.create(connectionString, path);
      const context = ConnectionContextBase.create({
        config: config,
        connectionProperties: {
          product: "MSJSClient",
          userAgent: "/js-amqp-client",
          version: "1.0.0",
        },
      });
      // hold onto the refreshable values of the context
      // so we can be sure they change after the refresh call.
      const refreshableFields = {
        cbsSession: context.cbsSession,
        connection: context.connection,
        connectionId: context.connectionId,
        connectionLock: context.connectionLock,
        negotiateClaimLock: context.negotiateClaimLock,
        // change the value so refresh changes it back
        wasConnectionCloseCalled: !context.wasConnectionCloseCalled,
      };
      should.exist(context.config);
      should.exist(context.connection);
      should.exist(context.connectionId);
      should.exist(context.connectionLock);
      should.exist(context.negotiateClaimLock);
      context.wasConnectionCloseCalled.should.equal(false);
      context.cbsSession.should.instanceOf(CbsClient);

      // update wasConnectionCloseCalled so we can make sure it refreshes
      context.wasConnectionCloseCalled = true;

      context.refreshConnection();

      // ensure the refreshable fields have all been updated
      for (const field of Object.keys(refreshableFields) as (keyof typeof refreshableFields)[]) {
        context[field].should.not.equal(refreshableFields[field]);
      }
    });
  });
});
