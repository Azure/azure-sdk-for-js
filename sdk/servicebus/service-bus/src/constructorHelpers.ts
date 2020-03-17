// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { ReceiveMode } from "./serviceBusMessage";
import {
  TokenCredential,
  ConnectionConfig,
  SharedKeyCredential,
  DataTransformer,
  WebSocketOptions
} from "@azure/core-amqp";
import { ConnectionContext } from "./connectionContext";

/**
 * Describes the options that can be provided while creating the ServiceBusClient.
 * @interface ServiceBusClientOptions
 */
export interface ServiceBusClientOptions {
  /**
   * @property The data transformer that will be used to encode
   * and decode the sent and received messages respectively. If not provided then we will use the
   * DefaultDataTransformer. The default transformer should handle majority of the cases. This
   * option needs to be used only for specialized scenarios.
   */
  dataTransformer?: DataTransformer;
  /**
   * @property
   * Options to configure the channelling of the AMQP connection over Web Sockets.
   */
  webSocketOptions?: WebSocketOptions;
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
  ConnectionConfig.validate(config);
  return ConnectionContext.create(config, credential, options);
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
