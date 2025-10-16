// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricManagedClustersManagementClient } from "@azure/arm-servicefabricmanagedclusters";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a fault simulation by the simulationId.
 *
 * @summary gets a fault simulation by the simulationId.
 * x-ms-original-file: 2025-06-01-preview/faultSimulation/NodeTypeGetFaultSimulation_example.json
 */
async function getNodeTypeFaultSimulation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ServiceFabricManagedClustersManagementClient(credential, subscriptionId);
  const result = await client.nodeTypes.getFaultSimulation("resRg", "myCluster", "BE", {
    simulationId: "aec13cc2-1d39-4ba6-a1a8-2fc35b00643c",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await getNodeTypeFaultSimulation();
}

main().catch(console.error);
