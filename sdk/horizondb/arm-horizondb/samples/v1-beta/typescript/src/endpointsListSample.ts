// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbClient } from "@azure/arm-horizondb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the service-generated Endpoints in a cluster. The collection contains the Cluster-scoped Endpoint named cluster and one Pool-scoped Endpoint for each pool.
 *
 * @summary lists the service-generated Endpoints in a cluster. The collection contains the Cluster-scoped Endpoint named cluster and one Pool-scoped Endpoint for each pool.
 * x-ms-original-file: 2026-10-01-preview/Endpoints_List.json
 */
async function listHorizonDBEndpointsInACluster(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.endpoints.list("example-resource-group", "example-cluster")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listHorizonDBEndpointsInACluster();
}

main().catch(console.error);
