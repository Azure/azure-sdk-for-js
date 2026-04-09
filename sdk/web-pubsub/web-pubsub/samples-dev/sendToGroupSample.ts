// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubServiceClient } from "@azure/web-pubsub";

/**
 * This sample demonstrates how to send a message to a group.
 *
 * @summary Send a message to a group.
 */
async function main(): Promise<void> {
  const hubName = "myHub";
  const serviceClient = new WebPubSubServiceClient(
    process.env.WPS_CONNECTION_STRING || "<ConnectionString>",
    hubName,
  );

  const group = serviceClient.group("myGroup");
  await group.sendToAll({ greeting: "hello group" });
}

main().catch(console.error);
