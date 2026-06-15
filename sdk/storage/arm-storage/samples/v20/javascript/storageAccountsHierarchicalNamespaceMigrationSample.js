// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to live Migration of storage account to enable Hns
 *
 * @summary live Migration of storage account to enable Hns
 * x-ms-original-file: 2026-04-01/StorageAccountHierarchicalNamespaceMigration.json
 */
async function storageAccountHierarchicalNamespaceMigration() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  await client.storageAccounts.hierarchicalNamespaceMigration(
    "res4228",
    "sto2434",
    "HnsOnValidationRequest",
  );
}

async function main() {
  await storageAccountHierarchicalNamespaceMigration();
}

main().catch(console.error);
