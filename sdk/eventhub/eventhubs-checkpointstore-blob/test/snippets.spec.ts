// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { env } from "process";
import * as dotenv from "dotenv";

// if you modify these imports update the imports in the snippet below as well
// (JS compatible there)
import { EventHubConsumerClient } from "@azure/event-hubs";
import { ContainerClient } from "@azure/storage-blob";
import { BlobCheckpointStore } from "../src";

describe.skip("Snippets", () => {
  // used in the eventhubs and eventhubs-checkpointstore-blob readme.
  it("snippet", async () => {
    dotenv.config();

    // if you modify these variables change the variable declarations in the commented
    // section below.
    const storageAccountConnectionString = env["STORAGE_CONNECTION_STRING"]!;
    const containerName = env["EVENTHUB_NAME"]!;
    const eventHubConnectionString = env["EVENTHUB_CONNECTION_STRING"]!;
    const consumerGroup = env["CONSUMER_GROUP_NAME"]!;
    const eventHubName = env["EVENTHUB_NAME"]!;

    // snippet begins here

    // const { EventHubConsumerClient } = require("@azure/event-hubs");
    // const { ContainerClient } = require("@azure/storage-blob");
    // const { BlobCheckpointStore } = require("@azure/eventhubs-checkpointstore-blob");
    //
    // const storageAccountConnectionString = "storage-account-connection-string";
    // const containerName = "container-name";
    // const eventHubConnectionString = "eventhub-connection-string";
    // const consumerGroup = "my-consumer-group";
    // const eventHubName = "eventHubName";

    async function main(): Promise<void> {
      const blobContainerClient = new ContainerClient(
        storageAccountConnectionString,
        containerName
      );

      if (!(await blobContainerClient.exists())) {
        await blobContainerClient.create();
      }

      const checkpointStore = new BlobCheckpointStore(blobContainerClient);
      const consumerClient = new EventHubConsumerClient(
        consumerGroup,
        eventHubConnectionString,
        eventHubName,
        checkpointStore
      );

      const subscription = consumerClient.subscribe({
        processEvents: async (events, context) => {
          // event processing code goes here
          if (events.length === 0) {
            // If the wait time expires (configured via options in maxWaitTimeInSeconds) Event Hubs
            // will pass you an empty array.
            return;
          }

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

      // Wait for a few seconds to receive events before closing
      await new Promise((resolve) => setTimeout(resolve, 10 * 1000));

      await subscription.close();
      await consumerClient.close();
      console.log(`Exiting sample`);
    }

    await main();
    // snippet ends here: (remove the `await` above when publishing as a snippet)
  });
});
