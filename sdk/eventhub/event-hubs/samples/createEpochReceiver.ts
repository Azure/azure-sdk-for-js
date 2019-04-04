// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { EventHubClient, OnError, MessagingError, OnMessage, delay } from "../src";
import dotenv from "dotenv";
dotenv.config();

const connectionString = "EVENTHUB_CONNECTION_STRING";
const entityPath = "EVENTHUB_NAME";
const str = process.env[connectionString] || "";
const path = process.env[entityPath] || "";


async function main(): Promise<void> {
  const client = EventHubClient.createFromConnectionString(str, path);
  const partitionIds = await client.getPartitionIds();
  console.log("Created EH client from connection string");
  const onMessage: OnMessage = (eventData: any) => {
    console.log("@@@@ receiver with epoch 2.\n ### Actual message:", eventData.body);
  };
  const onError: OnError = (err: MessagingError | Error) => {
    console.log(">>>>> Error occurred for receiver with epoch 2: ", err);
  };
  const rcvHandler1 = client.receive(partitionIds[0], onMessage, onError, { epoch: 2 });
  await delay(10000);
  await rcvHandler1.stop();

  console.log("\n $$$$ Waiting for 10 seconds to let receiver 1 set up and start receiving messages...");

  const onMessage2: OnMessage = (eventData: any) => {
    console.log("@@@@ receiver with epoch 1. \n ### Actual message:", eventData.body );
  };
  const onError2: OnError = (err: MessagingError | Error) => {
    console.log(">>>>> Error occurred for receiver with epoch 1: ", err);
  };
  console.log("$$$$ Will start receiving messages from receiver with epoch value 1...");
  const rcvHandler2 = client.receive(partitionIds[0], onMessage2, onError2, { epoch: 1 });
  await delay(10000);
  await rcvHandler2.stop();

  await client.close();
}

main().catch((err) => {
  console.log("error: ", err);
});
