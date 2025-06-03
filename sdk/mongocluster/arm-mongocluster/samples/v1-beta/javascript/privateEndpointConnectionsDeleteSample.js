// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MongoClusterManagementClient } = require("@azure/arm-mongocluster");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete the private endpoint connection
 *
 * @summary delete the private endpoint connection
 * x-ms-original-file: 2024-10-01-preview/MongoClusters_PrivateEndpointConnectionDelete.json
 */
async function deleteAPrivateEndpointConnectionOnAMongoClusterResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  await client.privateEndpointConnections.delete(
    "TestGroup",
    "myMongoCluster",
    "pecTest.5d393f64-ef64-46d0-9959-308321c44ac0",
  );
}

async function main() {
  await deleteAPrivateEndpointConnectionOnAMongoClusterResource();
}

main().catch(console.error);
