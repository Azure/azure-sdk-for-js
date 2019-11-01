/*
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the MIT Licence.

  This sample demonstrates how the send() function can be used to send events to Event Hubs.
  See https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-about to learn about Event Hubs.

  Note: If you are using version 2.1.0 or lower of @azure/event-hubs library, then please use the samples at
  https://github.com/Azure/azure-sdk-for-js/tree/%40azure/event-hubs_2.1.0/sdk/eventhub/event-hubs/samples instead.
*/

import { EventHubProducerClient } from "@azure/event-hubs";

// Define connection string and related Event Hubs entity name here
const connectionString = "";
const eventHubName = "";

async function main(): Promise<void> {
  const producer = new EventHubProducerClient(connectionString, eventHubName);

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
    await producer.sendBatch(batch);
  } catch (err) {
    console.log("Error when creating & sending a batch of events: ", err);
  }

  await producer.close();
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
