// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MongoClusterManagementClient } from "@azure/arm-mongocluster";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a mongo cluster. Update overwrites all properties for the resource. To only modify some of the properties, use PATCH.
 *
 * @summary create or update a mongo cluster. Update overwrites all properties for the resource. To only modify some of the properties, use PATCH.
 * x-ms-original-file: 2024-06-01-preview/MongoClusters_Create.json
 */
async function createsANewMongoClusterResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  const result = await client.mongoClusters.createOrUpdate(
    "TestResourceGroup",
    "myMongoCluster",
    {
      location: "westus2",
      properties: {
        administratorLogin: "mongoAdmin",
        administratorLoginPassword: "password",
        serverVersion: "5.0",
        nodeGroupSpecs: [
          {
            kind: "Shard",
            sku: "M30",
            diskSizeGB: 128,
            enableHa: true,
            nodeCount: 1,
          },
        ],
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a mongo cluster. Update overwrites all properties for the resource. To only modify some of the properties, use PATCH.
 *
 * @summary create or update a mongo cluster. Update overwrites all properties for the resource. To only modify some of the properties, use PATCH.
 * x-ms-original-file: 2024-06-01-preview/MongoClusters_CreateGeoReplica.json
 */
async function createsAReplicaMongoClusterResourceFromASourceResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  const result = await client.mongoClusters.createOrUpdate(
    "TestResourceGroup",
    "myReplicaMongoCluster",
    {
      location: "centralus",
      properties: {
        createMode: "GeoReplica",
        replicaParameters: {
          sourceResourceId:
            "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/TestResourceGroup/providers/Microsoft.DocumentDB/mongoClusters/mySourceMongoCluster",
          sourceLocation: "eastus",
        },
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to create or update a mongo cluster. Update overwrites all properties for the resource. To only modify some of the properties, use PATCH.
 *
 * @summary create or update a mongo cluster. Update overwrites all properties for the resource. To only modify some of the properties, use PATCH.
 * x-ms-original-file: 2024-06-01-preview/MongoClusters_CreatePITR.json
 */
async function createsAMongoClusterResourceFromAPointInTimeRestore() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  const result = await client.mongoClusters.createOrUpdate(
    "TestResourceGroup",
    "myMongoCluster",
    {
      location: "westus2",
      properties: {
        createMode: "PointInTimeRestore",
        restoreParameters: {
          pointInTimeUTC: new Date("2023-01-13T20:07:35Z"),
          sourceResourceId:
            "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/TestResourceGroup/providers/Microsoft.DocumentDB/mongoClusters/myOtherMongoCluster",
        },
      },
    },
  );
  console.log(result);
}

async function main() {
  createsANewMongoClusterResource();
  createsAReplicaMongoClusterResourceFromASourceResource();
  createsAMongoClusterResourceFromAPointInTimeRestore();
}

main().catch(console.error);
