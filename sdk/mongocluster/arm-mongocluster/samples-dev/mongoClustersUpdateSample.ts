// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MongoClusterManagementClient } from "@azure/arm-mongocluster";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates an existing mongo cluster. The request body can contain one to many of the properties present in the normal mongo cluster definition.
 *
 * @summary updates an existing mongo cluster. The request body can contain one to many of the properties present in the normal mongo cluster definition.
 * x-ms-original-file: 2025-07-01-preview/MongoClusters_PatchDataApi.json
 */
async function enablesDataAPIOnAMongoClusterResource(): Promise<void> {
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
 * x-ms-original-file: 2025-07-01-preview/MongoClusters_PatchDiskSize.json
 */
async function updatesTheDiskSizeOnAMongoClusterResource(): Promise<void> {
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
 * x-ms-original-file: 2025-07-01-preview/MongoClusters_PatchEnableEntraIDAuth.json
 */
async function updatesTheAllowedAuthenticationModesToIncludeMicrosoftEntraIDAuthentication(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  const result = await client.mongoClusters.update("TestResourceGroup", "myMongoCluster", {
    properties: {
      authConfig: { allowedModes: ["NativeAuth", "MicrosoftEntraID"] },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing mongo cluster. The request body can contain one to many of the properties present in the normal mongo cluster definition.
 *
 * @summary updates an existing mongo cluster. The request body can contain one to many of the properties present in the normal mongo cluster definition.
 * x-ms-original-file: 2025-07-01-preview/MongoClusters_PatchPrivateNetworkAccess.json
 */
async function disablesPublicNetworkAccessOnAMongoClusterResourceWithAPrivateEndpointConnection(): Promise<void> {
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
 * x-ms-original-file: 2025-07-01-preview/MongoClusters_PatchSSDv2.json
 */
async function updatesThePremiumSSDv2SizeIopsAndThroughputOnAMongoClusterResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  const result = await client.mongoClusters.update("TestResourceGroup", "myMongoCluster", {
    properties: {
      storage: {
        sizeGb: 128,
        type: "PremiumSSDv2",
        iops: 5000,
        throughput: 1000,
      },
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing mongo cluster. The request body can contain one to many of the properties present in the normal mongo cluster definition.
 *
 * @summary updates an existing mongo cluster. The request body can contain one to many of the properties present in the normal mongo cluster definition.
 * x-ms-original-file: 2025-07-01-preview/MongoClusters_ResetPassword.json
 */
async function resetsTheAdministratorLoginPassword(): Promise<void> {
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
 * x-ms-original-file: 2025-07-01-preview/MongoClusters_Update.json
 */
async function updatesAMongoClusterResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  const result = await client.mongoClusters.update("TestResourceGroup", "myMongoCluster", {
    properties: {
      administrator: { userName: "mongoAdmin" },
      authConfig: { allowedModes: ["NativeAuth"] },
      serverVersion: "5.0",
      storage: { sizeGb: 256, type: "PremiumSSD" },
      compute: { tier: "M50" },
      sharding: { shardCount: 4 },
      highAvailability: { targetMode: "SameZone" },
      previewFeatures: [],
      publicNetworkAccess: "Enabled",
      dataApi: { mode: "Disabled" },
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await enablesDataAPIOnAMongoClusterResource();
  await updatesTheDiskSizeOnAMongoClusterResource();
  await updatesTheAllowedAuthenticationModesToIncludeMicrosoftEntraIDAuthentication();
  await disablesPublicNetworkAccessOnAMongoClusterResourceWithAPrivateEndpointConnection();
  await updatesThePremiumSSDv2SizeIopsAndThroughputOnAMongoClusterResource();
  await resetsTheAdministratorLoginPassword();
  await updatesAMongoClusterResource();
}

main().catch(console.error);
