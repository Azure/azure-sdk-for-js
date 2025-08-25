// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  EventHubProducerClient,
  EventHubConsumerClient,
  earliestEventPosition,
} from "@azure/event-hubs";
import { DefaultAzureCredential } from "@azure/identity";
// @ts-ignore
import { ContainerClient } from "@azure/storage-blob";
// @ts-ignore
import { BlobCheckpointStore } from "@azure/eventhubs-checkpointstore-blob";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_ConnectionString", async () => {
    // @ts-ignore
    const producerClient = new EventHubProducerClient("my-connection-string", "my-event-hub");
    // @ts-ignore
    const consumerClient = new EventHubConsumerClient(
      "my-consumer-group",
      "my-connection-string",
      "my-event-hub",
    );
  });

  it("ReadmeSampleCreateClient_ConnectionStringWithEntityPath", async () => {
    // @ts-ignore
    const producerClient = new EventHubProducerClient("my-connection-string-with-entity-path");
    // @ts-ignore
    const consumerClient = new EventHubConsumerClient(
      "my-consumer-group",
      "my-connection-string-with-entity-path",
    );
  });

  it("ReadmeSampleCreateClient_TokenCredential", async () => {
    const credential = new DefaultAzureCredential();
    // @ts-ignore
    const producerClient = new EventHubProducerClient("my-host-name", "my-event-hub", credential);
    // @ts-ignore
    const consumerClient = new EventHubConsumerClient(
      "my-consumer-group",
      "my-host-name",
      "my-event-hub",
      credential,
    );
  });

  it("ReadmeSampleInspectEventHub", async () => {
    const client = new EventHubProducerClient("connectionString", "eventHubName");
    // @ts-preserve-whitespace
    // @ts-ignore
    const partitionIds = await client.getPartitionIds();
    // @ts-preserve-whitespace
    await client.close();
  });

  it("ReadmeSamplePublishEvents", async () => {
    const producerClient = new EventHubProducerClient("connectionString", "eventHubName");
    // @ts-preserve-whitespace
    const eventDataBatch = await producerClient.createBatch();
    let numberOfEventsToSend = 10;
    // @ts-preserve-whitespace
    while (numberOfEventsToSend > 0) {
      const wasAdded = eventDataBatch.tryAdd({ body: "my-event-body" });
      if (!wasAdded) {
        break;
      }
      numberOfEventsToSend--;
    }
    // @ts-preserve-whitespace
    await producerClient.sendBatch(eventDataBatch);
    await producerClient.close();
  });

  it("ReadmeSampleConsumeEvents", async () => {
    const client = new EventHubConsumerClient(
      "my-consumer-group",
      "connectionString",
      "eventHubName",
    );
    // @ts-preserve-whitespace
    // In this sample, we use the position of earliest available event to start from
    // Other common options to configure would be `maxBatchSize` and `maxWaitTimeInSeconds`
    const subscriptionOptions = {
      startPosition: earliestEventPosition,
    };
    // @ts-preserve-whitespace
    const subscription = client.subscribe(
      {
        // @ts-ignore
        processEvents: async (events, context) => {
          // event processing code goes here
        },
        // @ts-ignore
        processError: async (err, context) => {
          // error reporting/handling code here
        },
      },
      subscriptionOptions,
    );
    // @ts-preserve-whitespace
    // Wait for a few seconds to receive events before closing
    setTimeout(async () => {
      await subscription.close();
      await client.close();
      console.log(`Exiting sample`);
    }, 3 * 1000);
  });

  it("ReadmeSampleConsumeEventsLoadBalancing", async () => {
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
    console.log(`Exiting sample`);
  });

  it("ReadmeSampleConsumeEventsFromPartition", async () => {
    const client = new EventHubConsumerClient(
      "my-consumer-group",
      "connectionString",
      "eventHubName",
    );
    const partitionIds = await client.getPartitionIds();
    // @ts-preserve-whitespace
    // In this sample, we use the position of earliest available event to start from
    // Other common options to configure would be `maxBatchSize` and `maxWaitTimeInSeconds`
    const subscriptionOptions = {
      startPosition: earliestEventPosition,
    };
    // @ts-preserve-whitespace
    const subscription = client.subscribe(
      partitionIds[0],
      {
        // @ts-ignore
        processEvents: async (events, context) => {
          // event processing code goes here
        },
        // @ts-ignore
        processError: async (err, context) => {
          // error reporting/handling code here
        },
      },
      subscriptionOptions,
    );
    // @ts-preserve-whitespace
    // Wait for a few seconds to receive events before closing
    setTimeout(async () => {
      await subscription.close();
      await client.close();
      console.log(`Exiting sample`);
    }, 3 * 1000);
  });

  it("ReadmeSampleConsumeEventsFromIotHub", async () => {
    const client = new EventHubConsumerClient(
      "my-consumer-group",
      "Endpoint=sb://my-iothub-namespace-[uid].servicebus.windows.net/;SharedAccessKeyName=my-SA-name;SharedAccessKey=my-SA-key;EntityPath=my-iot-hub-name",
    );
    // @ts-preserve-whitespace
    await client.getEventHubProperties();
    // @ts-preserve-whitespace
    // retrieve partitionIds from client.getEventHubProperties() or client.getPartitionIds()
    const partitionId = "0";
    await client.getPartitionProperties(partitionId);
    // @ts-preserve-whitespace
    await client.close();
  });

  it("EventHubConsumerClient_Subscribe", async () => {
    const client = new EventHubConsumerClient(
      "my-consumer-group",
      "connectionString",
      "eventHubName",
    );
    // @ts-preserve-whitespace
    // @ts-ignore
    const subscription = client.subscribe(
      {
        // @ts-ignore
        processEvents: async (events, context) => {
          console.log("Received event count: ", events.length);
        },
        // @ts-ignore
        processError: async (err, context) => {
          console.log("Error: ", err);
        },
      },
      { startPosition: earliestEventPosition },
    );
  });

  it("EventHubConsumerClient_SubscribeSinglePartition", async () => {
    const client = new EventHubConsumerClient(
      "my-consumer-group",
      "connectionString",
      "eventHubName",
    );
    // @ts-preserve-whitespace
    const partitionIds = await client.getPartitionIds();
    // @ts-preserve-whitespace
    // @ts-ignore
    const subscription = client.subscribe(
      partitionIds[0],
      {
        // @ts-ignore
        processEvents: async (events, context) => {
          console.log("Received event count: ", events.length);
        },
        // @ts-ignore
        processError: async (err, context) => {
          console.log("Error: ", err);
        },
      },
      { startPosition: earliestEventPosition },
    );
  });

  it("EventHubProducerClient_CreateBatch", async () => {
    const client = new EventHubProducerClient("my-connection-string", "my-event-hub");
    // @ts-preserve-whitespace
    const messages = [
      { body: "my-event-body1" },
      { body: "my-event-body2" },
      { body: "my-event-body3" },
      { body: "my-event-body4" },
      { body: "my-event-body5" },
    ];
    // @ts-preserve-whitespace
    let batch = await client.createBatch();
    for (let i = 0; i < messages.length; i++) {
      if (!batch.tryAdd(messages[i])) {
        await client.sendBatch(batch);
        batch = await client.createBatch();
        if (!batch.tryAdd(messages[i])) {
          throw new Error("Message too big to fit");
        }
        if (i === messages.length - 1) {
          await client.sendBatch(batch);
        }
      }
    }
  });

  it("EventHubProducerClient_SendBatch", async () => {
    const client = new EventHubProducerClient("my-connection-string", "my-event-hub");
    // @ts-preserve-whitespace
    const messages = [
      { body: "my-event-body1" },
      { body: "my-event-body2" },
      { body: "my-event-body3" },
      { body: "my-event-body4" },
      { body: "my-event-body5" },
    ];
    // @ts-preserve-whitespace
    await client.sendBatch(messages);
  });

  it("EventHubProducerClient_SendBatchPartitioned", async () => {
    const client = new EventHubProducerClient("my-connection-string", "my-event-hub");
    // @ts-preserve-whitespace
    const messages = [
      { body: "my-event-body1" },
      { body: "my-event-body2" },
      { body: "my-event-body3" },
      { body: "my-event-body4" },
      { body: "my-event-body5" },
    ];
    // @ts-preserve-whitespace
    let batch = await client.createBatch();
    for (let i = 0; i < messages.length; i++) {
      if (!batch.tryAdd(messages[i])) {
        await client.sendBatch(batch);
        batch = await client.createBatch();
        if (!batch.tryAdd(messages[i])) {
          throw new Error("Message too big to fit");
        }
        if (i === messages.length - 1) {
          await client.sendBatch(batch);
        }
      }
    }
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
