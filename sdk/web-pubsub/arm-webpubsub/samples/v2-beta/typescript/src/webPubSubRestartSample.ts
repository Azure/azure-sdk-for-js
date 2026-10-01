// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubManagementClient } from "@azure/arm-webpubsub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to operation to restart a resource.
 *
 * @summary operation to restart a resource.
 * x-ms-original-file: 2025-08-01-preview/WebPubSub_Restart.json
 */
async function webPubSubRestart(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebPubSubManagementClient(credential, subscriptionId);
  await client.webPubSub.restart("myResourceGroup", "myWebPubSubService");
}

async function main(): Promise<void> {
  await webPubSubRestart();
}

main().catch(console.error);
