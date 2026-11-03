// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HorizonDbClient } = require("@azure/arm-horizondb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists private endpoint connections in a HorizonDB cluster.
 *
 * @summary lists private endpoint connections in a HorizonDB cluster.
 * x-ms-original-file: 2026-10-01-preview/PrivateEndpointConnections_List.json
 */
async function listPrivateEndpointConnectionsOnAHorizonDBCluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.privateEndpointConnections.list(
    "example-resource-group",
    "example-cluster",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listPrivateEndpointConnectionsOnAHorizonDBCluster();
}

main().catch(console.error);
