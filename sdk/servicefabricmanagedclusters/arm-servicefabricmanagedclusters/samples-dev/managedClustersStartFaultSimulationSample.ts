// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricManagedClustersManagementClient } from "@azure/arm-servicefabricmanagedclusters";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to starts a fault simulation on the cluster.
 *
 * @summary starts a fault simulation on the cluster.
 * x-ms-original-file: 2025-06-01-preview/faultSimulation/ManagedClusterStartFaultSimulation_example.json
 */
async function startManagedClusterFaultSimulation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  const result = await client.managedClusters.startFaultSimulation("resRg", "myCluster", {
    parameters: { faultKind: "Zone", zones: ["2"] },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await startManagedClusterFaultSimulation();
}

main().catch(console.error);
