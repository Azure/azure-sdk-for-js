// Copyright (c) Microsoft Corporation.
// Licensed under the MIT Licence.

/*
  This sample demonstrates how to use WebSockets enable Event Hubs to work over an HTTP proxy and
  in environments where the standard AMQP port 5671 is blocked. For the latter case, ignore proxy
  related configurations in this sample.

  This sample uses 2 external libraries
  - The `ws` library to provide a WebSocket implementation to the Event Hubs library.
  - The `https-proxy-agent` to enable the `ws` library to work with a proxy server.

  Note: If you are using version 2.1.0 or lower of @azure/event-hubs library, then please use the samples at
  https://github.com/Azure/azure-sdk-for-js/tree/%40azure/event-hubs_2.1.0/sdk/eventhub/event-hubs/samples instead.
*/

import WebSocket from "ws";
const url = require("url");
import { HttpsProxyAgent } from "https-proxy-agent";

import { EventHubConsumerClient } from "@azure/event-hubs";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

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

export async function main(): Promise<void> {
  console.log(`Running websockets sample`);

  const client = new EventHubConsumerClient(consumerGroup, connectionString, eventHubName, {
    webSocketOptions: {
      webSocket: WebSocket,
      webSocketConstructorOptions: { agent: proxyAgent }
    }
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
