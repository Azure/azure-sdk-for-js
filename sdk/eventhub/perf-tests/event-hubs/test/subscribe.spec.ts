// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  earliestEventPosition,
  EventHubConsumerClient,
  EventHubProducerClient,
  MessagingError,
  PartitionContext,
  ReceivedEventData,
} from "@azure/event-hubs";
import { PerfOptionDictionary, EventPerfTest, getEnvVar } from "@azure/test-utils-perf";

interface ReceiverOptions {
  "number-of-events": number;
  "event-size-in-bytes": number;
  partitions: number;
  "max-batch-size": number;
}

const connectionString = getEnvVar("EVENTHUB_CONNECTION_STRING");
const eventHubName = getEnvVar("EVENTHUB_NAME");
const consumerGroup = getEnvVar("CONSUMER_GROUP_NAME");

const consumer = new EventHubConsumerClient(consumerGroup, connectionString, eventHubName);

export class SubscribeTest extends EventPerfTest<ReceiverOptions> {
  receiver: EventHubConsumerClient;
  subscriber: { close: () => Promise<void> } | undefined;

  options: PerfOptionDictionary<ReceiverOptions> = {
    "number-of-events": {
      required: true,
      description: "Total number of events to send",
      shortName: "events",
      longName: "events",
      defaultValue: 10000,
    },
    "event-size-in-bytes": {
      required: true,
      description: "Size of each event in bytes",
      shortName: "size",
      longName: "size-in-bytes",
      defaultValue: 2000,
    },
    partitions: {
      required: true,
      description: "number of partitions to publish, -1 publishes to all partitions",
      shortName: "p",
      longName: "partitions",
      defaultValue: 10,
    },
    "max-batch-size": {
      required: true,
      description: "The number of events to request per batch",
      shortName: "max-count",
      longName: "max-batch-size",
      defaultValue: 100,
    },
  };

  constructor() {
    super();
    this.receiver = consumer;
  }

  /**
   * Sends the messages to be received later.
   */
  async globalSetup(): Promise<void> {
    const {
      "number-of-events": { value: numberOfEvents },
      "event-size-in-bytes": { value: eventSize },
    } = this.parsedOptions;

    await sendBatch(numberOfEvents, eventSize, this.parsedOptions["partitions"].value);
  }

  setup() {
    this.subscriber = this.receiver.subscribe(
      {
        processEvents: async (events: ReceivedEventData[], _context: PartitionContext) => {
          for (const _event of events) {
            this.eventRaised();
          }
        },
        processError: async (error: Error | MessagingError, _context: PartitionContext) => {
          this.errorRaised(error);
        },
      },
      {
        maxBatchSize: this.parsedOptions["max-batch-size"].value,
        startPosition: earliestEventPosition,
      }
    );
  }

  async cleanup() {
    await this.subscriber?.close();
    await this.receiver.close();
  }

  async globalCleanup(): Promise<void> {
    await consumer.close();
  }
}

async function sendBatch(
  numberOfEvents: number,
  eventBodySize: number,
  partitions: number
): Promise<void> {
  const _payload = Buffer.alloc(eventBodySize);
  const producer = new EventHubProducerClient(connectionString, eventHubName);
  let partitionIds = await producer.getPartitionIds();
  const numberOfPartitions =
    partitionIds.length < partitions || partitions === -1 ? partitionIds.length : partitions;
  partitionIds = partitionIds.slice(0, numberOfPartitions);
  const numberOfEventsPerPartition = Math.ceil(numberOfEvents / numberOfPartitions);

  for (const partitionId of partitionIds) {
    const batch = await producer.createBatch({ partitionId });
    let numberOfEventsSent = 0;
    // add events to our batch
    while (numberOfEventsSent < numberOfEventsPerPartition) {
      while (
        batch.tryAdd({ body: _payload }) &&
        numberOfEventsSent + batch.count <= numberOfEventsPerPartition
      );
      await producer.sendBatch(batch);
      numberOfEventsSent = numberOfEventsSent + batch.count;
    }
  }

  await producer.close();
}
