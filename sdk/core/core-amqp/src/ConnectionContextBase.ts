// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Connection, ConnectionOptions, generate_uuid } from "rhea-promise";
import { CbsClient } from "./cbs";
import { ConnectionConfig } from "./connectionConfig/connectionConfig";

import { Constants } from "./util/constants";
import { getFrameworkInfo, getPlatformInfo } from "./util/runtimeInfo";
import { isNode } from "./util/utils";

/**
 * Provides contextual information like the underlying amqp connection, cbs session, tokenProvider,
 * Connection config, data transformer, etc.
 */
export interface ConnectionContextBase {
  /**
   * @property {ConnectionConfig} config The EventHub connection config that is created after
   * parsing the connection string.
   */
  readonly config: ConnectionConfig;
  /**
   * @property {string} connectionLock The unique lock name per connection that is used to
   * acquire the lock for establishing an amqp connection per client if one does not exist.
   */
  connectionLock: string;
  /**
   * @property {string} negotiateClaimLock The unique lock name per connection that is used to
   * acquire the lock for negotiating cbs claim by an entity on that connection.
   */
  negotiateClaimLock: string;
  /**
   * @property {Connection} connection The underlying AMQP connection.
   */
  connection: Connection;
  /**
   * @property {string} connectionId The amqp connection id that uniquely identifies the
   * connection within a process.
   */
  connectionId: string;
  /**
   * @property {boolean} wasConnectionCloseCalled Indicates whether the close() method was
   * called on the connection object.
   */
  wasConnectionCloseCalled: boolean;
  /**
   * @property {CbsClient} cbsSession A reference to the cbs session ($cbs endpoint) on the
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
   * @property {string} product The name of the product that will be populated as the AMQP
   * connection property. Example: "MSJSClient".
   */
  product: string;
  /**
   * @property {string} version The version of the package/sdk that is making the AMQP connection.
   */
  version: string;
  /**
   * @property {string} userAgent The userAgent that needs to be set as the AMQP connection
   * property. Example: `"/js-service-bus"` or `"/js-event-hubs,/js-event-processor-host=1.0.0"`.
   */
  userAgent: string;
}

/**
 * Describes the parameters that can be provided to create the base connection context.
 */
export interface CreateConnectionContextBaseParameters {
  /**
   * @property {ConnectionConfig} config The connection config that is created by parsing the
   * connection string.
   */
  config: ConnectionConfig;
  /**
   * @property {ConnectionProperties} connectionProperties Properties to be provided while creating
   * the AMQP connection.
   */
  connectionProperties: ConnectionProperties;
  /**
   * @property {boolean} [isEntityPathRequired] Determines whether entity path should be a part of
   * the connection config. If `true` it must be present, `false` otherwise. Default value false.
   */
  isEntityPathRequired?: boolean;
  /**
   * @property {number} [operationTimeoutInMs] - The duration in which the promise should
   * complete (resolve/reject). If it is not completed, then the Promise will be rejected after
   * timeout occurs. Default: `60000 milliseconds`.
   */
  operationTimeoutInMs?: number;
}

export const ConnectionContextBase = {
  /**
   * Creates the base connection context.
   * @param {CreateConnectionContextBaseParameters} parameters Parameters to be provided to create
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
      (!isNode && typeof window !== "undefined" && (window as any).WebSocket)
    ) {
      const socket = parameters.config.webSocket || (window as any).WebSocket;
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
        const connection = new Connection(connectionOptions);
        const connectionLock = `${Constants.establishConnection}-${generate_uuid()}`;
        this.wasConnectionCloseCalled = false;
        this.connectionLock = connectionLock;
        this.negotiateClaimLock = `${Constants.negotiateClaim} - ${generate_uuid()}`;
        this.connection = connection;
        this.connectionId = connection.id;
        this.cbsSession = new CbsClient(connection, connectionLock);
      }
    };

    return connectionContextBase;
  }
};
