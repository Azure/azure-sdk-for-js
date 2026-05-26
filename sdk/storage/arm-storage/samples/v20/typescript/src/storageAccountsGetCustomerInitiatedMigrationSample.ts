// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the status of the ongoing migration for the specified storage account.
 *
 * @summary gets the status of the ongoing migration for the specified storage account.
 * x-ms-original-file: 2025-08-01/StorageAccountGetMigrationFailed.json
 */
async function storageAccountGetMigrationFailed(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.storageAccounts.getCustomerInitiatedMigration(
    "resource-group-name",
    "accountname",
    "default",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets the status of the ongoing migration for the specified storage account.
 *
 * @summary gets the status of the ongoing migration for the specified storage account.
 * x-ms-original-file: 2025-08-01/StorageAccountGetMigrationInProgress.json
 */
async function storageAccountGetMigrationInProgress(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.storageAccounts.getCustomerInitiatedMigration(
    "resource-group-name",
    "accountname",
    "default",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await storageAccountGetMigrationFailed();
  await storageAccountGetMigrationInProgress();
}

main().catch(console.error);
