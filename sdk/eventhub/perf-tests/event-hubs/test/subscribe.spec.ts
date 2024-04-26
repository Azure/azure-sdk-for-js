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
import { PerfOptionDictionary, EventPerfTest, getEnvVar } from "@azure-tools/test-perf";

interface ReceiverOptions {
  "number-of-events": number;
  "event-size-in-bytes": number;
  partitions: number;
  "max-batch-size": number;
  /**
   * Logs more information related to the batch size, such as median, max, average, etc
   * Useful when relevant code is updated
   * Introduced when prefetch feature was added to Event Hubs
   */
  "log-median-batch-size": boolean;
}

const connectionString = getEnvVar("EVENTHUB_CONNECTION_STRING");
const eventHubName = getEnvVar("EVENTHUB_NAME");
const consumerGroup = process.env.CONSUMER_GROUP_NAME || "$Default";

const consumer = new EventHubConsumerClient(consumerGroup, connectionString, eventHubName);

export class SubscribeTest extends EventPerfTest<ReceiverOptions> {
  receiver: EventHubConsumerClient;
  subscriber: { close: () => Promise<void> } | undefined;
  callbackCallsCount = 0;
  messagesPerBatch: Array<number> = [];

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
      longName: "event-size",
      defaultValue: 1024,
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
    "log-median-batch-size": {
      required: false,
      description:
        "Logs more information related to the batch size, such as median, max, average, etc",
      defaultValue: false,
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
          if (this.parsedOptions["log-median-batch-size"].value) {
            this.callbackCallsCount++;
            this.messagesPerBatch.push(events.length);
          }
        },
        processError: async (error: Error | MessagingError, _context: PartitionContext) => {
          this.errorRaised(error);
        },
      },
      {
        maxBatchSize: this.parsedOptions["max-batch-size"].value,
        startPosition: earliestEventPosition,
      },
    );
  }

  async cleanup() {
    await this.subscriber?.close();
    await this.receiver.close();
  }

  async globalCleanup(): Promise<void> {
    await consumer.close();
    // The following might just be noise if we don't think there are related changes to the code
    if (this.parsedOptions["log-median-batch-size"].value) {
      console.log(
        `\tBatch count: ${this.callbackCallsCount}, Batch count per sec: ${
          this.callbackCallsCount / this.parsedOptions.duration.value
        }`,
      );
      console.log(`\tmessagesPerBatch: ${this.messagesPerBatch}`);
      console.log(
        `\tmessagesPerBatch... median: ${median(this.messagesPerBatch)}, avg: ${
          this.messagesPerBatch.reduce((a, b) => a + b, 0) / this.messagesPerBatch.length
        }, max: ${Math.max(...this.messagesPerBatch)}, min: ${Math.min(...this.messagesPerBatch)}`,
      );
    }
  }
}

async function sendBatch(
  numberOfEvents: number,
  eventBodySize: number,
  partitions: number,
): Promise<void> {
  const _payload = Buffer.alloc(eventBodySize);
  const producer = new EventHubProducerClient(connectionString, eventHubName);
  let partitionIds = await producer.getPartitionIds();
  const numberOfPartitions =
    partitionIds.length < partitions || partitions === -1 ? partitionIds.length : partitions;
  partitionIds = partitionIds.slice(0, numberOfPartitions);

  let totalEvents = 0;
  for (const partition in partitionIds) {
    const { lastEnqueuedSequenceNumber, beginningSequenceNumber } =
      await producer.getPartitionProperties(partition);
    totalEvents += lastEnqueuedSequenceNumber - beginningSequenceNumber;
  }

  if (totalEvents >= numberOfEvents) return;

  const eventsToAdd = numberOfEvents - totalEvents;
  const batch = await producer.createBatch();
  let numberOfEventsSent = 0;
  // add events to our batch
  while (numberOfEventsSent < eventsToAdd) {
    while (batch.tryAdd({ body: _payload }) && numberOfEventsSent + batch.count <= eventsToAdd);
    await producer.sendBatch(batch);
    numberOfEventsSent = numberOfEventsSent + batch.count;
  }

  await producer.close();
}

function median(values: number[]) {
  if (values.length === 0) throw new Error("No inputs while calculating median");

  values.sort(function (a, b) {
    return a - b;
  });

  const half = Math.floor(values.length / 2);

  if (values.length % 2) return values[half];

  return (values[half - 1] + values[half]) / 2.0;
}
