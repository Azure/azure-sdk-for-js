// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  ConnectionConfig,
  createSasTokenProvider,
  RetryOptions,
  SasTokenProvider,
  WebSocketOptions,
} from "@azure/core-amqp";
import {
  isNamedKeyCredential,
  isSASCredential,
  NamedKeyCredential,
  SASCredential,
  TokenCredential,
} from "@azure/core-auth";
import { ConnectionContext } from "./connectionContext";
import { UserAgentPolicyOptions } from "@azure/core-rest-pipeline";
import {
  parseServiceBusConnectionString,
  ServiceBusConnectionStringProperties,
} from "./util/connectionStringUtils";

/**
 * Describes the options that can be provided while creating the ServiceBusClient.
 *
 * - `webSocketOptions` : Options to configure the channelling of the AMQP connection over Web Sockets.
 *    - `websocket`     : The WebSocket constructor used to create an AMQP connection if you choose to make the connection
 * over a WebSocket.
 *    - `webSocketConstructorOptions` : Options to pass to the Websocket constructor when you choose to make the connection
 * over a WebSocket.
 * - `retryOptions`     : The retry options for all the operations on the client.
 *    - `maxRetries` : The number of times the operation can be retried in case of a retryable error.
 *    - `maxRetryDelayInMs`: The maximum delay between retries. Applicable only when performing exponential retries.
 *    - `mode`: Which retry mode to apply, specified by the `RetryMode` enum. Options are `Exponential` and `Fixed`. Defaults to `Fixed`.
 *    - `retryDelayInMs`: Amount of time to wait in milliseconds before making the next attempt. When `mode` is set to `Exponential`,
 *       this is used to compute the exponentially increasing delays between retries. Default: 30000 milliseconds.
 *    - `timeoutInMs`: Amount of time in milliseconds to wait before the operation times out. This will trigger a retry if there are any
 *       retry attempts remaining. Minimum value: 60000 milliseconds.
 */
export interface ServiceBusClientOptions {
  /**
   * ID to identify this client. This can be used to correlate logs and exceptions.
   */
  identifier?: string;
  /**
   * A custom endpoint to use when connecting to the Service Bus service.
   * This can be useful when your network does not allow connecting to the
   * standard Azure Service Bus endpoint address, but does allow connecting
   * through an intermediary.
   *
   * Example: "https://my.custom.endpoint:100/"
   */
  customEndpointAddress?: string;
  /**
   * Retry policy options that determine the mode, number of retries, retry interval etc.
   */
  retryOptions?: RetryOptions;
  /**
   * Options to configure the channelling of the AMQP connection over Web Sockets.
   */
  webSocketOptions?: WebSocketOptions;
  /**
   * Options for adding user agent details to outgoing requests.
   */
  userAgentOptions?: UserAgentPolicyOptions;
}

// TODO: extract parseEndpoint and setCustomEndpointAddress into core-amqp
// ConnectionConfig so that it can be shared between Event Hubs and Service Bus
/**
 * Parses the host, hostname, and port from an endpoint.
 * @param endpoint - And endpoint to parse.
 * @internal
 */
export function parseEndpoint(endpoint: string): { host: string; hostname: string; port?: string } {
  const hostMatch = endpoint.match(/.*:\/\/([^/]*)/);
  if (!hostMatch) {
    throw new TypeError(`Invalid endpoint missing host: ${endpoint}`);
  }

  const [, host] = hostMatch;
  const [hostname, port] = host.split(":");

  return { host, hostname, port };
}
/**
 * Updates the provided ConnectionConfig to use the custom endpoint address.
 * @param config - An existing connection configuration to be updated.
 * @param customEndpointAddress - The custom endpoint address to use.
 */
function setCustomEndpointAddress(config: ConnectionConfig, customEndpointAddress: string): void {
  // The amqpHostname should match the host prior to using the custom endpoint.
  config.amqpHostname = config.host;
  const { hostname, port } = parseEndpoint(customEndpointAddress);
  // Since we specify the port separately, set host to the customEndpointAddress hostname.
  config.host = hostname;
  if (port) {
    config.port = parseInt(port, 10);
  }
}

/**
 * @internal
 *
 */
export function createConnectionContext(
  connectionString: string,
  credential: SasTokenProvider | TokenCredential,
  options: ServiceBusClientOptions
): ConnectionContext {
  const config = ConnectionConfig.create(connectionString);

  config.webSocket = options?.webSocketOptions?.webSocket;
  config.webSocketEndpointPath = "$servicebus/websocket";
  config.webSocketConstructorOptions = options?.webSocketOptions?.webSocketConstructorOptions;

  if (options?.customEndpointAddress) {
    setCustomEndpointAddress(config, options.customEndpointAddress);
  }

  return ConnectionContext.create(config, credential, options);
}

/**
 * @internal
 */
export function createConnectionContextForConnectionString(
  connectionString: string,
  options: ServiceBusClientOptions = {}
): ConnectionContext {
  const parsed = parseServiceBusConnectionString(connectionString) as Required<
    | Pick<ServiceBusConnectionStringProperties, "sharedAccessKey" | "sharedAccessKeyName">
    | Pick<ServiceBusConnectionStringProperties, "sharedAccessSignature">
  >;
  const sasTokenProvider = createSasTokenProvider(parsed);
  return createConnectionContext(connectionString, sasTokenProvider, options);
}

/**
 *
 * @internal
 */
export function createConnectionContextForCredential(
  credential: TokenCredential | NamedKeyCredential | SASCredential,
  host: string,
  options: ServiceBusClientOptions = {}
): ConnectionContext {
  if (typeof host !== "string") {
    throw new TypeError("`host` parameter is not a string");
  }

  let tokenProvider: TokenCredential | SasTokenProvider;

  // host, credential and options based constructor was invoked
  if (!host.endsWith("/")) {
    host += "/";
  }
  if (isNamedKeyCredential(credential) || isSASCredential(credential)) {
    tokenProvider = createSasTokenProvider(credential);
  } else {
    tokenProvider = credential;
  }
  const connectionString = `Endpoint=sb://${host};SharedAccessKeyName=defaultKeyName;SharedAccessKey=defaultKeyValue;`;
  return createConnectionContext(connectionString, tokenProvider, options);
}

/**
 * Parses a connection string and extracts the EntityPath named entity out.
 * @param connectionString - An entity specific Service Bus connection string.
 * @internal
 */
export function getEntityNameFromConnectionString(connectionString: string): string {
  const entityPathMatch = connectionString.match(/^.+EntityPath=(.+?);{0,1}$/);

  if (entityPathMatch != null && entityPathMatch.length === 2) {
    return entityPathMatch[1];
  } else {
    throw new Error("No entity name present in the connection string");
  }
}
