// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT Licence.

/**
 * @summary This sample demonstrates how to create a ServiceBusClient meant to be used in an environment
 * where outgoing network requests have to go through a proxy server
 * @azsdk-weight 70
 */

import { ServiceBusClient } from "@azure/service-bus";
import WebSocket from "ws";
import { HttpsProxyAgent } from "https-proxy-agent";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// Define connection string for your Service Bus instance here
const connectionString = process.env.SERVICEBUS_CONNECTION_STRING || "<connection string>";
const queueName = process.env.QUEUE_NAME || "<queue name>";

export async function main() {
  const proxyInfo = process.env.HTTP_PROXY || process.env.HTTPS_PROXY;

  if (!proxyInfo) {
    console.error(
      "Error: Proxy information not provided, but it is required to run this sample. Exiting."
    );
    return;
  }

  // Create an instance of the `HttpsProxyAgent` class with the proxy server information
  const proxyAgent = new HttpsProxyAgent(proxyInfo);

  const sbClient = new ServiceBusClient(connectionString, {
    webSocketOptions: {
      // No need to pass the `WebSocket` from "ws" package if you're in the browser
      // in which case the `window.WebSocket` is used by the library.
      webSocket: WebSocket,
      webSocketConstructorOptions: { agent: proxyAgent },
    },
  });

  const sender = sbClient.createSender(queueName);

  console.log(`Sending message using proxy server ${proxyInfo}`);

  await sender.sendMessages({
    body: "sample message",
  });

  await sbClient.close();
}

main().catch((err) => {
  console.log("Use Proxy Sample - Error occurred: ", err);
  process.exit(1);
});
