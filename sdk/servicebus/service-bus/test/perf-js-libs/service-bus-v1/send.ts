/*
# Overview
Measures the maximum throughput of `sender.send()` in package `@azure/service-bus`.

# Instructions
1. Create a Service Bus namespace with `Tier=Premium` and `Messaging Units=4`.  It is recommended to use the largest possible namespace to allow maximum client throughput.
2. Create a queue inside the namespace.
3. Set env vars `SERVICEBUS_CONNECTION_STRING` and `SERVICE_BUS_QUEUE_NAME`.
4. `ts-node send.ts [maxInflightMessages] [totalMessages]`
5. Example: `ts-node send.ts 1000 1000000`
 */

import { ServiceBusClient, Sender } from "@azure/service-bus";
import moment from "moment";
// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const _payload = Buffer.alloc(1024);
const _start = moment();

let _messages = 0;

async function main(): Promise<void> {
  // Endpoint=sb://<your-namespace>.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=<shared-access-key>
  const connectionString = process.env.SERVICEBUS_CONNECTION_STRING as string;
  const entityPath = process.env.SERVICEBUS_QUEUE_NAME as string;

  const maxInflight = process.argv.length > 2 ? parseInt(process.argv[2]) : 1;
  const messages = process.argv.length > 3 ? parseInt(process.argv[3]) : 10;
  log(`Maximum inflight messages: ${maxInflight}`);
  log(`Total messages: ${messages}`);

  const writeResultsPromise = WriteResults(messages);

  await RunTest(connectionString, entityPath, maxInflight, messages);

  await writeResultsPromise;
}

async function RunTest(
  connectionString: string,
  entityPath: string,
  maxInflight: number,
  messages: number
): Promise<void> {
  const ns = ServiceBusClient.createFromConnectionString(connectionString);

  const client = ns.createQueueClient(entityPath);
  const sender = client.createSender();

  const promises: Promise<void>[] = [];

  for (let i = 0; i < maxInflight; i++) {
    const promise = ExecuteSendsAsync(sender, messages);
    promises[i] = promise;
  }

  await Promise.all(promises);

  await client.close();
  await ns.close();
}

async function ExecuteSendsAsync(sender: Sender, messages: number): Promise<void> {
  while (_messages <= messages) {
    await sender.send({ body: _payload });
    _messages++;
  }
}

async function WriteResults(messages: number): Promise<void> {
  let lastMessages = 0;
  let lastElapsed = 0;
  let maxMessages = 0;
  let maxElapsed = Number.MAX_SAFE_INTEGER;

  do {
    await delay(1000);

    const sentMessages = _messages;
    const currentMessages = sentMessages - lastMessages;
    lastMessages = sentMessages;

    const elapsed = moment().diff(_start);
    const currentElapsed = elapsed - lastElapsed;
    lastElapsed = elapsed;

    if (currentMessages / currentElapsed > maxMessages / maxElapsed) {
      maxMessages = currentMessages;
      maxElapsed = currentElapsed;
    }

    WriteResult(sentMessages, elapsed, currentMessages, currentElapsed, maxMessages, maxElapsed);
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
