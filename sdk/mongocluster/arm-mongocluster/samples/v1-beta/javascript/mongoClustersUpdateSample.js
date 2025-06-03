// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MongoClusterManagementClient } = require("@azure/arm-mongocluster");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates an existing mongo cluster. The request body can contain one to many of the properties present in the normal mongo cluster definition.
 *
 * @summary updates an existing mongo cluster. The request body can contain one to many of the properties present in the normal mongo cluster definition.
 * x-ms-original-file: 2024-10-01-preview/MongoClusters_PatchDataApi.json
 */
async function enablesDataAPIOnAMongoClusterResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  const result = await client.mongoClusters.update("TestResourceGroup", "myMongoCluster", {
    properties: { dataApi: { mode: "Enabled" } },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing mongo cluster. The request body can contain one to many of the properties present in the normal mongo cluster definition.
 *
 * @summary updates an existing mongo cluster. The request body can contain one to many of the properties present in the normal mongo cluster definition.
 * x-ms-original-file: 2024-10-01-preview/MongoClusters_PatchDiskSize.json
 */
async function updatesTheDiskSizeOnAMongoClusterResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  const result = await client.mongoClusters.update("TestResourceGroup", "myMongoCluster", {
    properties: { storage: { sizeGb: 256 } },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing mongo cluster. The request body can contain one to many of the properties present in the normal mongo cluster definition.
 *
 * @summary updates an existing mongo cluster. The request body can contain one to many of the properties present in the normal mongo cluster definition.
 * x-ms-original-file: 2024-10-01-preview/MongoClusters_PatchPrivateNetworkAccess.json
 */
async function disablesPublicNetworkAccessOnAMongoClusterResourceWithAPrivateEndpointConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  const result = await client.mongoClusters.update("TestResourceGroup", "myMongoCluster", {
    properties: { publicNetworkAccess: "Disabled" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing mongo cluster. The request body can contain one to many of the properties present in the normal mongo cluster definition.
 *
 * @summary updates an existing mongo cluster. The request body can contain one to many of the properties present in the normal mongo cluster definition.
 * x-ms-original-file: 2024-10-01-preview/MongoClusters_ResetPassword.json
 */
async function resetsTheAdministratorLoginPassword() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  const result = await client.mongoClusters.update("TestResourceGroup", "myMongoCluster", {
    properties: {
      administrator: { userName: "mongoAdmin", password: "password" },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing mongo cluster. The request body can contain one to many of the properties present in the normal mongo cluster definition.
 *
 * @summary updates an existing mongo cluster. The request body can contain one to many of the properties present in the normal mongo cluster definition.
 * x-ms-original-file: 2024-10-01-preview/MongoClusters_Update.json
 */
async function updatesAMongoClusterResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  const result = await client.mongoClusters.update("TestResourceGroup", "myMongoCluster", {
    properties: {
      administrator: { userName: "mongoAdmin" },
      serverVersion: "5.0",
      storage: { sizeGb: 256 },
      compute: { tier: "M50" },
      sharding: { shardCount: 4 },
      highAvailability: { targetMode: "SameZone" },
      previewFeatures: [],
      publicNetworkAccess: "Enabled",
    },
  });
  console.log(result);
}

async function main() {
  await enablesDataAPIOnAMongoClusterResource();
  await updatesTheDiskSizeOnAMongoClusterResource();
  await disablesPublicNetworkAccessOnAMongoClusterResourceWithAPrivateEndpointConnection();
  await resetsTheAdministratorLoginPassword();
  await updatesAMongoClusterResource();
}

main().catch(console.error);
