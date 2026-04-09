// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubServiceClient } from "@azure/web-pubsub";

/**
 * This sample demonstrates how to broadcast a message to all connections on a hub.
 *
 * @summary Broadcast a message to all connections on a hub.
 */
async function main(): Promise<void> {
  const hubName = "myHub";
  const serviceClient = new WebPubSubServiceClient(
    process.env.WPS_CONNECTION_STRING || "<ConnectionString>",
    hubName,
  );

  // Send a JSON message
  await serviceClient.sendToAll({ greeting: "hello world" });

  // Send a text message
  await serviceClient.sendToAll("hello world", { contentType: "text/plain" });
}

main().catch(console.error);
