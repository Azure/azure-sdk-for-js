// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Send events to Event Grid using the Cloud Events 1.0 Schema.
 */

const { EventGridPublisherClient } = require("@azure/eventgrid");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

// The URL of the endpoint of the Event Grid topic.
const endpoint = process.env["EVENT_GRID_CLOUD_EVENT_SCHEMA_ENDPOINT"] || "";

async function main() {
  // Create the client used to publish events to the Event Grid Service
  const client = new EventGridPublisherClient(endpoint, "CloudEvent", new DefaultAzureCredential());

  // Send an event to the Event Grid Service, using the Cloud Event schema.
  // A random ID will be generated for this event, since one is not provided.
  await client.send([
    {
      type: "azure.sdk.eventgrid.samples.cloudevent",
      source: "/azure/sdk/eventgrid/samples/sendEventSample",
      data: {
        message: "this is a sample event",
      },
    },
  ]);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
