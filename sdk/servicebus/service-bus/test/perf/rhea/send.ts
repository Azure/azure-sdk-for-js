/*
# Overview
Measures the maximum throughput of `sender.send()` in package `rhea`.

# Instructions
1. Create a Service Bus namespace with `Tier=Premium` and `Messaging Units=2`.
   It is recommended to use a namespace large enough to allow maximum client throughput.
2. Create a queue inside the namespace.
3. Set env vars `SERVICE_BUS_CONNECTION_STRING` and `SERVICE_BUS_QUEUE_NAME`.
4. `ts-node send.ts [maxInflightMessages] [totalMessages]`
5. Example: `ts-node send.ts 1000 1000000`
 */

import * as rhea from 'rhea';
import delay from "delay";
import * as moment from "moment";

const _payload = Buffer.alloc(1024);
const _start = moment();

let _sent = 0;
let _accepted = 0;

async function main(): Promise<void> {
  // Endpoint=sb://<your-namespace>.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=<shared-access-key>
  const connectionString = process.env.SERVICE_BUS_CONNECTION_STRING as string;
  const entityPath = process.env.SERVICE_BUS_QUEUE_NAME as string;

  // <your-namespace>.servicebus.windows.net
  const host = connectionString.match(/\/\/(.*\.servicebus\.windows\.net)/)![1];
  const port = 5671;

  // SharedAccessKeyName (usually  "RootManageSharedAccessKey")
  const username = connectionString.match(/SharedAccessKeyName=(.*);/)![1];

  // SharedAccessKey
  const password = connectionString.match(/SharedAccessKey=(.*)/)![1];

  const maxInflight = process.argv.length > 2 ? parseInt(process.argv[2]) : 1;
  const messages = process.argv.length > 3 ? parseInt(process.argv[3]) : 10;
  log(`Maximum inflight messages: ${maxInflight}`);
  log(`Total messages: ${messages}`);

  const writeResultsPromise = WriteResults(messages);

  RunTest(host, username, password, entityPath, maxInflight, messages);

  await writeResultsPromise;
}

function RunTest(
  host: string,
  username: string,
  password: string,
  entityPath: string,
  maxInflight: number,
  messages: number
): void {
  const container: rhea.Container = rhea.create_container();

  function sendMessages(context: any): void {
    while (context.sender.sendable() && _sent < messages && inflight() < maxInflight) {
      // log('send');
      _sent++;
      context.sender.send({body: _payload});
    }
  }

  container.on('sendable', function (context) {
    // log('sendable');
    sendMessages(context);
  });

  container.on('accepted', function (context) {
    // log('accepted');
    if (++_accepted === messages) {
      context.connection.close();
    } else {
      sendMessages(context);
    }
  });

  // container.on('disconnected', function (context) {
  //   if (context.error) console.error('%s %j', context.error, context.error);
  // });

  // container.on('connection_open', function (context) {
  //   log('connection_open');
  // });

  // container.on('connection_close', function (context) {
  //   log('connection_close');
  // });

  // container.on('connection_error', function (context) {
  //   log('connection_error');
  // });

  // container.on('disconnected', function (context) {
  //   log('disconnected');
  // });

  const port = 5671;
  container.connect({
    transport: "tls",
    host: host,
    hostname: host,
    username: username,
    password: password,
    port: port,
    reconnect: false
  }).open_sender(entityPath);
}

async function WriteResults(messages: number): Promise<void> {
  let lastMessages = 0;
  let lastElapsed = 0;
  let maxMessages = 0;
  let maxElapsed = Number.MAX_SAFE_INTEGER;

  do {
    await delay(1000);

    const sentMessages = _sent;
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
  } while (_accepted < messages);
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

function inflight() : number {
  return _sent - _accepted;
}

function log(message: string): void {
  console.log(`[${moment().format("hh:mm:ss.SSS")}] ${message}`);
}

main().catch((err) => {
  log(`Error occurred: ${err}`);
});
