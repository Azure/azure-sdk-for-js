// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { EventHubConsumerClient, earliestEventPosition } from "@azure/event-hubs";
import { delay } from "@azure/core-util";
import { EventHubsStressTester } from "./eventHubsStressTester";
import parsedArgs from "minimist";
import { createEventHubsProducerClient } from "./utils";

interface scenario27253TestOptions {
  testDurationInMs?: number;
}

function sanitizeOptions(args: string[]): Required<scenario27253TestOptions> {
  const options = parsedArgs<scenario27253TestOptions>(args);
  return {
    testDurationInMs: options.testDurationInMs || 10 * 24 * 60 * 60 * 1000, // Default = 10 days
  };
}

// https://github.com/Azure/azure-sdk-for-js/issues/25572
async function scenario27253Test() {
  const testOptions = sanitizeOptions(process.argv);
  const { testDurationInMs } = testOptions;
  const connectionString = process.env.EVENTHUBS_CONNECTION_STRING;
  const eventHubName = process.env.EVENTHUB_NAME;
  const stressBase = new EventHubsStressTester({
    testName: "issue-27253",
  });
  const consumerClient = new EventHubConsumerClient(
    EventHubConsumerClient.defaultConsumerGroupName,
    connectionString || "",
    eventHubName || "", { loadBalancingOptions: { strategy: "greedy" } }
  );
  await sendEvents();
  const startedAt = new Date();
  let terminalCase = false;

  const partitions = await consumerClient.getPartitionIds();
  const subscriptions = [];
  for (const partition in partitions) {
    subscriptions.push(consumerClient.subscribe(partition, {
      processEvents: async (events) => {
        // event processing code goes here
        if (events.length === 0) return;
        await delay(1000 + Math.floor(Math.random() * 2000)); // around 1-3s
        stressBase.eventsReceivedCount += events.length;
      },
      processError: async (err) => {
        console.log(`Error : ${JSON.stringify(err)}`);
        stressBase._numErrors += 1;
        terminalCase = true;
      }
    }, { maxWaitTimeInSeconds: 0.5, maxBatchSize: 100, startPosition: earliestEventPosition }))
  }

  while (new Date().valueOf() - startedAt.valueOf() < testDurationInMs && !terminalCase) {
    await delay(20000 + Math.floor(Math.random() * 1000)); // around every 20s
    console.log(`waited 20 seconds, events received so far = ${stressBase.eventsReceivedCount}`);
  }
  await consumerClient.close();
  await stressBase.endTest();
}

async function sendEvents() {
  const producer = createEventHubsProducerClient();
  const partitions = await producer.getPartitionIds();

  for (const partition in partitions) {
    const eventsToAdd = 100000 + Math.floor(Math.random() * 10000);
    let eventsAdded = 0;
    // add events to our batch
    while (eventsAdded < eventsToAdd) {
      const batch = await producer.createBatch({ partitionId: partition });
      while (
        batch.tryAdd({
          body: Buffer.alloc(
            500 + Math.floor(Math.random() * 100),
            Math.floor(Math.random() * 100)
          ),
        }) &&
        eventsAdded + batch.count <= eventsToAdd
      );
      await producer.sendBatch(batch);
      eventsAdded = eventsAdded + batch.count;
      console.log(`Added ${batch.count} events to partition ${partition}, total ${eventsAdded}`);
    }
  }

  await producer.close();
}

scenario27253Test().catch((err) => {
  console.log("Error occurred: ", err);
});
