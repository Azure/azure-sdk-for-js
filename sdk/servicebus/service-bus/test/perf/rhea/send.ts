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

const _payload = Buffer.alloc(1024);

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

const container: rhea.Container = rhea.create_container();

container.on('sendable', function (context) {
  console.log('sendable');
  context.sender.send({body: _payload});
});

container.on('accepted', function (context) {
  console.log('accepted');
  context.connection.close();
});

container.on('disconnected', function (context) {
  if (context.error) console.error('%s %j', context.error, context.error);
});

container.on('connection_open', function (context) {
  console.log('connection_open');
});

container.on('connection_close', function (context) {
  console.log('connection_close');
});

container.on('connection_error', function (context) {
  console.log('connection_error');
});

container.on('disconnected', function (context) {
  console.log('disconnected');
});

container.connect({
  transport: "tls",
  host: host,
  hostname: host,
  username: username,
  password: password,
  port: port,
  reconnect: false
}).open_sender(entityPath);
