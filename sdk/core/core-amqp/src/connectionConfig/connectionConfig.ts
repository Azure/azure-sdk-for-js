// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { WebSocketImpl } from "rhea-promise";
import { isDefined } from "../util/typeGuards";
import { parseConnectionString } from "../util/utils";

/**
 * Describes the options that can be provided while creating a connection config.
 */
export interface ConnectionConfigOptions {
  /**
   * Indicates whether the entity path is required in the
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
   * The service bus endpoint
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
   * The connection string.
   */
  connectionString: string;
  /**
   * The name/path of the entity (hub/queue/topic name) to which the
   * connection needs to happen.
   */
  entityPath?: string;
  /**
   * The name of the access key.
   */
  sharedAccessKeyName: string;
  /**
   * The secret value of the access key.
   */
  sharedAccessKey: string;

  /**
   * The WebSocket constructor used to create an AMQP connection
   * over a WebSocket. In browsers, the built-in WebSocket will be  used by default. In Node, a
   * TCP socket will be used if a WebSocket constructor is not provided.
   */
  webSocket?: WebSocketImpl;

  /**
   * The path for the endpoint that accepts an AMQP
   * connection over WebSockets.
   */
  webSocketEndpointPath?: string;

  /**
   * Options to be passed to the WebSocket constructor
   */
  webSocketConstructorOptions?: any;
}

/**
 * Describes the ConnectionConfig module
 */
// eslint-disable-next-line @typescript-eslint/no-redeclare -- renaming constant would be a breaking change.
export const ConnectionConfig = {
  /**
   * Creates the connection config.
   * @param connectionString - The connection string for a given service like
   * EventHub/ServiceBus.
   * @param path - The name/path of the entity (hub name) to which the
   * connection needs to happen. This will override the EntityPath in the connectionString
   * if present.
   * @returns ConnectionConfig
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
      sharedAccessKey: parsedCS.SharedAccessKey,
    };

    if (path || parsedCS.EntityPath) {
      result.entityPath = path || parsedCS.EntityPath;
    }
    return result;
  },

  /**
   * Validates the properties of connection config.
   * @param config - The connection config to be validated.
   * @returns void
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
    if (isDefined(config.entityPath)) {
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
  },
};

/**
 * @internal
 */
export function isSharedAccessSignature(connectionString: string): boolean {
  return connectionString.match(/;{0,1}SharedAccessSignature=SharedAccessSignature /) != null;
}
