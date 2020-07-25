// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ReceiveMode } from "./serviceBusMessage";
import {
  ConnectionConfig,
  RetryOptions,
  SharedKeyCredential,
  TokenCredential,
  WebSocketOptions
} from "@azure/core-amqp";
import { ConnectionContext } from "./connectionContext";
import { UserAgentOptions } from "@azure/core-http";

/**
 * Describes the options that can be provided while creating the ServiceBusClient.
 */
export interface ServiceBusClientOptions {
  /**
   * Retry policy options that determine the mode, number of retries, retry interval etc.
   */
  retryOptions?: RetryOptions;
  /**
   * @property
   * Options to configure the channelling of the AMQP connection over Web Sockets.
   */
  webSocketOptions?: WebSocketOptions;
  /**
   * Options for adding user agent details to outgoing requests.
   */
  userAgentOptions?: UserAgentOptions;
}

/**
 * @param connectionString
 * @param options
 * @internal
 * @ignore
 */
export function createConnectionContextForConnectionString(
  connectionString: string,
  options: ServiceBusClientOptions = {}
): ConnectionContext {
  const config = ConnectionConfig.create(connectionString);

  config.webSocket = options?.webSocketOptions?.webSocket;
  config.webSocketEndpointPath = "$servicebus/websocket";
  config.webSocketConstructorOptions = options?.webSocketOptions?.webSocketConstructorOptions;

  const credential = new SharedKeyCredential(config.sharedAccessKeyName, config.sharedAccessKey);
  validate(config);
  return ConnectionContext.create(config, credential, options);
}

/**
 * @internal
 * @ignore
 *
 * @param {ConnectionConfig} config
 */
function validate(config: ConnectionConfig) {
  // TODO: workaround - core-amqp's validate string-izes "undefined"
  // the timing of this particular call happens in a spot where we might not have an
  // entity path so it's perfectly legitimate for it to be empty.
  config.entityPath = config.entityPath ?? "";

  ConnectionConfig.validate(config);
}

/**
 *
 * @param credential
 * @param host
 * @param options
 * @internal
 * @ignore
 */
export function createConnectionContextForTokenCredential(
  credential: TokenCredential,
  host: string,
  options: ServiceBusClientOptions = {}
): ConnectionContext {
  if (typeof host !== "string") {
    throw new TypeError("`host` parameter is not a string");
  }

  // host, credential and options based constructor was invoked
  if (!host.endsWith("/")) {
    host += "/";
  }
  const connectionString = `Endpoint=sb://${host};SharedAccessKeyName=defaultKeyName;SharedAccessKey=defaultKeyValue;`;
  const config = ConnectionConfig.create(connectionString);
  return ConnectionContext.create(config, credential, options);
}

/**
 * Parses a connection string and extracts the EntityPath named entity out.
 * @param connectionString An entity specific Service Bus connection string.
 * @internal
 * @ignore
 */
export function getEntityNameFromConnectionString(connectionString: string): string {
  const entityPathMatch = connectionString.match(/^.+EntityPath=(.+?);{0,1}$/);

  if (entityPathMatch != null && entityPathMatch.length === 2) {
    return entityPathMatch[1];
  } else {
    throw new Error("No entity name present in the connection string");
  }
}

/**
 * Temporary bit of conversion code until we can eliminate external usage of this
 * enum.
 * @param receiveMode
 * @internal
 * @ignore
 */
export function convertToInternalReceiveMode(
  receiveMode: "peekLock" | "receiveAndDelete"
): ReceiveMode {
  switch (receiveMode) {
    case "peekLock":
      return ReceiveMode.peekLock;
    case "receiveAndDelete":
      return ReceiveMode.receiveAndDelete;
  }
}
