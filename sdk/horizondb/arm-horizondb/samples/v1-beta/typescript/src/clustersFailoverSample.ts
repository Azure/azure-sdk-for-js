// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbClient } from "@azure/arm-horizondb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to triggers failover within the cluster's designated read-write pool. HorizonDB selects the replacement node using the same eligibility and node-selection rules as automatic failover. The request fails with 409 Conflict when the designated pool is not eligible for failover or another conflicting operation is in progress.
 *
 * @summary triggers failover within the cluster's designated read-write pool. HorizonDB selects the replacement node using the same eligibility and node-selection rules as automatic failover. The request fails with 409 Conflict when the designated pool is not eligible for failover or another conflicting operation is in progress.
 * x-ms-original-file: 2026-10-01-preview/Clusters_Failover.json
 */
async function triggerFailoverWithinAHorizonDBCluster(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.clusters.failover("example-resource-group", "example-cluster");
  console.log(result);
}

async function main(): Promise<void> {
  await triggerFailoverWithinAHorizonDBCluster();
}

main().catch(console.error);
