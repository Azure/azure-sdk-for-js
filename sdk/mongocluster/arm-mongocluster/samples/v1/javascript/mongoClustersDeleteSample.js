// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

const { MongoClusterManagementClient } = require("@azure/arm-mongocluster");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a mongo cluster.
 *
 * @summary deletes a mongo cluster.
 * x-ms-original-file: 2024-07-01/MongoClusters_Delete.json
 */
async function deletesAMongoClusterResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  const result = await client.mongoClusters.delete("TestResourceGroup", "myMongoCluster");
  console.log(result);
}

async function main() {
  deletesAMongoClusterResource();
}

main().catch(console.error);
