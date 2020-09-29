// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { EventGridPublisherClient, AzureKeyCredential } from "@azure/eventgrid";
import * as dotenv from "dotenv";

// Load the .env file if it exists
dotenv.config();

// The URL of the endpoint of the Event Grid topic. 
const endpoint = process.env["EVENT_GRID_ENDPOINT"] || "";

// You can find the access keys in the Azure portal.
// Navigate to Settings > Access keys in your Event Grid topic's menu blade to see both access keys (you may use either).
const accessKey = process.env["EVENT_GRID_ACCESS_KEY"] || "";

async function main(): Promise<void> {    
  // Create the client used to publish events to the Event Grid Service
  const client = new EventGridPublisherClient(endpoint, new AzureKeyCredential(accessKey));

  // Send an event to the Event Grid Service, using the Event Grid schema.
  // A random ID will be generated for this event, since one is not provided.
  await client.sendEvents([
    {
      eventType: "Azure.SDK.Samples.CustomEvent",
      subject: "azure/sdk/eventgrid/samples/sendEventSample",
      dataVersion: "1.0",
      data: {
        message: "this is a sample event",
      }
    }
  ]);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
