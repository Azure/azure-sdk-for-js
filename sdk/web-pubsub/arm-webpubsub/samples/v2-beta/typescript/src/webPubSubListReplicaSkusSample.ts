// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubManagementClient } from "@azure/arm-webpubsub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all available skus of the replica resource.
 *
 * @summary list all available skus of the replica resource.
 * x-ms-original-file: 2025-08-01-preview/WebPubSub_ListReplicaSkus.json
 */
async function webPubSubListReplicaSkus(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebPubSubManagementClient(credential, subscriptionId);
  const result = await client.webPubSub.listReplicaSkus(
    "myResourceGroup",
    "myWebPubSubService",
    "myWebPubSubService-eastus",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await webPubSubListReplicaSkus();
}

main().catch(console.error);
