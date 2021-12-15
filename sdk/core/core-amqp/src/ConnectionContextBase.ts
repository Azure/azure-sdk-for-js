// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Connection, ConnectionOptions, generate_uuid } from "rhea-promise";
import { getFrameworkInfo, getPlatformInfo } from "./util/runtimeInfo";
import { CbsClient } from "./cbs";
import { ConnectionConfig } from "./connectionConfig/connectionConfig";
import { Constants } from "./util/constants";
import { isNode } from "./util/utils";

/**
 * Provides contextual information like the underlying amqp connection, cbs session, tokenProvider,
 * Connection config, data transformer, etc.
 */
export interface ConnectionContextBase {
  /**
   * The EventHub connection config that is created after
   * parsing the connection string.
   */
  readonly config: ConnectionConfig;
  /**
   * The unique lock name per connection that is used to
   * acquire the lock for establishing an amqp connection per client if one does not exist.
   */
  connectionLock: string;
  /**
   * The unique lock name per connection that is used to
   * acquire the lock for negotiating cbs claim by an entity on that connection.
   */
  negotiateClaimLock: string;
  /**
   * The underlying AMQP connection.
   */
  connection: Connection;
  /**
   * The amqp connection id that uniquely identifies the
   * connection within a process.
   */
  connectionId: string;
  /**
   * Indicates whether the close() method was
   * called on the connection object.
   */
  wasConnectionCloseCalled: boolean;
  /**
   * A reference to the cbs session ($cbs endpoint) on the
   * underlying AMQP connection for the EventHub Client.
   */
  cbsSession: CbsClient;
  /**
   * Updates the context to use a new underlying AMQP connection and new cbs session.
   */
  refreshConnection: () => void;
}

/**
 * Defines the properties that need to be set while establishing the AMQP connection.
 */
export interface ConnectionProperties {
  /**
   * The name of the product that will be populated as the AMQP
   * connection property. Example: "MSJSClient".
   */
  product: string;
  /**
   * The version of the package/sdk that is making the AMQP connection.
   */
  version: string;
  /**
   * The userAgent that needs to be set as the AMQP connection
   * property. Example: `"/js-service-bus"` or `"/js-event-hubs,/js-event-processor-host=1.0.0"`.
   */
  userAgent: string;
}

/**
 * Describes the parameters that can be provided to create the base connection context.
 */
export interface CreateConnectionContextBaseParameters {
  /**
   * The connection config that is created by parsing the
   * connection string.
   */
  config: ConnectionConfig;
  /**
   * Properties to be provided while creating
   * the AMQP connection.
   */
  connectionProperties: ConnectionProperties;
  /**
   * Determines whether entity path should be a part of
   * the connection config. If `true` it must be present, `false` otherwise. Default value false.
   */
  isEntityPathRequired?: boolean;
  /**
   * The duration in which the promise should
   * complete (resolve/reject). If it is not completed, then the Promise will be rejected after
   * timeout occurs. Default: `60000 milliseconds`.
   */
  operationTimeoutInMs?: number;
}

// eslint-disable-next-line @typescript-eslint/no-redeclare -- renaming constant would be a breaking change.
export const ConnectionContextBase = {
  /**
   * Creates the base connection context.
   * @param parameters - Parameters to be provided to create
   * the base connection context.
   */
  create(parameters: CreateConnectionContextBaseParameters): ConnectionContextBase {
    ConnectionConfig.validate(parameters.config, {
      isEntityPathRequired: parameters.isEntityPathRequired || false
    });
    const userAgent = parameters.connectionProperties.userAgent;
    if (userAgent.length > Constants.maxUserAgentLength) {
      throw new Error(
        `The user-agent string cannot be more than ${Constants.maxUserAgentLength} characters in length.` +
          `The given user-agent string is: ${userAgent} with length: ${userAgent.length}`
      );
    }

    const connectionOptions: ConnectionOptions = {
      transport: Constants.TLS,
      host: parameters.config.host,
      hostname: parameters.config.amqpHostname ?? parameters.config.host,
      username: parameters.config.sharedAccessKeyName,
      port: parameters.config.port ?? 5671,
      reconnect: false,
      properties: {
        product: parameters.connectionProperties.product,
        version: parameters.connectionProperties.version,
        "user-agent": userAgent,
        platform: getPlatformInfo(),
        framework: getFrameworkInfo()
      },
      idle_time_out: Constants.defaultConnectionIdleTimeoutInMs,
      operationTimeoutInSeconds: parameters.operationTimeoutInMs
        ? parameters.operationTimeoutInMs / 1000
        : undefined
    };

    if (
      parameters.config.webSocket ||
      (!isNode && typeof self !== "undefined" && (self as any).WebSocket)
    ) {
      const socket = parameters.config.webSocket || (self as any).WebSocket;
      const host = parameters.config.host;
      const endpoint = parameters.config.webSocketEndpointPath || "";
      const socketOptions = parameters.config.webSocketConstructorOptions || {};
      const port = parameters.config.port ?? 443;

      connectionOptions.webSocketOptions = {
        webSocket: socket,
        url: `wss://${host}:${port}/${endpoint}`,
        protocol: ["AMQPWSB10"],
        options: socketOptions
      };
    }

    const connection = new Connection(connectionOptions);
    const connectionLock = `${Constants.establishConnection}-${generate_uuid()}`;
    const connectionContextBase: ConnectionContextBase = {
      wasConnectionCloseCalled: false,
      connectionLock: connectionLock,
      negotiateClaimLock: `${Constants.negotiateClaim}-${generate_uuid()}`,
      connection: connection,
      connectionId: connection.id,
      cbsSession: new CbsClient(connection, connectionLock),
      config: parameters.config,
      refreshConnection() {
        const newConnection = new Connection(connectionOptions);
        const newConnectionLock = `${Constants.establishConnection}-${generate_uuid()}`;
        this.wasConnectionCloseCalled = false;
        this.connectionLock = newConnectionLock;
        this.negotiateClaimLock = `${Constants.negotiateClaim} - ${generate_uuid()}`;
        this.connection = newConnection;
        this.connectionId = newConnection.id;
        this.cbsSession = new CbsClient(newConnection, newConnectionLock);
      }
    };

    return connectionContextBase;
  }
};
