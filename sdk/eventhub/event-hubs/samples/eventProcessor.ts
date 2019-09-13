/*
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the MIT Licence.

  This sample demonstrates how to use the EventProcessor to process events from all partitions
  of a consumer group in an Event Hubs instance. It also demonstrates the process of checkpointing an event
  which helps new instances of Event Processors that may have spun up for scaling or for crash recovery.

  If your Event Hub instance doesn't have any events, then please run "sendEvents.ts" sample
  to populate it before running this sample.

  Note: If you are using version 2.1.0 or lower of @azure/event-hubs library, then please use the samples at
  https://github.com/Azure/azure-sdk-for-js/tree/%40azure/event-hubs_2.1.0/sdk/eventhub/event-hubs/samples instead.
*/

import {
  EventHubClient,
  ReceivedEventData,
  delay,
  EventProcessor,
  InMemoryPartitionManager,
  PartitionProcessor,
  CloseReason
} from "@azure/event-hubs";

// A Sample Partition Processor that keeps track of the number of events processed.
class SamplePartitionProcessor extends PartitionProcessor {
  private _messageCount = 0;

  async processEvents(events: ReceivedEventData[]) {
    // events can be empty if no events were recevied in the last 60 seconds.
    // This interval can be configured when creating the EventProcessor
    if (events.length === 0) {
      return;
    }

    for (const event of events) {
      console.log(
        `Received event: '${event.body}' from partition: '${this.partitionId}' and consumer group: '${this.consumerGroupName}'`
      );
      this._messageCount++;
    }

    // checkpoint using the last event in the batch
    const lastEvent = events[events.length - 1];
    await this.updateCheckpoint(lastEvent).catch((err) => {
      console.log(`Error when checkpointing on partition ${this.partitionId}: `, err);
    });
    console.log(
      `Successfully checkpointed event with sequence number: ${lastEvent.sequenceNumber} from partition: ${this.partitionId}'`
    );
  }

  async processError(error: Error) {
    console.log(
      `Encountered an error: ${error.message} when processing partition ${this.partitionId}`
    );
  }

  async initialize() {
    console.log(`Started processing partition: ${this.partitionId}`);
  }

  async close(reason: CloseReason) {
    console.log(`Stopped processing for reason ${reason}`);
    console.log(`Processed ${this._messageCount} from partition ${this.partitionId}.`);
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
  processor.start();
  // after 5 seconds, stop processing
  await delay(50000);

  await processor.stop();
  await client.close();
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
