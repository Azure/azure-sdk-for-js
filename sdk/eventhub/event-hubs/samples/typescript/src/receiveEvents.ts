// Copyright (c) Microsoft Corporation.
// Licensed under the MIT Licence.

/*
  This sample demonstrates how to use the EventHubConsumerClient to process events from all partitions
  of a consumer group in an Event Hubs instance.

  If your Event Hub instance doesn't have any events, then please run "sendEvents.ts" sample
  to populate it before running this sample.

  For an example that uses checkpointing, see the sample in the eventhubs-checkpointstore-blob package
  on GitHub at the following link:

  https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/eventhub/eventhubs-checkpointstore-blob/samples/typescript/src/receiveEventsUsingCheckpointStore.ts

  Note: If you are using version 2.1.0 or lower of @azure/event-hubs library, then please use the samples at
  https://github.com/Azure/azure-sdk-for-js/tree/%40azure/event-hubs_2.1.0/sdk/eventhub/event-hubs/samples instead.
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
      }
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
