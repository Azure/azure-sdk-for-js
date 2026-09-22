// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubManagementClient } from "@azure/arm-webpubsub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the replica and its properties.
 *
 * @summary get the replica and its properties.
 * x-ms-original-file: 2025-08-01-preview/WebPubSubReplicas_Get.json
 */
async function webPubSubReplicasGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebPubSubManagementClient(credential, subscriptionId);
  const result = await client.webPubSubReplicas.get(
    "myResourceGroup",
    "myWebPubSubService",
    "myWebPubSubService-eastus",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await webPubSubReplicasGet();
}

main().catch(console.error);
