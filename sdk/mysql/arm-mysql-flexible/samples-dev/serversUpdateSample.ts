// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MySQLManagementFlexibleServerClient } from "@azure/arm-mysql-flexible";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates an existing server. The request body can contain one to many of the properties present in the normal server definition.
 *
 * @summary updates an existing server. The request body can contain one to many of the properties present in the normal server definition.
 * x-ms-original-file: 2025-06-01-preview/MaintenancePolicyPatchOptInVirtualCanary.json
 */
async function updateServerToOptInVirtualCanary(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.servers.update("testrg", "mysqltestserver", {
    maintenancePolicy: { patchStrategy: "VirtualCanary" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing server. The request body can contain one to many of the properties present in the normal server definition.
 *
 * @summary updates an existing server. The request body can contain one to many of the properties present in the normal server definition.
 * x-ms-original-file: 2025-06-01-preview/MaintenancePolicyPatchOptOutVirtualCanary.json
 */
async function updateServerToOptOutVirtualCanary(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.servers.update("testrg", "mysqltestserver", {
    maintenancePolicy: { patchStrategy: "Default" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing server. The request body can contain one to many of the properties present in the normal server definition.
 *
 * @summary updates an existing server. The request body can contain one to many of the properties present in the normal server definition.
 * x-ms-original-file: 2025-06-01-preview/ServerUpdate.json
 */
async function updateAServer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.servers.update("testrg", "mysqltestserver", {
    network: { publicNetworkAccess: "Disabled" },
    storage: {
      autoGrow: "Disabled",
      autoIoScaling: "Disabled",
      iops: 200,
      storageRedundancy: "LocalRedundancy",
      storageSizeGB: 30,
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing server. The request body can contain one to many of the properties present in the normal server definition.
 *
 * @summary updates an existing server. The request body can contain one to many of the properties present in the normal server definition.
 * x-ms-original-file: 2025-06-01-preview/ServerUpdateWithBYOK.json
 */
async function updateServerWithByok(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.servers.update("testrg", "mysqltestserver", {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/testrg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/test-identity":
          {},
      },
    },
    dataEncryption: {
      type: "AzureKeyVault",
      geoBackupKeyURI: "https://test-geo.vault.azure.net/keys/key/c8a92236622244c0a4fdb892666f671a",
      geoBackupUserAssignedIdentityId:
        "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/testrg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/test-geo-identity",
      primaryKeyURI: "https://test.vault.azure.net/keys/key/c8a92236622244c0a4fdb892666f671a",
      primaryUserAssignedIdentityId:
        "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/testrg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/test-identity",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing server. The request body can contain one to many of the properties present in the normal server definition.
 *
 * @summary updates an existing server. The request body can contain one to many of the properties present in the normal server definition.
 * x-ms-original-file: 2025-06-01-preview/ServerUpdateWithCustomerMaintenanceWindow.json
 */
async function updateServerCustomerMaintenanceWindow(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.servers.update("testrg", "mysqltestserver", {
    maintenanceWindow: {
      batchOfMaintenance: "Batch1",
      customWindow: "Enabled",
      dayOfWeek: 1,
      startHour: 8,
      startMinute: 0,
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateServerToOptInVirtualCanary();
  await updateServerToOptOutVirtualCanary();
  await updateAServer();
  await updateServerWithByok();
  await updateServerCustomerMaintenanceWindow();
}

main().catch(console.error);
