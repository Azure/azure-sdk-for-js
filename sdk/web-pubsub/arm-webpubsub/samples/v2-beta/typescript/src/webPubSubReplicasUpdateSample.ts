// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubManagementClient } from "@azure/arm-webpubsub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to operation to update an exiting replica.
 *
 * @summary operation to update an exiting replica.
 * x-ms-original-file: 2025-08-01-preview/WebPubSubReplicas_Update.json
 */
async function webPubSubReplicasUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebPubSubManagementClient(credential, subscriptionId);
  const result = await client.webPubSubReplicas.update(
    "myResourceGroup",
    "myWebPubSubService",
    "myWebPubSubService-eastus",
    {
      location: "eastus",
      resourceStopped: "false",
      sku: { name: "Premium_P1", capacity: 1, tier: "Premium" },
      tags: { key1: "value1" },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await webPubSubReplicasUpdate();
}

main().catch(console.error);
