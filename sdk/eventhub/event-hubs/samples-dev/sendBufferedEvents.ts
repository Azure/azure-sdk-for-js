// Copyright (c) Microsoft Corporation.
// Licensed under the MIT Licence.

/**
 @summary Demonstrates how to send events to an Event Hub using the `EventHubBufferedProducerClient`.
 * This sample is different from the one in `sendEvent.ts` in that the client manages batching of events and sending
 * after a given amount of time or after a given amount of events are in a batch instead of you managing the same explicitly.
 *
 * @azsdk-weight 60
 */

import { EventHubBufferedProducerClient, OnSendEventsErrorContext } from "@azure/event-hubs";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

const connectionString = process.env["EVENTHUB_CONNECTION_STRING"] || "";
const eventHubName = process.env["EVENTHUB_NAME"] || "";

async function handleError(ctx: OnSendEventsErrorContext): Promise<void> {
  console.log(`The following error occurred:`);
  console.log(JSON.stringify(ctx.error, undefined, 2));
  console.log(
    `The following events were not sent as a result to the partition with ID ${ctx.partitionId}:`
  );
  for (const event of ctx.events) {
    console.log(JSON.stringify(event, undefined, 2));
    console.log("\n");
  }
}

export async function main(): Promise<void> {
  console.log(`Running sendBufferedEvents sample`);

  /**
   * Create a buffered client that batches the enqueued events and sends it either
   * after 750ms or after batching 1000 events, whichever occurs first.
   */
  const client = new EventHubBufferedProducerClient(connectionString, eventHubName, {
    /** An error handler must be provided */
    onSendEventsErrorHandler: handleError,

    /** wait for up to 750 milliseconds before sending a batch */
    maxWaitTimeInMs: 750,

    /** buffer up to 1000 events per partition before sending */
    maxEventBufferLengthPerPartition: 1000,
  });

  function createData(count: number): number[] {
    return [...Array(count).keys()];
  }

  console.log("Enqueuing events...");

  for (const item of createData(2000)) {
    await client.enqueueEvent({ body: item });
  }

  /**
   * Flushing ensures buffered events that were not sent yet will be sent before
   * closing the connection. Flushing can also be invoked directly using
   * client.flush().
   */
  await client.close({ flush: true });
  console.log(`Exiting sendBufferedEvents sample`);
}

main().catch((error) => {
  console.error("Error running sample:", error);
  process.exit(1);
});
