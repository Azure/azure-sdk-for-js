// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { EventHubClient, EventData, delay } from "azure-event-hubs";
import * as dotenv from "dotenv";
dotenv.config();

const connectionString = "EVENTHUB_CONNECTION_STRING";
const entityPath = "EVENTHUB_NAME";
const str = process.env[connectionString] || "";
const path = process.env[entityPath] || "";


async function main(): Promise<void> {
  const client = EventHubClient.createFromConnectionString(str, path);
  console.log("Created EH client from connection string");
  console.log("Created Sender for partition 0.");

  const partitionIds = await client.getPartitionIds();
  const messageCount = 300;
  let datas: EventData[] = [];
  for (let i = 0; i < messageCount; i++) {
    let obj: EventData = { body: `Hello foo ${i}` };
    datas.push(obj);
  }
  console.log("Sending batch message...");
  // NOTE: For receiving events from Azure Stream Analytics, please send Events to an EventHub
  // where the body is a JSON object/array.
  // const datas = [
  //   { body: { "message": "Hello World 1" }, applicationProperties: { id: "Some id" }, partitionKey: "pk786" },
  //   { body: { "message": "Hello World 2" } },
  //   { body: { "message": "Hello World 3" } }
  // ];
  const sendPromises: Promise<any>[] = [];
  for (let id of partitionIds) {
    sendPromises.push(client.sendBatch(datas, id));
  }

  // Will concurrently send batched messages to all the partitions.
  await Promise.all(sendPromises);
  // Giving some more time, just in case.
  await delay(5000);
  await client.close();
}

main().catch((err) => {
  console.log("error: ", err);
});
