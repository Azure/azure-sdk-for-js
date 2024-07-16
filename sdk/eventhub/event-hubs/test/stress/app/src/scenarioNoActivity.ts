// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { delay } from "@azure/core-util";
import { EventHubsStressTester, defaultClientAppInsights } from "./eventHubsStressTester.js";
import parsedArgs from "minimist";
import { Subscription } from "@azure/event-hubs";
import { createEventHubsConsumerClient, createEventHubsProducerClient } from "./utils.js";

interface ScenarioNoActivityOptions {
  testDurationInMs?: number;
  maxBatchSize?: number;
}

function sanitizeOptions(args: string[]): Required<ScenarioNoActivityOptions> {
  const options = parsedArgs<ScenarioNoActivityOptions>(args);
  return {
    testDurationInMs: options.testDurationInMs || 2 * 24 * 60 * 60 * 1000, // Default = 2 days
    maxBatchSize: options.maxBatchSize || 100,
  };
}

// https://github.com/Azure/azure-sdk-for-js/issues/22899
export async function scenarioNoActivity() {
  const testOptions = sanitizeOptions(process.argv);
  const { testDurationInMs, maxBatchSize } = testOptions;

  const consumerClient = createEventHubsConsumerClient();
  const producer = createEventHubsProducerClient();
  let terminalCase = false;
  const startedAt = new Date();

  const stressBase = new EventHubsStressTester({
    testName: "noActivity",
    snapshotIntervalInMs: 500,
    writeSnapshotInfoToConsole: true,
  });
  const partitionIds = await consumerClient.getPartitionIds();
  console.log(`partitionIds ===============> ${partitionIds}`);
  let subscribers: Record<string, Subscription> = {};
  for (let partitionId of partitionIds) {
    console.log(`subscribe to partitionId : ${partitionId}`);
    subscribers[partitionId] = consumerClient.subscribe(
      partitionId,
      {
        processEvents: async (events, context) => {
          stressBase.eventsReceivedCount += events.length;
          defaultClientAppInsights.trackMetric({
            name: "eventsReceived",
            value: events.length,
            contextObjects: context,
            time: new Date(),
          });
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
      },
      {
        maxBatchSize,
        maxWaitTimeInSeconds: 0.1,
        startPosition: { enqueuedOn: Date.now(), isInclusive: true },
      },
    );
  }
  await producer.sendBatch([{ body: "abcd" }, { body: "abcd2" }]);
  stressBase.eventsSentCount += 2;

  // another version of the test to update event-hub prop to make the event-hub force detach and attach
  while (new Date().valueOf() - startedAt.valueOf() < testDurationInMs && !terminalCase) {
    await delay(Math.max(5000, testDurationInMs / 1000));
    for (const id in subscribers) {
      if (!subscribers[id].isRunning) {
        terminalCase = true;
        defaultClientAppInsights.trackEvent({
          name: "subscriberClosed",
          contextObjects: { partitionId: id },
          time: new Date(),
        });
        break;
      }
    }
  }
  await producer.close();
  await consumerClient.close();
  await stressBase.endTest();
}

scenarioNoActivity().catch((err) => {
  console.log("Error occurred: ", err);
});
