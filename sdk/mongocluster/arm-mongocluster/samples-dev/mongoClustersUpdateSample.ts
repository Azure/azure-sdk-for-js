// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MongoClusterManagementClient } from "@azure/arm-mongocluster";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates an existing mongo cluster. The request body can contain one to many of the properties present in the normal mongo cluster definition.
 *
 * @summary updates an existing mongo cluster. The request body can contain one to many of the properties present in the normal mongo cluster definition.
 * x-ms-original-file: 2024-06-01-preview/MongoClusters_PatchDiskSize.json
 */
async function updatesTheDiskSizeOnAMongoClusterResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  const result = await client.mongoClusters.update(
    "TestResourceGroup",
    "myMongoCluster",
    { properties: { nodeGroupSpecs: [{ kind: "Shard", diskSizeGB: 256 }] } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing mongo cluster. The request body can contain one to many of the properties present in the normal mongo cluster definition.
 *
 * @summary updates an existing mongo cluster. The request body can contain one to many of the properties present in the normal mongo cluster definition.
 * x-ms-original-file: 2024-06-01-preview/MongoClusters_PatchPrivateNetworkAccess.json
 */
async function disablesPublicNetworkAccessOnAMongoClusterResourceWithAPrivateEndpointConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  const result = await client.mongoClusters.update(
    "TestResourceGroup",
    "myMongoCluster",
    { properties: { publicNetworkAccess: "Disabled" } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing mongo cluster. The request body can contain one to many of the properties present in the normal mongo cluster definition.
 *
 * @summary updates an existing mongo cluster. The request body can contain one to many of the properties present in the normal mongo cluster definition.
 * x-ms-original-file: 2024-06-01-preview/MongoClusters_ResetPassword.json
 */
async function resetsTheAdministratorLoginPassword() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  const result = await client.mongoClusters.update(
    "TestResourceGroup",
    "myMongoCluster",
    {
      properties: {
        administratorLogin: "mongoAdmin",
        administratorLoginPassword: "password",
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to updates an existing mongo cluster. The request body can contain one to many of the properties present in the normal mongo cluster definition.
 *
 * @summary updates an existing mongo cluster. The request body can contain one to many of the properties present in the normal mongo cluster definition.
 * x-ms-original-file: 2024-06-01-preview/MongoClusters_Update.json
 */
async function updatesAMongoClusterResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  const result = await client.mongoClusters.update(
    "TestResourceGroup",
    "myMongoCluster",
    {
      properties: {
        administratorLogin: "mongoAdmin",
        administratorLoginPassword: "password",
        serverVersion: "5.0",
        nodeGroupSpecs: [
          {
            kind: "Shard",
            sku: "M50",
            diskSizeGB: 256,
            enableHa: true,
            nodeCount: 1,
          },
        ],
        publicNetworkAccess: "Enabled",
      },
    },
  );
  console.log(result);
}

async function main() {
  updatesTheDiskSizeOnAMongoClusterResource();
  disablesPublicNetworkAccessOnAMongoClusterResourceWithAPrivateEndpointConnection();
  resetsTheAdministratorLoginPassword();
  updatesAMongoClusterResource();
}

main().catch(console.error);
