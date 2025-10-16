// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageManagementClient } = require("@azure/arm-storage");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Abort live Migration of storage account to enable Hns
 *
 * @summary Abort live Migration of storage account to enable Hns
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/StorageAccountAbortHierarchicalNamespaceMigration.json
 */
async function storageAccountAbortHierarchicalNamespaceMigration() {
  const subscriptionId = process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res4228";
  const accountName = "sto2434";
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.storageAccounts.beginAbortHierarchicalNamespaceMigrationAndWait(
    resourceGroupName,
    accountName,
  );
  console.log(result);
}

async function main() {
  await storageAccountAbortHierarchicalNamespaceMigration();
}

main().catch(console.error);
