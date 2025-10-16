// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const {
  ServiceFabricManagedClustersManagementClient,
} = require("@azure/arm-servicefabricmanagedclusters");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to starts a fault simulation on the node type.
 *
 * @summary starts a fault simulation on the node type.
 * x-ms-original-file: 2025-06-01-preview/faultSimulation/NodeTypeStartFaultSimulation_example.json
 */
async function startNodeTypeFaultSimulation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  const result = await client.nodeTypes.startFaultSimulation("resRg", "myCluster", "BE", {
    parameters: { faultKind: "Zone", zones: ["2"] },
  });
  console.log(result);
}

async function main() {
  await startNodeTypeFaultSimulation();
}

main().catch(console.error);
