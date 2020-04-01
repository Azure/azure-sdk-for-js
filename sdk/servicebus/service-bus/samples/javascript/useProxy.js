/*
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the MIT Licence.

  **NOTE**: If you are using version 1.1.x or lower, then please use the link below:
  https://github.com/Azure/azure-sdk-for-js/tree/%40azure/service-bus_1.1.5/sdk/servicebus/service-bus/samples
  
  This sample demonstrates how to create a ServiceBusClient meant to be used in an environment
  where outgoing network requests have to go through a proxy server
*/

const { ServiceBusClient } = require("@azure/service-bus");
const WebSocket = require("ws");
const HttpsProxyAgent = require("https-proxy-agent");

// Load the .env file if it exists
require("dotenv").config();

// Define connection string for your Service Bus instance here
const connectionString =
  process.env.SERVICE_BUS_CONNECTION_STRING || "<connection string>";

async function main() {
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
      webSocket: WebSocket,
      webSocketConstructorOptions: { agent: proxyAgent }
    }
  });

  /*
     Refer to other samples, and place your code here
     to create queue clients, and to send/receive messages
    */
  await sbClient.close();
}

main().catch(err => {
  console.log("Error occurred: ", err);
});
