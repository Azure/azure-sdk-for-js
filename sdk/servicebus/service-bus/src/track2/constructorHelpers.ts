// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { QueueAuth, SubscriptionAuth } from "./models";
import { ReceiveMode } from "../serviceBusMessage";
import { isTokenCredential, TokenCredential } from "@azure/core-amqp";
import { ConnectionContext } from "../connectionContext";
import {
  createConnectionContextForTokenCredential,
  createConnectionContextForConnectionString,
  ServiceBusClientOptions
} from "../old/serviceBusClient";

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

    // TODO: this isn't quite right - we don't need just the entity path. We
    // also form a different connection string.
    //if (auth2.queueName && typeof auth2.queueName === "string") {
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
    const entityPathMatch = auth.queueConnectionString.match(/^.+EntityPath=(.+?);{0,1}$/);

    if (entityPathMatch != null && entityPathMatch.length === 2) {
      return {
        context: createConnectionContextForConnectionString(auth.queueConnectionString, options),
        entityPath: entityPathMatch[1]
      };
    } else {
      throw new Error("No entity name present in the connection string");
    }
  } else if (hasTopicConnectionString(auth)) {
    // connection string based authentication
    const entityPathMatch = auth.topicConnectionString.match(
      /^.+EntityPath=(.+?);{0,1}$/
    );

    if (entityPathMatch != null && entityPathMatch.length === 2) {
      const baseEntityPath = entityPathMatch![1]!;

      if (hasSubscriptionName(auth)) {
        // topic (from connection string) + sub
        return {
          context: createConnectionContextForConnectionString(auth.topicConnectionString, options),
          entityPath: `${baseEntityPath}/Subscriptions/${auth.subscriptionName as string}`
        };
      } else {
        throw new TypeError("Missing subscription name, required as part of connecting to a topic");
      }
    } else {
      throw new TypeError("No entity name present in the connection string");
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
  return auth.queueConnectionString != null && typeof auth.queueConnectionString === "string";
}

function hasConnectionString(auth: any): auth is { connectionString: string } {
  return auth.connectionString && typeof auth.connectionString === "string";
}

function hasTopicConnectionString(
  auth: any
): auth is {
  topicConnectionString: string;
} {
  return auth.topicConnectionString != null && typeof auth.topicConnectionString === "string";
}
