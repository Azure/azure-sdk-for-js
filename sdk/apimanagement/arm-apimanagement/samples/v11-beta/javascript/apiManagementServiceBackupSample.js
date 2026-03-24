// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a backup of the API Management service to the given Azure Storage Account. This is long running operation and could take several minutes to complete.
 *
 * @summary creates a backup of the API Management service to the given Azure Storage Account. This is long running operation and could take several minutes to complete.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementBackupWithAccessKey.json
 */
async function apiManagementBackupWithAccessKey() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiManagementService.backup("rg1", "apimService1", {
    accessKey: "**************************************************",
    accessType: "AccessKey",
    backupName: "apimService1backup_2017_03_19",
    containerName: "backupContainer",
    storageAccount: "teststorageaccount",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates a backup of the API Management service to the given Azure Storage Account. This is long running operation and could take several minutes to complete.
 *
 * @summary creates a backup of the API Management service to the given Azure Storage Account. This is long running operation and could take several minutes to complete.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementBackupWithSystemManagedIdentity.json
 */
async function apiManagementBackupWithSystemManagedIdentity() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiManagementService.backup("rg1", "apimService1", {
    accessType: "SystemAssignedManagedIdentity",
    backupName: "backup5",
    containerName: "apim-backups",
    storageAccount: "contosorpstorage",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates a backup of the API Management service to the given Azure Storage Account. This is long running operation and could take several minutes to complete.
 *
 * @summary creates a backup of the API Management service to the given Azure Storage Account. This is long running operation and could take several minutes to complete.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementBackupWithUserAssignedManagedIdentity.json
 */
async function apiManagementBackupWithUserAssignedManagedIdentity() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.apiManagementService.backup("rg1", "apimService1", {
    accessType: "UserAssignedManagedIdentity",
    backupName: "backup5",
    clientId: "XXXXX-a154-4830-XXXX-46a12da1a1e2",
    containerName: "apim-backups",
    storageAccount: "contosorpstorage",
  });
  console.log(result);
}

async function main() {
  await apiManagementBackupWithAccessKey();
  await apiManagementBackupWithSystemManagedIdentity();
  await apiManagementBackupWithUserAssignedManagedIdentity();
}

main().catch(console.error);
