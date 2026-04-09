// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubServiceClient } from "@azure/web-pubsub";

/**
 * This sample demonstrates how to send a message to a specific connection.
 *
 * @summary Send a message to a specific connection.
 */
async function main(): Promise<void> {
  const hubName = "myHub";
  const serviceClient = new WebPubSubServiceClient(
    process.env.WPS_CONNECTION_STRING || "<ConnectionString>",
    hubName,
  );

  await serviceClient.sendToConnection("connectionId", { greeting: "hello connection" });
}

main().catch(console.error);
