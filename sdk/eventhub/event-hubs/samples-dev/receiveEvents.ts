// Copyright (c) Microsoft Corporation.
// Licensed under the MIT Licence.

/**
 * @summary Demonstrates how to use the EventHubConsumerClient to process events from all partitions of a consumer group in an Event Hub.
 *
 * @azsdk-weight 50
 */

import { EventHubConsumerClient, earliestEventPosition } from "@azure/event-hubs";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

const connectionString = process.env["EVENTHUB_CONNECTION_STRING"] || "";
const eventHubName = process.env["EVENTHUB_NAME"] || "";
const consumerGroup = process.env["CONSUMER_GROUP_NAME"] || "";

export async function main() {
  console.log(`Running receiveEvents sample`);

  const consumerClient = new EventHubConsumerClient(consumerGroup, connectionString, eventHubName);

  const subscription = consumerClient.subscribe(
    {
      // The callback where you add your code to process incoming events
      processEvents: async (events, context) => {
        // Note: It is possible for `events` to be an empty array.
        // This can happen if there were no new events to receive
        // in the `maxWaitTimeInSeconds`, which is defaulted to
        // 60 seconds.
        // The `maxWaitTimeInSeconds` can be changed by setting
        // it in the `options` passed to `subscribe()`.
        for (const event of events) {
          console.log(
            `Received event: '${event.body}' from partition: '${context.partitionId}' and consumer group: '${context.consumerGroup}'`
          );
        }
      },
      processError: async (err, context) => {
        console.log(`Error on partition "${context.partitionId}": ${err}`);
      },
    },
    { startPosition: earliestEventPosition }
  );

  // Wait for a bit before cleaning up the sample
  setTimeout(async () => {
    await subscription.close();
    await consumerClient.close();
    console.log(`Exiting receiveEvents sample`);
  }, 30 * 1000);
}

main().catch((error) => {
  console.error("Error running sample:", error);
});
