// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates sending messages directly to a user or connection.
 */

import { WebPubSubServiceClient } from "@azure/web-pubsub";

import * as dotenv from "dotenv";
dotenv.config();

const chatHub = new WebPubSubServiceClient(process.env.WPS_CONNECTION_STRING!, "chat");

async function main() {
  // send a text message directly to a user
  await chatHub.sendToUser("bterlson", "Hi there!");

  // send a text message to a specific connection
  await chatHub.sendToConnection("Tn3XcrAbHI0OE36XvbWwige4ac096c1", "Hi there!");
}

main().catch((e) => {
  console.error("Sample encountered an error", e);
  process.exit(1);
});
