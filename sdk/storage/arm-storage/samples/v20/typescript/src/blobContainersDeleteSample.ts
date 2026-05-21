// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes specified container under its account.
 *
 * @summary deletes specified container under its account.
 * x-ms-original-file: 2025-08-01/BlobContainersDelete.json
 */
async function deleteContainers(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  await client.blobContainers.delete("res4079", "sto4506", "container9689");
}

async function main(): Promise<void> {
  await deleteContainers();
}

main().catch(console.error);
