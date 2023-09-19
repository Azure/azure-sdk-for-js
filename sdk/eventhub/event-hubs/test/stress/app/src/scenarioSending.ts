//sample code to file git hub issue with microsoft

import { OnSendEventsErrorContext } from "@azure/event-hubs";
import { EventHubsStressTester, defaultClientAppInsights } from "./eventHubsStressTester";
import { createEventHubsBufferedProducerClient, generateHeapSnapshot } from "./utils";
import parsedArgs from "minimist";
import { delay } from "@azure/core-util";

////test messages generation
let messages = [];
let batchSize = 58;
for (let i = 0; i < batchSize; i++) {
  let tempObj = {
    Body: '{"metrics":{"metricsName":"system.memory","values":[{"time":"2023-02-14T21:05:12Z","value":52.0},{"time":"2023-02-14T21:05:17Z","value":52.0},{"time":"2023-02-14T21:05:22Z","value":52.0},{"time":"2023-02-14T21:05:27Z","value":52.0},{"time":"2023-02-14T21:05:32Z","value":52.0},{"time":"2023-02-14T21:05:37Z","value":52.0}]}}',
    properties: {
      Event_Metric: "dummy",
      "creation-time-utc": new Date().toISOString(),
      source: "DEVICE_METRIC_EVENTS",
    },
    systemProperties: { "message-id": "ediL039FrrKtImMl" },
  };
  messages.push(tempObj);
}

let batchMessage = {
  properties: {
    batch: "true",
    batchSize: batchSize,
    "iothub-creation-time-utc": new Date().toISOString(),
  },
  body: messages,
};
///////////////////////////
const eventHubPartitionCount = 2;

//buffered producer client
const producerClient = createEventHubsBufferedProducerClient({
  maxEventBufferLengthPerPartition: 20,
  maxWaitTimeInMs: 1000,
  onSendEventsErrorHandler: (error: OnSendEventsErrorContext) => {
    defaultClientAppInsights.trackException({ exception: error.error, time: new Date() });
  },
});

interface scenarioCheckpointStoreOptions {
  testDurationInMs?: number;
}

function sanitizeOptions(args: string[]): Required<scenarioCheckpointStoreOptions> {
  const options = parsedArgs<scenarioCheckpointStoreOptions>(args);
  return {
    testDurationInMs: options.testDurationInMs || 10 * 24 * 60 * 60 * 1000, // Default = 2 days
  };
}

async function main() {
  const testOptions = sanitizeOptions(process.argv);
  const { testDurationInMs } = testOptions;

  const stressBase = new EventHubsStressTester({
    testName: "checkpointStore-memLeak",
    writeSnapshotInfoToConsole: false,
  });
  const startedAt = new Date();
  for (let i = 0; i < 100; i++) {
    await delay(100);
    try {
      await producerClient.enqueueEvent({
        body: batchMessage,
        properties: {
          deviceId: `${i % eventHubPartitionCount}_d_${i}`,
          operationTimestamp: new Date().toISOString(),
          "iothub-message-schema": "twinChangeEvents",
          opType: "updateTwin",
        },
      });
      stressBase.eventsSentCount += batchMessage.body.length;
      console.log(
        `Enqueued ${batchMessage.body.length} events. Total events sent: ${stressBase.eventsSentCount}`
      );
    } catch (error) {
      // defaultClientAppInsights.trackException({ exception: { name: (error as { message: string }).message || "EnqueueFailureAtTest", message: (error as { message: string }).message || `Enqueue Event failed at eventsSentCount: ${stressBase.eventsSentCount}` }, time: new Date() });
      console.log(
        `Enqueue Event failed at eventsSentCount: ${stressBase.eventsSentCount} with error: ${error}`
      );
    }
  }

  generateHeapSnapshot("check-memLeak-0", process.env.DEBUG_SHARE);
  console.log("Sending done. Waiting for test to complete...");
  let hundredSecondsCounter = 0;
  while (new Date().valueOf() - startedAt.valueOf() < testDurationInMs) {
    console.log("Waiting for 100 seconds...");
    await delay(100000);
    hundredSecondsCounter++;
    if (hundredSecondsCounter % 36 === 0) {
      hundredSecondsCounter++
      generateHeapSnapshot("check-memLeak-" + (hundredSecondsCounter / 36), process.env.DEBUG_SHARE);
    }
  }
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
