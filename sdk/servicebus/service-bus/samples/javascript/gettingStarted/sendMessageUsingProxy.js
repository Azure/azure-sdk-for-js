/*
  This sample demonstrates how to send messages behind the proxy to Service Bus
  Queue/Topic.
*/

const { ServiceBusClient } = require("../../../src");
const WebSocket =  require("ws");
const url = require("url");
const httpsProxyAgent = require("https-proxy-agent");

// Define connection string and related Service Bus entity names here
const connectionString = "";
const queueName = "";

const proxy = "http://localhost:3128";

// create an instance of the `HttpsProxyAgent` class with the proxy server information
const proxyOpts = url.parse(proxy);
// Set auth property if proxy server requires authentication
// proxyOpts.auth = 'username:password';

const proxyAgent = new httpsProxyAgent(proxyOpts);

async function main() {
  const ns = ServiceBusClient.createFromConnectionString(connectionString, {
    webSocket: WebSocket,
    webSocketConstructorOptions: { agent: proxyAgent }
  });

  // If sending to a Topic, use `createTopicClient` instead of `createQueueClient`
  const client = ns.createQueueClient(queueName);
  const sender = client.createSender();

  try {
    const message = {
      body: `Hello World!!!`
    };

    console.log(`Sending message: ${message.body} - ${message.label}`);
    await sender.send(message);

    await client.close();
  } finally {
    await ns.close();
  }
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
