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
  EventHubConsumerClient,
  ReceivedEventData,
  delay,
  CloseReason,
  PartitionContext,
  PartitionCheckpointer,
  InMemoryPartitionManager
} from "@azure/event-hubs";

// A Sample event processor that keeps track of the number of events processed.
class SampleEventProcessor {
  private _messageCount = 0;

  async processEvents(events: ReceivedEventData[], partitionContext: PartitionContext, checkpointer: PartitionCheckpointer) {
    // events can be empty if no events were recevied in the last 60 seconds.
    // This interval can be configured when creating the EventProcessor
    if (events.length === 0) {
      return;
    }

    for (const event of events) {
      console.log(
        `Received event: '${event.body}' from partition: '${partitionContext.partitionId}' and consumer group: '${partitionContext.consumerGroupName}'`
      );
      this._messageCount++;
    }

    // checkpoint using the last event in the batch
    const lastEvent = events[events.length - 1];
    await checkpointer.updateCheckpoint(lastEvent).catch((err) => {
      console.log(`Error when checkpointing on partition ${partitionContext.partitionId}: `, err);
    });
    console.log(
      `Successfully checkpointed event with sequence number: ${lastEvent.sequenceNumber} from partition: ${partitionContext.partitionId}'`
    );
  }

  async processError(error: Error, partitionContext: PartitionContext) {
    console.log(
      `Encountered an error: ${error.message} when processing partition ${partitionContext.partitionId}`
    );
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
  const client = new EventHubConsumerClient(connectionString, eventHubName);
  const processor = new SampleEventProcessor();

  const partitionManager = new InMemoryPartitionManager();

  const subscription = await client.subscribe(
    EventHubConsumerClient.defaultConsumerGroupName,
    (events, context, checkpointer) => processor.processEvents(events, context, checkpointer),
    partitionManager,
    {
      onInitialize: async (context) => { processor.initialize(context) },
      onClose: async (closeReason, context) => { processor.close(closeReason, context) },
      onError: async (error, context) => processor.processError(error, context),
      maxBatchSize: 10,
      maxWaitTimeInSeconds: 20
    }
  );

  // after 50 seconds, stop processing
  await delay(50000);

  await subscription.close();
  await client.close();
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
