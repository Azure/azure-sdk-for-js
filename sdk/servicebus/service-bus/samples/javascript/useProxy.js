/*
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the MIT Licence.
  
  This sample demonstrates how to create a ServiceBusClient meant to be used in an environment
  where outgoing network requests have to go through a proxy server
*/

const { ServiceBusClient } = require("@azure/service-bus");
const WebSocket = require("ws");
const url = require("url");
const httpsProxyAgent = require("https-proxy-agent");

// Define connection string for your Service Bus instance here
const connectionString = "";

// Get relevant proxy url, username and password needed to create an instance of httpsProxyAgent
const urlParts = url.parse("http://localhost:3128");
urlParts.auth = "username:password"; // Skip this if proxy server does not need authentication.

// Create an instance of the `HttpsProxyAgent` class with the proxy server information
const proxyAgent = new httpsProxyAgent(urlParts);

async function main() {
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
