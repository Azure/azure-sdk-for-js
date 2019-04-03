// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { EventHubClient, EventData, EventPosition, OnMessage, OnError, MessagingError } from "../src";
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
  console.log("Created Sender for partition 0.");
  let count = 0;
  const onMessage: OnMessage = (eventData: any) => {
    console.log("### Actual message:", eventData.body);
    count++;
    if (count >= 5) {
      client.close().catch((err) => {
        console.log(">>>>> Error closing the client: ", err);
      });
    }
  };
  const onError: OnError = (err: MessagingError | Error) => {
    console.log(">>>>> Error occurred: ", err);
  };
  client.receive(partitionIds[0], onMessage, onError, { eventPosition: EventPosition.fromEnqueuedTime(Date.now()) });
  console.log("Created Receiver for partition 0 and CG $default.");

  const messageCount = 5;
  const data: EventData[] = [];
  for (let i = 0; i < messageCount; i++) {
    const obj: EventData = { body: `Hello foo ${i}` };
    data.push(obj);
  }
  console.log("Sending batch message...");
  // NOTE: For receiving events from Azure Stream Analytics, please send Events to an EventHub
  // where the body is a JSON object/array.
  // const datas = [
  //   { body: { "message": "Hello World 1" }, applicationProperties: { id: "Some id" }, partitionKey: "pk786" },
  //   { body: { "message": "Hello World 2" } },
  //   { body: { "message": "Hello World 3" } }
  // ];
  await client.sendBatch(data, partitionIds[0]);
  console.log("message sent");
}

main().catch((err) => {
  console.log("error: ", err);
});
