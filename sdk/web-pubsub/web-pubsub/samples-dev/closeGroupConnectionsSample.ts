// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubServiceClient } from "@azure/web-pubsub";

/**
 * This sample demonstrates how to close all connections in a group.
 *
 * @summary Close all connections in a group.
 */
async function main(): Promise<void> {
  const hubName = "myHub";
  const serviceClient = new WebPubSubServiceClient(
    process.env.WPS_CONNECTION_STRING || "<ConnectionString>",
    hubName,
  );

  const group = serviceClient.group("myGroup");
  await group.closeAllConnections({ reason: "closing group connections" });
}

main().catch(console.error);
