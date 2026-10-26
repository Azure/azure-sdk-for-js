// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbClient } from "@azure/arm-horizondb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets information about a HorizonDB pool.
 *
 * @summary gets information about a HorizonDB pool.
 * x-ms-original-file: 2026-10-01-preview/Pools_Get.json
 */
async function getAHorizonDBPool(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.pools.get(
    "example-resource-group",
    "example-cluster",
    "example-pool-01",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAHorizonDBPool();
}

main().catch(console.error);
