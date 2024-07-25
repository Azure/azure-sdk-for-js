// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  EventHubConsumerClient,
  earliestEventPosition,
} from "@azure/event-hubs";
import { WebSocketWrapper } from "./wsWrapper";

const connectionString =
  process.env.EXPO_PUBLIC_EVENTHUB_CONNECTION_STRING || "<connection string>";
const eventHubName = process.env.EXPO_PUBLIC_EVENTHUB_NAME || "<hub name>";
const consumerGroup = process.env.EXPO_PUBLIC_CONSUMER_GROUP_NAME || "$Default";

export async function main() {
  console.log(`Running receiveEvents sample`);

  const consumerClient = new EventHubConsumerClient(
    consumerGroup,
    connectionString,
    eventHubName,
    {
      webSocketOptions: {
        webSocket: WebSocketWrapper,
      },
    }
  );

  const subscription = consumerClient.subscribe(
    {
      processEvents: async (events, context) => {
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

  console.log(`Receiving for 10 seconds then stopping...`);
  // Wait for a bit before cleaning up the sample
  setTimeout(async () => {
    await subscription.close();
    await consumerClient.close();
    console.log(`Exiting receiveEvents sample`);
  }, 10 * 1000);
}
