// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { Session } from "./models";
import { ServiceBusClientReceiverOptions } from "../receiverClient";
import { ReceiveMode } from "../serviceBusMessage";

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
    | "PeekLock"
    | "ReceiveAndDelete"
    | Session
    | ServiceBusClientReceiverOptions
    | undefined
): possibleReceiveMode is "PeekLock" | "ReceiveAndDelete" {
  return (
    possibleReceiveMode != null &&
    typeof possibleReceiveMode === "string" &&
    (possibleReceiveMode === "PeekLock" || possibleReceiveMode === "ReceiveAndDelete")
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
export function getEntityPath(
  connectionString: string,
  optionalQueueOrSubscriptionOrTopicName?: string,
  optionalSubscriptionName?: string
): string {
  const entityPathMatch = connectionString.match(/^.+EntityPath=(.+?);{0,1}$/);
  let entityPath: string;

  if (entityPathMatch!.length !== 2) {
    if (optionalQueueOrSubscriptionOrTopicName == null) {
      throw new Error("No entity in conection string - queue/topic parameter is required");
    }

    let queueOrTopicName = optionalQueueOrSubscriptionOrTopicName;

    // servicebus connection string only (ie, no entity name)
    if (optionalSubscriptionName != null) {
      // topic + sub
      entityPath = `${queueOrTopicName}/Subscriptions/${optionalSubscriptionName}`;
    } else {
      // queue only
      entityPath = queueOrTopicName!;
    }
  } else {
    const baseEntityPath = entityPathMatch![1]!;

    if (optionalQueueOrSubscriptionOrTopicName != null) {
      // topic (from connection string) + sub
      entityPath = `${baseEntityPath}/Subscriptions/${optionalQueueOrSubscriptionOrTopicName}`;
    } else {
      // queue
      entityPath = baseEntityPath;
    }
  }

  return entityPath;
}

/**
 * Temporary bit of conversion code until we can eliminate external usage of this
 * enum.
 * @param receiveMode
 * @internal
 * @ignore
 */
export function convertToInternalReceiveMode(
  receiveMode: "PeekLock" | "ReceiveAndDelete"
): ReceiveMode {
  switch (receiveMode) {
    case "PeekLock":
      return ReceiveMode.peekLock;
    case "ReceiveAndDelete":
      return ReceiveMode.receiveAndDelete;
    // TODO: this is just a compile error if someone adds another string enum value, right?
  }
}
