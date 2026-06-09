// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DBforPostgreSQLClient } = require("@azure/arm-postgresqlhsc");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a new cluster with servers.
 *
 * @summary creates a new cluster with servers.
 * x-ms-original-file: 2023-03-02-preview/ClusterCreateBurstablev1.json
 */
async function createANewSingleNodeBurstable1VCoreCluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new DBforPostgreSQLClient(credential, subscriptionId);
  const result = await client.clusters.create("TestGroup", "testcluster-burstablev1", {
    location: "westus",
    administratorLoginPassword: "password",
    citusVersion: "11.3",
    coordinatorEnablePublicIpAccess: true,
    coordinatorServerEdition: "BurstableMemoryOptimized",
    coordinatorStorageQuotaInMb: 131072,
    coordinatorVCores: 1,
    enableHa: false,
    enableShardsOnCoordinator: true,
    nodeCount: 0,
    postgresqlVersion: "15",
    preferredPrimaryZone: "1",
    tags: { owner: "JohnDoe" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new cluster with servers.
 *
 * @summary creates a new cluster with servers.
 * x-ms-original-file: 2023-03-02-preview/ClusterCreateBurstablev2.json
 */
async function createANewSingleNodeBurstable2VCoresCluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new DBforPostgreSQLClient(credential, subscriptionId);
  const result = await client.clusters.create("TestGroup", "testcluster-burstablev2", {
    location: "westus",
    administratorLoginPassword: "password",
    citusVersion: "11.3",
    coordinatorEnablePublicIpAccess: true,
    coordinatorServerEdition: "BurstableGeneralPurpose",
    coordinatorStorageQuotaInMb: 131072,
    coordinatorVCores: 2,
    enableHa: false,
    enableShardsOnCoordinator: true,
    nodeCount: 0,
    postgresqlVersion: "15",
    preferredPrimaryZone: "1",
    tags: { owner: "JohnDoe" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new cluster with servers.
 *
 * @summary creates a new cluster with servers.
 * x-ms-original-file: 2023-03-02-preview/ClusterCreateCustomDatabaseName.json
 */
async function createANewClusterWithCustomDatabaseName() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new DBforPostgreSQLClient(credential, subscriptionId);
  const result = await client.clusters.create("TestGroup", "testcluster-custom-db-name", {
    location: "westus",
    administratorLoginPassword: "password",
    citusVersion: "11.3",
    coordinatorEnablePublicIpAccess: true,
    coordinatorServerEdition: "GeneralPurpose",
    coordinatorStorageQuotaInMb: 131072,
    coordinatorVCores: 8,
    databaseName: "testdbname",
    enableHa: true,
    enableShardsOnCoordinator: true,
    nodeCount: 0,
    postgresqlVersion: "15",
    preferredPrimaryZone: "1",
    tags: { owner: "JohnDoe" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new cluster with servers.
 *
 * @summary creates a new cluster with servers.
 * x-ms-original-file: 2023-03-02-preview/ClusterCreateMultiNode.json
 */
async function createANewMultiNodeCluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new DBforPostgreSQLClient(credential, subscriptionId);
  const result = await client.clusters.create("TestGroup", "testcluster-multinode", {
    location: "westus",
    administratorLoginPassword: "password",
    citusVersion: "11.1",
    coordinatorEnablePublicIpAccess: true,
    coordinatorServerEdition: "GeneralPurpose",
    coordinatorStorageQuotaInMb: 524288,
    coordinatorVCores: 4,
    enableHa: true,
    enableShardsOnCoordinator: false,
    nodeCount: 3,
    nodeEnablePublicIpAccess: false,
    nodeServerEdition: "MemoryOptimized",
    nodeStorageQuotaInMb: 524288,
    nodeVCores: 8,
    postgresqlVersion: "15",
    preferredPrimaryZone: "1",
    tags: {},
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new cluster with servers.
 *
 * @summary creates a new cluster with servers.
 * x-ms-original-file: 2023-03-02-preview/ClusterCreatePITR.json
 */
async function createANewClusterAsAPointInTimeRestore() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new DBforPostgreSQLClient(credential, subscriptionId);
  const result = await client.clusters.create("TestGroup", "testcluster", {
    location: "westus",
    pointInTimeUTC: new Date("2017-12-14T00:00:37.467Z"),
    sourceLocation: "westus",
    sourceResourceId:
      "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/TestResourceGroup/providers/Microsoft.DBforPostgreSQL/serverGroupsv2/source-cluster",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new cluster with servers.
 *
 * @summary creates a new cluster with servers.
 * x-ms-original-file: 2023-03-02-preview/ClusterCreateReadReplica.json
 */
async function createANewClusterAsAReadReplica() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new DBforPostgreSQLClient(credential, subscriptionId);
  const result = await client.clusters.create("TestGroup", "testcluster", {
    location: "westus",
    sourceLocation: "westus",
    sourceResourceId:
      "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/TestResourceGroup/providers/Microsoft.DBforPostgreSQL/serverGroupsv2/sourcecluster",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new cluster with servers.
 *
 * @summary creates a new cluster with servers.
 * x-ms-original-file: 2023-03-02-preview/ClusterCreateSingleNode.json
 */
async function createANewSingleNodeCluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new DBforPostgreSQLClient(credential, subscriptionId);
  const result = await client.clusters.create("TestGroup", "testcluster-singlenode", {
    location: "westus",
    administratorLoginPassword: "password",
    citusVersion: "11.3",
    coordinatorEnablePublicIpAccess: true,
    coordinatorServerEdition: "GeneralPurpose",
    coordinatorStorageQuotaInMb: 131072,
    coordinatorVCores: 8,
    enableHa: true,
    enableShardsOnCoordinator: true,
    nodeCount: 0,
    postgresqlVersion: "15",
    preferredPrimaryZone: "1",
    tags: { owner: "JohnDoe" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new cluster with servers.
 *
 * @summary creates a new cluster with servers.
 * x-ms-original-file: 2023-03-02-preview/ClusterCreateWithAAD.json
 */
async function createANewClusterWithAzureActiveDirectoryAuthentication() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new DBforPostgreSQLClient(credential, subscriptionId);
  const result = await client.clusters.create("TestGroup", "testcluster-cmk", {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/TestGroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/test-usermanagedidentity":
          {},
      },
    },
    location: "westus",
    administratorLoginPassword: "password",
    citusVersion: "12.1",
    coordinatorEnablePublicIpAccess: true,
    coordinatorServerEdition: "GeneralPurpose",
    coordinatorStorageQuotaInMb: 524288,
    coordinatorVCores: 4,
    dataEncryption: {
      type: "AzureKeyVault",
      primaryKeyUri:
        "https://test-kv.vault.azure.net/keys/test-key1/fffffffffffffffffffffffffffffff",
      primaryUserAssignedIdentityId:
        "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/TestGroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/test-usermanagedidentity",
    },
    databaseName: "citus",
    enableHa: false,
    enableShardsOnCoordinator: false,
    nodeCount: 3,
    nodeEnablePublicIpAccess: false,
    nodeServerEdition: "MemoryOptimized",
    nodeStorageQuotaInMb: 524288,
    nodeVCores: 8,
    postgresqlVersion: "15",
    preferredPrimaryZone: "1",
    tags: {},
  });
  console.log(result);
}

/**
 * This sample demonstrates how to creates a new cluster with servers.
 *
 * @summary creates a new cluster with servers.
 * x-ms-original-file: 2023-03-02-preview/ClusterCreateWithCMK.json
 */
async function createANewClusterWithCustomerManagedKeyCMKDataEncryption() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new DBforPostgreSQLClient(credential, subscriptionId);
  const result = await client.clusters.create("TestGroup", "testcluster-cmk", {
    identity: {
      type: "UserAssigned",
      userAssignedIdentities: {
        "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/TestGroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/test-usermanagedidentity":
          {},
      },
    },
    location: "westus",
    administratorLoginPassword: "password",
    citusVersion: "12.1",
    coordinatorEnablePublicIpAccess: true,
    coordinatorServerEdition: "GeneralPurpose",
    coordinatorStorageQuotaInMb: 524288,
    coordinatorVCores: 4,
    dataEncryption: {
      type: "AzureKeyVault",
      primaryKeyUri:
        "https://test-kv.vault.azure.net/keys/test-key1/fffffffffffffffffffffffffffffff",
      primaryUserAssignedIdentityId:
        "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/TestGroup/providers/Microsoft.ManagedIdentity/userAssignedIdentities/test-usermanagedidentity",
    },
    databaseName: "citus",
    enableHa: false,
    enableShardsOnCoordinator: false,
    nodeCount: 3,
    nodeEnablePublicIpAccess: false,
    nodeServerEdition: "MemoryOptimized",
    nodeStorageQuotaInMb: 524288,
    nodeVCores: 8,
    postgresqlVersion: "15",
    preferredPrimaryZone: "1",
    tags: {},
  });
  console.log(result);
}

async function main() {
  await createANewSingleNodeBurstable1VCoreCluster();
  await createANewSingleNodeBurstable2VCoresCluster();
  await createANewClusterWithCustomDatabaseName();
  await createANewMultiNodeCluster();
  await createANewClusterAsAPointInTimeRestore();
  await createANewClusterAsAReadReplica();
  await createANewSingleNodeCluster();
  await createANewClusterWithAzureActiveDirectoryAuthentication();
  await createANewClusterWithCustomerManagedKeyCMKDataEncryption();
}

main().catch(console.error);
