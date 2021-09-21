/*
# Overview
Measures the maximum throughput of `receiver.receive()` in package `@azure/service-bus`.

# Instructions
1. Create a Service Bus namespace with `Tier=Premium` and `Messaging Units=4`.  It is recommended to use the largest possible namespace to allow maximum client throughput.
2. Create a queue inside the namespace.
3. Set env vars `SERVICE_BUS_CONNECTION_STRING` and `SERVICE_BUS_QUEUE_NAME`.
4. This test presumes that there are messages in the queue.
5. `ts-node receive.ts [maxMsgCount] [totalMessages] [isReceiveAndDelete]`
6. Example: `ts-node receive.ts 10 1000000 false`
 */

import { ReceiveMode, ServiceBusClient } from "@azure/service-bus";
import moment from "moment";
// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const _start = moment();

let _messages = 0;

async function main(): Promise<void> {
  // Endpoint=sb://<your-namespace>.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=<shared-access-key>
  const connectionString = process.env.SERVICEBUS_CONNECTION_STRING as string;
  const entityPath = process.env.SERVICEBUS_QUEUE_NAME as string;

  const maxMsgCount = process.argv.length > 2 ? parseInt(process.argv[2]) : 10;
  const messages = process.argv.length > 3 ? parseInt(process.argv[3]) : 100;
  const isReceiveAndDelete = process.argv.length > 4 ? !(process.argv[4] === "false") : true;
  log(`Maximum Concurrent Calls: ${maxMsgCount}`);
  log(`Total messages: ${messages}`);
  log(`isReceiveAndDelete: ${isReceiveAndDelete}`);

  const writeResultsPromise = WriteResults(messages);

  await RunTest(connectionString, entityPath, maxMsgCount, messages, isReceiveAndDelete);
  await writeResultsPromise;
}

async function RunTest(
  connectionString: string,
  entityPath: string,
  maxMsgCount: number,
  messages: number,
  isReceiveAndDelete: boolean
): Promise<void> {
  const ns = ServiceBusClient.createFromConnectionString(connectionString);

  const client = ns.createQueueClient(entityPath);
  const receiver = client.createReceiver(
    isReceiveAndDelete ? ReceiveMode.receiveAndDelete : ReceiveMode.peekLock
  );

  while (_messages < messages) {
    const msgs = await receiver.receiveMessages(maxMsgCount, 10000);
    _messages += msgs.length;
    if (!isReceiveAndDelete) {
      for (const msg of msgs) {
        await msg.complete();
      }
    }
  }

  await ns.close();
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
