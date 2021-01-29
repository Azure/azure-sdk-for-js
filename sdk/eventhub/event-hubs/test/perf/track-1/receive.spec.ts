/*
# Overview
Measures the maximum throughput of `receiver.receive()` in package `@azure/service-bus`.

# Instructions
1. Create an Event Hubs namespace with `Tier=Standard` and `Throughput Units=20`.  It is recommended to use the largest possible namespace to allow maximum client throughput.
2. Create an Event Hub inside the namespace.
3. Set env vars `EVENT_HUBS_CONNECTION_STRING` and `EVENT_HUB_NAME`.
4. This test presumes that there are messages in the event hub.
5. `ts-node receive.ts [totalMessages]`
6. Example: `ts-node receive.ts 1000000`
 */

import { EventHubClient, EventPosition, EventData } from "@azure/event-hubs";
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
  const maxBatchSize = process.argv.length > 2 ? parseInt(process.argv[2]) : 10;
  const numberOfPartitions = process.argv.length > 3 ? parseInt(process.argv[3]) : 1;
  const eventBodySize = process.argv.length > 4 ? parseInt(process.argv[4]) : 1024;
  const numberOfEvents = process.argv.length > 5 ? parseInt(process.argv[5]) : 10000;

  log(`Maximum Batch Size: ${maxBatchSize}`);
  log(`Total messages: ${numberOfEvents}`);

  await sendBatch(numberOfEvents, numberOfPartitions, eventBodySize);
  const writeResultsPromise = WriteResults(numberOfEvents);

  await RunTest(connectionString, eventHubName, maxBatchSize, numberOfEvents);
  await writeResultsPromise;
}

async function sendBatch(
  numberOfEvents: number,
  numberOfPartitions: number,
  eventBodySize: number
) {
  const _payload = Buffer.alloc(eventBodySize);
  const producer = EventHubClient.createFromConnectionString(connectionString, eventHubName);
  const numberOfEventsPerPartition = Math.ceil(numberOfEvents / numberOfPartitions);

  for (let partition = 0; partition < numberOfPartitions; partition++) {
    let numberOfEventsSent = 0;
    while (numberOfEventsSent <= numberOfEventsPerPartition) {
      await producer.send({ body: _payload }, String(partition));
      numberOfEventsSent++;
    }
  }
  await producer.close();
}

async function RunTest(
  connectionString: string,
  eventHubName: string,
  messages: number,
  numberOfPartitions: number
): Promise<void> {
  const consumerClient = EventHubClient.createFromConnectionString(connectionString, eventHubName);

  const onMessageHandler = async (_: EventData) => {
    _messages++;
    if (_messages === messages) {
      await consumerClient.close();
    }
  };
  const onErrorHandler = async (err: Error) => {
    console.log(`Error on partition : ${err}`);
  };

  for (let partition = 0; partition < numberOfPartitions; partition++) {
    consumerClient.receive(String(partition), onMessageHandler, onErrorHandler, {
      eventPosition: EventPosition.fromStart(),
      consumerGroup
    });
  }
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
