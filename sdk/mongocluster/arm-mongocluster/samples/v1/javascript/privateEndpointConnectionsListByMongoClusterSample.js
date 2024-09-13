// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { MongoClusterManagementClient } = require("@azure/arm-mongocluster");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list existing private connections
 *
 * @summary list existing private connections
 * x-ms-original-file: 2024-07-01/MongoClusters_PrivateEndpointConnectionList.json
 */
async function listsThePrivateEndpointConnectionResourcesOnAMongoClusterResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new MongoClusterManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.privateEndpointConnections.listByMongoCluster(
    "TestGroup",
    "myMongoCluster",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  listsThePrivateEndpointConnectionResourcesOnAMongoClusterResource();
}

main().catch(console.error);
