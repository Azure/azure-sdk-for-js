// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubServiceClient } from "@azure/web-pubsub";

/**
 * This sample demonstrates how to close all connections for a specific user.
 *
 * @summary Close all connections for a specific user.
 */
async function main(): Promise<void> {
  const hubName = "myHub";
  const serviceClient = new WebPubSubServiceClient(
    process.env.WPS_CONNECTION_STRING || "<ConnectionString>",
    hubName,
  );

  await serviceClient.closeUserConnections("user1", { reason: "closing user connections" });
}

main().catch(console.error);
