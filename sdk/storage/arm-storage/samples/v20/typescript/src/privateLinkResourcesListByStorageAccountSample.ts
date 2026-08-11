// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the private link resources that need to be created for a storage account.
 *
 * @summary gets the private link resources that need to be created for a storage account.
 * x-ms-original-file: 2026-04-01/StorageAccountListPrivateLinkResources.json
 */
async function storageAccountListPrivateLinkResources(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.privateLinkResources.listByStorageAccount("res6977", "sto2527");
  console.log(result);
}

async function main(): Promise<void> {
  await storageAccountListPrivateLinkResources();
}

main().catch(console.error);
