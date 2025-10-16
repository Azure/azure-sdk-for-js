// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Abort live Migration of storage account to enable Hns
 *
 * @summary Abort live Migration of storage account to enable Hns
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/StorageAccountAbortHierarchicalNamespaceMigration.json
 */
async function storageAccountAbortHierarchicalNamespaceMigration(): Promise<void> {
  const subscriptionId =
    process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["STORAGE_RESOURCE_GROUP"] || "res4228";
  const accountName = "sto2434";
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result =
    await client.storageAccounts.beginAbortHierarchicalNamespaceMigrationAndWait(
      resourceGroupName,
      accountName,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await storageAccountAbortHierarchicalNamespaceMigration();
}

main().catch(console.error);
