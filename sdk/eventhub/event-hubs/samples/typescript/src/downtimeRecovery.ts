// Copyright (c) Microsoft Corporation.
// Licensed under the MIT Licence.

/**
 * @summary Demonstrates how to use the EventHubConsumerClient to process events from all partitions of a consumer group in an Event Hub.
 *
 * @azsdk-weight 50
 */

import {
  EventHubConsumerClient,
  earliestEventPosition,
  MessagingError,
  SubscriptionEventHandlers,
  Subscription
} from "@azure/event-hubs";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

const connectionString = process.env["EVENTHUB_CONNECTION_STRING"] || "";
const eventHubName = process.env["EVENTHUB_NAME"] || "";
const consumerGroup = process.env["CONSUMER_GROUP_NAME"] || "";

/**
 * DowntimeTracker keeps track of when errors of interest occur.
 * This can be useful to keep track of how long some MessagingErrors
 * occur without receiving events so that we can programatically recreate
 * the EventHubConsumerClient.
 */
class DowntimeTracker {
  /**
   * Keeps track of the timestamps errors occurred.
   */
  private _errorTimestamps: number[] = [];
  constructor(private maximumAllowableDowntimeInSeconds: number) {}

  /**
   * Call anytime an error of interest is encountered.
   * @returns indication that the client may be down.
   */
  isDown(): boolean {
    const currentTimestamp = Date.now();
    this._errorTimestamps.push(currentTimestamp);
    const firstTimestamp = this._errorTimestamps[0];
    if (currentTimestamp - firstTimestamp > this.maximumAllowableDowntimeInSeconds) {
      return true;
    }
    return false;
  }

  /**
   * Call anytime an event is received.
   * This resets the tracker.
   */
  clear(): void {
    this._errorTimestamps = [];
  }
}

function createSubscriptionHandler(
  consumerClient: EventHubConsumerClient
): SubscriptionEventHandlers {
  const downtimeTracker = new DowntimeTracker(300 /* 5 minutes */);
  return {
    // The callback where you add your code to process incoming events
    processEvents: async (events, context) => {
      // Note: It is possible for `events` to be an empty array.
      // This can happen if there were no new events to receive
      // in the `maxWaitTimeInSeconds`, which is defaulted to
      // 60 seconds.
      // The `maxWaitTimeInSeconds` can be changed by setting
      // it in the `options` passed to `subscribe()`.
      if (!events.length) {
        return;
      }
      for (const event of events) {
        console.log(
          `Received event: '${event.body}' from partition: '${context.partitionId}' and consumer group: '${context.consumerGroup}'`
        );
      }
      // Clear the downtimeTracker since we received an event.
      downtimeTracker.clear();
    },
    processError: async (err, context) => {
      console.log(`Error on partition "${context.partitionId}": ${err}`);
      if (
        err.name === "MessagingError" &&
        (err as MessagingError).retryable &&
        downtimeTracker.isDown()
      ) {
        await consumerClient.close().catch(() => {
          /* ignoring errors while closing the consumer client */
        });
        // Recreate the subscription
        startSubscription();
      }
    }
  };
}

/**
 * Creates an EventHubConsumerClient and starts a subscription.
 */
function startSubscription(): Subscription {
  const consumerClient = new EventHubConsumerClient(consumerGroup, connectionString, eventHubName);

  const subscriptionHandlers = createSubscriptionHandler(consumerClient);
  return consumerClient.subscribe(subscriptionHandlers, {
    startPosition: earliestEventPosition
  });
}

export async function main() {
  console.log(`Running downtimeRecovery sample`);

  startSubscription();
}

main().catch((error) => {
  console.error("Error running sample:", error);
});
