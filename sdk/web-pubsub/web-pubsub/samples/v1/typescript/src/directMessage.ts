// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates sending messages directly to a user or connection.
 */

import { DefaultAzureCredential } from "@azure/identity";
import { WebPubSubServiceClient } from "@azure/web-pubsub";
import "dotenv/config";

const endpoint = process.env.WPS_ENDPOINT || "";

const chatHub = new WebPubSubServiceClient(endpoint, new DefaultAzureCredential(), "chat");

async function main(): Promise<void> {
  // send a text message directly to a user
  await chatHub.sendToUser("bterlson", "Hi there!");

  // send a text message to a specific connection
  await chatHub.sendToConnection("Tn3XcrAbHI0OE36XvbWwige4ac096c1", "Hi there!");
}

main().catch((e) => {
  console.error("Sample encountered an error", e);
  process.exit(1);
});
