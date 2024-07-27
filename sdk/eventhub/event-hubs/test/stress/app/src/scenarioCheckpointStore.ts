// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { EventHubConsumerClient } from "@azure/event-hubs";
import { ContainerClient } from "@azure/storage-blob";
import { BlobCheckpointStore } from "@azure/eventhubs-checkpointstore-blob";
import { delay } from "@azure/core-util";
import { EventHubsStressTester, defaultClientAppInsights } from "./eventHubsStressTester";
import parsedArgs from "minimist";
import { createEventHubsProducerClient } from "./utils";

interface scenarioCheckpointStoreOptions {
  testDurationInMs?: number;
}

function sanitizeOptions(args: string[]): Required<scenarioCheckpointStoreOptions> {
  const options = parsedArgs<scenarioCheckpointStoreOptions>(args);
  return {
    testDurationInMs: options.testDurationInMs || 2 * 24 * 60 * 60 * 1000, // Default = 2 days
  };
}

// https://github.com/Azure/azure-sdk-for-js/issues/25572
async function scenarioCheckpointStore() {
  const testOptions = sanitizeOptions(process.argv);
  const { testDurationInMs } = testOptions;

  const startedAt = new Date();
  const producer = createEventHubsProducerClient();
  const stressBase = new EventHubsStressTester({
    testName: "checkpointStore-memLeak",
  });
  let terminalCase = false;
  const storageAccountConnectionString = process.env.AZURE_STORAGE_CONNNECTION_STRING;
  const containerName = `container-${Math.floor(Math.random() * 1000)}`;
  const connectionString = process.env.EVENTHUBS_CONNECTION_STRING;
  const eventHubName = process.env.EVENTHUB_NAME;

  const blobContainerClient = new ContainerClient(
    storageAccountConnectionString || "",
    containerName,
  );
  if (!(await blobContainerClient.exists())) {
    await blobContainerClient.create();
  }

  const checkpointStore = new BlobCheckpointStore(blobContainerClient);
  const consumerClient = new EventHubConsumerClient(
    EventHubConsumerClient.defaultConsumerGroupName,
    connectionString || "",
    eventHubName || "",
    checkpointStore,
  );
  const subscription = consumerClient.subscribe({
    processEvents: async (events, context) => {
      // event processing code goes here
      if (events.length === 0) return;
      stressBase.eventsReceivedCount += events.length;
      defaultClientAppInsights.trackMetric({
        name: "eventsReceived",
        value: events.length,
        contextObjects: context,
        time: new Date(),
      });
      await context.updateCheckpoint(events[events.length - 1]);
    },
    processError: async (err) => {
      console.log(`Error : ${JSON.stringify(err)}`);
      stressBase._numErrors += 1;
      defaultClientAppInsights.trackException({ exception: err, time: new Date() });
      terminalCase = true;
    },
    processInitialize: async (context) => {
      defaultClientAppInsights.trackEvent({
        name: "processInitialize",
        contextObjects: context,
        time: new Date(),
      });
    },
    processClose: async (reason, context) => {
      defaultClientAppInsights.trackEvent({
        name: "processClose",
        contextObjects: { reason: reason, context: context },
        time: new Date(),
      });
    },
  });

  while (new Date().valueOf() - startedAt.valueOf() < testDurationInMs && !terminalCase) {
    const eventBatch = new Array(Math.floor(Math.random() * 100)).fill({
      body: Buffer.alloc(32, Math.floor(Math.random() * 100)),
    }); // varying sizes 0-100
    await producer.sendBatch(eventBatch);
    stressBase.eventsSentCount += eventBatch.length;

    await delay(20000 + Math.floor(Math.random() * 1000)); // around every 20s

    if (!subscription.isRunning) {
      terminalCase = true;
      defaultClientAppInsights.trackEvent({ name: "subscriberClosed", time: new Date() });
      break;
    }
  }

  await producer.close();
  await consumerClient.close();
  await stressBase.endTest();
}

scenarioCheckpointStore().catch((err) => {
  console.log("Error occurred: ", err);
  defaultClientAppInsights.trackException({ exception: err, time: new Date() });
});
