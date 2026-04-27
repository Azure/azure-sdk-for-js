// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbClient } from "@azure/arm-horizondb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets information about a HorizonDb cluster.
 *
 * @summary gets information about a HorizonDb cluster.
 * x-ms-original-file: 2026-01-20-preview/Clusters_Get.json
 */
async function getAHorizonDbCluster(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.horizonDbClusters.get("exampleresourcegroup", "examplecluster");
  console.log(result);
}

async function main(): Promise<void> {
  await getAHorizonDbCluster();
}

main().catch(console.error);
