// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MySQLManagementFlexibleServerClient } = require("@azure/arm-mysql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates an existing server. The request body can contain one to many of the properties present in the normal server definition.
 *
 * @summary updates an existing server. The request body can contain one to many of the properties present in the normal server definition.
 * x-ms-original-file: 2024-12-30/MaintenancePolicyPatchOptInVirtualCanary.json
 */
async function updateServerToOptInVirtualCanary() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.servers.update("testrg", "mysqltestserver", {
    properties: { maintenancePolicy: { patchStrategy: "VirtualCanary" } },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing server. The request body can contain one to many of the properties present in the normal server definition.
 *
 * @summary updates an existing server. The request body can contain one to many of the properties present in the normal server definition.
 * x-ms-original-file: 2024-12-30/MaintenancePolicyPatchOptOutVirtualCanary.json
 */
async function updateServerToOptOutVirtualCanary() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.servers.update("testrg", "mysqltestserver", {
    properties: { maintenancePolicy: { patchStrategy: "Default" } },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing server. The request body can contain one to many of the properties present in the normal server definition.
 *
 * @summary updates an existing server. The request body can contain one to many of the properties present in the normal server definition.
 * x-ms-original-file: 2024-12-30/ServerUpdate.json
 */
async function updateAServer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.servers.update("testrg", "mysqltestserver", {
    properties: {
      network: { publicNetworkAccess: "Disabled" },
      storage: {
        autoGrow: "Disabled",
        autoIoScaling: "Disabled",
        iops: 200,
        storageRedundancy: "LocalRedundancy",
        storageSizeGB: 30,
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing server. The request body can contain one to many of the properties present in the normal server definition.
 *
 * @summary updates an existing server. The request body can contain one to many of the properties present in the normal server definition.
 * x-ms-original-file: 2024-12-30/ServerUpdateWithBYOK.json
 */
async function updateServerWithByok() {
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
    properties: {
      dataEncryption: {
        type: "AzureKeyVault",
        geoBackupKeyURI:
          "https://test-geo.vault.azure.net/keys/key/c8a92236622244c0a4fdb892666f671a",
        geoBackupUserAssignedIdentityId:
          "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/testrg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/test-geo-identity",
        primaryKeyURI: "https://test.vault.azure.net/keys/key/c8a92236622244c0a4fdb892666f671a",
        primaryUserAssignedIdentityId:
          "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/testrg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/test-identity",
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing server. The request body can contain one to many of the properties present in the normal server definition.
 *
 * @summary updates an existing server. The request body can contain one to many of the properties present in the normal server definition.
 * x-ms-original-file: 2024-12-30/ServerUpdateWithCustomerMaintenanceWindow.json
 */
async function updateServerCustomerMaintenanceWindow() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.servers.update("testrg", "mysqltestserver", {
    properties: {
      maintenanceWindow: {
        batchOfMaintenance: "Batch1",
        customWindow: "Enabled",
        dayOfWeek: 1,
        startHour: 8,
        startMinute: 0,
      },
    },
  });
  console.log(result);
}

async function main() {
  await updateServerToOptInVirtualCanary();
  await updateServerToOptOutVirtualCanary();
  await updateAServer();
  await updateServerWithByok();
  await updateServerCustomerMaintenanceWindow();
}

main().catch(console.error);
