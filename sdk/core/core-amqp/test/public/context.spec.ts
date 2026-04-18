// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, vi } from "vitest";
import { CbsClient, ConnectionConfig, ConnectionContextBase, Constants } from "../../src/index.js";
import { Connection } from "rhea-promise";
import type { Session, Sender, AwaitableSender, Receiver } from "rhea-promise";
import type { ConnectionOptions as TlsConnectionOptions } from "node:tls";

const connectionString =
  "Endpoint=sb://hostname.servicebus.windows.net/;SharedAccessKeyName=sakName;SharedAccessKey=sak;EntityPath=ep";
const path = "mypath";
const defaultConnectionProperties = {
  product: "MSJSClient",
  userAgent: "/js-amqp-client",
  version: "1.0.0",
};

describe("ConnectionContextBase", function () {
  it("should be created with required parameters", function () {
    const config = ConnectionConfig.create(connectionString, path);
    const context = ConnectionContextBase.create({
      config: config,
      connectionProperties: defaultConnectionProperties,
    });
    assert.isDefined(context.config);
    assert.isDefined(context.connection);
    assert.isDefined(context.connectionId);
    assert.isDefined(context.connectionLock);
    assert.isDefined(context.negotiateClaimLock);
    assert.isFalse(context.wasConnectionCloseCalled);
    assert.instanceOf(context.connection, Connection);
    assert.equal(context.connection.options.transport, "tls");
    assert.equal(context.connection.options.properties!.product, "MSJSClient");
    assert.equal(context.connection.options.properties!["user-agent"], "/js-amqp-client");
    assert.equal(context.connection.options.properties!.version, "1.0.0");
    assert.instanceOf(context.cbsSession, CbsClient);
  });

  it("should set host and hostname to the same value by default", function () {
    const config = ConnectionConfig.create(connectionString, path);
    const context = ConnectionContextBase.create({
      config: config,
      connectionProperties: defaultConnectionProperties,
    });
    assert.isDefined(context.config);
    assert.isDefined(context.connection);
    assert.isDefined(context.connectionId);
    assert.isDefined(context.connectionLock);
    assert.isDefined(context.negotiateClaimLock);
    assert.equal(context.connection.options.hostname, "hostname.servicebus.windows.net");

    const tlsConnectionOptions = context.connection.options as TlsConnectionOptions;
    assert.equal(tlsConnectionOptions.host, "hostname.servicebus.windows.net");
    assert.isFalse(context.wasConnectionCloseCalled);
    assert.instanceOf(context.connection, Connection);
    assert.equal(context.connection.options.properties!.product, "MSJSClient");
    assert.equal(context.connection.options.properties!["user-agent"], "/js-amqp-client");
    assert.equal(context.connection.options.properties!.version, "1.0.0");
    assert.instanceOf(context.cbsSession, CbsClient);
  });

  it("should allow setting host and hostname to different values", function () {
    const config = ConnectionConfig.create(connectionString, path);
    config.amqpHostname = "127.0.0.1";
    const context = ConnectionContextBase.create({
      config: config,
      connectionProperties: defaultConnectionProperties,
    });
    assert.isDefined(context.config);
    assert.isDefined(context.connection);
    assert.isDefined(context.connectionId);
    assert.isDefined(context.connectionLock);
    assert.isDefined(context.negotiateClaimLock);
    assert.equal(context.connection.options.hostname, "127.0.0.1");

    const tlsConnectionOptions = context.connection.options as TlsConnectionOptions;
    assert.equal(tlsConnectionOptions.host, "hostname.servicebus.windows.net");
    assert.isFalse(context.wasConnectionCloseCalled);
    assert.instanceOf(context.connection, Connection);
    assert.equal(context.connection.options.properties!.product, "MSJSClient");
    assert.equal(context.connection.options.properties!["user-agent"], "/js-amqp-client");
    assert.equal(context.connection.options.properties!.version, "1.0.0");
    assert.instanceOf(context.cbsSession, CbsClient);
  });

  it("should allow specifying a port", function () {
    const config = ConnectionConfig.create(connectionString, path);
    config.port = 1111;
    const context = ConnectionContextBase.create({
      config: config,
      connectionProperties: defaultConnectionProperties,
    });
    assert.isDefined(context.config);
    assert.isDefined(context.connection);
    assert.isDefined(context.connectionId);
    assert.isDefined(context.connectionLock);
    assert.isDefined(context.negotiateClaimLock);

    const tlsConnectionOptions = context.connection.options as TlsConnectionOptions;
    assert.equal(tlsConnectionOptions.port, 1111);
    assert.isFalse(context.wasConnectionCloseCalled);
    assert.instanceOf(context.connection, Connection);
    assert.equal(context.connection.options.properties!.product, "MSJSClient");
    assert.equal(context.connection.options.properties!["user-agent"], "/js-amqp-client");
    assert.equal(context.connection.options.properties!.version, "1.0.0");
    assert.instanceOf(context.cbsSession, CbsClient);
  });

  it("should have a default port (5671)", function () {
    const config = ConnectionConfig.create(connectionString, path);
    const context = ConnectionContextBase.create({
      config: config,
      connectionProperties: defaultConnectionProperties,
    });
    assert.isDefined(context.config);
    assert.isDefined(context.connection);
    assert.isDefined(context.connectionId);
    assert.isDefined(context.connectionLock);
    assert.isDefined(context.negotiateClaimLock);

    const tlsConnectionOptions = context.connection.options as TlsConnectionOptions;
    assert.equal(tlsConnectionOptions.port, 5671);
    assert.isFalse(context.wasConnectionCloseCalled);
    assert.instanceOf(context.connection, Connection);
    assert.equal(context.connection.options.properties!.product, "MSJSClient");
    assert.equal(context.connection.options.properties!["user-agent"], "/js-amqp-client");
    assert.equal(context.connection.options.properties!.version, "1.0.0");
    assert.instanceOf(context.cbsSession, CbsClient);
  });

  it("should allow setting host and hostname to different values when using websockets", function () {
    const websockets: any = () => {
      /** Empty function on purpose for the sake of mocking */
    };
    const config = ConnectionConfig.create(connectionString, path);
    config.webSocket = websockets;
    config.amqpHostname = config.host;
    config.host = "127.0.0.1";
    const context = ConnectionContextBase.create({
      config: config,
      connectionProperties: defaultConnectionProperties,
    });
    assert.isDefined(context.config);
    assert.isDefined(context.connection);
    assert.isDefined(context.connectionId);
    assert.isDefined(context.connectionLock);
    assert.isDefined(context.negotiateClaimLock);

    const tlsConnectionOptions = context.connection.options as TlsConnectionOptions;
    assert.equal(tlsConnectionOptions.host, "127.0.0.1");

    assert.equal(context.connection.options.hostname, "hostname.servicebus.windows.net");
    assert.isFalse(context.wasConnectionCloseCalled);
    assert.instanceOf(context.connection, Connection);
    assert.equal(context.connection.options.properties!.product, "MSJSClient");
    assert.equal(context.connection.options.properties!["user-agent"], "/js-amqp-client");
    assert.equal(context.connection.options.properties!.version, "1.0.0");
    assert.equal(context.connection.options.webSocketOptions!.url, `wss://127.0.0.1:443/`);
    assert.instanceOf(context.cbsSession, CbsClient);
  });

  it("should have a default port when using websockets (443)", function () {
    const websockets: any = () => {
      /** Empty function on purpose for the sake of mocking */
    };
    const config = ConnectionConfig.create(connectionString, path);
    config.webSocket = websockets;
    const context = ConnectionContextBase.create({
      config: config,
      connectionProperties: defaultConnectionProperties,
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
      `wss://hostname.servicebus.windows.net:443/`,
    );
    assert.instanceOf(context.cbsSession, CbsClient);
  });

  it("should allow specifying a port when using websockets", function () {
    const websockets: any = () => {
      /** Empty function on purpose for the sake of mocking */
    };
    const config = ConnectionConfig.create(connectionString, path);
    config.webSocket = websockets;
    config.port = 1111;
    const context = ConnectionContextBase.create({
      config: config,
      connectionProperties: defaultConnectionProperties,
    });
    assert.isDefined(context.config);
    assert.isDefined(context.connection);
    assert.isDefined(context.connectionId);
    assert.isDefined(context.connectionLock);
    assert.isDefined(context.negotiateClaimLock);

    const tlsConnectionOptions = context.connection.options as TlsConnectionOptions;
    assert.equal(tlsConnectionOptions.port, 1111);
    assert.isFalse(context.wasConnectionCloseCalled);
    assert.instanceOf(context.connection, Connection);
    assert.equal(context.connection.options.properties!.product, "MSJSClient");
    assert.equal(context.connection.options.properties!["user-agent"], "/js-amqp-client");
    assert.equal(context.connection.options.properties!.version, "1.0.0");
    assert.equal(
      context.connection.options.webSocketOptions!.url,
      `wss://hostname.servicebus.windows.net:1111/`,
    );
    assert.instanceOf(context.cbsSession, CbsClient);
  });

  it("Throws error if user-agent string length is greater than 512 characters", function () {
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

  it("disables tls when connecting to the development emulator", async function () {
    const emulatorConnectionString =
      "Endpoint=sb://localhost;SharedAccessKeyName=sakName;SharedAccessKey=sak;EntityPath=ep;UseDevelopmentEmulator=true";
    const config = ConnectionConfig.create(emulatorConnectionString, path);
    const context = ConnectionContextBase.create({
      config: config,
      connectionProperties: defaultConnectionProperties,
    });
    assert.isDefined(context.connection);
    assert.instanceOf(context.connection, Connection);
    assert.equal(context.connection.options.transport, Constants.TCP);
    assert.equal((context.connection.options as TlsConnectionOptions).port, 5672);
  });

  describe("#refreshConnection", function () {
    it("should update fields on the context", function () {
      const config = ConnectionConfig.create(connectionString, path);
      const context = ConnectionContextBase.create({
        config: config,
        connectionProperties: defaultConnectionProperties,
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

describe("ConnectionContextBase - CoreAmqpConnection", () => {
  it("createSender sets maxListeners to 1000", async () => {
    const config = ConnectionConfig.create(connectionString, "mypath");
    const context = ConnectionContextBase.create({
      config,
      connectionProperties: defaultConnectionProperties,
    });
    const conn = context.connection;

    // Mock the parent class methods
    const mockSender = {
      setMaxListeners: vi.fn(),
    };
    const mockAwaitableSender = {
      setMaxListeners: vi.fn(),
    };
    const mockReceiver = {
      setMaxListeners: vi.fn(),
    };

    const createSessionSpy = vi.spyOn(conn, "createSession").mockResolvedValue({
      createSender: () => Promise.resolve(mockSender),
      createAwaitableSender: () => Promise.resolve(mockAwaitableSender),
      createReceiver: () => Promise.resolve(mockReceiver),
    } as unknown as Session);

    // Test createSender by calling the Connection's createSession then the session's createSender
    // But CoreAmqpConnection overrides createSender directly on Connection
    // We need to mock super.createSender, super.createAwaitableSender, super.createReceiver

    // Use prototype chain to test
    const rheaPromise = await import("rhea-promise");
    vi.spyOn(rheaPromise.Connection.prototype, "createSender").mockResolvedValue(
      mockSender as unknown as Sender,
    );
    vi.spyOn(rheaPromise.Connection.prototype, "createAwaitableSender").mockResolvedValue(
      mockAwaitableSender as unknown as AwaitableSender,
    );
    vi.spyOn(rheaPromise.Connection.prototype, "createReceiver").mockResolvedValue(
      mockReceiver as unknown as Receiver,
    );

    await conn.createSender();
    assert.isTrue(mockSender.setMaxListeners.mock.calls.length > 0);
    assert.equal(mockSender.setMaxListeners.mock.calls[0][0], 1000);

    await conn.createAwaitableSender();
    assert.isTrue(mockAwaitableSender.setMaxListeners.mock.calls.length > 0);
    assert.equal(mockAwaitableSender.setMaxListeners.mock.calls[0][0], 1000);

    await conn.createReceiver();
    assert.isTrue(mockReceiver.setMaxListeners.mock.calls.length > 0);
    assert.equal(mockReceiver.setMaxListeners.mock.calls[0][0], 1000);

    createSessionSpy.mockRestore();
  });
});
