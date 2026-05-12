// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to live Migration of storage account to enable Hns
 *
 * @summary live Migration of storage account to enable Hns
 * x-ms-original-file: 2025-08-01/StorageAccountHierarchicalNamespaceMigration.json
 */
async function storageAccountHierarchicalNamespaceMigration(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  await client.storageAccounts.hierarchicalNamespaceMigration(
    "res4228",
    "sto2434",
    "HnsOnValidationRequest",
  );
}

async function main(): Promise<void> {
  await storageAccountHierarchicalNamespaceMigration();
}

main().catch(console.error);
