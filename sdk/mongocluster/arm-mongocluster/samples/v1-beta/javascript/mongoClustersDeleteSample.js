// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MongoClusterManagementClient } = require("@azure/arm-mongocluster");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a mongo cluster.
 *
 * @summary deletes a mongo cluster.
 * x-ms-original-file: 2024-10-01-preview/MongoClusters_Delete.json
 */
async function deletesAMongoClusterResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  await client.mongoClusters.delete("TestResourceGroup", "myMongoCluster");
}

async function main() {
  await deletesAMongoClusterResource();
}

main().catch(console.error);
