import { delay } from "@azure/core-util";
import { EventHubsStressTester, createEventHubsConsumerClient, createEventHubsProducerClient } from "./eventHubsStressTester";
import parsedArgs from "minimist";
import { Subscription } from "@azure/event-hubs";

interface ScenarioNoActivityOptions {
  testDurationInMs?: number;
}

function sanitizeOptions(args: string[]): Required<ScenarioNoActivityOptions> {
  const options = parsedArgs<ScenarioNoActivityOptions>(args);
  return {
    testDurationInMs: options.testDurationInMs || //20 * 24 * 60 *
      60 * 1000, // Default = 20 days
  };
}

export async function scenarioNoActivity() {
  const testOptions = sanitizeOptions(process.argv);

  const {
    testDurationInMs
  } = testOptions;

  const consumerClient = createEventHubsConsumerClient()
  const producer = createEventHubsProducerClient();

  const startedAt = new Date();

  const stressBase = new EventHubsStressTester({
    testName: "noActivity"
  });
  await producer.sendBatch([{ body: "abcd" }, { body: "abcd2" }])
  stressBase.eventsSentCount += 2;

  const partitionIds = await consumerClient.getPartitionIds();
  console.log(`partitionIds ===============> ${partitionIds}`);
  const subscribers: Subscription[] = [];
  for (let partitionId of partitionIds) {
    console.log(`subscribe to partitionId : ${partitionId}`);
    subscribers.push(consumerClient.subscribe(
      partitionId,
      {
        processEvents: async (_events, _context) => {
          stressBase.eventsReceivedCount += _events.length;
        },
        processError: async (err) => {
          console.log(`Error : ${JSON.stringify(err)}`);
          stressBase._numErrors += 1
        }
      },
      {
        maxBatchSize: 20,
        maxWaitTimeInSeconds: 0.1,
        startPosition: { enqueuedOn: Date.now(), isInclusive: true }
      }
    ));
  }

  while (new Date().valueOf() - startedAt.valueOf() < testDurationInMs) {
    await delay(Math.max(5000, testDurationInMs / 1000))
    const activeSubscribers = subscribers.reduce((accumulator, object) => {
      return accumulator + (object.isRunning ? 1 : 0);
    }, 0)
    stressBase.eventProperties["subscribers.active"] = activeSubscribers
    stressBase.eventProperties["subscribers.closed"] = subscribers.length - activeSubscribers
  }
  await consumerClient.close()
  await stressBase.endTest()
}

scenarioNoActivity().catch((err) => {
  console.log("Error occurred: ", err);
});
