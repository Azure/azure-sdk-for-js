// Copyright (c) Microsoft Corporation.
// Licensed under the MIT Licence.

/**
 * @summary Demonstrates how to connect to Azure Event Hubs over websockets to work over an HTTP proxy.
 */

/*
 * In environments where the standard AMQP port 5671 is blocked and you don't want to connect through a proxy,
 * ignore proxy related configurations in this sample.
 */

const WebSocket = require("ws");
const url = require("url");
const { HttpsProxyAgent } = require("https-proxy-agent");

const { EventHubConsumerClient } = require("@azure/event-hubs");

// Load the .env file if it exists
require("dotenv").config();

// Define connection string and related Event Hubs entity name here
const connectionString = process.env["EVENTHUB_CONNECTION_STRING"] || "";
const eventHubName = process.env["EVENTHUB_NAME"] || "";
const consumerGroup = process.env["CONSUMER_GROUP_NAME"] || "";

// Create an instance of the `HttpsProxyAgent` class with the proxy server information like
// proxy url, username and password
// Skip this section if you are not behind a proxy server
const urlParts = url.parse("http://localhost:3128");
urlParts.auth = "username:password"; // Skip this if proxy server does not need authentication.
const proxyAgent = new HttpsProxyAgent(urlParts);

async function main() {
  console.log(`Running websockets sample`);

  const client = new EventHubConsumerClient(consumerGroup, connectionString, eventHubName, {
    webSocketOptions: {
      webSocket: WebSocket,
      webSocketConstructorOptions: { agent: proxyAgent },
    },
  });
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
