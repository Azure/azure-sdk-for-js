// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubServiceClient } from "@azure/web-pubsub";

/**
 * This sample demonstrates how to add filtered connections to multiple groups.
 *
 * @summary Add filtered connections to multiple groups.
 */
async function main(): Promise<void> {
  const hubName = "myHub";
  const serviceClient = new WebPubSubServiceClient(
    process.env.WPS_CONNECTION_STRING || "<ConnectionString>",
    hubName,
  );

  await serviceClient.addConnectionsToGroups(["group1", "group2"], "userId ne 'user1'");
}

main().catch(console.error);
