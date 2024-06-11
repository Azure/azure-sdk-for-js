// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Publish and Receive events to Event Grid.
 * @azsdk-weight 3
 */

import {
  EventGridSenderClient,
  EventGridReceiverClient,
  CloudEvent,
  ReceiveResult,
} from "@azure/eventgrid-namespaces";
import { AzureKeyCredential } from "@azure/core-auth";

import * as dotenv from "dotenv";

// Load the .env file if it exists
dotenv.config();

const endpoint = process.env["EVENT_GRID_NAMESPACES_ENDPOINT"] ?? "https://endpoint";
const key = process.env["EVENT_GRID_NAMESPACES_KEY"] ?? "api_key";
const eventSubscriptionName = process.env["EVENT_SUBSCRIPTION_NAME"] ?? "testsubscription1";
const topicName = process.env["TOPIC_NAME"] ?? "testtopic1";

export async function main(): Promise<void> {
  // Create the client used to publish events
  const senderClient = new EventGridSenderClient(endpoint, new AzureKeyCredential(key), topicName);
  const receiverClient = new EventGridReceiverClient(
    endpoint,
    new AzureKeyCredential(key),
    topicName,
    eventSubscriptionName,
  );

  // publishes a single cloud event
  const eventId: string = `singleEventIdV210001`;
  const cloudEvent: CloudEvent<any> = {
    type: "example",
    source: "https://example.com",
    id: eventId,
    time: new Date(),
    data: {
      resourceUri: "https://dummyurl.com",
    },
    specVersion: "1.0",
  };
  // Publish the Cloud Event
  await senderClient.sendEvents(cloudEvent);
  // Receive the Published Cloud Event
  const receiveResult: ReceiveResult<any> = await receiverClient.receiveEvents();
  // The Received Cloud Event ID must be equal to the ID of the Event that was published.
  console.log(`Received Event ID: ${receiveResult.details[0].event.id}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
