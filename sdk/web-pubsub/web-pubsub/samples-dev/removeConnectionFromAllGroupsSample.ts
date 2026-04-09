// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubServiceClient } from "@azure/web-pubsub";

/**
 * This sample demonstrates how to remove a connection from all groups.
 *
 * @summary Remove a connection from all groups.
 */
async function main(): Promise<void> {
  const hubName = "myHub";
  const serviceClient = new WebPubSubServiceClient(
    process.env.WPS_CONNECTION_STRING || "<ConnectionString>",
    hubName,
  );

  await serviceClient.removeConnectionFromAllGroups("connectionId");
}

main().catch(console.error);
