// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const {
  ServiceFabricManagedClustersManagementClient,
} = require("@azure/arm-servicefabricmanagedclusters");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a fault simulation by the simulationId.
 *
 * @summary gets a fault simulation by the simulationId.
 * x-ms-original-file: 2025-10-01-preview/faultSimulation/ManagedClusterGetFaultSimulation_example.json
 */
async function getManagedClusterFaultSimulation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  const result = await client.managedClusters.getFaultSimulation("resRg", "myCluster", {
    simulationId: "aec13cc2-1d39-4ba6-a1a8-2fc35b00643c",
  });
  console.log(result);
}

async function main() {
  await getManagedClusterFaultSimulation();
}

main().catch(console.error);
