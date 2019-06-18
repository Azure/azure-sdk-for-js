// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import {
  parseConnectionString,
  ServiceBusConnectionStringModel
} from "../util/utils";
import { WebSocketImpl } from "rhea-promise";

/**
 * Describes the options that can be provided while creating a connection config.
 * @interface ConnectionConfigOptions
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
 * @interface ConnectionConfig
 */
export interface ConnectionConfig {
  /**
   * @property {string} endpoint - The service bus endpoint
   * "sb://<yournamespace>.servicebus.windows.net/".
   */
  endpoint: string;
  /**
   * @property {string} host - The host "<yournamespace>.servicebus.windows.net".
   */
  host: string;
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
export namespace ConnectionConfig {
  /**
   * Creates the connection config.
   * @param {string} connectionString - The connection string for a given service like
   * EventHub/ServiceBus.
   * @param {string} [path]           - The name/path of the entity (hub name) to which the
   * connection needs to happen. This will override the EntityPath in the connectionString
   * if present.
   * @returns {ConnectionConfig} ConnectionConfig
   */
  export function create(
    connectionString: string,
    path?: string
  ): ConnectionConfig {
    connectionString = String(connectionString);

    const parsedCS = parseConnectionString<ServiceBusConnectionStringModel>(
      connectionString
    );
    if (!parsedCS.Endpoint) {
      throw new TypeError("Missing Endpoint in Connection String.");
    }

    if (!parsedCS.Endpoint.endsWith("/")) parsedCS.Endpoint += "/";

    const result: ConnectionConfig = {
      connectionString: connectionString,
      endpoint: parsedCS.Endpoint,
      host:
        parsedCS && parsedCS.Endpoint
          ? (parsedCS.Endpoint.match("sb://([^/]*)") || [])[1]
          : "",
      sharedAccessKeyName: parsedCS.SharedAccessKeyName,
      sharedAccessKey: parsedCS.SharedAccessKey
    };

    if (path || parsedCS.EntityPath) {
      result.entityPath = path || parsedCS.EntityPath;
    }
    return result;
  }

  /**
   * Validates the properties of connection config.
   * @param {ConnectionConfig} config The connection config to be validated.
   * @returns {void} void
   */
  export function validate(
    config: ConnectionConfig,
    options?: ConnectionConfigOptions
  ): void {
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
    config.entityPath = String(config.entityPath);

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
