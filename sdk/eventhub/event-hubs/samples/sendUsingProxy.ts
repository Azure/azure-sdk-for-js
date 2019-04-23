// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { EventHubClient, EventData } from "../src";
import dotenv from "dotenv";
import WebSocket from "ws";
const url = require('url');
const httpsProxyAgent = require("https-proxy-agent");
dotenv.config();


const connectionString = "EVENTHUB_CONNECTION_STRING";
const entityPath = "EVENTHUB_NAME";
const str = process.env[connectionString] || "";
const path = process.env[entityPath] || "";

const proxy = 'http://localhost:3128';

// create an instance of the `HttpsProxyAgent` class with the proxy server information
const proxyOpts = url.parse(proxy);
// Set auth property if proxy server requires authentication
// proxyOpts.auth = 'username:password';

const proxyAgent = new httpsProxyAgent(proxyOpts);

async function main(): Promise<void> {
  const client = EventHubClient.createFromConnectionString(str, path, {webSocket: WebSocket, webSocketConstructorOptions: {agent: proxyAgent}});
  const data: EventData = {
    body: "Hello World!!"
  };

   const partitionIds = await client.getPartitionIds();
  await client.send(data, partitionIds[0]);
  console.log(">>> Sent the message successfully: ", data.body.toString());
  await client.close();
}

main().catch(err => {
  console.log("error: ", err);
});
