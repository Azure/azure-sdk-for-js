// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a storage account in Microsoft Azure.
 *
 * @summary deletes a storage account in Microsoft Azure.
 * x-ms-original-file: 2026-04-01/StorageAccountDelete.json
 */
async function storageAccountDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  await client.storageAccounts.delete("res4228", "sto2434");
}

async function main(): Promise<void> {
  await storageAccountDelete();
}

main().catch(console.error);
