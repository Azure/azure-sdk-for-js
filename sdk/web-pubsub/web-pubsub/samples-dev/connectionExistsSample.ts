// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubServiceClient } from "@azure/web-pubsub";

/**
 * This sample demonstrates how to check if a connection exists.
 *
 * @summary Check if a connection exists.
 */
async function main(): Promise<void> {
  const hubName = "myHub";
  const serviceClient = new WebPubSubServiceClient(
    process.env.WPS_CONNECTION_STRING || "<ConnectionString>",
    hubName,
  );

  const exists = await serviceClient.connectionExists("connectionId");
  console.log(`Connection exists: ${exists}`);
}

main().catch(console.error);
