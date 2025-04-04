// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates sending messages directly to a user or connection.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { WebPubSubServiceClient } = require("@azure/web-pubsub");
require("dotenv/config");

const endpoint = process.env.WPS_ENDPOINT || "";

const chatHub = new WebPubSubServiceClient(endpoint, new DefaultAzureCredential(), "chat");

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
