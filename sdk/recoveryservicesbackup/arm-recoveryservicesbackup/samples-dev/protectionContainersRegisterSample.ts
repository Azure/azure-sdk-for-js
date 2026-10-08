// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesBackupClient } from "@azure/arm-recoveryservicesbackup";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to registers the container with Recovery Services vault.
 * This is an asynchronous operation. To track the operation status, use location header to call get latest status of
 * the operation.
 *
 * @summary registers the container with Recovery Services vault.
 * This is an asynchronous operation. To track the operation status, use location header to call get latest status of
 * the operation.
 * x-ms-original-file: 2026-08-01/AzureStorage/ProtectionContainers_ReRegister_SwitchToSAMI.json
 */
async function reRegisterAzureStorageProtectionContainersSwitchingToSystemAssignedManagedIdentity(): Promise<void> {
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
        operationType: "Reregister",
        accessType: "IdentityBased",
        identityInfo: { isSystemAssignedIdentity: true },
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to registers the container with Recovery Services vault.
 * This is an asynchronous operation. To track the operation status, use location header to call get latest status of
 * the operation.
 *
 * @summary registers the container with Recovery Services vault.
 * This is an asynchronous operation. To track the operation status, use location header to call get latest status of
 * the operation.
 * x-ms-original-file: 2026-08-01/AzureStorage/ProtectionContainers_ReRegister_SwitchToUAMI.json
 */
async function reRegisterAzureStorageProtectionContainersSwitchingToUserAssignedManagedIdentity(): Promise<void> {
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
        operationType: "Reregister",
        accessType: "IdentityBased",
        identityInfo: {
          isSystemAssignedIdentity: false,
          managedIdentityResourceId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/SwaggerTestRg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/swaggertestuami",
        },
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to registers the container with Recovery Services vault.
 * This is an asynchronous operation. To track the operation status, use location header to call get latest status of
 * the operation.
 *
 * @summary registers the container with Recovery Services vault.
 * This is an asynchronous operation. To track the operation status, use location header to call get latest status of
 * the operation.
 * x-ms-original-file: 2026-08-01/AzureStorage/ProtectionContainers_Register.json
 */
async function registerAzureStorageProtectionContainers(): Promise<void> {
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

/**
 * This sample demonstrates how to registers the container with Recovery Services vault.
 * This is an asynchronous operation. To track the operation status, use location header to call get latest status of
 * the operation.
 *
 * @summary registers the container with Recovery Services vault.
 * This is an asynchronous operation. To track the operation status, use location header to call get latest status of
 * the operation.
 * x-ms-original-file: 2026-08-01/AzureStorage/ProtectionContainers_Register_WithSAMI.json
 */
async function registerAzureStorageProtectionContainersWithSystemAssignedManagedIdentity(): Promise<void> {
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
        accessType: "IdentityBased",
        identityInfo: { isSystemAssignedIdentity: true },
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to registers the container with Recovery Services vault.
 * This is an asynchronous operation. To track the operation status, use location header to call get latest status of
 * the operation.
 *
 * @summary registers the container with Recovery Services vault.
 * This is an asynchronous operation. To track the operation status, use location header to call get latest status of
 * the operation.
 * x-ms-original-file: 2026-08-01/AzureStorage/ProtectionContainers_Register_WithUAMI.json
 */
async function registerAzureStorageProtectionContainersWithUserAssignedManagedIdentity(): Promise<void> {
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
        accessType: "IdentityBased",
        identityInfo: {
          isSystemAssignedIdentity: false,
          managedIdentityResourceId:
            "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/SwaggerTestRg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/swaggertestuami",
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await reRegisterAzureStorageProtectionContainersSwitchingToSystemAssignedManagedIdentity();
  await reRegisterAzureStorageProtectionContainersSwitchingToUserAssignedManagedIdentity();
  await registerAzureStorageProtectionContainers();
  await registerAzureStorageProtectionContainersWithSystemAssignedManagedIdentity();
  await registerAzureStorageProtectionContainersWithUserAssignedManagedIdentity();
}

main().catch(console.error);
