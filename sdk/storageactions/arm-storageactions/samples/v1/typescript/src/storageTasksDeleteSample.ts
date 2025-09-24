// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageActionsManagementClient } from "@azure/arm-storageactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete the storage task resource.
 *
 * @summary delete the storage task resource.
 * x-ms-original-file: 2023-01-01/storageTasksCrud/DeleteStorageTask.json
 */
async function deleteStorageTask(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1f31ba14-ce16-4281-b9b4-3e78da6e1616";
  const client = new StorageActionsManagementClient(credential, subscriptionId);
  await client.storageTasks.delete("res4228", "mytask1");
}

async function main(): Promise<void> {
  await deleteStorageTask();
}

main().catch(console.error);
