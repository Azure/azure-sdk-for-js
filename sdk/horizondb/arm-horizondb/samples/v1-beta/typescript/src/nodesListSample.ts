// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbClient } from "@azure/arm-horizondb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the nodes allocated to a HorizonDB pool.
 *
 * @summary lists the nodes allocated to a HorizonDB pool.
 * x-ms-original-file: 2026-10-01-preview/Nodes_List.json
 */
async function listTheNodesAllocatedToAHorizonDBPool(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.nodes.list(
    "example-resource-group",
    "example-cluster",
    "example-pool-01",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listTheNodesAllocatedToAHorizonDBPool();
}

main().catch(console.error);
