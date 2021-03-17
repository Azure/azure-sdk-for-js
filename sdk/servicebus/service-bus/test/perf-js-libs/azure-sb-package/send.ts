/*
# Overview
Measures the maximum throughput of `sender.send()` in package `azure-sb`.

# Instructions
1. Create a Service Bus namespace with `Tier=Premium` and `Messaging Units=4`.  It is recommended to use the largest possible namespace to allow maximum client throughput.
2. Create a queue inside the namespace.
3. Set env vars `SERVICEBUS_CONNECTION_STRING` and `SERVICE_BUS_QUEUE_NAME`.
4. Run `npm install azure-sb @types/azure-sb` to install `azure-sb` package for this test.
5. `ts-node send.ts [maxInflightMessages] [totalMessages]`
6. Example: `ts-node send.ts 1000 1000000`
 */

import { createServiceBusService, ServiceBusService } from "azure-sb";
import delay from "delay";
import moment from "moment";

const _payload = JSON.stringify(Buffer.alloc(1024));
const _start = moment();

let _sent = 0;
let _accepted = 0;
let _rejected = 0;

async function main(): Promise<void> {
  // Endpoint=sb://<your-namespace>.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=<shared-access-key>
  const connectionString = process.env.SERVICEBUS_CONNECTION_STRING as string;
  const entityPath = process.env.SERVICE_BUS_QUEUE_NAME as string;

  const maxInflight = process.argv.length > 2 ? parseInt(process.argv[2]) : 1;
  const messages = process.argv.length > 3 ? parseInt(process.argv[3]) : 10;
  log(`Maximum inflight messages: ${maxInflight}`);
  log(`Total messages: ${messages}`);

  const writeResultsPromise = WriteResults(messages);

  RunTest(connectionString, entityPath, maxInflight, messages);

  await writeResultsPromise;
}

function RunTest(
  connectionString: string,
  entityPath: string,
  maxInflight: number,
  messages: number
): void {
  const sbService: ServiceBusService = createServiceBusService(connectionString);

  function sendMessages(): void {
    while (_sent < messages && inflight() < maxInflight) {
      _sent++;
      sbService.sendQueueMessage(entityPath, { body: _payload }, function(err: any) {
        if (err) {
          _rejected++;
          console.log(err.message);
        } else {
          _accepted++;
          sendMessages();
        }
      });
    }
  }
  sendMessages();
}

async function WriteResults(messages: number): Promise<void> {
  let lastMessages = 0;
  let lastElapsed = 0;
  let maxMessages = 0;
  let maxElapsed = Number.MAX_SAFE_INTEGER;

  do {
    await delay(1000);

    const acceptedMessages = _accepted;
    const currentMessages = acceptedMessages - lastMessages;
    lastMessages = acceptedMessages;

    const elapsed = moment().diff(_start);
    const currentElapsed = elapsed - lastElapsed;
    lastElapsed = elapsed;

    if (currentMessages / currentElapsed > maxMessages / maxElapsed) {
      maxMessages = currentMessages;
      maxElapsed = currentElapsed;
    }

    WriteResult(
      acceptedMessages,
      elapsed,
      currentMessages,
      currentElapsed,
      maxMessages,
      maxElapsed
    );
  } while (_accepted + _rejected < messages);
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

function inflight(): number {
  return _sent - _accepted;
}

function log(message: string): void {
  console.log(`[${moment().format("hh:mm:ss.SSS")}] ${message}`);
}

main().catch((err) => {
  log(`Error occurred: ${err}`);
});
