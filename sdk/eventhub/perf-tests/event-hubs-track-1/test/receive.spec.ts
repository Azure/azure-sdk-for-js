/*
# Overview
Measures the maximum throughput of `receiver.receive()` in package `@azure/event-hubs`.

# Instructions
1. Create an Event Hubs namespace with `Tier=Standard` and `Throughput Units=20`.
2. Create an Event Hub inside the namespace.
3. Set env vars `EVENTHUB_CONNECTION_STRING`, `EVENTHUB_NAME` and `CONSUMER_GROUP_NAME` in the .env file.
4. This test presumes that there are no messages in the event hub.
5. `ts-node receive.ts [eventBodySize] [numberOfEvents]`
6. Example: `ts-node receive.ts 1024 1000000`
 */

import { EventHubClient, EventPosition, EventData } from "@azure/event-hubs";
import { getEnvVar } from "@azure/test-utils-perfstress";
import moment from "moment";
import { delay } from "@azure/core-amqp";

import { config } from "dotenv";
config();

const _start = moment();

let _messages = 0;

const connectionString = getEnvVar("EVENTHUB_CONNECTION_STRING");
const eventHubName = getEnvVar("EVENTHUB_NAME");
const consumerGroup = getEnvVar("CONSUMER_GROUP_NAME");

async function main(): Promise<void> {
  const eventBodySize = process.argv.length > 2 ? parseInt(process.argv[2]) : 1024;
  const numberOfEvents = process.argv.length > 3 ? parseInt(process.argv[3]) : 500;

  const client = EventHubClient.createFromConnectionString(connectionString, eventHubName);
  const partitionIds = await client.getPartitionIds();
  await client.close();

  log(`Total messages: ${numberOfEvents}`);

  await sendBatch(numberOfEvents, partitionIds, eventBodySize);
  const writeResultsPromise = WriteResults(numberOfEvents);

  await RunTest(connectionString, eventHubName, numberOfEvents, partitionIds);
  await writeResultsPromise;
}

async function sendBatch(numberOfEvents: number, partitionIds: string[], eventBodySize: number) {
  const _payload = Buffer.alloc(eventBodySize);
  const producer = EventHubClient.createFromConnectionString(connectionString, eventHubName);
  const numberOfPartitions = partitionIds.length;
  const numberOfEventsPerPartition = Math.ceil(numberOfEvents / numberOfPartitions);

  for (let partitionId of partitionIds) {
    let numberOfEventsSent = 0;
    while (numberOfEventsSent <= numberOfEventsPerPartition) {
      await producer.send({ body: _payload }, partitionId);
      numberOfEventsSent++;
    }
  }
  await producer.close();
}

async function RunTest(
  connectionString: string,
  eventHubName: string,
  messages: number,
  partitionIds: string[]
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

  for (let partitionId of partitionIds) {
    consumerClient.receive(partitionId, onMessageHandler, onErrorHandler, {
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
