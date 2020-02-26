// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { Session, QueueAuth, SubscriptionAuth } from "./models";
import { ServiceBusClientReceiverOptions } from "../old/oldServiceBusReceiverClient";
import { ReceiveMode } from "../serviceBusMessage";
import { isTokenCredential, TokenCredential } from '@azure/core-amqp';
import { ConnectionContext } from '../connectionContext';
import { createConnectionContextForTokenCredential, createConnectionContextForConnectionString, ServiceBusClientOptions } from '../old/serviceBusClient';

// The methods in this file are all here just to make handling
// the _large_ number of constructor overloads for ReceiverClient.
//
// As a result you'll see that some of the type-overloaded-craziness
// bleeds into these methods. They're not pretty, but at least they're
// factored out.

/**
 * Checks the receiveMode parameter to see if it's an actual receiveMode
 * or one of the multitude of constructor options available to the user.
 *
 * @param possibleReceiveMode
 * @internal
 * @ignore
 */
export function isReceiveMode(
  possibleReceiveMode:
    | "peekLock"
    | "receiveAndDelete"
    | Session
    | ServiceBusClientReceiverOptions
    | undefined
): possibleReceiveMode is "peekLock" | "receiveAndDelete" {
  return (
    possibleReceiveMode != null &&
    typeof possibleReceiveMode === "string" &&
    (possibleReceiveMode === "peekLock" || possibleReceiveMode === "receiveAndDelete")
  );
}

/**
 * Attempts to generically figure out what the entity path is from the grab bag of string parameters
 * we get in our constructors.
 *
 * @param connectionString The connection string - could be entity specific (topic, queue) or for the service bus itself.
 * @param optionalQueueOrSubscriptionOrTopicName An optional entity name.
 * There are 3 different options from here:
 * - They passed a service bus connection string in `connectionString`: this parameter will be a topic or queue
 * - They passed an entity specific connection string (topic/queue): this parameter will be undefined _or_ a subscription
 * @param optionalSubscriptionName An optional subscription name.
 * You get here if the user is targeting a subscription but passed:
 * 1. A service bus only connection string for parameter 1
 * 2. A topic name for parameter 2
 * 3. And now a subscription for parameter 3
 *
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
      throw new Error("Missing fields when using TokenCredential authentication");
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
        throw new Error("Misisng subscription name, required as part of connecting to a topic");
      }     
    } else {
      throw new Error("No entity name present in the connection string");
    }
  } else {
    throw new Error("Unhandled set of parameters");
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
    // TODO: this is just a compile error if someone adds another string enum value, right?
  }
}
