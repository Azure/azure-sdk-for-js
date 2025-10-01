// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets the status of the ongoing migration for the specified storage account.
 *
 * @summary Gets the status of the ongoing migration for the specified storage account.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/StorageAccountGetMigrationFailed.json
 */
async function storageAccountGetMigrationFailed(): Promise<void> {
  const subscriptionId =
    process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName =
    process.env["STORAGE_RESOURCE_GROUP"] || "resource-group-name";
  const accountName = "accountname";
  const migrationName = "default";
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.storageAccounts.getCustomerInitiatedMigration(
    resourceGroupName,
    accountName,
    migrationName,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Gets the status of the ongoing migration for the specified storage account.
 *
 * @summary Gets the status of the ongoing migration for the specified storage account.
 * x-ms-original-file: specification/storage/resource-manager/Microsoft.Storage/stable/2025-01-01/examples/StorageAccountGetMigrationInProgress.json
 */
async function storageAccountGetMigrationInProgress(): Promise<void> {
  const subscriptionId =
    process.env["STORAGE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName =
    process.env["STORAGE_RESOURCE_GROUP"] || "resource-group-name";
  const accountName = "accountname";
  const migrationName = "default";
  const credential = new DefaultAzureCredential();
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.storageAccounts.getCustomerInitiatedMigration(
    resourceGroupName,
    accountName,
    migrationName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await storageAccountGetMigrationFailed();
  await storageAccountGetMigrationInProgress();
}

main().catch(console.error);
