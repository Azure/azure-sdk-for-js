// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Registers the container with Recovery Services vault.
This is an asynchronous operation. To track the operation status, use location header to call get latest status of
the operation.
 *
 * @summary Registers the container with Recovery Services vault.
This is an asynchronous operation. To track the operation status, use location header to call get latest status of
the operation.
 * x-ms-original-file: specification/recoveryservicesbackup/resource-manager/Microsoft.RecoveryServices/stable/2025-02-01/examples/AzureStorage/ProtectionContainers_Register.json
 */

import {
  ProtectionContainerResource,
  RecoveryServicesBackupClient,
} from "@azure/arm-recoveryservicesbackup";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function registerAzureStorageProtectionContainers(): Promise<void> {
  const subscriptionId =
    process.env["RECOVERYSERVICESBACKUP_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const vaultName = "swaggertestvault";
  const resourceGroupName =
    process.env["RECOVERYSERVICESBACKUP_RESOURCE_GROUP"] || "SwaggerTestRg";
  const fabricName = "Azure";
  const containerName = "StorageContainer;Storage;SwaggerTestRg;swaggertestsa";
  const parameters: ProtectionContainerResource = {
    properties: {
      acquireStorageAccountLock: "Acquire",
      backupManagementType: "AzureStorage",
      containerType: "StorageContainer",
      friendlyName: "swaggertestsa",
      sourceResourceId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/SwaggerTestRg/providers/Microsoft.Storage/storageAccounts/swaggertestsa",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new RecoveryServicesBackupClient(credential, subscriptionId);
  const result = await client.protectionContainers.beginRegisterAndWait(
    vaultName,
    resourceGroupName,
    fabricName,
    containerName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await registerAzureStorageProtectionContainers();
}

main().catch(console.error);
