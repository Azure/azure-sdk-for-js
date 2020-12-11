/*
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the MIT Licence.

  This sample is to populate your Event Hubs instance (in case it is empty) with events before you try
  any of the other samples that show how to receive the events from Even
*/

const { EventHubClient } = require("@azure/event-hubs");

// Define connection string and related Event Hub entity name here
const connectionString = "";
const eventHubName = "";

async function main() {
  const client = EventHubClient.createFromConnectionString(connectionString, eventHubName);
  const partitionIds = await client.getPartitionIds();
  const messageCount = 300;

  const events = [];
  // NOTE: For receiving events from Azure Stream Analytics, please send Events to an EventHub
  // where the body is a JSON object/array.
  // const events = [
  //   { body: { "message": "Hello World 1" }, applicationProperties: { id: "Some id" }, partitionKey: "pk786" },
  //   { body: { "message": "Hello World 2" } },
  //   { body: { "message": "Hello World 3" } }
  // ];
  for (let i = 0; i < messageCount; i++) {
    events.push({ body: `Hello foo ${i}` });
  }
  console.log("Sending batch events...");

  // Will concurrently send batched events to all the partitions.
  const sendPromises = partitionIds.map((id) => client.sendBatch(events, id));

  await Promise.all(sendPromises);
  await client.close();
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
