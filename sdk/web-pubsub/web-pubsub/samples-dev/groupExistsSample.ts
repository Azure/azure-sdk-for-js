// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubServiceClient } from "@azure/web-pubsub";

/**
 * This sample demonstrates how to check if a group exists (has active connections).
 *
 * @summary Check if a group exists.
 */
async function main(): Promise<void> {
  const hubName = "myHub";
  const serviceClient = new WebPubSubServiceClient(
    process.env.WPS_CONNECTION_STRING || "<ConnectionString>",
    hubName,
  );

  const exists = await serviceClient.groupExists("myGroup");
  console.log(`Group exists: ${exists}`);
}

main().catch(console.error);
