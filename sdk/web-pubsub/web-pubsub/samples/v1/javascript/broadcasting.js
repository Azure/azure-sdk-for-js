// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates broadcasting messages to a hub and a group
 */

const { WebPubSubServiceClient } = require("@azure/web-pubsub");

require("dotenv").config();

const chatHub = new WebPubSubServiceClient(process.env.WPS_CONNECTION_STRING, "chat");

async function main() {
  // send a text message to the entire hub
  await chatHub.sendToAll("Hi there!");

  // send a text message to a particular group
  const adminGroup = chatHub.group("admin");
  await adminGroup.sendToAll("Hi admins!");

  // send binary data to the entire hub
  const data = new Uint8Array(10);
  for (let i = 0; i < 10; i++) {
    data[i] = i;
  }
  chatHub.sendToAll(data.buffer);
}

main().catch((e) => {
  console.error("Sample encountered an error", e);
  process.exit(1);
});
