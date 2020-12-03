/*
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the MIT Licence.

  This sample demonstrates how to use WebSockets to enable Event Processor host to work over 
  an HTTP proxy and in environments where the standard AMQP port 5671 is blocked. 

  This sample uses 2 external libraries
  - The `ws` library to provide a WebSocket implementation to the EPH library.
  - The `https-proxy-agent` to enable the `ws` library to work with a proxy server.
*/

const { EventProcessorHost } = require("@azure/event-processor-host");
const WebSocket = require("ws");
const url = require("url");
const httpsProxyAgent = require("https-proxy-agent");

// Define storage connection string and Event Hubs connection string and related entity name here
const ehConnectionString = "";
const eventHubsName = "";
const storageConnectionString = "";

// if you want to create a unique storageContainer name for every run, use `createHostName` function, otherwise
// provide storageContainer name here.
// const storageContainerName = "my-container";
const storageContainerName = EventProcessorHost.createHostName("test-container");
const ephName = "my-eph";

// Create an instance of the `HttpsProxyAgent` class with the proxy server information like
// proxy url, username and password
// Skip this section if you are not behind a proxy server
const urlParts = url.parse("http://localhost:3128");
urlParts.auth = "username:password"; // Skip this if proxy server does not need authentication.
const proxyAgent = new httpsProxyAgent(urlParts);

async function main() {
  const eph = EventProcessorHost.createFromConnectionString(
    EventProcessorHost.createHostName(ephName),
    storageConnectionString,
    storageContainerName,
    ehConnectionString,
    {
      eventHubPath: eventHubsName,
      onEphError: (error) => {
        console.log("[%s] Error: %O", ephName, error);
      },
      webSocket: WebSocket,
      webSocketConstructorOptions: { agent: proxyAgent }
    }
  );
  /*
   Refer to other samples, and place your code here to receive events
  */
  await eph.stop();
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
