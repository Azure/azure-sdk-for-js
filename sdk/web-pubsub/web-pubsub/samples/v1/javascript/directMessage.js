// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates sending messages directly to a user or connection.
 */

const { WebPubSubServiceClient } = require("@azure/web-pubsub");

const dotenv = require("dotenv");
dotenv.config();

const chatHub = new WebPubSubServiceClient(process.env.WPS_CONNECTION_STRING, "chat");

async function main() {
  // send a text message directly to a user
  await chatHub.sendToUser("bterlson", "Hi there!");

  // send a text message to a specific connection
  await chatHub.sendToUser("Tn3XcrAbHI0OE36XvbWwige4ac096c1", "Hi there!");
}

main();
