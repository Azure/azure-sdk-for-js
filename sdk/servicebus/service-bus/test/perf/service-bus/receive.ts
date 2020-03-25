/*
# Overview
Measures the maximum throughput of `receiver.receive()` in package `@azure/service-bus`.

# Instructions
1. Create a Service Bus namespace with `Tier=Premium` and `Messaging Units=4`.  It is recommended to use the largest possible namespace to allow maximum client throughput.
2. Create a queue inside the namespace.
3. Set env vars `SERVICE_BUS_CONNECTION_STRING` and `SERVICE_BUS_QUEUE_NAME`.
4. This test presumes that there are messages in the queue.
4. `ts-node receive.ts [totalMessages]`
5. Example: `ts-node receive.ts 1000000`
 */

import { ReceiveMode, OnError, OnMessage } from "../../../src";
import { ServiceBusClient } from "../../../src/old/serviceBusClient";
import delay from "delay";
import moment from "moment";

const _start = moment();

let _messages = 0;

async function main(): Promise<void> {
  // Endpoint=sb://<your-namespace>.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=<shared-access-key>
  const connectionString = process.env.SERVICE_BUS_CONNECTION_STRING as string;
  const entityPath = process.env.SERVICE_BUS_QUEUE_NAME as string;

  const maxConcurrentCalls = process.argv.length > 2 ? parseInt(process.argv[2]) : 10;
  const messages = process.argv.length > 3 ? parseInt(process.argv[3]) : 100;
  log(`Maximum Concurrent Calls: ${maxConcurrentCalls}`);
  log(`Total messages: ${messages}`);

  const writeResultsPromise = WriteResults(messages);

  await RunTest(connectionString, entityPath, maxConcurrentCalls, messages);
  await writeResultsPromise;
}

async function RunTest(
  connectionString: string,
  entityPath: string,
  maxConcurrentCalls: number,
  messages: number
): Promise<void> {
  const ns = new ServiceBusClient(connectionString);

  const client = ns.createQueueClient(entityPath);
  const receiver = client.createReceiver(ReceiveMode.receiveAndDelete);

  const onMessageHandler: OnMessage = async () => {
    _messages++;
    if (_messages === messages) {
      await receiver.close();
      await client.close();
      await ns.close();
    }
  };
  const onErrorHandler: OnError = async (err) => {
    console.log("Error occurred: ", err);
  };

  receiver.registerMessageHandler(onMessageHandler, onErrorHandler, {
    autoComplete: false,
    maxConcurrentCalls: maxConcurrentCalls
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
