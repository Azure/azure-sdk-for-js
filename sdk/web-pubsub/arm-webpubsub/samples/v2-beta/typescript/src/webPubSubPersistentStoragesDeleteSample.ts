// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubManagementClient } from "@azure/arm-webpubsub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a persistent storage.
 *
 * @summary delete a persistent storage.
 * x-ms-original-file: 2025-12-01-preview/WebPubSubPersistentStorages_Delete.json
 */
async function webPubSubPersistentStoragesDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebPubSubManagementClient(credential, subscriptionId);
  await client.webPubSubPersistentStorages.delete(
    "myResourceGroup",
    "myWebPubSubService",
    "example",
  );
}

async function main(): Promise<void> {
  await webPubSubPersistentStoragesDelete();
}

main().catch(console.error);
