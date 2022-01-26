// Copyright (c) Microsoft Corporation.
// Licensed under the MIT Licence.

/**
 * @summary Demonstrates how to send events to an Event Hub from a buffered producer. This
 * sample is different from the `sendEvent` one in that it uses the buffered producer
 * client which buffers events before sending them right away. See the client constructor
 * options for more information on how to configure the buffering behavior.
 *
 * @azsdk-weight 60
 */

import { AmqpAnnotatedMessage } from "@azure/core-amqp";
import { EventData, EventHubBufferedProducerClient, OnSendEventsErrorContext } from "@azure/event-hubs";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

const connectionString = process.env["EVENTHUB_CONNECTION_STRING"] || "";

async function handleError(ctx: OnSendEventsErrorContext): Promise<void> {
  console.log(`The following error occurred:`)
  console.log(JSON.stringify(ctx.error), undefined, "  ");
  console.log(`And the following events were not sent as a result to the partition with ID ${ctx.partitionId}:`);
  console.log(ctx.events.map((event: EventData | AmqpAnnotatedMessage) => JSON.stringify(event)).join("\n\n"));
}

export async function main(): Promise<void> {
  console.log(`Running sendBufferedEvents sample`);

  const client = new EventHubBufferedProducerClient(connectionString, {
    /** An error handler must be provided */
    onSendEventsErrorHandler: handleError,

    /** wait for 750 milliseconds before sending a batch */
    maxWaitTimeInMs: 750,

    /** buffer up to 1000 events per partition before sending */
    maxEventBufferLengthPerPartition: 1000
  });

  console.log("Creating and sending a batch of events...");

  function* createData(count: number): Generator<number> {
    for (let i = 0; i < count; ++i) {
      yield i;
    }
  }

  for (const item of createData(2000)) {
    client.enqueueEvent({ body:item });
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
});
