// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventHubBufferedProducerClient, OnSendEventsErrorContext } from "@azure/event-hubs";
import { WebSocketWrapper } from "./wsWrapper";

const connectionString = process.env["EXPO_PUBLIC_EVENTHUB_CONNECTION_STRING"] || "";
const eventHubName = process.env["EXPO_PUBLIC_EVENTHUB_NAME"] || "";

async function handleError(ctx: OnSendEventsErrorContext): Promise<void> {
  console.log(`The following error occurred:`);
  console.log(JSON.stringify(ctx.error, undefined, 2));
  console.log(
    `The following events were not sent as a result to the partition with ID ${ctx.partitionId}:`,
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

    webSocketOptions: {
      webSocket: WebSocketWrapper,
    },
  });

  function createData(count: number): number[] {
    console.log(`Creating ${count} events to send...`);
    return [...Array(count).keys()];
  }

  console.log("Enqueuing events...");
  try {
    for (const item of createData(10)) {
      await client.enqueueEvent({ body: item });
    }
  } catch (e: any) {
    console.log(e.message);
    console.log(e.name);
    if (e instanceof AggregateError) {
      for (const error of e.errors) {
        console.log(error.message);
        console.log(error.name);
      }
    }
  }

  /**
   * Flushing ensures buffered events that were not sent yet will be sent before
   * closing the connection. Flushing can also be invoked directly using
   * client.flush().
   */
  await client.close({ flush: true });
  console.log(`Exiting sendBufferedEvents sample`);
}
