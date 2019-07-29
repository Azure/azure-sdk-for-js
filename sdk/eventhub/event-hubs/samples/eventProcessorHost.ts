import {
  EventHubClient,
  EventData,
  EventPosition,
  delay,
  EventProcessor,
  PartitionContext
} from "../src";

class TestEventProcessor {
  constructor(partitionId: string) {}

  async processEvents(events: EventData[]) {
    for (const event of events) {
      console.log("Receive", event.body);
    }
    // try {
    //   // checkpoint using the last event in the batch
    //      await checkpointContext.checkpoint(events[events.length - 1]);
    // } catch (err) {
    //   console.error(`Encountered an error while checkpointing on: ${err.message}`);
    // }
  }

  async processError(error: Error) {
    console.log(`Encountered an error: ${error.message}`);
  }

  async initialize() {
    console.log(`Started processing`);
  }

  async close() {
    console.log(`Stopped processing`);
  }
}

async function main() {
  const client = new EventHubClient("connectionString", "eventHubName");

  const eventProcessorFactory = (context: PartitionContext) => {
    return new TestEventProcessor(context.partitionId);
  };

  const eph = new EventProcessor(
    "$Default",
    client,
    eventProcessorFactory,
    "partitionManager" as any,
    {
      initialEventPosition: EventPosition.earliest(),
      maxBatchSize: 10,
      maxWaitTime: 20
    }
  );
  await eph.start();
  // after 10 seconds, stop processing
  await delay(10000);

  await eph.stop();
  await client.close();
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
