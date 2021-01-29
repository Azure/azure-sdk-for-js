/*
# Overview
Measures the maximum throughput of `receiver.receive()` in package `@azure/service-bus`.

# Instructions
1. Create a Service Bus namespace with `Tier=Premium` and `Messaging Units=4`.  It is recommended to use the largest possible namespace to allow maximum client throughput.
2. Create a queue inside the namespace.
3. Set env vars `SERVICE_BUS_CONNECTION_STRING` and `SERVICE_BUS_QUEUE_NAME`.
4. This test presumes that there are messages in the queue.
5. `ts-node receive.ts [maxConcurrentCalls] [totalMessages] [isReceiveAndDelete]`
6. Example: `ts-node receive.ts 1000 1000000 false`
 */

import {
  EventHubConsumerClient,
  earliestEventPosition,
  EventData,
  PartitionContext,
  EventHubProducerClient
} from "../../../src";
import { getEnvVar } from "@azure/test-utils-perfstress";
import moment from "moment";
import { delay } from "@azure/core-amqp";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

const _start = moment();

let _messages = 0;

const connectionString = getEnvVar("EVENTHUB_CONNECTION_STRING");
const eventHubName = getEnvVar("EVENTHUB_NAME");
const consumerGroup = getEnvVar("CONSUMER_GROUP_NAME");

async function main(): Promise<void> {
  const eventBodySize = process.argv.length > 2 ? parseInt(process.argv[2]) : 1024;
  const numberOfEvents = process.argv.length > 3 ? parseInt(process.argv[3]) : 1000;
  const maxBatchSize = 1; // Defaulting to 1 for a fairer comparison with track 1

  const client = new EventHubProducerClient(connectionString, eventHubName);
  const partitionIds = await client.getPartitionIds();
  await client.close();

  log(`Total messages: ${numberOfEvents}`);

  await sendBatch(numberOfEvents, partitionIds, eventBodySize);
  const writeResultsPromise = WriteResults(numberOfEvents);

  await RunTest(connectionString, eventHubName, maxBatchSize, numberOfEvents);
  await writeResultsPromise;
}

async function sendBatch(numberOfEvents: number, partitionIds: string[], eventBodySize: number) {
  const _payload = Buffer.alloc(eventBodySize);
  const producer = new EventHubProducerClient(connectionString, eventHubName);
  const numberOfPartitions = partitionIds.length;
  const numberOfEventsPerPartition = Math.ceil(numberOfEvents / numberOfPartitions);

  for (let partitionId of partitionIds) {
    let batch = await producer.createBatch({ partitionId });
    let numberOfEventsSent = 0;
    // add events to our batch
    while (numberOfEventsSent <= numberOfEventsPerPartition) {
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

async function RunTest(
  connectionString: string,
  eventHubName: string,
  maxBatchSize: number,
  messages: number
): Promise<void> {
  const consumerClient = new EventHubConsumerClient(consumerGroup, connectionString, eventHubName);

  const processEvents = async (events: EventData[]) => {
    _messages = _messages + events.length;
    for (const _ of events) {
    }
    if (_messages === messages) {
      await consumerClient.close();
    }
  };
  const processError = async (err: Error, context: PartitionContext) => {
    console.log(`Error on partition "${context.partitionId}": ${err}`);
  };

  consumerClient.subscribe(
    {
      processEvents,
      processError
    },
    { maxBatchSize, startPosition: earliestEventPosition }
  );
}

async function WriteResults(messages: number): Promise<void> {
  let lastMessages = 0;
  let lastElapsed = 0;
  let maxMessages = 0;
  let maxElapsed = Number.MAX_SAFE_INTEGER;

  do {
    await delay(1000);

    const receivedMessages = _messages;
    const currentMessages = receivedMessages - lastMessages;
    lastMessages = receivedMessages;

    const elapsed = moment().diff(_start);
    const currentElapsed = elapsed - lastElapsed;
    lastElapsed = elapsed;

    if (currentMessages / currentElapsed > maxMessages / maxElapsed) {
      maxMessages = currentMessages;
      maxElapsed = currentElapsed;
    }

    WriteResult(
      receivedMessages,
      elapsed,
      currentMessages,
      currentElapsed,
      maxMessages,
      maxElapsed
    );
  } while (_messages < messages);
}

function WriteResult(
  totalMessages: number,
  totalElapsed: number,
  currentMessages: number,
  currentElapsed: number,
  maxMessages: number,
  maxElapsed: number
): void {
  const memoryUsage = process.memoryUsage();
  log(
    `\tTot Msg\t${totalMessages}` +
      `\tCur MPS\t${Math.round((currentMessages * 1000) / currentElapsed)}` +
      `\tAvg MPS\t${Math.round((totalMessages * 1000) / totalElapsed)}` +
      `\tMax MPS\t${Math.round((maxMessages * 1000) / maxElapsed)}` +
      `\tRSS\t${memoryUsage.rss}` +
      `\tHeapUsed\t${memoryUsage.heapUsed}`
  );
}

function log(message: string): void {
  console.log(`[${moment().format("hh:mm:ss.SSS")}] ${message}`);
}

main().catch((err) => {
  log(`Error occurred: ${err}`);
});
