const { Connection } = require("rhea-promise");
const moment = require('moment');
const delay = require('delay');

const _payload = Buffer.alloc(1024);
const _start = moment();

let _messages = 0;

async function main() {
  // Endpoint=sb://<your-namespace>.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=<shared-access-key>
  const connectionString = process.env.SERVICE_BUS_CONNECTION_STRING as string;
  const entityPath = process.env.SERVICE_BUS_QUEUE_NAME as string;

  // <your-namespace>.servicebus.windows.net
  const host = connectionString.match(/\/\/(.*\.servicebus\.windows\.net)/)![1];

  // SharedAccessKeyName (usually  "RootManageSharedAccessKey")
  const username = connectionString.match(/SharedAccessKeyName=(.*);/)![1];

  // SharedAccessKey
  const password = connectionString.match(/SharedAccessKey=(.*)/)![1];

  const maxInflight = process.argv.length > 2 ? parseInt(process.argv[2]) : 1;
  const messages = process.argv.length > 3 ? parseInt(process.argv[3]) : 10;
  log(`Maximum inflight messages: ${maxInflight}`);
  log(`Total messages: ${messages}`);

  let writeResultsPromise = WriteResults(messages);
  
  await RunTest(host, username, password, entityPath, maxInflight, messages);

  await writeResultsPromise;
};

async function RunTest(host: string, username: string, password: string, entityPath: string, maxInflight: number, messages: number) {
  const port = 5671;

  const connection = new Connection({
      transport: "tls",
      host: host,
      hostname: host,
      username: username,
      password: password,
      port: port,
      reconnect: false
  });
  await connection.open();

  const sender = await connection.createSender({
    name: "sender-1",
    target: {
        address: entityPath
      }
  });

  let promises: Promise<void>[] = [];

  for (let i = 0; i < maxInflight; i++ ) {
    let promise = ExecuteSendsAsync(sender, messages);
    promises[i] = promise;
  }

  await Promise.all(promises);

  await connection.close();
}

async function ExecuteSendsAsync(sender: any, messages: number) {
  while (++_messages <= messages) {
    while (!sender.sendable()) {
      await delay(0.01);
    }
    if (sender.sendable()) {
      await sender.send({ body: _payload });
    }
  }
  
  // Undo last increment, since a message was never sent on the final loop iteration
  _messages--;
}

async function WriteResults(messages: number) {
  let lastMessages = 0;
  let lastElapsed = 0;
  let maxMessages = 0;
  let maxElapsed = Number.MAX_SAFE_INTEGER;

  do {
    await delay(1000);

    let sentMessages = _messages;
    let currentMessages = sentMessages - lastMessages;
    lastMessages = sentMessages;

    let elapsed = moment().diff(_start);
    let currentElapsed = elapsed - lastElapsed;
    lastElapsed = elapsed;

    if ((currentMessages / currentElapsed) > (maxMessages / maxElapsed)) {
      maxMessages = currentMessages;
      maxElapsed = currentElapsed;
    }

    WriteResult(sentMessages, elapsed, currentMessages, currentElapsed, maxMessages, maxElapsed);
  }
  while (_messages < messages);
}

function WriteResult(totalMessages: number, totalElapsed: number,
  currentMessages: number, currentElapsed: number,
  maxMessages: number, maxElapsed: number) {
  log(`\tTot Msg\t${totalMessages}` +
      `\tCur MPS\t${Math.round((currentMessages * 1000) / currentElapsed)}` +
      `\tAvg MPS\t${Math.round((totalMessages * 1000) / totalElapsed)}` +
      `\tMax MPS\t${Math.round((maxMessages * 1000) / maxElapsed)}`
      );
}

function log(message: string) {
  console.log(`[${moment().format('hh:mm:ss.SSS')}] ${message}`);
}

main().catch(err => {
  log(`Error occurred: ${err}`);
});
