// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubServiceClient } from "@azure/web-pubsub";

/**
 * This sample demonstrates how to check if a connection has a specific permission.
 *
 * @summary Check if a connection has a specific permission.
 */
async function main(): Promise<void> {
  const hubName = "myHub";
  const serviceClient = new WebPubSubServiceClient(
    process.env.WPS_CONNECTION_STRING || "<ConnectionString>",
    hubName,
  );

  const hasPermission = await serviceClient.hasPermission("connectionId", "joinLeaveGroup", {
    targetName: "myGroup",
  });
  console.log(`Has permission: ${hasPermission}`);
}

main().catch(console.error);
