import {
  EventHubClient,
  ReceivedEventData,
  delay,
  EventProcessor,
  PartitionContext,
  InMemoryPartitionManager,
  PartitionProcessor,
  CloseReason
} from "@azure/event-hubs";

class SamplePartitionProcessor extends PartitionProcessor {
  private _messageCount = 0;

  async processEvents(events: ReceivedEventData[], partitionContext: PartitionContext) {
    if (events.length === 0) {
      return;
    }
    for (const event of events) {
      console.log(
        `Received event: '${event.body}' from partition: '${partitionContext.partitionId}' and consumer group: '${partitionContext.consumerGroupName}'`,
      );
      this._messageCount++;
    }

    try {
      // checkpoint using the last event in the batch
      await partitionContext.updateCheckpoint(events[events.length - 1]);

      console.log(
        "Successfully checkpointed event: '%s' from partition: '%s'",
        events[events.length - 1].body,
        partitionContext.partitionId
      );
    } catch (err) {
      console.log(
        `Encountered an error while checkpointing on ${partitionContext.partitionId}: ${err.message}`
      );
    }
  }

  async processError(error: Error) {
    console.log(`Encountered an error: ${error.message}`);
  }

  async initialize(partitionContext: PartitionContext) {
    console.log(`Started processing partition: ${partitionContext.partitionId}`);
  }

  async close(reason: CloseReason, partitionContext: PartitionContext) {
    console.log(`Stopped processing for reason ${reason}`);
    console.log(`Processed ${this._messageCount} from partition ${partitionContext.partitionId}.`);
  }
}

// Define connection string and related Event Hubs entity name here
const connectionString = "";
const eventHubName = "";

async function main() {
  const client = new EventHubClient(connectionString, eventHubName);

  const processor = new EventProcessor(
    EventHubClient.defaultConsumerGroupName,
    client,
    SamplePartitionProcessor,
    new InMemoryPartitionManager(),
    {
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
