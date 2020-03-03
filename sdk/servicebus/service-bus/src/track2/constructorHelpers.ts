// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { QueueAuth, SubscriptionAuth } from "./models";
import { ReceiveMode } from "../serviceBusMessage";
import { isTokenCredential, TokenCredential } from '@azure/core-amqp';
import { ConnectionContext } from '../connectionContext';
import { createConnectionContextForTokenCredential, createConnectionContextForConnectionString, ServiceBusClientOptions } from '../old/serviceBusClient';

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
): { context: ConnectionContext, entityPath: string } {

  // TODO: replace with actual typeguards
  const auth2 = auth as any;

  if (auth2.tokenCredential != null && isTokenCredential(auth2.tokenCredential)) {
    let entityPath: string;

    // TODO: this isn't quite right - we don't need just the entity path. We
    // also form a different connection string.
    if (auth2.queueName && typeof auth2.queueName === "string") {
      const queueName: string = auth2.queueName;
      entityPath = queueName;
    } else if (auth2.topicName && typeof auth2.topicName === "string" 
      && auth2.subscriptionName && typeof auth2.subscriptionName === "string") {
      const topicName = auth2.topicName;
      const subscriptionName = auth2.subscriptionName;
      entityPath = `${topicName}/Subscriptions/${subscriptionName}`;
    } else {
      throw new TypeError("Missing fields when using TokenCredential authentication");
    }

    const host: string = auth2.host;
    const tokenCredential: TokenCredential = auth2.tokenCredential;

    return {
      context: createConnectionContextForTokenCredential(tokenCredential, host, options),
      entityPath: entityPath
    };
  } else if (auth2.queueConnectionString != null && typeof auth2.queueConnectionString === "string") {
    // connection string based authentication
    const entityPathMatch = (auth2.queueConnectionString as string).match(/^.+EntityPath=(.+?);{0,1}$/);

    if (entityPathMatch != null && entityPathMatch.length === 2) {
      return {
        context: createConnectionContextForConnectionString(auth2.queueConnectionString, options),
        entityPath: entityPathMatch[1]
      };
    } else {
      throw new Error("No entity name present in the connection string");
    }

  } else if (auth2.topicConnectionString != null && typeof auth2.topicConnectionString === "string") {
    // connection string based authentication
    const entityPathMatch = (auth2.topicConnectionString as string).match(/^.+EntityPath=(.+?);{0,1}$/);

    if (entityPathMatch != null && entityPathMatch.length === 2) {
      const baseEntityPath = entityPathMatch![1]!;
    
      if (auth2.subscriptionName != null && typeof auth2.subscriptionName === "string") {
        // topic (from connection string) + sub
        return {
          context: createConnectionContextForConnectionString(auth2.topicConnectionString, options),
          entityPath: `${baseEntityPath}/Subscriptions/${auth2.subscriptionName as string}`
        };
      } else {
        throw new TypeError("Missing subscription name, required as part of connecting to a topic");
      }     
    } else {
      throw new TypeError("No entity name present in the connection string");
    }
  } else if (auth2.connectionString && typeof auth2.connectionString === "string") {
      let entityPath: string;

      if (auth2.queueName && typeof auth2.queueName === "string") {
        const queueName: string = auth2.queueName;
        entityPath = queueName;
      } else if (auth2.topicName && typeof auth2.topicName === "string" 
        && auth2.subscriptionName && typeof auth2.subscriptionName === "string") {
        const topicName = auth2.topicName;
        const subscriptionName = auth2.subscriptionName;
        entityPath = `${topicName}/Subscriptions/${subscriptionName}`;
      } else {
        throw new TypeError("Missing fields when using TokenCredential authentication");
      }
  
      return {
        context: createConnectionContextForConnectionString(auth2.connectionString, options),
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
