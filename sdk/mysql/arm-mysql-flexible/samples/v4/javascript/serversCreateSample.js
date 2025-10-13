// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MySQLManagementFlexibleServerClient } = require("@azure/arm-mysql-flexible");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a new server or updates an existing server. The update action will overwrite the existing server.
 *
 * @summary creates a new server or updates an existing server. The update action will overwrite the existing server.
 * x-ms-original-file: 2024-12-30/ServerCreate.json
 */
async function createANewServer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.servers.create("testrg", "mysqltestserver", {
    location: "southeastasia",
    properties: {
      administratorLogin: "cloudsa",
      administratorLoginPassword: "your_password",
      availabilityZone: "1",
      backup: {
        backupIntervalHours: 24,
        backupRetentionDays: 7,
        geoRedundantBackup: "Disabled",
      },
      createMode: "Default",
      highAvailability: { mode: "ZoneRedundant", standbyAvailabilityZone: "3" },
      storage: {
        autoGrow: "Disabled",
        iops: 600,
        storageRedundancy: "ZoneRedundancy",
        storageSizeGB: 100,
      },
      version: "5.7",
    },
    sku: { name: "Standard_D2ds_v4", tier: "GeneralPurpose" },
    tags: { num: "1" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new server or updates an existing server. The update action will overwrite the existing server.
 *
 * @summary creates a new server or updates an existing server. The update action will overwrite the existing server.
 * x-ms-original-file: 2024-12-30/ServerCreateReplica.json
 */
async function createAReplicaServer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.servers.create("testgr", "replica-server", {
    location: "SoutheastAsia",
    properties: {
      createMode: "Replica",
      sourceServerResourceId:
        "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/testgr/providers/Microsoft.DBforMySQL/flexibleServers/source-server",
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new server or updates an existing server. The update action will overwrite the existing server.
 *
 * @summary creates a new server or updates an existing server. The update action will overwrite the existing server.
 * x-ms-original-file: 2024-12-30/ServerCreateWithBYOK.json
 */
async function createAServerWithByok() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.servers.create("testrg", "mysqltestserver", {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/testrg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/test-identity":
          {},
      },
    },
    location: "southeastasia",
    properties: {
      administratorLogin: "cloudsa",
      administratorLoginPassword: "your_password",
      availabilityZone: "1",
      backup: {
        backupIntervalHours: 24,
        backupRetentionDays: 7,
        geoRedundantBackup: "Disabled",
      },
      createMode: "Default",
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
      highAvailability: { mode: "ZoneRedundant", standbyAvailabilityZone: "3" },
      storage: {
        autoGrow: "Disabled",
        iops: 600,
        storageRedundancy: "LocalRedundancy",
        storageSizeGB: 100,
      },
      version: "5.7",
    },
    sku: { name: "Standard_D2ds_v4", tier: "GeneralPurpose" },
    tags: { num: "1" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new server or updates an existing server. The update action will overwrite the existing server.
 *
 * @summary creates a new server or updates an existing server. The update action will overwrite the existing server.
 * x-ms-original-file: 2024-12-30/ServerCreateWithDatabasePort.json
 */
async function createAServerWithNonDefaultDatabasePort() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.servers.create("testrg", "mysqltestserver", {
    location: "southeastasia",
    properties: {
      administratorLogin: "cloudsa",
      administratorLoginPassword: "your_password",
      availabilityZone: "1",
      backup: {
        backupIntervalHours: 24,
        backupRetentionDays: 7,
        geoRedundantBackup: "Disabled",
      },
      createMode: "Default",
      databasePort: 8888,
      highAvailability: { mode: "ZoneRedundant", standbyAvailabilityZone: "3" },
      storage: {
        autoGrow: "Disabled",
        iops: 600,
        storageRedundancy: "LocalRedundancy",
        storageSizeGB: 100,
      },
      version: "5.7",
    },
    sku: { name: "Standard_D2ds_v4", tier: "GeneralPurpose" },
    tags: { num: "1" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new server or updates an existing server. The update action will overwrite the existing server.
 *
 * @summary creates a new server or updates an existing server. The update action will overwrite the existing server.
 * x-ms-original-file: 2024-12-30/ServerCreateWithPointInTimeRestore.json
 */
async function createAServerAsAPointInTimeRestore() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MySQLManagementFlexibleServerClient(credential, subscriptionId);
  const result = await client.servers.create("TargetResourceGroup", "targetserver", {
    location: "SoutheastAsia",
    properties: {
      createMode: "PointInTimeRestore",
      restorePointInTime: new Date("2021-06-24T00:00:37.467Z"),
      sourceServerResourceId:
        "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/SourceResourceGroup/providers/Microsoft.DBforMySQL/flexibleServers/sourceserver",
    },
    sku: { name: "Standard_D14_v2", tier: "GeneralPurpose" },
    tags: { num: "1" },
  });
  console.log(result);
}

async function main() {
  await createANewServer();
  await createAReplicaServer();
  await createAServerWithByok();
  await createAServerWithNonDefaultDatabasePort();
  await createAServerAsAPointInTimeRestore();
}

main().catch(console.error);
