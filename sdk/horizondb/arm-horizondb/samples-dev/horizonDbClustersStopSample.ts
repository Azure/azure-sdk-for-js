// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbClient } from "@azure/arm-horizondb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to stops a running HorizonDB cluster.
 *
 * @summary stops a running HorizonDB cluster.
 * x-ms-original-file: 2026-05-01-preview/Clusters_Stop.json
 */
async function stopAHorizonDBCluster(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  await client.horizonDbClusters.stop("exampleresourcegroup", "examplecluster");
}

async function main(): Promise<void> {
  await stopAHorizonDBCluster();
}

main().catch(console.error);
