/*
  This sample demonstrates how to create a EventHubsClient meant to be used in an environment
  where outgoing network requests have to go through a proxy server
*/

import { EventHubClient } from "@azure/event-hubs";
import WebSocket from "ws";
const url = require("url");
const httpsProxyAgent = require("https-proxy-agent");

// Define connection string and related Event Hubs entity name here
const connectionString = "";
const eventHubsName = "";

// Get relevant proxy url, username and password needed to create an instance of httpsProxyAgent
const urlParts = url.parse("http://localhost:3128");
urlParts.auth = "username:password"; // Skip this if proxy server does not need authentication.

// Create an instance of the `HttpsProxyAgent` class with the proxy server information
const proxyAgent = new httpsProxyAgent(urlParts);

async function main(): Promise<void> {
  const client = EventHubClient.createFromConnectionString(connectionString, eventHubsName, {
    webSocket: WebSocket,
    webSocketConstructorOptions: { agent: proxyAgent }
  });
  /*
   Refer to other samples, and place your code here
   to send/receive messages
  */
  await client.close();
}

main().catch(err => {
  console.log("error: ", err);
});
