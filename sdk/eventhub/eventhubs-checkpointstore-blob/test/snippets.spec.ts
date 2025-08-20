// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventHubConsumerClient } from "@azure/event-hubs";
import { BlobCheckpointStore } from "@azure/eventhubs-checkpointstore-blob";
import { setLogLevel } from "@azure/logger";
import { ContainerClient } from "@azure/storage-blob";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateCheckpointStore", async () => {
    const containerClient = new ContainerClient("storage-connection-string", "container-name");
    // @ts-preserve-whitespace
    if (!containerClient.exists()) {
      await containerClient.create(); // This can be skipped if the container already exists
    }
    // @ts-preserve-whitespace
    const checkpointStore = new BlobCheckpointStore(containerClient);
  });

  it("ReadmeSampleCheckpointEvents", async () => {
    const storageAccountConnectionString = "storage-account-connection-string";
    const containerName = "container-name";
    const eventHubConnectionString = "eventhub-connection-string";
    const consumerGroup = "my-consumer-group";
    const eventHubName = "eventHubName";
    // @ts-preserve-whitespace
    const blobContainerClient = new ContainerClient(storageAccountConnectionString, containerName);
    // @ts-preserve-whitespace
    if (!(await blobContainerClient.exists())) {
      await blobContainerClient.create();
    }
    // @ts-preserve-whitespace
    const checkpointStore = new BlobCheckpointStore(blobContainerClient);
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
