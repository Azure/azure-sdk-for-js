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
const connectionString = process.env["EVENTHUB_CONNECTION_STRING"] || "";
const eventHubName = process.env["EVENTHUB_NAME"] || "";

export async function main(): Promise<void> {
  console.log(`Running sendEvents sample`);

  const producer = new EventHubProducerClient(connectionString, eventHubName);

  console.log("Creating and sending a batch of events...");
  try {
    // By not specifying a partition ID or a partition key we allow the server to choose
    // which partition will accept this message.
    //
    // This pattern works well if the consumers of your events do not have any particular
    // requirements about the ordering of batches against other batches or if you don't care 
    // which messages are assigned to which partition.
    //
    // If you would like more control you can pass either a `partitionKey` or a `partitionId`
    // into the createBatch() `options` parameter which will allow you full control over the 
    // destination.
    const batch = await producer.createBatch();

    // add events to our batch
    for (let index = 0; index < 10; index++) {
      // messages can fail to be added to the batch if they exceed the maximum size configured for
      // the EventHub.
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
  console.log(`Exiting sendEvents sample`);
}

if (!process.env["RUNNING_IN_TESTS"]) {
  main().catch((err) => {
    console.log("Error occurred: ", err);
    process.exit(1);
  });
}

