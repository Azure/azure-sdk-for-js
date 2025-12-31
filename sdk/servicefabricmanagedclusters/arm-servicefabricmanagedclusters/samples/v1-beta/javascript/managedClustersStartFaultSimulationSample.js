// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const {
  ServiceFabricManagedClustersManagementClient,
} = require("@azure/arm-servicefabricmanagedclusters");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to starts a fault simulation on the cluster.
 *
 * @summary starts a fault simulation on the cluster.
 * x-ms-original-file: 2025-10-01-preview/faultSimulation/ManagedClusterStartFaultSimulation_example.json
 */
async function startManagedClusterFaultSimulation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  const result = await client.managedClusters.startFaultSimulation("resRg", "myCluster", {
    parameters: { faultKind: "Zone", zones: ["2"] },
  });
  console.log(result);
}

async function main() {
  await startManagedClusterFaultSimulation();
}

main().catch(console.error);
