// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { parseConnectionString } from "../util/utils";
import { WebSocketImpl } from "rhea-promise";

/**
 * Describes the options that can be provided while creating a connection config.
 */
export interface ConnectionConfigOptions {
  /**
   * @property {boolean} [isEntityPathRequired] Indicates whether the entity path is required in the
   * connection config.
   */
  isEntityPathRequired?: boolean;
}

/**
 * Describes the connection config object that is created after parsing an EventHub or ServiceBus
 * connection string.
 */
export interface ConnectionConfig {
  /**
   * @property {string} endpoint - The service bus endpoint
   * "sb://<yournamespace>.servicebus.windows.net/".
   */
  endpoint: string;
  /**
   * The DNS hostname or IP address of the service.
   * Typically of the form "<yournamespace>.servicebus.windows.net" unless connecting
   * to the service through an intermediary.
   */
  host: string;
  /**
   * The fully qualified name of the host to connect to.
   * This field can be used by AMQP proxies to determine the correct back-end service to
   * connect the client to.
   * Typically of the form "<yournamespace>.servicebus.windows.net".
   */
  amqpHostname?: string;
  /**
   * The port number.
   */
  port?: number;
  /**
   * @property {string} connectionString - The connection string.
   */
  connectionString: string;
  /**
   * @property {string} entityPath - The name/path of the entity (hub/queue/topic name) to which the
   * connection needs to happen.
   */
  entityPath?: string;
  /**
   * @property {string} sharedAccessKeyName - The name of the access key.
   */
  sharedAccessKeyName: string;
  /**
   * @property {string} sharedAccessKey - The secret value of the access key.
   */
  sharedAccessKey: string;

  /**
   * @property {WebSocketImpl} [webSocket] - The WebSocket constructor used to create an AMQP connection
   * over a WebSocket. In browsers, the built-in WebSocket will be  used by default. In Node, a
   * TCP socket will be used if a WebSocket constructor is not provided.
   */
  webSocket?: WebSocketImpl;

  /**
   * @property {string} [webSocketEndpointPath] - The path for the endpoint that accepts an AMQP
   * connection over WebSockets.
   */
  webSocketEndpointPath?: string;

  /**
   * @property {any} [webSocketConstructorOptions] - Options to be passed to the WebSocket constructor
   */
  webSocketConstructorOptions?: any;
}

/**
 * Describes the ConnectionConfig module
 * @module ConnectionConfig
 */
export const ConnectionConfig = {
  /**
   * Creates the connection config.
   * @param {string} connectionString - The connection string for a given service like
   * EventHub/ServiceBus.
   * @param {string} [path]           - The name/path of the entity (hub name) to which the
   * connection needs to happen. This will override the EntityPath in the connectionString
   * if present.
   * @returns {ConnectionConfig} ConnectionConfig
   */
  create(connectionString: string, path?: string): ConnectionConfig {
    connectionString = String(connectionString);

    const parsedCS = parseConnectionString<{
      Endpoint: string;
      SharedAccessKeyName: string;
      SharedAccessKey: string;
      EntityPath?: string;
    }>(connectionString);
    if (!parsedCS.Endpoint) {
      throw new TypeError("Missing Endpoint in Connection String.");
    }

    if (!parsedCS.Endpoint.endsWith("/")) parsedCS.Endpoint += "/";

    const result: ConnectionConfig = {
      connectionString: connectionString,
      endpoint: parsedCS.Endpoint,
      host: parsedCS && parsedCS.Endpoint ? (parsedCS.Endpoint.match(".*://([^/]*)") || [])[1] : "",
      sharedAccessKeyName: parsedCS.SharedAccessKeyName,
      sharedAccessKey: parsedCS.SharedAccessKey
    };

    if (path || parsedCS.EntityPath) {
      result.entityPath = path || parsedCS.EntityPath;
    }
    return result;
  },

  /**
   * Validates the properties of connection config.
   * @param {ConnectionConfig} config The connection config to be validated.
   * @returns {void} void
   */
  validate(config: ConnectionConfig, options?: ConnectionConfigOptions): void {
    if (!options) options = {};

    if (!config) {
      throw new TypeError("Missing configuration");
    }

    if (!config.endpoint) {
      throw new TypeError("Missing 'endpoint' in configuration");
    }
    config.endpoint = String(config.endpoint);

    if (!config.host) {
      throw new TypeError("Missing 'host' in configuration");
    }
    config.host = String(config.host);

    if (options.isEntityPathRequired && !config.entityPath) {
      throw new TypeError("Missing 'entityPath' in configuration");
    }
    if (config.entityPath != undefined) {
      config.entityPath = String(config.entityPath);
    }

    if (!isSharedAccessSignature(config.connectionString)) {
      if (!config.sharedAccessKeyName) {
        throw new TypeError("Missing 'sharedAccessKeyName' in configuration");
      }
      config.sharedAccessKeyName = String(config.sharedAccessKeyName);

      if (!config.sharedAccessKey) {
        throw new TypeError("Missing 'sharedAccessKey' in configuration");
      }
      config.sharedAccessKey = String(config.sharedAccessKey);
    }
  }
};

/**
 * @internal
 */
export function isSharedAccessSignature(connectionString: string): boolean {
  return connectionString.match(/;{0,1}SharedAccessSignature=SharedAccessSignature /) != null;
}
