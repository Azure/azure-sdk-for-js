// Copyright (c) Microsoft Corporation.
// Licensed under the MIT Licence.

/**
 * @summary Demonstrates how to send events to an Event Hub from a buffered producer.
 *
 * @azsdk-weight 60
 */

import { EventHubBufferedProducerClient, OnSendEventsErrorContext } from "@azure/event-hubs";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

const connectionString = process.env["EVENTHUB_CONNECTION_STRING"] || "";

async function handleError(ctx: OnSendEventsErrorContext): Promise<void> {
  console.log(JSON.stringify(ctx.error), undefined, "  ");
}

export async function main(): Promise<void> {
  console.log(`Running sendEvents sample`);

  const producer = new EventHubBufferedProducerClient(connectionString, {
    onSendEventsErrorHandler: handleError
  });

  console.log("Creating and sending a batch of events...");

  const eventsToSend = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

  try {
    // add events to our batch
    let i = 0;

    while (i < eventsToSend.length) {
      await producer.enqueueEvent({ body: eventsToSend[i] });
      console.log(`Added eventsToSend[${i}] to the batch`);
      ++i;
    }
  } catch (err) {
    console.log("Error when creating & sending a batch of events: ", err);
  }

  await producer.close();
  console.log(`Exiting sendEvents sample`);
}

main().catch((error) => {
  console.error("Error running sample:", error);
});
