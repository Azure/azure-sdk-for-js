// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIVMManagementClient } from "@azure/arm-azurestackhcivm";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to delete a storage container.
 *
 * @summary the operation to delete a storage container.
 * x-ms-original-file: 2025-06-01-preview/StorageContainers_Delete.json
 */
async function deleteStorageContainer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIVMManagementClient(credential, subscriptionId);
  await client.storageContainers.delete("test-rg", "Default_Container");
}

async function main(): Promise<void> {
  await deleteStorageContainer();
}

main().catch(console.error);
