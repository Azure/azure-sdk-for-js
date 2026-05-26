// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to abort live Migration of storage account to enable Hns
 *
 * @summary abort live Migration of storage account to enable Hns
 * x-ms-original-file: 2025-08-01/StorageAccountAbortHierarchicalNamespaceMigration.json
 */
async function storageAccountAbortHierarchicalNamespaceMigration() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  await client.storageAccounts.abortHierarchicalNamespaceMigration("res4228", "sto2434");
}

async function main() {
  await storageAccountAbortHierarchicalNamespaceMigration();
}

main().catch(console.error);
