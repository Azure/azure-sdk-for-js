// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates adding and removing users from groups
 */

const { WebPubSubServiceClient } = require("@azure/web-pubsub");

require("dotenv").config();

const chatHub = new WebPubSubServiceClient(process.env.WPS_CONNECTION_STRING, "chat");
const adminGroup = chatHub.group("admin");

async function main() {
  // adding and removing users
  await adminGroup.addUser("bterlson");
  await adminGroup.removeUser("xirzec");

  // adding and removing specific connections
  await adminGroup.addConnection("Tn3XcrAbHI0OE36XvbWwige4ac096c1");
  await adminGroup.removeConnection("Tn3XcrAbHI0OE36XvbWwige4ac096c1");
}

main().catch((e) => {
  console.error("Sample encountered an error", e);
  process.exit(1);
});
