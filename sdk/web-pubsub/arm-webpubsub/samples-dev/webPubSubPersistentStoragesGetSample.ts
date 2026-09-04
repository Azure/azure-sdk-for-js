// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubManagementClient } from "@azure/arm-webpubsub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a persistent storage.
 *
 * @summary get a persistent storage.
 * x-ms-original-file: 2025-12-01-preview/WebPubSubPersistentStorages_Get.json
 */
async function webPubSubPersistentStoragesGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebPubSubManagementClient(credential, subscriptionId);
  const result = await client.webPubSubPersistentStorages.get(
    "myResourceGroup",
    "myWebPubSubService",
    "example",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await webPubSubPersistentStoragesGet();
}

main().catch(console.error);
