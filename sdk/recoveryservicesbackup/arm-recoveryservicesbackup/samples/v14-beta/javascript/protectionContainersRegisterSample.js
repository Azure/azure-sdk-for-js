// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { RecoveryServicesBackupClient } = require("@azure/arm-recoveryservicesbackup");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to registers the container with Recovery Services vault.
 * This is an asynchronous operation. To track the operation status, use location header to call get latest status of
 * the operation.
 *
 * @summary registers the container with Recovery Services vault.
 * This is an asynchronous operation. To track the operation status, use location header to call get latest status of
 * the operation.
 * x-ms-original-file: 2026-01-01-preview/AzureStorage/ProtectionContainers_Register.json
 */
async function registerAzureStorageProtectionContainers() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.protectionContainers.register(
    "swaggertestvault",
    "SwaggerTestRg",
    "Azure",
    "StorageContainer;Storage;SwaggerTestRg;swaggertestsa",
    {
      properties: {
        acquireStorageAccountLock: "Acquire",
        backupManagementType: "AzureStorage",
        containerType: "StorageContainer",
        friendlyName: "swaggertestsa",
        sourceResourceId:
          "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/SwaggerTestRg/providers/Microsoft.Storage/storageAccounts/swaggertestsa",
      },
    },
  );
  console.log(result);
}

async function main() {
  await registerAzureStorageProtectionContainers();
}

main().catch(console.error);
