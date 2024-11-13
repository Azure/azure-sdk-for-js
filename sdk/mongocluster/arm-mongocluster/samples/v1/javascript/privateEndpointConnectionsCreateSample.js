// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MongoClusterManagementClient } = require("@azure/arm-mongocluster");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a Private endpoint connection
 *
 * @summary create a Private endpoint connection
 * x-ms-original-file: 2024-07-01/MongoClusters_PrivateEndpointConnectionPut.json
 */
async function approvesAPrivateEndpointConnectionOnAMongoClusterResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  const result = await client.privateEndpointConnections.create(
    "TestGroup",
    "myMongoCluster",
    "pecTest",
    {
      properties: {
        privateLinkServiceConnectionState: {
          status: "Approved",
          description: "Auto-Approved",
        },
      },
    },
  );
  console.log(result);
}

async function main() {
  approvesAPrivateEndpointConnectionOnAMongoClusterResource();
}

main().catch(console.error);
