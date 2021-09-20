/*
# Overview
Measures the maximum throughput of `sender.send()` in package `rhea-promise`.

# Instructions
1. Create a Service Bus namespace with `Tier=Premium` and `Messaging Units=4`.  It is recommended to use the largest possible namespace to allow maximum client throughput.
2. Create a queue inside the namespace.
3. Set env vars `SERVICEBUS_CONNECTION_STRING` and `SERVICE_BUS_QUEUE_NAME`.
4. `ts-node send.ts [maxInflightMessages] [totalMessages]`
5. Example: `ts-node send.ts 1000 1000000`
 */

import { Connection, SenderEvents, ConnectionOptions } from "rhea-promise";
import moment from "moment";

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const _payload = Buffer.alloc(1024);
const _start = moment();

let _sent = 0;
let _accepted = 0;
let _rejected = 0;

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

  const maxInflight = process.argv.length > 2 ? parseInt(process.argv[2]) : 1;
  const messages = process.argv.length > 3 ? parseInt(process.argv[3]) : 10;
  log(`Maximum inflight messages: ${maxInflight}`);
  log(`Total messages: ${messages}`);

  const writeResultsPromise = WriteResults(messages);

  await RunTest(host, username, password, allowUnauthorized, entityPath, maxInflight, messages);

  await writeResultsPromise;
}

async function RunTest(
  host: string,
  username: string,
  password: string,
  allowUnauthorized: boolean,
  entityPath: string,
  maxInflight: number,
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
    rejectUnauthorized: !allowUnauthorized
  } as ConnectionOptions);
  await connection.open();

  const sender = connection.createSender({
    name: "sender-1",
    target: {
      address: entityPath
    }
  });

  function sendMessages(): void {
    while (sender.sendable() && _sent < messages && inflight() < maxInflight) {
      _sent++;
      sender.send({ body: _payload });
    }
  }

  sender.on(SenderEvents.sendable, () => {
    sendMessages();
  });

  sender.on(SenderEvents.accepted, async () => {
    _accepted++;
    if (_accepted + _rejected === messages) {
      await connection.close();
    } else {
      sendMessages();
    }
  });

  sender.on(SenderEvents.rejected, async () => {
    _rejected++;
    if (_accepted + _rejected === messages) {
      await connection.close();
    } else {
      sendMessages();
    }
  });

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

    const inflightMessages = _sent - _accepted - _rejected;

    WriteResult(
      acceptedMessages,
      elapsed,
      currentMessages,
      currentElapsed,
      maxMessages,
      maxElapsed,
      _rejected,
      inflightMessages
    );
  } while (_accepted + _rejected < messages);
}

function WriteResult(
  totalMessages: number,
  totalElapsed: number,
  currentMessages: number,
  currentElapsed: number,
  maxMessages: number,
  maxElapsed: number,
  rejectedMessages: number,
  inflightMessages: number
): void {
  log(
    `\tTot Msg\t${totalMessages}` +
      `\tCur MPS\t${Math.round((currentMessages * 1000) / currentElapsed)}` +
      `\tAvg MPS\t${Math.round((totalMessages * 1000) / totalElapsed)}` +
      `\tMax MPS\t${Math.round((maxMessages * 1000) / maxElapsed)}` +
      `\tReject\t${rejectedMessages}` +
      `\tInflt\t${inflightMessages}`
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
