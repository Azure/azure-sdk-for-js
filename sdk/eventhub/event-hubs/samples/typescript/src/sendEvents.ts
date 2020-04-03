// Copyright (c) Microsoft Corporation.
// Licensed under the MIT Licence.

/*
  This sample demonstrates how the send() function can be used to send events to Event Hubs.
  See https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-about to learn about Event Hubs.

  Note: If you are using version 2.1.0 or lower of @azure/event-hubs library, then please use the samples at
  https://github.com/Azure/azure-sdk-for-js/tree/%40azure/event-hubs_2.1.0/sdk/eventhub/event-hubs/samples instead.
*/

import { EventHubProducerClient } from "@azure/event-hubs";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// Define connection string and related Event Hubs entity name here
const connectionString = process.env["EVENTHUB_CONNECTION_STRING"] || "";
const eventHubName = process.env["EVENTHUB_NAME"] || "";

async function createAndSend(producer: EventHubProducerClient) {
  console.log(`${new Date().toISOString()} :: Creating and sending 100 byte payload...`);

  const eventsToSend = [];
  for (let i = 0; i < 1; i++) {
    eventsToSend.push({
      "name": "Standalone test",
      "timestamp": Date.now(),
      "event": "MS_test",
      "message": `Metric No. ${i}`
    })
  }
  //console.log(`Sending batch of :: ${Buffer.byteLength(JSON.stringify(eventsToSend))}`);

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
    const batchOptions = {
      // The maxSizeInBytes lets you manually control the size of the batch.
      // if this is not set we will get the maximum batch size from Event Hubs.
      //
      // For this sample you can change the batch size to see how different parts
      // of the sample handle batching. In production we recommend using the default
      // and not specifying a maximum size.
      //
      // maxSizeInBytes: 200
    };

    let batch = await producer.createBatch(batchOptions);

    let numEventsSent = 0;

    // add events to our batch
    let i = 0;

    while (i < eventsToSend.length) {
      // messages can fail to be added to the batch if they exceed the maximum size configured for
      // the EventHub.
      const isAdded = batch.tryAdd({body: eventsToSend[i]});

      if (isAdded) {
        // console.log(`Added eventsToSend[${i}] to the batch`);
        ++i;
        continue;
      }

      if (batch.count === 0) {
        // If we can't add it and the batch is empty that means the message we're trying to send
        // is too large, even when it would be the _only_ message in the batch.
        //
        // At this point you'll need to decide if you're okay with skipping this message entirely
        // or find some way to shrink it.
        console.log(`Message was too large and can't be sent until it's made smaller. Skipping...`);
        ++i;
        continue;
      }

      // otherwise this just signals a good spot to send our batch
      //console.log(`Batch is full - sending ${batch.count} messages as a single batch.`);
      await producer.sendBatch(batch).then(() => console.log(`${new Date().toISOString()} :: Sent message successfully`), (err: Error) => console.error(`${new Date().toISOString()} :: Error while sending batch : `, err));
      numEventsSent += batch.count;

      // and create a new one to house the next set of messages
      batch = await producer.createBatch(batchOptions);
    }

    // send any remaining messages, if any.
    if (batch.count > 0) {
      //console.log(`Sending remaining ${batch.count} messages as a single batch.`);
      await producer.sendBatch(batch).then(() => console.log(`${new Date().toISOString()} :: Sent message successfully`), (err: Error) => console.error(`${new Date().toISOString()} :: Error while sending batch : `, err));
      numEventsSent += batch.count;
    }

    //console.log(`Sent ${numEventsSent} events`);

    if (numEventsSent !== eventsToSend.length) {
      throw new Error(`Not all messages were sent (${numEventsSent}/${eventsToSend.length})`);
    }
  } catch (err) {
    console.log("Error when creating & sending a batch of events: ", err);
  }
}

export async function main(): Promise<void> {
  console.log(`Running sendEvents sample`);
  console.log(`Connecting to`, connectionString, eventHubName);
  const producer = new EventHubProducerClient(connectionString, eventHubName);
  const promises = [];
  for (let i = 0; i< 100; i++) {
    const timer1 = Date.now();
    for (let j= 0; j<1000; j++) {
      promises.push(createAndSend(producer));
    }
    await new Promise(resolve => setTimeout(resolve, 1000 - (timer1-Date.now())));
  }
  await Promise.all(promises).catch((err) => console.log('Error ::', err));

  await producer.close();
  console.log(`Exiting sendEvents sample`);
}

main().catch((error) => {
  console.error("Error running sample:", error);
});
