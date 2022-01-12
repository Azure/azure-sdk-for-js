/*
# Overview
Measures the maximum throughput of `receiver.receive()` in package `azure-sb`.

# Instructions
1. Create a Service Bus namespace with `Tier=Premium` and `Messaging Units=4`.  It is recommended to use the largest possible namespace to allow maximum client throughput.
2. Create a queue inside the namespace.
3. Set env vars `SERVICEBUS_CONNECTION_STRING` and `SERVICE_BUS_QUEUE_NAME`.
4. This test presumes that there are messages in the queue.
5. `ts-node receive.ts [totalMessages]`
6. Example: `ts-node receive.ts 1000000`
 */

import { createServiceBusService, ServiceBusService } from "azure-sb";
import moment from "moment";

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const _start = moment();

let _messages = 0;

async function main(): Promise<void> {
  // Endpoint=sb://<your-namespace>.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=<shared-access-key>
  const connectionString = process.env.SERVICEBUS_CONNECTION_STRING as string;
  const entityPath = process.env.SERVICE_BUS_QUEUE_NAME as string;

  const maxConcurrentCalls = process.argv.length > 2 ? parseInt(process.argv[2]) : 10;
  const messages = process.argv.length > 3 ? parseInt(process.argv[3]) : 100;
  log(`Maximum Concurrent Calls: ${maxConcurrentCalls}`);
  log(`Total messages: ${messages}`);

  const writeResultsPromise = WriteResults(messages);

  RunTest(connectionString, entityPath, maxConcurrentCalls, messages);

  await writeResultsPromise;
}

function RunTest(
  connectionString: string,
  entityPath: string,
  maxConcurrentCalls: number,
  messages: number
): void {
  const sbService: ServiceBusService = createServiceBusService(connectionString);
  let credits = maxConcurrentCalls;
  function receiveMessages(): void {
    while (_messages < messages && credits > 0) {
      credits--;
      sbService.receiveQueueMessage(entityPath, { isPeekLock: false }, function (err) {
        if (err) {
          console.log(err.message);
        } else {
          if (_messages !== messages) {
            credits++;
            _messages++;
            receiveMessages();
          }
        }
      });
    }
  }
  receiveMessages();
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
  log(
    `\tTot Msg\t${totalMessages}` +
      `\tCur MPS\t${Math.round((currentMessages * 1000) / currentElapsed)}` +
      `\tAvg MPS\t${Math.round((totalMessages * 1000) / totalElapsed)}` +
      `\tMax MPS\t${Math.round((maxMessages * 1000) / maxElapsed)}`
  );
}

function log(message: string): void {
  console.log(`[${moment().format("hh:mm:ss.SSS")}] ${message}`);
}

main().catch((err) => {
  log(`Error occurred: ${err}`);
});
