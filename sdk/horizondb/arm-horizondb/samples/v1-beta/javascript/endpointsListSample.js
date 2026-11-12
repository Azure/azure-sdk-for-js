// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HorizonDbClient } = require("@azure/arm-horizondb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the service-generated Endpoints in a cluster. The collection contains the Cluster-scoped Endpoint named cluster and one Pool-scoped Endpoint for each pool.
 *
 * @summary lists the service-generated Endpoints in a cluster. The collection contains the Cluster-scoped Endpoint named cluster and one Pool-scoped Endpoint for each pool.
 * x-ms-original-file: 2026-10-01-preview/Endpoints_List.json
 */
async function listHorizonDBEndpointsInACluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.endpoints.list("example-resource-group", "example-cluster")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listHorizonDBEndpointsInACluster();
}

main().catch(console.error);
