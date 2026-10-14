// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubManagementClient } from "@azure/arm-webpubsub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a persistent storage.
 *
 * @summary create or update a persistent storage.
 * x-ms-original-file: 2025-12-01-preview/WebPubSubPersistentStorages_CreateOrUpdate.json
 */
async function webPubSubPersistentStoragesCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new WebPubSubManagementClient(credential, subscriptionId);
  const result = await client.webPubSubPersistentStorages.createOrUpdate(
    "myResourceGroup",
    "myWebPubSubService",
    "myStor",
    {
      storageAccount: {
        id: "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/myResourceGroup/providers/Microsoft.Storage/storageAccounts/myStorageAccount",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await webPubSubPersistentStoragesCreateOrUpdate();
}

main().catch(console.error);
