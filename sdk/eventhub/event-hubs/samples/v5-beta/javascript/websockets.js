// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates how to connect to Azure Event Hubs over websockets to work over an HTTP proxy.
 */

/*
 * In environments where the standard AMQP port 5671 is blocked and you don't want to connect through a proxy,
 * ignore proxy related configurations in this sample.
 */

const WebSocket = require("ws");
const { HttpsProxyAgent } = require("https-proxy-agent");

const { EventHubConsumerClient } = require("@azure/event-hubs");
const { DefaultAzureCredential } = require("@azure/identity");

// Load the .env file if it exists
require("dotenv/config");

const fullyQualifiedNamespace = process.env["EVENTHUB_FQDN"] || "<your fully qualified namespace>";
const eventHubName = process.env["EVENTHUB_NAME"] || "<your eventhub name>";
const consumerGroup = process.env["CONSUMER_GROUP_NAME"] || "<your consumer group name>";

// Create an instance of the `HttpsProxyAgent` class with the proxy server information like
// proxy url, username and password
// Skip this section if you are not behind a proxy server
const urlParts = new URL("http://localhost:3128");
const proxyAgent = new HttpsProxyAgent(urlParts);

async function main() {
  console.log(`Running websockets sample`);

  const credential = new DefaultAzureCredential();

  const client = new EventHubConsumerClient(
    consumerGroup,
    fullyQualifiedNamespace,
    eventHubName,
    credential,
    {
      webSocketOptions: {
        webSocket: WebSocket,
        webSocketConstructorOptions: { agent: proxyAgent },
      },
    },
  );
  /*
     Refer to other samples, and place your code here to send/receive events
    */
  await client.close();

  console.log(`Exiting websockets sample`);
}

main().catch((error) => {
  console.error("Error running sample:", error);
});

module.exports = { main };
