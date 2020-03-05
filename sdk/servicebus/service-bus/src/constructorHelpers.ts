// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { QueueAuth, SubscriptionAuth } from "./models";
import { ReceiveMode } from "./serviceBusMessage";
import {
  isTokenCredential,
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
 * Attempts to generically figure out what the entity path is from the grab bag of string parameters
 * we get in our constructors.
 *
 * @param auth Authentication information using connection strings or a TokenCredential.
 * @param options Options for the service bus client itself.
 * @internal
 * @ignore
 */
export function createConnectionContext(
  auth: QueueAuth | SubscriptionAuth,
  options: ServiceBusClientOptions
): { context: ConnectionContext; entityPath: string } {
  if (hasTokenCredentialAndHost(auth)) {
    let entityPath: string;

    if (hasQueueName(auth)) {
      entityPath = auth.queueName;
    } else if (hasTopicName(auth) && hasSubscriptionName(auth)) {
      entityPath = `${auth.topicName}/Subscriptions/${auth.subscriptionName}`;
    } else {
      throw new TypeError("Missing fields when using TokenCredential authentication");
    }

    return {
      context: createConnectionContextForTokenCredential(auth.tokenCredential, auth.host, options),
      entityPath: entityPath
    };
  } else if (hasQueueConnectionString(auth)) {
    // connection string based authentication
    const queueName = getEntityNameFromConnectionString(auth.queueConnectionString);

    return {
      context: createConnectionContextForConnectionString(auth.queueConnectionString, options),
      entityPath: queueName
    };
  } else if (hasTopicConnectionString(auth)) {
    const topicName = getEntityNameFromConnectionString(auth.topicConnectionString);

    if (hasSubscriptionName(auth)) {
      // topic (from connection string) + sub
      return {
        context: createConnectionContextForConnectionString(auth.topicConnectionString, options),
        entityPath: `${topicName}/Subscriptions/${auth.subscriptionName as string}`
      };
    } else {
      throw new TypeError("Missing subscription name, required as part of connecting to a topic");
    }
  } else if (hasConnectionString(auth)) {
    let entityPath: string;

    if (hasQueueName(auth)) {
      entityPath = auth.queueName;
    } else if (hasTopicName(auth) && hasSubscriptionName(auth)) {
      entityPath = `${auth.topicName}/Subscriptions/${auth.subscriptionName}`;
    } else {
      throw new TypeError("Missing fields when using TokenCredential authentication");
    }

    return {
      context: createConnectionContextForConnectionString(auth.connectionString, options),
      entityPath: entityPath
    };
  } else {
    throw new TypeError("Unhandled set of parameters");
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

function hasHost(auth: any): auth is { host: string } {
  return auth.host && typeof auth.host === "string";
}

function hasTokenCredentialAndHost(
  auth: any
): auth is { tokenCredential: TokenCredential; host: string } {
  return isTokenCredential(auth.tokenCredential) && hasHost(auth);
}

function hasSubscriptionName(auth: any): auth is { subscriptionName: string } {
  return auth.subscriptionName && typeof auth.subscriptionName === "string";
}

function hasQueueName(auth: any): auth is { queueName: string } {
  return auth.queueName && typeof auth.queueName === "string";
}

function hasTopicName(auth: any): auth is { topicName: string } {
  return auth.topicName && typeof auth.topicName === "string";
}

function hasQueueConnectionString(auth: any): auth is { queueConnectionString: string } {
  return auth.queueConnectionString && typeof auth.queueConnectionString === "string";
}

function hasConnectionString(auth: any): auth is { connectionString: string } {
  return auth.connectionString && typeof auth.connectionString === "string";
}

function hasTopicConnectionString(
  auth: any
): auth is {
  topicConnectionString: string;
} {
  return auth.topicConnectionString && typeof auth.topicConnectionString === "string";
}
