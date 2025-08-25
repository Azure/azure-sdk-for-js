// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TableClient } from "@azure/data-tables";
import { TableCheckpointStore } from "@azure/eventhubs-checkpointstore-table";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";
import { EventHubConsumerClient } from "@azure/event-hubs";

describe("snippets", () => {
  it("CreateCheckpointStore", async () => {
    const tableClient = new TableClient("storage-connection-string", "table-name");
    // @ts-preserve-whitespace
    if (!tableClient.exists()) {
      await tableClient.create(); // This can be skipped if the table already exists
    }
    // @ts-preserve-whitespace
    const checkpointStore = new TableCheckpointStore(tableClient);
  });

  it("CheckpointEvents", async () => {
    const storageAccountConnectionString = "storage-account-connection-string";
    const tableName = "table-name";
    const eventHubConnectionString = "eventhub-connection-string";
    const consumerGroup = "my-consumer-group";
    const eventHubName = "eventHubName";
    // @ts-preserve-whitespace
    const tableClient = new TableClient(storageAccountConnectionString, tableName);
    // @ts-preserve-whitespace
    if (!(await tableClient.exists())) {
      await tableClient.create();
    }
    // @ts-preserve-whitespace
    const checkpointStore = new TableCheckpointStore(tableClient);
    const consumerClient = new EventHubConsumerClient(
      consumerGroup,
      eventHubConnectionString,
      eventHubName,
      checkpointStore,
    );
    // @ts-preserve-whitespace
    const subscription = consumerClient.subscribe({
      processEvents: async (events, context) => {
        // event processing code goes here
        if (events.length === 0) {
          // If the wait time expires (configured via options in maxWaitTimeInSeconds) Event Hubs
          // will pass you an empty array.
          return;
        }
        // @ts-preserve-whitespace
        // Checkpointing will allow your service to pick up from
        // where it left off when restarting.
        //
        // You'll want to balance how often you checkpoint with the
        // performance of your underlying checkpoint store.
        await context.updateCheckpoint(events[events.length - 1]);
      },
      processError: async (err, context) => {
        // handle any errors that occur during the course of
        // this subscription
        console.log(`Errors in subscription to partition ${context.partitionId}: ${err}`);
      },
    });
    // @ts-preserve-whitespace
    // Wait for a few seconds to receive events before closing
    await new Promise((resolve) => setTimeout(resolve, 10 * 1000));
    // @ts-preserve-whitespace
    await subscription.close();
    await consumerClient.close();
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
