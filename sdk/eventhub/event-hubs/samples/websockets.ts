/*
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the MIT Licence.

  This sample demonstrates how to use WebSockets enable Event Hubs to work over an HTTP proxy and
  in environments where the standard AMQP port 5671 is blocked. For the latter case, ignore proxy
  related configurations in this sample.

  This sample uses 2 external libraries
  - The `ws` library to provide a WebSocket implementation to the Event Hubs library.
  - The `https-proxy-agent` to enable the `ws` library to work with a proxy server.
*/

import { EventHubClient } from "@azure/event-hubs";
import WebSocket from "ws";
const url = require("url");
const httpsProxyAgent = require("https-proxy-agent");

// Define connection string and related Event Hubs entity name here
const connectionString = "";
const eventHubsName = "";

// Create an instance of the `HttpsProxyAgent` class with the proxy server information like
// proxy url, username and password
// Skip this section if you are not behind a proxy server
const urlParts = url.parse("http://localhost:3128");
urlParts.auth = "username:password"; // Skip this if proxy server does not need authentication.
const proxyAgent = new httpsProxyAgent(urlParts);

async function main(): Promise<void> {
  const client = EventHubClient.createFromConnectionString(connectionString, eventHubsName, {
    webSocket: WebSocket,
    webSocketConstructorOptions: { agent: proxyAgent }
  });
  /*
   Refer to other samples, and place your code here
   to send/receive events
  */
  await client.close();
}

main().catch(err => {
  console.log("error: ", err);
});
