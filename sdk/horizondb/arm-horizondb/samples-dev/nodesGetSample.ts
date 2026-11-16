// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbClient } from "@azure/arm-horizondb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a node allocated to a HorizonDB pool.
 *
 * @summary gets a node allocated to a HorizonDB pool.
 * x-ms-original-file: 2026-10-01-preview/Nodes_Get.json
 */
async function getAHorizonDBNode(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.nodes.get(
    "example-resource-group",
    "example-cluster",
    "example-pool-01",
    "node-01",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAHorizonDBNode();
}

main().catch(console.error);
