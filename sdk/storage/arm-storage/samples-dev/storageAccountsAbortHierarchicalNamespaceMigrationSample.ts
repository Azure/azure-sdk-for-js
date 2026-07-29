// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to abort live Migration of storage account to enable Hns
 *
 * @summary abort live Migration of storage account to enable Hns
 * x-ms-original-file: 2026-04-01/StorageAccountAbortHierarchicalNamespaceMigration.json
 */
async function storageAccountAbortHierarchicalNamespaceMigration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  await client.storageAccounts.abortHierarchicalNamespaceMigration("res4228", "sto2434");
}

async function main(): Promise<void> {
  await storageAccountAbortHierarchicalNamespaceMigration();
}

main().catch(console.error);
