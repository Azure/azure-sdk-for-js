// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventHubProducerClient, WebSocketImpl } from "@azure/event-hubs";
import { WebSocketWrapper } from "./wsWrapper";

// Define connection string and related Event Hubs entity name here
const connectionString = process.env["EVENTHUB_CONNECTION_STRING"] || "";
const eventHubName = process.env["EVENTHUB_NAME"] || "";

export async function main(): Promise<void> {
  console.log(`Running sendEvents sample`);

  const producer = new EventHubProducerClient(connectionString, eventHubName, {
    webSocketOptions: {
      webSocket: WebSocketWrapper as WebSocketImpl,
    },
  });

  console.log("Creating and sending a batch of events...");

  const eventsToSend = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  try {
    let batch = await producer.createBatch();

    let numEventsSent = 0;

    // add events to our batch
    let i = 0;

    while (i < eventsToSend.length) {
      const isAdded = batch.tryAdd({ body: eventsToSend[i] });

      if (isAdded) {
        console.log(`Added eventsToSend[${i}] to the batch`);
        ++i;
        continue;
      }

      if (batch.count === 0) {
        console.log(`Message was too large and can't be sent until it's made smaller. Skipping...`);
        ++i;
        continue;
      }

      // otherwise this just signals a good spot to send our batch
      console.log(`Batch is full - sending ${batch.count} messages as a single batch.`);
      await producer.sendBatch(batch);
      numEventsSent += batch.count;

      // and create a new one to house the next set of messages
      batch = await producer.createBatch();
    }

    // send any remaining messages, if any.
    if (batch.count > 0) {
      console.log(`Sending remaining ${batch.count} messages as a single batch.`);
      await producer.sendBatch(batch);
      numEventsSent += batch.count;
    }

    console.log(`Sent ${numEventsSent} events`);

    if (numEventsSent !== eventsToSend.length) {
      throw new Error(`Not all messages were sent (${numEventsSent}/${eventsToSend.length})`);
    }
  } catch (err) {
    console.log("Error when creating & sending a batch of events: ", err);
  }

  await producer.close();
  console.log(`Exiting sendEvents sample`);
}
