/*
  This sample is to populate your Event Hubs instance (in case it is empty) with events before you try
  any of the other samples that show how to receive the events from Event Hubs
*/

import { EventHubClient, EventData, delay } from "@azure/event-hubs";

// Define connection string and related Event Hubs entity name here
const connectionString = "";
const eventHubsName = "";

async function main(): Promise<void> {
  const client = EventHubClient.createFromConnectionString(connectionString, eventHubsName);
  const partitionIds = await client.getPartitionIds();
  const messageCount = 300;

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
  const sendPromises: Promise<any>[] = [];
  for (const id of partitionIds) {
    sendPromises.push(client.sendBatch(data, id));
  }

  // Will concurrently send batched messages to all the partitions.
  await Promise.all(sendPromises);
  // Giving some more time, just in case.
  await delay(5000);
  await client.close();
}

main().catch(err => {
  console.log("Error occurred: ", err);
});
