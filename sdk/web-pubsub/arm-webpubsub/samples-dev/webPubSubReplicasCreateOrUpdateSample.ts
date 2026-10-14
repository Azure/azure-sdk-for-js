// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubManagementClient } from "@azure/arm-webpubsub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a replica.
 *
 * @summary create or update a replica.
 * x-ms-original-file: 2025-12-01-preview/WebPubSubReplicas_CreateOrUpdate.json
 */
async function webPubSubReplicasCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebPubSubManagementClient(credential, subscriptionId);
  const result = await client.webPubSubReplicas.createOrUpdate(
    "myResourceGroup",
    "myWebPubSubService",
    "myWebPubSubService-eastus",
    {
      sku: { name: "Premium_P1", tier: "Premium", capacity: 1 },
      resourceStopped: "false",
      location: "eastus",
      tags: { key1: "value1" },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await webPubSubReplicasCreateOrUpdate();
}

main().catch(console.error);
