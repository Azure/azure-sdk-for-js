// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { Connection, ConnectionOptions, generate_uuid } from "rhea-promise";
import { CbsClient } from "./cbs";
import { DataTransformer, DefaultDataTransformer } from "./dataTransformer";
import { TokenProvider } from "./auth/token";
import { ConnectionConfig } from "./connectionConfig/connectionConfig";
import { SasTokenProvider } from "./auth/sas";

import * as Constants from "./util/constants";
import * as os from "os";
import { isNode } from "./util/utils";

/**
 * @interface ConnectionContextBase
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
   * @property {string} connectionLock The unqiue lock name per connection that is used to
   * acquire the lock for establishing an aqmp connection per client if one does not exist.
   */
  readonly connectionLock: string;
  /**
   * @property {string} negotiateClaimLock The unqiue lock name per connection that is used to
   * acquire the lock for negotiating cbs claim by an entity on that connection.
   */
  readonly negotiateClaimLock: string;
  /**
   * @property {TokenProvider} tokenProvider The TokenProvider to be used for getting tokens
   * for authentication for the EventHub client.
   */
  readonly tokenProvider: TokenProvider;
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
   * @property {DataTransformer} dataTransformer A DataTransformer object that has methods named
   * - encode Responsible for encoding the AMQP message before sending it on the wire.
   * - decode Responsible for decoding the received AMQP message before passing it to the customer.
   */
  dataTransformer: DataTransformer;
  /**
   * @property {CbsClient} cbsSession A reference to the cbs session ($cbs endpoint) on the
   * underlying AMQP connection for the EventHub Client.
   */
  cbsSession: CbsClient;
}

/**
 * Defines the properties that need to be set while establishing the AMQP connection.
 * @interface ConnectionProperties
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
 * @interface CreateConnectionContextBaseParameters
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
   * @property {TokenProvider} [tokenProvider] The token provider to be used for Authentication.
   * Default value: SasTokenProvider.
   */
  tokenProvider?: TokenProvider;
  /**
   * @property {DataTransformer} [dataTransformer] The datatransformer to be used for encoding and
   * decoding messages. Default value: DefaultDataTransformer
   */
  dataTransformer?: DataTransformer;
  /**
   * @property {boolean} [isEntityPathRequired] Determines whether entity path should be a part of
   * the connection config. If `true` it must be present, `false` otherwise. Default value false.
   */
  isEntityPathRequired?: boolean;
  /**
   * @property {number} [operationTimeoutInSeconds] - The duration in which the promise should
   * complete (resolve/reject). If it is not completed, then the Promise will be rejected after
   * timeout occurs. Default: `60 seconds`.
   */
  operationTimeoutInSeconds?: number;
}

export module ConnectionContextBase {
  /**
   * Creates the base connection context.
   * @param {CreateConnectionContextBaseParameters} parameters Parameters to be provided to create
   * the base connection context.
   */
  export function create(
    parameters: CreateConnectionContextBaseParameters
  ): ConnectionContextBase {
    ConnectionConfig.validate(parameters.config, {
      isEntityPathRequired: parameters.isEntityPathRequired || false
    });
    const userAgent = parameters.connectionProperties.userAgent;
    if (userAgent.length > Constants.maxUserAgentLength) {
      throw new Error(
        `The user-agent string cannot be more than ${
          Constants.maxUserAgentLength
        } characters in length.` +
          `The given user-agent string is: ${userAgent} with length: ${
            userAgent.length
          }`
      );
    }

    const connectionOptions: ConnectionOptions = {
      transport: Constants.TLS,
      host: parameters.config.host,
      hostname: parameters.config.host,
      username: parameters.config.sharedAccessKeyName,
      port: 5671,
      reconnect: false,
      properties: {
        product: parameters.connectionProperties.product,
        version: parameters.connectionProperties.version,
        "user-agent": userAgent,
        platform: `(${os.arch()}-${os.type()}-${os.release()})`,
        framework: `Node/${process.version}`
      },
      operationTimeoutInSeconds: parameters.operationTimeoutInSeconds
    };

    if (
      parameters.config.webSocket ||
      (!isNode && typeof window !== "undefined" && (window as any).WebSocket)
    ) {
      const socket = parameters.config.webSocket || (window as any).WebSocket;
      const host = parameters.config.host;
      const endpoint = parameters.config.webSocketEndpointPath || "";
      const socketOptions = parameters.config.webSocketConstructorOptions || {};

      connectionOptions.webSocketOptions = {
        webSocket: socket,
        url: `wss://${host}:443/${endpoint}`,
        protocol: ["AMQPWSB10"],
        options: socketOptions
      };
    }

    const connection = new Connection(connectionOptions);
    const connectionLock = `${
      Constants.establishConnection
    }-${generate_uuid()}`;
    const connectionContextBase: ConnectionContextBase = {
      wasConnectionCloseCalled: false,
      connectionLock: connectionLock,
      negotiateClaimLock: `${Constants.negotiateClaim}-${generate_uuid()}`,
      connection: connection,
      connectionId: connection.id,
      cbsSession: new CbsClient(connection, connectionLock),
      config: parameters.config,
      tokenProvider:
        parameters.tokenProvider ||
        new SasTokenProvider(
          parameters.config.endpoint,
          parameters.config.sharedAccessKeyName,
          parameters.config.sharedAccessKey
        ),
      dataTransformer:
        parameters.dataTransformer || new DefaultDataTransformer()
    };

    return connectionContextBase;
  }
}
