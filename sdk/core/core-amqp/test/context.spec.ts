// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { describe, it, assert } from "vitest";
import { CbsClient, ConnectionConfig, ConnectionContextBase } from "../src/index.js";
import { Connection } from "rhea-promise";
import { ConnectionOptions as TlsConnectionOptions } from "tls";

describe("ConnectionContextBase", () => {
  it("should be created with required parameters", () => {
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
    assert.isDefined(context.config);
    assert.isDefined(context.connection);
    assert.isDefined(context.connectionId);
    assert.isDefined(context.connectionLock);
    assert.isDefined(context.negotiateClaimLock);
    assert.isFalse(context.wasConnectionCloseCalled);
    assert.instanceOf(context.connection, Connection);
    assert.equal(context.connection.options.properties!.product, "MSJSClient");
    assert.equal(context.connection.options.properties!["user-agent"], "/js-amqp-client");
    assert.equal(context.connection.options.properties!.version, "1.0.0");
    assert.instanceOf(context.cbsSession, CbsClient);
  });

  it("should set host and hostname to the same value by default", () => {
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

    assert.isDefined(context.config);
    assert.isDefined(context.connection);
    assert.isDefined(context.connectionId);
    assert.isDefined(context.connectionLock);
    assert.isDefined(context.negotiateClaimLock);
    assert.equal(context.connection.options.hostname, "hostname.servicebus.windows.net");
    assert.isFalse(context.wasConnectionCloseCalled);
    assert.instanceOf(context.connection, Connection);
    assert.equal(context.connection.options.properties!.product, "MSJSClient");
    assert.equal(context.connection.options.properties!["user-agent"], "/js-amqp-client");
    assert.equal(context.connection.options.properties!.version, "1.0.0");
    assert.instanceOf(context.cbsSession, CbsClient);

    const tlsConnectionOptions = context.connection.options as TlsConnectionOptions;
    assert.equal(tlsConnectionOptions.host, "hostname.servicebus.windows.net");
  });

  it("should allow setting host and hostname to different values", () => {
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
    assert.isDefined(context.config);
    assert.isDefined(context.connection);
    assert.isDefined(context.connectionId);
    assert.isDefined(context.connectionLock);
    assert.isDefined(context.negotiateClaimLock);
    assert.equal(context.connection.options.hostname, "127.0.0.1");
    assert.isFalse(context.wasConnectionCloseCalled);
    assert.instanceOf(context.connection, Connection);
    assert.equal(context.connection.options.properties!.product, "MSJSClient");
    assert.equal(context.connection.options.properties!["user-agent"], "/js-amqp-client");
    assert.equal(context.connection.options.properties!.version, "1.0.0");
    assert.instanceOf(context.cbsSession, CbsClient);

    const tlsConnectionOptions = context.connection.options as TlsConnectionOptions;
    tlsConnectionOptions.host!.should.equal("hostname.servicebus.windows.net");
  });

  it("should allow specifying a port", () => {
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
    assert.isDefined(context.config);
    assert.isDefined(context.connection);
    assert.isDefined(context.connectionId);
    assert.isDefined(context.connectionLock);
    assert.isDefined(context.negotiateClaimLock);
    assert.isFalse(context.wasConnectionCloseCalled);
    assert.instanceOf(context.connection, Connection);
    assert.equal(context.connection.options.properties!.product, "MSJSClient");
    assert.equal(context.connection.options.properties!["user-agent"], "/js-amqp-client");
    assert.equal(context.connection.options.properties!.version, "1.0.0");
    assert.instanceOf(context.cbsSession, CbsClient);

    const tlsConnectionOptions = context.connection.options as TlsConnectionOptions;
    assert.equal(tlsConnectionOptions.port, 1111);
  });

  it("should have a default port (5671)", () => {
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
    assert.isDefined(context.config);
    assert.isDefined(context.connection);
    assert.isDefined(context.connectionId);
    assert.isDefined(context.connectionLock);
    assert.isDefined(context.negotiateClaimLock);
    assert.isFalse(context.wasConnectionCloseCalled);
    assert.instanceOf(context.connection, Connection);
    assert.equal(context.connection.options.properties!.product, "MSJSClient");
    assert.equal(context.connection.options.properties!["user-agent"], "/js-amqp-client");
    assert.equal(context.connection.options.properties!.version, "1.0.0");
    assert.instanceOf(context.cbsSession, CbsClient);

    const tlsConnectionOptions = context.connection.options as TlsConnectionOptions;
    assert.equal(tlsConnectionOptions.port, 5671);
  });

  it("should allow setting host and hostname to different values when using websockets", () => {
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
    assert.isDefined(context.config);
    assert.isDefined(context.connection);
    assert.isDefined(context.connectionId);
    assert.isDefined(context.connectionLock);
    assert.isDefined(context.negotiateClaimLock);
    assert.equal(context.connection.options.hostname, "hostname.servicebus.windows.net");
    assert.isFalse(context.wasConnectionCloseCalled);
    assert.instanceOf(context.connection, Connection);
    assert.equal(context.connection.options.properties!.product, "MSJSClient");
    assert.equal(context.connection.options.properties!["user-agent"], "/js-amqp-client");
    assert.equal(context.connection.options.properties!.version, "1.0.0");
    assert.equal(context.connection.options.webSocketOptions!.url, "wss://127.0.0.1:443/");
    assert.instanceOf(context.cbsSession, CbsClient);

    const tlsConnectionOptions = context.connection.options as TlsConnectionOptions;
    assert.equal(tlsConnectionOptions.host, "127.0.0.1");
  });

  it("should have a default port when using websockets (443)", () => {
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
    assert.isDefined(context.config);
    assert.isDefined(context.connection);
    assert.isDefined(context.connectionId);
    assert.isDefined(context.connectionLock);
    assert.isDefined(context.negotiateClaimLock);
    assert.isFalse(context.wasConnectionCloseCalled);
    assert.instanceOf(context.connection, Connection);
    assert.equal(context.connection.options.properties!.product, "MSJSClient");
    assert.equal(context.connection.options.properties!["user-agent"], "/js-amqp-client");
    assert.equal(context.connection.options.properties!.version, "1.0.0");
    assert.equal(
      context.connection.options.webSocketOptions!.url,
      "wss://hostname.servicebus.windows.net:443/"
    );
    assert.instanceOf(context.cbsSession, CbsClient);
  });

  it("should allow specifying a port when using websockets", () => {
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
    assert.isDefined(context.config);
    assert.isDefined(context.connection);
    assert.isDefined(context.connectionId);
    assert.isDefined(context.connectionLock);
    assert.isDefined(context.negotiateClaimLock);
    assert.isFalse(context.wasConnectionCloseCalled);
    assert.instanceOf(context.connection, Connection);
    assert.equal(context.connection.options.properties!.product, "MSJSClient");
    assert.equal(context.connection.options.properties!["user-agent"], "/js-amqp-client");
    assert.equal(context.connection.options.properties!.version, "1.0.0");
    assert.equal(
      context.connection.options.webSocketOptions!.url,
      "wss://hostname.servicebus.windows.net:1111/"
    );
    assert.instanceOf(context.cbsSession, CbsClient);

    const tlsConnectionOptions = context.connection.options as TlsConnectionOptions;
    assert.equal(tlsConnectionOptions.port, 1111);
  });

  it("Throws error if user-agent string length is greater than 512 characters", () => {
    const connectionString =
      "Endpoint=sb://hostname.servicebus.windows.net/;SharedAccessKeyName=sakName;SharedAccessKey=sak;EntityPath=ep";
    const path = "mypath";
    const config = ConnectionConfig.create(connectionString, path);

    const userAgentString = "user-agent-string".repeat(32);

    assert.throw(() => {
      ConnectionContextBase.create({
        config: config,
        connectionProperties: {
          product: "MSJSClient",
          userAgent: userAgentString,
          version: "1.0.0",
        },
      });
    }, /user-agent string cannot be more than 512 characters/);
  });

  describe("#refreshConnection", () => {
    it("should update fields on the context", () => {
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

      assert.isDefined(context.config);
      assert.isDefined(context.connection);
      assert.isDefined(context.connectionId);
      assert.isDefined(context.connectionLock);
      assert.isDefined(context.negotiateClaimLock);
      assert.isFalse(context.wasConnectionCloseCalled);
      assert.instanceOf(context.cbsSession, CbsClient);

      // update wasConnectionCloseCalled so we can make sure it refreshes
      context.wasConnectionCloseCalled = true;

      context.refreshConnection();

      // ensure the refreshable fields have all been updated
      for (const field of Object.keys(refreshableFields) as (keyof typeof refreshableFields)[]) {
        assert.notEqual(context[field], refreshableFields[field]);
      }
    });
  });
});
