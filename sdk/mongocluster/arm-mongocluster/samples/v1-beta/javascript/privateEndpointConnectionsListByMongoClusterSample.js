// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MongoClusterManagementClient } = require("@azure/arm-mongocluster");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list existing private connections
 *
 * @summary list existing private connections
 * x-ms-original-file: 2024-10-01-preview/MongoClusters_PrivateEndpointConnectionList.json
 */
async function listsThePrivateEndpointConnectionResourcesOnAMongoClusterResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateEndpointConnections.listByMongoCluster(
    "TestGroup",
    "myMongoCluster",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listsThePrivateEndpointConnectionResourcesOnAMongoClusterResource();
}

main().catch(console.error);
