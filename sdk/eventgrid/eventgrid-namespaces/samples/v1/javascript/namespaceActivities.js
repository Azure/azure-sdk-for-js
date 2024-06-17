// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Publish and Receive events to Event Grid.
 */

const { EventGridSenderClient, EventGridReceiverClient } = require("@azure/eventgrid-namespaces");
const { AzureKeyCredential } = require("@azure/core-auth");

const dotenv = require("dotenv");

// Load the .env file if it exists
dotenv.config();

const endpoint = process.env["EVENT_GRID_NAMESPACES_ENDPOINT"] ?? "https://endpoint";
const key = process.env["EVENT_GRID_NAMESPACES_KEY"] ?? "api_key";
const eventSubscriptionName = process.env["EVENT_SUBSCRIPTION_NAME"] ?? "testsubscription1";
const topicName = process.env["TOPIC_NAME"] ?? "testtopic1";

async function main() {
  // Create the client used to publish events
  const senderClient = new EventGridSenderClient(endpoint, new AzureKeyCredential(key), topicName);
  const receiverClient = new EventGridReceiverClient(
    endpoint,
    new AzureKeyCredential(key),
    topicName,
    eventSubscriptionName,
  );

  // publishes a single cloud event
  const eventId = `singleEventIdV210001`;
  const cloudEvent = {
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
  const receiveResult = await receiverClient.receiveEvents();
  // The Received Cloud Event ID must be equal to the ID of the Event that was published.
  console.log(`Received Event ID: ${receiveResult.details[0].event.id}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
