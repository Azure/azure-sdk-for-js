import {
  EventHubClient,
  EventData,
  EventPosition,
  delay,
  EventProcessor,
  PartitionContext
} from "@azure/event-hubs";

class SimplePartitionProcessor {
  private _context: PartitionContext;
  constructor(context: PartitionContext) {
    this._context = context;
  }
  async processEvents(events: EventData[]) {
    for (const event of events) {
      console.log(
        "Received event: '%s' from partition: '%s'",
        event.body,
        this._context.partitionId
      );
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
    return new SimplePartitionProcessor(context);
  };

  const processor = new EventProcessor(
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
  await processor.start();
  // after 2 seconds, stop processing
  await delay(2000);

  await processor.stop();
  await client.close();
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
