/*
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the MIT Licence.

  This sample demonstrates how the send() function can be used to send events to Event Hubs.
  See https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-about to learn about Event Hubs.

  Note: If you are using version 2.1.0 or lower of @azure/event-hubs library, then please use the samples at
  https://github.com/Azure/azure-sdk-for-js/tree/%40azure/event-hubs_2.1.0/sdk/eventhub/event-hubs/samples instead.
*/

import { EventHubClient } from "@azure/event-hubs";

// Define connection string and related Event Hubs entity name here
const connectionString = "";
const eventHubName = "";

async function main(): Promise<void> {
  const client = new EventHubClient(connectionString, eventHubName);
  const producer = client.createProducer();

  console.log("Sending single event...");
  await producer.send({ body: "Sent as a single event" }).catch((err) => {
    console.log("Error when sending single event: ", err);
  });

  console.log("Sending 10 events at one go...");
  const events = [];
  for (let index = 0; index < 10; index++) {
    events.push({ body: "Sent along with 9 other events" });
  }
  await producer.send(events).catch((err) => {
    console.log("Error when sending 10 events: ", err);
  });

  console.log("Creating and sending a batch of events...");
  try {
    const batch = await producer.createBatch();
    for (let index = 0; index < 10; index++) {
      const isAdded = batch.tryAdd({ body: "Sent along with 9 other events using batch" });
      if (!isAdded) {
        console.log(`Unable to add event ${index} to the batch`);
        break;
      }
    }
    await producer.send(batch);
  } catch (err) {
    console.log("Error when creating & sending a batch of events: ", err);
  }

  await producer.close();
  await client.close();
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
