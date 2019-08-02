import {
  EventHubClient,
  ReceivedEventData,
  EventPosition,
  delay,
  EventProcessor,
  PartitionContext,
  InMemoryPartitionManager,
  CheckpointManager
} from "@azure/event-hubs";

class SimplePartitionProcessor {
  private _context: PartitionContext;
  private _checkpointManager: CheckpointManager;
  constructor(context: PartitionContext, checkpointManager: CheckpointManager) {
    this._context = context;
    this._checkpointManager = checkpointManager;
  }
  async processEvents(events: ReceivedEventData[]) {
    if(events.length === 0){
      return;
    }
    for (const event of events) {
      console.log(
        "Received event: '%s' from partition: '%s' and consumer group: '%s'",
        event.body,
        this._context.partitionId,
        this._context.consumerGroupName
      );
      try {
        // checkpoint using the last event in the batch
        await this._checkpointManager.updateCheckpoint(events[events.length - 1]);
        console.log(
          "Successfully checkpointed event: '%s' from partition: '%s'",
          events[events.length - 1].body,
          this._context.partitionId
        );
      } catch (err) {
        console.log(
          `Encountered an error while checkpointing on ${this._context.partitionId}: ${err.message}`
        );
      }
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

  const eventProcessorFactory = (context: PartitionContext, checkpoint: CheckpointManager) => {
    return new SimplePartitionProcessor(context, checkpoint);
  };

  const processor = new EventProcessor(
    EventHubClient.defaultConsumerGroupName,
    client,
    eventProcessorFactory,
    new InMemoryPartitionManager(),
    {
      initialEventPosition: EventPosition.earliest(),
      maxBatchSize: 10,
      maxWaitTimeInSeconds: 20
    }
  );
  await processor.start();
  // after 5 seconds, stop processing
  await delay(5000);

  await processor.stop();
  await client.close();
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
