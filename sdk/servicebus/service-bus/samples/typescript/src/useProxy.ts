/*
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the MIT Licence.

  This sample demonstrates how to create a ServiceBusClient meant to be used in an environment
  where outgoing network requests have to go through a proxy server
*/

import { ServiceBusClient } from "@azure/service-bus";
import WebSocket from "ws";
import url from "url";
import httpsProxyAgent from "https-proxy-agent";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// Define connection string for your Service Bus instance here
const connectionString = process.env.SERVICE_BUS_CONNECTION_STRING || "";
const queueName = process.env.QUEUE_NAME || "";

export async function main() {
  if (!process.env.HTTP_PROXY_URL) {
    console.error("Error: Proxy information not provided, but it is required to run this sample. Exiting.");
    return;
  }
  
  // Get relevant proxy url, username and password needed to create an instance of httpsProxyAgent
  const urlParts = url.parse(process.env.HTTP_PROXY_URL);
  urlParts.auth = process.env.HTTP_PROXY_AUTH; // Skip this if proxy server does not need authentication.
  
  // Create an instance of the `HttpsProxyAgent` class with the proxy server information
  const proxyAgent = new httpsProxyAgent(urlParts);

  const sbClient = ServiceBusClient.createFromConnectionString(connectionString, {
    webSocket: WebSocket,
    webSocketConstructorOptions: { agent: proxyAgent }
  });

  /*
   Refer to other samples, and place your code here
   to create queue clients, and to send/receive messages
  */
  await sbClient.close();
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
