// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createEventHubsConsumerClient, createEventHubsProducerClient } from "./utils";
import parsedArgs from "minimist";
import { delay } from "@azure/core-amqp";
import { EventHubsStressTester, defaultClientAppInsights } from "./eventHubsStressTester";

interface scenarioGetRuntimePropertiesOptions {
  testDurationInMs?: number;
}

function sanitizeOptions(args: string[]): Required<scenarioGetRuntimePropertiesOptions> {
  const options = parsedArgs<scenarioGetRuntimePropertiesOptions>(args);
  return {
    testDurationInMs: options.testDurationInMs || 2 * 24 * 60 * 60 * 1000, // Default = 2 days
  };
}

async function scenarioGetRuntimeProperties() {
  const testOptions = sanitizeOptions(process.argv);
  const { testDurationInMs } = testOptions;
  const startedAt = new Date();

  const producer = createEventHubsProducerClient();
  const stressBase = new EventHubsStressTester({
    testName: "GetRuntimeProperties-memLeak",
    snapshotIntervalInMs: 1000,
    writeSnapshotInfoToConsole: true,
  });

  const consumerClient = createEventHubsConsumerClient();
  const func = async () => {
    while (new Date().valueOf() - startedAt.valueOf() < testDurationInMs) {
      await delay(Math.random() * 100);
      await consumerClient.getEventHubProperties();
    }
  };
  await Promise.all([].concat(...new Array(100).fill([func()])));
  await producer.close();
  await consumerClient.close();
  await stressBase.endTest();
}

scenarioGetRuntimeProperties().catch((err) => {
  console.log("Error occurred: ", err);
  defaultClientAppInsights.trackException({ exception: err, time: new Date() });
});
