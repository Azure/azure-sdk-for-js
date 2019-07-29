import {
  EventHubClient,
  EventData,
  EventPosition,
  delay,
  EventProcessor,
  PartitionContext
} from "@azure/event-hubs";

class EventProcessorHost {
  async processEvents(events: EventData[]) {
    for (const event of events) {
      console.log("Received event", event.body);
    }
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

// Define connection string and related Event Hubs entity name here
const connectionString = "";
const eventHubName = "";

async function main() {
  const client = new EventHubClient(connectionString, eventHubName);

  const eventProcessorFactory = (context: PartitionContext) => {
    return new EventProcessorHost();
  };

  const eph = new EventProcessor(
    EventHubClient.defaultConsumerGroupName,
    client,
    eventProcessorFactory,
    "partitionManager" as any,
    {
      initialEventPosition: EventPosition.earliest(),
      maxBatchSize: 10,
      maxWaitTimeInSeconds: 20
    }
  );
  await eph.start();
  // after 2 seconds, stop processing
  await delay(2000);

  await eph.stop();
  await client.close();
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
