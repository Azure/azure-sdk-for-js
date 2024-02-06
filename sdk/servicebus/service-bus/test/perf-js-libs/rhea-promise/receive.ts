/*
# Overview
Measures the maximum throughput of `receiver.receive()` in package `rhea-promise`.

# Instructions
1. Create a Service Bus namespace with `Tier=Premium` and `Messaging Units=4`.  It is recommended to use the largest possible namespace to allow maximum client throughput.
2. Create a queue inside the namespace.
3. Set env vars `SERVICEBUS_CONNECTION_STRING` and `SERVICE_BUS_QUEUE_NAME`.
4. This test presumes that there are messages in the queue.
5. `ts-node receive.ts [maxConcurrentCalls] [totalMessages]`
6. Example: `ts-node receive.ts 1000 1000000`
7. If "maxConcurrentCalls <= 0", then receive credits are automatically managed which seems to improve throughput (both maximum rate and consistency).
 */

import {
  Connection,
  ConnectionOptions,
  ReceiverEvents,
  ReceiverOptionsWithSession,
} from "rhea-promise";
import moment from "moment";

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const _start = moment();

let _messages = 0;
let _credit = -1;

async function main(): Promise<void> {
  // Endpoint=sb://<your-namespace>.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=<shared-access-key>
  const connectionString = process.env.SERVICEBUS_CONNECTION_STRING as string;
  const entityPath = process.env.SERVICE_BUS_QUEUE_NAME as string;
  const allowUnauthorized = process.env.SERVICE_BUS_ALLOW_UNAUTHORIZED ? true : false;

  // <your-namespace>.servicebus.windows.net
  const host = connectionString.match(/\/\/([^\/]*)\//)![1];

  // SharedAccessKeyName (usually  "RootManageSharedAccessKey")
  const username = connectionString.match(/SharedAccessKeyName=(.*);/)![1];

  // SharedAccessKey
  const password = connectionString.match(/SharedAccessKey=(.*)/)![1];

  const maxConcurrentCalls = process.argv.length > 2 ? parseInt(process.argv[2]) : 10;
  const messages = process.argv.length > 3 ? parseInt(process.argv[3]) : 100;
  log(`Maximum Concurrent Calls: ${maxConcurrentCalls}`);
  log(`Total messages: ${messages}`);

  const writeResultsPromise = WriteResults(messages);

  await RunTest(
    host,
    username,
    password,
    allowUnauthorized,
    entityPath,
    maxConcurrentCalls,
    messages
  );

  await writeResultsPromise;
}

async function RunTest(
  host: string,
  username: string,
  password: string,
  allowUnauthorized: boolean,
  entityPath: string,
  maxConcurrentCalls: number,
  messages: number
): Promise<void> {
  const port = 5671;

  const connection = new Connection({
    transport: "tls",
    host: host,
    hostname: host,
    username: username,
    password: password,
    port: port,
    reconnect: false,
    rejectUnauthorized: !allowUnauthorized,
  } as ConnectionOptions);
  await connection.open();

  let receiverOptions: ReceiverOptionsWithSession = {
    name: "receiver-1",
    source: {
      address: entityPath,
    },
  };

  const manuallyManageCredit = maxConcurrentCalls > 0;
  if (manuallyManageCredit) {
    receiverOptions.credit_window = 0;
  }

  const receiver = await connection.createReceiver(receiverOptions);

  if (manuallyManageCredit) {
    receiver.addCredit(maxConcurrentCalls);
  }

  receiver.on(ReceiverEvents.message, async () => {
    // console.log("Received message: %O", context.message.body);
    _messages++;

    _credit = receiver.credit;

    if (_messages === messages) {
      await receiver.close();
      await connection.close();
    } else if (manuallyManageCredit) {
      receiver.addCredit(1);
    }
  });
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
      maxElapsed,
      _credit
    );
  } while (_messages < messages);
}

function WriteResult(
  totalMessages: number,
  totalElapsed: number,
  currentMessages: number,
  currentElapsed: number,
  maxMessages: number,
  maxElapsed: number,
  credit: number
): void {
  log(
    `\tTot Msg\t${totalMessages}` +
      `\tCur MPS\t${Math.round((currentMessages * 1000) / currentElapsed)}` +
      `\tAvg MPS\t${Math.round((totalMessages * 1000) / totalElapsed)}` +
      `\tMax MPS\t${Math.round((maxMessages * 1000) / maxElapsed)}` +
      `\tCredit\t${credit}`
  );
}

function log(message: string): void {
  console.log(`[${moment().format("hh:mm:ss.SSS")}] ${message}`);
}

main().catch((err) => {
  log(`Error occurred: ${err}`);
});
