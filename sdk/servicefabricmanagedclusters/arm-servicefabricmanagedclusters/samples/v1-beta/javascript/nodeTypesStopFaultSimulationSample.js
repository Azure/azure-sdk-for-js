// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const {
  ServiceFabricManagedClustersManagementClient,
} = require("@azure/arm-servicefabricmanagedclusters");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to stops a fault simulation on the node type.
 *
 * @summary stops a fault simulation on the node type.
 * x-ms-original-file: 2025-06-01-preview/faultSimulation/NodeTypeStopFaultSimulation_example.json
 */
async function stopNodeTypeFaultSimulation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  const result = await client.nodeTypes.stopFaultSimulation("resRg", "myCluster", "BE", {
    simulationId: "1bb61ba9-8a41-4d73-b5f0-7fc93b1edfe3",
  });
  console.log(result);
}

async function main() {
  await stopNodeTypeFaultSimulation();
}

main().catch(console.error);
