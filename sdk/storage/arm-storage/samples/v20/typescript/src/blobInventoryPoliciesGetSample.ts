// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the blob inventory policy associated with the specified storage account.
 *
 * @summary gets the blob inventory policy associated with the specified storage account.
 * x-ms-original-file: 2025-08-01/StorageAccountGetBlobInventoryPolicy.json
 */
async function storageAccountGetBlobInventoryPolicy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.blobInventoryPolicies.get("res7687", "sto9699", "default");
  console.log(result);
}

async function main(): Promise<void> {
  await storageAccountGetBlobInventoryPolicy();
}

main().catch(console.error);
